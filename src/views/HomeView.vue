//HomeView.vue

<template>
  <div>
    <h1>홈 화면</h1>
    <div>
      <button @click="showSignupForm = !showSignupForm">
        {{ showSignupForm ? '로그인 화면 보기' : '회원가입 화면 보기' }}
      </button>
    </div>

    <!-- 로그인 폼 -->
    <div v-if="!showSignupForm">
      <h2>로그인</h2>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="이메일" required />
        <input v-model="password" type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
    </div>

    <!-- 회원가입 폼 -->
    <div v-if="showSignupForm">
      <h2>회원가입</h2>
      <form @submit.prevent="signup">
        <input v-model="username" placeholder="사용자명" required />
        <input v-model="email" placeholder="이메일" required />
        <input v-model="password" type="password" placeholder="비밀번호" required />
        <button type="submit">회원가입</button>
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
      showSignupForm: false,  // 로그인 폼과 회원가입 폼을 전환하기 위한 변수
      username: '',
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
    async signup() {
      try {
        await axios.post('http://localhost:3000/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        alert('회원가입 성공');
        this.showSignupForm = false;  // 회원가입 후 로그인 폼으로 돌아가기
      } catch (error) {
        console.error(error);
        alert('회원가입 실패');
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
