import { ref, onMounted } from "vue";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const theme = ref<Theme>("system");
  const isDark = ref(false);

  const getSystemTheme = (): boolean => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const applyTheme = (newTheme: Theme) => {
    theme.value = newTheme;

    if (newTheme === "system") {
      isDark.value = getSystemTheme();
    } else {
      isDark.value = newTheme === "dark";
    }

    localStorage.setItem("theme", newTheme);

    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    if (theme.value === "system") {
      applyTheme(isDark.value ? "light" : "dark");
    } else if (theme.value === "light") {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  };

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (theme.value === "system") {
      isDark.value = e.matches;
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    applyTheme(savedTheme || "system");

    mediaQuery.addEventListener("change", handleSystemThemeChange);
  });

  return {
    theme,
    isDark,
    applyTheme,
    toggleTheme,
  };
}
