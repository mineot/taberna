<template>
  <header class="header">Header</header>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.header {
  position: sticky;
  top: 0;
  z-index: 50;

  @apply bg-primary-dark app-padding-x app-padding-y;
}
</style>

<script setup lang="ts"></script>
