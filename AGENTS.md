# Taberna — AI Development Guide

Operational source of truth for AI assistants working in this repository. It
describes the **current** working tree: architecture, conventions, data
contracts, security boundaries, and the known gaps that must not be mistaken
for finished features.

Reviewed against the working tree on 2026-10-07 through source inspection and
HTML fragment parsing with jsdom. Typecheck, lint, test discovery, and a
production build were run during the same session (results in section 4).
Browser interactions were not exercised. When code and this file disagree,
establish current behavior from the code and update this file within the approved scope.
Development requirements below are distinct from implemented behavior; known
gaps identify where the code does not yet meet those requirements.

## 1. Mandatory Working Agreement

### Approval before implementation

- Do not implement, edit, create, delete, rename, install, or format project
  files unless the user explicitly approved the implementation.
- Inspecting, explaining, reviewing, diagnosing, researching, suggesting, and
  planning are read-only operations. Present findings and wait for approval.
- A discussion, an accepted idea, an item in `TODO.md`, or an obvious fix is
  not approval.
- "implement", "apply", "change", "fix", "create", "rewrite" count as approval,
  but only for the requested scope.
- After approval, do the supporting work that scope requires, including
  proportionate tests and the corresponding `AGENTS.md` update.
- If requirements are ambiguous, or alternatives would materially change the
  result, explain the options and wait for a decision.
- Never widen an approved change into unrelated cleanup or refactoring.

### `TODO.md` is user-owned and read-only

- Never edit, reorder, delete, check off, or append to `TODO.md`.
- Items there are reminders for the user, not instructions, and never authorize
  implementation.

### Keep this file current

- Update `AGENTS.md` whenever an approved change makes a statement here
  incomplete or inaccurate: architecture, directories, dependencies, commands,
  data contracts, custom-element registry, theme tokens, security boundaries, or
  conventions.
- Describe the current working tree only. Remove obsolete guidance instead of
  accumulating historical notes, and never document planned behavior as if it
  already existed.
- Content-only or editorial changes do not require an update unless they alter a
  documented contract.

### Keep the README minimal

- `README.md` is the only maintained README and is written in US English (en-US).
  Do not recreate a Portuguese version or add translation links.
- Keep it concise: project overview, key features, technologies, getting started,
  build and publishing, contributions, optional financial support, and license.
  Keep architecture, contracts, and agent guidance here; detailed usage belongs
  on the site. Website and financial-support URLs have not yet been supplied;
  add them when the user provides them, without inventing placeholder links.
- Update it when an approved change affects those topics; do not expand it
  into a configuration guide, component catalog, or troubleshooting manual.

### Tests

- There is currently **no test suite**; results and the empty setup file are
  documented in sections 4 and 11.2.
- When tests are added or an approved change needs coverage, colocate focused
  `*.test.ts` files next to the code and use the existing Vitest config
  (jsdom + `src/test/setup.ts`).
- Never weaken or delete a test to make a change pass.
- If an approved change does not warrant tests, say so explicitly in the final
  report.

## 2. Project Overview

Taberna is a static, client-only website foundation for personal sites,
portfolios, and landing pages. A Vue 3 application shell renders HTML fragments
that live under `public/content/{locale}/`, so editorial content is changed
without touching application code.

Implemented architecture:

- Site language configuration lives in one manifest:
  `public/config/languages.json`. There is no per-locale site manifest,
  config store, or home/footer path configuration.
- Layout regions are wired **in code** by `src/AppTemplate.vue`, which assigns
  fragments, inline markup, or components to the template slots.
- The dynamic content page (`src/pages/slug.page.vue`) passes the current route
  slug to `tbc-flux`, loading `.htm` fragments from the active locale directory.
- Fetched editorial HTML is rendered through `v-html` **without sanitization**
  and must be treated as trusted author content. The
  `dompurify` dependency is installed but unused. See section 9.

Scope and limitations:

- No backend, database, authentication, `.env` contract, CI/CD, or deployment
  workflow.
