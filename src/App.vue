<template>
  <Loading>
    <Error>
      <tbc-scaffold>
        <router-view />
      </tbc-scaffold>
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLanguageStore } from '@/stories/language.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';

const { initLanguage } = useLanguageStore();

onMounted(() => {
  initLanguage();
});
</script>
