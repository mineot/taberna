<template>
  <header :class="classes">Header</header>
</template>

<script setup lang="ts">
const classes = [
  ...['fixed', 'top-0', 'left-0', 'right-0'],
  ...['bg-background-dark', 'app-padding'],
];
</script>
