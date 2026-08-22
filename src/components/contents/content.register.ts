import { defineCustomElement } from 'vue';
import ContentContainer from './content-container.vue';
import ContentBlock from './content-block.vue';

const elements = {
  ['content-container' as string]: defineCustomElement(ContentContainer, {
    shadowRoot: false,
  }),
  ['content-block' as string]: defineCustomElement(ContentBlock, {
    shadowRoot: false,
  }),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
