# Project: Taberna

## O que e

**Taberna** e um site pessoal/landing page generico. Projeto em fase inicial, com conteudo placeholder ficticio. Sistema de i18n via JSON (pt-br/en-us) com deteccao de idioma do browser. Conteudo sera configurado posteriormente.

## Stack

- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 5.9.3 (strict mode)
- **Build**: Vite 8.1.1
- **CSS**: Tailwind CSS v4.3.2 (plugin oficial `@tailwindcss/vite`)
- **Icons**: Lucide Vue (`@lucide/vue` 1.24.0)
- **Markdown**: marked (parse) + DOMPurify (sanitize) + @tailwindcss/typography (prose)
- **Formatting**: Prettier 3.9.5 (single quotes, semicolons, plugin tailwindcss)
- **Linting**: ESLint 10.6.0 (eslint-plugin-vue, eslint-config-prettier, typescript-eslint)
- **Tests**: Vitest 4.1.10 + Vue Test Utils 2.4.11 + jsdom 29.1.1
- **Fonts**: Roboto (sans/serif/mono) + Italianno (decorativa), self-hosted em `public/fonts/`

## Scripts

```bash
npm run dev        # Vite dev server com HMR (http://localhost:5173)
npm run build      # vue-tsc --noEmit && vite build (type-check + build)
npm run preview    # Preview do build de producao (http://localhost:4173)
npm run test       # Testes unitarios com Vitest
npm run typecheck  # Apenas type-check (vue-tsc --noEmit)
npm run lint       # ESLint em src/
npm run format     # Prettier em src/ (ts, vue, css)
```

## Estrutura atual (working tree)

```
taberna/
├── .gitignore
├── LICENSE
├── README.md
├── index.html                 # SPA shell, preload de fonts, favicon, CSP
├── package.json               # "taberna", type: module
├── tsconfig.json              # ESNext, strict, bundler resolution
├── vite.config.ts             # base relativo + plugins Vite + jsdom do Vitest
├── eslint.config.js           # ESLint flat config (vue + typescript + prettier)
├── .prettierrc                # singleQuote, semi, tailwind plugin
├── .vscode/                   # Configuracoes do editor
├── public/
│   ├── favicon.png            # Favicon PNG 16x16
│   ├── logo.png               # Logo PNG 512x512
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
│       │   ├── footer.md      # Footer customizado em portugues
│       │   ├── servicos/      # Servicos individuais
│       │   │   ├── servico-1.md
│       │   │   └── servico-2.md
│       │   └── depoimentos/   # Depoimentos de clientes
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
│           ├── intro.md       # Conteudo markdown em ingles
│           ├── about.md       # Pagina About em ingles
│           ├── services.md    # Pagina Services em ingles
│           ├── footer.md      # Footer customizado em ingles
│           ├── services/      # Services individuais
│           │   ├── service-1.md
│           │   └── service-2.md
│           └── testimonials/  # Testemunhos de clientes
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
│   ├── main.ts                # Entry point — mount Vue em #app + router
│   ├── App.vue                # Root — layout (header/sidebar/footer) + router-view + footer markdown
│   ├── env.d.ts               # Tipos para .vue
│   ├── style.css              # Tailwind v4 + @font-face + @theme custom + typography plugin
│   ├── components/
│   │   ├── section-carousel.vue      # Carousel acessivel com auto-play, botoes e dots
│   │   └── section-carousel.test.ts  # Testes de configuracao e movimento reduzido
│   ├── router/
│   │   └── index.ts           # Vue Router — rotas /, /languages e /:slug
│   ├── views/
│   │   ├── HomeView.vue       # Home — sections do config
│   │   ├── LanguagesView.vue  # Pagina de selecao de idioma (grid de bandeiras)
│   │   └── PageView.vue       # Pagina — carrega markdown pelo slug
│   ├── composables/
│   │   ├── useConfig.ts       # Fetch concorrente seguro de config por idioma
│   │   ├── useConfig.test.ts  # Testes de erro e concorrencia do config
│   │   ├── useLocale.ts       # Detecao de idioma + fallback completo
│   │   ├── useLocale.test.ts  # Teste do fallback de idioma
│   │   ├── useMarkdown.ts     # Fetch + parse de arquivos markdown com cache
│   │   └── useSwitchLocale.ts # Troca de idioma (loadConfig + setLocale + navigate)
│   ├── utils/
│   │   ├── links.ts           # Allowlist http/https para links externos
│   │   ├── links.test.ts      # Testes da validacao de links
│   │   └── paths.ts           # Caminhos publicos relativos ao base do Vite
│   └── types/
│       └── config.ts          # Types: AppConfig, Section, CarouselConfig, MenuItem, SiteConfig, FooterConfig, VerticalPosition
└── dist/                      # Build de producao
```