- Client-only rendering: no SSR, no prerendering, no per-route metadata.
- Shell UI strings (error messages, carousel ARIA labels, "Powered by Mineot")
  are hardcoded English in components/stores. Only editorial content and
  language names/flags are localized. `index.html` keeps `lang="en"`, title,
  and description static across locale changes.

### Editorial purpose and current content

| Content | Current state and purpose |
| --- | --- |
| `pt-br/home.htm` | HTML project overview; keep detailed instructions and code examples in the internal guides. |
| `pt-br/pages/howwork.htm` | HTML guide: project organization, content, routes, languages, development, and publishing. |
| `pt-br/pages/themes.htm` | HTML guide: theme variables and customization; remaining Markdown converted using the author's existing markup patterns. |
| `pt-br/pages/templates.htm` | HTML guide: layout, slots, and template integration; Vue examples are escaped text. |
| `pt-br/pages/components.htm` | HTML guide: component attributes, examples, and icon registration; HTML/Vue samples are escaped text. |
| `pt-br/pages/utilities.htm` | HTML guide: utility classes and usage examples; code samples are escaped text. |
| `pt-br/pages/support.htm` | Financial-support page with Bitcoin, dollar/euro, and Pix subsections; temporary `placehold.co` images and pending payment details. |
| `pt-br/pages/contribute.htm` | Contribution page highlighting the project's early stage, development, ideas/bug reports, documentation/translations, and numbered GitHub contribution steps. |
| `pt-br/complements/` | Header and sidebar navigation link to the guides. The footer groups home and guide links under “Conheça” and “Personalize”, participation links under “Participe”, and a closing phrase. |
| `en-us/home.htm` | English translation of the Portuguese overview. |
| `en-us/pages/` | English counterparts of the seven Portuguese guides: howwork, themes, templates, components, utilities, support, and contribute. |
| `en-us/complements/` | English shell fragments: brand, header-nav, sidebar-nav, footer, and copyright. The menus and footer mirror the Portuguese grouping and links. |

Paths above are relative to `public/content/`. Bundled `logo.png`, `texture.png`,
and `placehold.co` images remain sample assets. Do not treat authored Portuguese
copy or the guides as disposable placeholders.

All five Portuguese guides (howwork, themes, templates, components, and utilities)
use HTML within `.page-custom`, with `tbu-asset-code` for technical terms,
`pre > code` examples, tables, and `ol` lists using `li.dot` or `li.enum > div`.
When converting more content, follow the author's existing structures; if a new
tag needs styles that are not defined, leave that converted block commented for
the author's review instead of adding styles without approval.
The Portuguese menus link to these HTML guides. Flux does not parse Markdown;
code fences alone do not protect examples from HTML parsing. Code samples use
escaped text inside `pre > code`; sample markup, scripts, and styles are shown
as text, not live nodes. No Markdown drafts remain in these five pages.
Browser interactions have not been verified for these converted guides.

English is enabled and is the default locale. Its `public/content/en-us/` tree
now mirrors `pt-br/`, with `complements/` and the seven `pages/` guides, so the
shell fragments and guide links resolve for both locales.

The Portuguese footer links “Apoie” and “Contribua” to `#/pages/support.htm`
and `#/pages/contribute.htm`. The support fragment uses `.page-custom`, with
three vertically stacked payment subsections separated by horizontal rules and
220 × 220 temporary images. Bitcoin and Pix details and the dollar/euro payment
service/link are pending; no functional payment links or QR codes are provided.
The contribution fragment uses `.page-custom`, with text subsections, an
`ol` using `li.enum > div`, and a direct GitHub repository link. The footer also links to
the project repository at `https://github.com/mineot/taberna`.

## 3. Technology Stack

