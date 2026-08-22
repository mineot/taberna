export interface NavigatorItem {
  text: string;
  href: string;
}

export interface ConfigurationManifest {
  title: string;
  image: string;
  ownership: string;
  footer?: string;
  navigator: NavigatorItem[];
}
