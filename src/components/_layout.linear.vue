<template>
  <section class="tbu-layout-linear">
    <Header>
      <template #header-brand>
        <slot name="header-brand"></slot>
      </template>

      <template #default>
        <slot name="header-nav"></slot>
      </template>
    </Header>

    <main>
      <slot></slot>
    </main>

    <Footer :owner="props.owner" :year="props.year" :copyright="props.copyright">
      <template #footer-brand>
        <slot name="footer-brand"></slot>
      </template>

      <template #footer-nav>
        <slot name="footer-nav"></slot>
      </template>

      <template #footer-copyright>
        <slot name="footer-copyright"></slot>
      </template>

      <template #default>
        <slot name="footer-body"></slot>
      </template>
    </Footer>
  </section>
</template>

<script setup lang="ts">
import Header from './_header.vue';
import Footer from './_footer.vue';

const props = defineProps({
  owner: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  copyright: {
    type: String,
    required: false,
  },
});
</script>
