# Taberna

[![Licença](https://img.shields.io/badge/Licen%C3%A7a-Apache%202.0-blue.svg)](LICENSE) [![🇺🇸 English](https://img.shields.io/badge/Language-%F0%9F%87%BA%F0%9F%87%B8%20English-e5e7eb.svg)](README.md)

O Taberna é uma base configurável para sites pessoais, portfólios, landing pages
e pequenos sites institucionais. Ele combina uma aplicação Vue com manifests
JSON e fragmentos HTML específicos para cada idioma, permitindo manter a maior
parte do conteúdo sem alterar o código da aplicação.

O projeto funciona inteiramente no cliente e produz uma versão estática adequada
tanto para a raiz de um domínio quanto para um subdiretório. O conteúdo e as
imagens remotas incluídos são exemplos fictícios e devem ser substituídos antes
da publicação.

## Recursos

- layout responsivo e mobile-first;
- detecção do idioma do navegador e seleção manual de idioma;
- identidade, navegação, página inicial e rodapé configuráveis por idioma;
- rotas baseadas em hash para páginas independentes e aninhadas;
- elementos personalizados reutilizáveis para painéis, colunas, links, citações
  e carrosséis;
- conteúdo HTML sanitizado e validação de arquivos, URLs e configurações;
- tokens semânticos de tema e fontes hospedadas localmente;
- saída estática com caminhos relativos para recursos.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 ou mais recente, ou 22.12 ou mais
  recente;
- npm, incluído com o Node.js.

## Início rápido

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra a URL exibida no terminal, normalmente `http://localhost:5173`. O Vite
recarrega a página conforme os arquivos do projeto são alterados. Pressione
`Ctrl+C` para encerrar o servidor.

Crie e visualize uma versão de produção com:

```bash
npm run build
npm run preview
```

## Estrutura do projeto

```text
public/
  config/
    languages.json          Idiomas habilitados e informações de exibição
    en-us.json              Manifest do site em inglês
    pt-br.json              Manifest do site em português brasileiro
  content/{locale}/         Fragmentos .htm da página inicial, rodapé e rotas
  fonts/                    Fontes hospedadas localmente
  images/                   Logotipo, textura e outras imagens públicas
  favicon.png
src/
  components/
    layouts/                Estrutura da aplicação e saída de conteúdo sanitizado
    widgets/                Cabeçalho, rodapé, navegação e controles
    *.vue                   Elementos personalizados disponíveis no conteúdo
  pages/                    Página inicial, seletor de idioma e páginas dinâmicas
  stores/                   Stores Pinia de configuração e idioma
  styles/                   Tokens do tema e utilities compartilhadas
  utils/                    Carregamento, validação, sanitização e caminhos
  App.vue                   Inicialização e sincronização de metadados
  main.ts                   Ponto de entrada da aplicação
  router.ts                 Rotas baseadas em hash
  style.css                 Ponto de entrada dos estilos globais
  web-components.ts         Registro dos elementos usados no conteúdo
index.html                  Estrutura da SPA, metadados iniciais e CSP
vite.config.ts              Configuração do Vite, Tailwind, aliases e Vitest
```

Configuração, conteúdo editorial e apresentação são mantidos separados:

- `public/config/` define idiomas, identidade, navegação e pontos de entrada de
  conteúdo;
- `public/content/` contém os fragmentos HTML renderizados em cada idioma;
- `src/components/` e `src/styles/` definem comportamento reutilizável e
  apresentação visual.

Na manutenção normal do conteúdo, somente os arquivos em `public/` precisam ser
alterados.

## Configuração de idiomas

`public/config/languages.json` é o manifest global de idiomas:

```json
{
  "default": "pt-br",
  "available": ["pt-br", "en-us"],
  "flags": {
    "pt-br": "🇧🇷",
    "en-us": "🇺🇸"
  },
  "names": {
    "pt-br": "Português (Brasil)",
    "en-us": "English (United States)"
  }
}
```

A aplicação determina o idioma ativo nesta ordem:

1. uma escolha válida armazenada anteriormente em `taberna-lang`;
2. um idioma compatível entre as preferências do navegador;
3. o idioma configurado em `default`.

Cada item de `available` deve:

- usar um locale normalizado em letras minúsculas, como `pt-br`;
- possuir um valor correspondente em `flags` e `names`;
- possuir um arquivo `public/config/{locale}.json`;
- possuir um diretório `public/content/{locale}/` com o conteúdo necessário.

O locale padrão também deve fazer parte de `available`. Os identificadores de
locale não podem se repetir.

Para manter o site em apenas um idioma, deixe somente esse locale no manifest. O
arquivo de configuração e o diretório de conteúdo desse locale continuam sendo
obrigatórios, pois a aplicação usa o idioma para localizar cada recurso.

Para adicionar um idioma, copie a configuração e o diretório de conteúdo de um
locale existente, traduza o conteúdo visível e registre o novo locale nos quatro
campos do manifest. Mantenha rotas, diretórios e nomes de arquivos equivalentes
entre os idiomas para que a página atual continue disponível após uma troca de
idioma.

## Configuração de uma versão do site

Cada arquivo `public/config/{locale}.json` define uma versão do site em um
idioma:

```json
{
  "title": "Taberna",
  "description": "Uma breve apresentação do site.",
  "image": "images/logo.png",
  "ownership": "© 2026 Seu nome",
  "footer": "footer.htm",
  "home": "home.htm",
  "navigator": [
    { "text": "Artigos", "href": "#/articles.htm" },
    { "text": "Como usar", "href": "#/howuse.htm" },
    { "text": "Sobre", "href": "#/about.htm" }
  ]
}
```

| Campo         | Obrigatório | Descrição                                                               |
| ------------- | ----------- | ----------------------------------------------------------------------- |
| `title`       | sim         | Nome exibido pelo componente de marca e usado como título do documento. |
| `description` | sim         | Resumo usado pelo componente de marca e pela meta description.          |
| `image`       | sim         | Caminho da imagem da marca, normalmente relativo a `public/`.           |
| `ownership`   | sim         | Texto de autoria ou direitos autorais exibido no rodapé.                |
| `home`        | não         | Fragmento `.htm` carregado em `#/`.                                     |
| `footer`      | não         | Fragmento `.htm` renderizado acima da linha de autoria do rodapé.       |
| `navigator`   | sim         | Array de itens de navegação no formato `{ "text", "href" }`.            |

Não inclua o prefixo `public/` nos caminhos dos recursos. Por exemplo,
`"image": "images/logo.png"` aponta para `public/images/logo.png`.

Os caminhos de `home` e `footer` são resolvidos dentro do diretório do locale
ativo. Para `pt-br`, o exemplo acima carrega:

```text
public/content/pt-br/home.htm
public/content/pt-br/footer.htm
```

Os dois campos são opcionais. Sem `home`, a aplicação exibe o estado de página
inicial vazia. Sem `footer`, a autoria e o crédito do projeto permanecem visíveis
sem um fragmento de rodapé personalizado.

O carregamento da configuração é atômico. A aplicação só publica um locale
depois que seu manifest JSON e os fragmentos de página inicial e rodapé
referenciados forem carregados e validados. Se a troca de idioma falhar, o idioma
e a configuração atuais permanecem intactos.

### Regras para JSON

- use aspas duplas em nomes de propriedades e textos;
- separe os itens com vírgulas, sem vírgula depois do último item;
- não adicione comentários;
- considere nomes de arquivos e caminhos sensíveis a maiúsculas e minúsculas;
- mantenha todos os caminhos configurados dentro da árvore de conteúdo público
  correspondente.

## Criação de páginas de conteúdo

Os arquivos de conteúdo são fragmentos HTML armazenados em
`public/content/{locale}/`. Eles podem conter HTML padrão seguro, atributos
permitidos, classes utility do Tailwind, estilos inline aceitos pelo sanitizador
e os elementos `twc-*` registrados.

Um fragmento não pode conter `<!doctype>`, `<html>`, `<head>` ou `<body>`. Os
nomes das páginas devem terminar em `.htm`; documentos HTML completos e tipos de
arquivo não permitidos são rejeitados.

Por exemplo, crie uma página em português em:

```text
public/content/pt-br/about.htm
```

Depois, crie um link para ela com:

```text
#/about.htm
```

Páginas aninhadas usam o mesmo mapeamento entre rota e arquivo:

```text
Rota:    #/articles/article1.htm
Arquivo: public/content/pt-br/articles/article1.htm
```

Caminhos de página válidos são relativos, incluem o sufixo `.htm` e podem conter
diretórios aninhados seguros. Barras iniciais, segmentos vazios, travessia de
diretórios como `..` e extensões não permitidas são rejeitados.

A navegação interna deve usar URLs com hash:

- `#/` para a página inicial;
- `#/language-switcher` para o seletor de idioma;
- `#/{caminho-relativo}.htm` para uma página de conteúdo.

Não use caminhos de servidor como `/about.htm` e não omita o sufixo `.htm`.

Use os mesmos caminhos relativos em todos os idiomas habilitados. Por exemplo,
se `public/content/en-us/about.htm` existe, adicione o equivalente traduzido em
`public/content/pt-br/about.htm`.

### Exemplo mínimo de página

```html
<twc-rows gap="6">
  <h1 class="text-4xl" style="color: var(--emphasis-color)">Meu projeto</h1>

  <p>Uma breve apresentação do conteúdo desta página.</p>

  <twc-columns cols="2" gap="4">
    <twc-panel emphasis rounded>
      <h2 class="text-xl">Primeiro destaque</h2>
      <p>Uma descrição do primeiro assunto.</p>
    </twc-panel>

    <twc-panel emphasis rounded>
      <h2 class="text-xl">Segundo destaque</h2>
      <p>Uma descrição do segundo assunto.</p>
    </twc-panel>
  </twc-columns>

  <twc-link href="#/about.htm" label="Saiba mais"></twc-link>
</twc-rows>
```

Salve o fragmento como um arquivo `.htm` e torne-o acessível por `navigator` ou
por um link em outro arquivo de conteúdo.

## Componentes de conteúdo

O Taberna registra componentes Vue como elementos personalizados sem Shadow DOM.
Assim, eles podem ser usados diretamente nos fragmentos e compartilhar o tema
global.

| Elemento            | Atributos                                                         | Padrões e comportamento                                                                         |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `twc-brand`         | `description`                                                     | Exibe o logotipo e o título configurados. `description` também exibe a descrição do site.       |
| `twc-link`          | `href` e `label` obrigatórios; `external` opcional                | Renderiza `label` como texto. `external` abre uma URL HTTP(S) absoluta em nova aba.             |
| `twc-panel`         | `emphasis`, `rounded`, `bordered`                                 | Todas as opções usam `false` como padrão.                                                       |
| `twc-columns`       | `cols="1..12"`, `gap` numérico, `align="start\|center\|end"`      | Usa uma coluna, nenhum espaçamento e alinhamento inicial por padrão. Empilha em telas pequenas. |
| `twc-rows`          | `gap` numérico, `align="start\|center\|end"`                      | Usa nenhum espaçamento e alinhamento inicial por padrão.                                        |
| `twc-quote`         | `title` opcional                                                  | Renderiza uma citação ou nota destacada com título opcional.                                    |
| `twc-carousel`      | `limit` numérico, `delay` em milissegundos, `show-timer` booleano | Usa `1`, `5000` e `true` como padrões.                                                          |
| `twc-carousel-item` | nenhum                                                            | Envolve um item do carrossel.                                                                   |

Atributos booleanos seguem a semântica do HTML: sua presença representa `true`.
Nos casos compatíveis, o texto explícito `"false"` desativa a opção.

### Links

`twc-link` sempre usa o atributo `label` como texto visível; o conteúdo filho não
é usado como rótulo.

Link interno:

```html
<twc-link href="#/about.htm" label="Sobre"></twc-link>
```

Link externo:

```html
<twc-link href="https://example.com" label="Visitar site" external></twc-link>
```

Destinos externos devem ser URLs HTTP ou HTTPS absolutas. URLs inválidas são
renderizadas sem navegação. Links abertos em uma nova aba recebem
`rel="noopener noreferrer"`.

### Elementos de layout

Use `twc-columns` para uma grade responsiva e `twc-rows` para grupos verticais:

```html
<twc-columns cols="3" gap="4" align="center">
  <div>Primeira coluna</div>
  <div>Segunda coluna</div>
  <div>Terceira coluna</div>
</twc-columns>

<twc-rows gap="2" align="start">
  <h2>Título da seção</h2>
  <p>Conteúdo da seção.</p>
</twc-rows>
```

Os valores de `gap` são multiplicadores do token de espaçamento do Tailwind. As
colunas entram em vigor no breakpoint médio de `48rem`; abaixo dele, todos os
itens ficam empilhados.

### Painéis e citações

```html
<twc-panel emphasis rounded bordered>
  <p>Conteúdo destacado.</p>
</twc-panel>

<twc-quote title="Nota do autor">
  <p>Uma breve citação ou nota contextual.</p>
</twc-quote>
```

### Carrossel

```html
<twc-carousel limit="3" delay="5000" show-timer="true">
  <twc-carousel-item>
    <p>Primeiro item</p>
  </twc-carousel-item>
  <twc-carousel-item>
    <p>Segundo item</p>
  </twc-carousel-item>
  <twc-carousel-item>
    <p>Terceiro item</p>
  </twc-carousel-item>
</twc-carousel>
```

O carrossel exibe um item por página em telas pequenas e até `limit` itens a
partir do breakpoint médio. `limit` é arredondado para baixo e limitado ao mínimo
de um. `delay` é limitado a zero ou mais, e `delay="0"` desativa o avanço
automático. `show-timer="false"` oculta a contagem regressiva.

O avanço automático é pausado quando o ponteiro ou o foco do teclado está dentro
do carrossel, respeita a preferência por movimento reduzido e pode ser pausado ou
retomado manualmente. O componente também oferece paginação, controles acessíveis
por teclado e oculta itens fora da página atual da árvore de acessibilidade.

## Recursos e personalização visual

Recursos públicos são referenciados sem o prefixo `public/` e, normalmente, sem
uma barra inicial:

```text
images/logo.png     -> public/images/logo.png
images/photo.jpg    -> public/images/photo.jpg
fonts/MyFont.woff2  -> public/fonts/MyFont.woff2
```

Substitua estes arquivos para alterar a identidade padrão:

- `public/images/logo.png` para o logotipo do site;
- `public/favicon.png` para o ícone do navegador;
- `public/images/texture.png` para a textura de fundo repetida.

O CSS global é carregado nesta ordem:

```css
@import 'tailwindcss';
@import '@style/theme.css';
@import '@style/utilities.css';
```

Edite `src/styles/theme.css` para personalizar fontes, cores, bordas, espaçamento,
movimento, texturas e tokens específicos dos componentes. Os componentes
consomem propriedades personalizadas semânticas, como:

```css
:root {
  --background-color: var(--color-neutral-900);
  --background-emphasis-color: var(--color-neutral-800);
  --emphasis-color: var(--color-emerald-500);
  --text-color: var(--color-neutral-200);
  --container-lg: 24;
  --quote-border-size: 3px;
}
```

Prefira alterar os tokens semânticos existentes em vez de espalhar classes de
paleta específicas pelos templates e conteúdos. Tokens numéricos de espaçamento
e layout são multiplicadores de `--spacing` do Tailwind; valores CSS diretos,
como cores, durações e larguras de borda, devem manter unidades adequadas às suas
propriedades.

As fontes Roboto, Roboto Serif, Roboto Mono e Italianno incluídas são definidas
no início de `src/styles/theme.css` e carregadas de `public/fonts/`.

As utilities compartilhadas são definidas em `src/styles/utilities.css`:

| Utility                | Finalidade                                   |
| ---------------------- | -------------------------------------------- |
| `app-duration`         | Duração e curva de transição compartilhadas. |
| `app-focus-ring`       | Contorno visível para foco via teclado.      |
| `app-gap-sm/md/lg`     | Espaçamentos semânticos entre elementos.     |
| `app-padding-sm/md/lg` | Espaçamentos internos semânticos.            |
| `app-container`        | Espaçamento horizontal responsivo da página. |
| `app-block`            | Espaçamento vertical responsivo dos blocos.  |
| `app-texture`          | Textura de fundo repetida.                   |
| `app-code`             | Apresentação de código inline.               |

Autores de conteúdo podem usar essas utilities e classes do Tailwind em
fragmentos HTML. Estilos estáveis dos componentes da aplicação devem permanecer
no bloco de estilos de cada componente.

## Modelo de segurança

Arquivos de conteúdo são tratados como HTML não confiável. Antes de renderizá-los,
o Taberna usa DOMPurify com uma allowlist explícita dos elementos `twc-*` e
atributos aceitos. Scripts, manipuladores de eventos, elementos personalizados
desconhecidos e URLs inseguras são removidos.

Todos os recursos JSON e HTML dinâmicos também passam por validação em tempo de
execução:

- respostas JSON devem usar um tipo de conteúdo JSON e corresponder ao manifest
  esperado;
- respostas de conteúdo devem usar um tipo de conteúdo HTML e ser fragmentos, não
  documentos completos;
- caminhos de conteúdo rejeitam travessia de diretórios e extensões não
  permitidas;
- links aceitam somente os protocolos HTTP e HTTPS;
- requisições de página obsoletas são abortadas e ignoradas durante mudanças de
  rota ou idioma.

`index.html` adiciona uma Política de Segurança de Conteúdo que restringe scripts
e fontes à mesma origem, estilos à mesma origem e aos estilos inline necessários,
e imagens à mesma origem, URLs `data:` e `https://placehold.co`.

Ao adicionar um host externo de imagens, atualize somente a diretiva `img-src` em
`index.html` com a origem exata necessária. Não enfraqueça o sanitizador, a
validação de URLs, a validação de caminhos ou a CSP para carregar conteúdo.

Para registrar outro elemento personalizado de conteúdo, atualize em conjunto:

1. crie o componente Vue e seus testes específicos;
2. registre a tag `twc-*` em `src/web-components.ts`;
3. adicione a tag e os atributos permitidos a `src/utils/html.util.ts`;
4. adicione testes de sanitização e do contrato público do componente;
5. documente o elemento e seus atributos.

## Comportamento e limitações da aplicação

- A aplicação é uma SPA estática executada no cliente. Ela não possui backend,
  banco de dados ou autenticação.
- As rotas usam hashes na URL, portanto a hospedagem estática não precisa de
  regras de reescrita para cada rota.
- O idioma, o título e a descrição do documento acompanham a configuração ativa.
- A renderização ocorre no cliente; SSR, pré-renderização e metadados de SEO por
  rota não estão implementados.
- Open Graph e outros metadados de compartilhamento social não são gerados para
  cada página.
- Mensagens da estrutura da aplicação para carregamento, nova tentativa, estado
  vazio, erro, menu, carrossel e ARIA ainda estão fixas em inglês. O conteúdo
  editorial e a navegação são localizados.
- O repositório não inclui um workflow de implantação nem um cabeçalho CSP
  configurado na hospedagem.

## Comandos

| Comando             | Descrição                                         |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Inicia o servidor de desenvolvimento do Vite.     |
| `npm run build`     | Verifica os tipos e gera `dist/`.                 |
| `npm run preview`   | Serve localmente a versão de produção.            |
| `npm run test`      | Executa uma vez a suíte do Vitest.                |
| `npm run typecheck` | Executa `vue-tsc` sem gerar arquivos.             |
| `npm run lint`      | Analisa os arquivos em `src/` com o linter.       |
| `npm run format`    | Formata arquivos TypeScript, Vue e CSS em `src/`. |

## Build e publicação

Gere o site estático:

```bash
npm run build
```

A saída publicável é gravada em `dist/`. Verifique-a localmente antes da
publicação:

```bash
npm run preview
```

Envie o conteúdo de `dist/` para um serviço de hospedagem estática ou configure
o serviço com:

```text
Comando de build: npm run build
Diretório de saída: dist
```

O Vite usa uma base relativa e as rotas usam hashes, portanto a saída pode ser
hospedada na raiz de um domínio ou em um subdiretório. O GitHub Pages também é
compatível, mas este repositório não inclui um workflow de implantação.

Gere e publique novamente após cada alteração. Não edite `dist/` manualmente,
pois ele é gerado a partir do código-fonte e substituído no próximo build.

### Checklist de publicação

- substitua todos os textos fictícios e imagens de exemplo;
- revise logotipo, favicon, título, descrição, links e rodapé;
- confirme que cada locale habilitado possui configuração e conteúdo completos;
- teste todas as rotas e trocas de idioma em desktop e dispositivos móveis;
- confirme que a origem de cada recurso remoto é permitida pela CSP;
- execute `npm run test`, `npm run typecheck` e `npm run lint`;
- execute `npm run build` e verifique o resultado com `npm run preview`.

## Solução de problemas

### A aplicação falha durante a inicialização

Verifique `public/config/languages.json` e o manifest do locale ativo em busca de
JSON malformado, campos obrigatórios ausentes, locales duplicados ou caminhos
inválidos. Confirme também que o servidor retorna os arquivos JSON com um tipo de
conteúdo JSON.

### Uma página não é encontrada

Confirme que a rota contém `#/` e a extensão `.htm`, e que o arquivo existe no
diretório do idioma ativo com a mesma capitalização. Por exemplo, `#/about.htm`
exige `public/content/{locale}/about.htm`.

### O conteúdo da página inicial ou do rodapé não é carregado

Verifique o caminho `home` ou `footer` em `public/config/{locale}.json`. O arquivo
deve existir no diretório de conteúdo desse locale e ser um fragmento HTML, não
um documento completo.

### Uma imagem não é carregada

Coloque imagens locais em `public/` e referencie-as sem o prefixo `public/`, por
exemplo, `images/photo.jpg`. Para imagens remotas, adicione a origem exata à
diretiva `img-src` da CSP.

### Um link está visível, mas não pode ser aberto

O sanitizador remove destinos malformados ou inseguros. Use uma URL hash no
formato `#/pagina.htm` para navegação interna ou uma URL HTTP(S) absoluta com
`external` em um `twc-link` externo.

### As alterações publicadas não aparecem

Execute `npm run build` novamente e publique o novo conteúdo gerado em `dist/`.
Verifique também se o serviço de hospedagem ou o navegador está servindo uma
versão em cache.

## Licença

Licenciado sob a [Licença Apache 2.0](LICENSE).
