// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MainPage from '../views/MainPage.vue'
import ProductPage from '../views/ProductPage.vue';
import ProductDetail from '../views/ProductDetail.vue';
import AddProductPage from '@/components/AddProduct.vue'; // 상품 추가 페이지 컴포넌트 임포트


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    name: 'ProductPage',
    component: ProductPage
  },
  {
    path: '/product/:id', // 상품 상세 페이지 경로
    name: 'ProductDetail',
    component: ProductDetail,
    props: true, // URL 매개변수를 컴포넌트로 전달
  },
  {
    path: '/add-product',
    name: 'AddProductPage',
    component: AddProductPage, // 상품 추가 페이지 경로 등록
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 디버깅을 위한 네비게이션 가드
router.beforeEach((to, from, next) => {
  console.log('Navigation triggered:', { from: from.path, to: to.path })
  
  const token = localStorage.getItem('token')
  console.log('Current token:', token ? 'exists' : 'not found')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('Route requires auth')
    if (!token) {
      console.log('No token found, redirecting to login')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      console.log('Token found, proceeding to route')
      next()
    }
  } else {
    console.log('Route does not require auth')
    next()
  }
})

router.afterEach((to, from) => {
  console.log('Navigation completed:', { from: from.path, to: to.path })
})

export default router