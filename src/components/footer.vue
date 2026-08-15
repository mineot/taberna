<template>
  <footer class="footer">
    <div class="footer-content">
      <div v-if="showBrandSection" class="footer-brand">
        <Brand :visible="config?.site.footer.showBrand" />
        <p
          v-if="config?.site.footer.showDescription"
          class="footer-brand-title"
        >
          {{ config?.site.description }}
        </p>
      </div>

      <div
        class="footer-section"
        v-for="section in config?.site.footer.sections"
      >
        <div class="footer-section-title">
          {{ section.title }}
        </div>

        <div v-for="item in section.items">
          <a
            v-if="item.type === 'internal' || item.type === 'external'"
            :href="item.href"
            class="footer-section-link"
            :target="item.type === 'external' ? '_blank' : '_self'"
          >
            <Link
              v-if="item.type === 'internal'"
              :size="section.iconSize ?? DEFAULT_ICON_SIZE"
            />
            <ExternalLink
              v-if="item.type === 'external'"
              :size="section.iconSize ?? DEFAULT_ICON_SIZE"
            />
            <span>{{ item.text }}</span>
          </a>

          <img
            v-else-if="item.type === 'image'"
            :class="{ 'rounded-lg': section.imageRounded ?? false }"
            :height="section.imageSize ?? DEFAULT_IMAGE_SIZE"
            :width="section.imageSize ?? DEFAULT_IMAGE_SIZE"
            :src="item.href"
            :alt="item.text"
          />
        </div>
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
import { computed } from 'vue';
import { ExternalLink, Link } from '@lucide/vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '../stories/config.store.ts';
import Brand from './brand.vue';

const DEFAULT_ICON_SIZE = 14;
const DEFAULT_IMAGE_SIZE = 82;

const storeConfig = useConfigStore();
const { config } = storeToRefs(storeConfig);
const showBrandSection = computed(
  () =>
    config.value?.site.footer.showBrand ||
    config.value?.site.footer.showDescription,
);
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
  @apply flex flex-col items-start justify-center;

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
