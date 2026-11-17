# Taberna — AI Development Guide

Operational source of truth for AI assistants working in this repository. It
describes the **current** working tree: architecture, conventions, data
contracts, security boundaries, and the known gaps that must not be mistaken
for finished features.

Portuguese and US English documentation and their source contracts were reviewed
on 2026-11-16.
Validation results and their limits are recorded in section 4. When code and this file disagree,
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
  on the site at `https://taberna.mineot.com/#/`, linked in the README for
  documentation. Financial-support URLs have not yet been supplied; add them
  when the user provides them, without inventing placeholder links.
- Update it when an approved change affects those topics; do not expand it
  into a configuration guide, component catalog, or troubleshooting manual.

### Tests

- No test files are present in the current working tree; the shared
  setup file remains empty. See sections 4 and 11.2.
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
  fragments and components to `tbc-layout-linear` and a separate `tbc-sidebar`.
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

Both `public/content/pt-br/` and `public/content/en-us/` contain the following
fragments, with matching routes and component/utility structure:

| Content | Current state and purpose |
| --- | --- |
| `home.htm` | Project overview with links to the detailed guides. |
| `pages/howwork.htm` | Project organization, fragments, routes, languages, development, and publishing. |
| `pages/themes.htm` | Current `--color-tb-*` palette, fonts, five spacing ranges, panel and component tokens. |
| `pages/templates.htm` | “Layout e composição” / “Layout and composition”: component composition and current slots. The URL is retained for existing links; there is no `src/templates/` directory. |
| `pages/components.htm` | All nine registered `tbc-*` elements, attributes, slots, icons, and extension examples. |
| `pages/utilities.htm` | Current functional color/border utilities, flex/grid, panels, spacing, and component utilities. |
| `pages/support.htm` | Bitcoin and USD/EUR remain unavailable; Pix retains the supplied key and `/images/pix.png`. No invented payment links. |
| `pages/contribute.htm` | Development, issues, documentation, translations, and GitHub contribution steps. |
| `complements/` | Brand, header/sidebar navigation, footer, copyright, and socials. Navigation uses `tbc-nav` and `tbc-link`; footer groups are “Conheça”/“Explore”, “Personalize”/“Customize”, and “Participe”/“Get involved”. |

Both locales use semantic `article` wrappers with `tbu-flex-cols` and
`tbu-block`, existing theme utilities, and Tailwind typography. They do not rely
on the removed `.page-custom`, `.dot`/`.enum`, or `tbu-asset-code*` styles.
Code examples are escaped text inside `pre > code`, styled with `tbu-panel`;
tables have named, keyboard-focusable horizontal scroll containers. Use
`tbc-link`/`tbc-nav` for authored links/navigation where appropriate. Prefer
existing utilities and components over adding editorial CSS.

The component and utility guides include small live navigation/panel examples;
layout, sidebar, and source-code examples remain escaped text. Flux does not
parse Markdown or compile Vue directives in fragments.

English is enabled and is the default locale. Its 14 fragments mirror the
Portuguese structure, including `complements/socials.htm`, with US English prose,
navigation, accessible labels, and example text. Technical names, attributes,
classes, routes, assets, and payment details are preserved. English-specific
path examples use `en-us`; the real language manifest retains its original keys
and display names. Keep equivalent fragment paths across enabled locales.

The English layout guide describes the current default-slot sidebar integration.
The Portuguese layout guide still contains an obsolete note about `sidebar-body`;
that editorial note does not describe the current application code.

Both support pages keep the author's supplied Pix image and key.
Bitcoin and USD/EUR sections explain that payment details are pending, without
placeholder QR images. Copyright preserves the attribution and year, with
localized rights text. The footer and GitHub social link point to `https://github.com/mineot/taberna`.

## 3. Technology Stack

