<template>
  <div :class="['language', props.class]">
    <div :class="{ 'language-complete': props.complete }">🇧🇷</div>
    <div v-if="props.complete">
      <span>Português Brasil</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    required: false,
    default: '',
  },
  complete: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.language {
  @apply app-duration cursor-pointer;
  @apply flex flex-row items-center gap-2;
  @apply grayscale-75 hover:grayscale-0;
  @apply text-lg;

  color: var(--language-text-color);

  &:hover {
    @media (hover: hover) {
      color: var(--language-text-color-hover);
    }
  }

  &:active {
    color: var(--language-text-color-active);
  }
}

.language-complete {
  @apply text-4xl;
}
</style>
