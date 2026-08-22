<template>
  <footer class="footer">
    <Content v-if="config?.footer" :data="config.footer" />

    <div :class="['footer-copyright', { 'footer-divider': config?.footer }]">
      <div>{{ config?.ownership }}</div>
      <a
        href="https://github.com/mineot/taberna"
        target="_blank"
        class="footer-powered"
      >
        <span>Powered by Mineot</span>
        <ExternalLink :size="12" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ExternalLink } from '@lucide/vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '../stories/config.store.ts';
import Content from '../components/contents/content.vue';

const storeConfig = useConfigStore();
const { config } = storeToRefs(storeConfig);
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.footer {
  @apply app-container app-block;
  @apply flex flex-col gap-4;
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
  @apply flex flex-col items-center justify-between pt-1 text-xs md:flex-row;
  color: var(--footer-copyright-color);
}

.footer-powered {
  @apply flex flex-row items-center gap-1;
  @apply underline;
}

/** UTILITES */

/* .footer-content {
  @apply flex flex-col justify-between md:flex-row;
  gap: calc(var(--spacing) * var(--footer-gap));
}

.footer-section {
  @apply flex flex-col items-start gap-2;
}

.footer-section-title {
  @apply font-bold text-nowrap;
  color: var(--footer-brand-text-color);
}

.footer-section-link {
  @apply flex items-center justify-center gap-1;
  @apply hover:font-semibold hover:underline;
  color: var(--footer-brand-text-color);
}

.footer-brand {
  @apply flex flex-col items-start justify-start;

  gap: calc(var(--spacing) * var(--footer-gap));

  @media (width >= 48rem) {
    max-width: calc(var(--spacing) * var(--footer-brand-max-size));
  }
}

.footer-brand-title {
  font-size: var(--footer-brand-text-size);
  color: var(--footer-brand-text-color);
} */
</style>
