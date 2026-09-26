import type { ContentFileManifest, ScaffoldManifest } from './manifest';
import { getContentFilePath, getScaffoldConfigPath } from './paths';

export async function fetchScaffoldManifest(): Promise<ScaffoldManifest> {
  try {
    const response = await fetch(getScaffoldConfigPath());
    return (await response.json()) as ScaffoldManifest;
  } catch {
    throw new Error('Could not load scaffold manifest.');
  }
}

export async function fetchContentFile(
  language: string,
  contentFile: ContentFileManifest,
): Promise<string> {
  try {
    const response = await fetch(getContentFilePath(language, contentFile));
    return await response.text();
  } catch {
    throw new Error('Could not load content manifest.');
  }
}
