<template>
  <div class="carousel-item">
    <slot />
  </div>
</template>

<style>
@reference '@/style.css';

twc-carousel-item {
  @apply block w-full min-w-0;
}

.carousel-item {
  @apply h-full w-full min-w-0;
}
</style>
