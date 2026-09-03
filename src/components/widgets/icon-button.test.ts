import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import IconButton from '@widget/icon-button.vue';

describe('IconButton', () => {
  it('renders a named native button and emits clicks', async () => {
    const wrapper = mount(IconButton, {
      props: { label: 'Open menu' },
    });
    const button = wrapper.get('button');

    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('aria-label')).toBe('Open menu');
    expect(button.find('svg').attributes('aria-hidden')).toBe('true');

    await button.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);

    wrapper.unmount();
  });

  it('renders the close icon through the same button contract', () => {
    const wrapper = mount(IconButton, {
      props: { icon: 'CLOSE', label: 'Close menu' },
    });

    expect(wrapper.get('button').attributes('aria-label')).toBe('Close menu');
    expect(wrapper.find('.lucide-x').exists()).toBe(true);

    wrapper.unmount();
  });
});
