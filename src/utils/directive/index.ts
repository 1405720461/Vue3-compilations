import drag from "./drag";
import type { App, Directive } from "vue";

const directives: { [key: string]: Directive } = {
  //汇总自定义指令
  drag,
};

export default {
  install(app: App) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key]);
    });
  },
};
