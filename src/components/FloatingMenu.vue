<template>
  <div
    v-drag
    class="absolute translate-x-20 translate-y-20"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <el-popover
      placement="bottom-start"
      :width="200"
      :show-arrow="false"
      :visible="visible"
    >
      <template #reference>
        <div
          ref="icon"
          class="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-lg z-50 cursor-pointer"
        >
          <svg-icon
            iconName="icon-menu"
            :class="{ rotate: shouldRotate }"
            className="menu-icon"
          ></svg-icon>
        </div>
      </template>
      <div class="">123</div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false); //菜单状态
const _visible = ref(false); //记录菜单点击之前的状态
const startX = ref(0);
const startY = ref(0);
const shouldRotate = ref(false); //图标旋转状态

const handleMouseDown = (e: MouseEvent) => {
  _visible.value = visible.value;
  startX.value = e.pageX;
  startY.value = e.pageY;
  visible.value = false;
};

const handleMouseUp = (e: MouseEvent) => {
  const dx = Math.abs(e.pageX - startX.value);
  const dy = Math.abs(e.pageY - startY.value);

  if (dx <= 1 && dy <= 1) {
    visible.value = !_visible.value;
    shouldRotate.value = !shouldRotate.value;
  } else {
    visible.value = _visible.value;
  }
};
</script>
<style scoped lang="scss">
.menu-icon {
  transition: all 0.5s;
}
.rotate {
  transform: rotate(90deg);
}
</style>
