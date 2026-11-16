<template>
  <button
    v-if="props.trigger"
    type="button"
    class="tbu-link"
    @click="trigger(props.trigger, props.triggerProp, props.triggerValue)"
  >
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else></slot>
  </button>

  <a v-else class="tbu-link" :href="props.href" :target="props.target">
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else></slot>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: false,
    default: '/#',
  },
  text: {
    type: String,
    required: false,
    default: null,
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
  triggerProp: {
    type: String,
    required: false,
    default: null,
  },
  triggerValue: {
    type: [String, Boolean, Number, Object, Array],
    required: false,
    default: null,
  },
});

function trigger(target: string, prop: string | null, value: unknown) {
  if (!prop) {
    return;
  }

  let el: Element | null;

  try {
    el = document.querySelector(target);
  } catch {
    return;
  }

  if (!el || !(prop in el)) {
    return;
  }

  const resolvedValue = value === 'true' ? true : value === 'false' ? false : value;
  Reflect.set(el, prop, resolvedValue);
}
</script>
