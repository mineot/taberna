# Taberna

[![Licença](https://img.shields.io/badge/Licen%C3%A7a-Apache%202.0-blue.svg)](LICENSE) [![🇺🇸 English](https://img.shields.io/badge/Language-%F0%9F%87%BA%F0%9F%87%B8%20English-e5e7eb.svg)](README.md)

Taberna é um ponto de partida personalizável para sites pessoais, portfólios, landing pages e pequenos sites institucionais. Você edita arquivos JSON e Markdown para alterar textos, páginas, menu, imagens, idiomas e rodapé. A aplicação cuida da disposição responsiva, da navegação e da renderização segura do conteúdo.

Não é necessário alterar os componentes Vue para fazer as personalizações mais comuns. O conteúdo básico fica em `public/config/` e `public/content/`, enquanto cores e fontes são centralizadas em `src/style.css`.

O repositório inclui conteúdo fictício de demonstração. Substitua-o antes de publicar seu site.

## O que você pode criar

O Taberna oferece:

- uma página inicial responsiva formada por seções configuráveis;
- páginas Markdown independentes para conteúdos como Sobre e Serviços;
- detecção automática de idioma e uma página de seleção de idioma;
- seções com texto, imagens, Markdown, fundos destacados e disposições invertidas;
- um carrossel opcional com reprodução automática, controles, indicadores e vários itens;
- um menu responsivo acessível por teclado;
- um rodapé personalizado opcional escrito com Markdown e HTML;
- cores, fontes e configurações de transição centralizadas;
- uma versão estática de produção que pode ser hospedada na raiz de um domínio ou em um subdiretório.

## Sumário

- [Início rápido](#início-rápido)
- [Sua primeira personalização](#sua-primeira-personalização)
- [Onde fazer alterações](#onde-fazer-alterações)
- [Editando JSON e Markdown](#editando-json-e-markdown)
- [Configuração do site](#configuração-do-site)
- [Menu e páginas](#menu-e-páginas)
- [Seções da página inicial](#seções-da-página-inicial)
- [Rodapé](#rodapé)
- [Idiomas](#idiomas)
- [Personalização visual](#personalização-visual)
- [Compilação e implantação](#compilação-e-implantação)
- [Solução de problemas](#solução-de-problemas)
- [Referência avançada](#referência-avançada)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Início rápido

### O que você precisa

- [Node.js](https://nodejs.org/) 20.19 ou mais recente, ou 22.12 ou mais recente;
- npm, que é instalado junto com o Node.js;
- um editor de código, como o Visual Studio Code;
- Git, se quiser clonar o repositório em vez de baixá-lo como um arquivo ZIP.

Abra um terminal e confirme que Node.js e npm estão disponíveis:

```bash
node --version
npm --version
```

Se algum dos comandos não for encontrado, instale uma versão compatível do Node.js e abra o terminal novamente.

### Baixe e execute o projeto

Clone o repositório e entre no diretório dele:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
```

Como alternativa, baixe o repositório como um arquivo ZIP, extraia-o, abra o diretório `taberna` extraído no seu editor e abra um terminal nesse diretório.

Instale as dependências do projeto:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`. Mantenha o comando em execução enquanto trabalha. A maioria das alterações aparece automaticamente; pressione `Ctrl+C` no terminal quando quiser interromper o servidor.

## Sua primeira personalização

Este passo a passo usa português (`pt-br`), o idioma padrão. Se a aplicação selecionar inglês, faça as alterações equivalentes em `public/config/en-us.json` e `public/content/en-us/`, ou selecione português na página de idiomas.

### 1. Altere o nome e a descrição do site

Abra `public/config/pt-br.json` e encontre o objeto `site`:

```json
"site": {
  "title": "Seu Nome",
  "description": "Uma descrição curta do seu site",
  "image": "logo.png"
}
```

Salve o arquivo e confira o navegador. O título aparece na interface e na aba do navegador, enquanto a descrição é usada nos metadados da página.

### 2. Substitua o logotipo e o favicon

- Substitua `public/logo.png` pelo seu logotipo.
- Substitua `public/favicon.png` pelo pequeno ícone exibido nas abas do navegador.
- Mantenha os mesmos nomes de arquivo ou atualize `site.image` se escolher outro nome para o logotipo.

Arquivos dentro de `public/` são referenciados sem o prefixo `public/`. Por exemplo, `public/images/brand.png` é escrito como `images/brand.png` na configuração.

### 3. Edite o conteúdo da página inicial

Abra `public/content/pt-br/intro.md` e substitua o texto de demonstração. Markdown é texto simples com uma pequena quantidade de sintaxe de formatação, portanto um arquivo pode ser tão simples quanto:

```md
# Boas-vindas

Este é o meu novo site.

- Conheça meu trabalho
- Veja meus serviços
- Entre em contato
```

### 4. Altere uma seção

Em `public/config/pt-br.json`, encontre um item dentro de `sections`. Altere seu `title`, `subtitle`, imagem ou arquivo Markdown referenciado. Por exemplo:

```json
{
  "id": "intro",
  "title": "Boas-vindas",
  "subtitle": "Uma breve apresentação",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

Crie `public/images/` caso não exista e coloque a imagem em `public/images/intro.jpg`. O valor de `contentFiles` é relativo a `public/content/pt-br/`, portanto `intro.md` se refere a `public/content/pt-br/intro.md`.

### 5. Altere as cores principais

Abra `src/style.css`, encontre o bloco `:root` e altere as variáveis semânticas de cor. Por exemplo:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
}
```

Essas variáveis são reutilizadas em toda a interface, permitindo alterar a identidade visual sem editar cada componente.

### 6. Confira o resultado

Revise o site em uma janela larga e em uma janela estreita do navegador. Confira também todos os idiomas configurados: cada idioma possui sua própria configuração completa e seu próprio diretório de conteúdo.

Quando estiver satisfeito, siga [Compilação e implantação](#compilação-e-implantação) para gerar a versão publicável.

## Onde fazer alterações

| O que você deseja alterar                     | Arquivo ou diretório                    |
| --------------------------------------------- | --------------------------------------- |
| Nome, descrição, menu e seções do site        | `public/config/{locale}.json`           |
| Markdown da página inicial e páginas avulsas  | `public/content/{locale}/`              |
| Idiomas e bandeiras disponíveis               | `public/languages.json`                 |
| Logotipo e favicon                            | `public/logo.png`, `public/favicon.png` |
| Outras imagens locais                         | Qualquer diretório dentro de `public/`  |
| Cores, fontes e transições                    | `src/style.css`                         |
| Metadados HTML iniciais e política de imagens | `index.html`                            |
| Disposição e comportamento da aplicação       | Arquivos Vue dentro de `src/`           |

Para uma personalização normal do conteúdo, comece com `public/config/`, `public/content/` e as imagens em `public/`. Alterações dentro de `src/` são destinadas principalmente a desenvolvedores que desejam modificar a disposição ou o comportamento.

## Editando JSON e Markdown

### Noções básicas de JSON

Os arquivos em `public/config/` e `public/languages.json` usam JSON. Lembre-se destas regras:

- nomes de propriedades e valores de texto usam aspas duplas;
- itens de listas e propriedades são separados por vírgulas;
- o último item de um objeto ou lista não possui vírgula no final;
- `true`, `false` e números não usam aspas;
- JSON não permite comentários;
- nomes de arquivos e caminhos diferenciam maiúsculas de minúsculas na maioria dos serviços de hospedagem.

Um pequeno objeto JSON válido se parece com isto:

```json
{
  "title": "Meu Site",
  "enabled": true,
  "items": ["Primeiro", "Segundo"]
}
```

Se a página ficar vazia ou parar de atualizar após a edição de uma configuração, verifique o terminal e o console do navegador em busca de um erro de sintaxe JSON.

### Noções básicas de Markdown

Arquivos Markdown usam `.md` e são úteis para conteúdos mais longos. Formatações comuns incluem:

```md
# Título principal

## Título menor

Parágrafo comum com **texto em negrito** e _texto em itálico_.

- Primeiro item
- Segundo item

[Texto do link](https://example.com)
```

Markdown pode conter HTML quando você precisar de uma estrutura personalizada. Todo o HTML gerado é sanitizado antes de ser exibido, portanto scripts e atributos inseguros são removidos.

## Configuração do site

Cada idioma possui uma configuração completa em `public/config/{locale}.json`. Essa configuração conecta a identidade do site, o menu, as seções da página inicial e o rodapé.

Este exemplo reduzido mostra como as partes se relacionam:

```json
{
  "site": {
    "title": "Meu Site",
    "description": "Uma descrição curta do meu site",
    "image": "logo.png"
  },
  "menu": [
    { "label": "Início", "href": "#intro" },
    { "label": "Sobre", "route": "/about" }
  ],
  "sections": [
    {
      "id": "intro",
      "title": "Boas-vindas",
      "contentFiles": ["intro.md"]
    }
  ],
  "footer": {
    "ownership": "© 2026 Seu Nome",
    "contentFile": "footer.md"
  }
}
```

Neste exemplo:

- `#intro` aponta para a seção cujo `id` é `intro`;
- `intro.md` é carregado a partir do diretório de conteúdo do idioma atual;
- `/about` carrega `about.md` a partir desse mesmo diretório;
- `footer.md` fornece o conteúdo personalizado opcional do rodapé.

### Campos de identidade do site

| Campo         | Tipo   | Obrigatório | Comportamento                                        |
| ------------- | ------ | ----------- | ---------------------------------------------------- |
| `title`       | string | Não         | Título no cabeçalho, menu lateral e aba do navegador |
| `description` | string | Sim         | Descrição da página usada nos metadados do navegador |
| `image`       | string | Não         | Imagem exibida ao lado do título                     |

Os metadados iniciais em `index.html` são exibidos antes que a configuração seja carregada. Depois do carregamento, `site.title` e `site.description` atualizam o documento do navegador. A troca de idioma os atualiza sem recarregar a página.

Para imagens locais, coloque o arquivo dentro de `public/` e use um caminho relativo, como `images/brand.png`. Evite uma `/` no início caso o site seja publicado em um subdiretório.

## Menu e páginas

Os itens do menu podem apontar para uma seção da página inicial, uma página Markdown independente ou um site externo.

### Link para uma seção da página inicial

```json
{ "label": "Início", "href": "#intro" }
```

O valor depois de `#` deve corresponder ao `id` de uma seção.

### Link para uma página independente

```json
{ "label": "Sobre", "route": "/about" }
```

Isso carrega `public/content/{locale}/about.md`. Para usar outro nome de arquivo ou um subdiretório, adicione `content`:

```json
{
  "label": "Blog",
  "route": "/blog",
  "content": "pages/my-blog.md"
}
```

Essa rota exibe `public/content/{locale}/pages/my-blog.md`.

### Link para um site externo

```json
{ "label": "GitHub", "href": "https://github.com/mineot" }
```

Links externos do menu abrem em uma nova aba. Somente links HTTP e HTTPS são aceitos.

### Precedência do menu

| Configuração            | Comportamento                                                |
| ----------------------- | ------------------------------------------------------------ |
| `route`                 | Cria um link para uma página interna                         |
| `href` iniciado por `#` | Volta ao início e rola suavemente até a seção correspondente |
| `href` HTTP/HTTPS       | Abre um link externo em uma nova aba                         |
| `route` e `content`     | Usa `content` como caminho Markdown dessa rota               |
| `route` e `href`        | Usa `route` e ignora `href`                                  |

Links dentro de Markdown são links HTML comuns. Como o Taberna usa rotas baseadas em hash, crie um link para uma página interna com uma URL relativa, como `[Sobre](./#/about)`. Um link como `/about` solicita ao servidor web um caminho `/about` real e pode falhar após a implantação.

### Páginas com sublinks

Uma página Markdown pode conter links para outras páginas Markdown em subdiretórios. Isso permite, por exemplo, que `/articles` apresente uma lista de artigos e que `/features` apresente links para páginas detalhadas:

```text
public/content/{locale}/
├── articles.md
├── articles/
│   └── article-1.md
├── features.md
└── features/
    └── organized-content.md
```

O menu continua sendo plano: esses sublinks não viram submenus automaticamente. Eles são escritos dentro de `articles.md` ou `features.md` como links Markdown comuns.

**O `#/` é obrigatório antes da rota em todo sublink interno escrito em Markdown.** Use:

```md
[Primeiro artigo](./#/articles/article-1)
[Conteúdo organizado](./#/features/organized-content)
```

Não use:

```md
[Primeiro artigo](/articles/article-1)
```

Sem o `#`, o navegador acessa `/articles/article-1` como um caminho real do servidor e pode produzir uma URL incorreta como `/articles/article-1#/`. A URL correta é `/#/articles/article-1`.

A extensão `.md` pertence somente ao arquivo e não deve aparecer na URL. A rota `/#/articles/article-1` carrega `public/content/{locale}/articles/article-1.md`. Para retornar à página principal a partir do artigo, use:

```md
[Voltar para os artigos](./#/articles)
```

## Seções da página inicial

Cada item do array `sections` da configuração representa um bloco da página inicial.

| Campo             | Tipo                      | Obrigatório | Descrição                                                      |
| ----------------- | ------------------------- | ----------- | -------------------------------------------------------------- |
| `id`              | string                    | Sim         | Identificador único e destino para links como `#about`         |
| `title`           | string                    | Não         | Título exibido acima do conteúdo da seção                      |
| `subtitle`        | string                    | Não         | Texto curto exibido abaixo do título                           |
| `content`         | string[]                  | Não         | Parágrafos de texto simples                                    |
| `contentFiles`    | string[]                  | Não         | Caminhos Markdown relativos ao diretório de conteúdo do idioma |
| `image`           | string                    | Não         | Imagem usada com texto simples ou um arquivo Markdown          |
| `imagePosition`   | `top`, `center`, `bottom` | Não         | Recorte da imagem e alinhamento vertical alternativo           |
| `contentPosition` | `top`, `center`, `bottom` | Não         | Alinhamento vertical; substitui `imagePosition`                |
| `invert`          | boolean                   | Não         | Inverte o conteúdo e a imagem no desktop                       |
| `emphasis`        | boolean                   | Não         | Usa o fundo de seção destacado                                 |
| `carousel`        | object                    | Não         | Ativa o comportamento de carrossel para vários arquivos        |

### Escolha um formato de conteúdo

A seção decide o que exibir nesta ordem:

1. Se `content` existir, ele será exibido como parágrafos de texto simples.
2. Um item em `contentFiles` exibe um bloco Markdown.
3. Dois ou mais itens com `carousel` exibem um carrossel.
4. Dois ou mais itens sem `carousel` são exibidos lado a lado e empilhados em dispositivos móveis.
5. `image` é exibida somente com `content` ou exatamente um `contentFile`.

Para obter resultados previsíveis, não adicione `content` e `contentFiles` à mesma seção.

### Texto simples e imagem

```json
{
  "id": "about",
  "title": "Sobre",
  "subtitle": "Conheça melhor meu trabalho",
  "content": ["Primeiro parágrafo.", "Segundo parágrafo."],
  "image": "images/about.jpg",
  "imagePosition": "top",
  "contentPosition": "center",
  "invert": false,
  "emphasis": true
}
```

No desktop, a ordem padrão é conteúdo à esquerda e imagem à direita. Com `invert: true`, a imagem passa para a esquerda. Em dispositivos móveis, o conteúdo aparece acima da imagem nos dois casos.

`contentPosition` controla o alinhamento vertical da linha. Se for omitido, `imagePosition` também será usado como alinhamento alternativo. De forma independente, `imagePosition` controla qual parte da imagem permanece visível quando ela é recortada.

### Um arquivo Markdown e uma imagem

```json
{
  "id": "intro",
  "title": "Introdução",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

### Vários arquivos Markdown

```json
{
  "id": "services",
  "title": "Serviços",
  "contentFiles": ["services/service-1.md", "services/service-2.md"]
}
```

Se um arquivo não carregar, os outros ainda serão exibidos. Se todos os arquivos falharem, a seção permanecerá visível sem esse conteúdo.

## Rodapé

O objeto `footer` aceita:

| Campo         | Tipo   | Obrigatório | Descrição                                 |
| ------------- | ------ | ----------- | ----------------------------------------- |
| `ownership`   | string | Sim         | Texto exibido na linha inferior do rodapé |
| `contentFile` | string | Não         | Markdown exibido acima da linha inferior  |

### Rodapé básico

Se você precisa somente de uma linha de propriedade, omita `contentFile`:

```json
"footer": {
  "ownership": "© 2026 Seu Nome"
}
```

O rodapé também exibirá o crédito fixo “Powered by Mineot” do projeto.

### Rodapé personalizado

Adicione um arquivo Markdown, como `public/content/{locale}/footer.md`, e referencie-o na configuração:

```json
"footer": {
  "ownership": "© 2026 Seu Nome",
  "contentFile": "footer.md"
}
```

A disposição de rodapé integrada espera a hierarquia de filhos diretos abaixo. Mantenha as linhas em branco ao redor dos títulos e listas Markdown.

<!-- prettier-ignore -->
```html
<div class="footer">
<div class="footer-container">
<div class="footer-brand">
<img src="logo.png" alt="Meu Site" class="footer-logo" />
<span class="footer-title">Meu Site</span>
</div>
<span class="footer-summary">Uma descrição curta.</span>
</div>
<div class="footer-links">

#### Links rápidos

- [Início](./#/)
- [Sobre](./#/about)

</div>
<div class="footer-links">

#### Redes sociais

- [GitHub](https://github.com/)

</div>
</div>
```

A classe `.footer` cria uma coluna em telas pequenas e três colunas iguais em telas maiores. A primeira coluna contém a marca e o resumo; as demais contêm listas de links. A apresentação é controlada pelas classes de rodapé em `src/style.css`.

Se o arquivo de rodapé personalizado não puder ser carregado, somente esse conteúdo personalizado será omitido.

## Idiomas

### Manifesto de idiomas

`public/languages.json` lista o idioma padrão e os idiomas disponíveis:

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

Use códigos `idioma-região` em letras minúsculas, como `pt-br` ou `en-us`. Cada valor em `available` precisa de:

- uma bandeira no objeto `flags`;
- um arquivo completo em `public/config/{locale}.json`;
- um diretório correspondente em `public/content/{locale}/` contendo todos os arquivos Markdown referenciados.

### Como um idioma é selecionado

A aplicação verifica, nesta ordem:

1. uma preferência válida salva anteriormente no navegador;
2. uma correspondência exata ou parcial com os idiomas preferidos do navegador;
3. o idioma `default` do manifesto;
4. o idioma alternativo interno `pt-br`, se o manifesto não puder ser carregado.

Quando o usuário seleciona outro idioma, o Taberna carrega sua configuração antes de salvar a preferência e depois retorna à página inicial.

### Adicione outro idioma

1. Copie uma configuração existente:

   ```bash
   cp public/config/pt-br.json public/config/es-es.json
   ```

2. Crie o diretório de conteúdo:

   ```bash
   mkdir -p public/content/es-es
   ```

3. Traduza a configuração e copie ou traduza todos os arquivos Markdown que ela referencia.
4. Adicione `es-es` a `available` e `flags` em `public/languages.json`.
5. Teste a página inicial, o menu, as páginas, o rodapé e a troca de idioma.

As configurações continuam completas por idioma, mas os identificadores técnicos são compartilhados entre as localidades. Mantenha rotas, IDs de seção, nomes de diretórios e nomes de arquivos em inglês, com letras minúsculas e hífens; traduza apenas labels e conteúdo editorial. As árvores de conteúdo devem usar caminhos correspondentes, para que uma rota como `/about` encontre `about.md` em todos os idiomas.

## Personalização visual

### Logotipo, favicon e imagens

- `public/logo.png` é a imagem padrão da marca.
- `public/favicon.png` é o ícone da aba do navegador.
- Outras imagens podem ser organizadas em um diretório como `public/images/`.
- Caminhos locais na configuração omitem `public/` e não devem começar com `/`.

Imagens locais são a opção mais simples. Para carregar uma imagem de outro domínio, esse domínio também deve ser permitido pela Política de Segurança de Conteúdo em `index.html`.

### Fontes

| Utilitário   | Fonte padrão | Uso principal              |
| ------------ | ------------ | -------------------------- |
| `font-sans`  | Roboto       | Interface e corpo do texto |
| `font-serif` | Roboto Serif | Conteúdo editorial         |
| `font-mono`  | Roboto Mono  | Código                     |
| `font-fancy` | Italianno    | Título da marca            |

Para alterar uma fonte, adicione seus arquivos a `public/fonts/` e atualize as regras `@font-face` e as variáveis de fonte em `src/style.css`.

### Cores e transições

O bloco `:root` em `src/style.css` contém variáveis semânticas. Seus nomes descrevem onde cada valor é usado, portanto a alteração de uma variável atualiza todos os componentes que a utilizam.

| Grupo        | Variáveis                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Fundos       | `--background`, `--background-hover`, `--background-emphasis`, `--footer-background`, `--backdrop`, `--backdrop-opacity` |
| Cabeçalho    | `--header-background`, `--header-background-opacity`, `--header-link`, `--header-link-hover`                             |
| Menu lateral | `--sidebar-background`, `--sidebar-background-hover`, `--sidebar-link`, `--sidebar-link-hover`                           |
| Texto        | `--text`, `--text-body`, `--text-muted`, `--emphasis`, `--emphasis-hover`, `--error`                                     |
| Interface    | `--border`, `--ring`, `--skeleton`                                                                                       |
| Carrossel    | `--dot`, `--dot-inactive`, `--dot-active`, `--progress-track`, `--progress`                                              |
| Movimento    | `--duration`, `--duration-carousel`                                                                                      |

Exemplo:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --text: #f9fafb;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
  --duration: 250ms;
  --duration-carousel: 450ms;
}
```

Depois de alterar cores ou fontes, confira o contraste do texto e teste as disposições em dispositivos móveis e desktop.

## Compilação e implantação

### Crie a versão de produção

Interrompa o servidor de desenvolvimento caso esteja em execução e execute:

```bash
npm run build
```

Esse comando valida o código TypeScript e gera o site publicável em `dist/`. Visualize localmente essa versão exata com:

```bash
npm run preview
```

Abra o endereço exibido no terminal, normalmente `http://localhost:4173`, e verifique o menu, as páginas, as imagens, os idiomas e os links.

### Publique

O Taberna gera um site estático. Você pode hospedar o diretório `dist/` gerado no GitHub Pages, Netlify, Vercel, Nginx, Apache ou em outro serviço de hospedagem estática.

Para um serviço que compila o repositório para você, use:

| Configuração       | Valor           |
| ------------------ | --------------- |
| Comando de build   | `npm run build` |
| Diretório de saída | `dist`          |

Para um serviço que aceita o envio de arquivos, envie o conteúdo gerado dentro de `dist/`.

O roteador usa URLs baseadas em hash e o Vite usa um caminho-base relativo. Isso permite que a mesma compilação funcione na raiz de um domínio ou em um subdiretório sem regras especiais de redirecionamento no servidor.

O fluxo mais seguro é executar `npm run build` novamente após cada alteração de conteúdo, configuração, imagem, estilo ou código e implantar o novo diretório `dist/` gerado.

## Solução de problemas

### `node` ou `npm` não foi encontrado

Instale uma versão compatível do Node.js, feche e abra o terminal novamente e execute `node --version` e `npm --version` outra vez.

### O endereço de desenvolvimento habitual não abre

Leia a saída de `npm run dev`. Se a porta 5173 já estiver em uso, o Vite pode selecionar outra porta e exibir um endereço diferente.

### A página fica vazia depois de editar uma configuração

Verifique o terminal e o console de desenvolvedor do navegador. A falta de aspas, vírgulas ou delimitadores de fechamento pode tornar o JSON inválido. JSON não permite comentários ou vírgulas ao final.

### O conteúdo Markdown não aparece

Confirme se:

- o arquivo existe dentro do diretório de conteúdo do idioma selecionado;
- o caminho corresponde exatamente a `contentFiles`, `content` do menu ou `footer.contentFile`;
- letras maiúsculas e minúsculas correspondem;
- o idioma selecionado possui sua própria cópia do arquivo.

O Markdown é armazenado em cache na memória. Recarregue a página do navegador se uma alteração salva em Markdown não aparecer durante o desenvolvimento.

### Uma página independente exibe a mensagem `Page not found`

Sem um valor `content` no menu, a rota `/about` espera encontrar `public/content/{locale}/about.md`. Se o arquivo usar outro nome ou um subdiretório, configure `content` explicitamente.

### Uma imagem não carrega

Para uma imagem local, confirme que ela está dentro de `public/` e use um caminho como `images/photo.jpg`, sem `public/` ou uma `/` no início. Para uma imagem externa, adicione seu domínio à diretiva `img-src` em `index.html`.

### Um link Markdown interno funciona localmente, mas falha após a publicação

Use um link relativo baseado em hash, como `[Sobre](./#/about)`, em vez de `/about`.

### O site publicado não inclui as alterações recentes

Execute `npm run build` novamente e implante o novo conteúdo de `dist/`. Não edite `dist/` como fonte permanente das suas personalizações.

### O ESLint informa avisos de `v-html`

Esses avisos são esperados neste projeto. O HTML originado de Markdown é sanitizado com DOMPurify antes da renderização.

## Referência avançada

As seções abaixo são úteis principalmente quando você deseja alterar o comportamento, trabalhar nos componentes Vue ou entender as proteções técnicas do projeto.

### Carrossel

Adicione um objeto `carousel` a uma seção com dois ou mais arquivos Markdown:

```json
{
  "id": "testimonials",
  "contentFiles": [
    "testimonials/testimonial-1.md",
    "testimonials/testimonial-2.md",
    "testimonials/testimonial-3.md"
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

| Campo          | Tipo    | Padrão | Regras                                              |
| -------------- | ------- | ------ | --------------------------------------------------- |
| `autoPlay`     | boolean | `true` | Avança automaticamente                              |
| `interval`     | number  | `5000` | Mínimo de 1.000 ms; valores inválidos usam o padrão |
| `buttons`      | boolean | `true` | Exibe setas quando há mais de uma página            |
| `dots`         | boolean | `true` | Exibe um indicador de posição por página            |
| `itemsPerView` | number  | `1`    | Inteiro, mínimo 1, limitado ao número de slides     |

Um item por visualização usa uma transição de esmaecimento. Vários itens usam movimento horizontal e navegação por páginas. Telas com menos de 768 px sempre exibem um item. Com somente uma página, os controles de navegação e reprodução ficam ocultos.

A reprodução automática pausa durante a passagem do cursor, o foco pelo teclado e enquanto a aba do navegador está oculta. O usuário pode pausá-la permanentemente pelo controle de reprodução. Um anel de progresso mostra o tempo restante e congela durante a pausa. Preferências por movimento reduzido desativam a reprodução automática. A navegação manual reinicia o intervalo.

### Rotas, cabeçalho e menu lateral

| URL lógica            | URL no navegador        | Conteúdo                              |
| --------------------- | ----------------------- | ------------------------------------- |
| `/`                   | `/#/`                   | Seções configuradas da página inicial |
| `/languages`          | `/#/languages`          | Seleção de idioma                     |
| `/:slug(.*)`          | `/#/about`              | Página Markdown independente          |
| `/articles/article-1` | `/#/articles/article-1` | Página Markdown em subdiretório       |

A rota `/:slug(.*)` aceita um ou mais segmentos de URL. Sem um valor `content` no item do menu, cada segmento corresponde ao caminho do arquivo dentro de `public/content/{locale}/`, e `.md` é acrescentado internamente. Caracteres inválidos são removidos antes que o slug seja usado. Quando o arquivo correspondente não existe, o `PageView` exibe `Page not found`; a rota não é redirecionada automaticamente para a página inicial. A navegação restaura posições salvas de rolagem, rola suavemente até âncoras e retorna ao topo nos demais destinos.

No desktop, até quatro itens do menu são exibidos em linha. Mais de quatro itens ativam o menu hambúrguer em todos os tamanhos de tela. Telas pequenas também usam o menu hambúrguer. Com um menu vazio e somente um idioma, o botão é omitido.

O menu lateral fecha por seu botão, pelo fundo sobreposto, pelos links ou pela tecla `Escape`. Ele bloqueia a rolagem da página enquanto está aberto, mantém o foco do teclado dentro dele e devolve o foco ao elemento que o abriu.

### Renderização e cache de Markdown

Os arquivos Markdown são buscados em tempo de execução, convertidos com `marked`, sanitizados com DOMPurify e estilizados com Tailwind Typography. Seções, páginas, slides e o rodapé personalizado usam esse fluxo.

O cache em memória usa cada caminho de conteúdo como chave e permanece até a página do navegador ser recarregada. Arquivos com falha não impedem o carregamento de outros conteúdos Markdown.

### Segurança

Todo HTML gerado a partir de Markdown passa por `DOMPurify.sanitize()` antes de chegar a `v-html`. Não dependa de elementos `<script>`, atributos de evento como `onclick` ou HTML rejeitado pelo sanitizador.

URLs externas do menu passam por uma lista de permissões que aceita somente HTTP e HTTPS. Links em Markdown permanecem links HTML comuns e sanitizados.

A Política de Segurança de Conteúdo em `index.html` permite:

- scripts somente da mesma origem;
- estilos da mesma origem e estilos em linha;
- fontes somente da mesma origem;
- imagens locais, URIs de dados e imagens de `https://placehold.co`.

A política é fornecida atualmente por uma meta tag. Adicione domínios confiáveis de imagens a `img-src` somente quando necessário. Para uma segurança de produção mais rigorosa, forneça a CSP como um cabeçalho de resposta HTTP por meio do ambiente de hospedagem.

### Tecnologias

- Vue 3 com Composition API e `<script setup>`;
- TypeScript em modo estrito;
- Vite;
- Vue Router no modo hash;
- Tailwind CSS v4 e Tailwind Typography;
- `marked` e DOMPurify;
- Lucide Vue;
- Vitest, Vue Test Utils e jsdom;
- ESLint e Prettier.

### Comandos de desenvolvimento

```bash
npm run dev        # Inicia o servidor de desenvolvimento
npm run build      # Verifica os tipos e gera dist/
npm run preview    # Visualiza a compilação de produção
npm run test       # Executa os testes unitários com Vitest
npm run typecheck  # Valida o TypeScript sem gerar arquivos
npm run lint       # Executa o ESLint em src/
npm run format     # Formata arquivos TypeScript, Vue e CSS em src/
```

Antes de enviar uma alteração de código, execute:

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run build
```

### Utilitários CSS semânticos

Os componentes usam utilitários `app-*` em vez de cores diretas da paleta. Altere as variáveis semânticas para uma personalização comum do tema; altere esses utilitários somente ao modificar a estilização dos componentes.

| Grupo                  | Utilitários                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fundos                 | `app-background`, `app-background-hover`, `app-header`, `app-backdrop`, `app-footer`                                                                                                        |
| Texto                  | `app-text`, `app-text-muted`, `app-text-body`, `app-text-subtle`, `app-text-emphasis`, `app-text-emphasis-hover`, `app-error`, `app-markdown`                                               |
| Marca                  | `app-title`, `app-title-adjustment`, `app-logo`, `app-powered`                                                                                                                              |
| Cabeçalho/menu lateral | `app-header-link`, `app-sidebar`, `app-sidebar-link`                                                                                                                                        |
| Idiomas                | `app-language-button`, `app-language-button-text`, `app-language-button-selected`                                                                                                           |
| Seções                 | `app-section-title`, `app-section-subtitle`, `app-section-image`, `app-section-emphasis`                                                                                                    |
| Carrossel              | `app-section-carousel-transition`, `app-section-carousel-btn`, `app-section-carousel-progress-track`, `app-section-carousel-progress`, `app-section-dot-active`, `app-section-dot-inactive` |
| Geral                  | `app-duration`, `app-border`, `app-ring`, `app-skeleton`                                                                                                                                    |

Utilitários primitivos como `app-background-hover` e `app-text-emphasis-hover` fornecem um valor, mas não adicionam por conta própria um estado de passagem do cursor. Use-os com `hover:` quando necessário. Utilitários de nível mais alto, como `app-title`, já incluem seu comportamento de passagem do cursor.

### Proteja suas personalizações

Prefira manter um fork ou seu próprio repositório. Preserve os arquivos que você alterou, especialmente:

- `public/config/`;
- `public/content/`;
- `public/languages.json`;
- imagens e fontes dentro de `public/`;
- `src/style.css`;
- `index.html`, se você alterou os metadados ou a CSP;
- quaisquer componentes Vue ou utilitários modificados dentro de `src/`.

Não use `dist/` como a única cópia do seu trabalho. Ele é um resultado gerado e pode ser substituído pela próxima compilação.

## Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b feature/nova-feature`.
3. Implemente e valide suas alterações.
4. Faça commit e push da branch.
5. Abra um pull request.

## Licença

Licenciado sob a [Licença Apache 2.0](LICENSE).
