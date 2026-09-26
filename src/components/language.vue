<template>
  <a class="tbi-language" href="#/language">
    <div :class="['tbi-language-flag', { mini: props.mini }]">
      {{ languageFlag }}
    </div>
    <div v-if="!props.mini" class="tbi-language-name">
      <span>{{ languageName }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { languageFlag, languageName } = storeToRefs(useAppStore());

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
    @apply text-2xl;
  }
}

.tbi-language-name {
  @apply text-lg text-nowrap;
}
</style>
