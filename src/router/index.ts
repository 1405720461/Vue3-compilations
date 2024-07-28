import { createRouter, createWebHistory } from "vue-router";
import routes from "@/utils/routes";
import { useGlobalStore } from "@/stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 定义一个函数来处理路由路径
function formatRoutePath(path: string) {
  const pathParts = path
    .split("?")[0]
    .split("/")
    .filter((part) => part !== "");
  return "/" + pathParts.join("/");
}

router.beforeEach((to, from, next) => {
  const activeIndex = formatRoutePath(to.path);
  useGlobalStore().setActiveIndex(activeIndex);
  next();
});

export default router;
