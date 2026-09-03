import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import SlugPage from '@page/slug.page.vue';
import { useLanguageStore } from '@store/language.store';
import { deferred } from '@/test/async';
import { jsonResponse, mockFetchSequence, textResponse } from '@/test/http';
import { createTestRouter } from '@/test/router';

describe('SlugPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useLanguageStore().locale = 'pt-br';
  });

  async function mountPage(path: string) {
    const router = createTestRouter();
    await router.push(path);
    await router.isReady();

    const wrapper = mount(SlugPage, {
      global: { plugins: [router] },
    });

    return { router, wrapper };
  }

  it('loads a valid nested content path', async () => {
    const fetchMock = mockFetchSequence(textResponse('<main>Article</main>'));
    const { wrapper } = await mountPage('/articles/article1.htm');

    await flushPromises();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/content\/pt-br\/articles\/article1\.htm$/),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(wrapper.text()).toContain('Article');

    wrapper.unmount();
  });

  it('rejects an unsafe slug without making a request', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const { wrapper } = await mountPage('/articles/../about.htm');

    await flushPromises();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain('Page not found');

    wrapper.unmount();
  });

  it('shows a not-found state for missing content', async () => {
    mockFetchSequence(textResponse('Missing', { status: 404 }));
    const { wrapper } = await mountPage('/missing.htm');

    await flushPromises();

    expect(wrapper.text()).toContain('Page not found');

    wrapper.unmount();
  });

  it('shows an error state for non-recoverable failures', async () => {
    mockFetchSequence(jsonResponse({}, { status: 503 }));
    const { wrapper } = await mountPage('/unavailable.htm');

    await flushPromises();

    expect(wrapper.text()).toContain('Failed to load page');

    wrapper.unmount();
  });

  it('cancels stale requests and ignores responses that arrive out of order', async () => {
    const firstResponse = deferred<Response>();
    const secondResponse = deferred<Response>();
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockReturnValueOnce(firstResponse.promise)
      .mockReturnValueOnce(secondResponse.promise);
    const { router, wrapper } = await mountPage('/first.htm');
    const firstSignal = fetchMock.mock.calls[0]?.[1]?.signal;

    await router.push('/second.htm');
    await flushPromises();

    expect(firstSignal?.aborted).toBe(true);

    secondResponse.resolve(textResponse('<main>Second</main>'));
    await flushPromises();
    expect(wrapper.text()).toContain('Second');

    firstResponse.resolve(textResponse('<main>First</main>'));
    await flushPromises();
    expect(wrapper.text()).toContain('Second');
    expect(wrapper.text()).not.toContain('First');

    wrapper.unmount();
  });
});
