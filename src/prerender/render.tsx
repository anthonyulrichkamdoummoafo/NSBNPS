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
  const ogImage = `${SITE_URL}/graduate.jpg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'School',
        '@id': `${SITE_URL}/#school`,
        name: SCHOOL_INFO.name,
        alternateName: SCHOOL_INFO.shortName,
        description: SCHOOL_INFO.mission_en,
        url: SITE_URL,
        telephone: SCHOOL_INFO.contact.phone[0],
        email: SCHOOL_INFO.contact.email,
        image: ogImage,
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
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SCHOOL_INFO.shortName,
        url: SITE_URL,
        description,
        inLanguage: ['en', 'fr'],
        publisher: { '@id': `${SITE_URL}/#school` },
        // No SearchAction: the site has no working search functionality.
      },
      {
        // Mirrors the EN copy in src/components/Sections/FAQ.tsx -- keep in sync if
        // that content changes. Per Google's guidance, only mark up FAQ content that
        // is genuinely visible on the page (it is, in the #faq accordion section).
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What age groups do you accept?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We welcome children from Nursery 1 (around age 2.5) through to Class 6, covering the full nursery and primary journey.',
            },
          },
          {
            '@type': 'Question',
            name: 'What language(s) is teaching done in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NSBNPS Mokindi is fully bilingual: lessons are taught in both English and French, so every child graduates confident in both languages.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I apply for admission?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Fill out the Admissions form on the site with your child's details, or call the admin team directly for guidance through the process.",
            },
          },
          {
            '@type': 'Question',
            name: 'What documents will I need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Requirements can vary by grade level. Contact the admissions office for the exact document checklist for your child\u2019s intended class.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the current school fees?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Fees depend on the grade level and are updated each academic year. Contact the school directly by phone or email for the current fee schedule.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you offer transport or a meal program?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Contact the school directly to ask about transport and canteen arrangements for the current term, as these can vary.',
            },
          },
        ],
      },
    ],
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
  /<link\s+rel="canonical"[^>]*>/i,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
];

/** Pure function: inject rendered head/body into the built index.html template. */
export function injectIntoTemplate(template: string, headHtml: string, bodyHtml: string): string {
  let html = template;
  for (const re of DEFAULT_HEAD_PATTERNS) html = html.replace(re, '');
  html = html.replace('</head>', `${headHtml}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return html;
}
