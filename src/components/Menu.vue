<template>
  <div class="select-none">
    <el-menu
      router
      mode="vertical"
      :default-active="activeIndex"
      close-on-click-outside
    >
      <template v-for="item in menuList" :key="item.index">
        <el-sub-menu v-if="item.children" :index="item.index + ''">
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.index"
            :index="child.index"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          {{ item.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import routes from "@/utils/routes";
import { useGlobalStore } from "@/stores";
const globalStore = useGlobalStore();

const activeIndex = ref(globalStore.activeIndex);

watchEffect(() => {
  activeIndex.value = globalStore.activeIndex;
});

/**
 * 导航菜单配置项
 * {
  title: string, // 菜单标题 没有值则默认为当前文件夹名
  index: string, // 菜单路径
  menuOrder: number, // 菜单排序  没有值则默认沉底
  children?: [],
}
 */
const menuList = routes
  .map((item) => {
    return {
      title: item.meta?.title || extractTitle(item.path),
      index: item.path,
      menuOrder: (item.meta?.menuOrder as number) || 99,
      children:
        item.children && item.children.length > 0
          ? item.children
              .map((child) => {
                return {
                  title: child.meta?.title || extractTitle(child.path),
                  index: child.path,
                  menuOrder: (child.meta?.menuOrder as number) || 99,
                };
              })
              .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0))
          : undefined,
    };
  })
  .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));

//获取路径中最后一个字符串
function extractTitle(path: string): string {
  const parts = path.split("/").filter(Boolean);
  return parts.pop() || path;
}
</script>
<style scoped lang="scss">
:deep(.el-menu) {
  border-right: none;
}
</style>
