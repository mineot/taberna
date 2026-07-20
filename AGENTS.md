# Project: Taberna

## What It Is

**Taberna** is a generic personal website/landing page. The project is in its early stages and uses fictional placeholder content. It has JSON-based i18n (pt-br/en-us) with browser language detection. Content will be configured later.

## Stack

- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 5.9.3 (strict mode)
- **Build**: Vite 8.1.1
- **CSS**: Tailwind CSS v4.3.2 (official `@tailwindcss/vite` plugin)
- **Icons**: Lucide Vue (`@lucide/vue` 1.24.0)
- **Markdown**: marked (parse) + DOMPurify (sanitize) + @tailwindcss/typography (prose)
- **Formatting**: Prettier 3.9.5 (single quotes, semicolons, Tailwind CSS plugin)
- **Linting**: ESLint 10.6.0 (eslint-plugin-vue, eslint-config-prettier, typescript-eslint)
- **Tests**: Vitest 4.1.10 + Vue Test Utils 2.4.11 + jsdom 29.1.1
- **Fonts**: Roboto (sans/serif/mono) + Italianno (decorative), self-hosted in `public/fonts/`

## Scripts

```bash
npm run dev        # Vite development server with HMR (http://localhost:5173)
npm run build      # vue-tsc --noEmit && vite build (type-check + build)
npm run preview    # Production build preview (http://localhost:4173)
npm run test       # Unit tests with Vitest
npm run typecheck  # Type-check only (vue-tsc --noEmit)
npm run lint       # ESLint on src/
npm run format     # Prettier on src/ (ts, vue, css)
```

## Current Structure (Working Tree)

```
taberna/
├── .gitignore
├── LICENSE
├── README.md                  # Main documentation in English (en-us)
├── README_PT_BR.md            # Portuguese version of the README
├── index.html                 # SPA shell, font preloads, favicon, CSP
├── package.json               # "taberna", type: module
├── tsconfig.json              # ESNext, strict, bundler resolution
├── vite.config.ts             # Relative base + Vite plugins + Vitest jsdom
├── eslint.config.js           # ESLint flat config (Vue + TypeScript + Prettier)
├── .prettierrc                # singleQuote, semi, Tailwind plugin
├── .vscode/                   # Editor settings
├── public/
│   ├── favicon.png            # 16x16 PNG favicon
│   ├── logo.png               # 512x512 PNG logo
│   ├── fonts/                 # Roboto*, Italianno (self-hosted TTFs)
│   ├── languages.json         # Manifest: available languages + default
│   ├── config/
│   │   ├── pt-br.json         # Complete config in Portuguese
│   │   └── en-us.json         # Complete config in English
│   └── content/
│       ├── pt-br/
│       │   ├── intro.md       # Markdown content in Portuguese
│       │   ├── sobre.md       # About page in Portuguese
│       │   ├── servicos.md    # Services page in Portuguese
│       │   ├── footer.md      # Custom footer in Portuguese
│       │   ├── servicos/      # Individual services
│       │   │   ├── servico-1.md
│       │   │   └── servico-2.md
│       │   └── depoimentos/   # Customer testimonials
│       │       ├── depoimento-1.md
│       │       ├── depoimento-2.md
│       │       ├── depoimento-3.md
│       │       ├── depoimento-4.md
│       │       ├── depoimento-5.md
│       │       ├── depoimento-6.md
│       │       ├── depoimento-7.md
│       │       ├── depoimento-8.md
│       │       ├── depoimento-9.md
│       │       └── depoimento-10.md
│       └── en-us/
│           ├── intro.md       # Markdown content in English
│           ├── about.md       # About page in English
│           ├── services.md    # Services page in English
│           ├── footer.md      # Custom footer in English
│           ├── services/      # Individual services
│           │   ├── service-1.md
│           │   └── service-2.md
│           └── testimonials/  # Customer testimonials
│               ├── testimonial-1.md
│               ├── testimonial-2.md
│               ├── testimonial-3.md
│               ├── testimonial-4.md
│               ├── testimonial-5.md
│               ├── testimonial-6.md
│               ├── testimonial-7.md
│               ├── testimonial-8.md
│               ├── testimonial-9.md
│               └── testimonial-10.md
├── src/
│   ├── main.ts                # Entry point — mounts Vue on #app + router
│   ├── App.vue                # Root — layout (header/sidebar/footer) + router-view + footer Markdown
│   ├── env.d.ts               # Types for .vue files
│   ├── style.css              # Tailwind v4 + fonts + semantic theme tokens/utilities + typography plugin
│   ├── components/
│   │   ├── section-carousel.vue      # Accessible carousel with autoplay, buttons, and dots
│   │   └── section-carousel.test.ts  # Configuration and reduced-motion tests
│   ├── router/
│   │   └── index.ts           # Vue Router — routes /, /languages, and /:slug
│   ├── views/
│   │   ├── HomeView.vue       # Home — sections from the config
│   │   ├── LanguagesView.vue  # Language selection page (flag grid)
│   │   └── PageView.vue       # Page — loads Markdown by slug
│   ├── composables/
│   │   ├── useConfig.ts       # Safe concurrent config fetching by language
│   │   ├── useConfig.test.ts  # Config error and concurrency tests
│   │   ├── useLocale.ts       # Language detection + complete fallback
│   │   ├── useLocale.test.ts  # Language fallback test
│   │   ├── useMarkdown.ts     # Fetch + parse Markdown files with caching
│   │   └── useSwitchLocale.ts # Language switching (loadConfig + setLocale + navigate)
│   ├── utils/
│   │   ├── links.ts           # HTTP/HTTPS allowlist for external links
│   │   ├── links.test.ts      # Link validation tests
│   │   ├── meta.ts            # Meta description updates
│   │   ├── meta.test.ts       # Meta description creation and update tests
│   │   └── paths.ts           # Public paths relative to Vite's base
│   └── types/
│       └── config.ts          # Types: AppConfig, Section, CarouselConfig, MenuItem, SiteConfig, FooterConfig, VerticalPosition
└── dist/                      # Production build
```

