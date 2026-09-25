<template>
  <Loading>
    <Error>
      <Scaffold>
        <router-view />
      </Scaffold>
    </Error>
  </Loading>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLanguageStore } from '@/stories/language.store';
import Error from '@/widgets/error.vue';
import Loading from '@/widgets/loading.vue';
import Scaffold from '@/components/scaffold.vue';

const { initLanguage } = useLanguageStore();

onMounted(() => {
  initLanguage();
});
</script>
