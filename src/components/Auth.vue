<template>
  <div class="wrapper">
    <h2 class="title">Авторизация</h2>
    <base-input
      name="login"
      placeholder="Логин"
      v-model:inputValue="loginData.login"
    />
    <base-input
      name="password"
      placeholder="Пароль"
      v-model:inputValue="loginData.password"
    />
    <base-button @click="handleSubmit" text="Войти" class="button" />
  </div>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import BaseButton from "./UI/BaseButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const loginData = ref({
  login: "",
  password: "",
});

const handleSubmit = () => {
  localStorage.setItem("isLoggedIn", true);
  router.push("/home");
};
</script>
<style scoped>
.wrapper {
  max-width: 50%;
  margin: 0 auto;
}
.title {
  margin-bottom: 20px;
}
.button {
  margin-top: 40px;
  background-color: rgb(102, 102, 244);
  color: white;
}
</style>