## Theme System (style.css)

`@theme` defines only the custom font stacks. Application colors, opacity, and transition durations are centralized as semantic custom properties in `:root`; components consume them through `app-*` utilities instead of depending on palette-specific Tailwind classes.

Current semantic tokens:

| Token                         | Default value | Purpose                                      |
| ----------------------------- | ------------- | -------------------------------------------- |
| `--background`                | `neutral-800` | Main application and sidebar background      |
| `--background-hover`          | `neutral-700` | Interactive background on hover              |
| `--background-emphasis`       | `neutral-700` | Emphasized section background                |
| `--footer-background`         | `neutral-950` | Footer background                            |
| `--header-background`         | `neutral-950` | Header background base                       |
| `--header-background-opacity` | `85%`         | Header background opacity                    |
| `--backdrop`                  | `neutral-900` | Offcanvas backdrop and Markdown code blocks  |
| `--backdrop-opacity`          | `80%`         | Offcanvas backdrop opacity                   |
| `--text`                      | `neutral-100` | Main/high-contrast text                      |
| `--text-body`                 | `neutral-300` | Body and Markdown text                       |
| `--text-muted`                | `neutral-400` | Muted/subtle text                            |
| `--emphasis`                  | `neutral-500` | Emphasized text, links, titles, and controls |
| `--emphasis-hover`            | `neutral-300` | Emphasized hover state                       |
| `--error`                     | `neutral-400` | Error text                                   |
| `--border`                    | `neutral-700` | Borders and Markdown separators              |
| `--ring`                      | `neutral-400` | Selected-language ring                       |
| `--skeleton`                  | `neutral-700` | Skeleton loading blocks                      |
| `--dot`                       | `neutral-600` | Inactive carousel dots                       |
| `--dot-inactive`              | `neutral-500` | Inactive carousel dot hover                  |
| `--dot-active`                | `neutral-400` | Active carousel dot                          |
| `--progress-track`            | `neutral-600` | Carousel progress-ring track                 |
| `--progress`                  | `neutral-400` | Carousel progress-ring indicator             |
| `--duration`                  | `300ms`       | Standard application transitions             |
| `--duration-carousel`         | `500ms`       | Carousel slide/fade transitions              |

Custom font stacks:

- `--font-sans`: Roboto
- `--font-serif`: Roboto Serif
- `--font-mono`: Roboto Mono
- `--font-fancy`: Italianno (decorative/cursive)

Custom utilities:

