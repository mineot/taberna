<template>
  <section
    :class="[
      'panel',
      {
        light: !props.dark,
        dark: props.dark,
      },
    ]"
  >
    <div class="content">
      <slot name="left"></slot>
    </div>
    <div class="content">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../style.css';

.panel {
  @apply flex justify-between;
  @apply items-center md:items-start;
  @apply flex-col md:flex-row;
  @apply app-padding-x gap-10 py-8;
}

.content {
  @apply flex-1;
  @apply flex flex-col;
  @apply gap-1;
}

.dark {
  @apply bg-primary-dark;
}

.light {
  @apply bg-primary-light;
}
</style>

<script setup lang="ts">
const props = defineProps({
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
