<template>
  <div v-if="props.text">{{ props.text }}</div>
  <div v-else-if="props.file" v-html="$content"></div>
</template>

<script setup lang="ts">
import { loadContentFragment } from '@/utils/content.util';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';

const { captureError } = useAppStore();
const { language } = storeToRefs(useAppStore());

const $content = ref<string>('');

const props = defineProps({
  text: {
    type: String,
    required: false,
    default: undefined,
  },
  file: {
    type: String,
    required: false,
    default: undefined,
  },
});

watch(
  [language, () => props.file],
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
