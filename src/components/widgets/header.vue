<template>
  <header class="utbc-header utbc-container utbc-block">
    <section class="header-content">
      <div>
        <slot name="brand"></slot>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
    </section>
  </header>
</template>

<style scoped>
@reference "@/style.css";

.header-content {
  @apply flex flex-row flex-nowrap;
  @apply items-center justify-between;
  @apply gap-4;
}
</style>
