import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { nextTick } from 'vue';
import HomePage from '@page/home.page.vue';
import { useConfigStore } from '@store/config.store';

describe('HomePage', () => {
  it('reacts when configuration finishes loading', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const wrapper = mount(HomePage, {
      global: { plugins: [pinia] },
    });

    useConfigStore().config = {
      title: 'Taberna',
      image: 'images/logo.png',
      description: 'Description',
      ownership: 'Ownership',
      homeContent: '<main>Loaded home</main>',
      navigator: [],
    };
    await nextTick();

    const renderedText = wrapper.text();
    wrapper.unmount();

    expect(renderedText).toContain('Loaded home');
    expect(renderedText).not.toContain('No Home Page');
  });
});
