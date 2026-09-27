<template>
  <Teleport to="body">
    <div v-if="backdrop" class="tbi-backdrop" @click="hideBackdrop"></div>
    <slot v-else></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { useBehaviorStore } from '@/stories/behavior.store';
import { storeToRefs } from 'pinia';

const { backdrop } = storeToRefs(useBehaviorStore());
const { hideBackdrop } = useBehaviorStore();
</script>

<style scoped>
@reference "@/style.css";

.tbi-backdrop {
  @apply fixed inset-0 backdrop-blur-xs;
  @apply tbu-texture;
  z-index: var(--z-backdrop);
  background-color: var(--backdrop-color);
}
</style>
