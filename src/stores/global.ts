import { defineStore } from "pinia";

interface GlobalState {
  activeIndex: string;
}

export const useGlobalStore = defineStore("global", {
  state: (): GlobalState => ({
    activeIndex: "/",
  }),
  actions: {
    setActiveIndex(index: string) {
      this.activeIndex = index;
    },
    resetStore() {
      this.$reset();
    },
  },
  persist: true,
});
