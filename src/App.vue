<template>
  <Header></Header>
  <RouterView />
  <FloatingMenu></FloatingMenu>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import FloatingMenu from "@/components/FloatingMenu.vue";
</script>

<style scoped></style>
