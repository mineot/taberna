<template>
  <Loading />
  <Error />
  <tbc-sidebar id="sidebar"></tbc-sidebar>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';
import { useBehaviorStore } from '@/stories/behavior.store';

const { initApp } = useAppStore();
const { showSidebar } = useBehaviorStore();

onMounted(() => {
  initApp();
  setTimeout(() => {
    showSidebar('#sidebar');
  }, 1000);
});
</script>
