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
import { reactive, ref, computed, watch } from "vue";
const emit = defineEmits(["update:foundItems"]);
const props = defineProps({
  items: {
    type: Object,
    default: {},
  },
});
const searchValue = ref("");
const price = reactive({
  priceStart: null,
  priceEnd: null,
});

const foundItems = computed(() => {
  if (!props.items) return [];
  const searchLower = searchValue.value.toLowerCase();
  return props.items.filter((el) => {
    const matchesTitle = el.title.toLowerCase().startsWith(searchLower);
    const matchesPriceStart = !price.priceStart || el.price >= price.priceStart;
    const matchesPriceEnd = !price.priceEnd || el.price <= price.priceEnd;
    return matchesTitle && matchesPriceStart && matchesPriceEnd;
  });
});
watch(foundItems, (newValue) => {
  emit("update:foundItems", newValue);
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
