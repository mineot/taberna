<template>
  <footer class="tbi-footer">
    <section>
      <tbc-flux v-if="props.contentFile" :file="props.contentFile"></tbc-flux>
      <slot v-else></slot>
      <div class="tbi-footer-ownership">
        <div class="text-nowrap">
          <span>&copy;</span>
          <span>&nbsp;</span>
          <tbc-flux :text="props.owner"></tbc-flux>
          <span>&nbsp;</span>
          <tbc-flux :text="props.year"></tbc-flux>
          <span>&nbsp;-&nbsp;</span>
          <tbc-flux :text="props.copyright"></tbc-flux>
        </div>
        <a href="https://github.com/mineot/" target="_blank">
          <span>Powered by Mineot</span>
        </a>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  owner: {
    type: String,
    required: false,
    default: 'Mineot',
  },
  year: {
    type: String,
    required: false,
    default: new Date().getFullYear(),
  },
  copyright: {
    type: String,
    required: false,
    default: 'All rights reserved',
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

.tbi-footer {
  @apply tbu-container tbu-block tbu-border-top;
  background-color: var(--footer-bg-color);
  background-image: var(--footer-texture);
  background-repeat: repeat;

  > section {
    @apply flex flex-col gap-4;
  }
}

.tbi-footer-ownership {
  @apply flex flex-col gap-2 pt-2 md:flex-row;
  @apply items-center justify-between;
  @apply text-xs text-nowrap;
  color: var(--footer-ownership-text-color);
  border-top-color: var-(--footer-ownership-border-color);
  border-top-style: var(--footer-ownership-border-style);
  border-top-width: var(--footer-ownership-border-size);

  > div {
    @apply flex flex-nowrap gap-1;
    @apply items-center justify-start;
  }

  > a {
    @apply text-nowrap underline;
  }
}
</style>
