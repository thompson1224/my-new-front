<!-- HomeView.vue -->
<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-logo">
        <img src="/api/placeholder/200/200" alt="Logo" />
      </div>
      <div class="login-form">
        <h1>로그인</h1>
        <form @submit.prevent="login">
          <div class="input-group">
            <input 
              v-model="userid" 
              placeholder="아이디" 
              required 
              type="text"
            />
            <span class="input-icon">👤</span>
          </div>
          <div class="input-group">
            <input 
              v-model="password" 
              placeholder="비밀번호" 
              required 
              type="password"
            />
            <span class="input-icon">🔒</span>
          </div>
          <button type="submit" class="login-button">
            로그인
          </button>
        </form>
        <div class="signup-link">
          <router-link to="/signup">
            회원가입
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// [Keep your existing script, no changes needed]
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-wrapper {
  display: flex;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 800px;
  width: 100%;
}

.login-logo {
  flex: 1;
  background-color: #3f51b5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.login-logo img {
  max-width: 200px;
  border-radius: 50%;
}

.login-form {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: border-color 0.3s;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
}

.input-group input:focus {
  border-color: #3f51b5;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2196f3;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #3f51b5;
  text-decoration: none;
}
</style>