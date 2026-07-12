export type VerticalPosition = 'top' | 'center' | 'bottom';

export interface SiteConfig {
  title?: string;
  owner: string;
  description: string;
  image?: string;
}

export interface MenuItem {
  label: string;
  href?: string;
  route?: string;
  content?: string;
}

export interface Section {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string[];
  contentFile?: string[];
  image?: string;
  imagePosition?: VerticalPosition;
  contentPosition?: VerticalPosition;
  invert?: boolean;
  destak?: boolean;
}

export interface FooterConfig {
  ownership: string;
  contentFile?: string;
}

export interface AppConfig {
  site: SiteConfig;
  menu: MenuItem[];
  sections: Section[];
  footer: FooterConfig;
}
