# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![🇧🇷 Português (Brasil)](<https://img.shields.io/badge/Idioma-%F0%9F%87%A7%F0%9F%87%B7%20Portugu%C3%AAs%20(Brasil)-e5e7eb.svg>)](README_PT_BR.md)

Taberna is a configurable foundation for personal websites, portfolios, landing
pages, and small institutional sites. It combines a Vue application shell with
language-specific JSON manifests and HTML fragments, allowing most site content
to be maintained without changing the application code.

The project is entirely client-side and produces a static build suitable for a
domain root or a subdirectory. The bundled content and remote images are
fictional placeholders and should be replaced before publishing.

## Features

- responsive, mobile-first layout;
- browser-language detection and manual language switching;
- configurable identity, navigation, home page, and footer per language;
- hash-based routes for standalone and nested content pages;
- reusable custom elements for panels, columns, links, quotations, and
  carousels;
- sanitized HTML content and validated file, URL, and configuration boundaries;
- semantic theme tokens and self-hosted fonts;
- static output with relative asset paths.

## Requirements

- [Node.js](https://nodejs.org/) 20.19 or newer, or 22.12 or newer;
- npm, included with Node.js.

## Quick start

Clone the repository and install its dependencies:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:5173`. Vite
reloads the page as project files change. Press `Ctrl+C` to stop the server.

Create and preview a production build with:

```bash
npm run build
npm run preview
```

## Project structure

```text
public/
  config/
    languages.json          Enabled languages and display information
    en-us.json              English site manifest
    pt-br.json              Brazilian Portuguese site manifest
  content/{locale}/         Home, footer, and routed .htm fragments
  fonts/                    Self-hosted fonts
  images/                   Logo, texture, and other public images
  favicon.png
src/
  components/
    layouts/                Application shell and sanitized content outlet
    widgets/                Header, footer, navigation, and controls
    *.vue                   Content-facing custom elements
  pages/                    Home, language selector, and dynamic content pages
  stores/                   Pinia stores for configuration and language state
  styles/                   Theme tokens and shared utilities
  utils/                    Fetching, validation, sanitization, and paths
  App.vue                   Bootstrap and document metadata synchronization
  main.ts                   Application entry point
  router.ts                 Hash-based routes
  style.css                 Global stylesheet entry point
  web-components.ts         Content custom-element registration
index.html                  SPA shell, fallback metadata, and CSP
vite.config.ts              Vite, Tailwind, aliases, and Vitest configuration
```

Configuration, editorial content, and presentation are deliberately separate:

- `public/config/` defines languages, identity, navigation, and content entry
  points;
- `public/content/` contains the HTML fragments rendered for each language;
- `src/components/` and `src/styles/` define reusable behavior and visual
  presentation.

For normal content maintenance, only files under `public/` need to change.

## Configure languages

`public/config/languages.json` is the global language manifest:

```json
{
  "default": "pt-br",
  "available": ["pt-br", "en-us"],
  "flags": {
    "pt-br": "🇧🇷",
    "en-us": "🇺🇸"
  },
  "names": {
    "pt-br": "Português (Brasil)",
    "en-us": "English (United States)"
  }
}
```

The application resolves the active language in this order:

1. a valid choice previously stored under `taberna-lang`;
2. a compatible browser language;
3. the configured `default` language.

Every entry in `available` must:

- use a normalized, lowercase locale such as `en-us`;
- have a corresponding value in both `flags` and `names`;
- have a `public/config/{locale}.json` file;
- have a `public/content/{locale}/` directory with the required content.

The default locale must also appear in `available`. Locale identifiers must be
unique.

To run a single-language site, keep only that locale in the manifest. The locale
configuration file and content directory are still required because the
application uses the locale when resolving every resource.

To add a language, copy an existing locale configuration and content directory,
translate the visible content, then register the new locale in all four manifest
fields. Keep routes, directory names, and file names aligned across languages so
the current page remains available after a language switch.

## Configure a site version

Each `public/config/{locale}.json` file defines one language-specific version of
the site:

```json
{
  "title": "Taberna",
  "description": "A short introduction to the website.",
  "image": "images/logo.png",
  "ownership": "© 2026 Your Name",
  "footer": "footer.htm",
  "home": "home.htm",
  "navigator": [
    { "text": "Articles", "href": "#/articles.htm" },
    { "text": "How to Use", "href": "#/howuse.htm" },
    { "text": "About", "href": "#/about.htm" }
  ]
}
```

| Field         | Required | Description                                                             |
| ------------- | -------- | ----------------------------------------------------------------------- |
| `title`       | yes      | Site name shown by the brand component and used as the document title.  |
| `description` | yes      | Site summary used by the brand component and document meta description. |
| `image`       | yes      | Brand image path, normally relative to `public/`.                       |
| `ownership`   | yes      | Copyright or authorship text shown in the footer.                       |
| `home`        | no       | `.htm` fragment loaded at `#/`.                                         |
| `footer`      | no       | `.htm` fragment rendered above the footer ownership line.               |
| `navigator`   | yes      | Array of `{ "text", "href" }` navigation entries.                       |

Do not include the `public/` prefix in resource paths. For example,
`"image": "images/logo.png"` resolves to `public/images/logo.png`.

The `home` and `footer` paths are resolved inside the active locale directory.
For `en-us`, the example above loads:

```text
public/content/en-us/home.htm
public/content/en-us/footer.htm
```

Both fields are optional. Without `home`, the application renders its empty-home
state. Without `footer`, the ownership and project credit remain visible without
a custom footer fragment.

Configuration loading is atomic. The application publishes a locale only after
its JSON manifest and any referenced home and footer fragments load and validate
successfully. A failed language switch leaves the current language and
configuration intact.

### JSON rules

- use double quotes around property names and strings;
- separate entries with commas, without a trailing comma;
- do not add comments;
- treat file names and paths as case-sensitive;
- keep every configured path inside the corresponding public content tree.

## Create content pages

Content files are HTML fragments stored under `public/content/{locale}/`. They
may contain safe standard HTML, supported attributes, Tailwind utility classes,
inline styles accepted by the sanitizer, and the registered `twc-*` elements.

A fragment must not contain `<!doctype>`, `<html>`, `<head>`, or `<body>`. Page
file names must end in `.htm`; full HTML documents and unsupported file types are
rejected.

For example, create an English page at:

```text
public/content/en-us/about.htm
```

Then link to it with:

```text
#/about.htm
```

Nested pages use the same route-to-file mapping:

```text
Route: #/articles/article1.htm
File:  public/content/en-us/articles/article1.htm
```

Valid page paths are relative, include the `.htm` suffix, and may contain safe
nested directory segments. Leading slashes, empty segments, traversal such as
`..`, and unsupported extensions are rejected.

Internal navigation must use hash URLs:

- `#/` for the home page;
- `#/language-switcher` for the language selector;
- `#/{relative-path}.htm` for a content page.

Do not use server paths such as `/about.htm`, and do not omit the `.htm` suffix.

Use the same relative content paths in every enabled language. For example, if
`public/content/en-us/about.htm` exists, add the translated equivalent at
`public/content/pt-br/about.htm`.

### Minimal page example

```html
<twc-rows gap="6">
  <h1 class="text-4xl" style="color: var(--emphasis-color)">My project</h1>

  <p>A short introduction to the content on this page.</p>

  <twc-columns cols="2" gap="4">
    <twc-panel emphasis rounded>
      <h2 class="text-xl">First highlight</h2>
      <p>A description of the first subject.</p>
    </twc-panel>

    <twc-panel emphasis rounded>
      <h2 class="text-xl">Second highlight</h2>
      <p>A description of the second subject.</p>
    </twc-panel>
  </twc-columns>

  <twc-link href="#/about.htm" label="Learn more"></twc-link>
</twc-rows>
```

Save the fragment as a `.htm` file and expose it through `navigator` or a link in
another content file.

## Content components

Taberna registers Vue components as custom elements without a shadow root, so
they can be used directly in content fragments and share the global theme.

| Element             | Attributes                                                  | Defaults and behavior                                                                          |
| ------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `twc-brand`         | `description`                                               | Displays the configured logo and title. `description` also displays the site description.      |
| `twc-link`          | required `href`, required `label`, optional `external`      | Renders `label` as link text. `external` opens an absolute HTTP(S) URL in a new tab.           |
| `twc-panel`         | `emphasis`, `rounded`, `bordered`                           | All options default to `false`.                                                                |
| `twc-columns`       | `cols="1..12"`, numeric `gap`, `align="start\|center\|end"` | Defaults to one column, no gap, and start alignment. Collapses to one column on small screens. |
| `twc-rows`          | numeric `gap`, `align="start\|center\|end"`                 | Defaults to no gap and start alignment.                                                        |
| `twc-quote`         | optional `title`                                            | Renders a highlighted quotation or note, with an optional heading.                             |
| `twc-carousel`      | numeric `limit`, millisecond `delay`, boolean `show-timer`  | Defaults to `1`, `5000`, and `true`.                                                           |
| `twc-carousel-item` | none                                                        | Wraps one carousel item.                                                                       |

Boolean attributes follow HTML semantics: their presence means `true`. Where
supported, an explicit string value of `"false"` disables the option.

### Links

`twc-link` always uses its `label` attribute as the visible link text; child
content is not used as its label.

Internal link:

```html
<twc-link href="#/about.htm" label="About"></twc-link>
```

External link:

```html
<twc-link href="https://example.com" label="Visit website" external></twc-link>
```

External destinations must be absolute HTTP or HTTPS URLs. Invalid URLs are
rendered without navigation. Links opened in a new tab receive
`rel="noopener noreferrer"`.

### Layout elements

Use `twc-columns` for a responsive grid and `twc-rows` for vertical groups:

```html
<twc-columns cols="3" gap="4" align="center">
  <div>First column</div>
  <div>Second column</div>
  <div>Third column</div>
</twc-columns>

<twc-rows gap="2" align="start">
  <h2>Section title</h2>
  <p>Section content.</p>
</twc-rows>
```

`gap` values are numeric multipliers of Tailwind's spacing token. Columns become
active at the `48rem` medium breakpoint; below it, all items are stacked.

### Panels and quotations

```html
<twc-panel emphasis rounded bordered>
  <p>Highlighted content.</p>
</twc-panel>

<twc-quote title="Author's note">
  <p>A short quotation or contextual note.</p>
</twc-quote>
```

### Carousel

```html
<twc-carousel limit="3" delay="5000" show-timer="true">
  <twc-carousel-item>
    <p>First item</p>
  </twc-carousel-item>
  <twc-carousel-item>
    <p>Second item</p>
  </twc-carousel-item>
  <twc-carousel-item>
    <p>Third item</p>
  </twc-carousel-item>
</twc-carousel>
```

The carousel displays one item per page on small screens and up to `limit` items
from the medium breakpoint. `limit` is floored and clamped to at least one.
`delay` is clamped to zero or greater, and `delay="0"` disables autoplay.
`show-timer="false"` hides the countdown.

Autoplay pauses while pointer hover or keyboard focus is inside the carousel,
respects reduced-motion preferences, and can be paused or resumed manually. The
component also provides pagination, keyboard-accessible controls, and hides
off-page items from the accessibility tree.

## Assets and visual customization

Public assets are referenced without the `public/` prefix and normally without a
leading slash:

```text
images/logo.png     -> public/images/logo.png
images/photo.jpg    -> public/images/photo.jpg
fonts/MyFont.woff2  -> public/fonts/MyFont.woff2
```

Replace these files to update the default identity:

- `public/images/logo.png` for the site logo;
- `public/favicon.png` for the browser icon;
- `public/images/texture.png` for the repeating background texture.

Global CSS is loaded in this order:

```css
@import 'tailwindcss';
@import '@style/theme.css';
@import '@style/utilities.css';
```

Edit `src/styles/theme.css` to customize fonts, colors, borders, spacing, motion,
textures, and component-specific tokens. Components consume semantic custom
properties such as:

```css
:root {
  --background-color: var(--color-neutral-900);
  --background-emphasis-color: var(--color-neutral-800);
  --emphasis-color: var(--color-emerald-500);
  --text-color: var(--color-neutral-200);
  --container-lg: 24;
  --quote-border-size: 3px;
}
```

Prefer changing existing semantic tokens instead of adding palette-specific
classes throughout templates and content. Numeric spacing and layout tokens are
used as multipliers of Tailwind's `--spacing`; direct CSS values such as colors,
durations, and border widths must keep units appropriate to their properties.

The bundled Roboto, Roboto Serif, Roboto Mono, and Italianno font faces are
defined at the start of `src/styles/theme.css` and loaded from `public/fonts/`.

Shared utilities are defined in `src/styles/utilities.css`:

| Utility                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `app-duration`         | Shared transition duration and easing. |
| `app-focus-ring`       | Visible keyboard focus outline.        |
| `app-gap-sm/md/lg`     | Semantic gaps between elements.        |
| `app-padding-sm/md/lg` | Semantic internal spacing.             |
| `app-container`        | Responsive horizontal page padding.    |
| `app-block`            | Responsive vertical block padding.     |
| `app-texture`          | Repeating background texture.          |
| `app-code`             | Inline-code presentation.              |

Content authors may use these utilities and Tailwind classes in HTML fragments.
Stable application-component styling belongs in each component's style block.

## Security model

Content files are treated as untrusted HTML. Before rendering them, Taberna uses
DOMPurify with an explicit allowlist for the supported `twc-*` elements and
attributes. Scripts, event handlers, unknown custom elements, and unsafe URLs are
removed.

All dynamic JSON and HTML resources also pass through runtime validation:

- JSON responses must use a JSON content type and match the expected manifest;
- content responses must use an HTML content type and be fragments rather than
  complete documents;
- content paths reject traversal and unsupported extensions;
- links allow only HTTP and HTTPS protocols;
- stale page requests are aborted and ignored during route or language changes.

`index.html` adds a Content Security Policy restricting scripts and fonts to the
same origin, styles to the same origin plus required inline styles, and images to
the same origin, `data:` URLs, and `https://placehold.co`.

When adding an external image host, update only the `img-src` directive in
`index.html` with the exact required origin. Do not weaken the sanitizer, URL
validation, path validation, or CSP to make content load.

To register another content custom element, update all of the following together:

1. create the Vue component and its focused tests;
2. register its `twc-*` tag in `src/web-components.ts`;
3. add the tag and supported attributes to `src/utils/html.util.ts`;
4. add sanitization and component tests for the public contract;
5. document the element and its attributes.

## Application behavior and limitations

- The application is a client-only static SPA. It has no backend, database, or
  authentication.
- Routing uses URL hashes, so static hosting does not need per-route rewrites.
- The document language, title, and description follow the active site
  configuration.
- Rendering is client-side; SSR, prerendering, and per-route SEO metadata are not
  implemented.
- Open Graph and other social-sharing metadata are not generated per page.
- Loading, retry, empty, error, menu, carousel, and ARIA shell messages are
  currently hardcoded in English. Editorial content and navigation are localized.
- The repository does not include a deployment workflow or hosting-level CSP
  header.

## Commands

| Command             | Description                                         |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the Vite development server.                  |
| `npm run build`     | Type-check the project and generate `dist/`.        |
| `npm run preview`   | Serve the production build locally.                 |
| `npm run test`      | Run the Vitest suite once.                          |
| `npm run typecheck` | Run `vue-tsc` without emitting files.               |
| `npm run lint`      | Lint files under `src/`.                            |
| `npm run format`    | Format TypeScript, Vue, and CSS files under `src/`. |

## Build and deploy

Generate the static website:

```bash
npm run build
```

The deployable output is written to `dist/`. Verify it locally before release:

```bash
npm run preview
```

Upload the contents of `dist/` to a static host, or configure a hosting service
with:

```text
Build command: npm run build
Output directory: dist
```

Vite is configured with a relative base, and routing uses hashes, so the output
can be hosted at a domain root or under a subdirectory. GitHub Pages is also
compatible, but this repository does not include a deployment workflow.

Rebuild and redeploy after every change. Do not edit `dist/` manually because it
is generated from the source and replaced by the next build.

### Publishing checklist

- replace all fictional text and placeholder images;
- review the logo, favicon, title, description, links, and footer;
- verify that every enabled locale has a complete configuration and content set;
- test all routes and language switches on desktop and mobile;
- confirm that any remote asset origin is allowed by the CSP;
- run `npm run test`, `npm run typecheck`, and `npm run lint`;
- run `npm run build` and inspect the result with `npm run preview`.

## Troubleshooting

### The application fails during startup

Check `public/config/languages.json` and the active locale manifest for malformed
JSON, missing required fields, duplicate locales, or invalid paths. Confirm that
the server returns JSON files with a JSON content type.

### A page is not found

Confirm that the route includes `#/` and the `.htm` extension, and that the file
exists under the active language directory with the same capitalization. For
example, `#/about.htm` requires `public/content/{locale}/about.htm`.

### Home or footer content does not load

Check the `home` or `footer` path in `public/config/{locale}.json`. The file must
exist in that locale's content directory and must be an HTML fragment, not a full
document.

### An image does not load

Place local images under `public/` and reference them without the `public/`
prefix, for example `images/photo.jpg`. For remote images, add the exact origin
to the CSP `img-src` directive.

### A link is visible but cannot be opened

The sanitizer removes malformed or unsafe destinations. Use a `#/page.htm` hash
URL for internal navigation or an absolute HTTP(S) URL with `external` for an
external `twc-link`.

### Published changes do not appear

Run `npm run build` again and publish the newly generated contents of `dist/`.
Also check whether the hosting service or browser is serving a cached build.

## License

Licensed under the [Apache License 2.0](LICENSE).
