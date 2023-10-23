<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { useAsyncState } from "@vueuse/core";
import { watchEffect } from "vue";
import type { EntryItem } from "~/components/Entry.vue";
import { useSettingsStore } from "~/stores/settings";
import { useWorkspaceStore } from "~/stores/workspace";

const settings = useSettingsStore();
const workspace = useWorkspaceStore();

const { state, isLoading, isReady, execute } = useAsyncState(
  () =>
    invoke<EntryItem[]>("ls", {
      path: workspace.current,
      showHidden: settings.showHiddenItems,
    }),
  [],
);

watchEffect(() => {
  execute();
});
</script>

<template>
  <Loading v-if="isLoading" />
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300"
  >
    <div
      v-if="isReady"
      class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]"
    >
      <Entry v-for="(entry, idx) in state" :key="idx" :entry="entry" />
    </div>
  </Transition>
</template>
