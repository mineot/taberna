# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## Sobre

**Taberna** — do latim _taberna_, que significa **loja** ou **estabelecimento comercial** — é uma plataforma para criar sua vitrine online. Seja para apresentar sua empresa, portfólio profissional, ou página pessoal, o Taberna oferece tudo que você precisa para criar uma presença digital completa e elegante.

O sistema foi pensado para ser **fácil de personalizar**. Todo o conteúdo do site é configurado através de arquivos JSON e Markdown — sem necessidade de tocar no código fonte. Altere textos, adicione imagens, crie novas páginas e seções, mude o idioma, tudo de forma simples e direta.

### O que você pode criar

- **Landing pages** para produtos, serviços ou campanhas
- **Portfólios** para mostrar seu trabalho e projetos
- **Sites institucionais** para sua empresa ou organização
- **Páginas pessoais** para compartilhar seu currículo ou blog
- **Sites multilíngues** com suporte automático a múltiplos idiomas

### Por que escolher Taberna

- **Personalização total** — cores, fontes, layout e conteúdo sob seu controle
- **Multi-idioma** — suporte automático a diferentes idiomas com página de seleção
- **Conteúdo dinâmico** — páginas e seções gerenciadas via Markdown
- **Design responsivo** — funciona perfeitamente em desktop e mobile
- **Rápido e leve** — build otimizado com Vite para carregamento instantâneo

## Features

- **Internacionalização (i18n)** — Detecção automática de idioma (pt-br/en-us) com página de seleção de idiomas
- **Carousel de Slides** — Auto-play, pause no hover, navegação por dots ou setas
- **Menu Mobile Offcanvas** — Sidebar animado com backdrop blur
- **Conteúdo Dinâmico** — Páginas e seções renderizadas via Markdown
- **Posicionamento Flexível** — Controle de alinhamento de imagens e conteúdo
- **Seções com Destaque** — Background alternativo para seções importantes
- **Footer Customizável** — Conteúdo via Markdown com layout em grid

