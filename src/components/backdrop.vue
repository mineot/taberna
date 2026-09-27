<template>
  <Teleport to="body">
    <div v-if="props.visible" class="tbi-backdrop" @click="emit('click')"></div>
  </Teleport>
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
  @apply fixed inset-0 backdrop-blur-xs;
  @apply tbu-texture;
  z-index: var(--z-backdrop);
  background-color: var(--backdrop-color);
}
</style>
