<template>
  <button
    :class="['icon-button', props.class]"
    type="button"
    :aria-label="props.label"
    @click="emit('click')"
  >
    <Menu v-if="icon === 'MENU'" aria-hidden="true" />
    <X v-else aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { Menu, X } from '@lucide/vue';
import type { PropType } from 'vue';

const props = defineProps({
  icon: {
    type: String as PropType<'MENU' | 'CLOSE'>,
    required: false,
    default: 'MENU',
  },
  label: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['click']);
</script>

<style>
@reference '@/style.css';

.icon-button {
  @apply app-duration focus-visible:app-focus-ring inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0;

  color: var(--icon-button-color);

  &:hover {
    @media (hover: hover) {
      color: var(--icon-button-hover);
    }
  }

  &:active {
    color: var(--icon-button-active);
  }
}
</style>
