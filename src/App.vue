<template>
  <Error>
    <div class="tbu-container tbu-block">
      <span>Welcome to Taberna!</span>
    </div>
  </Error>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLanguageStore } from '@/stories/language.store';
import Error from '@/widgets/error.vue';

const { initLanguage } = useLanguageStore();

onMounted(() => {
  initLanguage();
});
</script>
