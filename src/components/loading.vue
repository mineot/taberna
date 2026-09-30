<template>
  <div :class="['tbi-loading', { flex: loading, hidden: !loading }]">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { loading } = storeToRefs(useAppStore());
</script>

<style scoped>
@reference "@/style.css";

.tbi-loading {
  @apply absolute z-200 h-full w-full;
  @apply flex-wrap items-center justify-center gap-2;
  @apply tbu-primary-bg tbu-texture;
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
  --c: no-repeat radial-gradient(farthest-side, var(--color-asset) 92%, #0000);
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
