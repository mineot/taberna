<template>
  <header class="header"></header>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.header {
  @apply fixed top-0 right-0 left-0;
  @apply bg-background-dark app-padding-x app-padding-y;
}
</style>

<script setup lang="ts"></script>
