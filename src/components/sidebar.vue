<template>
  <Teleport to="body">
    <aside
      :class="[
        'tbi-sidebar',
        {
          'tbi-sidebar-hide': !openedSidebar(props.id),
        },
      ]"
    >
      <div class="tbi-sidebar-header">
        <tbc-flux
          v-if="props.headerContentFile"
          :file="props.headerContentFile"
        ></tbc-flux>
        <slot v-else name="header"></slot>
        <button class="tbu-asset-link" @click="closeSidebar(props.id)">
          <X />
        </button>
      </div>
      <nav class="tbi-sidebar-body">
        <tbc-flux v-if="props.contentFile" :file="props.contentFile"></tbc-flux>
        <slot v-else></slot>
      </nav>
      <div class="tbi-sidebar-footer">
        <tbc-flux
          v-if="props.footerContentFile"
          :file="props.footerContentFile"
        ></tbc-flux>
        <slot v-else name="footer"></slot>
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';
import { watch } from 'vue';
import { X } from '@lucide/vue';

const { openedSidebar, closeSidebar } = useAppStore();
const { backdrop } = storeToRefs(useAppStore());

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'sidebar',
  },
  headerContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  footerContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  contentFile: {
    type: String,
    required: false,
    default: undefined,
  },
});

watch(backdrop, (value) => {
  if (!value) {
    closeSidebar(props.id);
  }
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-sidebar {
  @apply tbu-duration transition-transform;
  @apply top-0 left-0 z-150 h-screen w-max;
  @apply fixed flex transform flex-col;
  @apply tbu-secondary-bg tbu-texture;
  @apply tbu-border-right;
}

.tbi-sidebar-hide {
  @apply -translate-x-full;
}

.tbi-sidebar-header {
  @apply flex gap-8 p-4 whitespace-nowrap;
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
