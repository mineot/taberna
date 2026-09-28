<template>
  <header class="tbi-header">
    <section class="tbi-header-container">
      <div class="tbi-header-brand">
        <tbc-flux
          v-if="props.brandContentFile"
          :file="props.brandContentFile"
        ></tbc-flux>
        <slot v-else name="brand"></slot>

        <div class="tbi-header-menu">
          <tbc-flux
            v-if="props.menuContentFile"
            :file="props.menuContentFile"
          ></tbc-flux>
          <slot v-else name="menu"></slot>
        </div>
      </div>
      <div>
        <tbc-flux
          v-if="props.navContentFile"
          :file="props.navContentFile"
        ></tbc-flux>
        <slot v-else name="nav"></slot>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  brandContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  menuContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  navContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-header {
  @apply sticky top-0 z-10 backdrop-blur-xs;
  @apply tbu-container tbu-block tbu-border-bottom;
  background-color: var(--header-bg-color);
  background-image: var(--header-texture);
  background-repeat: repeat;
}

.tbi-header-container {
  @apply flex flex-row flex-nowrap;
  @apply items-center justify-between;
  @apply gap-4;
}

.tbi-header-brand {
  @apply flex flex-nowrap gap-8;
  @apply items-center justify-center;
}

.tbi-header-menu {
  @apply hidden md:flex;
}
</style>
