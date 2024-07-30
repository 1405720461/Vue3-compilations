import { useGlobalStore } from "@/stores/index";
const globalStore = useGlobalStore();

export const useThemeToggle = (event: MouseEvent) => {
  const { isDark, toggleDarkMode } = globalStore;
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 执行主题切换的动画和逻辑
  // @ts-ignore
  const transition = document.startViewTransition(() => {
    toggleDarkMode();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: isDark
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};
