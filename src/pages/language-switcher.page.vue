<template>
  <div class="languages">
    <div
      :class="['laguage-item', { 'language-selected': locale === language }]"
      v-for="language in languages?.available"
      :key="language"
      @click="selectLanguage(language)"
    >
      <div class="language-flag">{{ languages?.flags[language] }}</div>
      <div class="language-text">{{ languages?.names[language] }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '../stories/language.store';

const storeLanguage = useLanguageStore();
const { setLaguage } = storeLanguage;
const { languages, locale } = storeToRefs(storeLanguage);

function selectLanguage(newLanguage: string) {
  if (newLanguage !== locale.value) {
    setLaguage(newLanguage);
  }
}
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.languages {
  @apply flex flex-row flex-wrap justify-around gap-4;
}

.laguage-item {
  @apply flex flex-col items-center gap-2;
  @apply cursor-pointer rounded-lg px-8 py-6;

  background-color: var(--navigator-background);
  color: var(--navigator-text);

  &:hover {
    @media (hover: hover) {
      background-color: var(--navigator-background-hover);
      background-image: var(--navigator-texture);
      background-repeat: repeat;
      color: var(--navigator-text-hover);
    }
  }

  &:active {
    background-color: var(--navigator-background-active);
    background-image: var(--navigator-texture);
    background-repeat: repeat;
    color: var(--navigator-text-active);
  }
}

.language-flag {
  @apply app-duration;
  @apply text-3xl md:text-5xl;
}

.language-text {
  @apply app-duration;
  @apply text-base text-nowrap md:text-lg;
}

.language-selected {
  background-color: var(--navigator-background-hover);
  background-image: var(--navigator-texture);
  background-repeat: repeat;
  color: var(--navigator-text-hover);
}
</style>
