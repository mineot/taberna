import { defineCustomElement, h } from 'vue';
import { Home } from '@lucide/vue';

const icons = {
  ['icon-home' as string]: defineCustomElement(
    { setup: () => () => h(Home) },
    { shadowRoot: false },
  ),
};

Object.keys(icons).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, icons[name]);
  }
});
