import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Content from '@layout/content.vue';

describe('Content', () => {
  it('sanitizes unsafe HTML while preserving supported custom elements', () => {
    const wrapper = mount(Content, {
      props: {
        data: [
          '<script>window.compromised = true</script>',
          '<a href="javascript:alert(1)" onclick="alert(1)">Unsafe</a>',
          '<twc-panel emphasis>Safe</twc-panel>',
        ].join(''),
      },
    });

    expect(wrapper.find('script').exists()).toBe(false);
    expect(wrapper.find('a').attributes('href')).toBeUndefined();
    expect(wrapper.find('a').attributes('onclick')).toBeUndefined();
    expect(wrapper.find('twc-panel').exists()).toBe(true);
    expect(wrapper.find('twc-panel').attributes('emphasis')).toBe('');

    wrapper.unmount();
  });

  it('secures links that open a new browsing context', () => {
    const wrapper = mount(Content, {
      props: {
        data: '<a href="https://example.com" target="_blank">Safe</a>',
      },
    });
    const anchor = wrapper.get('a');

    expect(anchor.attributes('href')).toBe('https://example.com');
    expect(anchor.attributes('target')).toBe('_blank');
    expect(anchor.attributes('rel')).toContain('noopener');
    expect(anchor.attributes('rel')).toContain('noreferrer');
  });

  it('removes unsupported protocols and invalid external custom links', () => {
    const wrapper = mount(Content, {
      props: {
        data: [
          '<a href="mailto:user@example.com" target="_blank">Email</a>',
          '<twc-link href="./relative" external>Relative</twc-link>',
        ].join(''),
      },
    });

    expect(wrapper.get('a').attributes('href')).toBeUndefined();
    expect(wrapper.get('a').attributes('target')).toBeUndefined();
    expect(wrapper.get('twc-link').attributes('href')).toBeUndefined();
  });

  it('secures every supported element that opens a new browsing context', () => {
    const wrapper = mount(Content, {
      props: {
        data: [
          '<svg><a href="https://example.com" target="_blank"><text>SVG</text></a></svg>',
          '<map><area href="https://example.com" target="_blank"></map>',
        ].join(''),
      },
    });

    const navigableElements = wrapper.findAll('[target="_blank"]');

    expect(navigableElements).toHaveLength(2);
    navigableElements.forEach((element) => {
      expect(element.attributes('rel')).toContain('noopener');
      expect(element.attributes('rel')).toContain('noreferrer');
    });
  });
});
