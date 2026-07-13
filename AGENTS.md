# Project: Taberna

## O que e

**Taberna** e um site pessoal/landing page generico. Projeto em fase inicial, com conteudo placeholder ficticio. Sistema de i18n via JSON (pt-br/en-us) com deteccao de idioma do browser. Conteudo sera configurado posteriormente.

## Stack

- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 5.9.3 (strict mode)
- **Build**: Vite 8.1.1
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
│   ├── fonts/                 # Roboto*, Italianno (self-hosted TTFs)
│   ├── languages.json         # Manifest: idiomas disponiveis + default
│   ├── config/
│   │   ├── pt-br.json         # Config completo em portugues
│   │   └── en-us.json         # Config completo em ingles
│   └── content/
│       ├── pt-br/
│       │   ├── intro.md       # Conteudo markdown em portugues
│       │   ├── sobre.md       # Pagina Sobre em portugues
│       │   ├── servicos.md    # Pagina Servicos em portugues
│       │   ├── servico-1.md   # Servico 1 em portugues
│       │   ├── servico-2.md   # Servico 2 em portugues
│       │   └── footer.md      # Footer customizado em portugues
│       └── en-us/
│           ├── intro.md       # Conteudo markdown em ingles
│           ├── sobre.md       # Pagina Sobre em ingles
│           ├── servicos.md    # Pagina Servicos em ingles
│           ├── service-1.md   # Service 1 in english
│           ├── service-2.md   # Service 2 in english
│           └── footer.md      # Footer customizado em ingles
├── src/
│   ├── main.ts                # Entry point — mount Vue em #app + router
│   ├── App.vue                # Root — layout (header/sidebar/footer) + router-view
│   ├── env.d.ts               # Tipos para .vue
│   ├── style.css              # Tailwind v4 + @font-face + @theme custom + typography plugin
│   ├── components/
│   │   └── section-carousel.vue # Carousel de slides com auto-play, botoes e dots
│   ├── router/
│   │   └── index.ts           # Vue Router — rotas /, /languages e /:slug
│   ├── views/
│   │   ├── HomeView.vue       # Home — sections do config
│   │   ├── LanguagesView.vue  # Pagina de selecao de idioma (grid de bandeiras)
│   │   └── PageView.vue       # Pagina — carrega markdown pelo slug
│   ├── composables/
│   │   ├── useConfig.ts       # Fetch de config por idioma (config/{locale}.json)
│   │   ├── useLocale.ts       # Detecao de idioma (browser/localStorage/manifest)
│   │   └── useMarkdown.ts     # Fetch + parse de arquivos markdown com cache
│   └── types/
│       └── config.ts          # Interfaces: AppConfig, Section, CarouselConfig, MenuItem, etc.
└── dist/                      # Build de producao
```

## Sistema de Temas (style.css)

Paleta de cores mapeada via `@theme` no Tailwind v4:

| Token | Escala | Uso real no codigo |
|---|---|---|
| `primary-*` | olive-50..950 | `app-background` (800), `app-background-hover` (700), `app-background-header` (900/95), `app-background-footer` (950), `app-text` (100), `app-text-muted` (200), `app-text-body` (300), `app-text-subtle` (400), `app-border` (700), `app-dot-inactive` (600, 500), `app-carousel-btn-bg` (800/80), `app-skeleton` (700) |
| `secondary-*` | amber-50..950 | `app-accent` (400), `app-accent-hover` (300), `app-dot-active` (400) |
| `tertiary-*` | taupe-50..950 | `app-section-destak` (800) |

Font stacks customizados:
- `--font-sans`: Roboto
- `--font-serif`: Roboto Serif
- `--font-mono`: Roboto Mono
- `--font-fancy`: Italianno (decorativa/cursiva)

Utilitarios customizados:
- `app-duration` → `duration-300`
- `app-background` → `bg-primary-800`
- `app-background-hover` → `bg-primary-700`
- `app-background-header` → `bg-primary-900/95`
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
- `app-section-content` → `mt-4 flex flex-col flex-wrap gap-6 md:flex-row`
- `app-section-image` → `w-full rounded-lg object-cover md:w-1/2`
- `app-section-destak` → `bg-tertiary-800 -mx-6 px-6 py-8`
- `app-container` → `mx-auto w-full max-w-4xl px-6`
- `app-logo` → `h-8 min-h-5 w-8 min-w-5 rounded-full object-cover`
- `app-icon-btn` → `app-text-muted hover:app-accent app-duration cursor-pointer transition-colors`
- `app-flag-btn` → `app-duration cursor-pointer transition-all hover:scale-110`
- `app-nav-link` → `app-text hover:app-background-hover hover:app-accent app-duration rounded-lg px-3 py-2 transition-colors`
- `app-backdrop` → `fixed inset-0 z-60 bg-black/60 backdrop-blur-sm`
- `app-sidebar` → `app-background app-text fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl`
- `app-footer` → `app-border app-background-footer app-text-subtle border-t py-6 px-6 text-sm flex flex-col items-center`
- `app-dot-active` → `bg-secondary-400`
- `app-dot-inactive` → `bg-primary-600 hover:bg-primary-500`
- `app-carousel-btn-bg` → `bg-primary-800/80`
- `app-skeleton` → `bg-primary-700`
- `app-ring` → `ring-secondary-400`

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

## O que NAO existe ainda

- Gerenciamento de estado (Pinia/Vuex)
- Testes (Vitest/Jest/Cypress/Playwright)
- CI/CD (GitHub Actions, etc.)
- Docker
- Scripts de lint/format no package.json
- Configuracao ESLint (arquivo de config)
- Arquivo `.env`
- Favicon real (index.html)
- README.md (substituir boilerplate do Vite)
- Meta tags SEO (description, Open Graph)

## Observacoes

- Conteudo do site em arquivos JSON (`public/config/`) e markdown (`public/content/`)

## Convencoes

- Composition API com `<script setup lang="ts">`
- TypeScript strict
- Tailwind CSS v4 via `@import 'tailwindcss'` (CSS-first config, sem tailwind.config.js)
- Componentes em lowercase com hifen: `header-brand.vue`, `header-menu-item.vue`
- Scoped styles (App.vue usa `@reference` para acessar tema do style.css)
- Nao adicionar comentarios no codigo (so se pedido)
- Conteudo do site em arquivos JSON (`public/config/`) e markdown (`public/content/`)
- **SEMPRE atualizar este arquivo (AGENTS.md) apos qualquer mudanca significativa no codigo**

## FIXMEs pendentes

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
4. Switcher de bandeiras no header/sidebar chama `switchLocale(lang)`:
   - `setLocale(lang)` — atualiza locale + localStorage
   - `await loadConfig(lang)` — carrega config do novo idioma antes de navegar
   - `router.push('/')` — redireciona para home para evitar page not found
5. `HomeView` observa `config` (nao `locale`) para buscar markdown — garante que o config correto ja esta carregado

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

Sections podem usar arquivos markdown via campo `contentFiles` (array de strings):

- Arquivos em `public/content/{locale}/*.md`
- Buscados em runtime via `useMarkdown()` com cache
- Parse com `marked`, renderizado com `v-html` + classe `prose` (Tailwind Typography)

### Regras de Conteudo por Section

Cada section segue regras estritas baseadas no tipo de conteudo:

| Atributo | Image | content (texto) | carousel |
|---|---|---|---|
| `content` (texto) | ✅ | — | ❌ |
| `contentFiles` (1 item) | ✅ | ❌ | ❌ |
| `contentFiles` (2+ items) | ❌ | ❌ | ✅ |

**`content` (texto simples):**
- Array de strings renderizadas como `<p>`
- Pode ter `image` ao lado
- Ignora `contentFiles` e `carousel`

**`contentFiles` com 1 item:**
- Renderiza 1 arquivo markdown
- Pode ter `image` ao lado
- Ignora `content` e `carousel`

**`contentFiles` com 2+ items:**
- Renderiza multiplos arquivos markdown lado a lado (empilha no mobile)
- Ignora `image` e `content`
- Pode ter `carousel` para exibir como slides

### Paginas (rotas)

Cada rota `/:slug` carrega um arquivo markdown individual:

- Arquivo: `public/content/{locale}/{slug}.md`
- Se `content` definido no menuItem → usa esse valor como nome do arquivo
- Se nao definido → usa o slug da rota (ex: `/sobre` → `sobre.md`)
- Renderizado como `<article class="prose prose-invert">`
- Skeleton loader durante carregamento
- Mensagem de erro "Page not found" se arquivo nao existir

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

- Quando `true`: aplica `app-section-destak` → `bg-tertiary-800 -mx-6 px-6 py-8`
- O `-mx-6` quebra a margem do container para "esticar" o fundo
- Disponivel na interface `Section` em `src/types/config.ts`
- Para usar: adicionar `"destak": true` no JSON da seção desejada

### Carousel de Secoes

Campo `carousel` (objeto opcional) na section ativa o modo carousel para o conteudo:

- Quando definido, o conteudo (`contentFile` ou `content`) e exibido como slides com transicao
- A imagem da section permanece estatica (fora do carousel)
- Componente: `src/components/section-carousel.vue`

#### Configuracao (`CarouselConfig`)

| Campo | Tipo | Default | Descricao |
|---|---|---|---|
| `autoPlay` | `boolean` | `true` | Auto-avanca os slides |
| `interval` | `number` | `5000` | Milissegundos entre slides |
| `buttons` | `boolean` | `true` | Exibe setas prev/next (Lucide ChevronLeft/ChevronRight) |
| `dots` | `boolean` | `true` | Exibe indicadores de posicao (dots) |
| `itemsPerView` | `number` | `1` | Quantos itens visiveis simultaneamente |

Todos os campos sao opcionais. Exemplo de uso:

```json
{
  "id": "depoimentos",
  "contentFile": ["depo-1.md", "depo-2.md", "depo-3.md"],
  "carousel": {
    "autoPlay": true,
    "interval": 4000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 3
  }
}
```

#### Comportamento

- **Auto-play**: inicia ao montar o componente, avanca slides automaticamente
- **Pausa no hover**: auto-play pausa quando mouse esta sobre o carousel, retoma ao sair
- **Botoes prev/next**: fixos nas laterais do conteudo (layout flex). Se `buttons: false`, conteudo ocupa 100%
- **Dots**: clique define o slide diretamente; dot ativo usa utility `app-dot-active`
- **Acessibilidade**: `role="group"`, `aria-label` no container e botoes
- **Se 1 slide**: botoes e dots nao sao exibidos

#### Comportamento por `itemsPerView`

**`itemsPerView: 1`** (padrao):
- 1 slide visivel por vez
- Transicao: fade com `opacity` e `duration-500`
- Navegacao circular (volta ao inicio ao chegar no fim)
- Dots = numero de slides

**`itemsPerView: N`** (N > 1):
- N slides visiveis lado a lado
- Transicao: slide horizontal com `translateX` e `duration-500`
- Cada slide ocupa `100% / N` do espaco disponivel
- Navegacao por pagina (avanca/retorna N itens por clique)
- Dots = `ceil(slides.length / N)` (posicoes disponiveis)
- Nao e circular (para na ultima pagina)

#### Precedencia

Se `carousel` esta definido, ele tem precedencia sobre a renderizacao estatica do conteudo. O componente so e renderizado se houver conteudo (`contentFile` ou `content`).

### Menu Mobile (Offcanvas)

Em telas pequenas (`< md`), o menu de navegacao e substituido por um icone hamburger (Lucide `Menu`). Ao clicar:

- Abre um sidebar da direita com titulo + imagem do site + menu + switcher de idioma
- Backdrop escuro com blur por tras
- Fecha ao clicar no backdrop, no icone X, ou em qualquer link
- Animacao de slide-in/slide-out via `<Transition>`
- Teleport do sidebar para `<body>` via `<Teleport>`

### Menu Desktop com Muitos Itens (> 4)

Quando o menu tem mais de 4 itens, o header se adapta em todas as telas:

- `<nav>` inline nao e renderizado (em nenhuma resolucao)
- Bandeira do idioma no header nao e exibida
- Hamburger aparece em **todas** as telas (inclusive desktop)
- Ao clicar, abre o mesmo sidebar offcanvas
- Sidebar funciona em todas as resolucoes (sem `md:hidden`)

### Sidebar (Todas as Resolucoes)

O sidebar agora funciona em desktop e mobile:

- `app-backdrop` e `app-sidebar` nao possuem `md:hidden`
- Quando > 4 itens de menu, o hamburger aparece em desktop e abre o sidebar
- Estrutura do sidebar:
  - **Header** (`shrink-0`): titulo + imagem + botao X
  - **Menu** (`flex-1 overflow-y-auto`): unica secao que rola
  - **Footer de idiomas** (`shrink-0`): fixo no fundo, nao rola
- Link de idioma no footer: mostra bandeira atual + codigo (ex: "🇧🇷 pt-br"), linka para `/languages`

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
- **`app-accent-hover`** no container `<a>` — hover clara a cor (secondary-400 → secondary-300)
- **`app-title-text`** no `<h1>`/`<h2>` — `mt-2 leading-[0]` para alinhar com a imagem
- **`app-duration`** — transicao suave (0.3s) no hover
- **Sidebar**: Mesmo esquema, `<a href="/">` com `app-title app-accent-hover app-duration` + `@click="closeMenu"` para fechar o menu ao clicar
- **Opcional**: Campo `title` no config e opcional — se ausente, `<h1>`/`<h2>` nao sao renderizados (permite usar apenas imagem)

### Imagem do Site (Header + Sidebar)

Campo `site.image` no config controla exibicao de imagem ao lado do titulo:

- **Opcional**: Se nao definido ou vazio, nao exibe nada
- **Tamanho**: `h-8 w-8` (32px) mobile, `md:h-12 md:w-12` (48px) desktop, `min-h-5 min-w-5` (20px minimo)
- **Formato**: `rounded-full` (circular)
- **Posicao**: Ao lado esquerdo do titulo, com `gap-3` de espacamento
- **Sidebar**: Mesmo tamanho mobile (`h-8 w-8`) e titulo `text-3xl` (mesmo do header mobile)

## Sistema de Rotas (Vue Router)

### Estrutura

| Rota | Componente | Conteudo |
|---|---|---|
| `/` | `HomeView.vue` | Sections do config JSON |
| `/languages` | `LanguagesView.vue` | Grid de idiomas disponiveis (bandeira + codigo) |
| `/:slug` | `PageView.vue` | Markdown carregado de `public/content/{locale}/{slug}.md` |

### Configuracao

- **History mode**: `createWebHistory()` ( URLs limpas sem `#` )
- **Catch-all**: rota `/:pathMatch(.*)*` redireciona para `/`
- **Scroll behavior**: suporta hash anchors, posicao salva, e scroll to top
- **Arquivo**: `src/router/index.ts`

### MenuItem (Interface)

```ts
export interface MenuItem {
  label: string;
  href?: string;    // anchor link (ex: "#sobre")
  route?: string;   // Vue Router path (ex: "/sobre")
  content?: string; // override do arquivo markdown (ex: "sobre.md")
}
```

### Comportamento do Menu

- **`route` definido** → renderiza `<router-link :to="item.route">`
- **`href` com `#`** (anchor) → renderiza `<router-link :to="'/' + item.href">` — navega para `/` e o `scrollBehavior` faz scroll suave ate o anchor
- **`href` externa** (http/https) → renderiza `<a :href="item.href">` (abre em nova aba)
- **`route` + `content`** → rota usa `content` como nome do arquivo markdown
- **Ambos definidos** → `route` tem precedencia

### Resolucao do Conteudo (PageView)

Se `content` nao for definido no menuItem, o sistema busca `{slug}.md`:

- Rota `/sobre` → busca `public/content/{locale}/sobre.md`
- Rota `/servicos` → busca `public/content/{locale}/servicos.md`
- Com `"content": "custom.md"` → busca `public/content/{locale}/custom.md`

### Conteudo das Paginas

Arquivos markdown em `public/content/{locale}/*.md`:
- Buscados em runtime via `useMarkdown()` com cache
- Parse com `marked`, renderizado com `<article class="prose prose-invert">`
- Skeleton loader durante carregamento
- Mensagem de erro "Page not found" se arquivo nao existir
- **Protecao SPA fallback**: `useMarkdown` checa `Content-Type` da resposta — se for `text/html` (Vite retorna `index.html` para arquivos inexistentes), lança erro em vez de renderizar HTML cru

### Footer Customizado

Campo `contentFile` no `footer` do config permite carregar conteudo markdown para o footer:

- **Opcional**: Se nao definido, footer mostra apenas ownership + "Powered by Mineot"
- **Arquivo**: `public/content/{locale}/{contentFile}` (ex: `footer.md`)
- **Renderizacao**: HTML inline com Tailwind (grid, links, etc.)
- **Estrutura**: Markdown com HTML para layout (grid de colunas)
- **Separador**: Barra horizontal entre conteudo markdown e a linha de ownership/powered by
- **Ownership**: Campo `ownership` no config (ex: "© 2026 Nome")
- **Powered by**: Texto estatico com link para `https://github.com/mineot/taberna`
- **Links**: Estilizados via `.app-footer-content :deep(a)` — underline + `app-text-subtle` que muda para `app-accent` no hover
- **Layout**: Mobile = empilhado, Desktop = `space-between`
- **Exemplo de conteudo footer.md**:
  ```html
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div>### Titulo\nDescricao</div>
    <div>### Links\n- [Link](url)</div>
    <div>### Social\n- [GitHub](url)</div>
  </div>
  ```
