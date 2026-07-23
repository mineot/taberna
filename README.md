# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![🇧🇷 Português (Brasil)](<https://img.shields.io/badge/Idioma-%F0%9F%87%A7%F0%9F%87%B7%20Portugu%C3%AAs%20(Brasil)-e5e7eb.svg>)](README_PT_BR.md)

Taberna is a customizable starting point for personal websites, portfolios, landing pages, and small institutional websites. You edit ordinary JSON and Markdown files to change the text, pages, menu, images, languages, and footer. The application takes care of the responsive layout, navigation, and safe rendering of the content.

You do not need to change Vue components for the most common customizations. Basic content lives in `public/config/` and `public/content/`, while colors and fonts are centralized in `src/style.css`.

The repository includes fictional placeholder content. Replace it before publishing your website.

## What you can create

Taberna provides:

- a responsive home page assembled from configurable sections;
- independent Markdown pages for content such as About and Services;
- automatic language detection and a language selection page;
- sections with text, images, Markdown, emphasized backgrounds, and reversed layouts;
- an optional carousel with autoplay, controls, indicators, and multiple items;
- a responsive menu that is accessible by keyboard;
- an optional custom footer written in Markdown and HTML;
- centralized colors, fonts, and transition settings;
- a static production build that can be hosted at the root of a domain or in a subdirectory.

## Contents

