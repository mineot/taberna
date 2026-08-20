export interface Image {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  rounded?: boolean;
}

export interface ImageBlock {
  type: 'image';
  title?: string;
  subtitle?: string;
  wrap?: boolean;
  direction?: 'col' | 'row';
  margin?: number;
  aligns?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  images: Image[];
}

export interface Paragraph {
  type: 'paragraph';
  title?: string;
  subtitle?: string;
  content: string;
}

export interface Content {
  title?: string;
  subtitle?: string;
  items: Array<Paragraph | ImageBlock>;
}

export interface Block {
  cols: 1 | 2 | 3 | 4;
  emphasis?: boolean;
  contents: Content[];
}

export interface BlockManifest {
  blocks: Block[];
}