- `app-duration` → transition duration from `--duration`
- `app-background` → background from `--background`
- `app-background-hover` → background from `--background-hover`; apply it with `hover:` when hover-only behavior is required
- `app-text` → color from `--text`
- `app-text-muted` / `app-text-subtle` → color from `--text-muted`
- `app-text-body` → color from `--text-body`
- `app-text-emphasis` → color from `--emphasis`
- `app-text-emphasis-hover` → color from `--emphasis-hover`; apply it with `hover:` when hover-only behavior is required
- `app-ring` → ring color from `--ring`
- `app-border` → border color from `--border`
- `app-error` → color from `--error`
- `app-skeleton` → background from `--skeleton`
- `app-backdrop` → `--backdrop` mixed with transparency using `--backdrop-opacity`
- `app-powered` → emphasized project credit link with the emphasized hover color
- `app-markdown` → inverted Tailwind Typography variables mapped to the semantic tokens, including emphasized links with a hover transition
- Markdown containers use `max-w-none` so rendered content can occupy the full width of its section or carousel slide
- `app-title` → fancy font, emphasized color, emphasized hover color, and `--duration`
- `app-title-adjustment` → `mt-2 text-3xl md:text-5xl` with zero line height
- `app-section-image` → `w-full rounded-lg object-cover md:w-1/2`
- `app-logo` → `h-8 min-h-5 w-8 min-w-5 md:h-12 md:w-12` with `--duration`
- `app-header` → `--header-background` mixed with transparency using `--header-background-opacity`
- `app-header-link` → main text, emphasized hover color, and `--duration`
- `app-sidebar` → `app-background app-text`
- `app-sidebar-link` → main text with background and text emphasis on hover
- `app-footer` → semantic border, footer background, and subtle text
- `app-language-button` → application background, hover background, and semantic border
- `app-language-button-text` → `app-text-body`
- `app-language-button-selected` → `app-ring`
- `app-section-title` → `app-text`
- `app-section-subtitle` → `app-text-subtle`
- `app-section-emphasis` → background from `--background-emphasis`
- `app-section-carousel-transition` → transition duration from `--duration-carousel`
- `app-section-carousel-btn` → muted text with emphasized text on hover
- `app-section-carousel-progress-track` → stroke from `--progress-track`
- `app-section-carousel-progress` → stroke from `--progress`
- `app-section-dot-active` → background from `--dot-active`
- `app-section-dot-inactive` → background from `--dot`, changing to `--dot-inactive` only on devices that support hover

### Footer Custom Styles

The custom footer content uses a dedicated class hierarchy in `style.css`:

- `.footer`: responsive grid with one column by default and three equal columns from the `md` breakpoint
- `.footer-container`: first column containing the brand and summary
- `.footer-brand`: horizontally aligns the logo and title
- `.footer-logo`: 48 × 48 pixel image with `object-cover`
- `.footer-title`: decorative title using `app-title`
- `.footer-summary`: small text using `app-text-subtle`
- `.footer-links`: link columns, horizontally centered within their grid tracks from the `md` breakpoint
- `.footer-links > h4`: link-column headings
- `.footer-links > ul`: vertical lists without markers or default spacing
- `.footer-links a`: underlined links with `--duration` and the emphasized color on hover

The child combinators (`>`) require the footer Markdown files to preserve the documented direct-child hierarchy.

Custom z-index utilities (defined in the global `<style>` block in App.vue, not in style.css):

- `.z-60` → `z-index: 60` (mobile menu backdrop)
- `.z-70` → `z-index: 70` (mobile menu sidebar)

## Important Settings

### tsconfig.json

- Extends: `@vue/tsconfig/tsconfig.dom.json`
- Target: ESNext, Module: ESNext, moduleResolution: "bundler"
- Strict: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- Other: `noEmit`, `isolatedModules`, `allowImportingTsExtensions`, `resolveJsonModule`, `jsx: "preserve"`, `skipLibCheck`

### vite.config.ts

