<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="signup">
      <!-- 각 input을 div로 감싸서 세로 정렬 -->
      <div class="input-container">
        <input v-model="userid" placeholder="userid" required />
      </div>
      <div class="input-container">
        <input v-model="username" placeholder="username" required />
      </div>
      <div class="input-container">
        <input v-model="email" placeholder="Email" required />
      </div>
      <div class="input-container">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div class="input-container">
        <input v-model="recommenderId" placeholder="추천인 ID (선택)" />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserSignup',
  data() {
    return {
      userid: '',
      username: '',
      email: '',
      password: '',
      recommenderId: '',  // 추천인 ID 필드 추가
    };
  },
  methods: {
    async signup() {
      try {
        const data = {
          userid: this.userid,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        if (this.recommenderId) {
          data.recommenderid = this.recommenderId;
        }

        await axios.post('https://backend-web.fly.dev/signup', data);
        alert('회원가입 성공');
      } catch (error) {
        alert('회원가입 실패');
        console.error('회원가입 오류:', error);
      }
    },
  },
};
</script>

<style scoped>
/* input-container 클래스에 스타일 적용하여 세로로 정렬 */
.input-container {
  margin-bottom: 15px;  /* 각 입력 필드 간의 간격 */
}

input {
  width: 100%;  /* input 필드의 너비를 100%로 설정 */
  padding: 10px;
  margin: 5px 0; /* 입력창 간격 */
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
