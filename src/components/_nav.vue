<template>
  <nav
    :class="[
      'tbu-nav',
      {
        responsive: props.responsive,
        vertical: props.vertical && !props.responsive,
      },
    ]"
  >
    <template v-if="props.responsive">
      <div :class="['wide', { vertical: props.vertical }]">
        <slot name="nav-wide"></slot>
      </div>
      <div :class="['narrow', { vertical: props.vertical }]">
        <slot name="nav-narrow"></slot>
      </div>
    </template>
    <slot v-else></slot>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  vertical: {
    type: Boolean,
    required: false,
    default: false,
  },
  responsive: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
