<template>
  <header class="header">
    <Brand />
    <Menu />
  </header>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.header {
  @apply sticky top-0 z-50;
  @apply flex items-center justify-between;
  @apply bg-primary-dark app-padding-x app-padding-y;
}
</style>

<script setup lang="ts">
import Brand from './header-brand.vue';
import Menu from './header-menu.vue';
</script>