- Plugins: `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Relative base (`./`) for deployment at the root or in subdirectories
- No custom aliases

### .prettierrc

- `singleQuote: true`, `semi: true`
- `prettier-plugin-tailwindcss` plugin for automatic class sorting

## What Does NOT Exist Yet

- State management (Pinia/Vuex)
- CI/CD (GitHub Actions, etc.)
- Docker
- `.env` file
- Open Graph, per-page metadata, and SEO prerendering

## Notes

- Site content is stored in JSON (`public/config/`) and Markdown (`public/content/`) files

## Security

### HTML Sanitization (XSS)

Everything involving dynamic HTML is sanitized before rendering:

| Where                                 | What                               | How                                                    |
| ------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| **Markdown content** (sections/pages) | HTML generated by `marked.parse()` | `DOMPurify.sanitize()` before caching + `v-html`       |
| **Custom footer**                     | HTML from the footer Markdown      | Same `useMarkdown` pipeline (DOMPurify)                |
| **External menu links**               | `href` values on `<a>` tags        | `URL` with an exclusive `http:` and `https:` allowlist |
| **Route slug**                        | `route.params.slug`                | Regex `[^a-zA-Z0-9\-\/]` removes invalid characters    |
| **Language switching**                | Value passed to `setLocale()`      | Validates against the manifest's `available` array     |

### Content Security Policy (CSP)

Meta tag in `index.html`:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://placehold.co data:; font-src 'self';
```

- `script-src 'self'`: blocks inline and external scripts
- `style-src 'self' 'unsafe-inline'`: allows Tailwind CSS (required inline utility classes)
- `img-src 'self' https://placehold.co data:`: local images + placeholder + data URIs
- `font-src 'self'`: self-hosted fonts only

**Limitations**: A CSP delivered through a meta tag does not support `nonce` or `hash` for `unsafe-inline`. For a strict production policy, consider delivering the CSP through an HTTP header (Vercel/Netlify config).

### Accessibility Linting

- `vue/no-v-html` is configured as `warn` in ESLint (allowed after sanitization with DOMPurify)
- Components use ARIA attributes: `aria-label`, `aria-expanded`, `role="dialog"`, `aria-modal`, `aria-current`

## Composables

### Global State (Singleton)

`useConfig` and `useLocale` use module-scoped `ref`s (outside the exported function). Every call to `useConfig()` returns the same reactive instance. This is the Vue 3 pattern for global state without a store, but it can cause confusion in tests.

### useLocale

- **Fallback**: If `languages.json` fails, initializes `pt-br`, its flag, available languages, localStorage, and `document.lang`.
- **`setLocale(lang)`**: Validates against `available` and returns a `boolean` indicating whether the language was accepted.

### useConfig

- **Loading and error**: Exposes separate states to prevent an infinite skeleton on initial failures.
- **Concurrency**: Cancels the previous request with `AbortController` and ignores stale responses.
- **Return value**: `loadConfig(locale)` reports whether the requested config was applied successfully.

### useMarkdown

- **Cache**: Module-scoped `Map<string, string>` (not a `ref`). It is never invalidated. Suitable for static content.
- **No loading ref**: The `loading` ref was removed because it is unreliable across concurrent calls. `PageView` maintains its own local `pageLoading`.
- **Sanitization**: HTML generated by `marked.parse()` passes through `DOMPurify.sanitize()` before being cached/rendered with `v-html`.

### useSwitchLocale

Composable that orchestrates language switching: validation + `loadConfig` + `setLocale` + navigation to the home page. Exposes `switching` to disable concurrent selections in `LanguagesView`.

## Conventions

- Composition API with `<script setup lang="ts">`
- TypeScript strict mode
- Tailwind CSS v4 through `@import 'tailwindcss'` (CSS-first config, no tailwind.config.js)
- Lowercase hyphenated component names: `section-carousel.vue`
- Scoped styles (App.vue uses `@reference` to access the theme from style.css)
- Always use custom utilities (`app-*`) for application colors in components. Never use Tailwind palette color classes directly in templates; semantic color values belong in the `:root` tokens in `style.css`
- Do not add code comments unless requested
- Site content belongs in JSON (`public/config/`) and Markdown (`public/content/`) files
- **ALWAYS update this file (AGENTS.md) after any significant code change**

## Pending FIXMEs

- Configure real content in the config and Markdown files

## Git

- Branches: `master` (current), `backup`
- Remote: `origin` (github.com/mineot/taberna)

## i18n System

### Flow

1. `useLocale()` detects the language: localStorage → navigator.languages → languages.json.default
2. `useConfig(locale)` fetches `public/config/{locale}.json`
3. `App.vue` updates `document.documentElement.lang`, `document.title`, and the meta description (through a watch on the config)
4. The flag switcher in the header/sidebar navigates to `/languages` through `<router-link>`. In `LanguagesView`, `useSwitchLocale` orchestrates the switch:
   - validates the language against `available`
   - `await loadConfig(lang)` — loads the config with stale-response protection
   - `setLocale(lang)` — updates the locale + localStorage only after the config loads
   - `router.push('/')` — redirects to the home page to avoid page not found
