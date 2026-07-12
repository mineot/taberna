export type VerticalPosition = 'top' | 'center' | 'bottom';

export interface SiteConfig {
  title: string;
  owner: string;
  description: string;
  image?: string;
}

export interface MenuItem {
  label: string;
  href: string;
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

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterConfig {
  text: string;
}

export interface AppConfig {
  site: SiteConfig;
  menu: MenuItem[];
  sections: Section[];
  social: SocialLink[];
  footer: FooterConfig;
}
