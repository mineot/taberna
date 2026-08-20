<template>
  <div class="home">
    <div
      v-for="block in homeData?.blocks"
      :class="[
        'grid',
        'grid-cols-1',
        'gap-2',
        {
          'block-emphasis-color': block.emphasis ?? false,
          'block-emphasis-margin': block.emphasis ?? false,
          'block-emphasis-rounded': block.emphasis ?? false,
          'block-emphasis-texture': block.emphasis ?? false,
          'md:grid-cols-1': block.cols === 1,
          'md:grid-cols-2': block.cols === 2,
          'md:grid-cols-3': block.cols === 3,
          'md:grid-cols-4': block.cols === 4,
        },
      ]"
    >
      <div v-for="content in block.contents" class="block-contents">
        <div v-if="content.title" class="block-title">
          {{ content.title }}
        </div>
        <div v-if="content.subtitle" class="block-subtitle">
          {{ content.subtitle }}
        </div>
        <div v-for="item in content.items">
          <template v-if="item.type === 'paragraph'">
            <div class="flex flex-col">
              <div v-if="item.title" class="paragraph-title">
                {{ item.title }}
              </div>
              <div v-if="item.subtitle" class="paragraph-subtitle">
                {{ item.subtitle }}
              </div>
              <div class="mb-2">{{ item.content }}</div>
            </div>
          </template>

          <template v-if="item.type === 'image'">
            <div v-if="item.title" class="paragraph-title">
              {{ item.title }}
            </div>
            <div v-if="item.subtitle" class="paragraph-subtitle">
              {{ item.subtitle }}
            </div>
            <div
              :class="[
                'flex',
                'gap-2',
                {
                  'flex-col': item.direction === 'col',
                  'flex-row': item.direction === 'row',
                  'flex-wrap': item.wrap ?? true,
                  'items-center': item.aligns === 'center',
                  'items-end': item.aligns === 'end',
                  'items-start': item.aligns === 'start',
                  'justify-center': item.justify === 'center',
                  'justify-end': item.justify === 'end',
                  'justify-start': item.justify === 'start',
                  'm-2': item.margin ?? 0,
                },
              ]"
            >
              <img
                v-for="image in item.images"
                :height="image.height ?? 64"
                :width="image.width ?? 64"
                :src="image.src"
                :alt="image.alt"
                :class="{ 'rounded-md': image.rounded ?? false }"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stories/home.store';

const { homeData } = storeToRefs(useHomeStore());
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.home {
  @apply flex flex-col;
  gap: calc(var(--spacing) * var(--gap));
}

.block-emphasis-color {
  background-color: var(--content-emphasis-color);
}

.block-emphasis-margin {
  padding: calc(var(--spacing) * var(--content-emphasis-margin));
}

.block-emphasis-rounded {
  border-radius: var(--content-emphasis-rounded);
}

.block-emphasis-texture {
  background-image: var(--content-emphasis-texture);
  background-repeat: repeat;
}

.block-contents {
  @apply flex flex-col;
}

.block-title {
  @apply text-3xl font-semibold;
  color: var(--content-block-title-color);
}

.block-subtitle {
  @apply mb-3 text-lg font-semibold italic;
  color: var(--content-block-subtitle-color);
}

.paragraph-title {
  @apply font-semibold;
  color: var(--content-paragraph-title-color);
}

.paragraph-subtitle {
  @apply mb-2 text-sm;
  color: var(--content-paragraph-subtitle-color);
}
</style>
