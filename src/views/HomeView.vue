<!-- HomeView.vue -->

<template>
  <div>
    <h1>홈 화면</h1>
    <div>
      <button>
        <router-link to="/signup">
          회원가입 화면 보기
        </router-link>
      </button>
    </div>

    <!-- 로그인 폼 -->
    <div>
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="이메일" required />
        <input v-model="password" type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);  // 로그인 성공 시 토큰 저장

        // 리디렉션 추가
        this.$router.push({ name: 'MainPage' });

        alert('로그인 성공');
      } catch (error) {
        console.error(error);
        alert('로그인 실패');
      }
    },
  },
};
</script>

<style scoped>
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

form {
  margin-top: 20px;
}

input {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}

h2 {
  margin-bottom: 15px;
}
</style>
