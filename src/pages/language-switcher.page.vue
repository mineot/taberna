<template>
  <div class="tbi-language-switcher">
    <div>
      <h1>
        <a href="/#"><icon-home></icon-home></a>
        <span>🌐 Language Switcher</span>
      </h1>

      <div>
        <div
          v-for="l in languages"
          :class="[{ selected: l.locale === language }]"
          @click="switchLanguage(l.locale)"
        >
          <div class="flag">{{ l.flag }}</div>
          <div class="name">{{ l.name }}</div>
        </div>
      </div>
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
  @apply h-full w-full;
  @apply flex flex-col flex-wrap items-center justify-center;

  > div {
    @apply flex flex-col items-center justify-center gap-10;

    > h1 {
      @apply text-2xl;
      @apply flex flex-row items-center gap-5;

      > a {
        @apply tbu-link text-xl;
      }
    }

    > div {
      @apply grid grid-cols-1 items-center justify-center gap-5 md:grid-cols-2;

      > div {
        @apply tbu-rounded tbu-texture cursor-pointer p-4;
        @apply tbu-bg-primary-hard;
        @apply tbu-border-primary-soft;
        @apply hover:tbu-shadow;
        @apply flex flex-col items-center;
        @apply text-xl;

        > div.flag {
          @apply text-3xl;
        }

        &.selected {
          @apply tbu-bg-asset-hard;
        }
      }
    }
  }
}
</style>
