<template>
  <Header />
  <main>
    <div v-for="test in tests" :key="test">Main {{ test }}</div>
  </main>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue';
const tests = Array.from({ length: 50 }, (_, i) => i);
</script>
