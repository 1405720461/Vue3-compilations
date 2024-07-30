<template>
  <div
    v-drag
    class="absolute translate-x-20 translate-y-20 z-50"
    v-click-outside="onClickOutside"
  >
    <el-popover
      placement="bottom-start"
      :width="200"
      :show-arrow="false"
      :visible="showPopover"
      ref="popoverRef"
    >
      <template #reference>
        <div
          ref="icon"
          class="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-lg cursor-pointer"
          @mousedown="handleMouseDown"
          @click="handleClick"
        >
          <svg-icon
            iconName="icon-menu"
            :class="{ rotate: showPopover }"
            className="menu-icon"
          ></svg-icon>
        </div>
      </template>
      <div class="mb-2">
        <el-button circle @click="changeTheme">
          <svg-icon
            :iconName="isDark ? 'icon-dark' : 'icon-light'"
            className="theme-icon"
            :color="isDark ? '#6f6cff' : '#f9c626'"
          ></svg-icon>
        </el-button>
      </div>
      <Menu></Menu>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from "element-plus";
import Menu from "./Menu.vue";
import { useGlobalStore } from "@/stores";
import { useThemeToggle } from "@/hooks/useThemeToggle";

const globalStore = useGlobalStore();
const isDark = computed(() => globalStore.isDark);

const popoverRef = ref(null);
const showPopover = ref(false); //菜单状态
const _showPopover = ref(false); //记录菜单点击之前的状态
const startX = ref(0);
const startY = ref(0);

const handleMouseDown = (e: MouseEvent) => {
  _showPopover.value = showPopover.value;
  startX.value = e.pageX;
  startY.value = e.pageY;
  showPopover.value = false;
};

const handleClick = (e: MouseEvent) => {
  const dx = Math.abs(e.pageX - startX.value);
  const dy = Math.abs(e.pageY - startY.value);
  if (dx <= 1 && dy <= 1) {
    showPopover.value = !_showPopover.value;
  } else {
    showPopover.value = _showPopover.value;
  }
};

//点击空白位置事件
const onClickOutside = (e: MouseEvent) => {
  if (
    showPopover.value &&
    !(popoverRef.value as any).popperRef?.contentRef.contains(e.target)
  ) {
    showPopover.value = false;
  }
};

//切换主题按钮
const changeTheme = (e: MouseEvent) => {
  useThemeToggle(e);
};
</script>
<style scoped lang="scss">
.menu-icon {
  transition: all 0.5s;
}
.theme-icon {
  width: 1.3em;
  height: 1.3em;
}
.rotate {
  transform: rotate(90deg);
}
</style>
