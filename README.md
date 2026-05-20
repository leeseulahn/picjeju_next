# Picjeju Next.js

This project is now a Next.js app. The legacy `index.html` and `pages/*.html` export files were removed, and static assets live under `public/assets`.

```bash
npm install
npm run dev
npm run build
npm start
```

Cafe24 static deployment package:

```bash
npm run build:cafe24
```

Upload the contents of `cafe24-deploy/` to the Cafe24 `/picjeju_next/` directory. The generated package includes static HTML files and `public` assets, with paths rewritten for `https://plandertest2.mycafe24.com/picjeju_next/`.

Routes supported by the converted app:

- `/`
- `/index.html`
- `/pages/{page}.html`
- `/{page}`

The converted page content is stored in `src/generated/page-content.js` and rendered by the App Router catch-all page.
