<template>
  <div class="container">
    <div class="grid">
      <button
        v-for="lang in available"
        :key="lang"
        :class="['button', { 'button-selected': locale === lang }]"
        :disabled="switching"
        :aria-busy="switching"
        @click="switchLocale(lang)"
      >
        <span class="flag">{{ flags[lang] }}</span>
        <span class="label">{{ lang }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@reference "../style.css";

.container {
  @apply flex flex-col gap-8;
}

.grid {
  @apply grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4;
}

.button {
  @apply app-language-button;
  @apply flex cursor-pointer flex-col items-center gap-3;
  @apply rounded-xl border p-6;
  @apply transition-all;
}

.button-selected {
  @apply app-language-button-selected ring-2;
}

.flag {
  @apply text-5xl;
}

.label {
  @apply app-language-button-text text-sm;
}
</style>

<script setup lang="ts">
import { useLocale } from '../composables/useLocale';
import { useSwitchLocale } from '../composables/useSwitchLocale';

const { locale, flags, available } = useLocale();
const { switchLocale, switching } = useSwitchLocale();
</script>
