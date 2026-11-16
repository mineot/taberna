<template>
  <button
    v-if="props.trigger"
    class="tbu-link"
    @click="trigger(props.trigger, props.triggerAction)"
  >
    <span>{{ props.text }}</span>
  </button>

  <a v-else class="tbu-link" :href="props.href" :target="props.target">
    <span>{{ props.text }}</span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'Link',
  },
  href: {
    type: String,
    required: false,
    default: '/#',
  },
  target: {
    type: String,
    required: false,
    default: '_self',
  },
  trigger: {
    type: String,
    required: false,
    default: null,
  },
  triggerAction: {
    type: String,
    required: false,
    default: null,
  },
});

function trigger(target: string, action: string) {
  const el: any = document.querySelector(target);

  if (el) {
    el.classList.add(action);
  }
}
</script>
