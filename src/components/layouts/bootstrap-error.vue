<template>
  <div class="bootstrap-error" role="alert">
    <div class="bootstrap-error-card">
      <p>{{ props.message }}</p>
      <button
        class="bootstrap-error-button"
        type="button"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<style>
@reference '@/style.css';

.bootstrap-error {
  @apply app-padding-lg flex min-h-screen w-full items-center justify-center;
  background-color: var(--background-color);
  background-image: var(--texture);
  background-repeat: repeat;
}

.bootstrap-error-card {
  @apply app-gap-md flex max-w-lg flex-col items-center rounded-lg border p-6 text-center;
  background-color: var(--background-emphasis-color);
  border-color: var(--border-color);
}

.bootstrap-error-button {
  @apply app-duration focus-visible:app-focus-ring cursor-pointer rounded-md px-4 py-2;
  background-color: var(--navigator-background-hover);
  color: var(--navigator-text-hover);

  &:hover {
    @media (hover: hover) {
      background-color: var(--navigator-background-active);
      color: var(--navigator-text-active);
    }
  }
}
</style>
