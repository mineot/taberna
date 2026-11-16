<template>
  <tbc-layout-linear owner="Fabiano Pires">
    <div slot="header-brand">
      <tbc-flux content-file="complements/brand.htm"></tbc-flux>
    </div>

    <div slot="header-nav">
      <tbc-flux content-file="complements/header-nav.htm"></tbc-flux>
    </div>

    <slot></slot>

    <div slot="footer-brand">
      <tbc-flux content-file="complements/brand.htm"></tbc-flux>
    </div>

    <div slot="footer-nav">
      <tbc-flux content-file="complements/socials.htm"></tbc-flux>
    </div>

    <div slot="footer-body">
      <tbc-flux content-file="complements/footer.htm"></tbc-flux>
    </div>

    <div slot="footer-copyright">
      <tbc-flux content-file="complements/copyright.htm"></tbc-flux>
    </div>
  </tbc-layout-linear>

  <tbc-sidebar id="sidebar" ref="sidebar">
    <div slot="sidebar-header">
      <tbc-flux content-file="complements/brand.htm" @click="closeSidebar"></tbc-flux>
    </div>

    <div slot="sidebar-footer">
      <tbc-language lg @click="closeSidebar"></tbc-language>
    </div>

    <div slot="sidebar-body">
      <tbc-flux content-file="complements/sidebar-nav.htm" @click="closeSidebar"></tbc-flux>
    </div>
  </tbc-sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const sidebar = ref<{ show: boolean } | null>(null);

function closeSidebar() {
  if (sidebar.value) {
    sidebar.value.show = false;
  }
}
</script>
