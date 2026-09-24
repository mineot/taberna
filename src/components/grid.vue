<template>
  <section
    :class="[
      'tbi-grid',
      {
        'tbu-emphasis-background': props.emphasis,
        'tbu-texture': props.emphasis,
      },
    ]"
    :style="{ '--tbiv-grid-size': resolvedCols }"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  emphasis: {
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

.tbi-grid {
  @apply grid;

  @media (width < 48rem) {
    @apply grid-cols-1;
    gap: calc(var(--spacing) * var(--spacing-sm));
  }

  @media (width >= 48rem) {
    gap: calc(var(--spacing) * var(--spacing-md));
    grid-template-columns: repeat(var(--tbiv-grid-size), minmax(0, 1fr));
  }

  @media (width >= 64rem) {
    gap: calc(var(--spacing) * var(--spacing-lg));
    grid-template-columns: repeat(var(--tbiv-grid-size), minmax(0, 1fr));
  }
}
</style>
