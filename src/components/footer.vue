<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <Brand />
        <p class="footer-brand-title">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est deleniti
          nam quas veniam, ipsam atque architecto unde repellendus autem.
          Corrupti!
        </p>
      </div>

      <div>
        <div>Titulo 1</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div>
        <div>Titulo 2</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div>
        <div>Titulo 3</div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    </div>
    <div class="footer-copyright">
      <div>Copyright</div>
      <div>Powered</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Brand from './brand.vue';
</script>

<style>
@import 'tailwindcss';
@import '../style.css';

.footer {
  @apply app-container app-block;
  @apply flex flex-col gap-4;
  background-color: var(--footer-background-color);
  background-image: var(--footer-texture);
  border-top-color: var(--footer-border-color);
  border-top-style: var(--footer-border-style);
  border-top-width: var(--footer-border-size);
}

.footer-content {
  @apply flex flex-col justify-between md:flex-row;
  gap: calc(var(--spacing) * var(--footer-gap));
}

.footer-brand {
  @apply flex flex-col items-start;

  gap: calc(var(--spacing) * var(--footer-gap));

  @media (width >= 48rem) {
    max-width: calc(var(--spacing) * var(--footer-brand-max-size));
  }
}

.footer-brand-title {
  font-size: var(--footer-brand-text-size);
  color: var(--footer-brand-text-color);
}

.footer-copyright {
  @apply flex flex-col items-center justify-between pt-1 text-xs md:flex-row;
  @apply border-t border-solid;
  border-color: var(--footer-copyright-color);
  color: var(--footer-copyright-color);
}
</style>