5. `HomeView` watches `[loaded, config, locale]`, isolates failures by file, and ignores stale responses

### Hardcoded Text

Editorial content in `public/config/{locale}.json` and `public/content/{locale}/` is not considered hardcoded: it is already externalized and has language-specific versions.

The values below are intentionally hardcoded and must remain outside the translation system:

| File          | Value        | Reason                                                     |
| ------------- | ------------ | ---------------------------------------------------------- |
| `index.html`  | `lang="en"`  | Initial document language, replaced by the detected locale |
| `index.html`  | `Taberna`    | Initial/fallback title before the config loads             |
| `src/App.vue` | `Powered by` | Fixed prefix for the project credit in the footer          |
| `src/App.vue` | `Mineot`     | Fixed proper name of the author in the credit link         |

The text below is still temporarily hardcoded and must be translated later:

| File                                             | Text                        | Context                                                  |
| ------------------------------------------------ | --------------------------- | -------------------------------------------------------- |
| `src/App.vue`                                    | `Menu`                      | `aria-label` for the hamburger button and sidebar dialog |
| `src/App.vue`                                    | `Close menu`                | `aria-label` for the sidebar close button                |
| `src/components/section-carousel.vue`            | `Previous slide`            | `aria-label` for the previous navigation button          |
| `src/components/section-carousel.vue`            | `Next slide`                | `aria-label` for the next navigation button              |
| `src/components/section-carousel.vue`            | `Slide {n}`                 | Dynamic `aria-label` for the indicators                  |
| `src/components/section-carousel.vue`            | `Carousel: {atual}/{total}` | Dynamic `aria-label` for the carousel group              |
| `src/components/section-carousel.vue`            | `Pause carousel`            | `aria-label` for the pause control                       |
| `src/components/section-carousel.vue`            | `Play carousel`             | `aria-label` for the playback control                    |
| `src/views/PageView.vue`                         | `Page not found`            | Visible message when a page's Markdown cannot be loaded  |
| `src/composables/useConfig.ts`                   | `Unknown error`             | Error fallback that may be displayed by `App.vue`        |
| `src/composables/useConfig.ts`, `useMarkdown.ts` | `HTTP {status}`             | Technical message generated when a request fails         |
| `src/composables/useMarkdown.ts`                 | `Not found`                 | Technical error when detecting the SPA HTML fallback     |

Other literal values—such as internal route names, paths, media queries, `localStorage` keys, URLs, standardized ARIA values, and the `pt-br` locale fallback—are technical constants, not UI text. There is currently no UI message dictionary; translating the pending items will require adding them to the i18n system or the per-language configs.

### Manifest (`public/languages.json`)

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

### Per-Language Configs

Each `public/config/{locale}.json` is complete and independent. Untranslated data (hrefs, ids, URLs, images) is the same in all languages.

### Markdown Content

Sections can use Markdown files through the `contentFiles` field (an array of strings):

- Files in `public/content/{locale}/*.md`
- Fetched at runtime through `useMarkdown()` with caching
- Parsed with `marked`, rendered with `v-html` + the `prose` class (Tailwind Typography)
- **Sanitization**: HTML generated by `marked.parse()` passes through `DOMPurify.sanitize()` before being rendered with `v-html`.

### Content Rules by Section

Each section follows strict rules based on its content type:

| Attribute                 | Image | content (text) | carousel |
| ------------------------- | ----- | -------------- | -------- |
| `content` (text)          | ✅    | —              | ❌       |
| `contentFiles` (1 item)   | ✅    | ❌             | ❌       |
| `contentFiles` (2+ items) | ❌    | ❌             | ✅       |

**`content` (plain text):**

- Array of strings rendered as `<p>` elements
- May have an `image` beside it
- Ignores `contentFiles` and `carousel`

**`contentFiles` with 1 item:**

- Renders 1 Markdown file
- May have an `image` beside it
- Ignores `content` and `carousel`

**`contentFiles` with 2+ items:**

- Renders multiple Markdown files side by side (stacks on mobile)
- Ignores `image` and `content`
- May use `carousel` to display them as slides

### Pages (Routes)

Each `/:slug` route loads an individual Markdown file:

