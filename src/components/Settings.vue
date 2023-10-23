<script setup lang="ts">
import { useSettingsStore } from "~/stores/settings";
const settings = useSettingsStore();
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Theme</span>
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="btn normal-case">
          <span class="font-normal">{{ settings.theme }}</span>
          <div
            class="w-4 h-4 opacity-60 icon-[material-symbols--keyboard-arrow-down-rounded]"
          />
        </div>
        <div
          class="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-14"
        >
          <Themes />
        </div>
      </div>
    </label>
    <label class="label cursor-pointer">
      <span class="label-text">Show hidden items</span>
      <input
        type="checkbox"
        class="toggle"
        :checked="settings.showHiddenItems"
        @click="settings.toggleShowHiddenItems"
      />
    </label>
  </div>
</template>
