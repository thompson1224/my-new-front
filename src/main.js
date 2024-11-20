// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 라우터 디버깅을 위한 전역 에러 핸들러
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  console.log('Component:', vm)
  console.log('Error Info:', info)
}

app.use(router)
app.mount('#app')