import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import SectionCarousel from './section-carousel.vue';

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? reducedMotion : true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

function activeSlide(wrapper: ReturnType<typeof mount>): number {
  return wrapper
    .findAll('.prose')
    .findIndex((slide) =>
      slide.element.parentElement?.classList.contains('opacity-100'),
    );
}

describe('section-carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('normalizes invalid interval and itemsPerView values', async () => {
    mockMatchMedia(false);
    const wrapper = mount(SectionCarousel, {
      props: {
        slides: ['<p>First</p>', '<p>Second</p>'],
        config: { autoPlay: true, interval: -1, itemsPerView: 0 },
      },
    });

    expect(activeSlide(wrapper)).toBe(0);
    await vi.advanceTimersByTimeAsync(4999);
    await nextTick();
    expect(activeSlide(wrapper)).toBe(0);
    await vi.advanceTimersByTimeAsync(1);
    await nextTick();
    expect(activeSlide(wrapper)).toBe(1);
  });

  it('does not autoplay when reduced motion is requested', async () => {
    mockMatchMedia(true);
    const wrapper = mount(SectionCarousel, {
      props: {
        slides: ['<p>First</p>', '<p>Second</p>'],
        config: { autoPlay: true, interval: 1000 },
      },
    });

    await vi.advanceTimersByTimeAsync(5000);
    await nextTick();

    expect(activeSlide(wrapper)).toBe(0);
    expect(wrapper.find('[aria-label="Pause carousel"]').exists()).toBe(false);
  });

  it('tracks the configured interval and freezes the ring while paused', async () => {
    mockMatchMedia(false);
    const wrapper = mount(SectionCarousel, {
      props: {
        slides: ['<p>First</p>', '<p>Second</p>'],
        config: { autoPlay: true, interval: 4000 },
      },
    });
    const progress = wrapper.get('[data-testid="carousel-progress"]');

    await vi.advanceTimersByTimeAsync(2000);
    await nextTick();
    expect(Number(progress.attributes('stroke-dashoffset'))).toBeCloseTo(50, 0);

    await wrapper.get('[aria-label="Pause carousel"]').trigger('click');
    const pausedOffset = progress.attributes('stroke-dashoffset');
    await vi.advanceTimersByTimeAsync(4000);
    await nextTick();
    expect(progress.attributes('stroke-dashoffset')).toBe(pausedOffset);
    expect(activeSlide(wrapper)).toBe(0);

    await wrapper.get('[aria-label="Play carousel"]').trigger('click');
    await vi.advanceTimersByTimeAsync(2000);
    await nextTick();
    expect(activeSlide(wrapper)).toBe(1);
  });
});
