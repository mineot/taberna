<template>
  <Skeleton :visible="loading" />
  <Container :visible="showContent" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from './stories/config.store.ts';
import { useLanguageStore } from './stories/language.store.ts';
import { useLoadingStore } from './stories/loading.store.ts';
import Container from './components/container.vue';
import Skeleton from './components/skeleton.vue';

const { loadConfiguration } = useConfigStore();
const { loading } = storeToRefs(useLoadingStore());
const { loadLanguage } = useLanguageStore();

const showContent = computed(() => !loading.value);

loadLanguage().then(() => {
  loadConfiguration();
});
</script>
