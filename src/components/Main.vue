<template>
  <div class="search-wrapper">
    <Search
      class="search"
      v-if="products?.length"
      :items="products"
      @update:foundItems="handleFoundItems"
    />
  </div>
  <div class="wrapper">
    <div v-if="!products?.length" class="loading">Loading&#8230;</div>
    <div class="flex product">
      <ProductCard
        v-for="(product, index) in foundItems"
        :product="product"
        @addToBasket="(item) => addToBasket(item)"
        @click="openProductCard(product.id)"
      />
    </div>
  </div>
  <div class="empty-search" v-if="!foundItems?.length && !products?.length">
    Ничего не найдено...
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, computed, watch } from "vue";
import ProductCard from "./ProductCard.vue";
import Search from "./Search.vue";
import axios from "axios";
const foundItems = ref([]);
const products = ref({});
const existingProducts = ref([]);

const itemsInBasket = ref([]);
const initialBasket = ref([]);

import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  existingProducts.value = JSON.parse(localStorage.getItem("products")) || [];
  fetchData();
  loadBasket();
});

const loadBasket = () => {
  if (localStorage.getItem("basket").length) {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      try {
        initialBasket.value = JSON.parse(storedBasket);
        itemsInBasket.value = initialBasket.value;
      } catch (error) {
        console.error("Ошибка при парсинге данных из localStorage:", error);
      }
    }
  }
};

const addToBasket = (item) => {
  const existingItemIndex = itemsInBasket.value.findIndex(
    (obj) => obj.item.id === item.id
  );

  if (existingItemIndex !== -1) {
    itemsInBasket.value[existingItemIndex].count += 1;
  } else {
    itemsInBasket.value.push({ item: item, count: 1 });
  }

  localStorage.setItem("basket", JSON.stringify(itemsInBasket.value));
};
const handleFoundItems = (items) => {
  foundItems.value = items;
};
const basketItems = computed(() => {
  return itemsInBasket.value;
});
const openProductCard = (id) => {
  router.push(`/product/${id}`);
};
watch(basketItems, (newVal) => {
  localStorage.setItem("basket", JSON.stringify(newVal));
});
const fetchData = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products.value = response?.data;
    foundItems.value = response?.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
  if (existingProducts.value.length) {
    foundItems.value = existingProducts.value;
  }
};
</script>
<style scoped>
.wrapper {
  display: grid;
  gap: 30px;
}
.flex {
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr 1fr;
}
.product {
  cursor: pointer;
}
.search-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.search {
  width: 100%;
}
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loading:before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.loading:not(:required) {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: "";
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}
.empty-search {
  font-size: 50px;
  margin-top: 100px;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
