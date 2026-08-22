<template>
  <div class="flex flex-col gap-1">
    <Title :data="props.data ?? {}" smaller />
    <div
      class="flex flex-col gap-1"
      v-if="Array.isArray(props.data.content)"
      v-for="content in props.data.content"
    >
      {{ content }}
    </div>
    <div v-else>{{ props.data.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import Title from './content-title.vue';
import type { Paragraph } from '../../utils/content.util.ts';

const props = defineProps({
  data: {
    type: Object as PropType<Paragraph>,
    required: true,
    default: {},
  },
});
</script>
