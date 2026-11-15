<template>
  <div v-if="loading" class="tbi-loading">
    <div class="loader"></div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';
const { loading } = storeToRefs(useAppStore());
</script>

<style scoped>
@reference "@/style.css";

.tbi-loading {
  @apply absolute h-full w-full;
  @apply flex flex-col items-center justify-center;
  @apply tbu-texture;
  background-color: var(--loading-backdrop);
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
}

.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  --c: no-repeat radial-gradient(farthest-side, var(--loading-color) 92%, #0000);
  background:
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 50%,
    var(--c) 0 50%;
  background-size: 12px 12px;
  animation: l12 1s infinite;
}

.loader::before {
  margin: 4px;
  filter: hue-rotate(45deg);
  background-size: 8px 8px;
  animation-timing-function: linear;
}

@keyframes l12 {
  100% {
    transform: rotate(0.5turn);
  }
}
</style>
