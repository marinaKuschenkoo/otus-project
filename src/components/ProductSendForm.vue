<template>
  <Popup @close="closePopup()" title="Форма отправки заказа">
    <form>
      <div class="row">
        <base-input
          class="input"
          placeholder="Фамилия"
          name="lastName"
          v-model:inputValue="user.lastName"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('lastName', text);
            }
          "
        />
        <base-input
          class="input"
          name="name"
          placeholder="Имя"
          v-model:inputValue="user.name"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('name', text);
            }
          "
        />
        <base-input
          class="input"
          placeholder="Отчество"
          name="middleName"
          v-model:inputValue="user.middleName"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('middleName', text);
            }
          "
        />
      </div>
      <base-input
        class="input"
        type="date"
        name="birthDate"
        placeholder="Дата рождения"
        v-model:inputValue="user.birthDate"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('birthDate', text);
          }
        "
      />
      <div class="row">
        <base-input
          class="input"
          name="city"
          placeholder="Город"
          v-model:inputValue="user.city"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('city', text);
            }
          "
        />
        <base-input
          class="input"
          name="street"
          placeholder="Улица"
          v-model:inputValue="user.street"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('street', text);
            }
          "
        />
        <base-input
          class="input"
          name="house"
          placeholder="Дом"
          v-model:inputValue="user.house"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('house', text);
            }
          "
        />
      </div>
      <base-input
        class="input"
        name="cardNumber"
        placeholder="Номер карты"
        v-model:inputValue="user.card.number"
        @update:errorMessage="
          (text) => {
            onErrorMessageUpdate('cardNumber', text);
          }
        "
      />
      <div class="row start">
        <base-input
          class="input"
          placeholder="ММ"
          name="monthExp"
          v-model:inputValue="user.card.monthExp"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('monthExp', text);
            }
          "
        /><base-input
          name="yearExp"
          v-model:inputValue="user.card.yearExp"
          placeholder="ГГ"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('yearExp', text);
            }
          "
        />
        <base-input
          class="input"
          placeholder="CVC"
          name="yearExp"
          v-model:inputValue="user.card.cvc"
          @update:errorMessage="
            (text) => {
              onErrorMessageUpdate('cvc', text);
            }
          "
        />
      </div>
      <base-button class="button" text="ОТПРАВИТЬ" @click="sendForm($event)" />
    </form>
  </Popup>
  <Popup v-if="isSend" @close="closeSendPopup()">Заказ успешно отправлен</Popup>
</template>
<script setup>
import BaseInput from "./UI/BaseInput.vue";
import Popup from "./UI/Popup.vue";
import BaseButton from "./UI/BaseButton.vue";
import { reactive, ref, computed } from "vue";
import axios from "axios";

const emit = defineEmits(["closeProductSendPopup"]);
const user = reactive({
  name: null,
  lastName: null,
  middleName: null,
  birthDate: null,
  city: null,
  street: null,
  house: null,
  card: {
    number: null,
    monthExp: null,
    yearExp: null,
    cvc: null,
  },
});
const errorMessage = reactive({
  name: null,
  lastName: null,
  middleName: null,
  birthDate: null,
  city: null,
  street: null,
  house: null,
  cardNumber: null,
  monthExp: null,
  yearExp: null,
  cvc: null,
});
const isSend = ref(false);
const closePopup = () => {
  emit("closeProductSendPopup");
};
const isValidate = computed(() => {
  return (
    user.name &&
    user.lastName &&
    user.middleName &&
    user.birthDate &&
    user.city &&
    user.street &&
    user.house &&
    user.card.number &&
    user.card.monthExp &&
    user.card.yearExp &&
    user.card.cvc &&
    !Object.values(errorMessage).some(
      (value) => value !== null && value !== undefined && value !== ""
    )
  );
});
const sendForm = (e) => {
  e.preventDefault();
  if (!isValidate.value) {
    return;
  }
  axios
    .post("https://httpbin.org/post", {
      user: user,
    })
    .then(((isSend.value = true), emit("closeProductSendPopup")));
};

const onErrorMessageUpdate = (field, newErrorMessage) => {
  errorMessage[field] = newErrorMessage;
};
const closeSendPopup = () => {
  isSend.value = false;
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
  /* align-items: flex-end; */
}
.button {
  margin-top: 50px;
}
</style>
