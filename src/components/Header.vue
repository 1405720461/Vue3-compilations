<template>
  <header>
    <RouterLink to="/contact">contact</RouterLink>
    <RouterLink to="/about">about</RouterLink>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
}
</style>
