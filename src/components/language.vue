<template>
  <a class="tbi-language" href="#/language">
    <div :class="['tbi-language-flag', { mini: props.mini }]">
      {{ languageFlag }}
    </div>
    <div v-if="!props.mini" class="tbi-language-name">{{ languageName }}</div>
  </a>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/stories/language.store';
import { storeToRefs } from 'pinia';

const { languageFlag, languageName } = storeToRefs(useLanguageStore());

const props = defineProps({
  mini: {
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

  &.mini {
    @apply text-lg;
  }
}

.tbi-language-name {
  @apply text-lg text-nowrap;
}
</style>
