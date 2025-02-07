<template>
  <div v-if="isLoggedIn">
    <nav class="nav-wrapper">
      <ul class="navigation">
        <RouterLink class="navigation__item" to="/home">Главная</RouterLink>
        <RouterLink class="navigation__item" to="/product-send"
          >Отправить заказ</RouterLink
        >
        <RouterLink class="navigation__item" to="/product-create"
          >Создать товар</RouterLink
        >
      </ul>
      <span class="user">{{ currentUser.name }} {{ currentUser.login }}</span>
      <button class="basket" @click="handleBasketOpen()">Корзина</button>
      <button @click="handleExit()">Выйти</button>
    </nav>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useProductsStore } from "./store/products";
import { storeToRefs } from "pinia";

const router = useRouter();
const products = useProductsStore();

const { logout } = useProductsStore();
const { isLoggedIn, currentUser } = storeToRefs(products);

const handleBasketOpen = () => {
  router.push("/basket");
};
const handleExit = () => {
  logout();
  router.push("/login");
};
</script>
<style scoped>
.wrapper {
  display: grid;
  gap: 30px;
}
.basket {
  background-color: #3fa73e;
  color: #fff;
  margin-right: 20px;
}
.navigation {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  column-gap: 50px;
}
.navigation__item {
  color: #000;
  font-size: 20px;
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
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
.user {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
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
