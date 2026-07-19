# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![🇧🇷 Português (Brasil)](<https://img.shields.io/badge/Idioma-%F0%9F%87%A7%F0%9F%87%B7%20Portugu%C3%AAs%20(Brasil)-e5e7eb.svg>)](README_PT_BR.md)

Taberna is a foundation for personal websites, portfolios, landing pages, and institutional websites. Editorial content is stored in JSON and Markdown files organized by language, while the Vue code handles navigation, layout, security, and responsive behavior.

The project still uses placeholder content. Before publishing, replace the example files in `public/config/` and `public/content/`.

## Key features

- Automatic language detection, persisted preferences, and a language selection page
- Configurable sections with text, Markdown, images, highlighting, and reversed layouts
- Markdown pages accessed through routes
- Responsive carousel with autoplay, pause, progress, arrows, and indicators
- Responsive sidebar menu with keyboard navigation and focus trapping
- Optional footer loaded from Markdown
- Centralized theme using `app-*` CSS utilities
- HTML sanitization and Content Security Policy (CSP) restrictions
- Static build compatible with hosting at the root or in subdirectories

## Technologies

- Vue 3 with the Composition API and `<script setup>`
- TypeScript in strict mode
- Vite
- Vue Router in hash mode
- Tailwind CSS v4 and the Typography plugin
- `marked` for converting Markdown
- DOMPurify for sanitizing generated HTML
- Lucide Vue for icons
- Vitest, Vue Test Utils, and jsdom for testing
- ESLint and Prettier

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
npm run dev
```

The development server will be available at `http://localhost:5173`. Code changes are updated by Vite; changes to public files may trigger a full page reload.

### Scripts

```bash
npm run dev        # Development server with HMR
npm run build      # Type-check and production build in dist/
npm run preview    # Preview the build at http://localhost:4173
npm run test       # Unit tests with Vitest
npm run typecheck  # TypeScript validation without emitting files
npm run lint       # ESLint on src/
npm run format     # Prettier on TS, Vue, and CSS files in src/
```

Before submitting a change, run:

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

The linter reports warnings for `v-html`. These are expected in this project because all HTML originating from Markdown is processed by DOMPurify before rendering.

## How the project works

The initial loading process follows this flow:

1. `useLocale` loads `public/languages.json` and selects the language.
2. `useConfig` fetches `public/config/{locale}.json`.
3. `App.vue` renders the header, menu, sidebar, and footer.
4. Vue Router selects the home page, language selection page, or a Markdown page.
5. `useMarkdown` fetches, converts, sanitizes, and caches the content.

The `useLocale` and `useConfig` states are singletons: their `ref`s are declared at module scope and shared by all components. The project does not use Pinia or Vuex.

### Composable responsibilities

| Composable        | Responsibility                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `useLocale`       | Loads the manifest, detects and persists the language, and updates the document's `lang` attribute |
| `useConfig`       | Loads the locale JSON, exposes loading/error states, and cancels previous requests                 |
| `useMarkdown`     | Fetches Markdown, rejects the SPA HTML fallback, converts, sanitizes, and caches content by path   |
| `useSwitchLocale` | Validates the language, loads the config, applies the locale, and navigates to the home page       |

Config, page, footer, and section requests use internal identifiers to ignore stale responses that finish after a newer request. This prevents a rapid language switch from applying outdated content.

### Main structure

```text
taberna/
├── index.html                  # SPA shell, favicon, fonts, and CSP
├── public/
│   ├── favicon.png
│   ├── logo.png
│   ├── fonts/                  # Self-hosted fonts
│   ├── languages.json          # Language manifest
│   ├── config/                 # One complete JSON file per language
│   └── content/                # Markdown organized by language
├── src/
│   ├── App.vue                 # Layout, header, sidebar, and footer
│   ├── main.ts                 # Vue and router initialization
│   ├── style.css               # Tailwind, fonts, theme, utilities, and custom footer styles
│   ├── components/             # Reusable components and tests
│   ├── composables/            # Locale, config, Markdown, and language switching
│   ├── router/                 # Route definitions
│   ├── types/                  # TypeScript interfaces for the config
│   ├── utils/                  # Link validation and public paths
│   └── views/                  # Home, languages, and Markdown pages
└── dist/                       # Generated build output
```

