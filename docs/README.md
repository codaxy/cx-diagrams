# CxJS + Tailwind CSS

[![Netlify Status](https://api.netlify.com/api/v1/badges/f800e2ee-d28a-4118-a149-9ba840fb4941/deploy-status)](https://twapp.cxjs.io) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

> This project is undergoing development. Some of the features are missing or incomplete.

This repository provides an application template based on CxJS and TailwindCSS. It offers a working application layout, sample pages, component gallery, Babel and webpack configurations, and others small bits and pieces.

CxJS and Tailwind CSS mix really well together. CxJS brings JavaScript based application elements such as widgets, charts, state management, and routing, while Tailwind CSS offers a rapid way to combine these elements into higher-order visual structures - page elements, headers, toolbars, sections, layouts, etc.

Both products require time to understand and master, but once everything settles, the productivity that this combination brings is great.

## Running the project locally

In order to run the project you'll need Node.js 10 or later. This project uses Yarn for package management, but npm will do too.

To install application dependencies, run:

```bash
yarn install
npm install
```

To start the project, run:

```bash
yarn start
npm start
```

Build the project for deployment:

```bash
yarn build
npm run build
```

To analyze the deployment bundle size, run:

```bash
yarn analyze
npm run analyze
```

## Packages and Libraries

### Heroicons

Icons used in the template come from the [Heroicons](https://heroicons.com/) library which offers beatiful hand-crafted SVG icons. Each icon needs to be registered in the `icons/index.js` before in can be used by CxJS components.

### Mock Data

There is a mock REST API implemented using the `msw` package. The application makes proper network requests using the `fetch` method which are intercepted by the service worker. Check the `data` folder for more details.

This should be removed when you switch to a proper API.

## License

This project is available under the terms of [the MIT license](LICENSE.md).
