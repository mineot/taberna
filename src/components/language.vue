<template>
  <a class="tbi-language" href="#/language" @click="emit('click')">
    <div :class="['tbi-language-flag', { 'flag-only': props.flagOnly }]">
      {{ languageFlag }}
    </div>
    <div v-if="!props.flagOnly" class="tbi-language-name">
      <span>{{ languageName }}</span>
    </div>
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
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-language {
  @apply tbu-duration;
  @apply flex flex-nowrap items-center gap-2;
  @apply cursor-pointer grayscale-75 hover:grayscale-0;
}

.tbi-language-flag {
  @apply text-3xl;

  &.flag-only {
    @apply text-2xl;
  }
}

.tbi-language-name {
  @apply text-lg text-nowrap;
}
</style>
