import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import LanguageSwitcherPage from '@page/language-switcher.page.vue';
import { useConfigStore } from '@store/config.store';
import { useLanguageStore } from '@store/language.store';
import { deferred } from '@/test/async';
import { jsonResponse, mockFetchSequence } from '@/test/http';

const languages = {
  default: 'pt-br',
  available: ['pt-br', 'en-us'],
  flags: {
    'pt-br': '🇧🇷',
    'en-us': '🇺🇸',
  },
  names: {
    'pt-br': 'Português (Brasil)',
    'en-us': 'English (America)',
  },
};

const englishConfiguration = {
  title: 'English title',
  image: 'images/logo.png',
  description: 'English description',
  ownership: 'Ownership',
  navigator: [],
};

describe('LanguageSwitcherPage', () => {
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    const languageStore = useLanguageStore();
    languageStore.languages = languages;
    languageStore.locale = 'pt-br';
    localStorage.setItem('taberna-lang', 'pt-br');
  });

  function mountPage() {
    return mount(LanguageSwitcherPage, {
      global: { plugins: [pinia] },
    });
  }

  it('publishes the new locale and configuration without reloading', async () => {
    mockFetchSequence(jsonResponse(englishConfiguration));
    const wrapper = mountPage();
    const languageButtons = wrapper.findAll('.language-item');

    expect(languageButtons).toHaveLength(2);
    expect(languageButtons[0]?.element.tagName).toBe('BUTTON');
    expect(languageButtons[0]?.attributes('aria-pressed')).toBe('true');

    await languageButtons[1]?.trigger('click');
    await flushPromises();

    expect(useLanguageStore().locale).toBe('en-us');
    expect(useConfigStore().config?.title).toBe('English title');
    expect(localStorage.getItem('taberna-lang')).toBe('en-us');
    expect(wrapper.find('.language-error').exists()).toBe(false);

    wrapper.unmount();
  });

  it('keeps the previous state when the new configuration fails', async () => {
    mockFetchSequence(jsonResponse({}, { status: 503 }));
    const configStore = useConfigStore();
    configStore.config = {
      title: 'Portuguese title',
      image: 'images/logo.png',
      description: 'Portuguese description',
      ownership: 'Ownership',
      navigator: [],
    };
    const wrapper = mountPage();

    await wrapper.findAll('.language-item')[1]?.trigger('click');
    await flushPromises();

    expect(useLanguageStore().locale).toBe('pt-br');
    expect(configStore.config?.title).toBe('Portuguese title');
    expect(localStorage.getItem('taberna-lang')).toBe('pt-br');
    expect(wrapper.find('.language-error').exists()).toBe(true);

    wrapper.unmount();
  });

  it('disables every language control while a switch is pending', async () => {
    const response = deferred<Response>();
    vi.spyOn(globalThis, 'fetch').mockReturnValueOnce(response.promise);
    const wrapper = mountPage();

    await wrapper.findAll('.language-item')[1]?.trigger('click');

    expect(
      wrapper
        .findAll<HTMLButtonElement>('.language-item')
        .every((button) => button.element.disabled),
    ).toBe(true);
    expect(wrapper.get('.languages').attributes('aria-busy')).toBe('true');

    response.resolve(jsonResponse(englishConfiguration));
    await flushPromises();

    expect(
      wrapper
        .findAll<HTMLButtonElement>('.language-item')
        .every((button) => !button.element.disabled),
    ).toBe(true);

    wrapper.unmount();
  });
});
