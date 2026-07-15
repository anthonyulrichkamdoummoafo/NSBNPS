#!/usr/bin/env node
// scripts/prerender.mjs — run AFTER `vite build` (dist/index.html is the template).
// Bakes real content + unique SEO meta tags into dist/index.html so crawlers (Google's
// first pass, and non-JS bots like WhatsApp/LinkedIn/Slack link previews) see the actual
// page instead of an empty <div id="root"></div> shell.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

async function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('✖ dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  // Middleware-mode server only to transform + SSR-load our TSX module (resolves the
  // '@' style imports, CSS side-effect imports, and import.meta.env correctly).
  // hmr:false + watch:null kill the file watcher so no handle keeps Node alive after.
  const vite = await createServer({
    mode: 'production',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  try {
    const { renderApp, renderHead, injectIntoTemplate } = await vite.ssrLoadModule(
      '/src/prerender/render.tsx'
    );

    const bodyHtml = renderApp();
    const headHtml = renderHead();
    const finalHtml = injectIntoTemplate(template, headHtml, bodyHtml);

    fs.writeFileSync(TEMPLATE_PATH, finalHtml, 'utf8');
    console.log('✔ prerendered / (index.html) with real content + SEO tags');
  } catch (err) {
    // Never fail the whole deploy over prerendering: the SPA still works client-side,
    // it just serves an empty shell to crawlers until this is fixed.
    console.warn(`⚠ prerender skipped: ${err.message}`);
  } finally {
    await vite.close();
  }
}

main()
  .then(() => process.exit(0)) // force clean exit; esbuild/worker handles can otherwise hang the build
  .catch((err) => {
    console.error('✖ prerender failed:', err);
    process.exit(1);
  });
