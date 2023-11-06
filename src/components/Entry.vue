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
</script>

<template>
  <div class="flex flex-col">
    <div class="relative">
      <img :src="mainIcon" />
      <img
        v-if="entry.type === EntryType.File && fileIcon"
        :src="fileIcon"
        class="absolute w-6 bottom-0 right-0"
      />
    </div>
    <span class="-m-2 -my-1 text-ellipsis overflow-hidden whitespace-nowrap">
      {{ entry.name }}
    </span>
  </div>
</template>
