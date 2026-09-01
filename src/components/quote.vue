<template>
  <div class="quote">
    <div v-if="props.title" class="quote-title">
      {{ props.title }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<style>
@reference '@/style.css';

.quote {
  @apply flex flex-col;
  @apply font-serif text-sm;

  background-color: var(--quote-background-color);
  border-left-color: var(--quote-border-color);
  border-left-style: var(--quote-border-style);
  border-left-width: var(--quote-border-size);
  color: var(--quote-text-color);
  gap: calc(var(--spacing) * var(--quote-gap));
  padding: calc(var(--spacing) * var(--quote-spacing));

  > .quote-title {
    @apply text-lg font-semibold;
    color: var(--quote-title-color);
  }
}
</style>
