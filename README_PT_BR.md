# Taberna

[![Licença](https://img.shields.io/badge/Licen%C3%A7a-Apache%202.0-blue.svg)](LICENSE) [![🇺🇸 English](https://img.shields.io/badge/Language-%F0%9F%87%BA%F0%9F%87%B8%20English-e5e7eb.svg)](README.md)

O Taberna é uma base personalizável para sites pessoais, portfólios, landing pages e pequenos sites institucionais. Textos, páginas, menu, imagens, idiomas e rodapé são configurados principalmente por arquivos JSON e Markdown.

O projeto inclui layout responsivo, detecção de idioma, páginas independentes, seções configuráveis na página inicial e carrossel opcional. O conteúdo e as imagens incluídos são exemplos fictícios e devem ser substituídos antes da publicação.

## O que ele oferece

- página inicial responsiva formada por seções configuráveis;
- páginas independentes em Markdown e links internos ou externos no menu;
- detecção automática e seleção de idioma;
- textos, imagens, seções destacadas, rodapé personalizado e carrossel opcional;
- versão estática que funciona na raiz de um domínio ou em um subdiretório.

## Requisitos

- [Node.js](https://nodejs.org/) 20.19 ou mais recente, ou 22.12 ou mais recente;
- npm, instalado junto com o Node.js;
- um editor de código, como o Visual Studio Code.

## Instale e execute

Baixe o repositório como arquivo ZIP e extraia-o ou clone-o com Git:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
```

Abra um terminal no diretório do projeto e execute:

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`. Mantenha o comando em execução enquanto edita o site e pressione `Ctrl+C` para encerrá-lo.

## Personalize

Os principais arquivos de personalização são:

| O que alterar                            | Local                                    |
| ---------------------------------------- | ---------------------------------------- |
| Nome, descrição, menu, seções e rodapé   | `public/config/{idioma}.json`            |
| Conteúdo inicial e páginas independentes | `public/content/{idioma}/`               |
| Idiomas disponíveis                      | `public/languages.json`                  |
| Logotipo e ícone do navegador            | `public/logo.png` e `public/favicon.png` |
| Outras imagens                           | Qualquer diretório dentro de `public/`   |
| Cores e fontes                           | `src/style.css` e `public/fonts/`        |

Cada idioma habilitado possui configuração e conteúdo completos. Repita as alterações de conteúdo em todos os idiomas que permanecerem disponíveis.

### Nome, descrição e logotipo

Edite o objeto `site` em `public/config/{idioma}.json`:

```json
"site": {
  "title": "Meu site",
  "description": "Uma breve descrição do meu site",
  "image": "logo.png"
}
```

Substitua `public/logo.png` e `public/favicon.png` para alterar a identidade visual padrão.

### Seções da página inicial

Cada item de `sections` cria um bloco na página inicial. Uma seção simples pode conter texto e imagem:

```json
{
  "id": "about",
  "title": "Sobre",
  "subtitle": "Conheça melhor o meu trabalho",
  "content": ["Primeiro parágrafo.", "Segundo parágrafo."],
  "image": "images/about.jpg",
  "invert": false,
  "emphasis": true
}
```

Para escrever o conteúdo em Markdown, use `contentFiles` no lugar de `content`:

```json
{
  "id": "intro",
  "title": "Boas-vindas",
  "contentFiles": ["intro.md"],
  "image": "images/intro.jpg"
}
```

O exemplo carrega `public/content/{idioma}/intro.md`. Dois ou mais arquivos são exibidos lado a lado. Adicione um objeto `carousel` para exibi-los como slides:

```json
{
  "id": "services",
  "title": "Serviços",
  "contentFiles": ["services/first.md", "services/second.md"],
  "carousel": {
    "autoPlay": true,
    "interval": 5000,
    "buttons": true,
    "dots": true,
    "itemsPerView": 1
  }
}
```

Não use `content` e `contentFiles` na mesma seção.

### Imagens das seções

As opções abaixo se aplicam à `image` de uma seção da página inicial. Elas não afetam o logotipo configurado em `site.image`:

```json
{
  "image": "images/about.jpg",
  "imageDimensions": {
    "width": 600,
    "height": 400
  },
  "imageAlign": "center",
  "imagePosition": "top",
  "imageRounded": true
}
```

| Opção             | Valores aceitos                                     | Padrão                                         | Comportamento                                                                       |
| ----------------- | --------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| `image`           | Caminho da imagem ou URL permitida                  | —                                              | Define a imagem exibida ao lado do conteúdo da seção                                |
| `imageDimensions` | `width` e `height` opcionais como números ou textos | Largura total do contêiner e altura automática | Define as dimensões no desktop de forma independente                                |
| `imageAlign`      | `"start"`, `"center"`, `"end"`                      | `"center"`                                     | Alinha horizontalmente uma imagem menor que seu contêiner                           |
| `imagePosition`   | `"top"`, `"center"`, `"bottom"`                     | `"top"`                                        | Controla a posição vertical do objeto e serve como fallback de alinhamento da seção |
| `imageRounded`    | `true`, `false`                                     | `true`                                         | Usa `rounded-lg` quando ativado e `rounded-none` quando desativado                  |

O contêiner da imagem ocupa toda a largura da seção no mobile e metade dela a partir do breakpoint `md`. No mobile, a imagem é sempre forçada a ocupar toda a largura do contêiner com altura automática. A partir de `md`, cada valor de `imageDimensions` é aplicado de forma independente: se `width` for omitido ou estiver vazio, a imagem mantém toda a largura do contêiner; se `height` for omitido ou estiver vazio, a altura permanece automática. Um objeto `imageDimensions` vazio não produz efeito. `imageAlign` posiciona a imagem quando a largura configurada é menor que o contêiner, e `object-cover` pode recortar a origem quando uma altura configurada altera as proporções da caixa da imagem.

Cada dimensão aceita um número ou texto:

- `40` ou `"40"` torna-se `40px`;
- `"40px"` usa pixels explicitamente;
- `"4rem"` usa unidades relativas ao elemento raiz;
- `"100%"` usa uma porcentagem do contêiner.

Por exemplo, esta configuração altera somente a largura no desktop e mantém a altura automática:

```json
"imageDimensions": {
  "width": "40rem"
}
```

`imagePosition` usa `top` por padrão e controla `object-position` quando `object-cover` recorta a origem. Essa opção também fornece o alinhamento vertical da seção quando `contentPosition` é omitido; um `contentPosition` explícito tem precedência.

Uma imagem de seção é renderizada somente quando a seção usa `content` ou exatamente um item em `contentFiles`. Seções com dois ou mais arquivos de conteúdo ignoram `image`, pois utilizam o layout de múltiplos itens ou de carrossel.

Caminhos de imagens locais devem apontar para arquivos dentro de `public/`, sem incluir `public/` nem começar com `/`, por exemplo, `images/about.jpg`. Imagens remotas exigem que sua origem seja permitida pela diretiva `img-src` da Política de Segurança de Conteúdo em `index.html`; a política padrão permite `https://placehold.co`.

### Conteúdo e páginas

Arquivos Markdown usam texto comum com formatação simples:

```md
# Título da página

Um parágrafo com **texto em negrito**.

- Primeiro item
- Segundo item

[Link externo](https://example.com)
```

Configure os itens do menu em `public/config/{idioma}.json`:

```json
"menu": [
  { "label": "Início", "href": "#intro" },
  { "label": "Sobre", "route": "/about" },
  { "label": "GitHub", "href": "https://github.com/" }
]
```

A rota `/about` carrega `public/content/{idioma}/about.md`. Para usar outro arquivo, adicione `"content": "pages/my-page.md"` ao item do menu.

Links para páginas internas escritos dentro de arquivos Markdown devem incluir `./#/`:

```md
[Sobre](./#/about)
[Primeiro artigo](./#/articles/article-1)
```

Não inclua `.md` no link usado pelo navegador.

### Rodapé

O rodapé básico é configurado com:

```json
"footer": {
  "ownership": "© 2026 Seu nome"
}
```

Para usar o rodapé personalizado incluído, mantenha `"contentFile": "footer.md"` e edite `public/content/{idioma}/footer.md`. Preserve sua estrutura HTML e substitua apenas logotipo, textos e links, exceto se também pretender alterar seus estilos.

### Idiomas

Os idiomas disponíveis estão em `public/languages.json`:

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

Para manter somente um idioma, deixe apenas esse idioma em `available` e `flags`. Para adicionar um idioma, copie uma configuração de `public/config/`, copie seu diretório em `public/content/`, traduza ambos e adicione o novo código e sua bandeira ao manifesto.

Mantenha rotas, identificadores de seção, nomes de diretórios e nomes de arquivos iguais em todos os idiomas. Traduza somente os textos visíveis.

### Cores e fontes

As cores principais são variáveis do bloco `:root` em `src/style.css`:

```css
:root {
  --background: #1f2937;
  --footer-background: #030712;
  --text: #f9fafb;
  --emphasis: #f97316;
  --emphasis-hover: #fdba74;
}
```

Os arquivos de fonte estão em `public/fonts/` e suas definições ficam no início de `src/style.css`.

### Lembretes sobre JSON

- Use aspas duplas em nomes de propriedades e textos.
- Separe os itens com vírgulas, mas não adicione vírgula depois do último item.
- Não adicione comentários aos arquivos JSON.
- Nomes de arquivos e caminhos diferenciam letras maiúsculas e minúsculas na maioria das hospedagens.

## Publique

Gere a versão de produção:

```bash
npm run build
```

O site pronto para publicação será criado em `dist/`. Confira-o localmente antes de publicar:

```bash
npm run preview
```

Você pode publicar de uma destas formas:

- envie o conteúdo de `dist/` para um serviço de hospedagem de sites estáticos;
- conecte o repositório ao Netlify, Vercel ou outro serviço usando `npm run build` como comando de compilação e `dist` como diretório de saída.

Use Node.js 22 no serviço de hospedagem quando for necessário escolher uma versão. O GitHub Pages também funciona, mas exige um fluxo de implantação porque este repositório não inclui um.

Execute `npm run build` e publique o novo `dist/` depois de cada alteração. Não edite `dist/` diretamente, pois ele será substituído na próxima compilação.

### Antes de publicar

- substitua os textos fictícios e as imagens do `placehold.co`;
- revise logotipo, favicon, nome do site, descrição, links e rodapé;
- confira todos os idiomas habilitados;
- teste o site em computador e celular;
- execute `npm run build` e `npm run preview`.

## Problemas comuns

- **A página está vazia:** confira se faltam aspas, vírgulas ou fechamentos no JSON editado.
- **Um conteúdo não aparece:** confira o caminho do arquivo e o idioma selecionado e recarregue o navegador.
- **Uma imagem não carrega:** coloque-a dentro de `public/` e use um caminho como `images/photo.jpg`.
- **Uma página mostra `Page not found`:** confira se seu arquivo Markdown corresponde à rota ou ao valor de `content` configurado.
- **As alterações não aparecem no site publicado:** gere o projeto novamente e publique o novo conteúdo de `dist/`.

## Licença

Licenciado sob a [Licença Apache 2.0](LICENSE).
