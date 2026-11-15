<template>
  <a
    href="#/language"
    @click="emit('click')"
    :class="[
      'tbi-language',
      {
        lg: props.lg,
        sm: props.sm,
      },
    ]"
  >
    <span>{{ languageFlag }}</span>
    <span v-if="!props.flagOnly">{{ languageName }}</span>
  </a>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { languageFlag, languageName } = storeToRefs(useAppStore());

const emit = defineEmits(['click']);

const props = defineProps({
  flagOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  lg: {
    type: Boolean,
    required: false,
    default: false,
  },
  sm: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-language {
  @apply tbu-duration cursor-pointer;
  @apply inline-flex flex-nowrap items-center gap-2;
  @apply grayscale-75 hover:grayscale-0;

  &.lg {
    @apply text-xl;
  }

  &.sm {
    @apply text-sm;
  }
}
</style>
