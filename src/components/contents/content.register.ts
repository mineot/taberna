import { defineCustomElement } from 'vue';
import ContentContainer from './content-container.vue';

const elements = {
  ['content-container' as string]: defineCustomElement(ContentContainer, {
    shadowRoot: false,
  }),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
