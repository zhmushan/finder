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
      ? "/assets/folder-empty.svg"
      : "/assets/folder.svg"
    : "/assets/file.svg",
);

const fileIcon = computed(() => {
  if (entry.type !== EntryType.File) {
    return;
  }

  const iconName = getFileIconName(entry.name);

  if (!iconName) {
    return;
  }

  return `/assets/file-icons/${iconName}`;
});
</script>

<template>
  <div class="flex flex-col" :title="entry.name">
    <div class="relative">
      <img :src="mainIcon" />
      <img
        v-if="entry.type === EntryType.File && fileIcon"
        :src="fileIcon"
        class="absolute w-6 bottom-0 right-0"
      />
    </div>
    <div class="line-clamp-2 break-all text-xs">
      <span>{{ entry.name }}</span>
    </div>
  </div>
</template>
