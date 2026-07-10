<template>
  <div class="brand">
    <img src="https://placehold.co/40" alt="No Image" />
    <h1>Marina Müller Pires</h1>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.brand {
  @apply cursor-pointer;
  @apply flex items-center justify-center gap-4;
  @apply font-fancy text-large;
}

.brand img {
  @apply rounded-full;
}

.brand h1 {
  line-height: 0;
  margin-top: 7px;
}
</style>
