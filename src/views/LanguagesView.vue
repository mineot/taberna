<template>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <button
        v-for="lang in available"
        :key="lang"
        class="app-border flex cursor-pointer flex-col items-center gap-3 rounded-xl border p-6 transition-all app-background-hover"
        :class="{
          'ring-2 app-ring': locale === lang,
        }"
        @click="switchLocale(lang)"
      >
        <span class="text-5xl">{{ flags[lang] }}</span>
        <span class="text-sm app-text-body">{{ lang }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useConfig } from '../composables/useConfig';
import { useLocale } from '../composables/useLocale';

const router = useRouter();
const { loadConfig } = useConfig();
const { locale, flags, available, setLocale } = useLocale();

async function switchLocale(lang: string) {
  setLocale(lang);
  await loadConfig(lang);
  if (router.currentRoute.value.path !== '/') {
    router.push('/');
  }
}
</script>