- Vue 3.5 (`<script setup lang="ts">`), vue-router 5 with hash history
- Pinia 3 with setup-style stores
- Vite 8 with `base: './'`, `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Tailwind CSS v4 (`@theme`, `@utility`, `@reference`, no `tailwind.config.js`)
- `@lucide/vue` for UI icons
- TypeScript 5.9 strict (`strict`, `noUnusedLocals`, `noUnusedParameters`,
  `noImplicitReturns`, `isolatedModules`, `allowImportingTsExtensions`)
- Vitest 4 + jsdom + @vue/test-utils (configured, no test suite)
- ESLint 10 flat config, Prettier 3 with `prettier-plugin-tailwindcss`
- Self-hosted Roboto, Roboto Serif, Roboto Mono, Italianno (`.ttf`, in `public/fonts/`)

`package.json` declares dependency ranges; `package-lock.json` records resolved
versions. Installed versions can differ from the range lower bounds. Use the
existing npm lockfile; a documentation review does not require installing or
upgrading dependencies.

## 4. Commands

Validation environment: Node `v24.15.0`, npm `12.0.2`, existing dependencies.
These are observed versions, not an `engines` requirement (none is declared).

| Command | Purpose | Session verification (2026-10-07) |
| --- | --- | --- |
| `npm run dev` | Vite dev server | Defined; not started in this review |
| `npm run build` | `vue-tsc --noEmit && vite build` | Passes |
| `npm run preview` | Serve `dist/` | Defined; not started in this review |
| `npm run typecheck` | `vue-tsc --noEmit` | Passes |
| `npm run lint` | `eslint src/` | Fails: 11 Vue parsing errors (11.1) |
| `npm run test` | `vitest --run` | Exits 1: no test files found (11.2) |
| `npm run format` | Prettier writes `src/**/*.{ts,vue,css}` | Not run; modifies source and does not format this guide |

Lint and test failures predate these documentation changes. Do not report them
as green or infer working browser behavior from a successful build. Recheck
these results when the relevant code or tooling changes.

## 5. Repository Map

```text
index.html                  SPA shell, font preloads, meta CSP
vite.config.ts              base './', alias '@', vue + tailwind plugins, vitest
eslint.config.js            flat config (vue + typescript-eslint + prettier)
public/
  config/languages.json     default / available / flags / names
  content/{locale}/         locale-specific fragments
  content/pt-br/home.htm    Portuguese project overview
  content/pt-br/pages/      HTML guides: howwork.htm, themes.htm, templates.htm,
                            components.htm, utilities.htm; support.htm financial
                            support page; contribute.htm contribution guide
  content/pt-br/complements/ brand.htm, header-nav.htm, sidebar-nav.htm,
                            footer.htm, copyright.htm
  content/en-us/            English translation mirroring pt-br: home.htm,
                            pages/ guides, complements/ shell fragments
  fonts/                    self-hosted .ttf files
  icons/                    social SVG icons
  images/                   logo.png, texture.png
  favicon.png
src/
  App.vue                   overlays + AppTemplate + <router-view> + initApp
  AppTemplate.vue           binds flux fragments to the layout slots
  main.ts                   styles, custom elements, Pinia, router, mount
  router.ts                 hash routes: /, /language, /:slug(.*)
  style.css                 global stylesheet entry
  style-customs.css          editorial styles under .page-custom
  web-components.ts         tbc-carousel, tbc-flux, tbc-language
  web-icons.ts              icon-home
  components/
    carousel.vue            carousel (documented with escaped HTML examples)
    error.vue               full-screen error overlay
    flux.vue                loads a locale fragment and renders it (v-html)
    language.vue            flag + language name link to #/language
    loading.vue             full-screen loading overlay
  pages/
    home.page.vue           <tbc-flux content-file="home.htm">
    language-switcher.page.vue  language grid, calls switchLanguage
    slug.page.vue           passes the route slug to tbc-flux
  stories/                  Pinia stores: app, error, language, loading
  styles/                   fonts.css, theme.css, utilities.css, app.css
  templates/default.vue     header/main/footer + backdrop + sidebar layout
  test/setup.ts             empty vitest setup placeholder
  utils/flux.util.ts        fragment path validation + fragment loading
