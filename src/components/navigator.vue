<template>
  <div
    :class="{
      navigator: true,
      'navigator-vertical': props.vertical,
    }"
  >
    <a
      v-for="item in items"
      :key="item.label"
      :href="item.href"
      :class="{
        'navigator-item': true,
        'navigator-item-vertical': props.vertical,
        'navigator-hidden': props.hidden,
      }"
      @click="emit('click')"
    >
      <span>{{ item.label }}</span>
    </a>

    <IconButton v-if="props.menu" class="navigator-menu" @click="openMenu" />
  </div>

  <Sidebar :visible="visible" @close="closeMenu" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import IconButton from './icon-button.vue';
import Sidebar from './sidebar.vue';

const visible = ref(false);
const openMenu = () => (visible.value = true);
const closeMenu = () => (visible.value = false);

const props = defineProps({
  menu: {
    type: Boolean,
    required: false,
    default: false,
  },
  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
  hidden: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits(['click']);

interface MenuItem {
  label: string;
  href: string;
}

const items: MenuItem[] = [
  { label: 'Item 1', href: '#/item1' },
  { label: 'Item 2', href: '#/item2' },
  { label: 'Item 3', href: '#/item3' },
  { label: 'Item 4', href: '#/item4' },
  { label: 'Item 5', href: '#/item5' },
];
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.navigator {
  @apply flex flex-row items-center justify-center;
}

.navigator-vertical {
  @apply w-full flex-col;
}

.navigator-hidden {
  @apply hidden md:flex;
}

.navigator-item {
  @apply app-duration cursor-pointer;
  @apply rounded-md px-2 py-1;

  background-color: var(--navigator-background);
  color: var(--navigator-text);

  &:hover {
    @media (hover: hover) {
      background-color: var(--navigator-background-hover);
      background-image: var(--navigator-texture);
      background-repeat: repeat;
      color: var(--navigator-text-hover);
    }
  }

  &:active {
    background-color: var(--navigator-background-active);
    background-image: var(--navigator-texture);
    background-repeat: repeat;
    color: var(--navigator-text-active);
  }
}

.navigator-item-vertical {
  @apply app-duration w-full px-5 py-3 text-lg text-nowrap;
}

.navigator-menu {
  @apply flex md:hidden;
}
</style>
