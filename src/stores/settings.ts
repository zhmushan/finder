import { useColorMode } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import themes from "~/themes";

export const useSettingsStore = defineStore("settings", () => {
  const showHiddenItems = ref(false);

  const colorMode = useColorMode({
    modes: themes.reduce(
      (acc, curr) => ({ ...acc, [curr]: curr }),
      {} as Record<string, string>,
    ),
    storageKey: "finder-color-schema",
  });

  function toggleShowHiddenItems() {
    showHiddenItems.value = !showHiddenItems.value;
  }

  function setTheme(newTheme: string) {
    colorMode.store.value = newTheme;
  }

  return {
    showHiddenItems,
    toggleShowHiddenItems,
    theme: colorMode,
    setTheme,
  };
});
