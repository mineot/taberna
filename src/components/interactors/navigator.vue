<template>
  <a class="utbc-navigator" :href="`#/${props.href}`">
    {{ props.label }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: true,
    default: '',
  },
  label: {
    type: String,
    required: true,
    default: 'Navigator',
  },
});
</script>
