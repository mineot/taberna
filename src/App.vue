<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useConfig } from './composables/useConfig';
import { useLocale } from './composables/useLocale';
import { useMarkdown } from './composables/useMarkdown';

const { config, loaded, error, loadConfig } = useConfig();
const { locale, loaded: localeLoaded, loadLocale, setLocale } = useLocale();
const { fetchMarkdown } = useMarkdown();

const markdownContent = ref<Map<string, string[]>>(new Map());

async function loadMarkdownFiles() {
  if (!config.value) return;

  const newMap = new Map<string, string[]>();
  for (const section of config.value.sections) {
    if (section.contentFile) {
      const results = await Promise.all(
        section.contentFile.map((file) =>
          fetchMarkdown(`/content/${locale.value}/${file}`),
        ),
      );
      newMap.set(section.id, results);
    }
  }
  markdownContent.value = newMap;
}

onMounted(async () => {
  await loadLocale();
  await loadConfig(locale.value);
  await loadMarkdownFiles();
});

watch(locale, async (newLocale) => {
  await loadConfig(newLocale);
  await loadMarkdownFiles();
});

watch(config, (newConfig) => {
  if (newConfig?.site.title) {
    document.title = newConfig.site.title;
  }
});
</script>

<template>
  <div
    v-if="!localeLoaded || !loaded"
    class="flex min-h-screen flex-col items-center justify-center gap-6 bg-primary-900 p-8"
  >
    <div class="flex w-full max-w-2xl flex-col gap-4">
      <div class="skeleton h-10 w-3/4 rounded"></div>
      <div class="skeleton h-6 w-1/2 rounded"></div>
      <div class="mt-4 flex flex-col gap-3">
        <div class="skeleton h-4 w-full rounded"></div>
        <div class="skeleton h-4 w-5/6 rounded"></div>
        <div class="skeleton h-4 w-4/6 rounded"></div>
      </div>
      <div class="skeleton mt-4 h-48 w-full rounded"></div>
    </div>
  </div>

  <div v-else-if="error" class="flex min-h-screen items-center justify-center bg-primary-900">
    <p class="text-secondary-400">{{ error }}</p>
  </div>

  <div v-else class="flex min-h-screen flex-col bg-primary-900 font-sans text-primary-100">
    <header class="sticky top-0 z-50 border-b border-primary-700 bg-primary-900/95 backdrop-blur">
      <div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <h1 class="font-fancy text-2xl text-secondary-400">{{ config?.site.title }}</h1>
        <div class="flex items-center gap-4">
          <nav class="hidden gap-6 md:flex">
            <a
              v-for="item in config?.menu"
              :key="item.href"
              :href="item.href"
              class="transition-colors hover:text-secondary-400 app-duration"
            >
              {{ item.label }}
            </a>
          </nav>
          <div class="flex gap-1 text-sm">
            <button
              :class="locale === 'pt-br' ? 'text-secondary-400' : 'text-primary-400'"
              class="transition-colors hover:text-secondary-300 app-duration"
              @click="setLocale('pt-br')"
            >
              PT
            </button>
            <span class="text-primary-600">/</span>
            <button
              :class="locale === 'en-us' ? 'text-secondary-400' : 'text-primary-400'"
              class="transition-colors hover:text-secondary-300 app-duration"
              @click="setLocale('en-us')"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 px-6 py-12">
      <section
        v-for="section in config?.sections"
        :key="section.id"
        :id="section.id"
        class="flex flex-col gap-4 md:flex-row md:gap-8"
        :class="[
          section.invert ? 'md:flex-row-reverse' : '',
          {
            'md:items-start': section.imagePosition === 'top',
            'md:items-center': !section.imagePosition || section.imagePosition === 'center',
            'md:items-end': section.imagePosition === 'bottom',
          },
        ]"
      >
        <div class="flex-1">
          <h2 class="text-2xl font-bold">{{ section.title }}</h2>
          <p v-if="section.subtitle" class="mt-1 text-secondary-400">{{ section.subtitle }}</p>

          <div
            v-if="section.contentFile && markdownContent.get(section.id)"
            class="mt-4 flex flex-col gap-6 md:flex-row"
          >
            <div
              v-for="(html, i) in markdownContent.get(section.id)"
              :key="i"
              class="prose prose-invert flex-1 max-w-none"
              v-html="html"
            />
          </div>

          <div v-else-if="section.content" class="mt-4 flex flex-col gap-6 md:flex-row">
            <p
              v-for="(item, i) in section.content"
              :key="i"
              class="flex-1 leading-relaxed text-primary-300"
            >
              {{ item }}
            </p>
          </div>
        </div>
        <img
          v-if="section.image"
          :src="section.image"
          :alt="section.title"
          class="w-full rounded-lg object-cover md:w-1/2"
          :class="{
            'object-top': section.imagePosition === 'top',
            'object-center': !section.imagePosition || section.imagePosition === 'center',
            'object-bottom': section.imagePosition === 'bottom',
          }"
        />
      </section>
    </main>

    <footer class="border-t border-primary-700 bg-primary-950 py-6 text-center text-primary-400">
      <p>{{ config?.footer.text }}</p>
    </footer>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: var(--color-primary-700);
}
</style>
