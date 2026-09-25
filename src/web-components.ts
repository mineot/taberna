import { defineCustomElement } from 'vue';

import Backdrop from '@/components/backdrop.vue';
import Footer from '@/components/footer.vue';
import Grid from '@/components/grid.vue';
import Header from '@/components/header.vue';
import Image from '@/components/image.vue';
import Language from '@/components/language.vue';
import Link from '@/components/link.vue';
import Navigator from '@/components/navigator.vue';
import Panel from '@/components/panel.vue';
import Sidebar from '@/components/sidebar.vue';

function createElement(name: string, element: any): any {
  return {
    [name as string]: defineCustomElement(element, {
      shadowRoot: false,
    }),
  };
}

const elements = {
  ...createElement('tbc-backdrop', Backdrop),
  ...createElement('tbc-footer', Footer),
  ...createElement('tbc-grid', Grid),
  ...createElement('tbc-header', Header),
  ...createElement('tbc-image', Image),
  ...createElement('tbc-language', Language),
  ...createElement('tbc-link', Link),
  ...createElement('tbc-navigator', Navigator),
  ...createElement('tbc-panel', Panel),
  ...createElement('tbc-sidebar', Sidebar),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