## Sistema de Temas (style.css)

Paleta de cores mapeada via `@theme` no Tailwind v4:

| Token         | Escala          | Uso real no codigo                                                                                                                                                                                                                                                                                                                                                              |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primary-*`   | neutral-50..950 | `app-background` (800), `app-background-hover` (700), `app-background-header` (900/95), `app-background-footer` (950), `app-text` (100), `app-text-muted` (200), `app-text-body` (300), `app-text-subtle` (400), `app-section-subtitle` (500), `app-border` (700), `app-section-destak` (700), `app-dot-inactive` (600, 500), `app-carousel-btn` (800/80), `app-skeleton` (700) |
| `secondary-*` | emerald-50..950 | `app-text-accent` (500), `app-text-accent-hover` (400), `app-dot-active` (400), `app-ring` (400), `app-carousel-progress` (400)                                                                                                                                                                                                                                                 |

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

Utilitarios z-index (definidos em `<style>` global no App.vue, nao no style.css):

- `.z-60` → `z-index: 60` (backdrop do mobile menu)
- `.z-70` → `z-index: 70` (sidebar do mobile menu)

## Configuracoes Importantes

### tsconfig.json

- Extends: `@vue/tsconfig/tsconfig.dom.json`
- Target: ESNext, Module: ESNext, moduleResolution: "bundler"
- Strict: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`
- Outros: `noEmit`, `isolatedModules`, `allowImportingTsExtensions`, `resolveJsonModule`, `jsx: "preserve"`, `skipLibCheck`

### vite.config.ts

- Plugins: `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Base relativo (`./`) para deploy na raiz ou em subdiretorios
- Sem aliases customizados

### .prettierrc

- `singleQuote: true`, `semi: true`
- Plugin `prettier-plugin-tailwindcss` para ordenacao automatica de classes

## O que NAO existe ainda

- Gerenciamento de estado (Pinia/Vuex)
- CI/CD (GitHub Actions, etc.)
- Docker
- Arquivo `.env`
- Meta tags SEO (description, Open Graph)

## Observacoes

- Conteudo do site em arquivos JSON (`public/config/`) e markdown (`public/content/`)

## Seguranca

### Sanitizacao de HTML (XSS)

Tudo que envolve HTML dinamico passa por sanitizacao antes de ser renderizado:

| Onde                                     | O que                            | Como                                                 |
| ---------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| **Conteudo markdown** (sections/paginas) | HTML gerado por `marked.parse()` | `DOMPurify.sanitize()` antes de cache + `v-html`     |
| **Footer customizado**                   | HTML do markdown do footer       | Mesmo pipeline do `useMarkdown` (DOMPurify)          |
| **Links externos no menu**               | `href` de `<a>` tags             | `URL` com allowlist exclusiva de `http:` e `https:`  |
| **Slug de rotas**                        | `route.params.slug`              | Regex `[^a-zA-Z0-9\-\/]` remove caracteres invalidos |
| **Troca de idioma**                      | Valor passado para `setLocale()` | Valida contra array `available` do manifest          |

### Content Security Policy (CSP)

Meta tag em `index.html`:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://placehold.co data:; font-src 'self';
```

- `script-src 'self'`: bloqueia scripts inline e externos
- `style-src 'self' 'unsafe-inline'`: permite Tailwind CSS (utility classes inline necessarias)
- `img-src 'self' https://placehold.co data:`: imagens locais + placeholder + data URIs
- `font-src 'self'`: fonts self-hosted apenas

