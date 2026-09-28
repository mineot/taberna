<template>
  <a
    :class="{
      'tbi-link': !props.pill,
      'tbi-link-pill': props.pill,
    }"
    :href="props.href"
    :title="props.title"
  >
    <tbc-flux v-if="props.label" :text="props.label"></tbc-flux>
    <slot v-else></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  title: {
    type: String,
    required: false,
    default: undefined,
  },
  href: {
    type: String,
    required: false,
    default: '#',
  },
  pill: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-link {
  @apply tbu-duration cursor-pointer;
  color: var(--link-text);

  &:hover {
    color: var(--link-text-hover);
  }

  &:active {
    color: var(--link-text-active);
  }
}

.tbi-link-pill {
  @apply tbu-duration cursor-pointer rounded-sm px-2 py-1;
  color: var(--link-pill-text);

  &:hover {
    background-image: var(--link-pill-texture);
    background-repeat: repeat;
    color: var(--link-pill-text-hover);
    background-color: var(--link-pill-bg-hover);
  }

  &:active {
    background-image: var(--link-pill-texture);
    background-repeat: repeat;
    color: var(--link-pill-text-active);
    background-color: var(--link-pill-bg-active);
  }
}
</style>
