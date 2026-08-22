<template>
  <template v-if="props.visible">
    <Header />
    <Main />
    <Footer />
  </template>
</template>

<script setup lang="ts">
import Footer from './footer.vue';
import Header from './header.vue';
import Main from './main.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>