- Vue 3.5 (`<script setup lang="ts">`), vue-router 5 with hash history
- Pinia 3 with setup-style stores
- Vite 8 with `base: './'`, `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Tailwind CSS v4 (`@theme`, `@utility`, `@reference`, no `tailwind.config.js`)
- `@lucide/vue` for UI icons
- TypeScript 5.9 strict (`strict`, `noUnusedLocals`, `noUnusedParameters`,
  `noImplicitReturns`, `isolatedModules`, `allowImportingTsExtensions`)
- Vitest 4 + jsdom + @vue/test-utils (no current test files)
- ESLint 10 flat config, Prettier 3 with `prettier-plugin-tailwindcss`
- Self-hosted Roboto, Roboto Serif, Roboto Mono, Italianno (`.ttf`, in `public/fonts/`)

`package.json` declares dependency ranges; `package-lock.json` records resolved
versions. Installed versions can differ from the range lower bounds. Use the
existing npm lockfile; a documentation review does not require installing or
upgrading dependencies.

## 4. Commands

Validation uses the existing dependencies and Node `v24.15.0`; no engines
requirement is declared. Results below were rechecked on 2026-11-16.

| Command | Purpose | Result |
| --- | --- | --- |
| `npm run dev` | Vite development server | Defined; preview used for browser validation. |
| `npm run build` | `vue-tsc --noEmit && vite build` | Passes. |
| `npm run preview` | Serve `dist/` | Used for documentation checks. |
| `npm run typecheck` | `vue-tsc --noEmit` | Passes. |
| `npm run lint` | `eslint src/` | Fails with 16 existing Vue parsing errors (11.1). |
| `npm run test` | `vitest --run` | Exits 1: no test files found (11.2). |
| `npm run format` | Prettier writes `src/**/*.{ts,vue,css}` | Not run; source is outside this documentation scope. |

Content HTML is formatted separately with the existing Prettier installation.
Validation of this revision covers fragment structure, local link/asset targets,
registered live elements, and current utility names. This editorial change adds
no unit tests; it does not change application behavior.

Chrome checks covered all eight Portuguese pages at 375, 768, 1280, and 1920 px
on the production preview: no main-content horizontal overflow or JavaScript
exceptions were observed. Keyboard activation and content-link navigation worked;
the menu opener, backdrop close, and reopen worked. Those earlier checks preceded
the current sidebar default-slot integration. Static checks passed for
14 fragments, 43 internal links, 6 local asset references, 38 escaped examples,
and all utilities used by live fragment markup. These checks do not establish
complete accessibility or every component's behavior.

The English revision was checked on the production preview at the same four
widths across all eight pages (32 page/width combinations), without main-content
horizontal overflow, JavaScript exceptions, or failed HTTP responses. The
sidebar displayed all five translated links and closed after navigation; keyboard
link activation also worked. Static checks confirmed 14 matching fragment paths,
43 internal links, 6 local asset references, and 38 escaped examples. Element
structure and nonlocalized attributes match Portuguese, except for the corrected
sidebar integration note; the language-manifest example matches the real JSON.

## 5. Repository Map

```text
index.html                  SPA document, font preloads, meta CSP
vite.config.ts              base './', alias '@', Vue + Tailwind plugins, Vitest
eslint.config.js            flat config with current Vue parser failure
public/
  config/languages.json     default / available / flags / names
  content/{locale}/         home.htm, pages/, complements/
  content/pt-br/pages/      howwork, themes, templates (layout guide), components,
                            utilities, support, contribute (.htm)
  content/pt-br/complements/ brand, header-nav, sidebar-nav, footer, copyright,
                            socials (.htm)
  fonts/                    self-hosted .ttf files
  icons/                    social SVG icons
  images/                   logo.png, texture.png, pix.png
  favicon.png
src/
  App.vue                   nested Loading → Error → AppTemplate + router-view
  AppTemplate.vue           tbc-layout-linear + separate tbc-sidebar composition
  main.ts                   styles, registries, Pinia, router, mount
  router.ts                 hash routes: /, /language, /:slug(.*)
  style.css                 global stylesheet entry
  web-components.ts         nine tbc-* elements (section 13)
  web-icons.ts              icon-home, icon-menu, icon-x
  components/               _carousel.vue, _flux.vue, _footer.vue, _header.vue,
                            _language.vue, _layout.linear.vue, _link.vue,
                            _nav.vue, _sidebar.vue; index.ts exports
  widgets/                  _error.vue, _loading.vue; index.ts exports
  pages/                    home, language-switcher, slug (*.page.vue)
  stories/                  app, error, language, loading (*.store.ts)
  styles/
    theme.css               fonts, palette, semantic/component tokens
    customs.css             legacy .footer-custom styles (unused by both locales)
    utilities/              index + _borders, _colors, _layouts, _panels, _utils
    components/             index + _header-footer, _layout.linear, _link,
                            _nav, _sidebar
    helpers/                app.css, fonts.css
  test/setup.ts             empty Vitest setup placeholder
  utils/flux.util.ts        fragment validation + loading