- File: `public/content/{locale}/{slug}.md`
- If `content` is defined on the menuItem → uses that value as the file name
- If it is not defined → uses the route slug (for example, `/sobre` → `sobre.md`)
- **Slug sanitization**: Regex `[^a-zA-Z0-9\-\/]` removes special characters before using the slug
- Rendered as `<article class="prose prose-invert">`
- Skeleton loader while loading
- "Page not found" error message if the file does not exist

### Vertical Positioning

The `imagePosition` field controls the image's vertical alignment in the section:

| Value      | Behavior                                  |
| ---------- | ----------------------------------------- |
| `"top"`    | Image aligned to the top (`items-start`)  |
| `"center"` | Image centered (default)                  |
| `"bottom"` | Image aligned to the bottom (`items-end`) |

Defaults to `"center"` if omitted.

The `contentPosition` field controls the content's vertical alignment in the section:

| Value      | Behavior                                    |
| ---------- | ------------------------------------------- |
| `"top"`    | Content aligned to the top (`items-start`)  |
| `"center"` | Content centered (default)                  |
| `"bottom"` | Content aligned to the bottom (`items-end`) |

Defaults to `"center"` if omitted.

**Precedence**: `contentPosition` takes precedence over `imagePosition` for flex alignment. When `contentPosition` does not exist, `imagePosition` also acts as the alignment fallback. Separately, `imagePosition` controls image cropping (`object-position`). Both use the `VerticalPosition` type in `src/types/config.ts`.

### Section Title (Optional)

The section's `title` field is optional. If omitted, the `<h2>` is not rendered.

### Section Subtitle (Optional)

The section's `subtitle` field is optional. If provided, it renders a `<p>` with the `app-section-subtitle` utility plus component-level spacing and font-size classes below the title.

### Layout Reversal (`invert`)

The section's optional boolean `invert` field reverses the flex order of the image and content:

- When `true`: applies `md:flex-row-reverse` — image on the left, content on the right
- When `false` or absent: normal layout (content on the left, image on the right)

### Site Configuration (`SiteConfig`)

Fields of the `site` object in the config JSON:

| Field         | Type     | Required | Description                                                   |
| ------------- | -------- | -------- | ------------------------------------------------------------- |
| `title`       | `string` | No       | Site title (header/sidebar and `document.title`)              |
| `description` | `string` | Yes      | Updates `<meta name="description">` when the config is loaded |
| `image`       | `string` | No       | URL of the site image (displayed next to the title)           |

### Section Emphasis (`emphasis`)

The section's optional boolean `emphasis` field applies the semantic emphasized background:

- When `true`: applies `app-section-emphasis`, which uses `--background-emphasis`, plus the component-level `-mx-6 px-6 py-8` layout classes
- `-mx-6` breaks out of the container margin to "stretch" the background
- Available on the `Section` interface in `src/types/config.ts`
- To use it: add `"emphasis": true` to the desired section's JSON

### Section Carousel

The section's optional `carousel` object enables carousel mode for the content:

- When defined, the content (`contentFiles` or `content`) is displayed as slides with a transition
- The section image remains static (outside the carousel)
- Component: `src/components/section-carousel.vue`

#### Configuration (`CarouselConfig`)

| Field          | Type      | Default | Description                                                  |
| -------------- | --------- | ------- | ------------------------------------------------------------ |
| `autoPlay`     | `boolean` | `true`  | Automatically advances the slides                            |
| `interval`     | `number`  | `5000`  | Milliseconds between slides                                  |
| `buttons`      | `boolean` | `true`  | Shows previous/next arrows (Lucide ChevronLeft/ChevronRight) |
| `dots`         | `boolean` | `true`  | Shows position indicators (dots)                             |
| `itemsPerView` | `number`  | `1`     | Number of items visible at the same time                     |

All fields are optional. Usage example:

```json
{
  "id": "depoimentos",
  "contentFiles": ["depo-1.md", "depo-2.md", "depo-3.md"],
  "carousel": {
    "autoPlay": true,
    "interval": 4000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 3
  }
}
```

#### Behavior

- **Autoplay**: starts when the component mounts and advances slides automatically
- **Interaction pause**: autoplay pauses during hover or focus and resumes when the interaction ends
- **Persistent pause**: the Play/Pause control can stop autoplay
- **Progress ring**: surrounds the Play/Pause control, uses `interval`, freezes during pauses, and restarts after manual navigation
- **Visibility**: pauses when the tab is in the background
- **Reduced motion**: disables autoplay with `prefers-reduced-motion: reduce`
- **Previous/next buttons**: fixed at the sides of the content (flex layout). If `buttons: false`, the content takes up 100%
- **Dots**: clicking selects the slide directly; the active dot uses the `app-section-dot-active` utility
- **Accessibility**: `role="group"`, `aria-label` on the container and buttons, `aria-current` on the active dot
- **One slide**: buttons and dots are not displayed

