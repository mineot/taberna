# Taberna — AI Development Guide

Operational source of truth for AI assistants working in this repository. It
describes the **current** working tree: architecture, conventions, data
contracts, security boundaries, and the known gaps that must not be mistaken
for finished features.

Validated against the working tree on 2026-09-30 through source inspection,
typecheck, lint, test discovery, and a production build. Browser interactions
were not exercised. When code and this file disagree, establish current
behavior from the code and update this file within the approved scope.
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

- `README.md` is the only maintained README and is written in English.
  Do not recreate a Portuguese version or add translation links.
- Limit it to the project overview, technologies, installation, production
  build, and license. Keep architecture, contracts, and agent guidance here.
- Update it when an approved change affects those topics; do not expand it
  into a configuration guide, component catalog, or troubleshooting manual.

### Tests

- There is currently **no test suite**: `npm test` fails with "No test files
  found", and `src/test/setup.ts` is empty.
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

Current state (mid-refactor, important):

- The site configuration was reduced to a single manifest:
  `public/config/languages.json`. There is no per-locale site manifest
  (`config/{locale}.json` was deleted), no config store, and no home/footer
  path configuration.
- Layout regions are wired **in code** by `src/AppTemplate.vue`, which hardcodes
  the fragment file for each slot.
- The dynamic content page (`src/pages/slug.page.vue`) is **entirely
  commented out**; only `#/` and `#/language` currently render content.
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
- Bundled content, images (`logo.png`, `texture.png`, `placehold.co` images) and
  the `Iten 1..3` links are placeholders.

## 3. Technology Stack

- Vue 3.5 (`<script setup lang="ts">`), vue-router 5 with hash history
- Pinia 3 with setup-style stores
- Vite 8 with `base: './'`, `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Tailwind CSS v4 (`@theme`, `@utility`, `@reference`, no `tailwind.config.js`)
- `@lucide/vue` for UI icons
- TypeScript 5.9 strict (`strict`, `noUnusedLocals`, `noUnusedParameters`,
  `noImplicitReturns`, `isolatedModules`, `allowImportingTsExtensions`)
- Vitest 4 + jsdom + @vue/test-utils (configured, unused)
- ESLint 10 flat config, Prettier 3 with `prettier-plugin-tailwindcss`
- Self-hosted Roboto, Roboto Serif, Roboto Mono, Italianno (`.ttf`, in `public/fonts/`)

`package.json` declares dependency ranges; `package-lock.json` records resolved
versions. Installed versions can differ from the range lower bounds. Use the
existing npm lockfile; a documentation review does not require installing or
upgrading dependencies.

## 4. Commands

Validation environment: Node `v24.15.0`, npm `12.0.2`, existing dependencies.
These are observed versions, not an `engines` requirement (none is declared).

| Command | Purpose | Review result (2026-09-30) |
| --- | --- | --- |
| `npm run dev` | Vite dev server | Defined; not started in this review |
| `npm run build` | `vue-tsc --noEmit && vite build` | Passes |
| `npm run preview` | Serve `dist/` | Defined; not started in this review |
| `npm run typecheck` | `vue-tsc --noEmit` | Passes |
| `npm run lint` | `eslint src/` | Fails: 11 Vue parsing errors (11.1) |
| `npm run test` | `vitest --run` | Exits 1: no test files found (11.2) |
| `npm run format` | Prettier writes `src/**/*.{ts,vue,css}` | Not run; modifies source and does not format this guide |

Lint and test failures predate this documentation review. Do not report them
as green or infer working browser behavior from a successful build. Recheck
these results when the relevant code or tooling changes.

## 5. Repository Map

```text
index.html                  SPA shell, font preloads, meta CSP
vite.config.ts              base './', alias '@', vue + tailwind plugins, vitest
eslint.config.js            flat config (vue + typescript-eslint + prettier)
public/
  config/languages.json     default / available / flags / names
  content/{locale}/         brand.htm, header-nav.htm, sidebar-nav.htm,
                            footer.htm, copyright.htm, home.htm
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
  web-components.ts         tbc-carousel, tbc-flux, tbc-language
  web-icons.ts              icon-home
  components/
    carousel.vue            carousel (registered, not used by bundled content)
    error.vue               full-screen error overlay
    flux.vue                loads a locale fragment and renders it (v-html)
    language.vue            flag + language name link to #/language
    loading.vue             full-screen loading overlay
  pages/
    home.page.vue           <tbc-flux content-file="home.htm">
    language-switcher.page.vue  language grid, calls switchLanguage
    slug.page.vue           DISABLED (commented out)
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

## 6. Bootstrap and Application Shell

`src/main.ts` imports `@/style.css`, registers `web-components` and
`web-icons`, then installs Pinia and the router and mounts `App.vue`.

`App.vue` renders, in order: `<Loading />`, `<Error />`, `<AppTemplate>` with
`<router-view />`. `onMounted` calls `initApp()` and swallows rejections
(`.catch(() => undefined)`) because the error store already captured them.
`initApp()` only awaits language detection. The shell mounts immediately; flux
instances wait for a nonempty locale. Only language detection uses the loading
tokens today; fragment fetches do not keep the loading overlay open.

`AppTemplate.vue` is the content-to-layout bridge. It maps slots to fragments:

