//ProductDetail.vue

<template>
  <div>
    <h1>{{ product.name }}</h1>
    <img v-if="product.image" :src="product.image" alt="상품 이미지" />
    <p>가격: {{ product.price }}원</p>
    <p>적립 포인트: {{ product.bonuspoint }}점</p> <!-- 적립 포인트 표시 -->

    <!-- 구매 갯수 선택 -->
    <div>
      <label for="quantity">구매 갯수:</label>
      <input id="quantity" v-model.number="quantity" type="number" min="1" />
    </div>

    <!-- 구매 버튼 -->
    <button @click="buyProduct">구매하기</button>

    <!-- 구매 성공 메시지 -->
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {}, // 상품 정보
      quantity: 1, // 구매 수량
      successMessage: '', // 성공 메시지
    };
  },
  created() {
    this.fetchProduct(); // 상품 정보 가져오기
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id; // URL에서 상품 ID 가져오기
      try {
        const response = await axios.get(`https://backend-web.fly.dev/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('상품 정보를 가져오는 데 실패했습니다:', error);
      }
    },
    async buyProduct() {
    try {
      const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
      const response = await axios.post(
        'https://backend-web.fly.dev/purchase',
        {
          productId: this.product.id,
          quantity: this.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
          },
        }
      );
      this.successMessage = `구매 완료! 적립된 포인트: ${response.data.pointsEarned}`;
    } catch (error) {
      console.error('구매에 실패했습니다:', error);
      }
    },
  },
};
</script>


