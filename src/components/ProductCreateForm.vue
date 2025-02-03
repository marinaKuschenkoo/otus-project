<template>
  <form>
    <div class="row">
      <base-input
        name="productTitle"
        class="input"
        placeholder="Заголовок"
        v-model:inputValue="product.title"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('title', text);
          }
        "
      />
      <base-input
        name="productDescription"
        class="input"
        placeholder="Текст"
        v-model:inputValue="product.description"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('description', text);
          }
        "
      />
      <base-input
        name="productCategory"
        class="input"
        placeholder="Категория"
        v-model:inputValue="product.category"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('category', text);
          }
        "
      />
    </div>
    <div class="row">
      <base-input
        name="productPrice"
        class="input"
        placeholder="Стоимость"
        v-model:inputValue="product.price"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('price', text);
          }
        "
      />
      <base-input
        class="input"
        name="productImage"
        placeholder="Ссылка на картинку"
        v-model:inputValue="product.image"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('image', text);
          }
        "
      />
    </div>
    <base-button @click="saveProduct($event)" class="button" text="СОХРАНИТЬ" />
  </form>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import BaseButton from "./UI/BaseButton.vue";
import { reactive, computed } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const emit = defineEmits(["closeProductCreatePopup", "saveProduct"]);
const product = reactive({
  id: Math.random().toString(36).substr(2, 9),
  title: null,
  description: null,
  category: null,
  price: null,
  image: null,
});
const errorMessage = reactive({
  title: null,
  description: null,
  category: null,
  price: null,
  image: null,
});

const isValidate = computed(() => {
  return (
    product.title &&
    product.description &&
    product.category &&
    product.price &&
    product.image &&
    !Object.values(errorMessage).some(
      (value) => value !== null && value !== undefined && value !== ""
    )
  );
});
const saveProduct = (e) => {
  e.preventDefault();
  if (!isValidate.value) {
    return;
  }

  const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  existingProducts.push(product);
  localStorage.setItem("products", JSON.stringify(existingProducts));

  emit("saveProduct", product);
  router.push("/");
};
const onErrorMessageUpdate = (field, newErrorMessage) => {
  errorMessage[field] = newErrorMessage;
};
</script>
<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
}
.input {
  width: 100%;
}
.start {
  justify-content: flex-start;
  align-items: flex-end;
}
.button {
  margin-top: 50px;
}
</style>