## Getting Started

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR (http://localhost:5173)
npm run build    # Type-check + build para produção
npm run preview  # Preview do build (http://localhost:4173)
```

### Testando localmente

Antes de fazer deploy, você pode testar o site no seu computador. Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

O site ficará disponível em `http://localhost:5173`. Qualquer alteração nos arquivos será refletida automaticamente no navegador (HMR).

Se quiser testar a versão de produção antes de enviar ao servidor:

```bash
npm run build
npm run preview
```

O preview ficará disponível em `http://localhost:4173`, simulando exatamente como o site se comportará no servidor.

## Estrutura de Arquivos

```
taberna/
├── public/
│   ├── languages.json         # Manifest de idiomas
│   ├── config/
│   │   ├── pt-br.json         # Configuração em português
│   │   └── en-us.json         # Configuração em inglês
│   └── content/
│       ├── pt-br/             # Conteúdo markdown em português
│       │   ├── intro.md
│       │   ├── sobre.md
│       │   ├── servicos/
│       │   └── footer.md
│       └── en-us/             # Conteúdo markdown em inglês
└── src/                       # Código fonte (não requer edição)
```

> **Nota:** Esta é uma estrutura example. Os arquivos de conteúdo (`public/content/`) e configuração (`public/config/`) podem ser criados, removidos ou modificados dinamicamente conforme a necessidade do seu projeto. Adicione novas pastas de idioma, crie seções customizadas, ou reorganize o conteúdo — tudo sem alterar o código fonte.

## Arquivos de Configuração

### Idiomas (`public/languages.json`)

Define os idiomas disponíveis e o idioma padrão:

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

### Configuração do Site (`public/config/{locale}.json`)

Cada arquivo é completo e independente por idioma:

```json
{
  "site": {
    "title": "Meu Site",
    "owner": "Nome do Proprietário",
    "description": "Descrição do site",
    "image": "https://placehold.co/80x80"
  },
  "menu": [...],
  "sections": [...],
  "footer": {
    "ownership": "© 2026 Nome",
    "contentFile": "footer.md"
  }
}
```

**Propriedades do site (`site`):**

| Campo         | Obrigatório | Descrição                                                               |
| ------------- | ----------- | ----------------------------------------------------------------------- |
| `title`       | Não         | Título exibido no header/sidebar. Se ausente, apenas a imagem é exibida |
| `owner`       | Sim         | Nome do proprietário (exibido no footer)                                |
| `description` | Sim         | Descrição do site (usado em meta tags)                                  |
| `image`       | Não         | URL da imagem do site (exibida ao lado do título, formato circular)     |

### Conteúdo Markdown (`public/content/{locale}/*.md`)

- Arquivos buscados em runtime pelo site
- Suporte a Markdown com HTML inline para layouts
- Renderizado automaticamente nas seções e páginas

## Personalização

### Adicionando Novos Idiomas

1. **Criar configuração:**

   ```bash
   cp public/config/pt-br.json public/config/{novo-idioma}.json
   ```

2. **Criar pasta de conteúdo:**

   ```bash
   mkdir -p public/content/{novo-idioma}
   ```

3. **Traduzir arquivos markdown** na nova pasta

4. **Atualizar manifest** em `public/languages.json`:
   ```json
   {
     "default": "pt-br",
     "available": ["pt-br", "en-us", "novo-idioma"],
     "flags": {
       "pt-br": "🇧🇷",
       "en-us": "🇺🇸",
       "novo-idioma": "🏳️"
     }
   }
   ```

#### Comportamento Condicional (Menu + Idiomas)

O header e sidebar se adaptam automaticamente ao conteúdo:

| Configuração                  | Comportamento                                      |
| ----------------------------- | -------------------------------------------------- |
| `menu: []` (array vazio)      | `<nav>` não é renderizado no header nem no sidebar |
| Um único idioma               | Bandeira não é exibida no header/sidebar           |
| Sem menu E um só idioma       | Hamburger não é exibido (sidebar inacessível)      |
| Com menu OU mais de um idioma | Hamburger aparece                                  |
| Mais de 4 itens de menu       | Nav inline e bandeira ocultos; hamburger em todas as telas |

**Clicando na bandeira** (header ou sidebar), o usuário é redirecionado para a página `/languages` — uma tela com grid de todos os idiomas disponíveis (bandeira + código). Ao selecionar um idioma, o site recarrega com o novo idioma.

### Criando Seções

Adicione objetos ao array `sections[]` no arquivo de configuração:

**Seção com texto simples:**

```json
{
  "id": "minha-secao",
  "title": "Título da Seção",
  "subtitle": "Subtítulo opcional",
  "content": ["Parágrafo 1", "Parágrafo 2"],
  "image": "https://example.com/image.jpg",
  "imagePosition": "center"
}
```

**Seção com markdown único:**

```json
{
  "id": "sobre",
  "title": "Sobre",
  "contentFiles": ["sobre.md"],
  "image": "https://example.com/sobre.jpg"
}
```

**Seção com múltiplos markdowns:**

```json
{
  "id": "servicos",
  "title": "Serviços",
  "contentFiles": ["servicos/servico-1.md", "servicos/servico-2.md"]
}
```

#### Compatibilidade de Conteúdo

Cada seção segue regras estritas baseadas no tipo de conteúdo definido:

| Atributo                  | Image | Carousel |
| ------------------------- | ----- | -------- |
| `content` (texto)         | ✅    | ❌       |
| `contentFiles` (1 item)   | ✅    | ❌       |
| `contentFiles` (2+ items) | ❌    | ✅       |

- **`content` (texto simples)** — Array de strings renderizadas como parágrafos. Pode ter imagem ao lado. Ignora `contentFiles` e `carousel`.

- **`contentFiles` com 1 item** — Renderiza um único arquivo markdown. Pode ter imagem ao lado. Ignora `content` e `carousel`.

- **`contentFiles` com 2+ items** — Renderiza múltiplos arquivos markdown lado a lado (empilha no mobile). Ignora `image` e `content`. Pode ter `carousel` para exibir como slides.

#### Título da Seção

O campo `title` é **opcional**. Se não informado, o `<h2>` não é renderizado — útil para seções que precisam apenas de conteúdo sem título visível.

#### Destaque de Seção (`destak`)

Campo `destak` (booleano, opcional) aplica um fundo diferente na seção usando a paleta terciária:

```json
{
  "id": "cta",
  "title": "Chamada para Ação",
  "destak": true,
  "content": ["Texto em destaque"]
}
```

Quando `true`, o fundo da seção se estica além das margens do container para criar um efeito visual de destaque.

#### Inversão de Elementos (`invert`)

Campo `invert` (booleano, opcional) inverte a ordem dos elementos da seção em telas médias e maiores:

```json
{
  "id": "sobre",
  "title": "Sobre",
  "content": ["Texto sobre a empresa"],
  "image": "https://example.com/sobre.jpg",
  "invert": true
}
```

**Comportamento:**

- **`false`** (padrão) — Imagem à esquerda, conteúdo à direita
- **`true`** — Conteúdo à esquerda, imagem à direita (em telas `md` e maiores)

> **Nota:** No mobile (`< md`), os elementos sempre empilham (conteúdo acima, imagem abaixo), independente desta configuração.

#### Posicionamento Vertical

**`imagePosition`** controla o corte da imagem (`object-position`):

| Valor      | Comportamento                |
| ---------- | ---------------------------- |
| `"top"`    | Imagem alinhada ao topo      |
| `"center"` | Imagem centralizada (padrão) |
| `"bottom"` | Imagem alinhada ao fundo     |

**`contentPosition`** controla o alinhamento flex do conteúdo:

| Valor      | Comportamento                  |
| ---------- | ------------------------------ |
| `"top"`    | Conteúdo alinhado ao topo      |
| `"center"` | Conteúdo centralizado (padrão) |
| `"bottom"` | Conteúdo alinhado ao fundo     |

> **Precedência:** `contentPosition` tem precedência sobre `imagePosition` para o alinhamento flex. `imagePosition` controla apenas o corte da imagem.

### Carousel

Configure o campo `carousel` em seções com múltiplos `contentFiles`:

```json
{
  "id": "depoimentos",
  "title": "Depoimentos",
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

**Opções do carousel:**

| Campo          | Tipo    | Default | Descrição                      |
| -------------- | ------- | ------- | ------------------------------ |
| `autoPlay`     | boolean | `true`  | Avança slides automaticamente  |
| `interval`     | number  | `5000`  | Milissegundos entre slides     |
| `buttons`      | boolean | `true`  | Exibe setas prev/next          |
| `dots`         | boolean | `true`  | Exibe indicadores de posição   |
| `itemsPerView` | number  | `1`     | Itens visíveis simultaneamente |

#### Comportamento por `itemsPerView`

**`itemsPerView: 1`** (padrão):

- 1 slide visível por vez
- Transição fade com opacidade
- Navegação circular (volta ao início ao chegar no fim)

**`itemsPerView: N`** (N > 1):

- N slides visíveis lado a lado
- Transição slide horizontal
- Navegação por página (avança/retorna N itens)
- Não é circular (para na última página)

> **Se houver apenas 1 slide**, botões e dots não são exibidos.

### Footer Personalizado

O footer é totalmente personalizável. O arquivo markdown (`footer.md`) é aberto para modificação — crie o layout que precisar usando HTML e Markdown.

1. **Criar arquivo markdown** em `public/content/{locale}/footer.md`:

   ```html
   <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
     <div>### Empresa Descrição da empresa aqui.</div>
     <div>
       ### Links - [Página Inicial](/) - [Contato](mailto:email@example.com)
     </div>
     <div>### Social - [GitHub](https://github.com/mineot)</div>
   </div>
   ```

   > **Dica:** Você pode usar qualquer estrutura HTML inline com classes do Tailwind CSS para criar colunas, grids, listas de links, ícones, etc.

2. **Configurar no JSON:**
   ```json
   "footer": {
     "ownership": "© 2026 Nome da Empresa",
     "contentFile": "footer.md"
   }
   ```

#### Comportamento do Footer

- **Sem `contentFile`** — Mostra apenas ownership + "Powered by Mineot"
- **Com `contentFile`** — Renderiza o markdown acima da linha de ownership
- **Layout** — Mobile empilhado, desktop em grid com `space-between`
- **Links** — Estilizados automaticamente com hover para cor de destaque

### Menu de Navegação

Configure o array `menu[]` no JSON:

**Anchor link (rola até a seção):**

```json
{ "label": "Início", "href": "#intro" }
```

**Rota interna (SPA):**

```json
{ "label": "Sobre", "route": "/sobre" }
```

**Link externo (abre em nova aba):**

```json
{ "label": "GitHub", "href": "https://github.com/mineot" }
```

**Rota com conteúdo customizado:**

```json
{ "label": "Blog", "route": "/blog", "content": "meu-blog.md" }
```

#### Comportamento do Menu

| Configuração                | Comportamento                                    |
| --------------------------- | ------------------------------------------------ |
| `route` definido            | Renderiza `<router-link>` para rota interna      |
| `href` com `#` (anchor)     | Navega para `/` e faz scroll suave até o anchor  |
| `href` externa (http/https) | Abre em nova aba com `<a>`                       |
| `route` + `content`         | Rota usa `content` como nome do arquivo markdown |
| Ambos definidos             | `route` tem precedência sobre `href`             |

#### Resolução de Conteúdo (Páginas)

Quando você acessa uma rota `/:slug`, o sistema busca o arquivo markdown correspondente:

- **Sem `content` definido** → busca `{slug}.md` (ex: `/sobre` → `sobre.md`)
- **Com `content` definido** → busca o arquivo especificado (ex: `"content": "custom.md"`)

Arquivos devem estar em `public/content/{locale}/`.

## Personalização Visual

Todo o visual do site é controlado pelo arquivo `src/style.css`. Nele você encontra as fontes, paleta de cores e utilitários que definem a aparência de cada elemento.

### Fontes

O projeto usa fontes self-hosted em `public/fonts/`. Para trocar uma fonte, substitua os arquivos `.ttf` na pasta correspondente e atualize os `@font-face` no `style.css`.

| Utilitário | Fonte | Uso |
|------------|-------|-----|
| `font-sans` | Roboto | Corpo do site, textos gerais |
| `font-serif` | Roboto Serif | Textos editoriais |
| `font-mono` | Roboto Mono | Código, trechos técnicos |
| `font-fancy` | Italianno | Títulos decorativos (ex: logo) |

### Paleta de Cores

O tema usa três escalas de cores mapeadas no `@theme`. Para trocar a paleta, altere as variáveis no bloco `@theme` do `style.css`.

| Escala | Padrão | Uso |
|--------|--------|-----|
| `primary-*` (50 a 950) | Olive | Fundos, textos, bordas — a base do site |
| `secondary-*` (50 a 950) | Amber | Cor de destaque (links, títulos, acentos) |
| `tertiary-*` (50 a 950) | Taupe | Fundo de seções com destaque (`destak`) |

**Exemplo** — Trocar a escala `primary` de olive para slate:

```css
@theme {
  --color-primary-50: var(--color-slate-50);
  --color-primary-100: var(--color-slate-100);
  /* ... */
  --color-primary-950: var(--color-slate-950);
}
```

> **Não é obrigatório usar paletas do Tailwind.** Você pode definir cores manualmente usando hex (`#f97316`), rgb (`rgb(249, 115, 22)`), ou oklch (`oklch(0.75 0.18 55)`). Basta substituir os valores das variáveis:
>
> ```css
> @theme {
>   --color-primary-400: #6b7280;
>   --color-primary-800: #1f2937;
>   --color-secondary-400: oklch(0.75 0.18 55);
> }
> ```

### Utilitários (`app-*`)

Todos os utilitários começam com `app-*` e são definidos com `@utility` no `style.css`. Eles são atalhos reutilizáveis usados nos componentes. Altere-os para mudar a aparência global.

#### Transições e Animações

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-duration` | `duration-300` | Duração de transições (hover, troca de idioma) |

#### Fundos

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-background` | `bg-primary-800` | Fundo principal (sidebar, cards) |
| `app-background-hover` | `hover:bg-primary-700` | Fundo ao passar o mouse |
| `app-background-header` | `bg-primary-900/95` | Fundo do header (95% opacidade) |
| `app-background-footer` | `bg-primary-950` | Fundo do footer |

#### Texto

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-text` | `text-primary-100` | Texto principal (títulos, links) |
| `app-text-muted` | `text-primary-200` | Texto secundário (ícones, detalhes) |
| `app-text-body` | `text-primary-300` | Texto de corpo / parágrafos |
| `app-text-subtle` | `text-primary-400` | Texto sutil (footer, metainfo) |
| `app-accent` | `text-secondary-400` | Cor de destaque (links, destaques) |
| `app-accent-hover` | `hover:text-secondary-300` | Cor de destaque no hover |

#### Bordas

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-border` | `border-primary-700` | Cor de bordas gerais |

#### Títulos

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-title` | `font-fancy app-accent` | Título do site (logo) — fonte Italianno + cor accent |
| `app-title-text` | `mt-2 leading-[0]` | Alinhamento vertical do título com a imagem |

#### Seções (Home)

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-section` | `flex flex-col gap-4 md:flex-row md:gap-8` | Layout da seção (empilha no mobile, lado a lado no desktop) |
| `app-section-title` | `text-2xl font-bold` | Título da seção |
| `app-section-subtitle` | `app-accent mt-1` | Subtítulo da seção (cor accent) |
| `app-section-content` | `mt-4 flex flex-col flex-wrap gap-6 md:flex-row` | Container do conteúdo |
| `app-section-image` | `w-full rounded-lg object-cover md:w-1/2` | Imagem da seção (50% no desktop) |
| `app-section-destak` | `bg-tertiary-800 -mx-6 px-6 py-8` | Fundo de destaque da seção (estica além do container) |

#### Layout

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-container` | `mx-auto w-full max-w-4xl px-6` | Container centralizado do conteúdo |
| `app-logo` | `h-8 min-h-5 w-8 min-w-5 rounded-full object-cover` | Imagem do site (formato circular) |

#### Botões e Navegação

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-icon-btn` | `app-text-muted hover:app-accent app-duration cursor-pointer transition-colors` | Botão de ícone genérico (hamburger, fechar) |
| `app-flag-btn` | `app-duration cursor-pointer transition-all hover:scale-110` | Botão de bandeira (idioma) |
| `app-nav-link` | `app-text hover:app-background-hover hover:app-accent app-duration rounded-lg px-3 py-2 transition-colors` | Link do menu de navegação |

#### Mobile (Sidebar + Backdrop)

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-backdrop` | `fixed inset-0 z-60 bg-black/60 backdrop-blur-sm` | Fundo escuro atrás do sidebar |
| `app-sidebar` | `app-background app-text fixed top-0 right-0 z-70 flex h-full w-72 flex-col shadow-xl` | Sidebar do menu (largura 288px) |

#### Footer

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-footer` | `app-border app-background-footer app-text-subtle flex flex-col items-center border-t px-6 py-6 text-sm` | Container do footer |

#### Carousel

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-dot-active` | `bg-secondary-400` | Dot ativo do carousel |
| `app-dot-inactive` | `bg-primary-600 hover:bg-primary-500` | Dot inativo do carousel |
| `app-carousel-btn-bg` | `bg-primary-800/80` | Fundo dos botões prev/next |

#### Outros

| Utilitário | Equivalente | Descrição |
|------------|-------------|-----------|
| `app-skeleton` | `bg-primary-700` | Fundo do skeleton loader (carregamento) |
| `app-ring` | `ring-secondary-400` | Cor de anel/destaque (ex: idioma selecionado) |

> **Dica:** Para mudar a cor de todos os links do site, basta alterar `app-accent` e `app-accent-hover`. Para trocar o fundo global, altere `app-background`.

> **Aviso:** Para customização visual, recomendamos trocar apenas **cores** (paleta no `@theme`) e **fontes** (`@font-face`). Evite modificar as utilities (`app-*`) diretamente — se precisar alterar alguma, modifique apenas as cores definidas nelas, sem mexer no resto. Qualquer alteração nas utilities pode quebrar o layout do site, a menos que você saiba exatamente o que está fazendo.

## Deploy

O site é estático. Tudo que está na pasta `dist/` é o que o servidor entrega ao visitante.

> **Importante:** Evite editar arquivos diretamente na pasta `dist/`. Todas as alterações devem ser feitas no branch de desenvolvimento, e em seguida rodar o build para gerar uma nova versão em `dist/`.

### Compilando o projeto

Toda alteração feita no projeto requer um build para atualizar a pasta `dist/`. Seja alterando o tema, o conteúdo ou o código, sempre rode:

```bash
npm run build
```

### Hospedagem

A pasta `dist/` pode ser hospedada em qualquer servidor estático:

- **GitHub Pages** — Copie o conteúdo de `dist/` para a branch `gh-pages`
- **Netlify / Vercel** — Aponte o build command para `npm run build` e o output directory para `dist`
- **Nginx / Apache** — Copie `dist/` para o diretório de serve do servidor
- **Qualquer hosting estático** — Basta enviar o conteúdo de `dist/`

### Backup

Para fazer backup do seu site personalizado, existem duas opções:

**Opção 1 — Fork do repositório (recomendado)**

Faça um fork do projeto no seu próprio repositório GitHub. Assim você mantém uma cópia completa do projeto com todo o histórico de alterações.

**Opção 2 — Backup manual**

Salve apenas os arquivos que você alterou:

- `public/config/*.json` — configurações do site por idioma
- `public/content/**/*.md` — conteúdo markdown
- `public/languages.json` — manifesto de idiomas
- `src/style.css` — tema visual (cores, fontes, utilities)

> **Dica:** Esses são os únicos arquivos que você precisa para recriar o site com sua personalização. O restante do código fonte pode ser obtido novamente a partir do repositório original.

## Contributing

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
