<template>
  <Loading>
    <Error>
      <Scaffold v-if="scaffold?.enabled">
        <template #footer-owner>{{ scaffold?.owner }}</template>
        <template #footer-year>{{ scaffold?.year }}</template>
        <router-view />
      </Scaffold>
      <router-view v-else />
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/stories/config.store';
import { useLanguageStore } from '@/stories/language.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';
import Scaffold from '@/components/scaffold.vue';

const { initLanguage } = useLanguageStore();
const { initConfiguration } = useConfigStore();
const { scaffold } = storeToRefs(useConfigStore());

onMounted(() => {
  initLanguage().then(() => {
    initConfiguration();
  });
});
</script>
