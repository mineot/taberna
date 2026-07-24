# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![🇧🇷 Português (Brasil)](<https://img.shields.io/badge/Idioma-%F0%9F%87%A7%F0%9F%87%B7%20Portugu%C3%AAs%20(Brasil)-e5e7eb.svg>)](README_PT_BR.md)

Taberna is a customizable starting point for personal websites, portfolios, landing pages, and small institutional websites. Text, pages, menus, images, languages, and the footer are configured mainly through JSON and Markdown files.

The project includes a responsive layout, language detection, independent pages, configurable home sections, and an optional carousel. The included content and images are fictional placeholders and must be replaced before publication.

## What it offers

- a responsive home page built from configurable sections;
- independent Markdown pages and internal or external menu links;
- automatic language detection and language selection;
- text, images, highlighted sections, custom footer, and optional carousel;
- a static build that works at a domain root or in a subdirectory.

## Requirements

- [Node.js](https://nodejs.org/) 20.19 or newer, or 22.12 or newer;
- npm, installed together with Node.js;
- a code editor, such as Visual Studio Code.

## Install and run

Download the repository as a ZIP file and extract it, or clone it with Git:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
```

Open a terminal in the project directory and run:

```bash
npm install
npm run dev
```

Open the address shown in the terminal, normally `http://localhost:5173`. Keep the command running while editing the website and press `Ctrl+C` to stop it.

## Customize

The main customization files are:

| What to change                                | Location                                   |
| --------------------------------------------- | ------------------------------------------ |
| Name, description, menu, sections, and footer | `public/config/{language}.json`            |
| Home content and independent pages            | `public/content/{language}/`               |
| Available languages                           | `public/languages.json`                    |
| Logo and browser icon                         | `public/logo.png` and `public/favicon.png` |
| Other images                                  | Any directory inside `public/`             |
| Colors and fonts                              | `src/style.css` and `public/fonts/`        |

Each enabled language has its own complete configuration and content. Repeat content changes in every language that remains available.

### Name, description, and logo

Edit the `site` object in `public/config/{language}.json`:

```json
"site": {
  "title": "My Website",
  "description": "A short description of my website",
  "image": "logo.png"
}
```

Replace `public/logo.png` and `public/favicon.png` to change the default visual identity.

### Home sections

Each item in `sections` creates a block on the home page. A simple section can contain text and an image:

```json
{
  "id": "about",
  "title": "About",
  "subtitle": "Learn more about my work",
  "content": ["First paragraph.", "Second paragraph."],
  "image": "images/about.jpg",
  "invert": false,
  "emphasis": true
}
```

To write the content in Markdown, use `contentFiles` instead of `content`:

```json
{
  "id": "intro",
  "title": "Welcome",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

The example loads `public/content/{language}/intro.md`. Two or more files are displayed side by side. Add a `carousel` object to display them as slides:

```json
{
  "id": "services",
  "title": "Services",
  "contentFiles": ["services/first.md", "services/second.md"],
  "carousel": {
    "autoPlay": true,
    "interval": 5000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 1
  }
}
```

Do not use `content` and `contentFiles` in the same section.

### Section images

The following options apply to the `image` of a home section. They do not affect the logo configured in `site.image`:

```json
{
  "image": "images/about.jpg",
  "imageDimensions": {
    "width": 600,
    "height": 400
  },
  "imageAlign": "center",
  "imagePosition": "top",
  "imageRounded": true
}
```

| Option            | Accepted values                                  | Default                                 | Behavior                                                                         |
| ----------------- | ------------------------------------------------ | --------------------------------------- | -------------------------------------------------------------------------------- |
| `image`           | Image path or allowed URL                        | —                                       | Defines the image displayed beside the section content                           |
| `imageDimensions` | Optional `width` and `height` numbers or strings | Full wrapper width and automatic height | Defines the desktop dimensions independently                                     |
| `imageAlign`      | `"start"`, `"center"`, `"end"`                   | `"center"`                              | Aligns an image horizontally when it is narrower than its wrapper                |
| `imagePosition`   | `"top"`, `"center"`, `"bottom"`                  | `"top"`                                 | Controls the vertical object position and acts as the section alignment fallback |
| `imageRounded`    | `true`, `false`                                  | `true`                                  | Uses `rounded-lg` when enabled and `rounded-none` when disabled                  |

The image wrapper occupies the full section width on mobile and half of it from the `md` breakpoint. On mobile, the image is always forced to the full wrapper width with automatic height. From `md` onward, each `imageDimensions` value is applied independently: an omitted or empty `width` keeps the image at the full wrapper width, while an omitted or empty `height` keeps its height automatic. An empty `imageDimensions` object has no effect. `imageAlign` positions the image when its configured width is narrower than the wrapper, and `object-cover` may crop the source when a configured height changes the image box proportions.

Each dimension accepts a number or a string:

- `40` or `"40"` becomes `40px`;
- `"40px"` uses pixels explicitly;
- `"4rem"` uses root-relative units;
- `"100%"` uses a percentage of the wrapper.

For example, this changes only the desktop width and leaves the height automatic:

```json
"imageDimensions": {
  "width": "40rem"
}
```

`imagePosition` uses `top` by default and controls `object-position` when `object-cover` crops the source. It also provides the vertical section alignment when `contentPosition` is omitted; an explicit `contentPosition` takes precedence.

A section image is rendered only when the section uses `content` or exactly one `contentFiles` item. Sections with two or more content files ignore `image` because they use the multi-item or carousel layout.

Local image paths must point to files inside `public/`, without including `public/` or starting with `/`, for example `images/about.jpg`. Remote images require their origin to be allowed by the `img-src` directive in the Content Security Policy in `index.html`; the default policy allows `https://placehold.co`.

### Content and pages

Markdown files use ordinary text with simple formatting:

```md
# Page title

A paragraph with **bold text**.

- First item
- Second item

[External link](https://example.com)
```

Configure menu items in `public/config/{language}.json`:

```json
"menu": [
  { "label": "Home", "href": "#intro" },
  { "label": "About", "route": "/about" },
  { "label": "GitHub", "href": "https://github.com/" }
]
```

The route `/about` loads `public/content/{language}/about.md`. To use another file, add `"content": "pages/my-page.md"` to the menu item.

Links to internal pages written inside Markdown must include `./#/`:

```md
[About](./#/about)
[First article](./#/articles/article-1)
```

Do not include `.md` in the browser link.

### Footer

The basic footer is configured with:

```json
"footer": {
  "ownership": "© 2026 Your Name"
}
```

To use the included custom footer, keep `"contentFile": "footer.md"` and edit `public/content/{language}/footer.md`. Preserve its HTML structure and replace only the logo, text, and links unless you also intend to change its styles.

### Languages

The available languages are listed in `public/languages.json`:

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

To keep only one language, leave only that language in `available` and `flags`. To add a language, copy an existing file in `public/config/`, copy its directory in `public/content/`, translate both, and add the new code and flag to this manifest.

Keep routes, section IDs, directory names, and file names the same in every language. Translate only visible text.

### Colors and fonts

The main colors are variables in the `:root` block of `src/style.css`:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --text: #f9fafb;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
}
```

Font files are stored in `public/fonts/` and their definitions are at the beginning of `src/style.css`.

### JSON reminders

- Use double quotes around property names and text.
- Separate items with commas, but do not add a comma after the last item.
- Do not add comments to JSON files.
- File names and paths are case-sensitive on most hosting services.

## Publish

Generate the production version:

```bash
npm run build
```

The publishable website is created in `dist/`. Check it locally before publishing:

```bash
npm run preview
```

You can publish in either of these ways:

- upload the contents of `dist/` to a static hosting service;
- connect the repository to Netlify, Vercel, or another service using `npm run build` as the build command and `dist` as the output directory.

Use Node.js 22 in the hosting service when a version must be selected. GitHub Pages also works, but requires a deployment workflow because this repository does not include one.

Run `npm run build` and publish the new `dist/` after every change. Do not edit `dist/` directly because it is replaced on the next build.

### Before publishing

- replace the placeholder text and `placehold.co` images;
- review the logo, favicon, site name, description, links, and footer;
- check every enabled language;
- test the website on desktop and mobile;
- run `npm run build` and `npm run preview`.

## Common problems

- **The page is empty:** check the edited JSON for missing quotes, commas, or brackets.
- **Content is missing:** confirm the file path and selected language, then reload the browser.
- **An image does not load:** place it inside `public/` and use a path such as `images/photo.jpg`.
- **A page shows `Page not found`:** confirm that its Markdown file matches the configured route or `content` value.
- **Published changes do not appear:** rebuild and publish the new contents of `dist/`.

## License

Licensed under the [Apache License 2.0](LICENSE).
