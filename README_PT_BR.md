# Taberna

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![🇺🇸 English (US)](<https://img.shields.io/badge/Language-%F0%9F%87%BA%F0%9F%87%B8%20English%20(US)-e5e7eb.svg>)](README.md)

Taberna é uma base para sites pessoais, portfólios, páginas de destino e sites institucionais. O conteúdo editorial fica em arquivos JSON e Markdown separados por idioma, enquanto o código Vue controla navegação, disposição, segurança e comportamento responsivo.

O projeto ainda usa conteúdo fictício. Antes de publicar, substitua os arquivos de exemplo em `public/config/` e `public/content/`.

## Principais recursos

- Detecção automática de idioma, preferência persistida e página de seleção
- Seções configuráveis com texto, Markdown, imagem, destaque e inversão da disposição
- Páginas Markdown acessadas por rotas
- Carrossel responsivo com reprodução automática, pausa, progresso, setas e indicadores
- Menu lateral responsivo com navegação por teclado e foco confinado
- Rodapé opcional carregado de Markdown
- Tema centralizado em utilitários CSS `app-*`
- Sanitização de HTML e restrições da Política de Segurança de Conteúdo (CSP)
- Compilação estática compatível com hospedagem na raiz ou em subdiretórios

## Tecnologias

- Vue 3 com Composition API e `<script setup>`
- TypeScript em modo estrito
- Vite
- Vue Router em modo hash
- Tailwind CSS v4 e plugin Typography
- `marked` para converter Markdown
- DOMPurify para sanitizar o HTML gerado
- Lucide Vue para ícones
- Vitest, Vue Test Utils e jsdom para testes
- ESLint e Prettier

## Começando

### Pré-requisitos

- Node.js 20.19+ ou 22.12+
- npm

### Instalação

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
npm run dev
```

O servidor de desenvolvimento fica disponível em `http://localhost:5173`. Alterações no código são atualizadas pelo Vite; mudanças em arquivos públicos podem provocar uma atualização completa da página.

### Comandos disponíveis

```bash
npm run dev        # Servidor de desenvolvimento com HMR
npm run build      # Verificação de tipos e compilação de produção em dist/
npm run preview    # Pré-visualização da compilação em http://localhost:4173
npm run test       # Testes unitários com Vitest
npm run typecheck  # Verificação TypeScript sem emitir arquivos
npm run lint       # ESLint em src/
npm run format     # Prettier em arquivos TS, Vue e CSS de src/
```

Antes de enviar uma alteração, execute:

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

O ESLint emite avisos para `v-html`. Eles são esperados neste projeto porque todo HTML originado de Markdown passa por DOMPurify antes da renderização.

## Como o projeto funciona

O carregamento inicial segue este fluxo:

1. `useLocale` carrega `public/languages.json` e seleciona o idioma.
2. `useConfig` busca `public/config/{locale}.json`.
3. `App.vue` monta cabeçalho, menu, menu lateral e rodapé.
4. O Vue Router escolhe a página inicial, a seleção de idiomas ou uma página Markdown.
5. `useMarkdown` busca, converte, sanitiza e armazena o conteúdo em cache.

Os estados de `useLocale` e `useConfig` são compartilhados globalmente: os `ref`s ficam no escopo dos módulos e são usados por todos os componentes. O projeto não usa Pinia ou Vuex.

### Responsabilidade dos composables

| Composable        | Responsabilidade                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `useLocale`       | Carrega o manifesto, detecta e persiste o idioma e atualiza o atributo `lang` do documento       |
| `useConfig`       | Carrega o JSON do idioma, expõe estados de carregamento/erro e cancela requisições anteriores    |
| `useMarkdown`     | Busca Markdown, rejeita o HTML alternativo da SPA, converte, sanitiza e mantém cache por caminho |
| `useSwitchLocale` | Valida o idioma, carrega a configuração, aplica o idioma e navega para a página inicial          |

Requisições de configuração, página, rodapé e seções usam identificadores internos para ignorar respostas antigas que terminem depois de uma solicitação mais recente. Isso evita que uma troca rápida de idioma aplique conteúdo obsoleto.

### Estrutura principal

```text
taberna/
├── index.html                  # Shell da SPA, favicon, fontes e CSP
├── public/
│   ├── favicon.png
│   ├── logo.png
│   ├── fonts/                  # Fontes hospedadas localmente
│   ├── languages.json          # Manifesto de idiomas
│   ├── config/                 # Uma configuração JSON completa por idioma
│   └── content/                # Markdown separado por idioma
├── src/
│   ├── App.vue                 # Disposição, cabeçalho, menu lateral e rodapé
│   ├── main.ts                 # Inicialização do Vue e do roteador
│   ├── style.css               # Tailwind, fontes, tema e utilitários
│   ├── components/             # Componentes reutilizáveis e testes
│   ├── composables/            # Idioma, configuração, Markdown e troca de idioma
│   ├── router/                 # Definição das rotas
│   ├── types/                  # Interfaces TypeScript da configuração
│   ├── utils/                  # Validação de links e caminhos públicos
│   └── views/                  # Página inicial, idiomas e páginas Markdown
└── dist/                       # Resultado gerado pela compilação
```

Edite `public/` para personalizar conteúdo e recursos. Edite `src/` quando precisar alterar comportamento, disposição, tema ou mensagens internas da aplicação. Não edite `dist/` diretamente.

## Idiomas

### Manifesto `public/languages.json`

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

Use códigos em minúsculas no formato `idioma-região`, como `pt-br`. Cada item de `available` deve possuir uma bandeira e um arquivo correspondente em `public/config/`.

### Como o idioma é escolhido

A precedência é:

1. valor válido salvo em `localStorage` com a chave `taberna-lang`;
2. correspondência exata ou parcial em `navigator.languages`;
3. campo `default` do manifesto;
4. alternativa interna `pt-br` se o manifesto não puder ser carregado.

Ao selecionar outro idioma, a aplicação carrega a nova configuração antes de salvar a preferência. A troca acontece sem recarregar a página e navega para a página inicial quando o usuário está em outra rota.

### Adicionando um idioma

1. Copie uma configuração existente:

   ```bash
   cp public/config/pt-br.json public/config/es-es.json
   ```

2. Crie a pasta de conteúdo:

   ```bash
   mkdir -p public/content/es-es
   ```

3. Traduza a configuração e todos os arquivos Markdown referenciados por ela.
4. Adicione `es-es` a `available` e `flags` em `languages.json`.
5. Execute a aplicação e teste a página inicial, o menu, as páginas, o rodapé e a troca de idioma.

Cada configuração é completa e independente. Nomes de arquivos, rotas e conteúdo podem variar entre idiomas, desde que as referências daquela configuração existam.

## Configuração do site

Cada `public/config/{locale}.json` segue esta estrutura:

```json
{
  "site": {
    "title": "Meu Site",
    "description": "Descrição do site",
    "image": "logo.png"
  },
  "menu": [],
  "sections": [],
  "footer": {
    "ownership": "© 2026 Nome",
    "contentFile": "footer.md"
  }
}
```

### Campos de `site`

| Campo         | Tipo   | Obrigatório | Comportamento atual                                        |
| ------------- | ------ | ----------- | ---------------------------------------------------------- |
| `title`       | string | Não         | Título no cabeçalho/menu lateral e em `document.title`     |
| `description` | string | Sim         | Atualiza a metadescrição quando a configuração é carregada |
| `image`       | string | Não         | Imagem ao lado do título no cabeçalho/menu lateral         |

Se `title` não existir, o texto do título é omitido. Se `image` também não existir, o link visual da marca fica vazio.

O `index.html` contém uma descrição inicial para o período anterior ao carregamento da aplicação. Depois disso, `site.description` substitui o conteúdo de `<meta name="description">`. A troca de idioma também atualiza a descrição sem recarregar a página.

Essa atualização acontece no navegador. Open Graph, descrições específicas por página e metadados pré-renderizados ainda não estão implementados.

### Campos do rodapé (`footer`)

| Campo         | Tipo   | Obrigatório | Descrição                                    |
| ------------- | ------ | ----------- | -------------------------------------------- |
| `ownership`   | string | Sim         | Texto exibido na linha inferior do rodapé    |
| `contentFile` | string | Não         | Markdown renderizado acima da linha inferior |

## Seções da página inicial

Cada item de `sections` aceita:

| Campo             | Tipo                      | Obrigatório | Descrição                                               |
| ----------------- | ------------------------- | ----------- | ------------------------------------------------------- |
| `id`              | string                    | Sim         | Identificador e destino de âncoras como `#sobre`        |
| `title`           | string                    | Não         | Título `<h2>` da seção                                  |
| `subtitle`        | string                    | Não         | Texto abaixo do título                                  |
| `content`         | string[]                  | Não         | Parágrafos de texto simples                             |
| `contentFiles`    | string[]                  | Não         | Markdown relativo a `public/content/{locale}/`          |
| `image`           | string                    | Não         | Imagem usada com texto ou um Markdown                   |
| `imagePosition`   | `top`, `center`, `bottom` | Não         | Corte da imagem e alternativa para o alinhamento flex   |
| `contentPosition` | `top`, `center`, `bottom` | Não         | Alinhamento flex; tem precedência sobre `imagePosition` |
| `invert`          | boolean                   | Não         | Inverte conteúdo e imagem em telas grandes              |
| `destak`          | boolean                   | Não         | Aplica fundo de destaque                                |
| `carousel`        | objeto                    | Não         | Configura o carrossel para múltiplos arquivos           |

### Precedência de conteúdo

1. Se `content` estiver definido, ele é renderizado como texto e vence as demais formas.
2. Um único item em `contentFiles` renderiza um bloco Markdown.
3. Dois ou mais itens com `carousel` renderizam o carrossel.
4. Dois ou mais itens sem `carousel` são exibidos lado a lado e empilham em dispositivos móveis.
5. `image` só é exibida com `content` ou exatamente um `contentFile`.

### Texto e imagem

```json
{
  "id": "sobre",
  "title": "Sobre",
  "subtitle": "Conheça o projeto",
  "content": ["Primeiro parágrafo.", "Segundo parágrafo."],
  "image": "https://placehold.co/600x400",
  "imagePosition": "top",
  "contentPosition": "center",
  "invert": false,
  "destak": true
}
```

Em telas grandes, a ordem padrão é conteúdo à esquerda e imagem à direita. Com `invert: true`, a imagem fica à esquerda e o conteúdo à direita. Em dispositivos móveis, o conteúdo aparece acima da imagem nos dois casos.

`contentPosition` controla o alinhamento vertical da linha. Quando ele não existe, `imagePosition` também é usado como alternativa para esse alinhamento. Separadamente, `imagePosition` define `object-position` (`top`, `center` ou `bottom`) para o corte da imagem.

### Markdown único

```json
{
  "id": "intro",
  "title": "Introdução",
  "contentFiles": ["intro.md"],
  "image": "https://placehold.co/600x400"
}
```

### Múltiplos arquivos

```json
{
  "id": "servicos",
  "title": "Serviços",
  "contentFiles": ["servicos/servico-1.md", "servicos/servico-2.md"]
}
```

Se um arquivo de uma seção falhar, os demais continuam sendo apresentados. Se todos falharem, a seção permanece sem aquele conteúdo.

## Carrossel

O carrossel é ativado em uma seção com dois ou mais `contentFiles`:

```json
{
  "id": "depoimentos",
  "contentFiles": [
    "depoimentos/depoimento-1.md",
    "depoimentos/depoimento-2.md",
    "depoimentos/depoimento-3.md"
  ],
  "carousel": {
    "autoPlay": true,
    "interval": 4000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 3
  }
}
```

| Campo          | Tipo    | Padrão | Regras                                                    |
| -------------- | ------- | ------ | --------------------------------------------------------- |
| `autoPlay`     | boolean | `true` | Avança automaticamente                                    |
| `interval`     | number  | `5000` | Mínimo de 1000 ms; inválidos voltam ao padrão             |
| `buttons`      | boolean | `true` | Exibe anterior/próximo quando há mais de uma página       |
| `dots`         | boolean | `true` | Exibe um indicador por página                             |
| `itemsPerView` | number  | `1`    | Inteiro, mínimo 1 e limitado à quantidade de diapositivos |

Com um item por vez, a transição usa esmaecimento. Com vários itens, usa deslocamento horizontal e navegação por página. A navegação é circular nos dois modos.

Em telas menores que 768 px, `itemsPerView` é sempre 1. Com somente uma página, setas, indicadores e controle de reprodução são ocultados.

A reprodução automática:

- pausa ao passar o ponteiro ou durante o foco;
- pausa quando a aba fica oculta;
- pode ser pausado pelo usuário;
- mantém o progresso restante ao retomar;
- é desativado com `prefers-reduced-motion: reduce`;
- reinicia o intervalo após navegação manual.

## Menu e rotas

### Itens de menu

```json
{ "label": "Início", "href": "#intro" }
```

```json
{ "label": "Sobre", "route": "/sobre" }
```

```json
{ "label": "GitHub", "href": "https://github.com/mineot" }
```

```json
{ "label": "Blog", "route": "/blog", "content": "paginas/meu-blog.md" }
```

| Configuração             | Comportamento                                        |
| ------------------------ | ---------------------------------------------------- |
| `route`                  | Rota interna por `<router-link>`                     |
| `href` começando com `#` | Volta à página inicial e rola suavemente até a seção |
| `href` HTTP/HTTPS        | Link externo em nova aba                             |
| `route` e `content`      | Usa `content` como caminho do Markdown               |
| `route` e `href`         | `route` tem precedência                              |

Links externos com protocolos diferentes de HTTP e HTTPS não são renderizados pelo menu.

### Rotas disponíveis

| URL lógica   | URL no navegador | Conteúdo                 |
| ------------ | ---------------- | ------------------------ |
| `/`          | `/#/`            | Seções da página inicial |
| `/languages` | `/#/languages`   | Seleção de idioma        |
| `/:slug`     | `/#/sobre`       | Markdown de uma página   |

Sem `content`, `/sobre` procura `public/content/{locale}/sobre.md`. Com `content`, o arquivo indicado é usado. A rota aceita um segmento; o arquivo de conteúdo pode estar em uma subpasta.

Links escritos dentro de Markdown são âncoras HTML comuns, não elementos `<router-link>`. Para preservar o roteamento por hash e a implantação em subdiretório, prefira links relativos como `[Sobre](./#/sobre)`. Links como `/sobre` tentam acessar uma rota real do servidor.

Se a página não existir, a interface exibe `Page not found`. O slug é filtrado antes de formar o caminho do arquivo.

O roteador restaura a posição salva ao voltar, rola suavemente para âncoras e volta ao topo nas demais navegações. URLs que não correspondem às rotas suportadas são redirecionadas para a página inicial.

### Cabeçalho e menu lateral

- Em telas grandes, até quatro itens são exibidos no menu em linha.
- Com mais de quatro itens, o menu e a bandeira em linha são substituídos pelo botão de menu em todas as resoluções.
- Em telas pequenas, o botão de menu substitui a navegação em linha.
- Com menu vazio e um único idioma, o botão de menu não aparece.
- A seleção de idioma só aparece quando há mais de um idioma.
- O menu lateral fecha pelo fundo sobreposto, botão, link ou tecla `Escape`.
- Ao abrir, ele bloqueia a rolagem, move o foco para o botão de fechar e confina a navegação pela tecla Tab.
- Ao fechar, o foco retorna ao elemento que abriu o menu.

## Markdown e rodapé

Arquivos Markdown são buscados em tempo de execução, convertidos com `marked`, sanitizados com DOMPurify e renderizados com Tailwind Typography.

Markdown também pode conter HTML, mas conteúdo perigoso é removido. Não dependa de `<script>`, atributos como `onclick` ou HTML não permitido pelo sanitizador.

Para misturar Markdown dentro de HTML, deixe linhas em branco entre as tags e o conteúdo:

```html
<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
  <div>### Empresa Descrição da empresa.</div>

  <div>### Links - [Início](./#/) - [Sobre](./#/sobre)</div>
</div>
```

A disposição do rodapé é definida pelo próprio Markdown; o componente não cria colunas automaticamente. Classes Tailwind presentes nos arquivos durante a compilação são incluídas no CSS. Se você adicionar classes inéditas diretamente em uma publicação já compilada, refaça a compilação.

Sem `footer.contentFile`, somente `ownership` e o crédito “Powered by Mineot” são apresentados. Se o arquivo do rodapé falhar, a aplicação omite apenas o conteúdo personalizado.

Links do rodapé recebem sublinhado e mudança de cor ao passar o ponteiro. Outros detalhes da disposição, como grade e alinhamento das colunas, dependem das classes escritas no Markdown.

### Cache

`useMarkdown` mantém um cache em memória por caminho e não o invalida. Durante o desenvolvimento, recarregue a página se uma alteração de Markdown não aparecer. Em produção, o cache dura até a página ser recarregada.

## Segurança

### Sanitização

Todo HTML gerado de Markdown passa por `DOMPurify.sanitize()` antes de chegar a `v-html`. Isso cobre seções, páginas, diapositivos e rodapé.

### Links externos

Links do menu passam por uma lista de permissões de protocolos HTTP e HTTPS. Links Markdown são tratados pelo sanitizador, mas continuam sendo links HTML comuns.

### Política de Segurança de Conteúdo

A CSP em `index.html` permite:

- scripts somente da própria origem;
- estilos da própria origem e estilos embutidos;
- fontes somente da própria origem;
- imagens locais, data URIs e `https://placehold.co`.

Para usar imagens de outro domínio, adicione-o à diretiva `img-src`. Faça essa alteração com cuidado e mantenha a lista tão restrita quanto possível.

A política está definida em um elemento `<meta>`. Para uma política de produção mais rigorosa, configure a CSP como cabeçalho HTTP na hospedagem; recursos como nonces e algumas diretivas não são plenamente cobertos por CSP via elemento `<meta>`.

## Personalização visual

O tema fica em `src/style.css`. Os componentes usam utilitários `app-*`; evite aplicar `primary-*` ou `secondary-*` diretamente nos blocos `<template>`.

### Fontes

| Utility      | Fonte        | Uso principal      |
| ------------ | ------------ | ------------------ |
| `font-sans`  | Roboto       | Interface e corpo  |
| `font-serif` | Roboto Serif | Conteúdo editorial |
| `font-mono`  | Roboto Mono  | Código             |
| `font-fancy` | Italianno    | Título da marca    |

Para trocar fontes, substitua ou adicione arquivos em `public/fonts/` e atualize os `@font-face` e variáveis em `style.css`.

### Cores

O bloco `@theme` mapeia duas escalas:

- `primary-*`: neutral, usada em fundos, textos e bordas;
- `secondary-*`: emerald, usada em destaques e interações.

Exemplo de alteração:

```css
@theme {
  --color-primary-800: #1f2937;
  --color-primary-950: #030712;
  --color-secondary-500: #f97316;
}
```

### Principais utilitários

| Grupo      | Utilitários                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| Fundos     | `app-background`, `app-background-hover`, `app-background-header`, `app-background-footer`           |
| Texto      | `app-text`, `app-text-muted`, `app-text-body`, `app-text-subtle`, `app-text-accent`                  |
| Marca      | `app-title`, `app-title-adjustment`, `app-logo`                                                      |
| Seções     | `app-section`, `app-section-title`, `app-section-content`, `app-section-image`, `app-section-destak` |
| Navegação  | `app-icon-btn`, `app-flag-btn`, `app-nav-link`, `app-sidebar`, `app-backdrop`                        |
| Carrossel  | `app-carousel-btn`, `app-dot-active`, `app-dot-inactive`, `app-carousel-progress`                    |
| Disposição | `app-container`, `app-footer`, `app-border`, `app-ring`, `app-skeleton`                              |

Altere as escalas e fontes para personalizações simples. Mudanças estruturais nos utilitários podem afetar vários componentes e devem ser testadas em dispositivos móveis e telas grandes.

## Compilação e implantação

Gere a versão de produção com:

```bash
npm run build
npm run preview
```

O Vite copia os arquivos públicos e gera a aplicação em `dist/`. O roteador usa hash e os caminhos públicos respeitam o `base` relativo, portanto o resultado pode ser servido na raiz ou em subdiretórios sem regra alternativa para as rotas Vue.

Hospede `dist/` no GitHub Pages, Netlify, Vercel, Nginx, Apache ou em qualquer servidor de arquivos estáticos. No Netlify/Vercel, use `npm run build` como comando e `dist` como diretório de saída.

No fluxo normal do repositório, refaça a compilação após qualquer mudança para manter `dist/` atualizado. É possível substituir JSON ou Markdown diretamente em uma hospedagem estática, mas novas classes Tailwind e mudanças em código, CSS, recursos processados ou `index.html` exigem uma nova compilação.

### Backup da personalização

Mantenha preferencialmente um fork ou repositório próprio. Dependendo das mudanças, preserve:

- `public/config/`;
- `public/content/`;
- `public/languages.json`;
- `public/logo.png` e `public/favicon.png`;
- `public/fonts/`;
- `src/style.css`;
- `index.html`, se CSP ou metadados foram alterados;
- quaisquer componentes ou utilitários modificados em `src/`.

## Limitações atuais

- O conteúdo distribuído é fictício.
- Não há Pinia/Vuex, CI/CD, Docker ou arquivo `.env`.
- A metadescrição é atualizada no cliente; não há Open Graph, metadados por página ou pré-renderização para rastreadores sem JavaScript.
- Algumas mensagens internas e rótulos de acessibilidade ainda estão em inglês e fora do sistema de idiomas.
- O projeto não valida o esquema dos JSONs em tempo de execução; mantenha tipos e campos conforme esta documentação.

## Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b feature/nova-feature`.
3. Implemente e execute as validações.
4. Faça commit e push da branch.
5. Abra um Pull Request.

## Licença

Licenciado sob a [Apache License 2.0](LICENSE).
