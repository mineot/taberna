<template>
  <div
    :class="[
      'panel',
      {
        'panel-emphasis': props.emphasis,
        'panel-rounded': props.rounded,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  emphasis: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@reference '@/style.css';

.panel {
  @apply flex h-full w-full flex-col;
  gap: calc(var(--spacing) * var(--panel-spacing));
}

.panel-emphasis {
  background-color: var(--panel-emphasis-color);
  padding: calc(var(--spacing) * var(--panel-emphasis-spacing));
}

.panel-rounded {
  @apply rounded-lg;
}
</style>
