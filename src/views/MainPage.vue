<template>
  <div class="main">
    <h1>메인 화면</h1>

    <!-- 내 포인트 -->
    <div class="points">
      <p>내 포인트: <span class="highlight">{{ points }}</span> 포인트</p>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.value" 
        :class="{ active: selectedTab === tab.value }" 
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 하위 메뉴 -->
    <div v-if="selectedTab === 'members'" class="submenu">
      <ul>
        <li>회원정보 수정</li>
        <li @click="showOrgChart = true">추천인 조직도</li>
      </ul>
      <OrgChart v-if="showOrgChart" />
    </div>

    <div v-if="selectedTab === 'orders'" class="submenu">
      <ul>
        <!-- 상품 추가 버튼 -->
        <li>
          <router-link to="/add-product">상품 추가</router-link>
        </li>
        <li>주문하기</li>
        <li>나의 주문</li>
        <li>
          <router-link to="/purchase-history">주문 내역</router-link>
        </li>
      </ul>
    </div>

    <div v-if="selectedTab === 'points'" class="submenu">
      <ul>
        <li>포인트 내역</li>
      </ul>
    </div>

    <div v-if="selectedTab === 'others'" class="submenu">
      <ul>
        <li>공지사항</li>
      </ul>
    </div>

    <!-- 상품 목록 -->
    <h2>상품 목록</h2>
    <div v-if="products.length > 0" class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item"
      >
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}">
          <h3>{{ product.name }}</h3>
          <img v-if="product.image" :src="product.image" alt="상품 이미지" class="product-image" />
          <p>{{ product.price }}원</p>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>상품이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrgChart from '@/components/OrgChart.vue';

export default {
  name: 'MainPage',
  components: {
    OrgChart,
  },
  data() {
    return {
      points: 0,
      selectedTab: 'members',
      showOrgChart: false,
      products: [],
      tabs: [
        { label: '회원 관리', value: 'members' },
        { label: '주문 관리', value: 'orders' },
        { label: '포인트 관리', value: 'points' },
        { label: '기타 관리', value: 'others' },
      ],
    };
  },
  created() {
    this.fetchUserPoints();
    this.fetchProducts();
  },
  methods: {
    async fetchUserPoints() {
      try {
        const response = await axios.get('https://backend-web.fly.dev/user/points', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.points = response.data.points;
      } catch (error) {
        console.error('포인트를 가져오는 데 실패했습니다', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('https://backend-web.fly.dev/products');
        this.products = response.data;
      } catch (error) {
        console.error('상품 목록을 가져오는 데 실패했습니다', error);
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
      this.showOrgChart = false;
    },
  },
};
</script>

<style scoped>
/* 메인 컨테이너 */
.main {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 포인트 섹션 */
.points {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.points .highlight {
  font-weight: bold;
  color: #007BFF;
}

/* 탭 메뉴 */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tabs button.active {
  background-color: #007BFF;
  color: white;
  border-color: #0056b3;
}

.tabs button:hover {
  background-color: #e7e7e7;
}

/* 하위 메뉴 */
.submenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.submenu li {
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.submenu li:hover {
  color: #007BFF;
}

/* 상품 목록 */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  width: 220px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-item img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}

.product-item h3 {
  font-size: 1.2em;
  margin-bottom: 5px;
}

.product-item p {
  font-size: 1em;
  color: #555;
}
</style>
