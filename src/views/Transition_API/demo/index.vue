<template>
  <div class="flex flex-col justify-between bg-white p-4 dark:bg-blue-100">
    <div
      class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
      v-for="item in 4"
      :key="item"
    >
      <h3
        class="text-slate-900 dark:text-white text-base font-medium tracking-tight"
      >
        Writes Upside-Down
      </h3>
      <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        The Zero Gravity Pen can be used to write in any orientation, including
        upside-down. It even works in outer space.
      </p>
    </div>

    <div>
      <button
        class="rounded-md border p-2 outline-none dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-100"
        @click="useThemeToggle"
      >
        切换主题
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeToggle } from "@/hooks/useThemeToggle";
</script>

<style></style>
