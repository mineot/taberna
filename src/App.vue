<template>
  <Skeleton :visible="loading" />
  <Container :visible="showContent" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@store/config.store.ts';
import { useLanguageStore } from '@store/language.store.ts';
import { useLoadingStore } from '@store/loading.store.ts';
import Container from '@layout/container.vue';
import Skeleton from '@layout/skeleton.vue';

const { loadConfiguration } = useConfigStore();
const { loading } = storeToRefs(useLoadingStore());
const { loadLanguage } = useLanguageStore();

const showContent = computed(() => !loading.value);

loadLanguage().then(() => {
  loadConfiguration();
});
</script>
