<template>
  <Content v-if="config?.home" :data="config?.home" />
  <div class="flex justify-center uppercase" v-else>No Home Page</div>
</template>

<script setup lang="ts">
import { useConfigStore } from '../stories/config.store.ts';
import Content from '../components/content.vue';

const { config } = useConfigStore();
</script>

<style>
@import 'tailwindcss';
@import '../style.css';
</style>