Edit `public/` to customize content and assets. Edit `src/` when you need to change behavior, layout, theme, or internal application messages. Do not edit `dist/` directly.

## Languages

### The `public/languages.json` manifest

```json
{
  "default": "pt-br",
  "available": ["pt-br", "en-us"],
  "flags": {
    "pt-br": "🇧🇷",
    "en-us": "🇺🇸"
  }
}
```

Use lowercase codes in the `language-region` format, such as `pt-br`. Each item in `available` must have a flag and a corresponding file in `public/config/`.

### How the language is selected

The precedence order is:

1. a valid value saved in `localStorage` under the `taberna-lang` key;
2. an exact or partial match in `navigator.languages`;
3. the manifest's `default` field;
4. the internal `pt-br` fallback if the manifest cannot be loaded.

When another language is selected, the application loads the new config before saving the preference. The switch happens without reloading the page and navigates to the home page when the user is on another route.

### Adding a language

1. Copy an existing config:

   ```bash
   cp public/config/pt-br.json public/config/es-es.json
   ```

2. Create the content directory:

   ```bash
   mkdir -p public/content/es-es
   ```

3. Translate the config and all Markdown files referenced by it.
4. Add `es-es` to `available` and `flags` in `languages.json`.
5. Run the application and test the home page, menu, pages, footer, and language switching.

Each config is complete and independent. File names, routes, and content may vary between languages as long as the references in that config exist.

## Site configuration

Each `public/config/{locale}.json` follows this structure:

```json
{
  "site": {
    "title": "My Website",
    "description": "Website description",
    "image": "logo.png"
  },
  "menu": [],
  "sections": [],
  "footer": {
    "ownership": "© 2026 Name",
    "contentFile": "footer.md"
  }
}
```

### `site` fields

| Field         | Type   | Required | Current behavior                                       |
| ------------- | ------ | -------- | ------------------------------------------------------ |
| `title`       | string | No       | Title in the header/sidebar and in `document.title`    |
| `description` | string | Yes      | Updates the meta description when the config is loaded |
| `image`       | string | No       | Image next to the title in the header/sidebar          |

If `title` does not exist, the title text is omitted. If `image` also does not exist, the visual brand link is empty.

The `index.html` file contains an initial description for the period before the application loads. After that, `site.description` replaces the content of `<meta name="description">`. Switching languages also updates the description without reloading the page.

This update happens in the browser. Open Graph, page-specific descriptions, and prerendered metadata have not been implemented yet.

### `footer` fields

| Field         | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `ownership`   | string | Yes      | Text displayed on the footer's bottom line |
| `contentFile` | string | No       | Markdown rendered above the bottom line    |

## Home page sections

Each item in `sections` accepts:

| Field             | Type                      | Required | Description                                           |
| ----------------- | ------------------------- | -------- | ----------------------------------------------------- |
| `id`              | string                    | Yes      | Identifier and target for anchors such as `#about`    |
| `title`           | string                    | No       | Section `<h2>` title                                  |
| `subtitle`        | string                    | No       | Text below the title                                  |
| `content`         | string[]                  | No       | Plain-text paragraphs                                 |
| `contentFiles`    | string[]                  | No       | Markdown relative to `public/content/{locale}/`       |
| `image`           | string                    | No       | Image used with text or a single Markdown file        |
| `imagePosition`   | `top`, `center`, `bottom` | No       | Image cropping and fallback for flex alignment        |
| `contentPosition` | `top`, `center`, `bottom` | No       | Flex alignment; takes precedence over `imagePosition` |
| `invert`          | boolean                   | No       | Reverses the content and image on desktop             |
| `destak`          | boolean                   | No       | Applies a highlighted background                      |
| `carousel`        | object                    | No       | Configures the carousel for multiple files            |

