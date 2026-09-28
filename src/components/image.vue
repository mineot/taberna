<template>
  <img
    :class="[
      'tbu-duration',
      {
        'tbi-h-sm': props.hSm != undefined,
        'tbi-h-md': props.hMd != undefined,
        'tbi-h-lg': props.hLg != undefined,
        'tbi-w-sm': props.wSm != undefined,
        'tbi-w-md': props.wMd != undefined,
        'tbi-w-lg': props.wLg != undefined,
      },
    ]"
    :style="{
      '--tbiv-h-sm': checkDim(props.hSm),
      '--tbiv-h-md': checkDim(props.hMd),
      '--tbiv-h-lg': checkDim(props.hLg),
      '--tbiv-w-sm': checkDim(props.wSm),
      '--tbiv-w-md': checkDim(props.wMd),
      '--tbiv-w-lg': checkDim(props.wLg),
    }"
    :src="props.src"
    :alt="props.alt"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  hSm: {
    type: String,
    required: false,
    default: undefined,
  },
  hMd: {
    type: String,
    required: false,
    default: undefined,
  },
  hLg: {
    type: String,
    required: false,
    default: undefined,
  },
  wSm: {
    type: String,
    required: false,
    default: undefined,
  },
  wMd: {
    type: String,
    required: false,
    default: undefined,
  },
  wLg: {
    type: String,
    required: false,
    default: undefined,
  },
});

const checkDim = (dim?: string): string => {
  if (!dim) return '';
  const value = dim.trim();
  return /^\d+(\.\d+)?$/.test(value) ? `${value}rem` : dim;
};
</script>

<style scoped>
@reference "@/style.css";

.tbi-h-sm {
  @media (width < 48rem) {
    height: var(--tbiv-h-sm);
    min-height: var(--tbiv-h-sm);
    max-height: var(--tbiv-h-sm);
  }
}

.tbi-h-md {
  @media (width >= 48rem) {
    height: var(--tbiv-h-md);
    min-height: var(--tbiv-h-md);
    max-height: var(--tbiv-h-md);
  }
}

.tbi-h-lg {
  @media (width >= 64rem) {
    height: var(--tbiv-h-lg);
    min-height: var(--tbiv-h-lg);
    max-height: var(--tbiv-h-lg);
  }
}

.tbi-w-sm {
  @media (width < 48rem) {
    width: var(--tbiv-w-sm);
    min-width: var(--tbiv-w-sm);
    max-width: var(--tbiv-w-sm);
  }
}

.tbi-w-md {
  @media (width >= 48rem) {
    width: var(--tbiv-w-md);
    min-width: var(--tbiv-w-md);
    max-width: var(--tbiv-w-md);
  }
}

.tbi-w-lg {
  @media (width >= 64rem) {
    width: var(--tbiv-w-lg);
    min-width: var(--tbiv-w-lg);
    max-width: var(--tbiv-w-lg);
  }
}
</style>
