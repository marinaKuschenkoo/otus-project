<template>
  <div class="search">
    <base-input
      class="search__input"
      placeholder="Поиск"
      v-model:inputValue="searchValue"
      name="search"
    />
    <div class="search__price">
      <base-input
        class="search__input_price"
        placeholder="От"
        v-model:inputValue="price.priceStart"
        name="productPrice"
      />
      <base-input
        class="search__input_price"
        placeholder="До"
        v-model:inputValue="price.priceEnd"
        name="productPrice"
      />
    </div>
  </div>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import { reactive, ref, watch } from "vue";
import { useProductsStore } from "./store/products";
const { search } = useProductsStore();

const searchValue = ref("");
const price = reactive({
  priceStart: null,
  priceEnd: null,
});

watch([searchValue, price], (newValue) => {
  search(newValue[0], newValue[1]);
});
</script>
<style scoped lang="scss">
.search {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.search__input {
  width: 40%;
  margin-bottom: 50px;
}
.search__price {
  display: flex;
  column-gap: 20px;
  width: 100%;
  margin-left: 50px;
}
.search__input_price {
  width: 10%;
}
</style>
