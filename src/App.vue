<template>
  <Loading>
    <Error>
      <div class="tbu-container tbu-block">
        <span>Welcome to Taberna!</span>
      </div>
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
