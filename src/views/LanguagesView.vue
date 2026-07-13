<template>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <button
        v-for="lang in available"
        :key="lang"
        class="app-border app-background-hover flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-6 transition-all"
        :class="{
          'app-ring ring-2': locale === lang,
        }"
        @click="switchLocale(lang)"
      >
        <span class="text-5xl">{{ flags[lang] }}</span>
        <span class="app-text-body text-sm">{{ lang }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '../composables/useLocale';
import { useSwitchLocale } from '../composables/useSwitchLocale';

const { locale, flags, available } = useLocale();
const { switchLocale } = useSwitchLocale();
</script>
