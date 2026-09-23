import { defineCustomElement, h } from 'vue';
import { Home, Menu } from '@lucide/vue';

const icons = {
  ['icon-home' as string]: defineCustomElement(
    { setup: () => () => h(Home) },
    { shadowRoot: false },
  ),
  ['icon-menu' as string]: defineCustomElement(
    { setup: () => () => h(Menu) },
    { shadowRoot: false },
  ),
};

Object.keys(icons).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, icons[name]);
  }
});
