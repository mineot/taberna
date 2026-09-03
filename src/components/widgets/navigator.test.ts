import { describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import Navigator from '@widget/navigator.vue';
import Sidebar from '@widget/sidebar.vue';

describe('Navigator menu controls', () => {
  function mountNavigator() {
    const applicationRoot = document.createElement('div');
    applicationRoot.id = 'app';
    document.body.append(applicationRoot);

    const wrapper = mount(Navigator, {
      props: { menu: true },
      global: { plugins: [createPinia()] },
      attachTo: applicationRoot,
    });

    return { applicationRoot, wrapper };
  }

  it('opens as a modal and restores the page after Escape', async () => {
    const { applicationRoot, wrapper } = mountNavigator();
    const sidebar = wrapper.findComponent(Sidebar);
    const openButton = wrapper.get<HTMLButtonElement>(
      'button[aria-label="Open menu"]',
    );

    expect(sidebar.props('visible')).toBe(false);

    openButton.element.focus();
    await openButton.trigger('click');
    await flushPromises();

    expect(sidebar.props('visible')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    expect(applicationRoot.hasAttribute('inert')).toBe(true);

    const dialog = document.body.querySelector<HTMLElement>(
      'aside[role="dialog"][aria-modal="true"]',
    );
    const closeButton = document.body.querySelector<HTMLButtonElement>(
      'button[aria-label="Close menu"]',
    );

    expect(dialog?.getAttribute('aria-label')).toBe('Menu');
    expect(document.activeElement).toBe(closeButton);

    dialog?.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
    );
    await flushPromises();

    expect(sidebar.props('visible')).toBe(false);
    expect(document.body.style.overflow).toBe('');
    expect(applicationRoot.hasAttribute('inert')).toBe(false);
    expect(document.activeElement).toBe(openButton.element);

    wrapper.unmount();
  });

  it('keeps Tab navigation inside the modal', async () => {
    const { wrapper } = mountNavigator();

    await wrapper.get('button[aria-label="Open menu"]').trigger('click');
    await flushPromises();

    const dialog = document.body.querySelector<HTMLElement>(
      'aside[role="dialog"]',
    );
    const closeButton = document.body.querySelector<HTMLButtonElement>(
      'button[aria-label="Close menu"]',
    );
    const firstLink = dialog?.querySelector<HTMLAnchorElement>('a[href]');

    expect(document.activeElement).toBe(closeButton);

    closeButton?.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }),
    );
    expect(document.activeElement).toBe(firstLink);

    firstLink?.dispatchEvent(
      new KeyboardEvent('keydown', {
        bubbles: true,
        key: 'Tab',
        shiftKey: true,
      }),
    );
    expect(document.activeElement).toBe(closeButton);

    wrapper.unmount();

    expect(document.body.style.overflow).toBe('');
  });

  it('closes through the named close button', async () => {
    const { wrapper } = mountNavigator();
    const sidebar = wrapper.findComponent(Sidebar);

    await wrapper.get('button[aria-label="Open menu"]').trigger('click');
    await flushPromises();

    const closeButton = document.body.querySelector<HTMLButtonElement>(
      'button[aria-label="Close menu"]',
    );
    expect(closeButton).not.toBeNull();

    closeButton?.click();
    await wrapper.vm.$nextTick();

    expect(sidebar.props('visible')).toBe(false);

    wrapper.unmount();
  });
});
