<template>
  <div class="product">
    <div
      class="product__image"
      :style="{
        background: `url(${product?.image}) no-repeat center / contain`,
      }"
    ></div>
    <div class="product__description">
      <div class="product__description_text">
        <span class="product__title">{{ product?.title }}</span>
        <span class="product__info">{{ product?.description }}</span>
      </div>
      <span class="product__category">{{ product?.category }}</span>
      <div class="product__rating_wrapper">
        <div class="product__rating">
          <span
            class="product__rate"
            :class="product?.rating?.rate > 4 ? 'green' : 'red'"
            >{{ product?.rating?.rate }}</span
          >
          <span class="product__rating_count"
            >{{ product?.rating?.count }} Review</span
          >
        </div>
        <p class="product__price">{{ product?.price }} $</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref, computed, watch } from "vue";

const product = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products/1");
    product.value = response.data;
  } catch {
    console.log("Не удалось подгрузить информацию о товаре");
  }
});
</script>
<style scoped>
.product {
  display: flex;
  align-items: center;
}
.product__image {
  width: 500px;
  height: 700px;
}
.product__description_text {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.product__title {
  font-weight: 700;
  font-size: 20px;
}
.product__category {
  color: grey;
}
.green {
  color: #3fcf3d;
}
.red {
  color: #e32222;
}
.product__rating {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  justify-content: center;
}
</style>
