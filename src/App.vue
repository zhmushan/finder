<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";
import { useSettingsStore } from "./stores/settings";

const settings = useSettingsStore();

useHead({
  title: "Finder",
  htmlAttrs: {
    "data-theme": () => settings.theme,
  },
  bodyAttrs: {
    class: ["font-sans"],
  },
});

onMounted(() => {
  invoke("show_main_window");
});
</script>

<template>
  <RouterView />
</template>
