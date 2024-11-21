<template>
  <div>
    <h1>상품 관리</h1>
    <AddProduct />
  </div>
</template>

<script>
// AddProduct.vue 컴포넌트를 import
import AddProduct from '@/components/AddProduct.vue';

export default {
  components: {
    AddProduct
  }
};
</script>
