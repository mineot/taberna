export interface ContentFileManifest {
  name: string;
  extension: string;
}

export interface ErrorManifest {
  title: string;
  status: number;
  message: string;
  throwcase?: any;
}

export interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

export interface ScaffoldManifest {
  enabled: boolean;
  brand: ContentFileManifest;
  menu: ContentFileManifest;
  nav: ContentFileManifest;
  footer: ContentFileManifest;
  owner: string;
  year: string;
}
