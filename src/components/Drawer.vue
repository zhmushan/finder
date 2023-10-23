<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<template>
  <div class="drawer drawer-end">
    <input :id="id" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <slot name="page_content" />
    </div>
    <div class="drawer-side">
      <label
        :for="id"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <slot name="sidebar_content" />
      </ul>
    </div>
  </div>
</template>
