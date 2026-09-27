<template>
  <tbc-backdrop></tbc-backdrop>
  <Teleport to="body">
    <aside :class="['tbi-sidebar', { 'tbi-sidebar-hide': !sidebar[props.id] }]">
      <div class="tbi-sidebar-header">
        <div>
          <div v-if="props.headerContent" v-html="$headerContent"></div>
        </div>
        <button class="tbu-asset-link" @click="close">
          <X />
        </button>
      </div>
      <nav class="tbi-sidebar-body">
        <slot></slot>
      </nav>
      <div class="tbi-sidebar-footer">
        <div v-if="props.footerContent" v-html="$footerContent"></div>
      </div>
    </aside>
  </Teleport>
</template>

<script setup lang="ts">
import { fetchContentFile } from '@/helpers/configuration';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';
import { useBehaviorStore } from '@/stories/behavior.store';
import { useErrorStore } from '@/stories/error.store';
import { X } from '@lucide/vue';

const { language } = storeToRefs(useAppStore());
const { backdrop, sidebar } = storeToRefs(useBehaviorStore());
const { setError } = useErrorStore();
const { hideBackdrop, hideSidebar, showBackdrop, startLoading, stopLoading } =
  useBehaviorStore();

const $headerContent = ref<string>('');
const $footerContent = ref<string>('');

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: 'sidebar',
  },
  headerContent: {
    type: String,
    required: false,
    default: undefined,
  },
  footerContent: {
    type: String,
    required: false,
    default: undefined,
  },
});

function close() {
  hideSidebar(props.id);
  hideBackdrop();
}

watch(sidebar, async (value) => {
  if (value[props.id]) {
    showBackdrop();
  }
});

watch(backdrop, async (value) => {
  if (!value) {
    hideSidebar(props.id);
  }
});

watch(language, async (value) => {
  if (value) {
    const token = startLoading();

    try {
      if (props.headerContent) {
        $headerContent.value = await fetchContentFile(
          language.value,
          props.headerContent,
        );
      }

      if (props.footerContent) {
        $footerContent.value = await fetchContentFile(
          language.value,
          props.footerContent,
        );
      }
    } catch (error) {
      console.log(error);

      setError({
        title: 'Loading sidebar error',
        message: 'Could not load sidebar content file.',
        status: 500,
        throwcase: error,
      });
    } finally {
      stopLoading(token);
    }
  }
});
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
