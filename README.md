# Taberna

Taberna is a foundation for static personal websites, portfolios, and landing
pages. It combines a Vue application with HTML content organized by language
and runs entirely in the browser, without a backend.

Built for people who want to work directly with their site's files, Taberna
keeps content separate from application components. You can edit your copy,
customize the visual theme, and adapt the layout to fit your project, then
publish the generated files to a static hosting service.

## Features

- **HTML content:** keep page content and shared elements in separate fragments.
- **Language support:** organize your translations by locale and let visitors
  choose their preferred language.
- **Customizable theme:** adjust shared colors, fonts, spacing, and borders.
- **Template-based layouts:** start with the default template or create your own.
- **Reusable components:** include content loaders, language links, and carousels.
- **Static publishing:** generate files you can host without an application server.

## Technologies

- Vue 3 and TypeScript, with Vue Router and Pinia.
- Tailwind CSS and Lucide icons.
- Vite for local development and production builds.

## Getting started

Have Git, Node.js 24, and npm installed. Clone the repository and install its
dependencies:

```bash
git clone https://github.com/mineot/taberna.git
cd taberna
npm install
```

Start the development server:

```bash
npm run dev
```

Open the address shown in your terminal. To keep your own version, fork the
repository on GitHub and use your fork's URL in the clone command. You can then
customize the content, branding, and appearance in your own repository.

## Build and publishing

Create a production build:

```bash
npm run build
```

The command checks TypeScript and generates the static site in `dist/`. Preview
that build locally with:

```bash
npm run preview
```

Upload the contents of `dist/` to your static hosting service. After making
changes, generate a new build and publish the updated files.

## Contributing

Contributions are welcome, whether you want to report a bug, suggest a feature,
improve the documentation, help with translations, or contribute code.

Visit the [GitHub repository](https://github.com/mineot/taberna) to open an issue
or submit a pull request. When reporting a problem, describe what happened and
include steps to reproduce it.

## Support the project

If Taberna is useful to you, consider supporting its development financially.
Your support helps dedicate more time to improvements, documentation, and new
resources. Financial contributions are optional, and every form of participation
is welcome.

## License

[Apache License 2.0](LICENSE).
