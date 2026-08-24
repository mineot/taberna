export interface NavigatorItem {
  text: string;
  href: string;
}

export interface ConfigurationManifest {
  title: string;
  image: string;
  description: string;
  ownership: string;
  footer?: string;
  home?: string;
  navigator: NavigatorItem[];
}
