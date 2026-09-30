<template>
  <Loading />
  <Error />
  <AppTemplate>
    <router-view />
  </AppTemplate>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import AppTemplate from './AppTemplate.vue';
import Error from '@/components/error.vue';
import Loading from '@/components/loading.vue';

const { initApp } = useAppStore();

onMounted(() => {
  initApp().catch(() => undefined);
});
</script>
