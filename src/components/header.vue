<template>
  <header class="utbc-header">
    <section class="utbc-header-container">
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

.utbc-header {
  @apply sticky top-0 z-10;
  @apply utbc-container utbc-block utbc-border-bottom;
  background-color: var(--header-bg-color);
  background-image: var(--header-texture);
  background-repeat: repeat;
}

.utbc-header-container {
  @apply flex flex-row flex-nowrap;
  @apply items-center justify-between;
  @apply gap-4;
}
</style>
