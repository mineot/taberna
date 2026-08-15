<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style>
@import 'tailwindcss';
@import '../style.css';

.main {
  @apply app-container;
  @apply flex-1 py-2 md:py-4;
}
</style>
