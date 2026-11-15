<template>
  <Loading>
    <Error>
      <AppTemplate>
        <router-view />
      </AppTemplate>
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { Error, Loading } from '@/widgets';
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import AppTemplate from './AppTemplate.vue';

const { initApp } = useAppStore();

onMounted(() => {
  initApp().catch(() => undefined);
});
</script>
