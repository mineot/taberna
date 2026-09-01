<template>
  <Content :data="content" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { publicPath } from '@/utils/paths.util';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '@store/language.store';
import { useRoute } from 'vue-router';
import Content from '@layout/content.vue';

const { locale } = storeToRefs(useLanguageStore());
const route = useRoute();

const slug = computed(() => String(route.params.slug ?? ''));
const content = ref('');

watch(
  [locale, slug],
  async ([currentLocale, currentSlug]) => {
    if (!currentLocale || !currentSlug) return;

    try {
      const path = publicPath(`content/${currentLocale}/${currentSlug}`);

      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      content.value = await response.text();
    } catch (err) {
      content.value = '';
      throw new Error('Failed to get slug', { cause: err });
    }
  },
  { immediate: true },
);
</script>