### Content precedence

1. If `content` is defined, it is rendered as text and takes precedence over the other forms.
2. A single item in `contentFiles` renders one Markdown block.
3. Two or more items with `carousel` render the carousel.
4. Two or more items without `carousel` are displayed side by side and stack on mobile.
5. `image` is only displayed with `content` or exactly one `contentFile`.

### Text and image

```json
{
  "id": "about",
  "title": "About",
  "subtitle": "Learn about the project",
  "content": ["First paragraph.", "Second paragraph."],
  "image": "https://placehold.co/600x400",
  "imagePosition": "top",
  "contentPosition": "center",
  "invert": false,
  "destak": true
}
```

On desktop, the default order is content on the left and the image on the right. With `invert: true`, the image is on the left and the content is on the right. On mobile, the content appears above the image in both cases.

`contentPosition` controls the row's vertical alignment. When it does not exist, `imagePosition` is also used as the alignment fallback. Separately, `imagePosition` defines the image's `object-position` (`top`, `center`, or `bottom`) for cropping.

### Single Markdown file

```json
{
  "id": "intro",
  "title": "Introduction",
  "contentFiles": ["intro.md"],
  "image": "https://placehold.co/600x400"
}
```

### Multiple files

```json
{
  "id": "services",
  "title": "Services",
  "contentFiles": ["services/service-1.md", "services/service-2.md"]
}
```

If one of a section's files fails, the others are still displayed. If all of them fail, the section remains without that content.

## Carousel

The carousel is enabled in a section with two or more `contentFiles`:

```json
{
  "id": "testimonials",
  "contentFiles": [
    "testimonials/testimonial-1.md",
    "testimonials/testimonial-2.md",
    "testimonials/testimonial-3.md"
  ],
  "carousel": {
    "autoPlay": true,
    "interval": 4000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 3
  }
}
```

| Field          | Type    | Default | Rules                                                        |
| -------------- | ------- | ------- | ------------------------------------------------------------ |
| `autoPlay`     | boolean | `true`  | Advances automatically                                       |
| `interval`     | number  | `5000`  | Minimum 1,000 ms; invalid values fall back to the default    |
| `buttons`      | boolean | `true`  | Shows previous/next buttons when there is more than one page |
| `dots`         | boolean | `true`  | Shows one indicator per page                                 |
| `itemsPerView` | number  | `1`     | Integer, minimum 1, and limited to the number of slides      |

With one item at a time, the transition uses a fade effect. With multiple items, it uses horizontal movement and page-based navigation. Navigation is circular in both modes.

On screens narrower than 768 px, `itemsPerView` is always 1. With only one page, arrows, dots, and playback controls are hidden.

Autoplay:

- pauses during hover or focus;
- pauses when the tab is hidden;
- can be paused by the user;
- preserves the remaining progress when resumed;
- is disabled when `prefers-reduced-motion: reduce` is enabled;
- restarts the interval after manual navigation.

## Menu and routes

### Menu items

```json
{ "label": "Home", "href": "#intro" }
```

```json
{ "label": "About", "route": "/about" }
```

```json
{ "label": "GitHub", "href": "https://github.com/mineot" }
```

```json
{ "label": "Blog", "route": "/blog", "content": "pages/my-blog.md" }
```

| Configuration            | Behavior                                                     |
| ------------------------ | ------------------------------------------------------------ |
| `route`                  | Internal route using `<router-link>`                         |
| `href` starting with `#` | Returns to the home page and smoothly scrolls to the section |
| HTTP/HTTPS `href`        | External link in a new tab                                   |
| `route` and `content`    | Uses `content` as the Markdown path                          |
| `route` and `href`       | `route` takes precedence                                     |

External links using protocols other than HTTP and HTTPS are not rendered by the menu.