**Limitacoes**: CSP via meta tag nao suporta `nonce` ou `hash` para `unsafe-inline`. Para producao rigorosa, considerar CSP via header HTTP (Vercel/Netlify config).

### Lint de Acessibilidade

- `vue/no-v-html` configurado como `warn` no ESLint (revertido apos sanitizacao com DOMPurify)
- Componentes usam atributos ARIA: `aria-label`, `aria-expanded`, `role="dialog"`, `aria-modal`, `aria-current`

## Composables

### Estado Global (Singleton)

`useConfig` e `useLocale` usam `ref` no escopo do módulo (fora da função exportada). Todas as chamadas de `useConfig()` retornam a mesma instância reativa. Isso é o padrão Vue 3 para estado global sem store, mas pode causar confusão em testes.

### useLocale

- **Fallback**: Se `languages.json` falhar, inicializa `pt-br`, flag, idiomas disponiveis, localStorage e `document.lang`.
- **`setLocale(lang)`**: Valida contra `available` e retorna `boolean` indicando se o idioma foi aceito.

### useConfig

- **Loading e erro**: Expoe estados separados para impedir skeleton infinito em falhas iniciais.
- **Concorrencia**: Cancela a requisicao anterior com `AbortController` e ignora respostas obsoletas.
- **Retorno**: `loadConfig(locale)` retorna se o config solicitado foi aplicado com sucesso.

### useMarkdown

- **Cache**: `Map<string, string>` no escopo do módulo (não é um `ref`). Nunca é invalidado. Adequado para conteúdo estático.
- **Sem ref de loading**: O `loading` ref foi removido por não ser confiável entre chamadas concurrentes. `PageView` mantém seu próprio `pageLoading` local.
- **Sanitização**: HTML gerado por `marked.parse()` passa por `DOMPurify.sanitize()` antes de ser cacheado/renderizado com `v-html`.

### useSwitchLocale

Composable que orquestra a troca de idioma: validação + `loadConfig` + `setLocale` + navegação para home. Expoe `switching` para desabilitar selecoes concorrentes em `LanguagesView`.

## Convencoes

- Composition API com `<script setup lang="ts">`
- TypeScript strict
- Tailwind CSS v4 via `@import 'tailwindcss'` (CSS-first config, sem tailwind.config.js)
- Componentes em lowercase com hifen: `section-carousel.vue`
- Scoped styles (App.vue usa `@reference` para acessar tema do style.css)
- Usar sempre utilities customizadas (`app-*`) em componentes. Nunca usar cores do tema (`primary-*`, `secondary-*`) diretamente em templates — exceto em `style.css`, onde as utilities sao definidas
- Nao adicionar comentarios no codigo (so se pedido)
- Conteudo do site em arquivos JSON (`public/config/`) e markdown (`public/content/`)
- **SEMPRE atualizar este arquivo (AGENTS.md) apos qualquer mudanca significativa no codigo**

## FIXMEs pendentes

- Configurar conteudo real nos arquivos de config e markdown

## Git

- Branch: `master` (current), `backup`
- Remote: `origin` (github.com/mineot/taberna)

## Sistema de i18n

### Fluxo

1. `useLocale()` detecta idioma: localStorage → navigator.languages → languages.json.default
2. `useConfig(locale)` busca `public/config/{locale}.json`
3. `App.vue` atualiza `document.documentElement.lang` e `document.title` (via watch no config)
4. Switcher de bandeiras no header/sidebar navega para `/languages` via `<router-link>`. Em `LanguagesView`, `useSwitchLocale` orquestra a troca:
   - valida o idioma contra `available`
   - `await loadConfig(lang)` — carrega config com protecao contra respostas obsoletas
   - `setLocale(lang)` — atualiza locale + localStorage apenas apos o config carregar
   - `router.push('/')` — redireciona para home para evitar page not found
5. `HomeView` observa `[loaded, config, locale]`, isola falhas por arquivo e ignora respostas obsoletas

### Textos Hardcoded

O conteudo editorial em `public/config/{locale}.json` e `public/content/{locale}/` nao e considerado hardcoded: ele ja esta externalizado e possui versoes por idioma.

Os valores abaixo sao hardcoded intencionais e devem permanecer fora do sistema de traducao:

