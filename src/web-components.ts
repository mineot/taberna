import { defineCustomElement } from 'vue';

import Carousel from '@/components/carousel.vue';
import Flux from '@/components/flux.vue';
import Language from '@/components/language.vue';

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
