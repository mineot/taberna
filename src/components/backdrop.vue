<template>
  <div v-if="props.visible" class="tbi-backdrop" @click="emit('click')"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['click']);
</script>

<style scoped>
@reference "@/style.css";

.tbi-backdrop {
  @apply absolute z-20 backdrop-blur-xs;
  @apply top-0 right-0 bottom-0 left-0;
  @apply tbu-texture;
  background-color: var(--backdrop-color);
}
</style>
