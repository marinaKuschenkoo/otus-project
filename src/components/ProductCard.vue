<template>
  <div class="product">
    <div
      class="product__image"
      :style="{
        background: `url(${product.image}) no-repeat center / contain`,
      }"
    ></div>
    <div class="product__description">
      <div class="product__description_text">
        <span class="product__title">{{ product.title }}</span>
        <span class="product__info">{{ product.description }}</span>
      </div>
      <span class="product__category">{{ product.category }}</span>
      <div class="product__rating_wrapper">
        <div class="product__rating">
          <span
            class="product__rate"
            :class="product.rating.rate > 4 ? 'green' : 'red'"
            >{{ product.rating.rate }}</span
          >
          <span class="product__rating_count"
            >{{ product.rating.count }} Review</span
          >
        </div>
        <p class="product__price">{{ product.price }} $</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    default: {},
  },
});
</script>

<style scoped>
.product {
  max-width: 440px;
  height: 600px;
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 30px;
}
.product__image {
  width: 100%;
  height: 280px;
  background-color: white !important;
}
.product__description {
  margin: 16px auto;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  justify-content: space-between;
}
.product__description_text {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
.product__title {
  font-family: DM Sans, sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 41.66px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: justify;
}
.product__info {
  font-family: DM Sans, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.23px;
  letter-spacing: 0.04em;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: justify;
}
.product__category {
  font-family: DM Sans, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20.83px;
  letter-spacing: 0.04em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #888888;
}
.product__rating_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.product__rating {
  display: flex;
  column-gap: 5px;
}
.product__price {
  font-family: DM Sans, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 31.25px;
  letter-spacing: 0.04em;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.green {
  color: #3fcf3d;
}
.red {
  color: #e32222;
}
</style>
