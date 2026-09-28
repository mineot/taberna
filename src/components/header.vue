<template>
  <!-- <header class="tbi-header">
    <section class="tbi-header-container">
      <div class="tbi-header-brand">
        <div v-if="props.brandContent" v-html="$brandContent"></div>
        <div class="tbi-header-menu">
          <div v-if="props.menuContent" v-html="$menuContent"></div>
        </div>
      </div>
      <div>
        <div v-if="props.navContent" v-html="$navContent"></div>
      </div>
    </section>
  </header> -->
</template>
<!-- 
<script setup lang="ts">
import { fetchContentFile } from '@/helpers/configuration';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stories/app.store';
import { useBehaviorStore } from '@/stories/behavior.store';
import { useErrorStore } from '@/stories/error.store';
import { ref, watch } from 'vue';

const { language } = storeToRefs(useAppStore());
const { startLoading, stopLoading } = useBehaviorStore();
const { setError } = useErrorStore();

const $brandContent = ref<string>('');
const $menuContent = ref<string>('');
const $navContent = ref<string>('');

const props = defineProps({
  brandContent: {
    type: String,
    required: false,
    default: undefined,
  },
  menuContent: {
    type: String,
    required: false,
    default: undefined,
  },
  navContent: {
    type: String,
    required: false,
    default: undefined,
  },
});

watch(language, async (value) => {
  if (value) {
    const token = startLoading();

    try {
      if (props.brandContent) {
        $brandContent.value = await fetchContentFile(
          language.value,
          props.brandContent,
        );
      }

      if (props.menuContent) {
        $menuContent.value = await fetchContentFile(
          language.value,
          props.menuContent,
        );
      }

      if (props.navContent) {
        $navContent.value = await fetchContentFile(
          language.value,
          props.navContent,
        );
      }
    } catch (error) {
      console.log(error);

      setError({
        title: 'Loading header error',
        message: 'Could not load header content file.',
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

.tbi-header {
  @apply sticky top-0 z-10 backdrop-blur-xs;
  @apply tbu-container tbu-block tbu-border-bottom;
  background-color: var(--header-bg-color);
  background-image: var(--header-texture);
  background-repeat: repeat;
}

.tbi-header-container {
  @apply flex flex-row flex-nowrap;
  @apply items-center justify-between;
  @apply gap-4;
}

.tbi-header-brand {
  @apply flex flex-nowrap gap-8;
  @apply items-center justify-center;
}

.tbi-header-menu {
  @apply hidden md:flex;
}
</style> -->