#### Behavior by `itemsPerView`

**`itemsPerView: 1`** (default):

- 1 slide visible at a time
- Transition: fade using `opacity` and `app-section-carousel-transition` (`--duration-carousel`, 500ms by default)
- Circular navigation (returns to the beginning after reaching the end)
- Dots = number of slides

**`itemsPerView: N`** (N > 1):

- N slides visible side by side
- Transition: horizontal slide using `translateX` and `app-section-carousel-transition` (`--duration-carousel`, 500ms by default)
- Each slide occupies `100% / N` of the available space
- Page-based navigation (advances/returns N items per click)
- Dots = `ceil(slides.length / N)` (available positions)
- Circular navigation (after the last page, returns to the beginning; before the first, returns to the end)

#### Precedence

If `carousel` is defined, it takes precedence over static content rendering. The component is rendered only if content exists (`contentFiles` or `content`).

### Mobile Menu (Offcanvas)

On small screens (`< md`), the navigation menu is replaced by a hamburger icon (Lucide `Menu`). When clicked:

- Opens a sidebar from the right with the site title + image + menu + language switcher
- Dark backdrop with blur behind it
- Closes when the backdrop, X icon, or any link is clicked
- Slide-in/slide-out animation through `<Transition>`
- Teleports the sidebar to `<body>` through `<Teleport>`
- Accessibility: initial focus and focus trapping, close on `Escape`, focus restoration, scroll locking, and dialog ARIA attributes

### Desktop Menu with Many Items (> 4)

When the menu has more than 4 items, the header adapts at all screen sizes:

- The inline `<nav>` is not rendered (at any resolution)
- The language flag is not displayed in the header
- The hamburger appears on **all** screen sizes (including desktop)
- Clicking it opens the same offcanvas sidebar
- The sidebar works at all resolutions (without `md:hidden`)

### Sidebar (All Resolutions)

The sidebar now works on desktop and mobile:

- `app-backdrop` and `app-sidebar` do not have `md:hidden`
- With > 4 menu items, the hamburger appears on desktop and opens the sidebar
- Sidebar structure:
  - **Header** (`shrink-0`): title + image + X button
  - **Menu** (`flex-1 overflow-y-auto`): the only scrollable section
  - **Language footer** (`shrink-0`): fixed at the bottom, does not scroll
- Language link in the footer: shows the current flag + code (for example, "🇧🇷 pt-br") and links to `/languages`

### Conditional Behavior (Menu + Languages)

The header and sidebar adapt to the content:

- **`menu: []` (empty array)**: `<nav>` is not rendered in the header or sidebar
- **Only one language**: the flag switcher is not displayed
- **No menu AND only one language**: the hamburger is not displayed (sidebar is inaccessible)
- **Hamburger appears**: when there is a menu OR more than one language

### Transitions

- **Sidebar/Backdrop**: `<Transition name="sidebar">` and `<Transition name="backdrop">` in the mobile menu (slide + opacity)
- **Title**: `:key="locale"` on the h1 with `app-duration` — smooth fade (0.3s) when switching languages

### Site Title (Header + Sidebar)

The site title (image + text) is an `<a href="/">` link with:

- **`app-title`** on the link container — fancy font, emphasized color, lighter emphasized color on hover, and the semantic transition duration
- **`app-title-adjustment`** on the `<h1>`/`<h2>` — `mt-2 text-3xl md:text-5xl` with zero line height to size and align the title
- **`app-duration`** — smooth transition (0.3s) on hover
- **Sidebar**: Same approach, using `app-title app-duration` plus `@click="closeMenu"` to close the menu when clicked
- **Optional**: The `title` field in the config is optional—if absent, `<h1>`/`<h2>` are not rendered (allows using only an image)

### Site Image (Header + Sidebar)

The `site.image` field in the config controls the image displayed next to the title:

- **Optional**: If undefined or empty, nothing is displayed
- **Size**: `h-8 w-8` (32px) on mobile, `md:h-12 md:w-12` (48px) on desktop, `min-h-5 min-w-5` (20px minimum)
- **Shape**: `app-logo` controls dimensions only; it does not apply rounding or image cropping
- **Position**: To the left of the title, with `gap-3` spacing
- **Sidebar**: Same mobile size (`h-8 w-8`) and `text-3xl` title (same as the mobile header)

