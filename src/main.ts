import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/main.css";
import "./assets/iconfont/iconfont.js";
import App from "./App.vue";
import router from "./router";
import Directives from "@/utils/directive"; //导入自定义指令

const app = createApp(App);

app.use(createPinia()).use(router).use(Directives).mount("#app");
