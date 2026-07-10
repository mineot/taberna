<template>
  <span class="item">Menu</span>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.item {
  @apply hidden md:block;
  @apply app-duration cursor-pointer;
  @apply text-secondary-dark hover:text-secondary-light;
}
</style>

<script setup lang="ts"></script>
