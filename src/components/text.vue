<template>
  <div>
    <h2 class="title">
      {{ props.title }}
    </h2>

    <h3 v-if="props.subtitle" class="subtitle">
      {{ props.subtitle }}
    </h3>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../style.css';

.title {
  @apply text-2xl sm:text-4xl;
}

.subtitle {
  @apply text-secondary-dark;
  @apply text-base sm:text-lg;
}

.content {
  @apply mt-6 gap-2;
  @apply flex flex-col;
  @apply text-sm;
}
</style>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: '',
  },
});
</script>
