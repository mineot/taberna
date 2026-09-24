<template>
  <header class="tbi-header">
    <section class="tbi-header-container">
      <div>
        <slot name="brand"></slot>
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
  @apply sticky top-0 z-10;
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
</style>
