<template>
  <div class="basket__wrapper">
    <button class="basket__clear" @click="clearBasket()">
      Oчистить корзину
    </button>
    <div v-for="(item, index) in productsInBasket" :key="index">
      <basket-item :product="item.item" :count="item.count" />
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useProductsStore } from "./store/products";

import BasketItem from "./UI/BasketItem.vue";

const { productsInBasket } = storeToRefs(useProductsStore());
const { clearBasket } = useProductsStore();
</script>
<style scoped>
.basket__wrapper {
  padding: 100px;
}
.basket__clear {
  margin-bottom: 50px;
  background-color: rgba(128, 128, 128, 0.308);
}
</style>
