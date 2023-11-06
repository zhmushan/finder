<script lang="ts">
export const enum EntryType {
  File,
  Dir,
  Symlink,
}

export interface EntryItem {
  name: string;
  type: EntryType;
  empty: boolean;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { getFileIconName } from "~/utils/get-icon-name";
import { useWorkspaceStore } from "~/stores/workspace";
import { invoke } from "@tauri-apps/api";
import path from "path-browserify";

const workspace = useWorkspaceStore();

const { entry } = defineProps<{
  entry: EntryItem;
}>();

const mainIcon = computed(() =>
  entry.type === EntryType.Dir
    ? entry.empty
      ? "src/assets/folder-empty.svg"
      : "src/assets/folder.svg"
    : "src/assets/file.svg",
);

const fileIcon = computed(() => {
  if (entry.type !== EntryType.File) {
    return;
  }

  const iconName = getFileIconName(entry.name);

  if (!iconName) {
    return;
  }

  return `src/assets/file-icons/${iconName}`;
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
  <div
    class="flex flex-col p-3 rounded hover:bg-base-content hover:bg-opacity-20 hover:transition"
    @dblclick="go(entry)"
  >
    <div class="relative">
      <img :src="mainIcon" />
      <img
        v-if="entry.type === EntryType.File && fileIcon"
        :src="fileIcon"
        class="absolute w-6 bottom-0 right-0"
      />
    </div>
    <span class="-m-1 text-ellipsis overflow-hidden whitespace-nowrap">
      {{ entry.name }}
    </span>
  </div>
</template>
