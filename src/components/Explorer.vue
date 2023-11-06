<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { useAsyncState } from "@vueuse/core";
import path from "path-browserify";
import { watchEffect, ref } from "vue";
import { EntryType, type EntryItem } from "~/components/Entry.vue";
import { useSettingsStore } from "~/stores/settings";
import { useWorkspaceStore } from "~/stores/workspace";

const settings = useSettingsStore();
const workspace = useWorkspaceStore();
const focused = ref<string>();

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

function go(entry: EntryItem) {
  switch (entry.type) {
    case EntryType.Dir: {
      workspace.go(entry.name);
      break;
    }
    case EntryType.File:
    default: {
      invoke("open_file_paths", {
        paths: [path.resolve(workspace.current, entry.name)],
      });
    }
  }
}
</script>

<template>
  <div class="h-full" @click.capture="focused = undefined">
    <Loading v-if="isLoading" />
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-300"
    >
      <div
        v-if="isReady"
        class="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))]"
      >
        <div
          v-for="(entry, idx) in state"
          :key="idx"
          class="p-3 m-1 rounded transition select-none cursor-default hover:bg-base-content hover:bg-opacity-20"
          :class="{
            'bg-base-content bg-opacity-20': focused === entry.name,
          }"
          @click.stop="focused = entry.name"
          @dblclick="go(entry)"
        >
          <Entry :entry="entry" />
        </div>
      </div>
    </Transition>
  </div>
</template>
