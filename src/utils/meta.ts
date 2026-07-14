export function setMetaDescription(content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (!element) {
    element = document.createElement('meta');
    element.name = 'description';
    document.head.append(element);
  }

  element.content = content;
}
