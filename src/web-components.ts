import { defineCustomElement } from 'vue';
import Brand from './components/brand.vue';
import Link from './components/link.vue';

const elements = {
  ['twc-brand' as string]: defineCustomElement(Brand, {
    shadowRoot: false,
  }),
  ['twc-link' as string]: defineCustomElement(Link, {
    shadowRoot: false,
  }),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
