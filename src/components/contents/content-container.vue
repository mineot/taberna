<template>
  <div
    :class="[
      'content-container',
      {
        'content-container-emphasis': props.emphasis,
        'content-container-rounded': props.rounded,
        'content-container-spacing': props.spacing,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  spacing: {
    type: Boolean,
    required: false,
    default: false,
  },
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
@import 'tailwindcss';
@import '../../style.css';

.content-container {
  background-color: var(--content-background-color);
  background-image: var(--content-texture);
  background-repeat: repeat;
}

.content-container-emphasis {
  background-color: var(--content-emphasis-color) !important;
  background-image: var(--content-emphasis-texture) !important;
  background-repeat: repeat;
}

.content-container-rounded {
  border-radius: var(--content-rounded);
}

.content-container-spacing {
  padding: calc(var(--spacing) * var(--content-spacing));
}
</style>
