import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.INTERACTION_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
// Exercise the real SDK's event calls without submitting test traffic.
await context.route(/vercel-scripts\.com|\/_vercel\/insights\/|\/[a-f0-9]+\/(script\.js|view|event|session)(\?|$)/, route => route.abort());
await context.addInitScript(() => {
  window.analyticsEvents = [];
  window.va = (type, event) => { if (type === 'event') window.analyticsEvents.push(event); };
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const events = name => page.evaluate(name => window.analyticsEvents.filter(event => event.name === name), name);
const latest = async name => (await events(name)).at(-1)?.data;
async function clickLink(selector, options) {
  const link = page.locator(selector).first();
  await link.evaluate(n => n.addEventListener('click', event => event.preventDefault(), { once: true }));
  await link.click(options);
}
try {
  await page.route('**/api/weather', route => route.fulfill({ json: { temperature: 18, symbol: 'clearsky_day', condition: 'Sunny' } }));
  await page.route('**/api/aircraft', route => route.fulfill({ json: { ok: true, observedAt: Date.now(), aircraft: [] } }));
  await page.route('**/api/airport-weather', route => route.fulfill({ status: 503, json: { ok: false } }));
  await page.goto(`${base}/?utm_source=chatgpt`);
  await page.waitForFunction(() => window.analyticsEvents.some(e => e.name === 'ai_referral'));
  assert.deepEqual(await latest('ai_referral'), { source: 'chatgpt', landing_path: '/' });
  assert.equal((await events('ai_referral')).length, 1, 'Strict Mode does not duplicate referrals');

  await clickLink('.contact-copy a[href^="mailto:"]');
  assert.deepEqual(await latest('contact_click'), { method: 'email', placement: 'introduction' });
  await clickLink('.site-footer a[href^="mailto:"]');
  assert.deepEqual(await latest('contact_click'), { method: 'email', placement: 'footer' });

  const external = '.mockups-copy a';
  await page.locator(external).evaluate(n => n.href += '?private=test#fragment');
  await clickLink(external);
  assert.deepEqual(await latest('outbound_click'), { destination: 'https://www.motionmockups.com/', placement: 'introduction' });
  await page.getByRole('tab', { name: 'Fun', exact: true }).click();
  assert.deepEqual(await latest('section_nav'), { section: 'fun', placement: 'navigation' });
  await page.getByRole('tab', { name: 'Fun', exact: true }).click();
  assert.equal((await events('section_nav')).length, 1, 'Active tab clicks do not count as navigation');
  await page.getByRole('tab', { name: 'About', exact: true }).focus();
  await page.keyboard.press('Enter');
  assert.equal((await latest('section_nav')).section, 'about');
  const recognition = page.getByRole('button', { name: 'Mentions and credits', exact: true });
  await recognition.click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  assert.equal((await events('recognition_open')).length, 1);
  const weather = page.locator('.prague-temperature');
  await weather.click();
  await page.waitForFunction(() => document.querySelector('.prague-temperature').getAttribute('aria-expanded') === 'true');
  await weather.click();
  assert.equal((await events('weather_open')).length, 1, 'Closing weather is not another open');
  await page.locator('.prague-airspace-trigger').click();
  assert.equal((await events('airspace_open')).length, 1);
  await page.keyboard.press('Escape');

  await page.getByRole('tab', { name: 'Work', exact: true }).click();
  await clickLink('#panel-work .project-card[href^="/work/"]');
  assert.equal((await latest('work_open')).placement, 'work');
  assert.match((await latest('work_open')).path, /^\/work\//);
  await page.locator('#panel-work article.project-card[data-informational]').first().click();
  assert.equal((await latest('coming_soon_click')).section, 'work');

  // All event properties fit standard Pro; no recipient address or query data.
  const recorded = await page.evaluate(() => window.analyticsEvents);
  for (const event of recorded) {
    assert(Object.keys(event.data || {}).length <= 2, event.name);
    for (const value of Object.values(event.data || {})) assert(typeof value === 'string' && value.length <= 255);
  }
  assert(!JSON.stringify(recorded).includes('krystof@'));
  assert(!JSON.stringify(recorded).includes('private=test'));
  await page.reload();
  await page.waitForTimeout(300);
  assert.equal((await events('ai_referral')).length, 0, 'Reload does not duplicate an AI referral in the same session');
  await page.goto(`${base}/other/cv`);
  await clickLink('.print-link');
  assert.deepEqual(await latest('cv_open'), { path: '/other/cv-print', placement: 'content' });
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  assert.deepEqual(await latest('cv_print'), { path: '/other/cv' });
  await page.goto(base);
  await page.locator('#panel-work .project-card[href^="/work/"]').first().click();
  await page.waitForURL('**/work/**');
  await page.locator('.site-name').click();
  await page.waitForURL(base + '/');
  await page.getByRole('tab', { name: 'About', exact: true }).click();
  assert.equal((await events('section_nav')).length, 1, 'Only one listener after client-side route navigation');
  assert.deepEqual(errors, []);
  console.log('PASS: analytics contacts, outbound privacy, project opens, tabs/keyboard, detail controls, coming soon, CV, referral deduplication, listener cleanup and Pro property limits.');
} finally { await browser.close(); }
