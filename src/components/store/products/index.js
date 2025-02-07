import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProductsStore = defineStore(
  "products",
  () => {
    //state
    const isLoggedIn = ref(false);
    const currentUser = ref({
      login: "",
      password: "",
      name: "",
      address: "",
    });
    const products = ref([]);
    const foundProducts = ref([]);
    const productsInBasket = ref([]);

    // actions
    function loginUser(userData) {
      isLoggedIn.value = true;

      currentUser.value.login = userData?.login;
      currentUser.value.password = userData?.password;
      currentUser.value.name = userData?.name;
      currentUser.value.address = userData?.address;
    }
    function logout() {
      isLoggedIn.value = false;

      currentUser.value.login = "";
      currentUser.value.password = "";
    }
    function addToBasket(item) {
      const existingItemIndex = productsInBasket.value.findIndex(
        (obj) => obj.item.id === item.id
      );

      if (existingItemIndex !== -1) {
        productsInBasket.value[existingItemIndex].count += 1;
      } else {
        productsInBasket.value.push({ item: item, count: 1 });
      }
    }
    function clearBasket() {
      productsInBasket.value = [];
    }
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        products.value = response?.data;
        foundProducts.value = response?.data;
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }

    function search(inputValue = "", price = null) {
      if (!products.value) return [];
      const searchLower = inputValue.toLowerCase();

      foundProducts.value = products.value.filter((el) => {
        const matchesTitle = el.title.toLowerCase().startsWith(searchLower);
        const matchesPriceStart =
          !price?.priceStart || el.price >= price?.priceStart;
        const matchesPriceEnd = !price?.priceEnd || el.price <= price?.priceEnd;
        return matchesTitle && matchesPriceStart && matchesPriceEnd;
      });
    }
    function addProduct(product) {
      products.value.push(product);
      foundProducts.value = products.value;
    }
    async function sendOrder(user) {
      try {
        const response = await axios.post("https://httpbin.org/post", {
          user: user,
        });
        return response;
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    }
    return {
      loginUser,
      logout,
      fetchProducts,
      search,
      addToBasket,
      clearBasket,
      addProduct,
      sendOrder,
      isLoggedIn,
      currentUser,
      products,
      foundProducts,
      productsInBasket,
    };
  },
  {
    persist: [
      {
        pick: ["isLoggedIn", "products", "foundProducts"],
        storage: localStorage,
      },
    ],
  }
);