## Routing System (Vue Router)

### Structure

| Route        | Component           | Content                                                  |
| ------------ | ------------------- | -------------------------------------------------------- |
| `/`          | `HomeView.vue`      | Sections from the JSON config                            |
| `/languages` | `LanguagesView.vue` | Grid of available languages (flag + code)                |
| `/:slug`     | `PageView.vue`      | Markdown loaded from `public/content/{locale}/{slug}.md` |

### Configuration

- **Hash mode**: `createWebHashHistory(import.meta.env.BASE_URL)` to work without rewrites on static hosting and in subdirectories
- **Catch-all**: the `/:pathMatch(.*)*` route redirects to `/`
- **Scroll behavior**: supports hash anchors, saved positions, and scroll to top
- **File**: `src/router/index.ts`

### MenuItem (Interface)

```ts
export interface MenuItem {
  label: string;
  href?: string; // anchor link (e.g., "#sobre")
  route?: string; // Vue Router path (e.g., "/sobre")
  content?: string; // Markdown file override (e.g., "sobre.md")
}
```

### Menu Behavior

- **`route` defined** → renders `<router-link :to="item.route">`
- **`href` with `#`** (anchor) → renders `<router-link :to="'/' + item.href">` — navigates to `/`, and `scrollBehavior` smoothly scrolls to the anchor
- **External `href`** (http/https) → opens in a new tab with `noopener noreferrer`; other protocols are rejected by an allowlist
- **`route` + `content`** → the route uses `content` as the Markdown file name
- **Both defined** → `route` takes precedence

### Content Resolution (PageView)

If `content` is not defined on the menuItem, the system fetches `{slug}.md`:

- Route `/sobre` → fetches `public/content/{locale}/sobre.md`
- Route `/servicos` → fetches `public/content/{locale}/servicos.md`
- With `"content": "custom.md"` → fetches `public/content/{locale}/custom.md`

### Page Content

Markdown files in `public/content/{locale}/*.md`:

- Fetched at runtime through `useMarkdown()` with caching
- Parsed with `marked`, rendered as `<article class="prose prose-invert">`
- Skeleton loader while loading
- "Page not found" error message if the file does not exist
- **SPA fallback protection**: `useMarkdown` checks the response's `Content-Type`—if it is `text/html` (Vite returns `index.html` for missing files), it throws an error instead of rendering raw HTML

### Custom Footer

The `contentFile` field in the `footer` config allows loading Markdown content into the footer:

- **Optional**: If undefined, the footer shows only ownership + "Powered by Mineot"
- **File**: `public/content/{locale}/{contentFile}` (for example, `footer.md`)
- **Rendering**: The Markdown is parsed and sanitized by `useMarkdown`, then inserted with `v-html` into a `.container`
- **Typography**: The footer container does not use `prose`, `prose-invert`, `app-markdown`, or a dedicated `app-footer-markdown` utility
- **Presentation**: Footer content is styled through the global `.footer` hierarchy in `src/style.css`
- **Structure**: HTML wrappers use the CSS classes `.footer`, `.footer-container`, `.footer-brand`, `.footer-logo`, `.footer-title`, `.footer-summary`, and `.footer-links`; Markdown syntax is used only for content such as headings and lists
- **Separator**: Horizontal line between the Markdown content and the ownership/powered-by line
- **Ownership**: `ownership` field in the config (for example, "© 2026 Name")
- **Powered by**: Static text with a link to `https://github.com/mineot/taberna`
- **Links**: Styled centrally through `.footer-links a` in `src/style.css`
- **Layout**: Three equal columns from the `md` breakpoint and one stacked column on smaller screens; the ownership/powered-by line uses a column on mobile and `space-between` on desktop
- **Example footer.md content**:
  ```html
  <div class="footer">
    <div class="footer-container">
      <div class="footer-brand">
        <img src="logo.png" alt="Taberna" class="footer-logo" />
        <span class="footer-title">Taberna</span>
      </div>
      <span class="footer-summary">Description</span>
    </div>
    <div class="footer-links">#### Quick Links - [Home](/)</div>
    <div class="footer-links">#### Social - [GitHub](https://github.com/)</div>
  </div>
  ```
