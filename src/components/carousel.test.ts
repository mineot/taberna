import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Carousel from '@component/carousel.vue';
import { installMatchMedia, useTestClock } from '@/test/browser';

async function mountCarousel(reducedMotion = false) {
  useTestClock();
  installMatchMedia((query) =>
    query.includes('prefers-reduced-motion') ? reducedMotion : false,
  );

  const wrapper = mount(Carousel, {
    attachTo: document.body,
    props: { delay: 1000 },
    slots: {
      default: '<div>First page</div><div>Second page</div>',
    },
  });

  await nextTick();
  await nextTick();

  return wrapper;
}

function activePageLabel(wrapper: ReturnType<typeof mount>) {
  return wrapper
    .get('.carousel-page-button[aria-current="page"]')
    .attributes('aria-label');
}

describe('Carousel playback', () => {
  it('provides persistent pause and play controls', async () => {
    const wrapper = await mountCarousel();
    const playbackButton = wrapper.get('.carousel-playback-button');

    expect(playbackButton.attributes('aria-label')).toBe('Pause carousel');
    expect(wrapper.get('.carousel').attributes('aria-roledescription')).toBe(
      'carousel',
    );

    await playbackButton.trigger('click');
    expect(playbackButton.attributes('aria-label')).toBe('Play carousel');

    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(activePageLabel(wrapper)).toBe('Page 1');

    await playbackButton.trigger('click');
    expect(playbackButton.attributes('aria-label')).toBe('Pause carousel');

    vi.advanceTimersByTime(1000);
    await nextTick();
    expect(activePageLabel(wrapper)).toBe('Page 2');

    wrapper.unmount();
  });

  it('pauses temporarily while keyboard focus is inside', async () => {
    const wrapper = await mountCarousel();
    const nextButton = wrapper.get<HTMLButtonElement>(
      'button[aria-label="Next page"]',
    );
    const outsideButton = document.createElement('button');
    document.body.append(outsideButton);

    nextButton.element.focus();
    await nextTick();

    vi.advanceTimersByTime(1500);
    await nextTick();
    expect(activePageLabel(wrapper)).toBe('Page 1');
    expect(
      wrapper.get('.carousel-playback-button').attributes('aria-label'),
    ).toBe('Pause carousel');

    outsideButton.focus();
    await nextTick();
    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(activePageLabel(wrapper)).toBe('Page 2');

    wrapper.unmount();
  });

  it('disables autoplay for reduced motion until the user opts in', async () => {
    const wrapper = await mountCarousel(true);
    const playbackButton = wrapper.get('.carousel-playback-button');

    expect(playbackButton.attributes('aria-label')).toBe('Play carousel');

    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(activePageLabel(wrapper)).toBe('Page 1');

    await playbackButton.trigger('click');
    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(activePageLabel(wrapper)).toBe('Page 2');

    wrapper.unmount();
  });
});
