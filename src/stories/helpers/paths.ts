import type { ContentFileManifest } from './manifest';

const CONFIG_PATH = '/config/';
const CONTENT_PATH = '/content/';

export const getLanguageConfigPath = (): string => {
  return `${CONFIG_PATH}languages.json`;
};

export const getScaffoldConfigPath = (): string => {
  return `${CONFIG_PATH}scaffold.json`;
};

export const getContentFilePath = (
  language: string,
  contentFile: ContentFileManifest,
): string => {
  return `${CONTENT_PATH}${language}/${contentFile.name}.${contentFile.extension}`;
};
