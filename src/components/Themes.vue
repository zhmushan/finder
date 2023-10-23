<!-- Copyright (c) 2020 Pouya Saadeghi. MIT License. -->
<!-- https://github.com/saadeghi/daisyui/blob/09d91c7466ffa2f6389cd75a0a1993096f2a4dec/src/docs/src/components/ThemeChange.svelte -->

<script setup lang="ts">
import themes from "~/themes";
import { useSettingsStore } from "~/stores/settings";

const settings = useSettingsStore();
</script>

<template>
  <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
    <div
      v-for="(theme, idx) in themes"
      :key="idx"
      class="outline-base-content overflow-hidden rounded-lg text-left"
      :data-set-theme="theme"
      data-act-class="[&_svg]:visible"
      @click="settings.setTheme(theme)"
    >
      <div
        :data-theme="theme"
        class="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
      >
        <div class="grid grid-cols-5 grid-rows-3">
          <div
            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
          >
            <div
              class="h-6 w-6 icon-[material-symbols--check-small-rounded]"
              :class="{
                invisible: settings.theme !== theme,
              }"
            />
            <span class="flex-grow text-sm">
              {{ theme }}
            </span>
            <div class="flex h-full flex-shrink-0 flex-wrap gap-1">
              <span class="bg-primary w-2 rounded" />
              <span class="bg-secondary w-2 rounded" />
              <span class="bg-accent w-2 rounded" />
              <span class="bg-neutral w-2 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
