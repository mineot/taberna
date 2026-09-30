# Taberna

Taberna is a foundation for static personal websites, portfolios, and landing
pages. It combines a Vue application with HTML content organized by language
and runs entirely in the browser, without a backend.

## Technologies

- Vue 3 and TypeScript for the application and custom elements.
- Vue Router for navigation and Pinia for state management.
- Tailwind CSS for styling and Lucide for icons.
- Vite for development and production builds.
- ESLint and Prettier for code quality; Vitest and jsdom for test tooling.

## Installation

Use Node.js 24 and npm.

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
```

## Build

```bash
npm run build
```

The command checks TypeScript and generates the static site in `dist/`.

## License

[Apache License 2.0](LICENSE).
