<template>
  <div @click="emit('click')" v-html="$content"></div>
</template>

<script setup lang="ts">
import { loadContentFragment } from '@/utils/flux.util';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';

const { captureError } = useAppStore();
const { language } = storeToRefs(useAppStore());
const $content = ref<string>('');

const emit = defineEmits(['click']);

const props = defineProps({
  contentFile: {
    type: String,
    required: false,
    default: undefined,
  },
});

watch(
  [language, () => props.contentFile],
  ([locale, file]) => {
    $content.value = '';

    if (!locale || !file) return;

    captureError(
      async () => {
        $content.value = await loadContentFragment({
          base: import.meta.env.BASE_URL,
          locale,
          file,
        });
      },
      {
        title: 'Flux content error',
        message: `Failed to load file content: ${file}`,
      },
    );
  },
  { immediate: true },
);
</script>
