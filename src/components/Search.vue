<template>
  <div class="search">
    <base-input
      class="search__input"
      placeholder="Поиск"
      v-model:inputValue="searchValue"
    />
    <div class="search__price">
      <base-input
        class="search__input_price"
        placeholder="От"
        v-model:inputValue="price.priceStart"
      />
      <base-input
        class="search__input_price"
        placeholder="До"
        v-model:inputValue="price.priceEnd"
      />
    </div>
  </div>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import { reactive, ref, computed } from "vue";
const props = defineProps({
  items: Object,
  default: () => ({}),
});
const searchValue = ref("");
const price = reactive({
  priceStart: null,
  priceEnd: null,
});
const foundItems = defineModel();
foundItems.value = computed(() => {
  const searchLower = searchValue?.value.toLowerCase();
  return props?.items?.filter((el) => {
    const matchesTitle = el.title.toLowerCase().startsWith(searchLower);
    const matchesPriceStart = price.priceStart
      ? el.price > price.priceStart
      : true;
    const matchesPriceEnd = price.priceEnd ? el.price < price.priceEnd : true;

    return matchesTitle && matchesPriceStart && matchesPriceEnd;
  });
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
