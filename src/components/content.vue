<template>
  <div v-html="sanitizedHtml"></div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
import { computed } from 'vue';

const props = defineProps<{
  data: string;
}>();

const sanitizedHtml = computed(() =>
  DOMPurify.sanitize(props.data, {
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: /^twc-(brand|link)$/,
      attributeNameCheck: /^(rowspan)$/,
      allowCustomizedBuiltInElements: false,
    },
    ADD_ATTR: ['description', 'href', 'label', 'external'],
  }),
);
</script>
