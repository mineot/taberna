# Taberna — AI Development Guide

This file is the operational source of truth for AI assistants working in this
repository. It documents the current architecture, the project conventions, and
the boundaries that must be respected when helping with development.

## 1. Mandatory Working Agreement

### Approval before implementation

- Do not implement, edit, create, delete, rename, install, format, or otherwise
  mutate project files unless the user has explicitly approved the implementation.
- A request to inspect, explain, review, diagnose, research, suggest, or plan is
  read-only. Present the findings or proposed changes and wait for approval.
- A discussion, an accepted idea, an item in `TODO.md`, or the existence of an
  obvious fix is not implementation approval.
- Clear instructions such as “implement”, “apply”, “change”, “fix”, “create”, or
  “rewrite” count as approval, but only for the scope explicitly requested.
- After approval, perform the normal supporting work required by that scope,
  including proportionate tests and the corresponding `AGENTS.md` update.
- If requirements are ambiguous or alternatives would materially change the
  result, explain the options and wait for the user's decision.
- Never broaden an approved change into unrelated cleanup or refactoring.

### `TODO.md` is user-owned and read-only

- Never edit, reorder, delete, complete, check off, or append to `TODO.md`.
- Items in `TODO.md` are reminders for the user. They are not instructions and do
  not authorize implementation.
- Reading `TODO.md` for context is allowed, but do not begin an item unless the
  user separately and explicitly requests its implementation.

### Keep this file current

- Update `AGENTS.md` as part of any approved change that makes one of its
  statements incomplete, inaccurate, or ambiguous. This includes changes to
  architecture, dependencies, commands, directories, data contracts, security
  boundaries, or development conventions.
- Keep the document descriptive of the current working tree. Remove obsolete
  guidance instead of accumulating historical notes.
- Do not add planned or speculative behavior as if it already existed.
- Small editorial/content-only changes do not require an update unless they alter
  a documented contract or workflow.

### Keep the READMEs synchronized

- Keep `README.md` and `README_PT_BR.md` accurate and synchronized with each other
  whenever an approved change affects installation, commands, configuration,
  content authoring, behavior, architecture, or other user-facing documentation.
- Update both language versions as part of the same approved implementation; do
  not leave one translation describing an older project state.
- Documentation maintenance that is directly required by an approved code change
  is part of that implementation and does not require separate approval.
- Do not rewrite or expand the READMEs for unrelated reasons.

### Keep tests current

- Inspect the relevant existing tests before every approved implementation and
  keep them synchronized with the behavior and contracts of the production code.
- Add or update focused tests whenever an approved change modifies behavior,
  fixes a defect, introduces an edge case, or changes a public or internal
  contract.
- If an implementation does not require a test change, verify that the existing
  coverage still exercises the affected behavior and state that no test files
  needed modification in the final report.
- Do not delete, weaken, skip, or rewrite a valid test merely to make a change
  pass. Treat an intentional behavior change and its corresponding expectation
  updates as one approved implementation.
- Run the relevant tests after implementation and report both the command and its
  result. If a test cannot be run, explain why.

## 2. Project Overview

Taberna is a configurable, static personal website and landing-page foundation.
The application shell is written in Vue, while localized site content is stored
as JSON manifests and sanitized HTML fragments under `public/`.

The bundled Portuguese and English content is fictional placeholder material.
The application supports browser-language detection, manual language switching,
hash-based navigation, responsive layout, reusable content components, and a
theme based on semantic CSS custom properties.

### Current scope and limitations

- The project is a client-only static application. It has no application backend,
  database, authentication, or server-side business logic.
- There is no `.env`-based configuration contract, container setup, or CI/CD
  workflow in the repository.
- Rendering is client-side. SSR, prerendering, and per-route SEO metadata are not
  implemented.
- The application synchronizes the document language, title, and description, but
  it does not provide per-page Open Graph or social-sharing metadata.
- Placeholder content and remote placeholder images are development material, not
  final production content.

## 3. Technology Stack

- Vue 3 with Composition API and `<script setup lang="ts">`
- TypeScript in strict mode
- Vite with a relative `base` for root or subdirectory deployment
- Pinia for application state
- Vue Router with hash history
- Tailwind CSS v4 through `@tailwindcss/vite`
- Lucide Vue for interface icons
- DOMPurify for dynamic HTML sanitization
- Vitest, Vue Test Utils, and jsdom for tests
- ESLint flat config and Prettier with the Tailwind CSS plugin
- Self-hosted Roboto, Roboto Serif, Roboto Mono, and Italianno fonts

Treat `package.json` as the source of truth for exact dependency versions.

## 4. Commands

