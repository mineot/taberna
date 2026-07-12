# Project: Taberna

## O que e

**Taberna** e um site pessoal/landing page generico. Projeto em fase inicial, com conteudo placeholder ficticio. Sistema de i18n via JSON (pt-br/en-us) com deteccao de idioma do browser. Conteudo sera configurado posteriormente.

## Stack

- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 7.0.2 (strict mode)
- **Build**: Vite 8.1.4
- **CSS**: Tailwind CSS v4.3.2 (plugin oficial `@tailwindcss/vite`)
- **Icons**: Lucide Vue (`@lucide/vue` 1.24.0)
- **Markdown**: marked (parse) + @tailwindcss/typography (prose)
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
│   ├── config/
│   │   ├── pt-br.json         # Config completo em portugues
│   │   └── en-us.json         # Config completo em ingles
│   └── content/
│       ├── pt-br/
│       │   ├── intro.md       # Conteudo markdown em portugues
│       │   ├── servico-1.md   # Servico 1 em portugues
│       │   └── servico-2.md   # Servico 2 em portugues
│       └── en-us/
│           ├── intro.md       # Conteudo markdown em ingles
│           ├── service-1.md   # Service 1 in english
│           └── service-2.md   # Service 2 in english
├── src/
│   ├── main.ts                # Entry point — mount Vue em #app
│   ├── App.vue                # Root — useLocale + useConfig, skeleton, dynamic title, transitions
│   ├── env.d.ts               # Tipos para .vue
│   ├── style.css              # Tailwind v4 + @font-face + @theme custom + typography plugin
│   ├── composables/
│   │   ├── useConfig.ts       # Fetch de config por idioma (config/{locale}.json)
│   │   ├── useLocale.ts       # Detecao de idioma (browser/localStorage/manifest)
│   │   └── useMarkdown.ts     # Fetch + parse de arquivos markdown com cache
│   └── types/
│       └── config.ts          # Interfaces: AppConfig, SiteConfig, MenuItem, VerticalPosition, etc.
└── dist/                      # Build de producao
```

## Sistema de Temas (style.css)

Paleta de cores mapeada via `@theme` no Tailwind v4:

| Token | Escala | Uso real no codigo |
|---|---|---|
| `primary-*` | olive-50..950 | Via utilities (800, 700, 800/950, 950, 100, 200, 300, 400, 700) |
| `secondary-*` | amber-50..950 | Via utility `app-accent` (400) |
| `asset-*` | taupe-50..950 | Via utility `app-section-destak` (900) |

Font stacks customizados:
- `--font-sans`: Roboto
- `--font-serif`: Roboto Serif
- `--font-mono`: Roboto Mono
- `--font-fancy`: Italianno (decorativa/cursiva)

Utilitarios customizados:
- `app-duration` → `duration-300`
- `app-background` → `bg-primary-800`
- `app-background-hover` → `bg-primary-700`
- `app-background-header` → `bg-primary-800/95`
- `app-background-footer` → `bg-primary-950`
- `app-text` → `text-primary-100`
- `app-text-muted` → `text-primary-200`
- `app-text-body` → `text-primary-300`
- `app-text-subtle` → `text-primary-400`
- `app-accent` → `text-secondary-400`
- `app-accent-hover` → `hover:text-secondary-300`
- `app-border` → `border-primary-700`
- `app-title` → `font-fancy app-accent`
- `app-title-text` → `mt-2 leading-[0]`
- `app-section` → `flex flex-col gap-4 md:flex-row md:gap-8`
- `app-section-title` → `text-2xl font-bold`
- `app-section-subtitle` → `app-accent mt-1`
- `app-section-content` → `mt-4 flex flex-col gap-6 md:flex-row`
- `app-section-image` → `w-full rounded-lg object-cover md:w-1/2`
- `app-section-destak` → `bg-asset-900 -mx-6 px-6 py-8`
- `app-container` → `mx-auto w-full max-w-4xl px-6`
- `app-logo` → `h-8 min-h-5 w-8 min-w-5 rounded-full object-cover`
- `app-icon-btn` → `app-text-muted hover:app-accent app-duration cursor-pointer transition-colors`
- `app-flag-btn` → `app-duration cursor-pointer transition-all hover:scale-110`
- `app-nav-link` → `app-text hover:app-background-hover hover:app-accent app-duration rounded-lg px-3 py-2 transition-colors`
- `app-backdrop` → `fixed inset-0 z-60 bg-black/60 backdrop-blur-sm md:hidden`
- `app-sidebar` → `app-background app-text fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl md:hidden`
- `app-footer` → `app-border app-background-footer app-text-subtle border-t py-6 text-center`

Utilitarios z-index (definidos em `<style>` global no App.vue, nao no style.css):
- `.z-60` → `z-index: 60` (backdrop do mobile menu)
- `.z-70` → `z-index: 70` (sidebar do mobile menu)

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

- **CSS typo**: `@applu font-sans` em `src/style.css:123` — deveria ser `@apply font-sans`

## O que NAO existe ainda

- Roteamento (Vue Router)
- Gerenciamento de estado (Pinia/Vuex)
- Testes (Vitest/Jest/Cypress/Playwright)
- CI/CD (GitHub Actions, etc.)
- Docker
- Scripts de lint/format no package.json
- Configuracao ESLint (arquivo de config)
- Arquivo `.env`

## Observacoes

- `public/icons.svg` (sprite SVG customizado) existe mas nao esta sendo usado — Lucide Vue esta disponivel para substitui-lo

## Convencoes

- Composition API com `<script setup lang="ts">`
- TypeScript strict
- Tailwind CSS v4 via `@import 'tailwindcss'` (CSS-first config, sem tailwind.config.js)
- Componentes em lowercase com hifen: `header-brand.vue`, `header-menu-item.vue`
- Scoped styles (App.vue usa `@reference` para acessar tema do style.css)
- Nao adicionar comentarios no codigo (so se pedido)
- Conteudo do site em arquivos JSON (`public/config/`) e markdown (`public/content/`)
- **SEMPRE atualizar este arquivo (AGENTS.md) apos qualquer mudanca significativa no codigo**

## FIXMEs pendentes (do commit anterior)

- Criar favicon real (index.html)
- Configurar conteudo real nos arquivos de config e markdown

## Git

- Branch: `master` (current), `backup`
- Sem remote configurado

## Sistema de i18n

### Fluxo

1. `useLocale()` detecta idioma: localStorage → navigator.languages → languages.json.default
2. `useConfig(locale)` busca `public/config/{locale}.json`
3. `App.vue` atualiza `document.documentElement.lang` e `document.title` (via watch no config)
4. Switcher de bandeiras no header/sidebar atualiza locale + salva no localStorage

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

### Configs por idioma

Cada `public/config/{locale}.json` e completo e independente. Dados nao-traduzidos (hrefs, ids, urls, images) sao os mesmos em todos os idiomas.

### Conteudo Markdown

Sections podem usar arquivos markdown via campo `contentFile` (array de strings):

- Arquivos em `public/content/{locale}/*.md`
- Buscados em runtime via `useMarkdown()` com cache
- Parse com `marked`, renderizado com `v-html` + classe `prose` (Tailwind Typography)
- Sections sem `contentFile` continuam usando `content[]` como fallback
- Multiplas strings = multiplos arquivos lado a lado (empilha no mobile)

### Posicionamento Vertical

Campo `imagePosition` controla alinhamento vertical da imagem na section:

| Valor | Comportamento |
|---|---|
| `"top"` | Imagem alinhada ao topo (`items-start`) |
| `"center"` | Imagem centralizada (padrao) |
| `"bottom"` | Imagem alinhada ao fundo (`items-end`) |

Se nao informado, assume `"center"`.

Campo `contentPosition` controla alinhamento vertical do conteudo na section:

| Valor | Comportamento |
|---|---|
| `"top"` | Conteudo alinhado ao topo (`items-start`) |
| `"center"` | Conteudo centralizado (padrao) |
| `"bottom"` | Conteudo alinhado ao fundo (`items-end`) |

Se nao informado, assume `"center"`.

**Precedencia**: `contentPosition` tem precedencia sobre `imagePosition` para o alinhamento flex. `imagePosition` controla apenas o corte da imagem (`object-position`). Ambos usam o tipo `VerticalPosition` em `src/types/config.ts`.

### Titulo da Secao (Opcional)

Campo `title` na section e opcional. Se nao informado, o `<h2>` nao e renderizado.

### Destaque de Secao (`destak`)

Campo `destak` (booleano, opcional) na section aplica um fundo diferente usando a paleta `asset` (taupe):

- Quando `true`: aplica `app-section-destak` → `bg-asset-900 -mx-6 px-6 py-8`
- O `-mx-6` quebra a margem do container para "esticar" o fundo
- Disponivel na interface `Section` em `src/types/config.ts`
- Para usar: adicionar `"destak": true` no JSON da seção desejada

### Menu Mobile (Offcanvas)

Em telas pequenas (`< md`), o menu de navegacao e substituido por um icone hamburger (Lucide `Menu`). Ao clicar:

- Abre um sidebar da direita com titulo + imagem do site + menu + switcher de idioma
- Backdrop escuro com blur por tras
- Fecha ao clicar no backdrop, no icone X, ou em qualquer link
- Animacao de slide-in/slide-out via `<Transition>`
- Teleport do sidebar para `<body>` via `<Teleport>`

### Comportamento Condicional (menu + idiomas)

O header e sidebar se adaptam ao conteudo:

- **`menu: []` (array vazio)**: `<nav>` nao e renderizado no header nem no sidebar
- **Um so idioma**: switcher de bandeiras nao e exibido
- **Sem menu E um so idioma**: hamburger nao e exibido (sidebar inacessivel)
- **Hamburger aparece**: quando ha menu OU mais de um idioma

### Transicoes

- **Sidebar/Backdrop**: `<Transition name="sidebar">` e `<Transition name="backdrop">` no mobile menu (slide + opacity)
- **Titulo**: `:key="locale"` no h1 com `app-duration` — fade suave (0.3s) ao trocar idioma

### Titulo do Site (Header + Sidebar)

O titulo do site (imagem + texto) e um link `<a href="/">` com:

- **`app-title`** no container `<a>` — fonte fancy + cor accent
- **`app-accent-hover`** no container `<a>` — hover clara a cor (secondary-400 → 300)
- **`app-title-text`** no `<h1>`/`<h2>` — `mt-2 leading-[0]` para alinhar com a imagem
- **`app-duration`** — transicao suave (0.3s) no hover
- **Sidebar**: Mesmo esquema, `<a href="/">` com `app-title app-accent-hover app-duration` + `@click="closeMenu"` para fechar o menu ao clicar

### Imagem do Site (Header + Sidebar)

Campo `site.image` no config controla exibicao de imagem ao lado do titulo:

- **Opcional**: Se nao definido ou vazio, nao exibe nada
- **Tamanho**: `h-8 w-8` (32px) mobile, `md:h-12 md:w-12` (48px) desktop, `min-h-5 min-w-5` (20px minimo)
- **Formato**: `rounded-full` (circular)
- **Posicao**: Ao lado esquerdo do titulo, com `gap-3` de espacamento
- **Sidebar**: Mesmo tamanho mobile (`h-8 w-8`) e titulo `text-3xl` (mesmo do header mobile)