dist/                       generated build output; never edit manually
```

Naming: custom elements use `tbc-*`, icons `icon-*`, internal classes `tbi-*`,
utilities `tbu-*`, and CSS variables `--*`. Components/widgets currently use an
underscore prefix; pages, stores, and utilities use their respective suffixes.

| Change | Primary location |
| --- | --- |
| Localized content or navigation | `public/content/{locale}/` |
| Which content fills a region | `src/AppTemplate.vue` |
| Layout/sidebar structure and behavior | `src/components/_layout.linear.vue`, `_sidebar.vue` |
| Theme values | `src/styles/theme.css` |
| Utilities | `src/styles/utilities/`, `src/styles/components/` |
| Additional editorial styles | `src/styles/customs.css` |
| Components and registration | `src/components/`, `src/web-components.ts` |
| Icons | `src/web-icons.ts` |
| Locale configuration/resolution | `public/config/languages.json`, `src/stories/language.store.ts` |
| Routing and fragments | `src/router.ts`, `src/pages/`, `src/components/_flux.vue`, `src/utils/flux.util.ts` |

## 6. Bootstrap and Application Shell

`main.ts` imports styles and both registries, installs Pinia and the router, and
mounts `App.vue`. `App.vue` nests `Loading`, `Error`, and `AppTemplate` around the
route page. The widgets render their slots only while their respective state is
inactive; loading/error can unmount the nested shell. `onMounted` calls
`initApp()` and swallows its rejection because the error store captures it.
Initialization awaits language detection; only language detection currently uses
loading tokens, and flux waits for a nonempty locale.

`AppTemplate.vue` composes `tbc-layout-linear` and a separate `tbc-sidebar`.
The layout uses Header/Footer Vue components internally. HTML slot wrappers
supply these layout regions:

| Slot | Content relative to `content/{locale}/` |
| --- | --- |
| default (unnamed) | Current route, forwarded through `<slot>` |
| `header-brand` | `complements/brand.htm` |
| `header-nav` | `complements/header-nav.htm` |
| `footer-brand` | `complements/brand.htm` |
| `footer-nav` | `complements/socials.htm` |
| `footer-body` | `complements/footer.htm` |
| `footer-copyright` | `complements/copyright.htm` |

The layout's declared `owner`, `year`, and `copyright` string props are forwarded
to Footer, which does not declare or consume them as text. Author copyright
through the slot. Footer always includes “Powered by Mineot”. No former
`hideToggleMenu` or `scrollToTopOnFooterClick` props remain.

Sidebar supports `sidebar-header`, the default slot, and `sidebar-footer`.
The shell supplies the brand in `sidebar-header` and language link in
`sidebar-footer`, with click handlers assigning `sidebar.show = false` via a
Vue ref. Sidebar navigation is supplied directly to its default slot by
`tbc-flux content-file="complements/sidebar-nav.htm"`, also connected to
`closeSidebar`. The former `sidebar-body` wrapper is no longer present.

Both locale headers use `tbc-nav responsive` with HTML `nav-wide` and
`nav-narrow` wrappers. The narrow group's named `tbc-link` button assigns
`show=true` on `#sidebar`. Breakpoint and slot behavior are detailed in section 13.

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

`src/components/_flux.vue` is the content renderer:

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
change — get explicit approval, and update `_flux.vue`, the element registry, and
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

1. **Lint is broken:** all 16 Vue files report `'>' expected`. TypeScript's
   recommended config replaces the outer Vue parser; a later parserOptions
   setting does not restore it. A stale override also targets a deleted file.
2. **No test files are present:** Vitest exits 1 with “No test files found”.
   `src/test/setup.ts` remains empty. Older link/sidebar test results do not
   describe this working tree.
3. **Trusted HTML:** flux uses unsanitized `v-html`; DOMPurify remains unused.
4. **Subdirectory assets:** absolute URLs in public fragments (including logo,
   Pix, and social icons) are copied without rewriting. CSS/entry asset
   processing differs; inspect emitted files before drawing conclusions.
