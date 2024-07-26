import type { RouteRecordRaw } from "vue-router";

// 从views目录及其子目录中导入所有page.js文件（立即加载）
const pages = import.meta.glob("../views/**/page.js", {
  eager: true,
  import: "default",
});

// 从views目录及其子目录中导入所有index.vue文件
const pageComps = import.meta.glob("../views/**/index.vue");

const buildRoutes = (
  components: Record<string, () => Promise<any>>
): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = []; // 用于存储最终的路由数组
  const routeMap: { [key: string]: RouteRecordRaw } = {}; // 用于按路径存储路由的映射

  Object.entries(components).forEach(([fullPath, component]) => {
    const path =
      fullPath.replace("../views", "").replace("/index.vue", "") || "/";
    const name = path.split("/").filter(Boolean).join("-") || "index";
    const metaPath = fullPath.replace("/index.vue", "/page.js");

    const route: RouteRecordRaw = {
      path,
      name,
      component,
      children: [],
    };

    // 如果存在对应的page.js,即meta文件，添加meta信息
    if (pages[metaPath]) {
      route.meta = pages[metaPath] as Record<string, unknown>;
    }

    routeMap[path] = route;
  });

  // 遍历路由映射的键（路径）
  Object.keys(routeMap).forEach((path) => {
    if (path === "/") {
      // 根路径直接添加到路由数组
      routes.push(routeMap[path]);
    } else {
      const segments = path.split("/");
      if (segments.length > 2) {
        const parentPath = segments.slice(0, -1).join("/") || "/";
        if (routeMap[parentPath]) {
          routeMap[parentPath].children?.push(routeMap[path]);
        }
      } else {
        routes.push(routeMap[path]);
      }
    }
  });

  return routes;
};

const routes = buildRoutes(pageComps);

export default routes;
