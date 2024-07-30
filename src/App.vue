<template>
  <Floating></Floating>
  <RouterView class="h-screen" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const Floating = defineAsyncComponent(
  () => import("@/components/Floating.vue")
);
</script>

<style scoped></style>