5. **Stale helper selector:** `helpers/app.css` sets `display: contents` for
   `tbc-backdrop`, which is not registered; `tbc-sidebar` is registered.
6. **Portuguese layout note is stale:** `pages/templates.htm` still describes
   a `sidebar-body` mismatch, although the shell now uses the correct default
   slot. The English guide describes the current integration (section 6).
7. **Unused layout props/token:** `owner`/`year`/`copyright` do not populate the
   footer text, and `--z-loader` is declared but unused by Loading.
8. **Accessibility gaps:** the language chooser uses clickable divs; sidebar
   close is a clickable icon without an accessible name. Sidebar lacks Escape,
   focus management and inert/aria-hidden for its hidden contents. Loading/error
   lack status/alert semantics; loader/sidebar lack reduced-motion handling.
   Both locale menu openers are named buttons through `tbc-link`.
9. **Unused editorial CSS:** `.footer-custom` remains defined, but neither
   locale uses it after adopting component navigation and direct utilities.
10. **Partial validation/request handling:** locale schema validation remains
    incomplete; flux lacks cancellation/stale-response protection (sections 8–9).

## 12. Styling and Theme

`src/style.css` imports Tailwind, `styles/helpers/fonts.css`, `styles/theme.css`,
`styles/utilities/index.css`, `styles/helpers/app.css`, `styles/customs.css`, and
`styles/components/index.css`, in that order.

- `@theme` defines the four font families and six `--color-tb-*` colors:
  primary-hard/soft, secondary-hard/soft, asset-hard/soft.
- Functional utilities use these suffixes: `tbu-text-*`, `tbu-bg-*`,
  `tbu-bg-glass-*`, `tbu-border-*`, and directional `tbu-border-{side}-*`.
  Glass backgrounds use `--opacity` (30%). Border width/style use
  `--border-width` (1px) and `--border-style` (solid).
- `tbu-container` and `tbu-block` use base/md/lg/xl/2xl ranges: 0, 48rem,
  64rem, 80rem, 96rem. Container multipliers are 4/12/24/46/96; block
  multipliers are 4/5/6/7/8. The `sm` token is the base value.
- `tbu-flex-cols`, `tbu-flex-rows`, and integer `tbu-grid-*` use gap multipliers
  4/3/2 at base/md/lg. Flex utilities wrap by default.
- `tbu-panel` provides texture, `--panel-bg`, left `--panel-border`, left
  padding from `--panel-border-spacing`, and remaining padding from
  `--panel-spacing`. Other utilities include duration, texture, rounded,
  shadow, and backdrop.
- Component utilities include `tbu-header`, `tbu-footer`, `tbu-layout-linear`,
  `tbu-link`, `tbu-nav`, and `tbu-sidebar`. They style expected structures;
  CSS alone does not reproduce custom-element behavior.
- `tbu-layout-linear` uses a column with `min-height: 100dvh`, a sticky header,
  and a `flex-1` main with `tbu-container`; it does not introduce an overflow
  container. `--layout-linear-gap` separates regions.
- Component appearance has dedicated `--header-*`, `--footer-*`, `--sidebar-*`,
  `--link*`, `--carousel-*`, `--loading-*`, and `--error-*` tokens. The backdrop
  uses the existing secondary-hard color at 80%, as do header/footer backgrounds.
- `styles/customs.css` currently defines `.footer-custom` only. Both locales
  use direct utilities; `.page-custom` and the former
  `tbu-asset-code*`, `tbu-asset-pill`, and old color utility names do not exist.
- Tailwind directives in component style blocks require `@reference "@/style.css";`.
  Custom elements use light DOM (`shadowRoot: false`); scoped selectors still
  do not automatically style arbitrary injected content. Carousel styles are
  unscoped, language/footer styles scoped, and flux has no style block.
