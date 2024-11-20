<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="signup">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
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
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signup() {
      try {
        await axios.post('http://localhost:3000/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        alert('회원가입 성공');
      } catch (error) {
        alert('회원가입 실패');
      }
    },
  },
};
</script>
