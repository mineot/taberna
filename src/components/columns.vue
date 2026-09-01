<template>
  <div
    :class="[
      'columns',
      {
        'items-center': props.align === 'center',
        'items-end': props.align === 'end',
        'items-start': props.align === 'start',
      },
    ]"
    :style="{
      '--columns': props.cols,
      '--columns-gap': props.gap,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    align?: 'start' | 'center' | 'end';
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gap?: number;
  }>(),
  {
    align: 'start',
    cols: 1,
    gap: 0,
  },
);
</script>

<style>
@reference '@/style.css';

.columns {
  @apply grid w-full grid-cols-1;
  gap: calc(var(--spacing) * var(--columns-gap));

  @media (width >= 48rem) {
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
  }
}
</style>
