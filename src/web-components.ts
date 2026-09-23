import { defineCustomElement } from 'vue';
import Container from '@/components/layouts/container.vue';
import Block from '@/components/layouts/block.vue';
import Columns from '@/components/layouts/columns.vue';
import Rows from '@/components/layouts/rows.vue';
import Grid from '@/components/layouts/grid.vue';
import Panel from '@/components/layouts/panel.vue';
import Link from '@/components/interactors/link.vue';
import Navigator from '@/components/interactors/navigator.vue';

const elements = {
  ['tbc-container' as string]: defineCustomElement(Container, {
    shadowRoot: false,
  }),
  ['tbc-block' as string]: defineCustomElement(Block, {
    shadowRoot: false,
  }),
  ['tbc-columns' as string]: defineCustomElement(Columns, {
    shadowRoot: false,
  }),
  ['tbc-rows' as string]: defineCustomElement(Rows, {
    shadowRoot: false,
  }),
  ['tbc-grid' as string]: defineCustomElement(Grid, {
    shadowRoot: false,
  }),
  ['tbc-panel' as string]: defineCustomElement(Panel, {
    shadowRoot: false,
  }),
  ['tbc-link' as string]: defineCustomElement(Link, {
    shadowRoot: false,
  }),
  ['tbc-navigator' as string]: defineCustomElement(Navigator, {
    shadowRoot: false,
  }),
};

Object.keys(elements).forEach((name: string) => {
  if (!customElements.get(name)) {
    customElements.define(name, elements[name]);
  }
});
