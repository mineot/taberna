<template>
  <a
    class="link"
    :href="safeHref ?? undefined"
    :target="safeHref && props.external ? '_blank' : undefined"
    :rel="safeHref && props.external ? 'noopener noreferrer' : undefined"
    :aria-disabled="safeHref ? undefined : 'true'"
  >
    <ExternalLink v-if="props.external" :size="14" />
    <Link v-if="!props.external" :size="14" />
    <span>{{ props.label }}</span>
  </a>
</template>

<script setup lang="ts">
import { ExternalLink, Link } from '@lucide/vue';
import { computed } from 'vue';
import { normalizeLinkHref } from '@util/link.util';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const safeHref = computed(() => normalizeLinkHref(props.href, props.external));
</script>

<style>
@reference '@/style.css';

.link {
  @apply focus-visible:app-focus-ring flex flex-row gap-1;
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
