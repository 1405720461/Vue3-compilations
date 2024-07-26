import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/main.css";
import "./assets/iconfont/iconfont.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia()).use(router).mount("#app");
