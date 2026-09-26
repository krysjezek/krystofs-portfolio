// Run against a production build: npm run build; npm run start -- -p 3001
// node scripts/audit-seo.mjs http://localhost:3001 [output.json]
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.argv[2] || 'http://localhost:3001';
const canonicalOrigin = 'https://www.krystofjezek.com';
const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'));
const paths = Object.keys(manifest.routes).filter(path => !path.startsWith('/_') && !/\.[a-z0-9]+$/i.test(path));
const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ javaScriptEnabled: false });
const page = await context.newPage();
// Audit server-rendered semantics without fetching decorative resources.
await page.route('**/*', route => route.request().resourceType() === 'document' ? route.continue() : route.abort());
const report = { base, date: new Date().toISOString(), pages: [], issues: [], assets: [] };
const issue = (path, message) => report.issues.push({ path, message });
try {
  const sitemapResponse = await context.request.get(`${base}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  report.sitemap = { status: sitemapResponse.status(), paths: sitemapPaths };
  if (sitemapResponse.status() !== 200) issue('/sitemap.xml', `HTTP ${sitemapResponse.status()}`);
  if (new Set(sitemapPaths).size !== sitemapPaths.length) issue('/sitemap.xml', 'Duplicate entries');
  for (const path of sitemapPaths) if (!paths.includes(path)) issue(path, 'Sitemap route absent from static build');
  const robots = await context.request.get(`${base}/robots.txt`);
  report.robots = { status: robots.status(), body: await robots.text() };
  if (robots.status() !== 200) issue('/robots.txt', `HTTP ${robots.status()}`);
  const assets = new Set();
  const internalLinks = new Set();
  for (const path of paths) {
    const response = await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(() => {
      const meta = name => document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.content || null;
      const schema = [];
      const schemaErrors = [];
      for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
        try { schema.push(JSON.parse(script.textContent)); } catch (error) { schemaErrors.push(error.message); }
      }
      return {
        title: document.title, titleCount: document.querySelectorAll('title').length,
        description: meta('description'), canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: meta('robots'), h1: [...document.querySelectorAll('h1')].map(node => node.textContent),
        mainCount: document.querySelectorAll('main').length,
        ogTitle: meta('og:title'), ogDescription: meta('og:description'), ogImage: meta('og:image'),
        twitterTitle: meta('twitter:title'), schema, schemaErrors,
        missingAlt: [...document.images].filter(img => !img.hasAttribute('alt')).length,
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
      };
    });
    const archived = path.includes('/old-projects/') || path === '/other/cv-print';
    report.pages.push({ path, status: response.status(), ...data });
    if (response.status() !== 200) issue(path, `HTTP ${response.status()}`);
    if (!data.title || data.titleCount !== 1) issue(path, 'Missing or duplicate title');
    if (!data.description) issue(path, 'Missing description');
    if (data.canonical !== `${canonicalOrigin}${path === '/' ? '/' : path}`) issue(path, `Unexpected canonical: ${data.canonical}`);
    if (data.h1.length !== 1) issue(path, `${data.h1.length} H1 headings`);
    if (data.mainCount !== 1) issue(path, `${data.mainCount} main landmarks`);
    if (data.missingAlt) issue(path, `${data.missingAlt} images without alt attributes`);
    if (data.schemaErrors.length) issue(path, 'Invalid JSON-LD');
    if (archived && (!data.robots?.includes('noindex') || !data.robots?.includes('nofollow'))) issue(path, 'Archive indexing policy missing');
    if (!archived && data.robots?.includes('noindex')) issue(path, 'Public page marked noindex');
    if (sitemapPaths.includes(path) === archived) issue(path, 'Sitemap inclusion disagrees with indexing policy');
    if (!archived) {
      for (const href of data.links.filter(href => (href.startsWith('/') && !href.startsWith('//')) || href.startsWith(`${canonicalOrigin}/`))) {
        const target = new URL(href, base).pathname;
        internalLinks.add(target);
        if (target.includes('/old-projects/')) issue(path, `Public archive link: ${target}`);
      }
      if (data.ogImage) assets.add(data.ogImage);
      const inspect = value => {
        if (!value || typeof value !== 'object') return;
        if (value['@type'] === 'VideoObject' && !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value.uploadDate || '')) issue(path, `Invalid video uploadDate: ${value.uploadDate}`);
        for (const [key, item] of Object.entries(value)) {
          if (['thumbnailUrl', 'contentUrl'].includes(key) && typeof item === 'string') assets.add(item);
          if (typeof item === 'object') inspect(item);
        }
      };
      inspect(data.schema);
    }
  }
  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const item of report.pages.filter(item => !item.robots?.includes('noindex'))) {
      if (seen.has(item[field])) issue(item.path, `Duplicate ${field} with ${seen.get(item[field])}`);
      seen.set(item[field], item.path);
    }
  }
  report.links = [];
  for (const path of internalLinks) {
    const response = await context.request.get(`${base}${path}`);
    report.links.push({ path, status: response.status() });
    if (response.status() >= 400) issue(path, `Broken internal link: ${response.status()}`);
  }
  for (const originalUrl of assets) {
    // Check local public assets against this candidate; CDN media against their real URLs.
    const url = originalUrl.startsWith(canonicalOrigin) ? originalUrl.replace(canonicalOrigin, base) : originalUrl;
    try {
      const response = await context.request.head(url, { timeout: 20000 });
      const type = response.headers()['content-type'];
      report.assets.push({ url: originalUrl, checkedUrl: url, status: response.status(), type });
      if (response.status() >= 400 || !/^(image|video)\//.test(type || '')) issue(originalUrl, `Social/schema asset: ${response.status()} ${type}`);
    } catch (error) { issue(originalUrl, error.message); }
  }
  const missing = await context.request.get(`${base}/audit-deliberately-missing-page`);
  report.notFound = { status: missing.status(), noindex: /name="robots" content="[^"]*noindex/.test(await missing.text()) };
  if (report.notFound.status !== 404 || !report.notFound.noindex) issue('/audit-deliberately-missing-page', 'Missing real 404/noindex');
  if (process.argv[3]) await writeFile(process.argv[3], `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ pages: report.pages.length, sitemap: sitemapPaths.length, internalLinks: report.links.length, assets: report.assets.length, notFound: report.notFound, issues: report.issues }, null, 2));
  if (report.issues.length) process.exitCode = 1;
} finally { await browser.close(); }