| Arquivo       | Valor        | Motivo                                                         |
| ------------- | ------------ | -------------------------------------------------------------- |
| `index.html`  | `lang="en"`  | Idioma inicial do documento, substituido pelo locale detectado |
| `index.html`  | `Taberna`    | Titulo inicial/fallback antes do config ser carregado          |
| `src/App.vue` | `Powered by` | Prefixo fixo do credito do projeto no footer                   |
| `src/App.vue` | `Mineot`     | Nome proprio e fixo do autor no link de credito                |

Os textos abaixo continuam hardcoded temporariamente e devem ser traduzidos depois:

| Arquivo                                          | Texto                       | Contexto                                                                |
| ------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------- |
| `src/App.vue`                                    | `Menu`                      | `aria-label` do botao hamburger e do dialog do sidebar                  |
| `src/App.vue`                                    | `Close menu`                | `aria-label` do botao de fechar o sidebar                               |
| `src/components/section-carousel.vue`            | `Previous slide`            | `aria-label` do botao de navegacao anterior                             |
| `src/components/section-carousel.vue`            | `Next slide`                | `aria-label` do botao de navegacao seguinte                             |
| `src/components/section-carousel.vue`            | `Slide {n}`                 | `aria-label` dinamico dos indicadores                                   |
| `src/components/section-carousel.vue`            | `Carousel: {atual}/{total}` | `aria-label` dinamico do grupo do carousel                              |
| `src/components/section-carousel.vue`            | `Pause carousel`            | `aria-label` do controle de pausa                                       |
| `src/components/section-carousel.vue`            | `Play carousel`             | `aria-label` do controle de reproducao                                  |
| `src/views/PageView.vue`                         | `Page not found`            | Mensagem visivel quando o Markdown de uma pagina nao pode ser carregado |
| `src/composables/useConfig.ts`                   | `Unknown error`             | Fallback de erro que pode ser exibido por `App.vue`                     |
| `src/composables/useConfig.ts`, `useMarkdown.ts` | `HTTP {status}`             | Mensagem tecnica gerada quando uma requisicao falha                     |
| `src/composables/useMarkdown.ts`                 | `Not found`                 | Erro tecnico ao detectar o fallback HTML da SPA                         |

Outros valores literais, como nomes internos de rotas, caminhos, media queries, chaves do `localStorage`, URLs, valores ARIA padronizados e o fallback de locale `pt-br`, sao constantes tecnicas e nao textos de interface. Atualmente nao existe um dicionario de mensagens de UI; a traducao dos itens pendentes exigira adiciona-los ao sistema de i18n ou aos configs por idioma.

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
- **Sanitização**: HTML gerado por `marked.parse()` passa por `DOMPurify.sanitize()` antes de ser renderizado com `v-html`.

### Regras de Conteudo por Section

Cada section segue regras estritas baseadas no tipo de conteudo:

| Atributo                  | Image | content (texto) | carousel |
| ------------------------- | ----- | --------------- | -------- |
| `content` (texto)         | ✅    | —               | ❌       |
| `contentFiles` (1 item)   | ✅    | ❌              | ❌       |
| `contentFiles` (2+ items) | ❌    | ❌              | ✅       |

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
- **Sanitização do slug**: Regex `[^a-zA-Z0-9\-\/]` remove caracteres especiais antes de usar o slug
- Renderizado como `<article class="prose prose-invert">`
- Skeleton loader durante carregamento
- Mensagem de erro "Page not found" se arquivo nao existir

### Posicionamento Vertical

Campo `imagePosition` controla alinhamento vertical da imagem na section:

| Valor      | Comportamento                           |
| ---------- | --------------------------------------- |
| `"top"`    | Imagem alinhada ao topo (`items-start`) |
| `"center"` | Imagem centralizada (padrao)            |
| `"bottom"` | Imagem alinhada ao fundo (`items-end`)  |

Se nao informado, assume `"center"`.

Campo `contentPosition` controla alinhamento vertical do conteudo na section:

| Valor      | Comportamento                             |
| ---------- | ----------------------------------------- |
| `"top"`    | Conteudo alinhado ao topo (`items-start`) |
| `"center"` | Conteudo centralizado (padrao)            |
| `"bottom"` | Conteudo alinhado ao fundo (`items-end`)  |

