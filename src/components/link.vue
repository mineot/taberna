<template>
  <a
    class="link"
    :href="props.href"
    :target="props.external ? '_blank' : '_self'"
  >
    <ExternalLink v-if="props.external" :size="14" />
    <Link v-if="!props.external" :size="14" />
    <span>{{ props.label }}</span>
  </a>
</template>

<script setup lang="ts">
import { ExternalLink, Link } from '@lucide/vue';

const props = defineProps({
  href: {
    type: String,
    required: true,
    default: '#',
  },
  label: {
    type: String,
    required: true,
    default: 'Link',
  },
  external: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.link {
  @apply flex flex-row gap-1;
  @apply items-center justify-start;
  @apply hover:underline;

  color: var(--text-color);

  &:hover {
    @media (hover: hover) {
      color: var(--emphasis-color);
    }
  }
}
</style>
