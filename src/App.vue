<template>
  <Header />
  <main class="app-main">
    <div>Inicio</div>
    <div v-for="test in tests" :key="test">Content</div>
    <div>Final</div>
  </main>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue';
const tests = Array.from({ length: 50 }, (_, i) => i);
</script>