Se nao informado, assume `"center"`.

**Precedencia**: `contentPosition` tem precedencia sobre `imagePosition` para o alinhamento flex. `imagePosition` controla apenas o corte da imagem (`object-position`). Ambos usam o tipo `VerticalPosition` em `src/types/config.ts`.

### Titulo da Secao (Opcional)

Campo `title` na section e opcional. Se nao informado, o `<h2>` nao e renderizado.

### Subtitulo da Secao (Opcional)

Campo `subtitle` na section e opcional. Se informado, renderiza um `<p>` com utility `app-section-subtitle` abaixo do titulo.

### Inversao de Layout (`invert`)

Campo `invert` (booleano, opcional) na section inverte a ordem flex da imagem e do conteudo:

- Quando `true`: aplica `md:flex-row-reverse` — imagem fica a direita, conteudo a esquerda
- Quando `false` ou ausente: layout normal (conteudo a esquerda, imagem a direita)

### Configuracao do Site (`SiteConfig`)

Campos do objeto `site` no config JSON:

| Campo         | Tipo     | Obrigatorio | Descricao                                         |
| ------------- | -------- | ----------- | ------------------------------------------------- |
| `title`       | `string` | Sim         | Titulo do site (exibido no header/sidebar)        |
| `owner`       | `string` | Sim         | Nome do proprietario (usado no footer)            |
| `description` | `string` | Sim         | Descricao do site (para metadados)                |
| `image`       | `string` | Nao         | URL da imagem do site (exibida ao lado do titulo) |

### Destaque de Secao (`destak`)

Campo `destak` (booleano, opcional) na section aplica um fundo diferente usando a escala `primary` (neutral):

- Quando `true`: aplica `app-section-destak` → `bg-primary-700 -mx-6 px-6 py-8`
- O `-mx-6` quebra a margem do container para "esticar" o fundo
- Disponivel na interface `Section` em `src/types/config.ts`
- Para usar: adicionar `"destak": true` no JSON da seção desejada

### Carousel de Secoes

Campo `carousel` (objeto opcional) na section ativa o modo carousel para o conteudo:

- Quando definido, o conteudo (`contentFiles` ou `content`) e exibido como slides com transicao
- A imagem da section permanece estatica (fora do carousel)
- Componente: `src/components/section-carousel.vue`

#### Configuracao (`CarouselConfig`)

| Campo          | Tipo      | Default | Descricao                                               |
| -------------- | --------- | ------- | ------------------------------------------------------- |
| `autoPlay`     | `boolean` | `true`  | Auto-avanca os slides                                   |
| `interval`     | `number`  | `5000`  | Milissegundos entre slides                              |
| `buttons`      | `boolean` | `true`  | Exibe setas prev/next (Lucide ChevronLeft/ChevronRight) |
| `dots`         | `boolean` | `true`  | Exibe indicadores de posicao (dots)                     |
| `itemsPerView` | `number`  | `1`     | Quantos itens visiveis simultaneamente                  |

Todos os campos sao opcionais. Exemplo de uso:

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

#### Comportamento

- **Auto-play**: inicia ao montar o componente, avanca slides automaticamente
- **Pausa por interacao**: auto-play pausa durante hover ou foco e retoma ao sair
- **Pausa persistente**: controle Play/Pause permite interromper o auto-play
- **Anel de progresso**: envolve o controle Play/Pause, usa `interval`, congela durante pausas e reinicia na navegacao manual
- **Visibilidade**: pausa quando a aba fica em segundo plano
- **Movimento reduzido**: desativa auto-play com `prefers-reduced-motion: reduce`
- **Botoes prev/next**: fixos nas laterais do conteudo (layout flex). Se `buttons: false`, conteudo ocupa 100%
- **Dots**: clique define o slide diretamente; dot ativo usa utility `app-dot-active`
- **Acessibilidade**: `role="group"`, `aria-label` no container e botoes, `aria-current` no dot ativo
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
- Navegacao circular (apos a ultima pagina, retorna ao inicio; antes da primeira, retorna ao fim)

#### Precedencia

