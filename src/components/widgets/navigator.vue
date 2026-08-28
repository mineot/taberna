<template>
  <div
    :class="{
      navigator: true,
      'navigator-vertical': props.vertical,
    }"
  >
    <a
      v-for="navItem in config?.navigator"
      :key="navItem.text"
      :href="navItem.href"
      :class="{
        'navigator-item': true,
        'navigator-item-vertical': props.vertical,
        'navigator-hidden': props.hidden,
      }"
      @click="emit('click')"
    >
      <span>{{ navItem.text }}</span>
    </a>

    <IconButton v-if="props.menu" class="navigator-menu" @click="openMenu" />
  </div>

  <Sidebar :visible="visible" @close="closeMenu" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useConfigStore } from '@store/config.store.ts';
import IconButton from '@widget/icon-button.vue';
import Sidebar from '@widget/sidebar.vue';

const storeConfig = useConfigStore();
const { config } = storeToRefs(storeConfig);

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
</script>

<style>
@import 'tailwindcss';
@import '@/style.css';

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
