<template>
  <div>
    <h1>구매 상태 조회</h1>
    <form @submit.prevent="fetchPurchaseHistory">
      <div>
        <label for="userId">사용자 ID:</label>
        <input v-model="filters.userId" type="text" id="userId" placeholder="사용자 ID 입력" />
      </div>
      <div>
        <label for="startDate">시작 날짜:</label>
        <input v-model="filters.startDate" type="date" id="startDate" />
      </div>
      <div>
        <label for="endDate">종료 날짜:</label>
        <input v-model="filters.endDate" type="date" id="endDate" />
      </div>
      <button type="submit">조회</button>
    </form>

    <div v-if="purchaseHistory.length > 0">
      <h2>구매 내역</h2>
      <ul>
        <li v-for="history in purchaseHistory" :key="history.id">
          <p>구매 ID: {{ history.id }}</p>
          <p>사용자 ID: {{ history.userid }}</p>
          <p>상품 ID: {{ history.product_id }}</p>
          <p>사용한 포인트: {{ history.points_used }}</p>
          <p>적립된 포인트: {{ history.points_earned }}</p>
          <p>구매 상태: {{ history.status }}</p>
          <p>구매 날짜: {{ history.purchase_date }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>조회된 구매 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        userId: '',
        startDate: '',
        endDate: '',
      },
      purchaseHistory: [], // 구매 내역
      API_BASE_URL: 'https://backend-web.fly.dev/', // 실제 API 서버 URL로 변경
    };
  },
  methods: {
    async fetchPurchaseHistory() {
      const { userId, startDate, endDate } = this.filters;

      try {
        const query = new URLSearchParams({
          userId,
          startDate,
          endDate,
        }).toString();

        const response = await fetch(`${this.API_BASE_URL}purchase-history?${query}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }); 
        const data = await response.json();

        if (response.ok) {
          this.purchaseHistory = data; // 데이터 설정
        } else {
          alert('구매 내역을 가져오는 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('구매 내역 조회 오류:', error);
        alert('서버와 연결할 수 없습니다.');
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

input {
  margin: 5px 0;
  padding: 8px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
}
</style>