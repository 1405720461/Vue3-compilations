import { defineStore } from "pinia";

interface GlobalState {
  activeIndex: string;
  isDark: boolean;
}

export const useGlobalStore = defineStore("my_vue3_global", {
  state: (): GlobalState => ({
    activeIndex: "/",
    isDark: false,
  }),
  actions: {
    // 页面主题初始化
    initializeStore() {
      const storedIsDark = JSON.parse(
        localStorage.getItem("my_vue3_global") || "{}"
      )?.isDark;
      document.documentElement.classList.toggle("dark", !!storedIsDark);
    },
    setActiveIndex(index: string) {
      this.activeIndex = index;
    },
    toggleDarkMode() {
      // 切换isDark状态
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle("dark", this.isDark);
    },
    resetStore() {
      this.$reset();
    },
  },
  persist: true,
});