| Slot                | Source                                                      |
| ------------------- | ----------------------------------------------------------- |
| `header-brand`      | `brand.htm`                                                  |
| `header-nav`        | `header-nav.htm`                                             |
| `footer-brand`      | `brand.htm`                                                  |
| `footer-complement` | inline social icon links (`/icons/*.svg`)                   |
| `footer-body`       | `footer.htm`                                                 |
| `footer-copyright`  | `copyright.htm`                                              |
| `sidebar-brand`     | `brand.htm` (click closes the sidebar)                       |
| `sidebar-body`      | `sidebar-nav.htm` (click closes the sidebar)                 |
| `sidebar-footer`    | `<tbc-language>` (click closes the sidebar)                  |

Adding a region means: add the slot to `templates/default.vue`, then fill it in
`AppTemplate.vue` with a `<tbc-flux content-file="...">`, then create the
matching `public/content/{locale}/{file}.htm` in **every** enabled locale.

`templates/default.vue` owns all layout structure and styling: sticky blurred
header, `hidden md:flex` nav, mobile menu toggle (`hideToggleMenu` prop),
`<main>` slot, footer with brand/complement/body, copyright row with the
"Powered by Mineot" link, a fixed backdrop, and a fixed off-canvas sidebar.
Sidebar slots receive a `close` callback.

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

`public/config/languages.json` is the only configuration file:

```json
{
  "default": "en-us",
  "available": ["pt-br", "en-us"],
  "flags": { "pt-br": "🇧🇷", "en-us": "🇺🇸" },
  "names": { "pt-br": "Português (Brasil)", "en-us": "English (United States)" }
}
```

Rules:

- Author locale keys in lowercase (`pt-br`). Every locale in `available` needs
  a `flags` and a `names` entry and a complete `public/content/{locale}/` set.
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

Fragments are HTML fragments only. Never include `<!doctype>`, `<html>`,
`<head>`, or `<body>`. This is an authoring rule, not complete validation:
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
| `/:slug(.*)` | `page`             | `slug.page.vue` (disabled) |

- `scrollBehavior` restores the saved position, smooth-scrolls to `_to.hash`, or
  returns to the top.
- Internal links use hash URLs. Only `#/` and `#/language` have working page
  bodies. Neither `#/{path}.htm` nor the bundled `#/iten1`–`#/iten3` links
  load fragments today; adding a file alone does not enable a route.
- The catch-all leaves the page body empty while the shell remains visible:
  the implementation in `slug.page.vue` is commented out,
  including its `pageStatus` state machine, `AbortController` cleanup, and
  `@util/...` / `@store/...` / `@layout/...` imports from a **previous alias
  scheme that no longer exists**. Only `@` is configured (in both `tsconfig.json`
  and `vite.config.ts`).
- When re-enabling dynamic pages, re-derive the loader from
  `loadContentFragment()` and the current `tbc-flux` error handling; do not
  revive the commented code as-is.

## 11. Known Gaps and Dead Code

Documented deliberately so agents do not "fix" them silently or claim they work.

1. **`npm run lint` is broken.** All 11 Vue files have parsing errors: ten
   report `'>' expected`, and `slug.page.vue` reports `Type expected`. The
   TypeScript recommended config applies to both `*.ts` and `*.vue` after the
   Vue config, replacing `vue-eslint-parser`. The later `parserOptions.parser`
   does not restore the outer Vue parser. Fixing parser order/scoping is a
   prerequisite before lint can check Vue templates. An override also targets
   the deleted `src/components/layouts/content.vue`.
2. **No tests exist.** `npm test` exits 1. `src/test/setup.ts` is empty, and
   `@vue/test-utils` and `jsdom` are installed but unused.
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
6. **Registered but unused:** `tbc-carousel` (`components/carousel.vue`) and
   `icon-home` (`web-icons.ts`) are not referenced by the app or by any
   fragment.
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
`styles/theme.css`, `styles/utilities.css`, `styles/app.css`.

- `theme.css` holds `@theme` font families (`--font-sans`, `--font-serif`,
  `--font-mono`, `--font-fancy`) and `:root` semantic tokens: z-index,
  `--duration`, `--texture`, `--rounded`, the primary/secondary/asset color
  families (each with `-soft` and `-opaque` variants), borders, block/container
  spacing multipliers, and component-only tokens (`--carousel-*`). Several
  legacy link/header/footer tokens are commented out.
- `utilities.css` defines `tbu-*` utilities via `@utility`: duration, texture,
  rounded, color helpers, `tbu-asset-link`, `tbu-asset-pill`, `tbu-shadow`,
  `tbu-backdrop`, border helpers, and the responsive `tbu-container` /
  `tbu-block`.
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
| `icon-home`     | none             | —       | Lucide `Home` icon (registered, currently unused)               |

Carousel behavior to preserve:

- `total-per-page` is floored and clamped to at least 1; non-finite values
  become 1. `interval` is clamped to zero; non-finite values disable autoplay.
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

Before implementing:

1. Read this file and inspect the relevant source.
2. Check `git status` and identify unrelated user changes.
3. State the observed behavior, the proposed scope, and any meaningful choice
   that needs a decision.
4. Wait for explicit approval.

After implementing:

1. Make the smallest coherent change inside the approved scope.
2. Preserve the loading, error, locale, fragment, routing, theme, and
   accessibility boundaries described above.
3. Run the relevant verification: `npm run typecheck` always; `npm run build`
   when bundling or deployment can be affected; `npm run lint` and `npm run
   test` with their known failures (11.1, 11.2) reported honestly.
4. Update `AGENTS.md` if anything it documents changed, and `README.md` only
   if the change affects its overview, technologies, installation, build, or
   license.
5. Report changed files, verification commands with their real results, and any
   remaining risk or follow-up.

Never modify `TODO.md`.
