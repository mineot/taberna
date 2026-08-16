<template>
  <h1>Slug: {{ slug }}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ''));
</script>
