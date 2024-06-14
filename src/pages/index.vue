<script setup lang="ts">
import { useWorkspaceStore } from "~/stores/workspace";
import { SETTINGS_DRAWER } from "~/constants/id";

const workspace = useWorkspaceStore();
</script>

<template>
  <div class="flex">
    <Drawer :id="SETTINGS_DRAWER" class="h-full">
      <template v-if="workspace.current" v-slot:page_content>
        <div class="flex flex-col h-full">
          <Explorer />
        </div>
      </template>

      <template v-slot:sidebar_content>
        <Settings />
      </template>
    </Drawer>
  </div>
</template>
