<template>
  <section
    :class="[
      'grid',
      {
        'utbc-muted-background': props.muted,
        'utbc-texture': props.muted,
      },
    ]"
    :style="{ '--inner-grid-size': resolvedCols }"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  muted: {
    type: Boolean,
    required: false,
    default: false,
  },
  cols: {
    type: Number,
    required: false,
    default: 12,
    validator: (value: number) =>
      Number.isFinite(value) && value >= 1 && value <= 12,
  },
});

const resolvedCols = computed(() => {
  const value = Number(props.cols);
  if (!Number.isFinite(value)) return 1;
  return Math.min(12, Math.max(1, Math.floor(value)));
});
</script>

<style scoped>
@reference "@/style.css";

.grid {
  @apply grid;

  @media (width < 48rem) {
    @apply grid-cols-1;
    gap: calc(var(--spacing) * var(--spacing-sm));
  }

  @media (width >= 48rem) {
    gap: calc(var(--spacing) * var(--spacing-md));
    grid-template-columns: repeat(var(--inner-grid-size), minmax(0, 1fr));
  }

  @media (width >= 64rem) {
    gap: calc(var(--spacing) * var(--spacing-lg));
    grid-template-columns: repeat(var(--inner-grid-size), minmax(0, 1fr));
  }
}
</style>
