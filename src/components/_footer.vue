<template>
  <footer class="tbu-footer tbi-footer">
    <div class="top">
      <slot name="footer-brand"></slot>
      <slot name="footer-nav"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="bottom">
      <div>
        <slot name="footer-copyright"></slot>
      </div>
      <a href="https://github.com/mineot" target="_blank">Powered by Mineot</a>
    </div>
  </footer>
</template>

<style scoped>
@reference "@/style.css";

.tbi-footer {
  @apply tbu-flex-cols;

  > .top {
    @apply gap-4 pb-3;
    @apply flex items-center justify-between;
    @apply flex-col md:flex-row;
    border-bottom: var(--footer-border);
  }

  > .bottom {
    @apply gap-4 pt-3;
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
