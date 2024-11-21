<template>
  <div>
    <h2>상품 추가</h2>
    <form @submit.prevent="addProduct">
      <div>
        <label for="name">상품명:</label>
        <input v-model="newProduct.name" type="text" id="name" required />
      </div>
      <div>
        <label for="description">설명:</label>
        <textarea v-model="newProduct.description" id="description" required></textarea>
      </div>
      <div>
        <label for="price">가격:</label>
        <input v-model="newProduct.price" type="number" id="price" required />
      </div>
      <div>
        <label for="stock">포인트 가격:</label>
        <input v-model="newProduct.pointprice" type="number" id="pointprice" required />
      </div>
      <div>
        <label for="stock">적립포인트:</label>
        <input v-model="newProduct.bonuspoint" type="number" id="bonuspoint" required />
      </div>
      <div>
        <label for="stock">재고:</label>
        <input v-model="newProduct.stock" type="number" id="stock" required />
      </div>
      <button type="submit">상품 추가</button>
    </form>

    <h2>상품 목록</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>가격: {{ product.price }}원</p>
        <p>재고: {{ product.stock }}개</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: 0,
        pointprice: 0,      
        bonuspoint: 0,
        stock: 0
      },
      products: []
    };
  },
  methods: {
    async addProduct() {
      try {
        const response = await fetch('http://localhost:3000/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newProduct)
        });

        const data = await response.json();
        if (response.ok) {
          this.getProducts();  // 상품 추가 후 목록 갱신
          alert('상품이 추가되었습니다.');
        } else {
          alert(data.error);
        }

        // 폼 초기화
        this.newProduct.name = '';
        this.newProduct.description = '';
        this.newProduct.price = 0;
        this.newProduct.bonuspoint = 0;
        this.newProduct.pointprice = 0;
        this.newProduct.stock = 0;
      } catch (error) {
        console.error('상품 추가 실패:', error);
        alert('상품 추가에 실패했습니다.');
      }
    },
    async getProducts() {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('상품 목록 불러오기 실패:', error);
      }
    }
  },
  created() {
    this.getProducts(); // 페이지가 로드될 때 상품 목록을 가져옴
  }
};
</script>

<style scoped>
/* 스타일 추가 */
form {
  margin-bottom: 20px;
}

input, textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

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
</style>
