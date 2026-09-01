<template>
  <div
    class="rows"
    :style="{
      '--rows-gap': props.gap,
      '--rows-align': props.align,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    align?: 'start' | 'center' | 'end';
    gap?: number;
  }>(),
  {
    align: 'start',
    gap: 0,
  },
);
</script>

<style>
@reference '@/style.css';

.rows {
  @apply grid grid-rows-1;
  gap: calc(var(--spacing) * var(--rows-gap));
}

.rows > :is(*) {
  text-align: var(--rows-align);
}
</style>
