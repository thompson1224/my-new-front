<!-- MainPage.vue -->
<template>
  <div class="main-container">
    <nav class="top-nav">
      <div 
        v-for="tab in tabs" 
        :key="tab.value" 
        :class="['nav-item', { 'active': selectedTab === tab.value }]"
        @click="selectTab(tab.value)"
      >
        {{ tab.label }}
      </div>
    </nav>

    <div class="content-area">
      <div v-if="selectedTab === 'members'" class="content-section">
        <div class="grid-menu">
          <div class="menu-card" @click="showOrgChart = true">
            <span>추천인 조직도</span>
          </div>
          <div class="menu-card">
            <span>회원정보 수정</span>
          </div>
        </div>
        <OrgChart v-if="showOrgChart" />
      </div>

      <div v-if="selectedTab === 'orders'" class="content-section">
        <div class="grid-menu">
          <router-link to="/add-product" class="menu-card">
            <span>상품 추가</span>
          </router-link>
          <div class="menu-card">
            <span>주문하기</span>
          </div>
          <router-link to="/mypurchase" class="menu-card">
            <span>나의 주문</span>
          </router-link>
          <router-link to="/purchase-history" class="menu-card">
            <span>주문 내역</span>
          </router-link>
        </div>
      </div>

      <div class="product-grid">
        <h2>상품 목록</h2>
        <div v-if="products.length > 0" class="products">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-card"
          >
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}">
              <div class="product-details">
                <h3>{{ product.name }}</h3>
                <p class="product-price">{{ product.price.toLocaleString() }}원</p>
              </div>
            </router-link>
          </div>
        </div>
        <p v-else class="no-products">상품이 없습니다.</p>
      </div>
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
};</script>

<style scoped>
:root {
  --primary-color: #3f51b5;
  --secondary-color: #ff4081;
  --background-color: #f5f5f5;
  --text-color: #333;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-container {
  background-color: var(--background-color);
  min-height: 100vh;
}

.top-nav {
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-item {
  padding: 15px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.nav-item:hover, .nav-item.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.content-area {
  padding: 30px;
}

.grid-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.menu-card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: transform 0.3s;
}

.menu-card:hover {
  transform: translateY(-5px);
}

.product-grid {
  margin-top: 30px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-details {
  padding: 15px;
  text-align: center;
}

.product-price {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>