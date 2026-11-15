<template>
  <div v-if="error" class="tbi-error">
    <div>
      <div>
        <h1>{{ error.title }}</h1>
        <h2>Status {{ error.status }}</h2>
      </div>

      <div>
        <h3>Message:</h3>
        <p>{{ error.message }}</p>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';
const { error } = storeToRefs(useAppStore());
</script>

<style scoped>
@reference "@/style.css";

.tbi-error {
  @apply absolute h-full w-full;
  @apply flex items-center justify-center;
  background-color: var(--error-backdrop);

  > div {
    @apply flex max-w-100 flex-col gap-4;
    @apply m-2 px-6 py-4 font-mono;
    @apply tbu-rounded tbu-texture;
    background-color: var(--error-bg);
    border: var(--error-border);
    color: var(--error-text);

    > div {
      > h1 {
        @apply text-xl font-bold;
      }

      > h2 {
        @apply text-lg font-light;
      }

      > h3 {
        @apply font-semibold;
      }

      > p {
        @apply text-sm;
      }
    }
  }
}
</style>
