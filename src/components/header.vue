<template>
  <header class="tbi-header">
    <section class="tbi-header-container">
      <div class="tbi-header-brand">
        <slot name="brand"></slot>
        <div class="tbi-header-menu">
          <slot name="menu"></slot>
        </div>
      </div>
      <div>
        <slot name="nav"></slot>
      </div>
    </section>
  </header>
</template>

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
