<template>
  <div v-if="props.errorMessage" class="error">
    <div class="error-content">{{ props.errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errorMessage: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.error {
  @apply flex flex-1 items-center justify-center;
}

.error-content {
  @apply rounded-lg px-4 py-2;
  @apply font-bold uppercase;
  @apply border-solid;

  --tw-border-style: var(--error-border-style);
  background-color: var(--error-background-color);
  background-image: var(--error-texture);
  background-repeat: repeat;
  border-color: var(--error-border-color);
  border-style: var(--error-border-style);
  border-width: var(--error-border-size);
  color: var(--error-text);
}
</style>
