<template>
  <section
    :class="[
      {
        'utbc-panel': !props.noSpacing,
        'utbc-rounded': props.rounded,
        'utbc-muted-background': props.muted,
        'utbc-texture': props.muted,
        'utbc-border': props.bordered,
      },
    ]"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  noSpacing: {
    type: Boolean,
    required: false,
    default: false,
  },
  muted: {
    type: Boolean,
    required: false,
    default: false,
  },
  rounded: {
    type: Boolean,
    required: false,
    default: false,
  },
  bordered: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@reference "@/style.css";

.utbc-panel {
  @apply utbc-duration;

  @media (width < 48rem) {
    padding-inline: calc(var(--spacing) * var(--spacing-sm));
    padding-block: calc(var(--spacing) * var(--spacing-sm));
  }

  @media (width >= 48rem) {
    padding-inline: calc(var(--spacing) * var(--spacing-md));
    padding-block: calc(var(--spacing) * var(--spacing-md));
  }

  @media (width >= 64rem) {
    padding-inline: calc(var(--spacing) * var(--spacing-lg));
    padding-block: calc(var(--spacing) * var(--spacing-lg));
  }
}
</style>
