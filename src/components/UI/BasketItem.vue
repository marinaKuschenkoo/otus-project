<template>
  <div class="product">
    <img class="product__image" :src="product.image" />
    <span class="product__title">{{ product.title }}</span>
    <span class="product__count">{{ count }} шт</span>
    <span class="product__price">{{ product.price }}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  product: Object,
  count: Number,
});
</script>
<style scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}
.product__image {
  width: 100px;
  height: 100px;
  flex-basis: fit-content;
}
.product__title {
  max-width: 270px;
  width: 100%;
  overflow: hidden;
}
</style>
