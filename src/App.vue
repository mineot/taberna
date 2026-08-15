<template>
  <Error />
  <Skeleton :visible="loading" />
  <Content :visible="showContent" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from './stories/language.store.ts';
import { useLoadingStore } from './stories/loading.store.ts';
import Content from './components/content.vue';
import Error from './components/error.vue';
import Skeleton from './components/skeleton.vue';

const storeLocale = useLanguageStore();
const storeLoading = useLoadingStore();

const { loadLanguage } = storeLocale;
const { loading } = storeToRefs(storeLoading);
const showContent = computed(() => !loading.value);

loadLanguage();
</script>
