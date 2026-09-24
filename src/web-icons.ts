import { defineCustomElement, h } from 'vue';
import { Home } from '@lucide/vue';

function createIcon(name: string, icon: any): any {
  return {
    [name as string]: defineCustomElement(
      { setup: () => () => h(icon) },
      { shadowRoot: false },
    ),
  };
}

const icons = {
  ...createIcon('icon-home', Home),
};

Object.keys(icons).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, icons[name]);
  }
});
