<template>
  <Popup @close="closePopup()" title="Форма создания новых товаров">
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
      <base-button
        @click="saveProduct($event)"
        class="button"
        text="СОХРАНИТЬ"
      />
    </form>
  </Popup>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import Popup from "./UI/Popup.vue";
import BaseButton from "./UI/BaseButton.vue";
import { reactive, computed } from "vue";

const emit = defineEmits(["closeProductCreatePopup", "saveProduct"]);
const product = reactive({
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
const closePopup = () => {
  emit("closeProductCreatePopup");
};
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
  emit("saveProduct", product);
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
