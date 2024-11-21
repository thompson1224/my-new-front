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

        console.log('Hierarchy Data:', this.hierarchyData);  // API에서 받은 데이터 확인

        if (Array.isArray(this.hierarchyData) && this.hierarchyData.length > 0) {
            const convertToChartData = (node, parentName = null) => {
                const name = node.user_name || '이름 없음';
                const tooltip = `${node.join_date || '가입일 없음'}`;
                data.addRow([name, parentName, tooltip]);

                // 하위 노드 처리
                node.children.forEach(child => convertToChartData(child, name));
            };

            // 최상위 루트 노드부터 데이터 변환
            this.hierarchyData.forEach(root => convertToChartData(root));

            // Google Chart로 그리기
            const chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
            chart.draw(data, { allowHtml: true });
        } else {
            console.error('계층 데이터가 비어 있습니다.');
        }
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
