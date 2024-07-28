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

//导航菜单配置项
const menuList = routes
  .map((item) => {
    return {
      title: item.meta?.title,
      index: item.path,
      menuOrder: item.meta?.menuOrder as number,
      children:
        item.children && item.children.length > 0
          ? item.children
              .map((child) => {
                return {
                  title: child.meta?.title,
                  index: child.path,
                  menuOrder: child.meta?.menuOrder as number,
                };
              })
              .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0))
          : undefined,
    };
  })
  .sort((a, b) => (a.menuOrder || 0) - (b.menuOrder || 0));
</script>
<style scoped lang="scss">
:deep(.el-menu) {
  border-right: none;
}
</style>
