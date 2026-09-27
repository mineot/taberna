<template>
  <nav class="tbi-navigator">
    <div
      :class="[
        'tbi-navigator-items',
        {
          horizontal: !props.vertical,
          vertical: props.vertical,
        },
      ]"
    >
      <slot></slot>
    </div>
    <div v-if="!props.vertical" class="tbi-navigator-buttom" @click="menuBar">
      <Menu class="tbi-navigator-menu" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue';
import { onMounted, ref } from 'vue';

const sidebarEl = ref<any>(null);

const props = defineProps({
  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
  sidebarId: {
    type: String,
    required: false,
    default: undefined,
  },
});

const emit = defineEmits(['click']);

function menuBar() {
  emit('click');

  if (sidebarEl.value) {
    sidebarEl.value.visible = true;
  }
}

onMounted(() => {
  if (props.sidebarId) {
    sidebarEl.value = document.querySelector('#sidebar');
    sidebarEl.value?.addEventListener('close', () => {
      sidebarEl.value.visible = false;
    });
  }
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-navigator {
  @apply flex flex-nowrap gap-3;
  @apply items-center;
}

.tbi-navigator-items {
  @apply flex-nowrap gap-3;
  @apply items-center;

  &.horizontal {
    @apply hidden flex-row md:flex;
  }

  &.vertical {
    @apply flex flex-col;
  }
}

.tbi-navigator-buttom {
  @apply flex md:hidden;
}

.tbi-navigator-menu {
  @apply tbu-asset-link cursor-pointer;
}
</style>
