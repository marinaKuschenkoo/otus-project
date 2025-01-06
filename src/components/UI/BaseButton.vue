<template>
  <button class="button">{{ text }}</button>
</template>
<script setup>
const props = defineProps({
  text: String,
});
</script>
<style scoped>
.button {
  text-wrap-mode: nowrap;
  max-height: 50px;
  border: 1px solid grey;
}
.button:hover {
  opacity: 0.5;
  transition: all 0.1s ease-in-out 0.1s;
}
</style>
