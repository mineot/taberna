<template>
  <section class="menu">
    <Menu class="submenu" />
    <Item />
    <Item />
    <Item />
    <Item />
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../../style.css';

.menu {
  @apply flex items-center gap-4;
}

.submenu {
  @apply block md:hidden;
  @apply app-duration cursor-pointer;
  @apply text-secondary-dark hover:text-secondary-light;
}
</style>

<script setup lang="ts">
import { Menu } from '@lucide/vue';
import Item from './header-menu-item.vue';
</script>
