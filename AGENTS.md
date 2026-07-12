# Project: Taberna

## O que e

**Taberna** e um site pessoal/landing page voltado para um profissional de Educacao Parental ("Marina Muller Pires"). Projeto em fase inicial, com conteudo placeholder (Lorem Ipsum). Sistema de i18n via JSON (pt-br/en-us) com deteccao de idioma do browser.

## Stack

- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 7.0.2 (strict mode)
- **Build**: Vite 8.1.1
- **CSS**: Tailwind CSS v4.3.2 (plugin oficial `@tailwindcss/vite`)
- **Icons**: Lucide Vue (`@lucide/vue` 1.24.0)
- **Formatting**: Prettier 3.9.5 (single quotes, semicolons, plugin tailwindcss)
- **Linting**: ESLint 10.6.0 (eslint-plugin-vue, eslint-config-prettier)
- **Fonts**: Roboto (sans/serif/mono) + Italianno (decorativa), self-hosted em `public/fonts/`

## Scripts

```bash
npm run dev      # Vite dev server com HMR (http://localhost:5173)
npm run build    # vue-tsc --noEmit && vite build (type-check + build)
npm run preview  # Preview do build de producao (http://localhost:4173)
```

**Nao ha scripts de lint/format no package.json** — apesar de ESLint e Prettier estarem instalados.

## Estrutura atual (working tree)

```
taberna/
├── index.html                 # SPA shell, preload de fonts, favicon
├── package.json               # "taberna", type: module
├── tsconfig.json              # ESNext, strict, bundler resolution
├── vite.config.ts             # plugins: vue + @tailwindcss/vite
├── .prettierrc                # singleQuote, semi, tailwind plugin
├── public/
│   ├── favicon.svg            # SVG lightning bolt
│   ├── icons.svg              # Sprite SVG: GitHub, Discord, X, Bluesky, etc.
│   ├── fonts/                 # Roboto*, Italianno (self-hosted TTFs)
│   ├── languages.json         # Manifest: idiomas disponiveis + default
│   └── config/
│       ├── pt-br.json         # Config completo em portugues
│       └── en-us.json         # Config completo em ingles
├── src/
│   ├── main.ts                # Entry point — mount Vue em #app
│   ├── App.vue                # Root — usa useLocale + useConfig, skeleton loading, dynamic title
│   ├── env.d.ts               # Tipos para .vue
│   ├── style.css              # Tailwind v4 + @font-face + @theme custom
│   ├── composables/
│   │   ├── useConfig.ts       # Fetch de config por idioma (config/{locale}.json)
│   │   └── useLocale.ts       # Detecao de idioma (browser/localStorage/manifest)
│   └── types/
│       └── config.ts          # Interfaces: AppConfig, SiteConfig, MenuItem, etc.
└── dist/                      # Build de producao
```

### Componentes (no ultimo commit, antes da limpeza do working tree)

```
src/components/
├── header/
│   ├── index.vue              # Header sticky — compoe Brand + Menu
│   ├── header-brand.vue       # Logo + titulo "Educacao Parental" (Italianno)
│   ├── header-menu.vue        # Nav responsiva (hamburger mobile, itens desktop)
│   └── header-menu-item.vue   # Item de nav placeholder
├── panel.vue                  # Layout 2 colunas com slots #left/#right, prop dark
├── text.vue                   # Tipografia: title (obrigatorio), subtitle (opcional), slot
└── footer.vue                 # Stub — NAO era importado no App.vue
```

## Sistema de Temas (style.css)

Paleta de cores mapeada via `@theme` no Tailwind v4:

| Token | Escala | Uso |
|---|---|---|
| `primary-*` | olive-50..950 | Cor principal (fundo, elementos) |
| `secondary-*` | amber-50..950 | Cor secundaria (destaques, acentos) |
| `asset-*` | taupe-50..950 | Cor de assets/terciaria |

Font stacks customizados:
- `--font-sans`: Roboto
- `--font-serif`: Roboto Serif
- `--font-mono`: Roboto Mono
- `--font-fancy`: Italianno (decorativa/cursiva)

Utilitarios customizados:
- `app-duration` → `duration-300`

## Configuracoes Importantes

### tsconfig.json
- Target: ESNext, Module: ESNext, moduleResolution: "bundler"
- Strict: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`

### vite.config.ts
- Plugins: `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Sem aliases customizados

### .prettierrc
- `singleQuote: true`, `semi: true`
- Plugin `prettier-plugin-tailwindcss` para ordenacao automatica de classes

## Bugs Conhecidos

- **CSS typo**: `@applu font-sans` em `src/style.css:122` — deveria ser `@apply font-sans`

## O que NAO existe ainda

- Roteamento (Vue Router)
- Gerenciamento de estado (Pinia/Vuex)
- Testes (Vitest/Jest/Cypress/Playwright)
- CI/CD (GitHub Actions, etc.)
- Docker
- Scripts de lint/format no package.json
- Configuracao ESLint (arquivo de config)
- Arquivo `.env`

## Convencoes

- Composition API com `<script setup lang="ts">`
- TypeScript strict
- Tailwind CSS v4 via `@import 'tailwindcss'` (CSS-first config, sem tailwind.config.js)
- Componentes em lowercase com hifen: `header-brand.vue`, `header-menu-item.vue`
- Scoped styles
- Nao adicionar comentarios no codigo (so se pedido)

## FIXMEs pendentes (do commit anterior)

- Criar favicon real (index.html)
- Substituir imagem placeholder do brand (header-brand.vue)
- Obter nome do brand via config JSON

## Git

- Branch: `master` (current), `backup`
- Sem remote configurado
- Arquivos deletados no working tree: todos os componentes, AGENTS.md, sample-logo.svg

## Sistema de i18n

### Fluxo

1. `useLocale()` detecta idioma: localStorage → navigator.languages → languages.json.default
2. `useConfig(locale)` busca `public/config/{locale}.json`
3. `App.vue` atualiza `document.documentElement.lang` e `document.title` (via watch no config)
4. Switcher PT/EN no header atualiza locale + salva no localStorage

### Manifest (`public/languages.json`)

```json
{ "default": "pt-br", "available": ["pt-br", "en-us"] }
```

### Configs por idioma

Cada `public/config/{locale}.json` e completo e independente. Dados nao-traduzidos (hrefs, ids, urls, images) sao os mesmos em todos os idiomas.
