<template>
  <Teleport to="#app">
    <div class="tbi-scaffold">
      <tbc-flux
        v-if="props.headerContentFile"
        :file="props.headerContentFile"
      ></tbc-flux>
      <slot v-else name="header"></slot>

      <main class="tbi-scaffold-main">
        <tbc-flux v-if="props.contentFile" :file="props.contentFile"></tbc-flux>
        <slot v-else></slot>
      </main>

      <tbc-flux
        v-if="props.footerContentFile"
        :file="props.footerContentFile"
      ></tbc-flux>
      <slot v-else name="footer"></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  headerContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  footerContentFile: {
    type: String,
    required: false,
    default: undefined,
  },
  contentFile: {
    type: String,
    required: false,
    default: undefined,
  },
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-scaffold {
  @apply min-h-full shrink-0;
  @apply flex flex-col;
  @apply flex-1;
}

.tbi-scaffold-main {
  @apply flex-1 py-1;
}
</style>
