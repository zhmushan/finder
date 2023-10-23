import { defineStore } from "pinia";
import { computed, ref } from "vue";
import path from "path-browserify";

export const useWorkspaceStore = defineStore("workspace", () => {
  const pathHistory = ref<string[]>([]);
  const currentIndex = ref(-1);

  const current = computed(() => pathHistory.value[currentIndex.value]);
  const canBack = computed(() => currentIndex.value > 0);
  const canForward = computed(
    () => currentIndex.value < pathHistory.value.length - 1,
  );

  function go(target: string) {
    target = path.resolve(current.value, target);
    if (target === current.value) {
      return;
    }

    ++currentIndex.value;
    pathHistory.value = [
      ...pathHistory.value.slice(0, currentIndex.value),
      target,
    ];
  }

  function back() {
    if (canBack.value) {
      --currentIndex.value;
    }
  }

  function forward() {
    if (canForward.value) {
      ++currentIndex.value;
    }
  }

  return {
    current,
    canBack,
    canForward,
    go,
    back,
    forward,
  };
});
