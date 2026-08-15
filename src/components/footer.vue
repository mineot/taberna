<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <Brand />
        <p class="footer-brand-title">
          {{ config?.site.description }}
        </p>
      </div>

      <div>
        <div>Titulo 1</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div>
        <div>Titulo 2</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div>
        <div>Titulo 3</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
    <div class="footer-copyright">
      <div>{{ config?.site.ownership }}</div>
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

const storeConfig = useConfigStore();
const { config } = storeToRefs(storeConfig);

import Brand from './brand.vue';
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.footer {
  @apply app-container app-block;
  @apply flex flex-col gap-4;
  background-color: var(--footer-background-color);
  background-image: var(--footer-texture);
  border-top-color: var(--footer-border-color);
  border-top-style: var(--footer-border-style);
  border-top-width: var(--footer-border-size);
}

.footer-content {
  @apply flex flex-col justify-between md:flex-row;
  gap: calc(var(--spacing) * var(--footer-gap));
}

.footer-brand {
  @apply flex flex-col items-start;

  gap: calc(var(--spacing) * var(--footer-gap));

  @media (width >= 48rem) {
    max-width: calc(var(--spacing) * var(--footer-brand-max-size));
  }
}

.footer-brand-title {
  font-size: var(--footer-brand-text-size);
  color: var(--footer-brand-text-color);
}

.footer-copyright {
  @apply flex flex-col items-center justify-between pt-1 text-xs md:flex-row;
  @apply border-t border-solid;
  border-color: var(--footer-copyright-color);
  color: var(--footer-copyright-color);
}

.footer-powered {
  @apply flex flex-row items-center gap-1;
  @apply underline;
}
</style>
