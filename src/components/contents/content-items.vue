<template>
  <template v-for="item in props.items">
    <template v-if="item.type === 'alert'"> </template>
    <template v-if="item.type === 'image'">
      <Image :data="item" />
    </template>
    <template v-if="item.type === 'paragraph'">
      <Paragraph :data="item" />
    </template>
  </template>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Items } from '../../utils/content.util';
import Paragraph from './content-paragraph.vue';
import Image from './content-image.vue';

const props = defineProps({
  items: {
    type: Object as PropType<Items>,
    required: true,
    default: [],
  },
});
</script>
