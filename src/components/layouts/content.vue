<template>
  <div v-html="sanitizedHtml"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { sanitizeContentHtml } from '@util/html.util';

const props = defineProps<{
  data: string;
}>();

const sanitizedHtml = computed(() => sanitizeContentHtml(props.data));
</script>
