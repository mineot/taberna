<template>
  <header class="header">
    <Brand />
    <div class="header-menu">
      <Navigator menu />
      <Language class="header-language" />
    </div>
  </header>
</template>

<script setup lang="ts">
import Navigator from './navigator.vue';
import Brand from './brand.vue';
import Language from './language.vue';
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.header {
  @apply app-container app-block;
  @apply sticky top-0 z-40 backdrop-blur;
  @apply app-gap-sm flex flex-row items-center justify-between;

  background-image: var(--header-texture);
  background-repeat: repeat;

  border-bottom-color: var(--header-border-color);
  border-bottom-style: var(--header-border-style);
  border-bottom-width: var(--header-border-size);

  background-color: color-mix(
    in oklab,
    var(--header-background-color) var(--header-background-opacity),
    transparent
  );
}

.header-menu {
  @apply app-gap-md flex flex-row items-center justify-between;
}

.header-language {
  @apply hidden md:flex;
}
</style>
