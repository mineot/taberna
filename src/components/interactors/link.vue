<template>
  <a
    class="utbc-link"
    :href="props.href"
    :target="props.external ? '_blank' : '_self'"
  >
    {{ props.label }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: true,
    default: '/',
  },
  external: {
    type: Boolean,
    required: false,
    default: true,
  },
  label: {
    type: String,
    required: true,
    default: 'Link',
  },
});
</script>
