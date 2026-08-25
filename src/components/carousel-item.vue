<template>
  <div class="carousel-item">
    <slot />
  </div>
</template>

<style>
@import 'tailwindcss';
@import '@/style.css';

.carousel-item {
  @apply h-full w-full min-w-0;
}
</style>
