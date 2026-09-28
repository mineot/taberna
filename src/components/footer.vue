<template>
  <!-- <footer class="tbi-footer">
    <section>
      <div v-if="props.content" v-html="$content"></div>
      <slot v-else></slot>
      <div class="tbi-footer-ownership">
        <div class="text-nowrap">
          &copy; {{ props.owner }} {{ props.year }} - {{ props.copyright }}
        </div>
        <a href="https://github.com/mineot/" target="_blank">
          <span>Powered by Mineot</span>
        </a>
      </div>
    </section>
  </footer> -->
</template>
<!-- 
<script setup lang="ts">
import { fetchContentFile } from '@/helpers/configuration';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';
import { useBehaviorStore } from '@/stories/behavior.store';
import { useErrorStore } from '@/stories/error.store';

const { language } = storeToRefs(useAppStore());
const { setError } = useErrorStore();
const { startLoading, stopLoading } = useBehaviorStore();

const $content = ref<string>('');

const props = defineProps({
  owner: {
    type: String,
    required: false,
    default: 'Mineot',
  },
  year: {
    type: String,
    required: false,
    default: new Date().getFullYear(),
  },
  copyright: {
    type: String,
    required: false,
    default: 'All rights reserved',
  },
  content: {
    type: String,
    required: false,
    default: undefined,
  },
});

watch(language, async (value) => {
  if (value && props.content) {
    const token = startLoading();

    try {
      $content.value = await fetchContentFile(language.value, props.content);
    } catch (error) {
      console.log(error);

      setError({
        title: 'Loading footer error',
        message: 'Could not load footer content file.',
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

.tbi-footer {
  @apply tbu-container tbu-block tbu-border-top;
  background-color: var(--footer-bg-color);
  background-image: var(--footer-texture);
  background-repeat: repeat;

  > section {
    @apply flex flex-col gap-4;
  }
}

.tbi-footer-ownership {
  @apply flex flex-col gap-2 pt-1 md:flex-row;
  @apply items-center justify-between;
  @apply text-xs text-nowrap;
  color: var(--footer-ownership-text-color);
  border-top-color: var-(--footer-ownership-border-color);
  border-top-style: var(--footer-ownership-border-style);
  border-top-width: var(--footer-ownership-border-size);

  > div {
    @apply flex flex-nowrap gap-1;
    @apply items-center justify-start;
  }

  > a {
    @apply text-nowrap underline;
  }
}
</style> -->
