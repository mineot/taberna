<template>
  <template v-if="props.visible">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </template>
</template>

<script setup lang="ts">
import Footer from '@widget/footer.vue';
import Header from '@widget/header.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style>
@import 'tailwindcss';
@import '@/style.css';

.main {
  @apply app-container;
  @apply flex-1 py-2 md:py-4;
}
</style>
