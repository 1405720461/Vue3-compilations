<template>
  <div class="h-screen bg-white dark:bg-slate-700 dark:text-white">
    <Floating></Floating>
    <router-view class="h-full" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import ErrorPlaceholder from "@/components/ErrorPlaceholder.vue";

const Floating = defineAsyncComponent({
  loader: () => import("@/components/Floating.vue"),
  errorComponent: ErrorPlaceholder,
  timeout: 3000,
});
</script>

<style scoped></style>
