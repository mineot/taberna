<template>
  <a
    :class="{
      'tbi-link': !props.pill,
      'tbi-link-pill': props.pill,
    }"
    :href="props.href"
  >
    <span v-if="props.label">{{ props.label }}</span>
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
  @apply tbu-asset-link underline;
}

.tbi-link-pill {
  @apply tbu-asset-pill;
}
</style>
