<template>
  <div class="basket__wrapper">
    <button class="basket__clear" @click="clear()">Oчистить корзину</button>
    <div v-for="(item, index) in basketItems" :key="index">
      <basket-item :product="item.item" :count="item.count" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import BasketItem from "./UI/BasketItem.vue";

const basketItems = ref([]);
onMounted(() => {
  if (localStorage.getItem("basket").length) {
    basketItems.value = JSON.parse(localStorage.getItem("basket"));
  }
});
const clear = () => {
  localStorage.setItem("basket", []);

  basketItems.value = [];
};
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
