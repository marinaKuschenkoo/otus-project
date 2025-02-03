<template>
  <div class="main-wrapper">
    <div class="wrapper">
      <label for="inp" class="inp">
        <input
          :name="name"
          :type="type"
          id="inp"
          placeholder="&nbsp;"
          v-model="inputValue"
        />
        <span class="label">{{ placeholder }}</span>
        <span class="focus-bg"></span>
      </label>
    </div>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { watch } from "vue";

const props = defineProps({
  placeholder: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
});

const inputValue = defineModel("inputValue");
const emit = defineEmits("update:errorMessage");

const schema = zod.object({
  name: zod
    .string()
    .min(3, { message: "Имя должно содержать минимум 3 символа" }),
  lastName: zod
    .string()
    .min(3, { message: "Фамилия должна содержать минимум 3 символа" }),
  middleName: zod
    .string()
    .min(3, { message: "Фамилия должна содержать минимум 3 символа" }),
  birthDate: zod
    .string()
    .refine(
      (date) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
      },
      { message: "Дата должна быть в формате YYYY-MM-DD" }
    )
    .refine(
      (date) => {
        // Проверяем, что дата не в будущем
        const today = new Date();
        const inputDate = new Date(date);
        return inputDate <= today;
      },
      { message: "Дата рождения не может быть в будущем" }
    ),
  city: zod
    .string()
    .min(3, { message: "Название города должно содержать минимум 2 символа" }),
  search: zod.string(),
  street: zod
    .string()
    .min(3, { message: "Название улицы должно содержать минимум 2 символа" }),
  house: zod
    .string()
    .min(1, { message: "Номер дома должен содержать минимум 1 символ" }),
  cardNumber: zod
    .string()
    .length(16, { message: "Номер карты должен содержать 16 цифр" })
    .regex(/^\d{16}$/, {
      message: "Номер карты должен содержать только цифры",
    }),
  cvc: zod
    .string()
    .length(3, { message: "CVC должен содержать 3 цифры" })
    .regex(/^\d{3}$/, { message: "CVC должен содержать только 3 цифры" }),
  monthExp: zod
    .string()
    .regex(/^\d{2}$/, { message: "Месяц должен содержать только 2 цифры" }),
  yearExp: zod
    .string()
    .regex(/^\d{4}$/, { message: "Год должен содержать только 4 цифры" }),
  productTitle: zod
    .string()
    .min(2, { message: "Заголовок должен содержать больше 2 символов" }),
  productDescription: zod
    .string()
    .min(5, { message: "Описание должено содержать больше 5 символов" }),
  productPrice: zod
    .string()
    .regex(/^\d*$/, { message: "Цена должна содержать только цифры" }),
  productImage: zod.string().url({ message: "Неверный формат URL" }),
  productCategory: zod.string().min(2, {
    message: "Название категории должено содержать больше 2 символов",
  }),
  login: zod.string().min(1, { message: "Логин не может быть пустым" }),
  password: zod.string().min(1, { message: "Пароль не может быть пустым" }),
});

const { value, errorMessage } = useField(
  props.name,
  toTypedSchema(schema.shape[props.name])
);

// Синхронизация inputValue с value из useField
watch(value, (newValue) => {
  inputValue.value = newValue;
});

// Обновляем value при изменении inputValue
watch(inputValue, (newValue) => {
  value.value = newValue;
});

watch(errorMessage, (newValue) => {
  emit("update:errorMessage", newValue);
});
</script>
<style scoped lang="sass">
.main-wrapper
    display: flex
    flex-direction: column
.error
    text-align: left
    color: red
.wrapper
  display: grid
  font-family: Roboto
  -webkit-text-size-adjust: 100%
  -webkit-font-smoothing: antialiased

*
  box-sizing: border-box

.inp
  position: relative
  margin: auto
  width: 100%
  border-radius: 3px
  overflow: hidden

  .label
    position: absolute
    top: 20px
    left: 12px
    font-size: 16px
    color: #000
    opacity: 0.5
    font-weight: 500
    transform-origin: 0 0
    transform: translate3d(0,0,0)
    transition: all .2s ease
    pointer-events: none

  .focus-bg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    transform: scaleX(0)
    transform-origin: left

  input
    -webkit-appearance: none
    appearance: none
    width: 100%
    border: 0
    font-family: inherit
    padding: 16px 12px 0 12px
    height: 56px
    font-size: 16px
    font-weight: 400
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.3)
    transition: all .15s ease

    &:hover
      box-shadow: inset 0 -1px 0 rgba(0,0,0,.5)

    &:not(:placeholder-shown)
      + .label
        color: rgba(0,0,0,.5)
        transform: translate3d(0,-12px,0) scale(.75)

    &:focus
      outline: none
      box-shadow: inset 0 -2px 0 grey
      + .label
        color: black
        transform: translate3d(0,-12px,0) scale(.75)
        + .focus-bg
          transform: scaleX(1)
          transition: all .1s ease
</style>