### Available routes

| Logical URL  | Browser URL    | Content            |
| ------------ | -------------- | ------------------ |
| `/`          | `/#/`          | Home page sections |
| `/languages` | `/#/languages` | Language selection |
| `/:slug`     | `/#/about`     | Markdown page      |

Without `content`, `/about` looks for `public/content/{locale}/about.md`. With `content`, the specified file is used. The route accepts one segment; the content file may be located in a subdirectory.

Links written inside Markdown are regular HTML anchors, not `<router-link>` elements. To preserve hash routing and subdirectory deployment, prefer relative links such as `[About](./#/about)`. Links such as `/about` attempt to access an actual server route.

If the page does not exist, the interface displays `Page not found`. The slug is filtered before the file path is constructed.

The router restores the saved position when navigating back, smoothly scrolls to anchors, and returns to the top for other navigation. URLs that do not match the supported routes are redirected to the home page.

### Header and sidebar

- On desktop, up to four items are displayed in the inline menu.
- With more than four items, the inline menu and flag are replaced by the hamburger button at all resolutions.
- On small screens, the hamburger button replaces inline navigation.
- With an empty menu and a single language, the hamburger button is not displayed.
- Language selection is only displayed when more than one language is available.
- The sidebar closes when the user clicks the backdrop, button, or link, or presses `Escape`.
- When opened, it locks scrolling, moves focus to the close button, and traps Tab navigation.
- When closed, focus returns to the element that opened the menu.

## Markdown and footer

Markdown files are fetched at runtime, converted with `marked`, and sanitized with DOMPurify. Pages, sections, and carousel slides use Tailwind Typography. The custom footer uses its own class hierarchy defined in `src/style.css`.

Markdown may also contain HTML, but dangerous content is removed. Do not rely on `<script>`, attributes such as `onclick`, or HTML that is not allowed by the sanitizer.

To mix Markdown inside HTML, leave blank lines between the tags and the content:

```html
<div class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <img src="logo.png" alt="Taberna" class="footer-logo" />
      <span class="footer-title">Taberna</span>
    </div>
    <span class="footer-summary">Description</span>
  </div>
  <div class="footer-links">#### Quick Links - [Home](./#/)</div>
  <div class="footer-links">#### Social - [GitHub](https://github.com/)</div>
</div>
```

The footer Markdown defines only its content and structural class hierarchy. Its presentation is centralized in `src/style.css`.

The `.footer` class creates one column on small screens and three equal columns from the `md` breakpoint. The first column contains the brand and summary, while the remaining columns contain link lists.

The footer selectors use direct-child combinators, so the documented hierarchy must be preserved.

Without `footer.contentFile`, only `ownership` and the “Powered by Mineot” credit are displayed. If the footer file fails, the application omits only the custom content.

Footer links are underlined and change color on hover. Their appearance, grid, and column alignment are defined in `src/style.css`.

### Cache

`useMarkdown` maintains an in-memory cache by path and does not invalidate it. During development, reload the page if a Markdown change does not appear. In production, the cache lasts until the page is reloaded.

## Security

### Sanitization

All HTML generated from Markdown passes through `DOMPurify.sanitize()` before reaching `v-html`. This covers sections, pages, slides, and the footer.

### External links

Menu links pass through an allowlist of HTTP and HTTPS protocols. Markdown links are processed by the sanitizer but remain regular HTML links.

### Content Security Policy

The CSP in `index.html` allows:

- scripts only from the same origin;
- styles from the same origin and inline styles;
- fonts only from the same origin;
- local images, data URIs, and `https://placehold.co`.

To use images from another domain, add it to the `img-src` directive. Make this change carefully and keep the list as restrictive as possible.

The policy is defined in a meta tag. For a stricter production policy, configure the CSP as an HTTP header in your hosting environment; features such as nonces and some directives are not fully covered by a CSP delivered through a meta tag.

## Visual customization

