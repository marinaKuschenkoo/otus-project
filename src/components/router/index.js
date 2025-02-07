import { createWebHistory, createRouter } from "vue-router";
import { useProductsStore } from "../store/products/index";
import Main from "../../components/Main.vue";
import ProductSendForm from "../../components/ProductSendForm.vue";
import ProductCreateForm from "../../components/ProductCreateForm.vue";
import Basket from "../../components/Basket.vue";
import ProductPage from "../../components/ProductPage.vue";
import Auth from "../../components/Auth.vue";

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
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useProductsStore();
  if (!isLoggedIn && !to.meta.canEnterUnauthorized) {
    next({ path: "/login" });
  } else {
    next();
  }
});
export default router;
