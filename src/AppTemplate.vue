<template>
  <Default>
    <template #header-brand>
      <tbc-flux content-file="brand.htm"></tbc-flux>
    </template>

    <template #header-nav>
      <tbc-flux content-file="header-nav.htm"></tbc-flux>
    </template>

    <template #footer-brand>
      <tbc-flux content-file="brand.htm"></tbc-flux>
    </template>

    <template #footer-complement>
      <div class="tbi-socials">
        <a href="https://github.com/" target="_blank">
          <img src="/icons/github.svg" alt="github" />
        </a>

        <a href="https://tailwindcss.com/" target="_blank">
          <img src="/icons/tailwindcss.svg" alt="tailwindcss" />
        </a>

        <a href="https://vuejs.org/" target="_blank">
          <img src="/icons/vue.svg" alt="vue" />
        </a>

        <a href="https://vite.dev/" target="_blank">
          <img src="/icons/vite.svg" alt="vue" />
        </a>
      </div>
    </template>

    <template #footer-body>
      <tbc-flux content-file="footer.htm"></tbc-flux>
    </template>

    <template #footer-copyright>
      <tbc-flux content-file="copyright.htm"></tbc-flux>
    </template>

    <template #sidebar-brand="{ close }">
      <tbc-flux content-file="brand.htm" @click="close"></tbc-flux>
    </template>

    <template #sidebar-body="{ close }">
      <tbc-flux content-file="sidebar-nav.htm" @click="close"></tbc-flux>
    </template>

    <template #sidebar-footer="{ close }">
      <tbc-language @click="close"></tbc-language>
    </template>

    <slot></slot>
  </Default>
</template>

<script setup lang="ts">
import Default from '@/templates/default.vue';
</script>

<style scoped>
@reference "@/style.css";

.tbi-socials {
  @apply flex flex-row items-center gap-6;

  > a {
    > img {
      @apply w-6;
    }
  }
}
</style>
