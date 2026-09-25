<template>
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

  <section class="tbi-scaffold">
    <main class="tbu-container flex-1 py-1">
      <slot></slot>
    </main>

    <tbc-footer>
      <div slot="owner">
        <slot name="footer-owner"></slot>
      </div>
      <div slot="year">
        <slot name="footer-year"></slot>
      </div>
      <slot name="footer"></slot>
    </tbc-footer>
  </section>
</template>

<style scoped>
@reference "@/style.css";

.tbi-scaffold {
  @apply absolute top-0 right-0 bottom-0 left-0;
  @apply flex flex-col gap-0;
}
</style>
