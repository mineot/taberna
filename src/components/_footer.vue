<template>
  <footer class="tbu-footer tbi-footer">
    <div class="top">
      <slot name="footer-brand"></slot>
      <slot name="footer-complement"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="bottom">
      <div>&copy; {{ props.owner }} {{ props.year }} - {{ props.copyright }}</div>
      <a href="https://github.com/mineot" target="_blank">Powered by Mineot</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  owner: {
    type: String,
    required: false,
    default: 'Owner Name',
  },
  year: {
    type: String,
    required: false,
    default: '2000',
  },
  copyright: {
    type: String,
    required: false,
    default: 'All rights reserved',
  },
});
</script>

<style scoped>
@reference "@/style.css";

.tbi-footer {
  @apply tbu-flex-cols;

  > .top {
    @apply gap-2 pb-1.5;
    @apply flex items-center justify-between;
    @apply flex-col md:flex-row;
    border-bottom: var(--footer-border);
  }

  > .bottom {
    @apply gap-2 pt-1.5;
    @apply flex items-center justify-between;
    @apply flex-col sm:flex-row;
    @apply text-xs;
    border-top: var(--footer-border);
    color: var(--footer-emphasis);

    > a {
      @apply underline;
    }
  }
}
</style>
