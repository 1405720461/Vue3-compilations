import "./assets/iconfont/iconfont.js";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/main.css";
import "./styles/element/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import Directives from "./utils/directive"; //导入自定义指令
import { useGlobalStore } from "./stores/index";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(router).use(Directives).mount("#app");

useGlobalStore().initializeStore();
