<script setup lang="ts">
import path from "path-browserify";
import { computed } from "vue";
import { useWorkspaceStore } from "~/stores/workspace";
import { SETTINGS_DRAWER } from "~/constants/id";
const workspace = useWorkspaceStore();
const pathList = computed(() => {
  const currPath = workspace.current;
  if (currPath === "/") {
    return [];
  }

  const segs = currPath.split("/");
  const ret: Array<{ display: string; path: string }> = [];
  for (let i = 1; i < segs.length; ++i) {
    const currSeg = segs[i];
    const prevPath = ret[i - 1]?.path || "/";
    ret[i] = {
      display: currSeg,
      path: path.resolve(prevPath, currSeg),
    };
  }

  return ret.slice(1);
});
</script>
<template>
  <div class="flex items-center gap-1">
    <button
      class="btn btn-ghost btn-xs"
      :disabled="!workspace.canBack"
      @click="workspace.back"
    >
      <span class="icon-[material-symbols--arrow-back-ios-rounded]" />
    </button>
    <button
      class="btn btn-ghost btn-xs"
      :disabled="!workspace.canForward"
      @click="workspace.forward"
    >
      <div class="icon-[material-symbols--arrow-forward-ios-rounded]" />
    </button>

    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <button class="btn btn-xs glass" @click="workspace.go('/')">
            <div class="icon-[material-symbols--jamboard-kiosk-rounded]" />
          </button>
        </li>
        <li v-for="(it, idx) in pathList" :key="idx">
          <a @click="workspace.go(it.path)">{{ it.display }}</a>
        </li>
      </ul>
    </div>

    <div class="flex-grow" />

    <div>
      <label
        :for="SETTINGS_DRAWER"
        class="btn btn-square btn-ghost btn-sm drawer-button"
      >
        <div
          class="w-5 h-5 icon-[material-symbols--settings-outline-rounded]"
        />
      </label>
    </div>
  </div>
</template>
