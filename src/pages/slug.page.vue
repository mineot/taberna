<template>
  <div
    v-if="pageStatus === 'loading'"
    class="page-status"
    role="status"
    aria-live="polite"
  >
    Loading page
  </div>
  <Content v-else-if="pageStatus === 'ready'" :data="content" />
  <div v-else-if="pageStatus === 'not-found'" class="page-status" role="alert">
    Page not found
  </div>
  <div v-else-if="pageStatus === 'error'" class="page-status" role="alert">
    Failed to load page
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { publicPath } from '@/utils/paths.util';
import { fetchHtmlFragment, ResourceError } from '@util/fetch.util';
import { normalizeContentSlug } from '@util/slug.util';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '@store/language.store';
import { useRoute } from 'vue-router';
import Content from '@layout/content.vue';

const { locale } = storeToRefs(useLanguageStore());
const route = useRoute();

type PageStatus = 'error' | 'idle' | 'loading' | 'not-found' | 'ready';

const slug = computed(() => route.params.slug);
const content = ref('');
const pageStatus = ref<PageStatus>('idle');

let requestSequence = 0;

watch(
  [locale, slug],
  async ([currentLocale, rawSlug], _previous, onCleanup) => {
    const requestId = ++requestSequence;
    const controller = new AbortController();
    const currentSlug = normalizeContentSlug(rawSlug);

    onCleanup(() => controller.abort());
    content.value = '';

    if (!currentLocale) {
      pageStatus.value = 'idle';
      return;
    }

    if (!currentSlug) {
      pageStatus.value = 'not-found';
      return;
    }

    pageStatus.value = 'loading';

    try {
      const path = publicPath(`content/${currentLocale}/${currentSlug}`);
      const loadedContent = await fetchHtmlFragment(path, {
        signal: controller.signal,
      });

      if (requestId !== requestSequence) return;

      content.value = loadedContent;
      pageStatus.value = 'ready';
    } catch (error) {
      if (requestId !== requestSequence) return;

      content.value = '';

      if (error instanceof ResourceError && error.kind === 'aborted') return;

      pageStatus.value =
        error instanceof ResourceError &&
        (error.kind === 'not-found' || error.kind === 'unexpected-document')
          ? 'not-found'
          : 'error';
    }
  },
  { immediate: true },
);
</script>

<style>
@reference '@/style.css';

.page-status {
  @apply app-padding-lg flex w-full items-center justify-center text-center;
  color: var(--text-muted-color);
}
</style>
