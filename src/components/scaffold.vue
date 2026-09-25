<template>
  <div class="tbi-scaffold">
    <tbc-header>
      <div slot="brand">
        <slot name="header-brand"></slot>
      </div>
      <div slot="menu">
        <slot name="header-menu"></slot>
      </div>
      <div slot="nav">
        <slot name="header-nav"></slot>
      </div>
    </tbc-header>
    <main class="tbi-scaffold-main">
      <slot></slot>
    </main>
    <tbc-footer>
      <div slot="owner">
        <slot name="footer-owner"></slot>
      </div>
      <div slot="year">
        <slot name="footer-year"></slot>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>
    </tbc-footer>
  </div>
</template>

<style scoped>
@reference "@/style.css";

.tbi-scaffold {
  @apply min-h-full shrink-0;
  @apply flex flex-col;

  > tbc-header {
    @apply contents;
  }
}

.tbi-scaffold-main {
  @apply tbu-container flex-1 py-1;
}
</style>
