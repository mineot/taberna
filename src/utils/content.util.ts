export type Aligns = 'start' | 'center' | 'end';
export type Directions = 'col' | 'row';
export type Colors = 'danger' | 'info' | 'success' | 'warning';

export interface Header {
  title?: string;
  subtitle?: string;
}

export interface Alert extends Header {
  type: 'alert';
  color?: Colors;
  content: string;
}

export interface Image {
  src: string;
  alt: string;
  height?: number | string;
  width?: number | string;
  rounded?: boolean;
}

export interface ImageBlock extends Header {
  type: 'image';
  images: Image[];
  wrap?: boolean;
  direction?: Directions;
  margin?: boolean;
  align?: Aligns;
  justify?: Aligns;
  'mobile:wrap'?: boolean;
  'mobile:direction'?: Directions;
  'mobile:margin'?: boolean;
  'mobile:align'?: Aligns;
  'mobile:justify'?: Aligns;
}

export interface Paragraph extends Header {
  type: 'paragraph';
  content: string | string[];
}

export type Items = Array<Alert | Paragraph | ImageBlock>;

export interface Content extends Header {
  items: Items;
}

export interface Block {
  cols: 1 | 2 | 3 | 4;
  emphasis?: boolean;
  contents: Content[];
}

export type BlockManifest = Block[];

export type BlockManifestSource = Array<string | Block>;
