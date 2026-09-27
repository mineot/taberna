<template>
  <tbc-backdrop></tbc-backdrop>
  <Teleport to="body">
    <aside :class="['tbi-sidebar', { 'tbi-sidebar-hide': !props.visible }]">
      <div class="tbi-sidebar-header">
        <div>
          <slot name="header"></slot>
        </div>
        <button class="tbu-asset-link" @click="emit('close')">
          <X />
        </button>
      </div>
      <nav class="tbi-sidebar-body">
        <slot></slot>
      </nav>
      <div class="tbi-sidebar-footer">
        <slot name="footer"></slot>
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close']);
</script>

<style scoped>
@reference "@/style.css";

.tbi-sidebar {
  @apply tbu-duration transition-transform;
  @apply top-0 left-0 h-screen w-max;
  @apply fixed flex transform flex-col;
  @apply tbu-secondary-bg tbu-texture;
  @apply tbu-border-right;
  z-index: var(--z-sidebar);
}

.tbi-sidebar-hide {
  @apply -translate-x-full;
}

.tbi-sidebar-header {
  @apply flex gap-8 p-4 font-bold whitespace-nowrap;
  @apply tbu-border-bottom;
  @apply items-center justify-between;
}

.tbi-sidebar-footer {
  @apply p-4 whitespace-nowrap;
  @apply tbu-border-top;
}

.tbi-sidebar-body {
  @apply flex-1 space-y-1 p-2;
}
</style>
