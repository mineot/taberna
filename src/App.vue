<template>
  <Backdrop />
  <Loading />
  <Error />
  <tbc-scaffold
    v-if="config?.scaffold.enabled"
    :header-content-file="config?.scaffold.header"
    :footer-content-file="config?.scaffold.footer"
  >
    <div class="tbu-container">
      <router-view />
    </div>
  </tbc-scaffold>
  <router-view v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';
import Backdrop from '@/widgets/backdrop.vue';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';

const { initApp } = useAppStore();
const { config } = storeToRefs(useAppStore());

onMounted(() => {
  initApp();
});
</script>
