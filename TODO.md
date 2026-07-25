# TODO

## Adicionar cores semânticas ao crédito do rodapé

Aplicar posteriormente no branch `master`.

- [ ] Em `src/style.css`, adicionar os três tokens abaixo ao `:root`, junto de
      `--footer-background`:

  ```css
  --footer-statics: var(--text-muted);
  --footer-powered: var(--emphasis);
  --footer-powered-hover: var(--emphasis-hover);
  ```

- [ ] Em `src/style.css`, substituir a implementação de `app-powered` e criar
      `app-statics` logo depois dela:

  ```css
  @utility app-powered {
    color: var(--footer-powered);

    &:hover {
      @media (hover: hover) {
        color: var(--footer-powered-hover);
      }
    }
  }

  @utility app-statics {
    color: var(--footer-statics);
  }
  ```

  `app-powered` não deve mais aplicar `app-text-emphasis` nem
  `hover:app-text-emphasis-hover`.

- [ ] Em `src/App.vue`, aplicar `app-statics` ao texto de propriedade e ao
      parágrafo que contém “Powered by”:

  ```vue
  <p class="app-statics">{{ config?.footer.ownership }}</p>
  <p class="app-statics">
    Powered by
    <a
      href="https://github.com/mineot/taberna"
      target="_blank"
      rel="noopener"
      class="app-powered app-duration transition-colors"
      >Mineot</a
    >
  </p>
  ```

  O link “Mineot” deve continuar usando `app-powered`; somente o texto estático
  herda a cor definida por `app-statics`.

- [ ] Atualizar `AGENTS.md`:
  - adicionar `--footer-statics`, `--footer-powered` e
    `--footer-powered-hover` à tabela de tokens semânticos;
  - documentar que `app-powered` usa os tokens próprios do rodapé;
  - documentar que `app-statics` usa `--footer-statics`;
  - registrar que `footer.ownership` e o prefixo “Powered by” usam
    `app-statics`.

- [ ] Executar as validações:

  ```bash
  npx prettier --check src/App.vue src/style.css AGENTS.md
  npm run build
  ```

## Custmização dos botões do carrousel

Criar novas variaveis logo apos --ring
--btn: var(--color-rosa-700);
--btn-hover: var(--color-rosa-900);

e modificar a utility:

@utility app-section-carousel-btn {
  @apply hover:app-text-emphasis;
  color: var(--btn);
  &:hover {
    @media (hover: hover) {
      color: var(--btn-hover);
    }
  }
}

## Reagrupar as variaveis de ":root"

:root {
  --backdrop-opacity: 80%;
  --backdrop: var(--color-neutral-900);
  --border: var(--color-agua-800);
  --duration-carousel: 500ms;
  --duration: 300ms;
  --error: var(--color-emerald-400);
  --skeleton: var(--color-neutral-700);

  --dot: var(--color-rosa-400);
  --dot-active: var(--color-rosa-700);
  --dot-inactive: var(--color-rosa-200);
  --progress: var(--color-rose-300);
  --progress-track: var(--color-rose-700);
  --ring: var(--color-yellow-400);
  --btn: var(--color-rosa-700);
  --btn-hover: var(--color-rosa-900);

  --background: var(--color-white);
  --background-hover: var(--color-zinc-100);
  --background-emphasis: var(--color-zinc-50);

  --text: var(--color-rose-400);
  --text-body: var(--color-zinc-500);
  --text-muted: var(--color-agua-500);

  --emphasis: var(--color-white);
  --emphasis-hover: var(--color-rosa-400);

  --header-link: var(--color-white);
  --header-link-hover: var(--color-rosa-400);
  --header-background: var(--color-agua-500);
  --header-background-opacity: 90%;

  --sidebar-link: var(--color-neutral-500);
  --sidebar-link-hover: var(--color-emerald-600);
  --sidebar-background: var(--color-neutral-800);
  --sidebar-background-hover: var(--color-neutral-700);

  --footer-background: var(--color-agua-500);
  --footer-statics: var(--color-slate-300);
  --footer-powered: var(--emphasis);
  --footer-powered-hover: var(--emphasis-hover);
}
