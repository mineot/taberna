<template>
  <section
    v-for="section in config?.sections"
    :key="section.id"
    :id="section.id"
    class="app-section rounded-2xl"
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
    <div class="min-w-0 flex-1">
      <h2 v-if="section.title" class="app-section-title">
        {{ section.title }}
      </h2>
      <p v-if="section.subtitle" class="app-section-subtitle">
        {{ section.subtitle }}
      </p>

      <!-- content: texto simples + imagem opcional -->
      <div v-if="section.content" class="app-section-content">
        <p
          v-for="(item, i) in section.content"
          :key="i"
          class="app-text-body flex-1 leading-relaxed"
        >
          {{ item }}
        </p>
      </div>

      <!-- contentFiles com 1 item: markdown + imagem opcional -->
      <div
        v-else-if="
          section.contentFiles?.length === 1 && markdownContent.get(section.id)
        "
        class="app-section-content"
      >
        <div
          class="prose prose-invert w-full"
          v-html="markdownContent.get(section.id)![0]"
        />
      </div>

      <!-- contentFiles com 2+ items + carousel -->
      <SectionCarousel
        v-else-if="
          section.contentFiles &&
          section.contentFiles.length > 1 &&
          section.carousel &&
          markdownContent.get(section.id)
        "
        :slides="markdownContent.get(section.id)!"
        :config="section.carousel"
      />

      <!-- contentFiles com 2+ items sem carousel -->
      <div
        v-else-if="
          section.contentFiles &&
          section.contentFiles.length > 1 &&
          markdownContent.get(section.id)
        "
        class="app-section-content"
      >
        <div
          v-for="(html, i) in markdownContent.get(section.id)"
          :key="i"
          class="prose prose-invert min-w-0 basis-full overflow-hidden md:basis-[calc(50%-0.75rem)]"
          v-html="html"
        />
      </div>
    </div>

    <!-- imagem: so aparece com content ou contentFiles com 1 item -->
    <img
      v-if="
        section.image && (section.content || section.contentFiles?.length === 1)
      "
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
import SectionCarousel from '../components/section-carousel.vue';

const { config, loaded } = useConfig();
const { locale } = useLocale();
const { fetchMarkdown } = useMarkdown();

const markdownContent = ref<Map<string, string[]>>(new Map());

async function loadMarkdownFiles() {
  if (!config.value) return;

  const newMap = new Map<string, string[]>();
  const entries = await Promise.all(
    config.value.sections
      .filter((section) => section.contentFiles)
      .map(async (section) => {
        const results = await Promise.all(
          section.contentFiles!.map((file) =>
            fetchMarkdown(`/content/${locale.value}/${file}`),
          ),
        );
        return [section.id, results] as const;
      }),
  );
  for (const [id, results] of entries) {
    newMap.set(id, results);
  }
  markdownContent.value = newMap;
}

watch(
  [loaded, config],
  async ([isLoaded]) => {
    if (isLoaded) await loadMarkdownFiles();
  },
  { immediate: true },
);
</script>
