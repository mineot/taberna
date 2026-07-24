export type VerticalPosition = 'top' | 'center' | 'bottom';
export type ImageAlign = 'start' | 'center' | 'end';

export interface SiteConfig {
  title?: string;
  description: string;
  image?: string;
}

export interface MenuItem {
  label: string;
  href?: string;
  route?: string;
  content?: string;
}

export interface CarouselConfig {
  autoPlay?: boolean;
  interval?: number;
  buttons?: boolean;
  dots?: boolean;
  itemsPerView?: number;
}

export interface Section {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string[];
  contentFiles?: string[];
  image?: string;
  imageDimensions?: {
    width?: number | string;
    height?: number | string;
  };
  imageAlign?: ImageAlign;
  imageRounded?: boolean;
  imagePosition?: VerticalPosition;
  contentPosition?: VerticalPosition;
  invert?: boolean;
  emphasis?: boolean;
  carousel?: CarouselConfig;
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
