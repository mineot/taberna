<template>
  <div v-if="props.data.title || props.data.subtitle">
    <div
      v-if="props.data.title"
      :class="[
        'title',
        {
          'title-size': !props.smaller,
          'title-smaller': props.smaller,
        },
      ]"
    >
      {{ props.data.title }}
    </div>
    <div
      v-if="props.data.subtitle"
      :class="[
        'subtitle',
        {
          'subtitle-size': !props.smaller,
          'subtitle-smaller': props.smaller,
        },
      ]"
    >
      {{ props.data.subtitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Header } from '../../utils/content.util';

const props = defineProps({
  data: {
    type: Object as PropType<Header>,
    required: true,
    default: {},
  },
  smaller: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '../../style.css';

.title {
  @apply font-semibold;
  color: var(--content-title-color);
}

.title-size {
  @apply text-2xl md:text-3xl;
}

.title-smaller {
  @apply text-base md:text-lg;
}

.subtitle {
  color: var(--content-subtitle-color);
}

.subtitle-size {
  @apply text-base md:text-lg;
}

.subtitle-smaller {
  @apply text-sm md:text-base;
}
</style>
