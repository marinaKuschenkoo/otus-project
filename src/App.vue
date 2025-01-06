<template>
  <div>
    <div class="search-wrapper">
      <Search
        class="search"
        v-if="products.length"
        :items="products"
        v-model="foundItems"
      />
      <base-button text="Отправить заказ" @click="sendOrder()" />
      <base-button text="Создать товар" @click="createProduct()" />
    </div>
    <div class="wrapper">
      <div v-if="!products.length" class="loading">Loading&#8230;</div>
      <div v-if="!foundItems.length" class="flex">
        <ProductCard v-for="(product, index) in products" :product="product" />
      </div>
      <div class="flex" v-else>
        <ProductCard
          v-for="(product, index) in foundItems"
          :product="product"
        />
      </div>
    </div>
    <div class="empty-search" v-if="!foundItems?.length && !products?.length">
      Ничего не найдено...
    </div>
  </div>
  <ProductSendForm
    v-if="isFormSendOrderActive"
    @closeProductSendPopup="closeProductSendPopup"
  />
  <ProductCreateForm
    v-if="isFormCreateProductActive"
    @saveProduct="(product) => addProduct(product)"
    @closeProductCreatePopup="closeProductCreatePopup"
  />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import ProductCard from "./components/ProductCard.vue";
import Search from "./components/Search.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import ProductSendForm from "./components/ProductSendForm.vue";
import ProductCreateForm from "./components/ProductCreateForm.vue";
import axios from "axios";
const foundItems = ref([]);
const products = ref({});
const isFormSendOrderActive = ref(false);
const isFormCreateProductActive = ref(false);
onMounted(() => {
  fetchData();
});
const sendOrder = () => {
  isFormSendOrderActive.value = true;
};
const closeProductSendPopup = () => {
  isFormSendOrderActive.value = false;
};
const closeProductCreatePopup = () => {
  isFormCreateProductActive.value = false;
};
const createProduct = () => {
  isFormCreateProductActive.value = true;
};
const addProduct = (product) => {
  products.value.unshift({
    id: products.value[products.value.length - 1].id + 1,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      cont: 0,
      rate: 0,
    },
  });
  isFormCreateProductActive.value = false;
};
const fetchData = async () => {
  axios.get("https://fakestoreapi.com/products").then(function (data) {
    products.value = data.data;
  });
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