- [Quick start](#quick-start)
- [Your first customization](#your-first-customization)
- [Where to make changes](#where-to-make-changes)
- [Editing JSON and Markdown](#editing-json-and-markdown)
- [Site configuration](#site-configuration)
- [Menu and pages](#menu-and-pages)
- [Home page sections](#home-page-sections)
- [Footer](#footer)
- [Languages](#languages)
- [Visual customization](#visual-customization)
- [Build and deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [Advanced reference](#advanced-reference)
- [Contributing](#contributing)
- [License](#license)

## Quick start

### What you need

- [Node.js](https://nodejs.org/) 20.19 or newer, or 22.12 or newer;
- npm, which is installed together with Node.js;
- a code editor, such as Visual Studio Code;
- Git, if you want to clone the repository instead of downloading it as a ZIP file.

Open a terminal and confirm that Node.js and npm are available:

```bash
node --version
npm --version
```

If either command is not found, install a supported Node.js version and reopen the terminal.

### Download and run the project

Clone the repository and enter its directory:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
```

Alternatively, download the repository as a ZIP file, extract it, open the extracted `taberna` directory in your editor, and open a terminal in that directory.

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the address shown in the terminal, normally `http://localhost:5173`. Keep the command running while you work. Most changes appear automatically; press `Ctrl+C` in the terminal when you want to stop the server.

## Your first customization

This walkthrough uses Portuguese (`pt-br`), the default language. If the application selected English, make the equivalent changes in `public/config/en-us.json` and `public/content/en-us/`, or select Portuguese from the language page.

### 1. Change the site name and description

Open `public/config/pt-br.json` and find the `site` object:

```json
"site": {
  "title": "Your Name",
  "description": "A short description of your website",
  "image": "logo.png"
}
```

Save the file and check the browser. The title appears in the interface and browser tab, while the description is used in the page metadata.

### 2. Replace the logo and favicon

- Replace `public/logo.png` with your logo.
- Replace `public/favicon.png` with the small icon shown in browser tabs.
- Keep the same file names, or update `site.image` if you choose another logo name.

Files inside `public/` are referenced without the `public/` prefix. For example, `public/images/brand.png` is written as `images/brand.png` in the config.

### 3. Edit the home page content

Open `public/content/pt-br/intro.md` and replace its placeholder text. Markdown is plain text with a small amount of formatting syntax, so a file can be as simple as:

```md
# Welcome

This is my new website.

- Learn about my work
- View my services
- Contact me
```

### 4. Change a section

In `public/config/pt-br.json`, find an item inside `sections`. Change its `title`, `subtitle`, image, or referenced Markdown file. For example:

```json
{
  "id": "intro",
  "title": "Welcome",
  "subtitle": "A short introduction",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

Create `public/images/` if it does not exist, then place the image at `public/images/intro.jpg`. The value of `contentFiles` is relative to `public/content/pt-br/`, so `intro.md` refers to `public/content/pt-br/intro.md`.

### 5. Change the main colors

Open `src/style.css`, find the `:root` block, and change the semantic color variables. For example:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
}
```

These variables are reused throughout the interface, so you can change the visual identity without editing every component.

### 6. Check the result

Review the website on both a wide and a narrow browser window. Also check every configured language: each language has its own complete config and content directory.

When you are satisfied, follow [Build and deployment](#build-and-deployment) to generate the publishable version.

## Where to make changes

| What you want to change                    | File or directory                       |
| ------------------------------------------ | --------------------------------------- |
| Site name, description, menu, and sections | `public/config/{locale}.json`           |
| Home page Markdown and independent pages   | `public/content/{locale}/`              |
| Available languages and flags              | `public/languages.json`                 |
| Logo and favicon                           | `public/logo.png`, `public/favicon.png` |
| Other local images                         | Any directory inside `public/`          |
| Colors, fonts, and transitions             | `src/style.css`                         |
| Initial HTML metadata and image policy     | `index.html`                            |
| Layout and application behavior            | Vue files inside `src/`                 |

For normal content customization, start with `public/config/`, `public/content/`, and the images in `public/`. Changes inside `src/` are mainly for developers who want to alter the layout or behavior.

## Editing JSON and Markdown

### JSON basics

The files in `public/config/` and `public/languages.json` use JSON. Keep these rules in mind:

- property names and text values use double quotes;
- list items and properties are separated by commas;
- the final item in an object or list does not have a trailing comma;
- `true`, `false`, and numbers do not use quotes;
- JSON does not allow comments;
- file names and paths are case-sensitive on most hosting services.

A small valid JSON object looks like this:

```json
{
  "title": "My Website",
  "enabled": true,
  "items": ["First", "Second"]
}
```

If the page becomes empty or stops updating after you edit a config file, check the terminal and browser console for a JSON syntax error.

### Markdown basics

Markdown files use `.md` and are useful for longer content. Common formatting includes:

```md
# Main heading

## Smaller heading

Regular paragraph with **bold text** and _italic text_.

- First item
- Second item

[Link text](https://example.com)
```

Markdown may contain HTML when you need a custom structure. All generated HTML is sanitized before it is displayed, so scripts and unsafe attributes are removed.

## Site configuration

Each language has one complete config at `public/config/{locale}.json`. The config connects the site identity, menu, home page sections, and footer.

This reduced example shows how the parts relate to one another:

```json
{
  "site": {
    "title": "My Website",
    "description": "A short description of my website",
    "image": "logo.png"
  },
  "menu": [
    { "label": "Home", "href": "#intro" },
    { "label": "About", "route": "/about" }
  ],
  "sections": [
    {
      "id": "intro",
      "title": "Welcome",
      "contentFiles": ["intro.md"]
    }
  ],
  "footer": {
    "ownership": "© 2026 Your Name",
    "contentFile": "footer.md"
  }
}
```

In this example:

- `#intro` points to the section whose `id` is `intro`;
- `intro.md` is loaded from the current language's content directory;
- `/about` loads `about.md` from that same directory;
- `footer.md` supplies optional custom footer content.

### Site identity fields

| Field         | Type   | Required | Behavior                                      |
| ------------- | ------ | -------- | --------------------------------------------- |
| `title`       | string | No       | Title in the header, sidebar, and browser tab |
| `description` | string | Yes      | Page description used in the browser metadata |
| `image`       | string | No       | Image displayed next to the title             |

The initial metadata in `index.html` is displayed before the config loads. After loading, `site.title` and `site.description` update the browser document. Switching languages updates them without reloading the page.

For local images, place the file inside `public/` and use a relative path such as `images/brand.png`. Avoid a leading `/` if the website may be published in a subdirectory.

## Menu and pages

Menu items can point to a home page section, an independent Markdown page, or an external website.

### Link to a home page section

```json
{ "label": "Home", "href": "#intro" }
```

The value after `#` must match a section `id`.

### Link to an independent page

```json
{ "label": "About", "route": "/about" }
```

This loads `public/content/{locale}/about.md`. To use another file name or a subdirectory, add `content`:

```json
{
  "label": "Blog",
  "route": "/blog",
  "content": "pages/my-blog.md"
}
```

This route displays `public/content/{locale}/pages/my-blog.md`.

### Link to an external website

```json
{ "label": "GitHub", "href": "https://github.com/mineot" }
```

External menu links open in a new tab. Only HTTP and HTTPS links are accepted.

### Menu precedence

| Configuration            | Behavior                                                  |
| ------------------------ | --------------------------------------------------------- |
| `route`                  | Creates an internal page link                             |
| `href` starting with `#` | Returns home and smoothly scrolls to the matching section |
| HTTP/HTTPS `href`        | Opens an external link in a new tab                       |
| `route` and `content`    | Uses `content` as the Markdown path for that route        |
| `route` and `href`       | Uses `route` and ignores `href`                           |

Links inside Markdown are regular HTML links. Because Taberna uses hash-based routes, link to an internal page with a relative URL such as `[About](./#/about)`. A link such as `/about` asks the web server for a real `/about` path and may fail after deployment.

### Pages with sublinks

A Markdown page can link to other Markdown pages stored in subdirectories. For example, `/articles` can list articles and `/features` can link to detailed feature pages:

```text
public/content/{locale}/
├── articles.md
├── articles/
│   └── article-1.md
├── features.md
└── features/
    └── organized-content.md
```

The menu remains flat: these sublinks do not become submenus automatically. They are regular Markdown links written inside `articles.md` or `features.md`.

**The `#/` is required before the route in every internal sublink written in Markdown.** Use:

```md
[First article](./#/articles/article-1)
[Organized content](./#/features/organized-content)
```

Do not use:

```md
[First article](/articles/article-1)
```

Without `#`, the browser requests `/articles/article-1` as a real server path and may produce an incorrect URL such as `/articles/article-1#/`. The correct URL is `/#/articles/article-1`.

The `.md` extension belongs only to the file and must not appear in the URL. The `/#/articles/article-1` route loads `public/content/{locale}/articles/article-1.md`. To return to the parent page from the article, use:

```md
[Back to articles](./#/articles)
```

## Home page sections

Every item in the config's `sections` array represents one block on the home page.

| Field             | Type                      | Required | Description                                               |
| ----------------- | ------------------------- | -------- | --------------------------------------------------------- |
| `id`              | string                    | Yes      | Unique identifier and target for links such as `#about`   |
| `title`           | string                    | No       | Title displayed above the section content                 |
| `subtitle`        | string                    | No       | Short text displayed below the title                      |
| `content`         | string[]                  | No       | Plain-text paragraphs                                     |
| `contentFiles`    | string[]                  | No       | Markdown paths relative to the language content directory |
| `image`           | string                    | No       | Image used with plain text or one Markdown file           |
| `imagePosition`   | `top`, `center`, `bottom` | No       | Image cropping and fallback vertical alignment            |
| `contentPosition` | `top`, `center`, `bottom` | No       | Vertical alignment; overrides `imagePosition`             |
| `invert`          | boolean                   | No       | Reverses the content and image on desktop                 |
| `emphasis`        | boolean                   | No       | Uses the emphasized section background                    |
| `carousel`        | object                    | No       | Enables carousel behavior for multiple files              |

### Choose one content format

The section decides what to display in this order:

1. If `content` exists, it is displayed as plain-text paragraphs.
2. One item in `contentFiles` displays one Markdown block.
3. Two or more items with `carousel` display a carousel.
4. Two or more items without `carousel` are displayed side by side and stack on mobile.
5. `image` is displayed only with `content` or exactly one `contentFile`.

For predictable results, do not add `content` and `contentFiles` to the same section.

### Plain text and image

```json
{
  "id": "about",
  "title": "About",
  "subtitle": "Learn more about my work",
  "content": ["First paragraph.", "Second paragraph."],
  "image": "images/about.jpg",
  "imagePosition": "top",
  "contentPosition": "center",
  "invert": false,
  "emphasis": true
}
```

On desktop, the default order is content on the left and image on the right. With `invert: true`, the image moves to the left. On mobile, content appears above the image in both cases.

`contentPosition` controls the row's vertical alignment. If it is omitted, `imagePosition` is also used as the alignment fallback. Independently, `imagePosition` controls which part of the image remains visible when it is cropped.

### One Markdown file and an image

```json
{
  "id": "intro",
  "title": "Introduction",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

### Multiple Markdown files

```json
{
  "id": "services",
  "title": "Services",
  "contentFiles": ["services/service-1.md", "services/service-2.md"]
}
```

If one file fails to load, the other files are still displayed. If every file fails, the section remains visible without that content.

## Footer

The `footer` object accepts:

| Field         | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `ownership`   | string | Yes      | Text displayed on the footer's bottom line |
| `contentFile` | string | No       | Markdown displayed above the bottom line   |

### Basic footer

If you only need an ownership line, omit `contentFile`:

```json
"footer": {
  "ownership": "© 2026 Your Name"
}
```

The footer will also display the fixed “Powered by Mineot” project credit.

### Custom footer

Add a Markdown file such as `public/content/{locale}/footer.md` and reference it in the config:

```json
"footer": {
  "ownership": "© 2026 Your Name",
  "contentFile": "footer.md"
}
```

The built-in footer layout expects the following direct-child hierarchy. Keep the blank lines around Markdown headings and lists.

<!-- prettier-ignore -->
```html
<div class="footer">
<div class="footer-container">
<div class="footer-brand">
<img src="logo.png" alt="My Website" class="footer-logo" />
<span class="footer-title">My Website</span>
</div>
<span class="footer-summary">A short description.</span>
</div>
<div class="footer-links">

#### Quick Links

- [Home](./#/)
- [About](./#/about)

</div>
<div class="footer-links">

#### Social

- [GitHub](https://github.com/)

</div>
</div>
```

The `.footer` class creates one column on small screens and three equal columns on wider screens. The first column contains the brand and summary; the remaining columns contain link lists. Presentation is controlled by the footer classes in `src/style.css`.

If the custom footer file cannot be loaded, only that custom content is omitted.

## Languages

### Language manifest

`public/languages.json` lists the default and available languages:

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

Use lowercase `language-region` codes, such as `pt-br` or `en-us`. Every value in `available` needs:

- a flag in the `flags` object;
- a complete file at `public/config/{locale}.json`;
- a corresponding directory at `public/content/{locale}/` containing every referenced Markdown file.

### How a language is selected

The application checks, in order:

1. a valid preference previously saved in the browser;
2. an exact or partial match with the browser's preferred languages;
3. the manifest's `default` language;
4. the internal `pt-br` fallback if the manifest cannot be loaded.

When a user selects another language, Taberna loads its config before saving the preference and then returns to the home page.

### Add another language

1. Copy an existing config:

   ```bash
   cp public/config/pt-br.json public/config/es-es.json
   ```

2. Create its content directory:

   ```bash
   mkdir -p public/content/es-es
   ```

3. Translate the config and copy or translate every Markdown file it references.
4. Add `es-es` to `available` and `flags` in `public/languages.json`.
5. Test its home page, menu, pages, footer, and language switching.

Configs remain complete per language, but technical identifiers are shared across locales. Keep routes, section IDs, directory names, and file names in English using lowercase kebab-case; translate only labels and editorial content. The content trees should use matching paths so a route such as `/about` resolves to `about.md` in every locale.

## Visual customization

### Logo, favicon, and images

- `public/logo.png` is the default brand image.
- `public/favicon.png` is the browser tab icon.
- Other images can be organized in a directory such as `public/images/`.
- Local config paths omit `public/` and should not start with `/`.

Local images are the simplest choice. To load an image from another domain, that domain must also be allowed by the Content Security Policy in `index.html`.

### Fonts

| Utility      | Default font | Main use                |
| ------------ | ------------ | ----------------------- |
| `font-sans`  | Roboto       | Interface and body text |
| `font-serif` | Roboto Serif | Editorial content       |
| `font-mono`  | Roboto Mono  | Code                    |
| `font-fancy` | Italianno    | Brand title             |

To change a font, add its files to `public/fonts/`, then update the `@font-face` rules and font variables in `src/style.css`.

### Colors and transitions

The `:root` block in `src/style.css` contains semantic variables. Their names describe where a value is used, so changing one variable updates every component that uses it.

| Group       | Variables                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| Backgrounds | `--background`, `--background-hover`, `--background-emphasis`, `--footer-background`, `--backdrop`, `--backdrop-opacity` |
| Header      | `--header-background`, `--header-background-opacity`, `--header-link`, `--header-link-hover`                             |
| Sidebar     | `--sidebar-background`, `--sidebar-background-hover`, `--sidebar-link`, `--sidebar-link-hover`                           |
| Text        | `--text`, `--text-body`, `--text-muted`, `--emphasis`, `--emphasis-hover`, `--error`                                     |
| Interface   | `--border`, `--ring`, `--skeleton`                                                                                       |
| Carousel    | `--dot`, `--dot-inactive`, `--dot-active`, `--progress-track`, `--progress`                                              |
| Motion      | `--duration`, `--duration-carousel`                                                                                      |

Example:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --text: #f9fafb;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
  --duration: 250ms;
  --duration-carousel: 450ms;
}
```

After changing colors or fonts, check text contrast and test both mobile and desktop layouts.

## Build and deployment

### Create the production version

Stop the development server if it is running, then execute:

```bash
npm run build
```

This validates the TypeScript code and generates the publishable website in `dist/`. Preview that exact version locally with:

```bash
npm run preview
```

Open the address printed in the terminal, normally `http://localhost:4173`, and check the menu, pages, images, languages, and links.

### Publish

Taberna produces a static website. You can host the generated `dist/` directory on GitHub Pages, Netlify, Vercel, Nginx, Apache, or another static hosting service.

For a service that builds the repository for you, use:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |

For a service that accepts uploaded files, upload the contents generated inside `dist/`.

The router uses hash-based URLs and Vite uses a relative base path. This allows the same build to work at a domain root or in a subdirectory without special server fallback rules.

The safest workflow is to run `npm run build` again after every content, config, image, style, or code change and deploy the newly generated `dist/` directory.

## Troubleshooting

### `node` or `npm` is not found

Install a supported Node.js version, close and reopen the terminal, then run `node --version` and `npm --version` again.

### The usual development address does not open

Read the output from `npm run dev`. If port 5173 is already in use, Vite may select another port and print a different address.

### The page is empty after editing a config

Check the terminal and the browser's developer console. A missing quote, comma, or closing bracket can make the JSON invalid. JSON does not allow comments or trailing commas.

### Markdown content does not appear

Confirm that:

- the file exists inside the selected language's content directory;
- its path matches `contentFiles`, menu `content`, or `footer.contentFile` exactly;
- uppercase and lowercase letters match;
- the selected language has its own copy of the file.

Markdown is cached in memory. Reload the browser page if a saved Markdown change does not appear during development.

### An independent page displays `Page not found`

Without a menu `content` value, the route `/about` expects `public/content/{locale}/about.md`. If the file uses another name or a subdirectory, configure `content` explicitly.

### An image does not load

For a local image, verify that it is inside `public/` and use a path such as `images/photo.jpg`, without `public/` or a leading `/`. For an external image, add its domain to the `img-src` directive in `index.html`.

### An internal Markdown link works locally but fails after publishing

Use a hash-based relative link such as `[About](./#/about)` instead of `/about`.

### The published website does not include recent changes

Run `npm run build` again and redeploy the new contents of `dist/`. Do not edit `dist/` as the permanent source of your customizations.

### ESLint reports `v-html` warnings

These warnings are expected in this project. HTML originating from Markdown is sanitized with DOMPurify before rendering.

## Advanced reference

The sections below are mainly useful when you want to change behavior, work on Vue components, or understand the project's technical safeguards.

### Carousel

Add a `carousel` object to a section with two or more Markdown files:

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

| Field          | Type    | Default | Rules                                               |
| -------------- | ------- | ------- | --------------------------------------------------- |
| `autoPlay`     | boolean | `true`  | Advances automatically                              |
| `interval`     | number  | `5000`  | Minimum 1,000 ms; invalid values use the default    |
| `buttons`      | boolean | `true`  | Shows arrows when there is more than one page       |
| `dots`         | boolean | `true`  | Shows one position indicator per page               |
| `itemsPerView` | number  | `1`     | Integer, minimum 1, limited to the number of slides |

One item per view uses a fade transition. Multiple items use horizontal movement and page-based navigation. Screens narrower than 768 px always display one item. With only one page, navigation and playback controls are hidden.

Autoplay pauses during hover, keyboard focus, and hidden browser tabs. Users can pause it permanently with the playback control. A progress ring shows the remaining time and freezes while playback is paused. Reduced-motion preferences disable autoplay. Manual navigation restarts its interval.

### Routes, header, and sidebar

| Logical URL           | Browser URL             | Content                         |
| --------------------- | ----------------------- | ------------------------------- |
| `/`                   | `/#/`                   | Configured home sections        |
| `/languages`          | `/#/languages`          | Language selection              |
| `/:slug(.*)`          | `/#/about`              | Independent Markdown page       |
| `/articles/article-1` | `/#/articles/article-1` | Markdown page in a subdirectory |

The `/:slug(.*)` route accepts one or more URL segments. Without a menu `content` value, each segment maps to the file path inside `public/content/{locale}/`, and `.md` is appended internally. Invalid characters are removed before the slug is used. When the matching file does not exist, `PageView` displays `Page not found`; the route is not automatically redirected to the home page. Navigation restores saved scroll positions, scrolls smoothly to anchors, and returns to the top for other destinations.

On desktop, up to four menu items are displayed inline. More than four items activate the hamburger menu at every screen size. Small screens also use the hamburger menu. With an empty menu and only one language, the button is omitted.

The sidebar closes through its button, backdrop, links, or the `Escape` key. It locks page scrolling while open, traps keyboard focus, and restores focus to the element that opened it.

### Markdown rendering and cache

Markdown files are fetched at runtime, converted with `marked`, sanitized with DOMPurify, and styled with Tailwind Typography. Sections, pages, slides, and the custom footer use this pipeline.

The in-memory cache uses each content path as its key and lasts until the browser page is reloaded. Failed files do not prevent unrelated Markdown content from loading.

### Security

All HTML generated from Markdown passes through `DOMPurify.sanitize()` before it reaches `v-html`. Do not rely on `<script>` elements, event attributes such as `onclick`, or HTML rejected by the sanitizer.

External menu URLs pass through an allowlist that accepts only HTTP and HTTPS. Markdown links remain ordinary sanitized HTML links.

The Content Security Policy in `index.html` allows:

- scripts only from the same origin;
- styles from the same origin and inline styles;
- fonts only from the same origin;
- local images, data URIs, and `https://placehold.co` images.

The policy is currently delivered through a meta tag. Add trusted image domains to `img-src` only when necessary. For stricter production security, deliver the CSP as an HTTP response header through the hosting environment.

### Technologies

- Vue 3 with the Composition API and `<script setup>`;
- TypeScript in strict mode;
- Vite;
- Vue Router in hash mode;
- Tailwind CSS v4 and Tailwind Typography;
- `marked` and DOMPurify;
- Lucide Vue;
- Vitest, Vue Test Utils, and jsdom;
- ESLint and Prettier.

### Development scripts

```bash
npm run dev        # Start the development server
npm run build      # Type-check and generate dist/
npm run preview    # Preview the production build
npm run test       # Run unit tests with Vitest
npm run typecheck  # Validate TypeScript without generating files
npm run lint       # Run ESLint on src/
npm run format     # Format TypeScript, Vue, and CSS files in src/
```

Before submitting a code change, run:

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

### Semantic CSS utilities

Components use `app-*` utilities instead of direct palette colors. Change semantic variables for ordinary theme customization; change these utilities only when modifying component styling.

| Group          | Utilities                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backgrounds    | `app-background`, `app-background-hover`, `app-header`, `app-backdrop`, `app-footer`                                                                                                        |
| Text           | `app-text`, `app-text-muted`, `app-text-body`, `app-text-subtle`, `app-text-emphasis`, `app-text-emphasis-hover`, `app-error`, `app-markdown`                                               |
| Brand          | `app-title`, `app-title-adjustment`, `app-logo`, `app-powered`                                                                                                                              |
| Header/sidebar | `app-header-link`, `app-sidebar`, `app-sidebar-link`                                                                                                                                        |
| Languages      | `app-language-button`, `app-language-button-text`, `app-language-button-selected`                                                                                                           |
| Sections       | `app-section-title`, `app-section-subtitle`, `app-section-image`, `app-section-emphasis`                                                                                                    |
| Carousel       | `app-section-carousel-transition`, `app-section-carousel-btn`, `app-section-carousel-progress-track`, `app-section-carousel-progress`, `app-section-dot-active`, `app-section-dot-inactive` |
| General        | `app-duration`, `app-border`, `app-ring`, `app-skeleton`                                                                                                                                    |

Primitive utilities such as `app-background-hover` and `app-text-emphasis-hover` provide a value but do not add a hover state by themselves. Use them with `hover:` when necessary. Higher-level utilities such as `app-title` already include their hover behavior.

### Back up your customizations

Prefer maintaining a fork or your own repository. Preserve the files you have changed, especially:

- `public/config/`;
- `public/content/`;
- `public/languages.json`;
- images and fonts inside `public/`;
- `src/style.css`;
- `index.html`, if you changed metadata or the CSP;
- any modified Vue components or utilities inside `src/`.

Do not use `dist/` as the only copy of your work. It is generated output and can be replaced by the next build.

## Contributing

1. Fork the project.
2. Create a branch: `git checkout -b feature/new-feature`.
3. Implement and validate your changes.
4. Commit and push the branch.
5. Open a pull request.

## License

Licensed under the [Apache License 2.0](LICENSE).