```bash
npm run dev        # Start the Vite development server
npm run build      # Type-check, then create the production build
npm run preview    # Preview the production build
npm run test       # Run the Vitest suite once
npm run typecheck  # Run vue-tsc without emitting files
npm run lint       # Lint src/
npm run format     # Format TypeScript, Vue, and CSS files under src/
```

Use the smallest relevant verification while developing. Before handing off a
significant code change, normally run tests, type-checking, and linting; run the
production build when the change can affect bundling or deployment. Report any
check that could not be run or any failure that predates the approved change.

## 5. Current Repository Map

```text
public/
  config/
    languages.json          Language manifest
    en-us.json              English site manifest
    pt-br.json              Brazilian Portuguese site manifest
  content/{locale}/         Localized .htm fragments and nested pages
  fonts/                    Self-hosted font files
  images/                   Logo, texture, and other public images
  favicon.png
src/
  components/
    layouts/                Application structure and sanitized content outlet
    widgets/                Header, footer, navigation, sidebar, controls
    *.vue                   Content-facing reusable components
  pages/                    Home, language switcher, and dynamic slug pages
  stores/                   Pinia configuration, language, and loading stores
  styles/                   Theme tokens and shared Tailwind utilities
  test/                     Shared Vitest helpers and setup
  utils/                    Validation, fetching, sanitization, paths, metadata
  App.vue                   Bootstrap state and document metadata synchronization
  main.ts                   Vue, Pinia, router, styles, and app mounting
  router.ts                 Hash-based route definitions
  style.css                 Global stylesheet entry point
  web-components.ts         Registration of allowed `twc-*` custom elements
index.html                  SPA shell, fallback metadata, preloads, and CSP
vite.config.ts              Vite aliases, plugins, and Vitest configuration
```

Tests are colocated with the code they cover when practical and use the
`*.test.ts` suffix. Generated `dist/` output and dependencies are not source
files and must not be edited manually.

## 6. Application Architecture

### Bootstrap

`src/main.ts` imports global styles and registers content custom elements before
creating the Vue application. It installs Pinia and the router, then mounts
`App.vue`.

`App.vue` owns the bootstrap state: `loading`, `ready`, or `error`. Initialization
loads the language manifest first and the selected locale configuration second.
It shows a full-page skeleton while loading, an error/retry view on failure, and
the main container only after all required configuration is ready.

The application also keeps the document language, title, and meta description in
sync with the active locale and configuration through `document.util.ts`.

### State stores

- `language.store.ts` loads `public/config/languages.json`, resolves the locale
  from local storage, browser preferences, and the configured default, then
  persists the selection under `taberna-lang` when storage is available.
- `config.store.ts` validates a locale, loads its JSON manifest, fetches optional
  home and footer fragments in parallel, and publishes only a fully hydrated
  configuration.
- `loading.store.ts` tracks concurrent operations with unique tokens. Every
  `startLoading()` token must be passed to `stopLoading()` in a `finally` block.

Use `storeToRefs()` whenever retaining reactive Pinia properties outside the store
object. Store actions may be destructured directly.

Language switching is transactional: prepare the target configuration first,
then update the language, then publish the prepared configuration. A failed load
must leave the current language and configuration intact.

### Routing and pages

The router uses `createWebHashHistory(import.meta.env.BASE_URL)` and defines:

- `/` for the configured home fragment;
- `/language-switcher` for manual locale selection;
- `/:slug(.*)` for localized `.htm` content fragments, including nested paths.

Dynamic content routes include the `.htm` file name. For example,
`#/articles/article1.htm` loads
`public/content/{locale}/articles/article1.htm`.

Navigation inside manifests and HTML fragments must use hash URLs:

- use `#/` for home;
- use `#/language-switcher` for the language page;
- use `#/{relative-path}.htm` for localized content pages;
- do not use a server path such as `/articles/article1.htm`, and do not omit the
  `.htm` suffix from a content route.

`normalizeContentSlug()` is the route-to-file boundary. Slugs must be relative,
must end in `.htm`, may use safe nested directory segments, and must never allow
empty segments, traversal, unsupported extensions, or leading slashes.

`slug.page.vue` aborts superseded requests and ignores stale responses. Preserve
that behavior when changing route loading.

## 7. Configuration and Localized Content

### Language manifest

`public/config/languages.json` contains:

- `default`: one normalized locale from `available`;
- `available`: unique, normalized locale identifiers;
- `flags`: a display flag for every available locale;
- `names`: a display name for every available locale.

Every enabled locale must have a corresponding config and complete content set.
Keep technical paths and navigation destinations aligned across translations.

### Site manifest

Each `public/config/{locale}.json` is validated at runtime and contains:

- `title`, `image`, `description`, and `ownership` strings;
- optional `home` and `footer` paths to safe `.htm` fragments;
- `navigator`, an array of `{ text, href }` entries with safe links.

