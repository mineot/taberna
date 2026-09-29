<template>
  <nav class="tbi-navigator">
    <div
      :class="[
        'tbi-navigator-items',
        {
          horizontal: !props.vertical,
          vertical: props.vertical,
        },
      ]"
    >
      <tbc-flux v-if="props.contentFile" :file="props.contentFile"></tbc-flux>
      <slot v-else></slot>
    </div>
    <div v-if="!props.vertical" class="tbi-navigator-buttom" @click="menuBar">
      <Menu class="tbi-navigator-menu" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue';
import { useAppStore } from '@/stories/app.store';

const { openSidebar } = useAppStore();

const props = defineProps({
  contentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
  sidebarId: {
    type: String,
    required: false,
    default: undefined,
  },
});

const emit = defineEmits(['click']);

function menuBar() {
  emit('click');

  if (props.sidebarId) {
    openSidebar(props.sidebarId);
  }
}
</script>

<style scoped>
@reference "@/style.css";

.tbi-navigator {
  @apply flex flex-nowrap gap-3;
  @apply items-center;
}

.tbi-navigator-items {
  @apply flex flex-nowrap gap-3;
  @apply items-center;

  &.horizontal {
    @apply hidden flex-row md:flex;
  }

  &.vertical {
    @apply flex flex-col;
  }
}

.tbi-navigator-buttom {
  @apply flex md:hidden;
}

.tbi-navigator-menu {
  @apply tbu-asset-link cursor-pointer;
}
</style>
