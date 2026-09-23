<template>
  <!-- <div class="languages" :aria-busy="switching">
    <button
      v-for="language in languages?.available"
      :key="language"
      :class="['language-item', { 'language-selected': locale === language }]"
      type="button"
      :aria-pressed="locale === language"
      :disabled="switching"
      @click="selectLanguage(language)"
    >
      <div class="language-flag">{{ languages?.flags[language] }}</div>
      <div class="language-text">{{ languages?.names[language] }}</div>
    </button>
    <div v-if="switchError" class="language-error" role="alert">
      Failed to switch language
    </div>
  </div> -->
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useConfigStore } from '@store/config.store';
// import { useLanguageStore } from '@store/language.store';

// const configStore = useConfigStore();
// const languageStore = useLanguageStore();
// const { languages, locale } = storeToRefs(languageStore);

// const switchError = ref(false);
// const switching = ref(false);

// async function selectLanguage(newLanguage: string) {
//   if (
//     switching.value ||
//     newLanguage === locale.value ||
//     !languageStore.isLanguageAvailable(newLanguage)
//   ) {
//     return;
//   }

//   switching.value = true;
//   switchError.value = false;

//   try {
//     const configuration = await configStore.prepareConfiguration(newLanguage);

//     if (!languageStore.setLanguage(newLanguage)) return;

//     configStore.applyConfiguration(configuration);
//   } catch {
//     switchError.value = true;
//   } finally {
//     switching.value = false;
//   }
// }
</script>

<style>
@reference '@/style.css';

/*.languages {
  @apply flex flex-row flex-wrap justify-around gap-4;
}

.language-item {
  @apply flex flex-col items-center gap-2;
  @apply focus-visible:app-focus-ring cursor-pointer rounded-lg border-0 px-8 py-6;

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

  &:disabled {
    @apply cursor-wait opacity-60;
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

.language-error {
  @apply w-full text-center;
  color: var(--text-muted-color);
}*/
</style>
