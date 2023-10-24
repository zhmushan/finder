import { useColorMode } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { COLOR_SCHEMA_STORAGE } from "~/constants/id";
import themes from "~/themes";
import type { ConvertTupleToObj, TupleToString } from "~/types";

export const useSettingsStore = defineStore("settings", () => {
  const showHiddenItems = ref(false);

  const colorMode = useColorMode({
    modes: themes.reduce(
      (acc, curr) => ({ ...acc, [curr]: curr }),
      {} as ConvertTupleToObj<typeof themes>,
    ),
    storageKey: COLOR_SCHEMA_STORAGE,
  });

  function toggleShowHiddenItems() {
    showHiddenItems.value = !showHiddenItems.value;
  }

  function setTheme(newTheme: TupleToString<typeof themes>) {
    colorMode.store.value = newTheme;
  }

  return {
    showHiddenItems,
    toggleShowHiddenItems,
    theme: colorMode,
    setTheme,
  };
});
