<template>
  <div v-if="pageLoading" class="flex flex-col gap-4">
    <div class="skeleton h-10 w-3/4 rounded"></div>
    <div class="skeleton h-6 w-1/2 rounded"></div>
    <div class="mt-4 flex flex-col gap-3">
      <div class="skeleton h-4 w-full rounded"></div>
      <div class="skeleton h-4 w-5/6 rounded"></div>
      <div class="skeleton h-4 w-4/6 rounded"></div>
    </div>
  </div>

  <div v-else-if="pageError" class="py-12 text-center">
    <p class="app-text-accent text-xl">{{ pageError }}</p>
  </div>

  <article
    v-else-if="pageHtml"
    class="prose prose-invert max-w-none"
    v-html="pageHtml"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useConfig } from '../composables/useConfig';
import { useLocale } from '../composables/useLocale';
import { useMarkdown } from '../composables/useMarkdown';

const route = useRoute();
const { config, loaded } = useConfig();
const { locale } = useLocale();
const { fetchMarkdown } = useMarkdown();

const pageHtml = ref('');
const pageError = ref('');
const pageLoading = ref(false);

const slug = computed(() => {
  const raw = route.params.slug as string;
  return raw.replace(/[^a-zA-Z0-9\-\/]/g, '');
});

const contentFile = computed(() => {
  const menuItem = config.value?.menu?.find((m) => m.route === route.path);
  return menuItem?.content ?? `${slug.value}.md`;
});

async function loadPage() {
  if (!locale.value || !slug.value) return;

  pageLoading.value = true;
  pageError.value = '';
  pageHtml.value = '';

  try {
    pageHtml.value = await fetchMarkdown(
      `/content/${locale.value}/${contentFile.value}`,
    );
  } catch {
    pageError.value = 'Page not found';
  } finally {
    pageLoading.value = false;
  }
}

watch(
  [loaded, locale, slug],
  async ([isLoaded]) => {
    if (isLoaded) await loadPage();
  },
  { immediate: true },
);
</script>
