<template>
  <footer class="footer">
    <Content v-if="config?.footerContent" :data="config.footerContent" />

    <div
      :class="['footer-copyright', { 'footer-divider': config?.footerContent }]"
    >
      <div>{{ config?.ownership }}</div>
      <a
        href="https://github.com/mineot/taberna"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-powered"
      >
        <span>Powered by Mineot</span>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@store/config.store.ts';
import Content from '@layout/content.vue';

const { config } = storeToRefs(useConfigStore());
</script>

<style>
@reference '@/style.css';

.footer {
  @apply app-container app-block;
  @apply app-gap-md flex flex-col;

  background-color: var(--footer-background-color);
  background-image: var(--footer-texture);
  background-repeat: repeat;

  border-top-color: var(--footer-border-color);
  border-top-style: var(--footer-border-style);
  border-top-width: var(--footer-border-size);
}

.footer-divider {
  @apply border-t border-solid;
  border-color: var(--footer-copyright-color);
}

.footer-copyright {
  @apply flex flex-col items-center justify-between md:flex-row;
  @apply pt-1 text-xs;
  color: var(--footer-copyright-color);
}

.footer-powered {
  @apply focus-visible:app-focus-ring flex flex-row items-center gap-1;
  @apply underline;
}
</style>
