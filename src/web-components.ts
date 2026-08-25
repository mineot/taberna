import { defineCustomElement } from 'vue';
import Brand from '@component/brand.vue';
import Carousel from '@component/carousel.vue';
import CarouselItem from '@component/carousel-item.vue';
import Link from './components/link.vue';

const elements = {
  ['twc-brand' as string]: defineCustomElement(Brand, {
    shadowRoot: false,
  }),
  ['twc-carousel' as string]: defineCustomElement(Carousel, {
    shadowRoot: false,
  }),
  ['twc-carousel-item' as string]: defineCustomElement(CarouselItem, {
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
