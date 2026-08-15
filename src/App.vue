<template>
  <Error />
  <Skeleton />
  <Content />
</template>

<script setup lang="ts">
import { useLanguageStore } from './stories/language.store.ts';
import Content from './components/content.vue';
import Error from './components/error.vue';
import Skeleton from './components/skeleton.vue';

const localeStore = useLanguageStore();
const { loadLanguage } = localeStore;

loadLanguage();
</script>
