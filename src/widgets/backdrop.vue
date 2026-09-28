<template>
  <Teleport to="body">
    <div v-if="backdrop" class="tbi-backdrop" @click="hideBackdrop"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { backdrop } = storeToRefs(useAppStore());
const { hideBackdrop } = useAppStore();
</script>

<style scoped>
@reference "@/style.css";

.tbi-backdrop {
  @apply fixed inset-0 z-100 backdrop-blur-xs;
  @apply tbu-texture;
  background-color: var(--backdrop-color);
}
</style>
