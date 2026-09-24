<template>
  <footer class="tbi-footer">
    <section>
      <slot></slot>
      <div class="tbi-footer-ownership">
        <div>
          <span>&copy;</span>
          <slot name="owner"></slot>
          <slot name="year"></slot>
          <span> - </span>
          <span>All rights reserved</span>
        </div>
        <a href="https://github.com/mineot/" target="_blank">
          <span>Powered by Mineot</span>
        </a>
      </div>
    </section>
  </footer>
</template>

<style scoped>
@reference "@/style.css";

.tbi-footer {
  @apply tbu-container tbu-block tbu-border-top;
  background-color: var(--footer-bg-color);
  background-image: var(--footer-texture);
  background-repeat: repeat;

  > section {
    @apply flex flex-col gap-2;
  }
}

.tbi-footer-ownership {
  @apply flex flex-col gap-2 pt-1 md:flex-row;
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
