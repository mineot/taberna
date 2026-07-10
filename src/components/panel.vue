<template>
  <section
    :class="[
      'panel',
      {
        regular: !props.reverse,
        inverse: props.reverse,
        light: !props.dark,
        dark: props.dark,
      },
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@reference '../style.css';

.panel {
  @apply flex items-start justify-around;
  @apply app-padding-x gap-10 py-8;
}

.regular {
  @apply flex-col lg:flex-row;
}

.inverse {
  @apply flex-col-reverse lg:flex-row-reverse;
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
  reverse: {
    type: Boolean,
    required: false,
    default: false,
  },
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
