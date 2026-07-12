export interface SiteConfig {
  title: string;
  owner: string;
  description: string;
}

export interface MenuItem {
  label: string;
  href: string;
}

export type ImagePosition = 'top' | 'center' | 'bottom';

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  content?: string[];
  contentFile?: string[];
  image?: string;
  imagePosition?: ImagePosition;
  invert?: boolean;
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
