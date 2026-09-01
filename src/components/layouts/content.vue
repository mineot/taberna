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
      tagNameCheck:
        /^twc-(brand|link|carousel|carousel-item|panel|columns|rows)$/,
      allowCustomizedBuiltInElements: false,
    },
    ADD_ATTR: [
      'align',
      'cols',
      'delay',
      'description',
      'emphasis',
      'external',
      'gap',
      'href',
      'label',
      'limit',
      'rounded',
      'show-timer',
    ],
  }),
);
</script>
