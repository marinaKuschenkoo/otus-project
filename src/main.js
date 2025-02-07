
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./components/router";

import "./style.css";
import App from "./App.vue";
import store from "./components/store";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
