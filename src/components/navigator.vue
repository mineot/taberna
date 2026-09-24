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
    <div v-if="!props.vertical" class="tbi-navigator-buttom">
      <Menu class="tbi-navigator-menu" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue';

const props = defineProps({
  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
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
