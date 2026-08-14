<template>
  <a class="brand" href="#" @click="emit('click')">
    <img class="brand-image" src="https://placehold.co/64x64" alt="Taberna" />
    <div class="brand-title">
      <span>Taberna</span>
    </div>
  </a>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.brand {
  @apply app-duration cursor-pointer;
  @apply flex flex-row items-center justify-center;
  @apply gap-2 md:gap-3;
}

.brand-image {
  @apply app-duration;

  border-radius: var(--brand-image-radius);
  height: calc(var(--spacing) * var(--brand-image-size));
  width: calc(var(--spacing) * var(--brand-image-size));

  @media (width >= 48rem) {
    height: calc(var(--spacing) * var(--brand-image-size-md));
    width: calc(var(--spacing) * var(--brand-image-size-md));
  }
}

.brand-image:hover + .brand-title {
  @media (hover: hover) {
    color: var(--brand-title-color-hover);
  }
}

.brand-image:active + .brand-title {
  color: var(--brand-title-color-active);
}

.brand-title {
  color: var(--brand-title-color);
  font-family: var(--brand-title-font);
  font-size: var(--brand-title-size);

  --tw-leading: var(--brand-title-leading);
  line-height: var(--brand-title-leading);

  margin-bottom: calc(var(--spacing) * var(--brand-title-mb));
  margin-left: calc(var(--spacing) * var(--brand-title-ml));
  margin-right: calc(var(--spacing) * var(--brand-title-mr));
  margin-top: calc(var(--spacing) * var(--brand-title-mt));

  &:hover {
    @media (hover: hover) {
      color: var(--brand-title-color-hover);
    }
  }

  &:active {
    color: var(--brand-title-color-active);
  }

  @media (width >= 48rem) {
    font-size: var(--brand-title-size-md);
  }
}
</style>
