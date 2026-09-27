<template>
  <Loading>
    <Error>
      <router-view />
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stories/app.store';
import { useBehaviorStore } from '@/stories/behavior.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';

const { initApp } = useAppStore();
const { showBackdrop } = useBehaviorStore();

onMounted(() => {
  initApp();
  showBackdrop();
});
</script>
