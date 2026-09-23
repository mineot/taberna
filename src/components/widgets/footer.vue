<template>
  <footer class="utbc-footer utbc-container utbc-block">
    <section class="flex flex-col gap-2">
      <slot></slot>
      <div class="footer-ownership">
        <div class="flex flex-nowrap gap-1">
          <span>&copy;</span>
          <slot name="owner"></slot>
          <slot name="year"></slot>
        </div>
        <a class="underline" href="https://github.com/mineot/" target="_blank">
          <span>Powered by Mineot</span>
        </a>
      </div>
    </section>
  </footer>
</template>

<style scoped>
@reference "@/style.css";

.footer-ownership {
  @apply flex flex-col gap-2 pt-1 md:flex-row;
  @apply items-center justify-between;
  @apply text-xs;
  color: var(--footer-owner-text-color);
  border-top-color: var-(--footer-owner-border-color);
  border-top-style: var(--footer-owner-border-style);
  border-top-width: var(--footer-owner-border-size);
}
</style>
