<!-- MainPage.vue -->
<template>
  <div class="main-container">
    <div class="sidebar">
      <div class="user-profile">
        <img src="/api/placeholder/100/100" alt="Profile" class="profile-image" />
        <div class="user-info">
          <h2>홍길동님</h2>
          <div class="points-badge">
            <i class="icon-coins"></i>
            <span>{{ points }} 포인트</span>
          </div>
        </div>
      </div>

      <nav class="main-nav">
        <div 
          v-for="tab in tabs" 
          :key="tab.value" 
          :class="['nav-item', { 'active': selectedTab === tab.value }]"
          @click="selectTab(tab.value)"
        >
          <span>{{ tab.label }}</span>
        </div>
      </nav>
    </div>

    <div class="content-area">
      <div class="content-header">
        <h1>{{ tabs.find(t => t.value === selectedTab).label }}</h1>
      </div>

      <div v-if="selectedTab === 'members'" class="content-section">
        <div class="grid-menu">
          <div class="menu-card" @click="showOrgChart = true">
            <i class="icon-network"></i>
            <span>추천인 조직도</span>
          </div>
          <div class="menu-card">
            <i class="icon-user-edit"></i>
            <span>회원정보 수정</span>
          </div>
        </div>
        <OrgChart v-if="showOrgChart" />
      </div>

      <div v-if="selectedTab === 'orders'" class="content-section">
        <div class="grid-menu">
          <router-link to="/add-product" class="menu-card">
            <i class="icon-plus"></i>
            <span>상품 추가</span>
          </router-link>
          <div class="menu-card">
            <i class="icon-shopping-cart"></i>
            <span>주문하기</span>
          </div>
          <router-link to="/mypurchase" class="menu-card">
            <i class="icon-list"></i>
            <span>나의 주문</span>
          </router-link>
          <router-link to="/purchase-history" class="menu-card">
            <i class="icon-history"></i>
            <span>주문 내역</span>
          </router-link>
        </div>
      </div>

      <div class="product-grid">
        <h2>추천 상품</h2>
        <div v-if="products.length > 0" class="products">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-card"
          >
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id }}">
              <div class="product-image-container">
                <img 
                  :src="product.image || '/api/placeholder/250/250'" 
                  :alt="product.name" 
                  class="product-image"
                />
              </div>
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
  display: flex;
  background-color: var(--background-color);
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.points-badge {
  display: inline-flex;
  align-items: center;
  background-color: #e1f5fe;
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 20px;
}

.main-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  background-color: var(--primary-color);
  color: white;
}

.content-area {
  flex-grow: 1;
  padding: 30px;
  background-color: var(--background-color);
}

.grid-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
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

.product-image-container {
  aspect-ratio: 1/1;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 15px;
}

.product-price {
  color: var(--secondary-color);
  font-weight: bold;
}
</style>