Se `carousel` esta definido, ele tem precedencia sobre a renderizacao estatica do conteudo. O componente so e renderizado se houver conteudo (`contentFiles` ou `content`).

### Menu Mobile (Offcanvas)

Em telas pequenas (`< md`), o menu de navegacao e substituido por um icone hamburger (Lucide `Menu`). Ao clicar:

- Abre um sidebar da direita com titulo + imagem do site + menu + switcher de idioma
- Backdrop escuro com blur por tras
- Fecha ao clicar no backdrop, no icone X, ou em qualquer link
- Animacao de slide-in/slide-out via `<Transition>`
- Teleport do sidebar para `<body>` via `<Teleport>`
- Acessibilidade: foco inicial e confinado, fechamento por `Escape`, restauracao de foco, bloqueio de scroll e atributos ARIA de dialog

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
- **`app-text-accent-hover`** no container `<a>` — hover clareia a cor (secondary-500 → secondary-400)
- **`app-title-adjustment`** no `<h1>`/`<h2>` — `mt-2 leading-[0]` para alinhar com a imagem
- **`app-duration`** — transicao suave (0.3s) no hover
- **Sidebar**: Mesmo esquema, `<a href="/">` com `app-title app-text-accent-hover app-duration` + `@click="closeMenu"` para fechar o menu ao clicar
- **Opcional**: Campo `title` no config e opcional — se ausente, `<h1>`/`<h2>` nao sao renderizados (permite usar apenas imagem)

### Imagem do Site (Header + Sidebar)

Campo `site.image` no config controla exibicao de imagem ao lado do titulo:

- **Opcional**: Se nao definido ou vazio, nao exibe nada
- **Tamanho**: `h-8 w-8` (32px) mobile, `md:h-12 md:w-12` (48px) desktop, `min-h-5 min-w-5` (20px minimo)
- **Formato**: `app-logo` controla apenas as dimensoes; nao aplica arredondamento nem corte da imagem
- **Posicao**: Ao lado esquerdo do titulo, com `gap-3` de espacamento
- **Sidebar**: Mesmo tamanho mobile (`h-8 w-8`) e titulo `text-3xl` (mesmo do header mobile)

## Sistema de Rotas (Vue Router)

### Estrutura

| Rota         | Componente          | Conteudo                                                  |
| ------------ | ------------------- | --------------------------------------------------------- |
| `/`          | `HomeView.vue`      | Sections do config JSON                                   |
| `/languages` | `LanguagesView.vue` | Grid de idiomas disponiveis (bandeira + codigo)           |
| `/:slug`     | `PageView.vue`      | Markdown carregado de `public/content/{locale}/{slug}.md` |

### Configuracao

- **Hash mode**: `createWebHashHistory(import.meta.env.BASE_URL)` para funcionar sem rewrites em hospedagem estatica e subdiretorios
- **Catch-all**: rota `/:pathMatch(.*)*` redireciona para `/`
- **Scroll behavior**: suporta hash anchors, posicao salva, e scroll to top
- **Arquivo**: `src/router/index.ts`

### MenuItem (Interface)

```ts
export interface MenuItem {
  label: string;
  href?: string; // anchor link (ex: "#sobre")
  route?: string; // Vue Router path (ex: "/sobre")
  content?: string; // override do arquivo markdown (ex: "sobre.md")
}
```

### Comportamento do Menu

- **`route` definido** → renderiza `<router-link :to="item.route">`
- **`href` com `#`** (anchor) → renderiza `<router-link :to="'/' + item.href">` — navega para `/` e o `scrollBehavior` faz scroll suave ate o anchor
- **`href` externa** (http/https) → abre em nova aba com `noopener noreferrer`; outros protocolos sao rejeitados por allowlist
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
- **Links**: Estilizados via `.app-footer-content :deep(a)` — underline + `app-text-subtle` que muda para `app-text-accent` no hover
- **Layout**: Mobile = empilhado, Desktop = `space-between`
- **Exemplo de conteudo footer.md**:
  ```html
  <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
    <div>### Titulo\nDescricao</div>
    <div>### Links\n- [Link](url)</div>
    <div>### Social\n- [GitHub](url)</div>
  </div>
  ```
