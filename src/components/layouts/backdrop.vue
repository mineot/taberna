<template>
  <Transition name="backdrop">
    <div
      v-if="props.visible"
      class="backdrop"
      aria-hidden="true"
      @click="closeMenu"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['close']);

const closeMenu = () => {
  emit('close');
};
</script>

<style>
@reference '@/style.css';

.backdrop-enter-active,
.backdrop-leave-active {
  @apply app-duration;
  transition-property: opacity;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.backdrop {
  @apply fixed inset-0 z-50 backdrop-blur-sm;

  background-image: var(--backdrop-texture);
  background-repeat: repeat;
  background-color: color-mix(
    in oklab,
    var(--backdrop-color) var(--backdrop-opacity),
    transparent
  );
}
</style>
