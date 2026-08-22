<template>
  <div class="flex h-full flex-col gap-1">
    <Title :data="props.data" smaller />

    <div
      :class="[
        'flex',
        'gap-2',
        'h-full',
        {
          'flex-col': props.data.direction === 'col',
          'flex-row': props.data.direction === 'row',
          'flex-wrap': props.data.wrap ?? true,
          'items-center': props.data.align === 'center',
          'items-end': props.data.align === 'end',
          'items-start': props.data.align === 'start',
          'justify-center': props.data.justify === 'center',
          'justify-end': props.data.justify === 'end',
          'justify-start': props.data.justify === 'start',
          'm-2': props.data.margin ?? false,
        },
      ]"
    >
      <img
        v-for="image in props.data.images"
        :height="image.height ?? 64"
        :width="image.width ?? 64"
        :src="image.src"
        :alt="image.alt"
        :class="{ 'rounded-md': image.rounded ?? false }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './content-title.vue';
import type { ImageBlock } from '../../utils/content.util.ts';
import type { PropType } from 'vue';

const props = defineProps({
  data: {
    type: Object as PropType<ImageBlock>,
    required: true,
    default: {},
  },
});
</script>
