<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { onMounted } from "vue";
import { useWorkspaceStore } from "~/stores/workspace";
import { SETTINGS_DRAWER } from "~/constants/id";

const workspace = useWorkspaceStore();

onMounted(async () => {
  const homeDir = (await invoke<string>("get_home_dir")) || "/";
  workspace.go(homeDir);
});
</script>

<template>
  <Drawer :id="SETTINGS_DRAWER" class="h-full">
    <template v-if="workspace.current" v-slot:page_content>
      <div class="flex flex-col h-full">
        <Nav />
        <Explorer />
      </div>
    </template>

    <template v-slot:sidebar_content>
      <Settings />
    </template>
  </Drawer>
</template>
