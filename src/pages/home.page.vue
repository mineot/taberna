<template>
  <tbc-flux :file="config?.homePage"></tbc-flux>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stories/app.store';
import { storeToRefs } from 'pinia';

const { config } = storeToRefs(useAppStore());
</script>
