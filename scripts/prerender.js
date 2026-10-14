// Turns the client build in dist/ into one static page per language,
// using the server build in dist-server/, and writes the sitemap.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const serverDir = resolve(root, 'dist-server');

const { render, languages, SITE_URL } = await import(
  resolve(serverDir, 'entry-server.js')
);

const template = await readFile(resolve(dist, 'index.html'), 'utf8');
for (const marker of [
  '<html lang="pt-BR">',
  '<!--app-head-->',
  '<!--app-html-->',
]) {
  if (!template.includes(marker)) {
    throw new Error(`index.html is missing ${marker}`);
  }
}

for (const lang of languages) {
  const { html, head } = render(lang);
  const page = template
    .replace('<html lang="pt-BR">', `<html lang="${lang.hreflang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);

  const file = resolve(dist, `.${lang.path}`, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`prerendered ${lang.path}`);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = languages
  .map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE_URL}${l.path}" />`,
  )
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languages
  .map(
    (l) => `  <url>
    <loc>${SITE_URL}${l.path}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');

await rm(serverDir, { recursive: true, force: true });
