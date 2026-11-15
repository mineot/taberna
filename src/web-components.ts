import { defineCustomElement } from 'vue';
import { Carousel, Flux, Language } from '@/components';

function createElement(name: string, element: any): any {
  return {
    [name as string]: defineCustomElement(element, {
      shadowRoot: false,
    }),
  };
}

const elements = {
  ...createElement('tbc-carousel', Carousel),
  ...createElement('tbc-flux', Flux),
  ...createElement('tbc-language', Language),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
