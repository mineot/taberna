<template>
  <div class="tbi-language-switcher">
    <div
      v-for="l in languages"
      :class="['tbi-language', { selected: l.locale === language }]"
      @click="switchLanguage(l.locale)"
    >
      <div class="flag">{{ l.flag }}</div>
      <div class="name">{{ l.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { switchLanguage } = useAppStore();
const { language, languages } = storeToRefs(useAppStore());
</script>

<style scoped>
@reference "@/style.css";

.tbi-language-switcher {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-1;
}

.tbi-language {
  @apply flex cursor-pointer flex-col items-center justify-center gap-1 p-2;
  @apply tbu-duration hover:tbu-asset-bg-opaque tbu-rounded;
  @apply grayscale hover:grayscale-0;

  > .flag {
    @apply text-4xl;
  }

  > .name {
    @apply text-lg;
  }

  &.selected {
    @apply grayscale-0;
  }
}
</style>
