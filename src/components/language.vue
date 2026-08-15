<template>
  <a
    v-if="availableCount > 1"
    href="#/language-switcher"
    :class="['language', props.class]"
    @click="emit('click')"
  >
    <div :class="{ 'language-complete': props.complete }">
      <div :title="fullName">{{ flag }}</div>
    </div>
    <div v-if="props.complete">
      <span>{{ fullName }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '../stories/language.store';

const langStore = useLanguageStore();
const { availableCount, flag, fullName } = storeToRefs(langStore);

const emit = defineEmits(['click']);

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
