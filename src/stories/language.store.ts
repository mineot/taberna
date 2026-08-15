import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  detectBrowserLanguage,
  loadConfig,
  loadStorage,
  updateStorage,
} from './language.helper';

export const useLanguageStore = defineStore('language-store', () => {
  const locale = ref<string>('');
  const flag = ref<string>('');
  const fullName = ref<string>('');

  async function setLaguage(locale: string) {
    try {
      await updateStorage(locale);
      navigation.reload();
    } catch (err) {
      throw new Error('Failed to set locale', { cause: err });
    }
  }

  async function loadLanguage() {
    try {
      const currentLanguage =
        (await loadStorage()) ?? (await detectBrowserLanguage());
      const config = await loadConfig();

      if (config?.available.includes(currentLanguage)) {
        locale.value = currentLanguage;
        flag.value = config.flags[currentLanguage];
        fullName.value = config.names[currentLanguage];
      } else {
        locale.value = config.default;
        flag.value = config.flags[config.default];
        fullName.value = config.names[config.default];
        updateStorage(config.default);
      }
    } catch (err) {
      throw new Error('Failed to load locale', { cause: err });
    }
  }

  return {
    flag,
    fullName,
    loadLanguage,
    locale,
    setLaguage,
  };
});
