<template>
  <Loading>
    <Error>
      <Scaffold v-if="scaffoldManifest?.enabled">
        <template #header-brand>
          <div v-html="scaffoldBrad"></div>
        </template>
        <template #header-menu>
          <div v-html="scaffoldMenu"></div>
        </template>
        <template #header-nav>
          <div v-html="scaffoldNav"></div>
        </template>
        <template #footer>
          <div v-html="scaffoldFooter"></div>
        </template>
        <template #footer-owner>
          <span>{{ scaffoldManifest?.owner }}</span>
        </template>
        <template #footer-year>
          <span>{{ scaffoldManifest?.year }}</span>
        </template>
        <router-view />
      </Scaffold>
      <router-view v-else />
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';
import Scaffold from '@/components/scaffold.vue';
import { storeToRefs } from 'pinia';

const { initApp } = useAppStore();
const {
  scaffoldBrad,
  scaffoldFooter,
  scaffoldManifest,
  scaffoldMenu,
  scaffoldNav,
} = storeToRefs(useAppStore());

onMounted(() => {
  initApp();
});
</script>
