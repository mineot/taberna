<template>
  <Menu
    v-if="icon === 'MENU'"
    :class="['icon-button', props.class]"
    @click="emit('click')"
  />

  <X
    v-if="icon === 'CLOSE'"
    :class="['icon-button', props.class]"
    @click="emit('click')"
  />
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
  class: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['click']);
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.icon-button {
  @apply app-duration cursor-pointer;

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
