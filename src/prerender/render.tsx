/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Build-time renderer for NSBNPS. This is a single-page site (anchor sections, no
// react-router), so there is exactly one route to render: '/'. renderToString runs no
// effects, so client-only code (WebGL, window.addEventListener, etc.) never fires here —
// see the import.meta.env.SSR guard in ThreeScene.tsx for the one place that mattered.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { LanguageProvider } from '../context/LanguageContext';
import { SCHOOL_INFO } from '../constants';

const SITE_URL = 'https://nsbnps.vercel.app';

export function renderApp(): string {
  return renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

/** Unique, descriptive head tags for the (single) page. Built directly rather than via
 * react-helmet-async, since there is only one route and its metadata is static and known
 * at build time — no per-route manifest needed. */
export function renderHead(): string {
  const title = `${SCHOOL_INFO.shortName} | Bilingual Nursery & Primary School in Limbe, Cameroon`;
  const description =
    'New Standard Bilingual Nursery and Primary School (NSBNPS) Mokindi in Isokolo Village, Limbe, Cameroon. Quality bilingual (English/French) education from Nursery to Class 6, rooted in discipline and Cameroonian values. Admissions open for 2026/2027.';
  const ogImage = `${SITE_URL}/graduate_optimized.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: SCHOOL_INFO.name,
    alternateName: SCHOOL_INFO.shortName,
    description: SCHOOL_INFO.mission_en,
    url: SITE_URL,
    telephone: SCHOOL_INFO.contact.phone[0],
    email: SCHOOL_INFO.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Isokolo Mokindi Village',
      addressLocality: 'Limbe',
      addressCountry: 'CM',
    },
    founder: {
      '@type': 'Person',
      name: SCHOOL_INFO.proprietress,
    },
  };

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${SITE_URL}/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  `.trim();
}

// Strip the shell's default head tags before injecting the real ones, so the final
// HTML never has a duplicated <title>/description/OG/JSON-LD.
const DEFAULT_HEAD_PATTERNS: RegExp[] = [
  /<title>[^<]*<\/title>/i,
  /<meta\s+name="description"[^>]*>/i,
];

/** Pure function: inject rendered head/body into the built index.html template. */
export function injectIntoTemplate(template: string, headHtml: string, bodyHtml: string): string {
  let html = template;
  for (const re of DEFAULT_HEAD_PATTERNS) html = html.replace(re, '');
  html = html.replace('</head>', `${headHtml}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}