`ConfigurationManifest` represents these file references.
`LoadedConfiguration` replaces them with optional `homeContent` and
`footerContent` after successful fetching.

Configuration hydration is atomic: do not expose a partially loaded config when
one referenced fragment fails.

### HTML content fragments

Localized content lives in `public/content/{locale}/` as HTML fragments, not full
HTML documents. Do not include `<!doctype>`, `<html>`, `<head>`, or `<body>`.

Fragments may use ordinary safe HTML, Tailwind utility classes, inline style
attributes allowed by DOMPurify, and these registered custom elements:

| Element             | Content-facing attributes                                      | Defaults                         |
| ------------------- | -------------------------------------------------------------- | -------------------------------- |
| `twc-brand`         | `description`                                                  | `description=false`              |
| `twc-link`          | required `href`, required `label`, optional `external`         | `external=false`                 |
| `twc-panel`         | `emphasis`, `rounded`, `bordered`                              | all `false`                      |
| `twc-columns`       | `cols="1..12"`, numeric `gap`, `align="start|center|end"`      | `cols=1`, `gap=0`, `align=start` |
| `twc-rows`          | numeric `gap`, `align="start|center|end"`                       | `gap=0`, `align=start`           |
| `twc-quote`         | optional `title`                                               | no title                         |
| `twc-carousel`      | numeric `limit`, millisecond `delay`, boolean `show-timer`      | `1`, `5000`, `true`              |
| `twc-carousel-item` | none                                                           | —                                |

`twc-link` renders the required `label`; it does not render child content as the
link label. Mark external destinations with `external` and use an absolute HTTP
or HTTPS URL. Internal links must follow the hash-route convention above.

Files under `public/` are referenced without the `public/` prefix. In manifests
and content, prefer deployment-relative asset paths such as `images/logo.png`.
JavaScript and TypeScript code must construct public resource URLs with
`publicPath()`.

Boolean custom-element attributes follow HTML semantics: their presence is true;
for supported string/boolean cases, `"false"` is handled explicitly by the
component where documented in code.

Carousel `limit` values are floored and clamped to a minimum of one. Non-finite
limits fall back to one. Delays are clamped to zero or greater; a zero delay
disables autoplay. `show-timer="false"` hides the countdown display.

The carousel displays one item per page on small screens and up to `limit` items
per page from the medium breakpoint. It supports autoplay, manual pause/play,
pagination, hover/focus pausing, reduced-motion preferences, dynamically observed
items, and inaccessible-state management for off-page items. Preserve its ARIA,
keyboard, timing, and reduced-motion behavior.

### Localization boundary

- Editorial content, navigation labels, site metadata, ownership text, language
  names, and language flags belong in the locale-specific public files.
- Maintain equivalent routes and content paths for every enabled locale unless
  the user explicitly approves a language-specific difference.
- The Vue application currently contains hardcoded English shell text for loading,
  empty, failure, retry, menu, carousel, and ARIA states. There is no UI message
  dictionary for these strings.
- Do not claim that the entire interface is localized, and do not introduce a new
  UI translation system without explicit approval.

## 8. Data Loading and Security Boundaries

All dynamic JSON and HTML requests go through `src/utils/fetch.util.ts`.

- `fetchJson()` requires a JSON content type, parses the response, and validates
  unknown data with a runtime type guard.
- `fetchHtmlFragment()` requires an HTML content type and rejects full HTML
  documents, including SPA fallback pages.
- `ResourceError` distinguishes aborted, network, HTTP, not-found, content-type,
  invalid-data, and unexpected-document failures.
- Build public asset URLs with `publicPath()` so the relative Vite base continues
  to work in subdirectory deployments.

Untrusted HTML is rendered only by `components/layouts/content.vue`, which passes
it through `sanitizeContentHtml()` before `v-html`. DOMPurify has an explicit
allowlist for Taberna custom elements and their supported attributes. Do not add
a custom element or content attribute without updating its Vue component,
`web-components.ts`, the allowlists in `html.util.ts`, and the corresponding
sanitization/component tests.

Links are normalized through `normalizeLinkHref()`:

- only HTTP and HTTPS protocols are allowed;
- unsafe or malformed `href` values are removed or rejected;
- external `twc-link` destinations must be absolute;
- links opening a new tab receive `noopener noreferrer`.

`index.html` defines a Content Security Policy. When adding an external asset
origin, update the smallest relevant CSP directive and explain the security
impact. Do not weaken sanitization, URL validation, slug validation, or CSP merely
to make new content work.

The current CSP is delivered through a `<meta http-equiv>` element and allows:

- resources from the same origin by default;
- scripts and fonts from the same origin only;
- same-origin styles plus inline styles required by the current content/styling
  model;
