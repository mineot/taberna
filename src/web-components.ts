import { defineCustomElement } from 'vue';
import { Carousel, Flux, Footer, Header, Language, Nav } from '@/components';

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
  ...createElement('tbc-footer', Footer),
  ...createElement('tbc-header', Header),
  ...createElement('tbc-language', Language),
  ...createElement('tbc-nav', Nav),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
