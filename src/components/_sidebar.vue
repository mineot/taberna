<template>
  <div :class="['tbu-backdrop', { hide: !isVisible }]" @click="close"></div>
  <aside ref="panel" :class="['tbu-sidebar', { hide: !isVisible }]">
    <div class="header">
      <slot name="sidebar-header"></slot>
      <icon-x class="tbu-link" @click="close"></icon-x>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="sidebar-footer"></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, VueElement, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits<{
  'update:show': [value: boolean];
}>();

const isVisible = ref(props.show);
const panel = ref<HTMLElement | null>(null);

watch(
  () => props.show,
  (show) => {
    isVisible.value = show;
  },
);

function close() {
  isVisible.value = false;
  const host = panel.value?.parentElement;
  if (host instanceof VueElement) {
    Reflect.set(host, 'show', false);
  }
  emit('update:show', false);
}
</script>
