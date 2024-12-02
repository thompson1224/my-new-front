<template>
  <div class="my-orders">
    <h1>나의 주문 내역</h1>

    <!-- 날짜 선택 -->
    <div class="filters">
      <label for="startDate">시작 날짜:</label>
      <input type="date" id="startDate" v-model="startDate" />
      <label for="endDate">종료 날짜:</label>
      <input type="date" id="endDate" v-model="endDate" />
      <button @click="fetchOrders">조회하기</button>
    </div>

    <!-- 주문 내역 -->
    <div v-if="orders.length > 0" class="orders-list">
      <div 
        v-for="order in orders" 
        :key="order.purchase_id" 
        class="order-item"
      >
        <h3>{{ order.product_name }}</h3>
        <p>구매 날짜: {{ formatDate(order.purchase_date) }}</p>
        <p>사용 포인트: {{ order.points_used }}</p>
        <p>적립 포인트: {{ order.points_earned }}</p>
        <p>상태: <span :class="{ pending: order.status === 'pending' }">{{ order.status }}</span></p>
        
        <!-- 결제 버튼 -->
        <button 
          v-if="order.status === 'pending'" 
          @click="payOrder(order.purchase_id)"
        >
          결제하기
        </button>
      </div>
    </div>
    <div v-else>
      <p>주문 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyOrders',
  data() {
    return {
      orders: [], // 주문 내역
      startDate: '', // 시작 날짜
      endDate: '', // 종료 날짜
    };
  },
  created() {
    this.fetchOrders(); // 컴포넌트 로드시 기본 조회
  },
  methods: {
    async fetchOrders() {
      try {
        const params = {
          startDate: this.startDate,
          endDate: this.endDate,
        };
        const response = await axios.get('https://backend-web.fly.dev/my-orders', {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.orders = response.data;
      } catch (error) {
        console.error('주문 내역 조회 오류:', error);
      }
    },
    async payOrder(purchaseId) {
      try {
        const response = await axios.post(
          'https://backend-web.fly.dev/my-orders/pay',
          { purchaseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert(response.data.message);
        this.fetchOrders(); // 상태 갱신
      } catch (error) {
        console.error('결제 처리 오류:', error);
        alert('결제 처리 중 오류가 발생했습니다.');
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.my-orders {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.filters {
  margin-bottom: 20px;
}

.filters label {
  margin-right: 10px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.order-item h3 {
  margin-bottom: 5px;
}

.order-item p {
  margin: 0 0 5px;
}

.pending {
  color: red;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>