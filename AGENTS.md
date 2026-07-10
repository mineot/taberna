# Project: website-template-one

## Stack
- **Framework**: Vue 3.5.39 (Composition API / `<script setup>`)
- **Language**: TypeScript 7.0.2 (strict mode)
- **Build**: Vite 8.1.1
- **CSS**: Tailwind CSS v4.3.2 (plugin oficial `@tailwindcss/vite`)
- **Formatting**: Prettier 3.9.5 (single quotes, semicolons)
- **Linting**: ESLint 10.6.0 (eslint-plugin-vue, eslint-config-prettier)

## Scripts
```bash
npm run dev      # Vite dev server com HMR
npm run build    # vue-tsc --noEmit && vite build (type-check + build)
npm run preview  # Preview do build de produção
```

**Não há scripts de lint/format configurados no package.json** — apesar de ESLint e Prettier estarem instalados.

## Estrutura
```
src/
├── App.vue              # Componente raiz — renderiza Header + conteúdo placeholder
├── main.ts              # Entry point — cria e monta instância Vue
├── style.css            # Estilos globais + tema Tailwind customizado (paleta olive)
├── env.d.ts             # Declaração de tipos para .vue
├── components/
│   ├── header.vue       # Header fixo no topo, estilizado com Tailwind scoped
│   └── footer.vue       # Componente placeholder (NÃO está sendo usado no App.vue)
public/
├── favicon.svg          # Favicon SVG
├── icons.svg            # Sprite SVG com ícones sociais (GitHub, Discord, X, Bluesky, etc.)
```

## Configurações Importantes

### tsconfig.json
- Target: ESNext, Module: ESNext, moduleResolution: "bundler"
- Strict mode: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`

### vite.config.ts
- Plugins: `@vitejs/plugin-vue`, `@tailwindcss/vite`
- Sem aliases customizados

### .prettierrc
- `singleQuote: true`, `semi: true`
- Plugin `prettier-plugin-tailwindcss` para ordenação automática de classes

### src/style.css
- Tema customizado com paleta olive:
  - `--color-background-dark`: olive-800
  - `--color-background-light`: olive-700
  - `--color-foreground-dark`: olive-400
  - `--color-foreground-light`: olive-200
- Utilitários customizados: `app-main` (margem top responsiva), `app-padding` (padding responsivo)

## Bugs Conhecidos
- **CSS typo**: `box-sizing: border-boxs` em `src/style.css` — deveria ser `border-box`

## O que NÃO existe ainda
- Roteamento (Vue Router)
- Gerenciamento de estado (Pinia/Vuex)
- Testes (Vitest/Jest/Cypress/Playwright)
- CI/CD (GitHub Actions, etc.)
- Docker
- Scripts de lint/format no package.json

## Convenções
- Composition API com `<script setup>`
- TypeScript strict
- Tailwind CSS via `@import 'tailwindcss'` (v4 syntax)
- Componentes em lowercase: `header.vue`, `footer.vue`
- Scoped styles com `@reference 'tailwindcss'` para acesso aos tokens do tema
