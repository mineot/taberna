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
  brand: string;
  menu: string;
  nav: string;
  footer: string;
  owner: string;
  year: string;
}
