import DOMPurify from 'dompurify';
import { normalizeLinkHref } from '@util/link.util';

const CUSTOM_ELEMENT_PATTERN =
  /^twc-(brand|link|carousel|carousel-item|panel|columns|rows|quote)$/;

const CUSTOM_ATTRIBUTES = [
  'align',
  'bordered',
  'cols',
  'delay',
  'description',
  'emphasis',
  'external',
  'gap',
  'href',
  'label',
  'limit',
  'rel',
  'rounded',
  'show-timer',
  'target',
  'title',
];

function secureLinks(fragment: DocumentFragment) {
  fragment.querySelectorAll<HTMLElement>('[href]').forEach((element) => {
    const href = element.getAttribute('href');
    const externalCustomElement =
      element.tagName.toLowerCase() === 'twc-link' &&
      element.hasAttribute('external') &&
      element.getAttribute('external') !== 'false';
    const safeHref = normalizeLinkHref(href, externalCustomElement);

    if (safeHref) {
      element.setAttribute('href', safeHref);
    } else {
      element.removeAttribute('href');
      element.removeAttribute('target');
    }

    if (element.getAttribute('target') === '_blank' && safeHref) {
      const rel = new Set(
        (element.getAttribute('rel') ?? '').split(/\s+/).filter(Boolean),
      );
      rel.add('noopener');
      rel.add('noreferrer');
      element.setAttribute('rel', Array.from(rel).join(' '));
    }
  });
}

export function sanitizeContentHtml(data: string): string {
  const sanitizedHtml = DOMPurify.sanitize(data, {
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: CUSTOM_ELEMENT_PATTERN,
      allowCustomizedBuiltInElements: false,
    },
    ADD_ATTR: CUSTOM_ATTRIBUTES,
  });
  const template = document.createElement('template');
  template.innerHTML = sanitizedHtml;
  secureLinks(template.content);
  return template.innerHTML;
}
