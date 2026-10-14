# Flávia Forcatho English Solutions Webpage

Site estático feito com Vite, React, Tailwind CSS e i18next.

```sh
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera o site em dist/
```

Cada push no branch `new_site` faz o deploy automático (GitHub Actions publica `dist/` no branch `master`).

## Idiomas e SEO

Cada idioma tem a sua própria página, gerada como HTML estático no build (`scripts/prerender.js`):

| Idioma         | URL    |
| -------------- | ------ |
| Português (BR) | `/`    |
| Português (PT) | `/pt/` |
| Español        | `/es/` |

Quem chega em `/` é levado ao idioma do navegador (ou ao que escolheu antes no seletor).
Title, description, canonical, hreflang, Open Graph e dados estruturados (JSON-LD) ficam em `src/seo.ts`; os textos de SEO ficam na chave `seo` de cada arquivo em `src/locales/`. O build também gera o `sitemap.xml`.

Preços ficam em `src/data/prices.json`.
