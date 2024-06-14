<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { onMounted } from "vue";
import { useWorkspaceStore } from "~/stores/workspace";

const workspace = useWorkspaceStore();

onMounted(async () => {
  const homeDir = (await invoke<string>("get_home_dir")) || "/";
  workspace.go(homeDir);
});
</script>

<template>
  <div class="flex flex-col">
    <div class="h-12 pr-2 ml-20 flex items-center">
      <div v-if="workspace.current" class="w-full">
        <Nav data-tauri-drag-region />
      </div>
    </div>
    <div class="text-center bg-base-200 h-[calc(100vh-3rem)] overflow-auto p-2">
      <RouterView />
    </div>
  </div>
</template>
