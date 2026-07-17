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
│   ├── style.css              # Tailwind v4 + @font-face + custom @theme + typography plugin
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

Color palette mapped through `@theme` in Tailwind v4:

| Token         | Scale           | Actual usage in the code                                                                                                                                                                                                                                                                                                                                                        |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primary-*`   | neutral-50..950 | `app-background` (800), `app-background-hover` (700), `app-background-header` (900/95), `app-background-footer` (950), `app-text` (100), `app-text-muted` (200), `app-text-body` (300), `app-text-subtle` (400), `app-section-subtitle` (500), `app-border` (700), `app-section-destak` (700), `app-dot-inactive` (600, 500), `app-carousel-btn` (800/80), `app-skeleton` (700) |
| `secondary-*` | emerald-50..950 | `app-text-accent` (500), `app-text-accent-hover` (400), `app-dot-active` (400), `app-ring` (400), `app-carousel-progress` (400)                                                                                                                                                                                                                                                 |

Custom font stacks:

- `--font-sans`: Roboto
- `--font-serif`: Roboto Serif
- `--font-mono`: Roboto Mono
- `--font-fancy`: Italianno (decorative/cursive)

Custom utilities:

- `app-duration` → `duration-300`
- `app-background` → `bg-primary-800`
- `app-background-hover` → `bg-primary-700`
- `app-background-header` → `bg-primary-900/95`
- `app-background-footer` → `bg-primary-950`
- `app-text` → `text-primary-100`
- `app-text-muted` → `text-primary-200`
- `app-text-body` → `text-primary-300`
- `app-text-subtle` → `text-primary-400`
- `app-text-accent` → `text-secondary-500`
- `app-text-accent-hover` → `hover:text-secondary-400`
- `app-border` → `border-primary-700`
- `app-title` → `font-fancy app-text-accent`
- `app-title-adjustment` → `mt-2 leading-[0]`
- `app-section` → `flex flex-col gap-4 md:flex-row md:gap-8`
- `app-section-title` → `text-2xl font-bold`
- `app-section-subtitle` → `text-primary-500 mt-1`
- `app-section-content` → `mt-4 flex flex-col flex-wrap gap-6 md:flex-row`
- `app-section-image` → `w-full rounded-lg object-cover md:w-1/2`
- `app-section-destak` → `bg-primary-700 -mx-6 px-6 py-8`
- `app-container` → `mx-auto w-full max-w-4xl px-6`
- `app-logo` → `h-8 min-h-5 w-8 min-w-5`
- `app-icon-btn` → `app-text-muted hover:app-text-accent app-duration cursor-pointer transition-colors`
- `app-flag-btn` → `app-duration cursor-pointer transition-all hover:scale-110`
- `app-nav-link` → `app-text app-background-hover hover:app-text-accent app-duration rounded-lg px-3 py-2 transition-colors`
- `app-backdrop` → `fixed inset-0 z-60 bg-black/60 backdrop-blur-sm`
- `app-sidebar` → `app-background app-text fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl`
- `app-footer` → `app-border app-background-footer app-text-subtle border-t py-6 px-6 text-sm flex flex-col items-center`
- `app-dot-active` → `bg-secondary-400`
- `app-dot-inactive` → `bg-primary-600 hover:bg-primary-500`
- `app-carousel-btn` → `flex flex-shrink-0 items-center justify-center app-text-muted hover:app-text-accent bg-primary-800/80 app-duration cursor-pointer rounded-full p-2 transition-colors`
- `app-carousel-progress-track` → `stroke-primary-600`
- `app-carousel-progress` → `stroke-secondary-400`
- `app-skeleton` → `bg-primary-700`
- `app-ring` → `ring-secondary-400`

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
- Always use custom utilities (`app-*`) in components. Never use theme colors (`primary-*`, `secondary-*`) directly in templates—except in `style.css`, where the utilities are defined
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

The section's `subtitle` field is optional. If provided, it renders a `<p>` with the `app-section-subtitle` utility below the title.

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

### Section Highlight (`destak`)

The section's optional boolean `destak` field applies a different background using the `primary` (neutral) scale:

- When `true`: applies `app-section-destak` → `bg-primary-700 -mx-6 px-6 py-8`
- `-mx-6` breaks out of the container margin to "stretch" the background
- Available on the `Section` interface in `src/types/config.ts`
- To use it: add `"destak": true` to the desired section's JSON

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
- **Dots**: clicking selects the slide directly; the active dot uses the `app-dot-active` utility
- **Accessibility**: `role="group"`, `aria-label` on the container and buttons, `aria-current` on the active dot
- **One slide**: buttons and dots are not displayed

#### Behavior by `itemsPerView`

**`itemsPerView: 1`** (default):

- 1 slide visible at a time
- Transition: fade using `opacity` and `duration-500`
- Circular navigation (returns to the beginning after reaching the end)
- Dots = number of slides

**`itemsPerView: N`** (N > 1):

- N slides visible side by side
- Transition: horizontal slide using `translateX` and `duration-500`
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

- **`app-title`** on the `<a>` container — fancy font + accent color
- **`app-text-accent-hover`** on the `<a>` container — hover lightens the color (secondary-500 → secondary-400)
- **`app-title-adjustment`** on the `<h1>`/`<h2>` — `mt-2 leading-[0]` to align with the image
- **`app-duration`** — smooth transition (0.3s) on hover
- **Sidebar**: Same approach, `<a href="/">` with `app-title app-text-accent-hover app-duration` + `@click="closeMenu"` to close the menu when clicked
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
- **Rendering**: Sanitized inline HTML with Tailwind (grid, links, etc.); new classes must be present during the build
- **Structure**: Markdown with HTML for layout (column grid)
- **Separator**: Horizontal line between the Markdown content and the ownership/powered-by line
- **Ownership**: `ownership` field in the config (for example, "© 2026 Name")
- **Powered by**: Static text with a link to `https://github.com/mineot/taberna`
- **Links**: Styled through `.app-footer-content :deep(a)` — underline + `app-text-subtle`, changing to `app-text-accent` on hover
- **Layout**: Defined by the Markdown itself; the ownership/powered-by line uses a column on mobile and `space-between` on desktop
- **Example footer.md content**:
  ```html
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div>### Title Description</div>

    <div>### Links - [Home](./#/)</div>
  </div>
  ```
