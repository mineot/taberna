import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import LinkComponent from './link.vue';

describe('Link', () => {
  it('secures a valid external link', () => {
    const wrapper = mount(LinkComponent, {
      props: {
        href: 'https://example.com',
        label: 'Example',
        external: true,
      },
    });
    const anchor = wrapper.get('a');

    expect(anchor.attributes('href')).toBe('https://example.com');
    expect(anchor.attributes('target')).toBe('_blank');
    expect(anchor.attributes('rel')).toBe('noopener noreferrer');
    expect(anchor.attributes('aria-disabled')).toBeUndefined();
  });

  it('disables an unsafe link', () => {
    const wrapper = mount(LinkComponent, {
      props: {
        href: 'javascript:alert(1)',
        label: 'Unsafe',
        external: true,
      },
    });
    const anchor = wrapper.get('a');

    expect(anchor.attributes('href')).toBeUndefined();
    expect(anchor.attributes('target')).toBeUndefined();
    expect(anchor.attributes('rel')).toBeUndefined();
    expect(anchor.attributes('aria-disabled')).toBe('true');
  });

  it('keeps an internal link in the current browsing context', () => {
    const wrapper = mount(LinkComponent, {
      props: {
        href: '#/about.htm',
        label: 'About',
      },
    });
    const anchor = wrapper.get('a');

    expect(anchor.attributes('href')).toBe('#/about.htm');
    expect(anchor.attributes('target')).toBeUndefined();
    expect(anchor.attributes('rel')).toBeUndefined();
  });
});
