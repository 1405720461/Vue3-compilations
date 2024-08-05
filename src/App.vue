<template>
  <div class="h-screen bg-white dark:bg-slate-700 dark:text-white">
    <Floating></Floating>
    <router-view class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const Floating = defineAsyncComponent(
  () => import("@/components/Floating.vue")
);
</script>

<style scoped></style>
