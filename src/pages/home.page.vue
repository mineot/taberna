<template>
  <div class="home">
    <div
      v-for="block in homeData"
      :class="[
        'grid',
        'grid-cols-1',
        'gap-4',
        {
          'home-emphasis-color': block.emphasis ?? false,
          'home-emphasis-margin': block.emphasis ?? false,
          'home-emphasis-rounded': block.emphasis ?? false,
          'home-emphasis-texture': block.emphasis ?? false,
          'md:grid-cols-1': block.cols === 1,
          'md:grid-cols-2': block.cols === 2,
          'md:grid-cols-3': block.cols === 3,
          'md:grid-cols-4': block.cols === 4,
        },
      ]"
    >
      <div v-for="content in block.contents" class="block-contents">
        <!-- <ContentTitle :data="content" />
        <ContentItems :items="content.items" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHomeStore } from '../stories/home.store';
// import ContentTitle from '../components/contents/content-title.vue';
// import ContentItems from '../components/contents/content-items.vue';

const { homeData } = storeToRefs(useHomeStore());
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.home {
  @apply flex flex-col;
  gap: calc(var(--spacing) * var(--gap-lg));
}

.home-emphasis-color {
  background-color: var(--home-emphasis-color);
}

.home-emphasis-margin {
  padding: calc(var(--spacing) * var(--home-emphasis-margin));
}

.home-emphasis-rounded {
  border-radius: var(--home-emphasis-rounded);
}

.home-emphasis-texture {
  background-image: var(--home-emphasis-texture);
  background-repeat: repeat;
}

.block-contents {
  @apply flex flex-col gap-2;
}
</style>
