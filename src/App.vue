<template>
  <Loading />
  <Error>
    <AppTemplate>
      <router-view />
    </AppTemplate>
  </Error>
</template>

<script setup lang="ts">
import { Error } from '@/widgets';
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import AppTemplate from './AppTemplate.vue';
import Loading from '@/components/loading.vue';

const { initApp } = useAppStore();

onMounted(() => {
  initApp().catch(() => undefined);
});
</script>
