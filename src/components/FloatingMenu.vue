<template>
  <div
    class="w-12 h-12 bg-white absolute translate-x-0 translate-y-0 rounded-full flex justify-center items-center shadow-lg z-50 cursor-pointer"
    v-drag="'#aaa'"
  >
    <svg-icon iconName="icon-caidan" className="menu"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
</script>
<style scoped lang="scss"></style>
