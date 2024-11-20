//OrgChart.vue

<template>
  <div>
    <h2>추천인 조직도</h2>
    <div id="chart_div"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrgChart',
  data() {
    return {
      hierarchyData: [], // API에서 가져온 추천인 계층 데이터
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/users/hierarchy', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // 인증 토큰 전달
        },
      });
      
      // 응답 데이터가 올바르게 가져와졌는지 확인
      console.log('API 응답 데이터:', response.data);

      this.hierarchyData = response.data; // 서버에서 계층 데이터를 가져옴
      this.drawChart(); // 조직도 그리기 함수 호출
    } catch (error) {
      console.error('조직도 데이터를 가져오는 중 오류 발생:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  },
  methods: {
    drawChart() {
  google.charts.load('current', { packages: ['orgchart'] });
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    console.log('Hierarchy Data:', this.hierarchyData); // API에서 받은 데이터 확인

    // API 데이터를 Google Charts 형식으로 변환
    this.hierarchyData.forEach((user) => {
      // 각 사용자에서 필요한 값들을 추출
      const userName = user.user_name || '이름 없음';  // 이름이 없으면 '이름 없음'으로 처리
      const recommenderName = user.recommender_name === '없음' ? null : user.recommender_name || '추천인 없음'; // '없음'일 경우 null 처리
      const userLevel = user.user_level || '레벨 없음';  // 유저 레벨이 없으면 '레벨 없음'
      const joinDate = user.join_date || '가입일 없음';  // 가입 날짜가 없으면 '가입일 없음'

      console.log('Adding row:', userName, recommenderName, `${userLevel} (${joinDate})`); // 추가되는 행 확인

      // Google Charts 데이터에 행 추가
      data.addRow([userName, recommenderName, `${userLevel} (${joinDate})`]);
    });

    // Google Chart로 그리기
    const chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, { allowHtml: true });
  });
},
  },
};
</script>

<style scoped>
#chart_div {
  margin: 20px auto;
  width: 100%; /* 너비를 100%로 설정 */
  height: 400px; /* 높이를 명시적으로 설정 */
}
</style>
