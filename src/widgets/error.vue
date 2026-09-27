<template>
  <div class="tbi-error" v-if="error">
    <div class="tbi-error-container">
      <div class="font-bold">{{ error.title }}</div>
      <div class="flex flex-wrap items-center gap-2">
        <span>{{ error.message }}</span>
        <span class="text-xs">({{ error.status }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stories/error.store';
import { storeToRefs } from 'pinia';
const { error } = storeToRefs(useErrorStore());
</script>

<style scoped>
@reference "@/style.css";

.tbi-error {
  @apply absolute z-200 h-full w-full;
  @apply flex flex-wrap items-center justify-center gap-2;
  @apply tbu-primary-bg tbu-texture;
}

.tbi-error-container {
  @apply flex flex-col flex-wrap gap-2 p-4 text-sm;
  @apply tbu-border tbu-rounded tbu-secondary-bg tbu-primary-text;
}
</style>
