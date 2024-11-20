// Login.vue
<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">로그인</button>
    </form>
    <!-- 디버깅을 위한 상태 표시 -->
    <div v-if="debugInfo" style="margin-top: 20px; color: gray;">
      <pre>{{ debugInfo }}</pre>
    </div>
  </div>

  <div v-if="debugInfo" style="margin-top: 20px; color: gray;">
  <pre>{{ debugInfo }}</pre>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      debugInfo: null
    }
  },
  methods: {
  async login() {
    this.debugInfo = {
      email: this.email,
      password: this.password,
      message: '로그인 요청 시작',
    };
    console.log('로그인 요청 시작', this.debugInfo);
    // 이후 로그인 처리 로직...
    console.log(this.email, this.password)
    console.log('로그인 요청 시작'); // 확인용 로그 추가
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password,
      });

      console.log('응답 데이터:', response.data); // 응답 데이터 로그 확인
      localStorage.setItem('token', response.data.token); // 토큰 저장
      console.log('토큰 저장 완료'); // 로그 추가

      this.$router.push({ name: 'MainPage' }); // 라우트 리디렉션
      console.log('리디렉션 요청 완료'); // 로그 추가
    } catch (error) {
      console.error('로그인 실패:', error); // 에러 로그 확인
      alert('로그인 실패');
    }
  },
},


  // 컴포넌트 마운트 시 라우터 상태 확인
  mounted() {
    console.log('Current route:', this.$route)
    console.log('Router instance:', this.$router)
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

input, button {
  padding: 8px;
  margin: 5px 0;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>