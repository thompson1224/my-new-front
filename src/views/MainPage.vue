<template>
  <div class="main">
    <h1>메인 화면</h1>

    <!-- 내 포인트 -->
    <div class="points">
      <p>내 포인트: {{ points }} 포인트</p>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tabs">
      <button @click="selectTab('members')">회원 관리</button>
      <button @click="selectTab('orders')">주문 관리</button>
      <button @click="selectTab('points')">포인트 관리</button>
      <button @click="selectTab('others')">기타 관리</button>
    </div>

    <!-- 하위 메뉴 -->
    <div v-if="selectedTab === 'members'">
      <ul>
        <li>회원정보 수정</li>
        <li>추천인 조직도</li>
      </ul>
    </div>

    <div v-if="selectedTab === 'orders'">
      <ul>
        <li>주문하기</li>
        <li>주문내역</li>
      </ul>
    </div>

    <div v-if="selectedTab === 'points'">
      <ul>
        <li>포인트 내역</li>
      </ul>
    </div>

    <div v-if="selectedTab === 'others'">
      <ul>
        <li>공지사항</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name : 'MainPage',
  data() {
    return {
      points: 0, // 초기 포인트 값
      selectedTab: 'members',
    };
  },
  created() {
    // 로그인 후 사용자 포인트 값을 가져옵니다
    this.fetchUserPoints();
  },
  methods: {
    // 서버에서 포인트를 받아오는 API 호출
    async fetchUserPoints() {
      try {
        const response = await axios.get('http://localhost:3000/user/points', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.points = response.data.points;
      } catch (error) {
        console.error('포인트를 가져오는 데 실패했습니다', error);
      }
    },

    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style scoped>
.main {
  padding: 20px;
}

.tabs button {
  margin: 5px;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 5px 0;
}
</style>
