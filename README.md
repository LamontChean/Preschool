# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Building and deploying (GitHub Pages)

This project is configured to deploy the `dist/` folder to GitHub Pages using the `gh-pages` package. The `homepage` field and `base` in `vite.config.js` are already set for the `Preschool` repo.

1. Install dependencies:

```bash
npm install
```

2. Build and generate sitemap (postbuild runs automatically):

```bash
npm run build
```

Check `dist/sitemap.xml` exists after the build.

3. Publish to GitHub Pages (runs `npm run build` first):

```bash
npm run deploy
```

4. Verify live files:

```bash
# list dist files
ls -la dist
# check sitemap
curl -I https://LamontChean.github.io/Preschool/sitemap.xml
```

If `npm` is not available on your machine, install Node.js (which provides npm) from https://nodejs.org/.