The theme is defined in `src/style.css`. Components use `app-*` utilities; avoid applying `primary-*` or `secondary-*` directly in templates.

### Fonts

| Utility      | Font         | Primary use       |
| ------------ | ------------ | ----------------- |
| `font-sans`  | Roboto       | UI and body text  |
| `font-serif` | Roboto Serif | Editorial content |
| `font-mono`  | Roboto Mono  | Code              |
| `font-fancy` | Italianno    | Brand title       |

To change fonts, replace or add files in `public/fonts/` and update the `@font-face` rules and variables in `style.css`.

### Colors

The `@theme` block maps two scales:

- `primary-*`: neutral, used for backgrounds, text, and borders;
- `secondary-*`: emerald, used for highlights and interactions.

Example customization:

```css
@theme {
  --color-primary-800: #1f2937;
  --color-primary-950: #030712;
  --color-secondary-500: #f97316;
}
```

### Main utilities

| Group          | Utilities                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backgrounds    | `app-background`, `app-background-hover`, `app-background-footer`, `app-header`, `app-backdrop`                                                                                             |
| Text           | `app-text`, `app-text-dark`, `app-text-muted`, `app-text-body`, `app-text-subtle`, `app-text-accent`, `app-text-accent-hover`, `app-error`, `app-markdown`                                  |
| Brand          | `app-title`, `app-title-adjustment`, `app-logo`                                                                                                                                             |
| Header/sidebar | `app-header-link`, `app-sidebar`, `app-sidebar-link`                                                                                                                                        |
| Languages      | `app-language-button`, `app-language-button-text`, `app-language-button-selected`                                                                                                           |
| Sections       | `app-section-title`, `app-section-subtitle`, `app-section-image`, `app-section-destak`                                                                                                      |
| Carousel       | `app-section-carousel-transition`, `app-section-carousel-btn`, `app-section-carousel-progress-track`, `app-section-carousel-progress`, `app-section-dot-active`, `app-section-dot-inactive` |
| General        | `app-duration`, `app-border`, `app-ring`, `app-skeleton`, `app-footer`, `app-powered`                                                                                                       |

Change the scales and fonts for simple customizations. Structural changes to utilities may affect multiple components and should be tested on mobile and desktop.

## Build and deployment

Generate the production version with:

```bash
npm run build
npm run preview
```

Vite copies the public files and generates the application in `dist/`. The router uses hash mode and public paths respect the relative `base`, so the result can be served at the root or in subdirectories without a fallback rule for Vue routes.

Host `dist/` on GitHub Pages, Netlify, Vercel, Nginx, Apache, or any static file server. On Netlify/Vercel, use `npm run build` as the command and `dist` as the output directory.

In the repository's normal workflow, rebuild after every change to keep `dist/` up to date. You can replace JSON or Markdown directly on static hosting, but new Tailwind classes and changes to code, CSS, processed assets, or `index.html` require a new build.

### Backing up customizations

Prefer maintaining a fork or your own repository. Depending on your changes, preserve:

- `public/config/`;
- `public/content/`;
- `public/languages.json`;
- `public/logo.png` and `public/favicon.png`;
- `public/fonts/`;
- `src/style.css`;
- `index.html`, if the CSP or metadata were changed;
- any modified components or utilities in `src/`.

## Current limitations

- The bundled content is fictional.
- There is no Pinia/Vuex, CI/CD, Docker, or `.env` file.
- The meta description is updated on the client; there is no Open Graph, per-page metadata, or prerendering for crawlers without JavaScript.
- Some internal messages and accessibility labels are still in English and outside the language system.
- The project does not validate the JSON schema at runtime; keep types and fields consistent with this documentation.

## Contributing

1. Fork the project.
2. Create a branch: `git checkout -b feature/new-feature`.
3. Implement your changes and run the validation commands.
4. Commit and push the branch.
5. Open a Pull Request.

## License

Licensed under the [Apache License 2.0](LICENSE).
