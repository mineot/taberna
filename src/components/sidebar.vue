<template>
  <Teleport to="body">
    <Transition name="sidebar">
      <aside v-if="props.visible" class="sidebar">
        <div class="sidebar-brand">
          <Brand @click="closeMenu" />
          <IconButton icon="CLOSE" @click="closeMenu" />
        </div>

        <div class="sidebar-items">
          <Navigator vertical :hidden="false" @click="closeMenu" />
        </div>

        <Language complete />
      </aside>
    </Transition>

    <Backdrop :visible="props.visible" @close="closeMenu" />
  </Teleport>
</template>

<script setup lang="ts">
import Backdrop from './backdrop.vue';
import Brand from './brand.vue';
import IconButton from './icon-button.vue';
import Language from './language.vue';
import Navigator from './navigator.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close']);

const closeMenu = () => {
  emit('close');
};
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.sidebar {
  @apply border-l shadow-xl;
  @apply flex flex-col gap-8 p-4;
  @apply fixed top-0 right-0 z-60 h-full w-72;

  background-color: var(--sidebar-background-color);
  background-image: var(--sidebar-texture);
  background-repeat: repeat;
  border-color: var(--sidebar-border-color);
  border-style: var(--sidebar-border-style);
  border-width: var(--sidebar-border-size);
}

.sidebar-brand {
  @apply flex flex-row items-center justify-between;
}

.sidebar-items {
  @apply flex-1 overflow-y-auto pr-2;
}
</style>
