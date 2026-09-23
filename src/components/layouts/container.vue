<template>
  <section
    :class="[
      'utbc-container',
      {
        'utbc-muted-background': props.muted,
        'utbc-texture': props.muted,
      },
    ]"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  muted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
