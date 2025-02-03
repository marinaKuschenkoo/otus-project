import { createRouter, createWebHistory } from "vue-router"; // Используем createWebHistory для веб-приложений
import { createApp } from "vue";
import VueCookies from "vue-cookies";
import "./style.css";
import App from "./App.vue";
import Main from "./components/Main.vue";
import ProductSendForm from "./components/ProductSendForm.vue";
import ProductCreateForm from "./components/ProductCreateForm.vue";
import Basket from "./components/Basket.vue";
import ProductPage from "./components/ProductPage.vue";
import Auth from "./components/Auth.vue";

const routes = [
  {
    path: "/",
    alias: "/login",
    name: "Auth",
    meta: { canEnterUnauthorized: true },
    component: Auth,
  },
  {
    path: "/home",
    name: "home",
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: "/product-send",
    name: "ProductSendForm",
    component: ProductSendForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/product-create",
    name: "ProductCreateForm",
    component: ProductCreateForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
    meta: { requiresAuth: true },
  },
  {
    path: "/product/:id",
    name: "Product",
    component: ProductPage,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(), // Используем createWebHistory для веб-приложений
  routes,
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn && !to.meta.canEnterUnauthorized) {
    next({ path: "/login" });
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount("#app");