dist/                       generated build output, git-ignored, never edit
```

Naming conventions:

- Custom elements and content prefixes are `tbc-*` (`icon-*` for inline icons).
- CSS classes are `tbi-*` (Taberna internal), utilities `tbu-*`, tokens `--*`.
- Pages: `*.page.vue`. Stores: `*.store.ts`. Utils: `*.util.ts`.
- Files under `components/` and pages are lowercase and hyphenated; the root
  shell files are `App.vue` and `AppTemplate.vue`.

### Where to make an approved change

| Change | Primary location |
| --- | --- |
| Home copy or detailed guide content | Relevant file under `public/content/pt-br/`; preserve the format documented in section 2. |
| Menu links, brand, or footer copy | `public/content/{locale}/complements/` in every enabled locale. |
| Which content fills a layout region | `src/AppTemplate.vue`. |
| Layout structure or sidebar behavior | `src/templates/default.vue`. |
| Shared visual values | `src/styles/theme.css`. |
| Reusable utility classes | `src/styles/utilities.css`. |
| Editorial presentation | `src/style-customs.css`. |
| Component behavior or registration | `src/components/` and `src/web-components.ts`. |
| Available icons | `src/web-icons.ts`. |
| Language data or resolution | `public/config/languages.json` and `src/stories/language.store.ts`. |
| Routing or fragment loading | `src/router.ts`, `src/pages/`, `src/components/flux.vue`, and `src/utils/flux.util.ts`. |

## 6. Bootstrap and Application Shell

`src/main.ts` imports `@/style.css`, registers `web-components` and
`web-icons`, then installs Pinia and the router and mounts `App.vue`.

`App.vue` renders, in order: `<Loading />`, `<Error />`, `<AppTemplate>` with
`<router-view />`. `onMounted` calls `initApp()` and swallows rejections
(`.catch(() => undefined)`) because the error store already captured them.
`initApp()` only awaits language detection. The shell mounts immediately; flux
instances wait for a nonempty locale. Only language detection uses the loading
tokens today; fragment fetches do not keep the loading overlay open.

`AppTemplate.vue` is the content-to-layout bridge. Fragment paths below are
relative to `public/content/{locale}/`:

| Slot                | Source                                                      |
| ------------------- | ----------------------------------------------------------- |
| default (unnamed)   | current route page forwarded from `App.vue` through `<slot />` |
| `header-brand`      | `complements/brand.htm`                                      |
| `header-nav`        | `complements/header-nav.htm`                                 |
| `footer-brand`      | `complements/brand.htm`                                      |
| `footer-complement` | inline social icon links (`/icons/*.svg`)                   |
| `footer-body`       | `complements/footer.htm`                                     |
| `footer-copyright`  | `complements/copyright.htm`                                  |
| `sidebar-brand`     | `complements/brand.htm` (click closes the sidebar)           |
| `sidebar-body`      | `complements/sidebar-nav.htm` (click closes the sidebar)     |
| `sidebar-footer`    | `<tbc-language>` (click closes the sidebar)                  |

Adding a region means adding a slot to the chosen template and filling it in
`AppTemplate.vue`. When the region uses `<tbc-flux content-file="...">`, create
the matching fragment under `public/content/{locale}/` in **every** enabled
locale. Slots can also receive inline content or components.

`templates/default.vue` owns the default layout structure and its styles:
sticky blurred header, `hidden md:flex` nav, mobile menu toggle (`hideToggleMenu` prop),
`<main>` slot, footer with brand/complement/body, copyright row with the
"Powered by Mineot" link, a fixed backdrop, and a fixed off-canvas sidebar.
Sidebar slots receive a `close` callback. Editorial styles, shared utilities,
and overlay component styles live separately. This is the only template
currently available; selection is the import in `AppTemplate.vue`, not a
configuration value. `hideToggleMenu` defaults to `false`; it hides the opener,
not the sidebar itself or the desktop navigation breakpoint.

## 7. State (`src/stories/`)

Stores are setup-style Pinia stores. `app.store.ts` is a facade that composes
the three domain stores and re-exports their refs/actions — components import
`useAppStore()` only, never the domain stores directly.

- `loading.store.ts` — `$loading` is a stack of tokens. `startLoading()` returns
  a token, `stopLoading(token)` removes it, and `loading` is `true` while the
  stack is non-empty. **Every token must be stopped in a `finally` block.**
- `error.store.ts` — `captureError(fn, { title, message, status?, rethrow? })`
  runs an async function, logs the cause to the console, sets a single
  `$error` manifest, and resolves to `true`/`false`. With `rethrow: true` it
  rethrows instead of resolving `false`. Status defaults to `500`; flux does
  not propagate the original HTTP status into the overlay. Later failures
  overwrite earlier ones. There is no reset/dismiss action, and successful
  calls do not clear an existing error.
- `language.store.ts` — see section 8.

Conventions: use `storeToRefs()` for anything reactive taken out of a store in a
component; actions and plain functions may be destructured directly.

## 8. Language Resolution

`public/config/languages.json` is the only runtime site configuration manifest:

```json
{
  "default": "en-us",
  "available": ["pt-br", "en-us"],
  "flags": { "pt-br": "🇧🇷", "en-us": "🇺🇸" },
  "names": { "pt-br": "Português (Brasil)", "en-us": "English (United States)" }
}
```

Authoring requirements and current resolver behavior:

- Author locale keys in lowercase (`pt-br`). Every locale in `available` needs
  a `flags` and a `names` entry and a complete `public/content/{locale}/` set.
  Both enabled locales currently provide a complete set.
- `default` must be present in `available` as an authoring requirement.
  The resolver falls back to the first locale if the default is unsupported.
- Matching trims and lowercases candidates, but returns the original entry
  from `available`; manifest keys and directory names are not rewritten.
- Runtime schema validation only checks that `available` is a nonempty array.
  Entry types, `default`, `flags`, and `names` are not fully validated. Missing
  entries in existing maps yield empty strings; missing maps or non-string
  locales can still cause runtime errors.

`detectLanguage()`:

1. fetches `${BASE_URL}config/languages.json` and rejects a non-`ok` response
   or an empty `available` array (wrapped by `captureError` with
   `rethrow: true`, so a broken manifest leaves a full-screen error);
2. resolves the locale in this order: value stored in `localStorage` key
   **`tblang`** (not `taberna-lang`), then `navigator.languages`, then
   `navigator.language`, then `default`, then `available[0]` — exact normalized
   match only, no region fallback like `pt` → `pt-br`;
3. persists the resolved locale.

The manifest is kept in memory only (`$manifest`); it is refetched on every page
load. `language`, `languages`, `languageFlag`, and `languageName` are computed
from it and return empty values before detection completes.

`switchLanguage(locale)` requires an exact `available.includes(locale)` match
(without normalization), persists to `tblang`, and
calls `window.location.reload()`. **Language switching is a full reload, not an
in-place swap** — do not assume reactive re-fetch behavior in the UI. Storage
read/write failures are swallowed; a failed write can prevent the requested
switch from surviving the reload. The hash route is retained.

## 9. Content Fragments and the Flux Pipeline

`src/components/flux.vue` is the content renderer:

```html
<tbc-flux content-file="home.htm"></tbc-flux>
```

- `watch([language, () => props.contentFile], ..., { immediate: true })` clears
  the current content, then loads the fragment for the active locale.
- `src/utils/flux.util.ts` provides the boundary:
  - `normalizeFragmentPath(file)` rejects paths starting with `/`, containing
    `\`, containing `..`, containing empty `/`-separated segments, or not ending
    in `.htm`;
  - `isFullHtmlDocument(text)` rejects bodies starting with `<!doctype html` or
    `<html` (SPA fallback detection);
  - `loadContentFragment({ base, locale, file })` builds
    `${base}content/${locale}/${file}`, requires `response.ok`, and applies the
    document check.
- The fragment string is injected with **`v-html`** — the component has no style
  block, and DOMPurify is not used anywhere in `src/`.
- Missing/empty `content-file` or an unresolved locale leaves flux empty
  without fetching. Nested file paths are supported.
- There is no cancellation, stale-response guard, application cache, or request
  deduplication. Each instance fetches independently, including the three
  `brand.htm` instances. Rapid prop changes can display stale content.
- It emits `click`; `AppTemplate.vue` uses it to close the sidebar.
- Failures go through `captureError` with `Flux content error` /
  `Failed to load file content: {file}`, so a broken fragment triggers the
  full-screen error overlay.

Runtime content must be HTML fragments. Never include `<!doctype>`, `<html>`,
`<head>`, or `<body>` as document structure. Escape code examples intended for
display, including Vue template, script, and style tags. This is an authoring
rule, not complete validation:
`isFullHtmlDocument` only recognizes leading whitespace followed by
`<!doctype html` or `<html` (case-insensitive). It does not reject isolated
`<head>`/`<body>` tags or a document preceded by a comment. The loader does not
check Content-Type, decode path escapes, or validate the locale as a path
segment. These checks are basic fallback detection, not a sanitizer or a
complete boundary for arbitrary user-supplied paths.

Consequences of using `v-html` today: fragment files are effectively trusted
author content. They may use Tailwind utilities, `tbu-*` utilities, semantic CSS
variables, and registered `tbc-*` elements. Vue directives/interpolations
in fetched HTML are not compiled as Vue templates. Introducing sanitization (the
unused `dompurify` dependency is installed and ready) is an architectural
change — get explicit approval, and update `flux.vue`, the element registry, and
the documentation together.

Asset paths in fragments are written absolute (`/images/logo.png`), which works
for root deployments but not for subdirectory hosting. Vite copies `public/` fragments without transforming embedded
URLs. See 11.4.

`index.html` declares this meta Content Security Policy:
`default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' https://placehold.co data:; font-src 'self';`.
There is no application-level link sanitization, protocol allowlist, or
`rel` rewriting. CSP does not replace sanitization. Approved external asset
origin changes must account for the relevant CSP directive.

## 10. Routing

`src/router.ts` uses `createWebHashHistory(import.meta.env.BASE_URL)`:

| Route        | Name               | Component                  |
| ------------ | ------------------ | -------------------------- |
| `/`          | `home`             | `home.page.vue`            |
| `/language`  | `Language Switcher`| `language-switcher.page.vue` |
| `/:slug(.*)` | `page`             | `slug.page.vue` |

- `scrollBehavior` restores the saved position, smooth-scrolls to `_to.hash`, or
  returns to the top.
- Internal links use hash URLs. `#/` loads the home and `#/language` displays
  the language chooser. `#/pages/howwork.htm` resolves to
  `content/{locale}/pages/howwork.htm` beneath the application base URL.
- The catch-all computes `route.params.slug` and passes it to the `content-file`
  prop of `tbc-flux`. Paths must satisfy the fragment loader's validation,
  including the `.htm` suffix. Adding a valid fragment enables access through
  its matching hash URL; menu links are authored separately.
- Missing or invalid fragments use the shared full-screen error overlay.
  There is no dedicated not-found page, translation fallback, or additional
  cancellation logic in the route component.

## 11. Known Gaps and Dead Code

Documented deliberately so agents do not "fix" them silently or claim they work.

1. **`npm run lint` is broken.** All 11 Vue files currently report the parsing
   error `'>' expected`. The TypeScript recommended config applies to both
   `*.ts` and `*.vue` after the
   Vue config, replacing `vue-eslint-parser`. The later `parserOptions.parser`
   does not restore the outer Vue parser. Fixing parser order/scoping is a
   prerequisite before lint can check Vue templates. An override also targets
   the deleted `src/components/layouts/content.vue`.
2. **No tests exist.** `npm test` exits 1. `src/test/setup.ts` is empty, and
   `@vue/test-utils` and `jsdom` are installed, but no automated suite uses them.
   Ad hoc parsing during documentation review is not a test suite.
3. **`v-html` is unsanitized** and `dompurify` is an unused dependency
   (section 9).
4. **Fragment asset paths break subdirectory hosting:** `/images/logo.png`
   remains absolute in copied `public/content/` fragments. The verified build
   rewrites font/texture URLs from CSS, asset URLs in `index.html`, and social
   icons in `AppTemplate.vue` to relative references. Do not treat every
   absolute source URL as a production failure; inspect emitted files.
   Fragment URLs need deployment-relative authoring or approved base-aware
   handling.
5. **Dead CSS:** `src/styles/app.css` still sets `display: contents` for
   `tbc-backdrop` and `tbc-sidebar`, elements that no longer exist (the sidebar
   is now `.tbi-app-layout-sidebar`).
6. **Guide browser validation is pending:** the five Portuguese guides are
   HTML, with escaped code examples. Conversion checks verify content and DOM
   structure, but do not establish visual or interactive browser behavior.
7. **Token drift:** `error.vue` and `loading.vue` use raw `z-300` / `z-200`,
   while `theme.css` defines `--z-loader: 999`, `--z-sidebar: 150`,
   `--z-backdrop: 100`. Prefer adding or reusing a `--z-*` token over new raw
   z-index utilities.
8. **Accessibility gaps:** the language chooser uses clickable `div` elements;
   the menu opener is a clickable SVG; the close button has no accessible name.
   The off-screen sidebar has no `inert`/`aria-hidden`, focus trap, focus
   restoration, or Escape handler. Loading/error overlays lack status/alert
   semantics; the loader and sidebar do not handle reduced motion. Section 14
   states requirements, not completed accessibility coverage.
9. **Undefined backdrop token:** `--backdrop-color` references the undefined
    `--color-secondary-bg`. `tbu-secondary-bg` is a utility, not a CSS variable.
10. **Partial data/request validation:** language schema checks are incomplete;
    flux has no cancellation/stale-response protection (sections 8–9).

## 12. Styling and Theme

`src/style.css` imports, in order: `tailwindcss`, `styles/fonts.css`,
`styles/theme.css`, `styles/utilities.css`, `styles/app.css`, then
`style-customs.css`.

- `theme.css` holds `@theme` font families (`--font-sans`, `--font-serif`,
  `--font-mono`, `--font-fancy`) and `:root` semantic tokens: z-index,
  `--duration`, `--texture`, `--rounded`, the primary/secondary/asset color
  families (each with `-soft` and `-opaque` variants), borders, block/container
  spacing multipliers, and component-only tokens (`--carousel-*`). Container
  multipliers are 4/14/24 and block multipliers are 6/6/6 for sm/md/lg.
- `utilities.css` defines `tbu-*` utilities via `@utility`: duration, texture,
  rounded, color helpers, `tbu-asset-link`, `tbu-asset-pill`,
  `tbu-asset-code-text`, `tbu-asset-code-panel` (direct `span.terminal` and
  `span.css` children receive specific styles), `tbu-shadow`,
  `tbu-backdrop`, border helpers, and the responsive `tbu-container` /
  `tbu-block`.
- `style-customs.css` defines the global `.page-custom` wrapper and its nested
  heading, paragraph, link, separator, and numbered-list styles. It is the
  current home content's presentation layer; keep editorial rules separate from
  template structure and reusable theme/utility definitions.
- Every `<style>` block that uses Tailwind directives must start with
  `@reference "@/style.css";`.
- Custom elements use `shadowRoot: false` (light DOM). Vue `scoped` styles
  still use generated scope attributes; they do not automatically reach
  arbitrary HTML injected by `v-html`. Use global utilities for fragments.
  Carousel styles are unscoped for slotted children; flux has no style block,
  and language has a scoped block.
- Breakpoints: `48rem` (medium) and `64rem` (large). `tbu-container` /
  `tbu-block` switch at those widths; the carousel activates multi-column at
  `48rem`.
- Rules: semantic tokens over raw palette classes, `--z-*` tokens over raw
  `z-*`, mobile-first, visible focus states, respect
  `prefers-reduced-motion` for non-essential motion.
- Keep fonts self-hosted.

## 13. Custom Elements and Icons

`src/web-components.ts` registers Vue components as custom elements with
`shadowRoot: false`, guarded by `customElements.get(name)`. To add one:

1. create the component in `src/components/`;
2. add it to the `elements` map with its `tbc-*` tag;
3. make sure fragment attributes match the component's props
   (kebab-case attribute → camelCase prop). Add styles when needed, with
   `@reference "@/style.css"` for Tailwind directives; choose scoping based on
   whether selectors need to reach authored/slotted content;
4. document the element and its attributes here; keep the README minimal.

Currently registered:

| Element         | Attribute(s)     | Default | Behavior                                                        |
| --------------- | ---------------- | ------- | --------------------------------------------------------------- |
| `tbc-flux`      | `content-file`   | —       | Loads `content/{locale}/{file}` and injects it with `v-html`     |
| `tbc-language`  | `flag-only`      | `false` | Links to `#/language`; hides the language name when set          |
| `tbc-carousel`  | `total-per-page` | `3`     | Direct slotted elements are items grouped into pages; 1 item/page below `48rem`         |
| `tbc-carousel`  | `interval`       | `3000`  | Autoplay ms; `0` disables it. Countdown + pause/play button      |
| `icon-home`     | none             | —       | Lucide `Home` icon; included in the component guide examples    |

Carousel behavior to preserve:

- `total-per-page` is floored and clamped to at least 1; non-finite values
  become 1. `interval` is clamped to a minimum of zero; non-finite values
  disable autoplay.
- Previous/next navigation wraps. Desktop uses dots, mobile a page counter;
  controls disappear with at most one page.
- Automatic mode pauses on hover/focus and disables playback for reduced
  motion. Explicit Play overrides those automatic pauses; CSS slide animation
  remains disabled under reduced motion.
- A `MutationObserver` tracks direct children. Off-page items receive `inert`
  and `aria-hidden`. Observers, media listeners, and timers are cleaned up on
  unmount. There is no separate carousel-item custom element.

The registries do not install Pinia into each custom element via `configureApp`;
store-using elements rely on the shell having activated Pinia. Registration
alone is not a standalone widget bootstrap. Vite has no
`compilerOptions.isCustomElement` predicate configured; tags in Vue templates
and tags in fetched HTML follow different compilation paths.

`web-icons.ts` follows the same pattern for inline Lucide icons (`icon-*`).
Adding an icon means importing it from `@lucide/vue` and adding it to the map.

## 14. Code Conventions

- Vue Composition API with `<script setup lang="ts">`.
- Only alias: `@` → `src/`. Do not reintroduce `@store`, `@util`, `@layout`,
  `@widget`, or `@style` aliases.
- Keep TypeScript strictness; avoid broad casts and `any` when a precise type is
  possible (`any` is tolerated in the custom-element registries because
  `defineCustomElement` needs it).
- Validate file-backed and runtime data explicitly; TypeScript types do not
  validate fetched JSON or HTML.
- No code comments unless the user asks for them or the behavior is not
  expressible through names and structure.
- Accessibility is a requirement: semantic elements, `aria-*` state, keyboard
  operability, visible focus, reduced-motion handling, `inert`/`aria-hidden` for
  off-screen carousel items.
- Inspect `git status` before editing and preserve unrelated user changes.
- Do not edit `dist/`, `package-lock.json`, or dependency versions unless that
  is the approved scope.
- Preserve the boundaries in sections 8–12 (locale resolution, fragment
  validation, hash routes, theme tokens) when refactoring.

## 15. Change Workflow

Apply the approval and preservation rules in section 1 throughout this workflow.
Before implementing:

1. Read this file and inspect the relevant source.
2. Check `git status` and identify unrelated user changes.
3. State the observed behavior, the proposed scope, and any meaningful choice
   that needs a decision.
4. Proceed only within explicitly approved scope; if approval is already given,
   do not request it again for the same work.

After implementing:

1. Make the smallest coherent change inside the approved scope.
2. Preserve the loading, error, locale, fragment, routing, theme, and
   accessibility boundaries described above.
3. Run the relevant verification: `npm run typecheck` always; `npm run build`
   when bundling or deployment can be affected; `npm run lint` and `npm run
   test` with their known failures (11.1, 11.2) reported honestly.
4. Apply the documentation maintenance rules in section 1 to `AGENTS.md` and
   `README.md`.
5. Report changed files, verification commands with their real results, and any
   remaining risk or follow-up.
