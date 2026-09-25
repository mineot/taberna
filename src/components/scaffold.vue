<template>
  <div class="tbi-scaffold">
    <tbc-header />
    <main class="tbi-scaffold-main">
      <slot></slot>
    </main>
    <tbc-footer />
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
