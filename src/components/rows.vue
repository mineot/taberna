<template>
  <div
    class="rows"
    :style="{
      '--rows-gap': props.gap,
      '--rows-align': getAlign(props.align),
    }"
  >
    <slot class="test"></slot>
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

const getAlign = (align: string) => {
  if (align === 'start') {
    return 'flex-start';
  } else if (align === 'end') {
    return 'flex-end';
  }

  return 'center';
};
</script>

<style>
@import 'tailwindcss';
@import '@/style.css';

.rows {
  @apply grid grid-rows-1;
  gap: calc(var(--spacing) * var(--rows-gap));
}

.rows > :is(*) {
  @apply flex;
  justify-content: var(--rows-align);
}
</style>
