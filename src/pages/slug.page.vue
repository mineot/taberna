<template>
  <tbc-flux :content-file="slug"></tbc-flux>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const slug = computed(() => route.params.slug);
</script>
