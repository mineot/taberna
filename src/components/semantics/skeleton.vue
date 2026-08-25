<template>
  <div v-if="props.visible" class="skeleton">
    <div class="flex w-full max-w-2xl flex-col gap-4">
      <div class="skeleton-item h-10 w-3/4 rounded"></div>
      <div class="skeleton-item h-6 w-1/2 rounded"></div>
      <div class="mt-4 flex flex-col gap-3">
        <div class="skeleton-item h-4 w-full rounded"></div>
        <div class="skeleton-item h-4 w-5/6 rounded"></div>
        <div class="skeleton-item h-4 w-4/6 rounded"></div>
      </div>
      <div class="skeleton-item mt-4 h-48 w-full rounded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '@/style.css';

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}

.skeleton {
  @apply flex flex-1 flex-col items-center justify-center gap-6;
  @apply h-screen w-screen p-8;
  background-color: var(--background-color);
  background-image: var(--texture);
  background-repeat: repeat;
}

.skeleton-item {
  background-image: var(--texture);
  background-repeat: repeat;
  background-color: var(--skeleton);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
