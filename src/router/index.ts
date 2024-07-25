import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// const routes = [
//   {
//     path: "/",
//     name: "index",
//     component: () => import("../views/index.vue"),
//     meta: { title: "首页", menuOrder: 1 },
//   },
//   {
//     path: "/contact",
//     name: "contact-index",
//     component: () => import("../views/contact/index.vue"),
//     meta: { title: "联系", menuOrder: 10 },
//   },
//   {
//     path: "/about",
//     name: "about-index",
//     component: () => import("../views/about/index.vue"),
//     meta: { title: "关于", menuOrder: 100 },
//   },
// ];

//寻找views文件夹中所有page.js文件
const pages = import.meta.glob("../views/**/page.js", {
  eager: true,
  import: "default",
});
const pageComps = import.meta.glob("../views/**/index.vue");
const routes: RouteRecordRaw[] = Object.entries(pages).map(([path, meta]) => {
  const pageJSPath = path;
  path = path.replace("../views", "").replace("/page.js", "") || "/";
  const name = path.split("/").filter(Boolean).join("-") || "index";
  const compPath = pageJSPath.replace("/page.js", "/index.vue");
  return {
    path,
    name,
    component: pageComps[compPath],
    meta,
    children: [],
  } as RouteRecordRaw;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
