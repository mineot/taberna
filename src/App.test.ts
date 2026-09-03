import { beforeEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import App from '@/App.vue';
import { useConfigStore } from '@store/config.store';
import { useLanguageStore } from '@store/language.store';
import { useLoadingStore } from '@store/loading.store';
import { createTestRouter } from '@/test/router';
import { jsonResponse, mockFetchSequence } from '@/test/http';

const languages = {
  default: 'pt-br',
  available: ['pt-br', 'en-us'],
  flags: { 'pt-br': '🇧🇷', 'en-us': '🇺🇸' },
  names: { 'pt-br': 'Português (Brasil)', 'en-us': 'English (America)' },
};

const manifest = {
  title: 'Taberna',
  image: 'images/logo.png',
  description: 'Description',
  ownership: 'Ownership',
  navigator: [],
};

describe('App bootstrap', () => {
  beforeEach(() => {
    localStorage.setItem('taberna-lang', 'pt-br');
  });

  async function mountApp() {
    const pinia = createPinia();
    const router = createTestRouter();
    setActivePinia(pinia);
    await router.push('/');
    await router.isReady();

    return mount(App, {
      global: { plugins: [pinia, router] },
    });
  }

  it('renders the application only after bootstrap succeeds', async () => {
    mockFetchSequence(jsonResponse(languages), jsonResponse(manifest));
    const wrapper = await mountApp();

    expect(wrapper.find('.skeleton').exists()).toBe(true);

    await flushPromises();

    expect(wrapper.find('.skeleton').exists()).toBe(false);
    expect(wrapper.find('.bootstrap-error').exists()).toBe(false);
    expect(wrapper.find('main.main').exists()).toBe(true);
    expect(useConfigStore().config?.title).toBe('Taberna');
    expect(document.documentElement.lang).toBe('pt-br');
    expect(document.title).toBe('Taberna');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('Description');

    wrapper.unmount();
  });

  it('reacts to locale and configuration changes', async () => {
    mockFetchSequence(jsonResponse(languages), jsonResponse(manifest));
    const wrapper = await mountApp();
    await flushPromises();

    useConfigStore().applyConfiguration({
      ...manifest,
      title: 'English title',
      description: 'English description',
    });
    useLanguageStore().setLanguage('en-us');
    await wrapper.vm.$nextTick();

    expect(document.documentElement.lang).toBe('en-us');
    expect(document.title).toBe('English title');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('English description');

    wrapper.unmount();
  });

  it('keeps the ready application mounted during background loading', async () => {
    mockFetchSequence(jsonResponse(languages), jsonResponse(manifest));
    const wrapper = await mountApp();
    await flushPromises();
    const loadingStore = useLoadingStore();

    const token = loadingStore.startLoading();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.skeleton').exists()).toBe(false);
    expect(wrapper.find('main.main').exists()).toBe(true);

    loadingStore.stopLoading(token);
    wrapper.unmount();
  });

  it('shows a controlled error when bootstrap fails', async () => {
    mockFetchSequence(
      jsonResponse(languages),
      jsonResponse({}, { status: 503 }),
    );
    const wrapper = await mountApp();

    await flushPromises();

    expect(wrapper.find('.skeleton').exists()).toBe(false);
    expect(wrapper.find('main.main').exists()).toBe(false);
    expect(wrapper.find('.bootstrap-error').text()).toContain(
      'Failed to load config',
    );

    wrapper.unmount();
  });

  it('retries the complete bootstrap flow after a failure', async () => {
    mockFetchSequence(
      jsonResponse(languages),
      jsonResponse({}, { status: 503 }),
      jsonResponse(languages),
      jsonResponse(manifest),
    );
    const wrapper = await mountApp();
    await flushPromises();

    await wrapper.get('.bootstrap-error-button').trigger('click');
    expect(wrapper.find('.skeleton').exists()).toBe(true);

    await flushPromises();

    expect(wrapper.find('.bootstrap-error').exists()).toBe(false);
    expect(wrapper.find('main.main').exists()).toBe(true);

    wrapper.unmount();
  });
});
