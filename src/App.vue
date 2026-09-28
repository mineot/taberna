<template>
  <Backdrop />
  <Loading />
  <Error />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';
import Backdrop from '@/widgets/backdrop.vue';

const { initApp } = useAppStore();

onMounted(() => {
  initApp();
});
</script>
