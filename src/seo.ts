import type { i18n } from 'i18next';

import { SITE_URL, defaultLanguage, languages, type Language } from './i18n';

const SITE_NAME = 'Flávia Forcatho English Solutions';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const pageUrl = (lang: Language) => SITE_URL + lang.path;

const structuredData = (lang: Language, i18n: i18n) => {
  const t = i18n.getFixedT(lang.code);
  const url = pageUrl(lang);
  const person = `${SITE_URL}/#flavia`;
  const website = `${SITE_URL}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': website,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: languages.map((l) => l.hreflang),
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: t('seo.title'),
        description: t('seo.description'),
        inLanguage: lang.hreflang,
        isPartOf: { '@id': website },
        about: { '@id': person },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'Flávia Forcatho',
        jobTitle: t('seo.job_title'),
        url,
        image: `${SITE_URL}/assets/images/hero2.webp`,
        email: 'mailto:flaviasenglish@gmail.com',
        telephone: '+34642269686',
        knowsLanguage: ['en', 'pt'],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universidade Federal de Minas Gerais',
          url: 'https://ufmg.br',
        },
      },
      {
        '@type': 'Service',
        '@id': `${url}#classes`,
        name: t('services.classes.title'),
        description: t('services.classes.desc'),
        serviceType: t('seo.service_type'),
        provider: { '@id': person },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
        },
      },
    ],
  };
};

// Tags for the <head> of a language's page. Built at prerender time.
export const renderHead = (lang: Language, i18n: i18n) => {
  const t = i18n.getFixedT(lang.code);
  const title = escapeHtml(t('seo.title'));
  const description = escapeHtml(t('seo.description'));
  const url = pageUrl(lang);
  const image = `${SITE_URL}/logo_tt.png`;
  // Keeps "</script>" in the data from closing the tag early
  const jsonLd = JSON.stringify(structuredData(lang, i18n)).replace(
    /</g,
    '\\u003c',
  );

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...languages.map(
      (l) =>
        `<link rel="alternate" hreflang="${l.hreflang}" href="${pageUrl(l)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(defaultLanguage)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:locale" content="${lang.ogLocale}" />`,
    ...languages
      .filter((l) => l !== lang)
      .map(
        (l) =>
          `<meta property="og:locale:alternate" content="${l.ogLocale}" />`,
      ),
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
};
