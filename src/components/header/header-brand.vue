<template>
  <section class="brand">
    <!-- FIXME: buscar uma imagem na pasta public -->
    <img src="https://placehold.co/40" alt="No Image" />
    <!-- FIXME: buscar o nome do arquivo env -->
    <h1>Marina Müller Pires</h1>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.brand {
  @apply app-duration cursor-pointer text-nowrap;
  @apply flex items-center justify-center gap-1 sm:gap-4;
  @apply font-fancy text-2xl sm:text-4xl;
}

.brand img {
  @apply rounded-full;
}

.brand h1 {
  line-height: 0;
  margin-top: 7px;
  @apply text-tertiary-dark;
}
</style>