- Keep fonts self-hosted. Prefer semantic tokens and mobile-first styling,
  visible focus and reduced-motion handling. New classes in public fragments
  require rebuilding the generated CSS for production.

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
| `tbc-language` | `flag-only`, `lg`, `sm` | `false` | Language link; optional flag-only or large/small text |
| `tbc-carousel`  | `total-per-page` | `3`     | Direct slotted elements are items grouped into pages; 1 item/page below `48rem`         |
| `tbc-carousel`  | `interval`       | `3000`  | Autoplay ms; `0` disables it. Countdown + pause/play button      |
| `tbc-nav`      | `responsive`    | `false` | Switches `nav-wide` / `nav-narrow` slots at `48rem`; otherwise renders the default slot |
| `tbc-nav`      | `vertical`      | `false` | Arranges navigation items in columns, including both responsive groups |
| `tbc-link`     | `text`, `href`, `target` | `null`, `/#`, `_self` | Renders an anchor when no trigger is supplied |
| `tbc-link`     | `trigger`, `trigger-prop`, `trigger-value` | `null` | Renders a button that assigns a property on the first element matching the trigger selector |
| `tbc-sidebar`  | `show`          | `false` | Shows the panel and backdrop; clicking `icon-x` or the backdrop closes both and emits `update:show` with `false` |
| `tbc-header` | none | — | `header-brand` and default slots |
| `tbc-footer` | none | — | `footer-brand`, `footer-nav`, `footer-copyright`, default body slot |
| `tbc-layout-linear` | `owner`, `year`, `copyright` | undefined | Layout slots in section 6; these props do not generate footer text |
| `icon-home`, `icon-menu`, `icon-x` | none | — | Lucide Home, Menu, X |

Link triggers (`src/components/_link.vue`):

- `trigger` is a CSS selector; `trigger-prop` is the destination's JavaScript
  property name (camelCase for multiword props). Only an existing property on
  the first matching element is assigned. Invalid selectors, absent targets,
  missing property names, and unknown properties are ignored.
- `trigger-value` accepts strings, Booleans, numbers, objects, and arrays.
  The strings `"true"` and `"false"` become Booleans; other supplied values are
  assigned as received. Objects and arrays require Vue/property bindings;
  HTML attribute strings are not parsed as JSON.
- Trigger buttons use `type="button"` so they do not submit surrounding forms.
  Without `trigger`, the component remains an anchor using `href` and `target`.
- Example HTML: `<tbc-link text="Open" trigger="#menu" trigger-prop="show"
  trigger-value="true"></tbc-link>` targets `<tbc-sidebar id="menu">`.
  This DOM-property API targets custom elements/native elements, not private
  component instances rendered by a regular Vue parent.

Sidebar close behavior (`src/components/_sidebar.vue`):

- Local visibility starts from `show` and follows subsequent prop changes.
  Clicking `icon-x` or the backdrop hides both without mutating props.
- Vue consumers can use `<Sidebar v-model:show="isOpen">`. Static HTML
  `<tbc-sidebar show>` also closes without a parent listener. The emitted
  custom-element `update:show` event carries `[false]` in `detail`.
- When hosted as a Vue custom element, closing also sets the host property
  `show` to `false` (removing its attribute), so a link can reopen it by assigning
  `true` again. In regular Vue usage, `update:show` synchronizes the parent model.
  Escape does not close this component.

Navigation integration (`src/components/_nav.vue` and
`src/styles/components/_nav.css`):

- `Nav` is exported by `src/components/index.ts` and registered as `tbc-nav`.
- The global stylesheet imports `styles/components/index.css`, which imports
  `_nav.css`. The component relies on the global `tbu-nav` utility.
- Without `responsive`, supply the default slot. With `responsive`, supply
  `nav-wide` (at least `48rem`) and `nav-narrow` (below `48rem`); there is no
  automatic menu button or fallback to the default slot.
- In HTML fragments use `slot="nav-wide"` / `slot="nav-narrow"` on real elements,
  not Vue `<template #...>` syntax. In Vue component usage, named Vue slots work.
- Direct named HTML slot wrappers inherit flex direction, wrapping, and gap
  from the generated `.wide` / `.narrow` group, so their children follow the
  selected orientation. Vue slot items may also be supplied directly.
- Boolean HTML attributes are enabled by presence and disabled by omission;
  in Vue use Boolean bindings such as `:responsive="false"`.
- The CSS utility remains usable on plain HTML via `tbu-nav responsive` with
  direct `.wide` / `.narrow` children and optional `.vertical` on each group.

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
