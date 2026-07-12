<template>
  <section
    v-for="section in config?.sections"
    :key="section.id"
    :id="section.id"
    class="app-section"
    :class="[
      section.destak ? 'app-section-destak' : '',
      section.invert ? 'md:flex-row-reverse' : '',
      {
        'md:items-start':
          (section.contentPosition ?? section.imagePosition) === 'top',
        'md:items-center':
          !(section.contentPosition ?? section.imagePosition) ||
          (section.contentPosition ?? section.imagePosition) === 'center',
        'md:items-end':
          (section.contentPosition ?? section.imagePosition) === 'bottom',
      },
    ]"
  >
    <div class="flex-1">
      <h2 v-if="section.title" class="app-section-title">
        {{ section.title }}
      </h2>
      <p v-if="section.subtitle" class="app-section-subtitle">
        {{ section.subtitle }}
      </p>

      <div
        v-if="section.contentFile && markdownContent.get(section.id)"
        class="app-section-content"
      >
        <div
          v-for="(html, i) in markdownContent.get(section.id)"
          :key="i"
          class="prose prose-invert max-w-none flex-1"
          v-html="html"
        />
      </div>

      <div v-else-if="section.content" class="app-section-content">
        <p
          v-for="(item, i) in section.content"
          :key="i"
          class="app-text-body flex-1 leading-relaxed"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <img
      v-if="section.image"
      :src="section.image"
      :alt="section.title ?? ''"
      class="app-section-image"
      :class="{
        'object-top': section.imagePosition === 'top',
        'object-center':
          !section.imagePosition || section.imagePosition === 'center',
        'object-bottom': section.imagePosition === 'bottom',
      }"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useConfig } from '../composables/useConfig';
import { useLocale } from '../composables/useLocale';
import { useMarkdown } from '../composables/useMarkdown';

const { config, loaded } = useConfig();
const { locale } = useLocale();
const { fetchMarkdown } = useMarkdown();

const markdownContent = ref<Map<string, string[]>>(new Map());

async function loadMarkdownFiles() {
  if (!config.value) return;

  const newMap = new Map<string, string[]>();
  for (const section of config.value.sections) {
    if (section.contentFile) {
      const results = await Promise.all(
        section.contentFile.map((file) =>
          fetchMarkdown(`/content/${locale.value}/${file}`),
        ),
      );
      newMap.set(section.id, results);
    }
  }
  markdownContent.value = newMap;
}

watch([loaded, config], async ([isLoaded]) => {
  if (isLoaded) await loadMarkdownFiles();
}, { immediate: true });
</script>
