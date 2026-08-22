<template>
  <div class="flex h-full flex-col gap-1">
    <Title :data="props.data" smaller />

    <div :class="['flex', 'gap-2', 'h-full', classes]">
      <img
        v-for="(image, index) in props.data.images"
        :key="`${image.src}-${index}`"
        :height="imageDimensions[index]?.height"
        :width="imageDimensions[index]?.width"
        :src="image.src"
        :alt="image.alt"
        :class="{ 'rounded-md': image.rounded ?? false }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './content-title.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import type {
  Aligns,
  Directions,
  ImageBlock,
} from '../../utils/content.util.ts';

const props = defineProps<{ data: ImageBlock }>();

type AlignValue = Aligns | 'stretch';
type ToggleState = 'enabled' | 'disabled';

interface ResponsiveClasses {
  mobile: string;
  desktop: string;
}

const directionClasses = {
  col: { mobile: 'flex-col', desktop: 'md:flex-col' },
  row: { mobile: 'flex-row', desktop: 'md:flex-row' },
} satisfies Record<Directions, ResponsiveClasses>;

const alignClasses = {
  start: { mobile: 'items-start', desktop: 'md:items-start' },
  center: { mobile: 'items-center', desktop: 'md:items-center' },
  end: { mobile: 'items-end', desktop: 'md:items-end' },
  stretch: { mobile: 'items-stretch', desktop: 'md:items-stretch' },
} satisfies Record<AlignValue, ResponsiveClasses>;

const justifyClasses = {
  start: { mobile: 'justify-start', desktop: 'md:justify-start' },
  center: { mobile: 'justify-center', desktop: 'md:justify-center' },
  end: { mobile: 'justify-end', desktop: 'md:justify-end' },
} satisfies Record<Aligns, ResponsiveClasses>;

const wrapClasses = {
  enabled: { mobile: 'flex-wrap', desktop: 'md:flex-wrap' },
  disabled: { mobile: 'flex-nowrap', desktop: 'md:flex-nowrap' },
} satisfies Record<ToggleState, ResponsiveClasses>;

const marginClasses = {
  enabled: { mobile: 'm-2', desktop: 'md:m-2' },
  disabled: { mobile: 'm-0', desktop: 'md:m-0' },
} satisfies Record<ToggleState, ResponsiveClasses>;

const isDesktop = ref(false);
let desktopMedia: MediaQueryList | undefined;

function getResponsiveClasses<T extends string>(
  desktopValue: T,
  mobileValue: T | undefined,
  classMap: Record<T, ResponsiveClasses>,
): string[] {
  const resolvedMobileValue = mobileValue ?? desktopValue;
  const classes = [classMap[resolvedMobileValue].mobile];

  if (resolvedMobileValue !== desktopValue) {
    classes.push(classMap[desktopValue].desktop);
  }

  return classes;
}

function toToggleState(value: boolean): ToggleState {
  return value ? 'enabled' : 'disabled';
}

function updateViewport(event: MediaQueryListEvent | MediaQueryList): void {
  isDesktop.value = event.matches;
}

const classes = computed(() => [
  ...getResponsiveClasses(
    props.data.direction ?? 'row',
    props.data['mobile:direction'],
    directionClasses,
  ),
  ...getResponsiveClasses(
    props.data.align ?? 'stretch',
    props.data['mobile:align'],
    alignClasses,
  ),
  ...getResponsiveClasses(
    props.data.justify ?? 'start',
    props.data['mobile:justify'],
    justifyClasses,
  ),
  ...getResponsiveClasses(
    toToggleState(props.data.wrap ?? true),
    props.data['mobile:wrap'] === undefined
      ? undefined
      : toToggleState(props.data['mobile:wrap']),
    wrapClasses,
  ),
  ...getResponsiveClasses(
    toToggleState(props.data.margin ?? false),
    props.data['mobile:margin'] === undefined
      ? undefined
      : toToggleState(props.data['mobile:margin']),
    marginClasses,
  ),
]);

const imageDimensions = computed(() =>
  props.data.images.map((image) => ({
    width: isDesktop.value
      ? (image.width ?? 64)
      : (image['mobile:width'] ?? image.width ?? 64),
    height: isDesktop.value
      ? (image.height ?? 64)
      : (image['mobile:height'] ?? image.height ?? 64),
  })),
);

onMounted(() => {
  if (!window.matchMedia) return;

  desktopMedia = window.matchMedia('(min-width: 48rem)');
  updateViewport(desktopMedia);
  desktopMedia.addEventListener('change', updateViewport);
});

onBeforeUnmount(() => {
  desktopMedia?.removeEventListener('change', updateViewport);
});
</script>