- images from the same origin, `https://placehold.co`, and `data:` URLs.

A meta-delivered CSP has fewer capabilities than an HTTP response header. A
hosting-level CSP header may strengthen production security, but it is not
currently configured in this repository.

## 9. Styling and Responsive Design

Tailwind v4 is imported by `src/style.css`. The file then imports:

- `src/styles/theme.css` for fonts and semantic design tokens;
- `src/styles/utilities.css` for shared `app-*` utilities.

Component styles are unscoped because registered custom elements use
`shadowRoot: false`. Each Vue component style block that uses Tailwind directives
must reference the global stylesheet with `@reference '@/style.css';`.

Follow these rules:

- Use semantic CSS custom properties for application colors, borders, spacing,
  textures, timing, and component-specific theme values.
- Layering uses the `--z-*` tokens in `src/styles/theme.css`. Do not introduce raw
  `z-*` utilities in components; add or reuse a token instead.
- Do not place raw Tailwind palette color classes in component templates or
  localized HTML. Add or reuse an appropriate semantic token instead.
- Put stable component styling in the component's `<style>` block. Runtime values
  and content-authored layout utilities may remain inline where appropriate.
- Overlay components must render through `<Teleport to="body">` and position
  themselves with `fixed`. `tbc-backdrop` and `tbc-sidebar` are the current
  examples, and their host elements are set to `display: contents` in
  `src/styles/app.css`. A `position: absolute` overlay resolves against the
  nearest positioned ancestor, and `backdrop-filter`, `transform`, `filter`, and
  `contain` on an ancestor become the containing block for `fixed` descendants, so
  an overlay placed inside the sticky, blurred header is confined to it instead of
  covering the page.
- Preserve mobile-first behavior and the existing `48rem` medium breakpoint.
- Provide visible focus states and hover behavior that does not depend on hover
  support for essential interaction.
- Reuse the `app-*` utilities for shared duration, focus ring, gaps, padding,
  container layout, block spacing, texture, and inline code presentation.
- Keep fonts self-hosted unless the user explicitly approves a different asset
  strategy and its CSP/privacy implications.

## 10. Code Conventions

- Use Vue Composition API and `<script setup lang="ts">`.
- Maintain TypeScript strictness; do not silence errors with broad casts or
  `any` when a precise type or validation boundary is possible.
- Use the configured aliases: `@`, `@component`, `@layout`, `@page`, `@store`,
  `@style`, `@util`, and `@widget`.
- Follow the existing lowercase, hyphenated file naming convention for Vue
  components and pages.
- Keep business/data logic out of templates and isolate reusable validation in
  utilities.
- Validate external or file-backed data at runtime even when TypeScript types
  exist; TypeScript does not validate network responses.
- Do not add code comments unless the user asks for them or the behavior cannot be
  made clear through names and structure.
- Preserve accessibility: semantic elements, labels, focus management, keyboard
  navigation, `aria-*` state, reduced motion, and modal inertness are functional
  requirements.
- Add or update focused tests for bug fixes, edge cases, store transactions,
  sanitization, routing, and interactive behavior.
- Preserve existing user changes. Inspect the working tree before editing and do
  not overwrite unrelated modifications.
- Do not edit generated files, dependency lockfiles, or dependencies unless they
  are part of the approved scope.

## 11. Testing Guidance

- Vitest runs in jsdom with shared setup in `src/test/setup.ts`.
- Reuse helpers under `src/test/` for async control, browser APIs, HTTP mocks, and
  router setup.
- Store tests must create and activate an isolated Pinia instance.
- Test success and failure paths at network boundaries, including malformed data,
  incorrect content types, missing fragments, unsafe URLs/slugs, and stale or
  aborted requests.
- For interactive components, cover keyboard and pointer behavior, responsive
  media queries, timers, focus restoration, and reduced-motion preferences when
  relevant.
- Do not change production behavior solely to make a weak test pass. Fix the
  contract or improve the test setup.

## 12. Change Workflow

Before implementation approval:

1. Read this file and inspect the relevant source and tests.
2. Check the working tree and identify unrelated user changes.
3. Explain the observed behavior, proposed scope, risks, and meaningful choices.
4. Wait for explicit user approval.

After implementation approval:

1. Make the smallest coherent change within the approved scope.
2. Preserve the data-loading, sanitization, navigation, accessibility, and theme
   boundaries described above.
3. Inspect the affected tests and add or update coverage proportional to the
   behavior changed.
4. Run the relevant verification commands.
5. Update this `AGENTS.md` when the change affects anything it documents.
6. Update both READMEs when the change affects their user-facing documentation.
7. Report changed files, verification results, and any remaining risk or follow-up.

Never modify `TODO.md` during this workflow.
