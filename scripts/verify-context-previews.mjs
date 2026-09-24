import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { currentForecast, describeWeather } from "../lib/weather.js";

const now = Date.parse("2026-09-24T12:00:00Z");
const fixture = (symbol = "partlycloudy_day") => ({ properties: {
  meta: { units: { air_temperature: "celsius" } },
  timeseries: [{ time: new Date(now).toISOString(), data: { instant: { details: { air_temperature: 18.3 } }, next_1_hours: { summary: { symbol_code: symbol } } } }],
} });
assert.equal(describeWeather("clearsky_night"), "Clear sky");
assert.equal(describeWeather("clearsky_day"), "Sunny");
assert.equal(describeWeather("lightssnowshowersandthunder_day"), "Light snow showers and thunder");
assert.equal(describeWeather("unknown"), null);
assert.deepEqual(currentForecast(fixture(), now), { temperature: 18, time: new Date(now).toISOString(), condition: "Partly cloudy" });
assert.throws(() => currentForecast(fixture(), now + 2 * 60 * 60 * 1000), /No current forecast/);
const partial = fixture(); delete partial.properties.timeseries[0].data.next_1_hours;
assert.equal(currentForecast(partial, now).condition, null);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const base = process.env.INTERACTION_BASE_URL || "http://localhost:3000";
const output = join(tmpdir(), "portfolio-context-previews");
await mkdir(output, { recursive: true });
const hint = page.locator(".cursor-hint");
const pause = () => page.waitForTimeout(300);
async function hover(target) {
  await target.hover(); await pause();
  const rect = await target.boundingBox();
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await pause();
  assert.notEqual(await hint.getAttribute("data-visible"), null);
}
try {
  await page.route("**/api/weather", route => route.fulfill({ json: currentForecast(fixture(), now) }));
  await page.goto(base);
  await page.waitForTimeout(800);
  await hover(page.locator('.mockups-copy a'));
  assert.equal(await hint.locator('.cursor-hint-label').textContent(), "motionmockups.com");
  assert((await hint.boundingBox()).width < 200, "Short previews hug their content");
  assert.deepEqual(await hint.locator('.identity-tile').evaluate(n => {
    const rect = n.getBoundingClientRect();
    return [rect.width, rect.height, getComputedStyle(n).borderRadius];
  }), [15, 15, '3px']);
  await hover(page.locator('.contact-copy a[href^="mailto:"]'));
  assert.equal(await hint.locator('.cursor-hint-label').textContent(), "krystof@jezek.me");
  assert.equal(await hint.getAttribute("data-icon"), "email");
  const weather = page.locator('.prague-temperature');
  await hover(weather);
  assert.match(await hint.textContent(), /Prague Live weather.*18°C • Partly Cloudy.*Source: MET Norway/s);
  assert.doesNotMatch(await hint.textContent(), /forecast|Prague time|14:00/);
  await page.screenshot({ path: join(output, "weather-desktop.png") });
  const textStyle = node => {
    const css = getComputedStyle(node);
    return [css.fontFamily, css.fontWeight, css.fontSize, css.lineHeight, css.letterSpacing, css.color, css.opacity];
  };
  const weatherHeadingStyle = await hint.locator('.cursor-hint-label').evaluate(textStyle);
  const weatherSupportingStyle = await hint.locator('.context-detail').evaluate(textStyle);
  assert.deepEqual(weatherHeadingStyle.slice(0, 5), weatherSupportingStyle.slice(0, 5));
  assert.deepEqual(await hint.locator('.context-meta').evaluate(textStyle), weatherSupportingStyle);
  await page.route('**/api/aircraft', route => route.fulfill({json:{ok:true,observedAt:Date.now(),aircraft:[]}}));
  await page.route('**/api/airport-weather', route => route.fulfill({status:503,json:{ok:false}}));
  await page.getByRole('button', {name:'Prague airspace',exact:true}).hover();
  const airspace = page.locator('.airspace-preview');
  await airspace.waitFor();
  await airspace.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
  const airspaceHeadingStyle = await airspace.locator('.airspace-preview-heading h2').evaluate(textStyle);
  assert.deepEqual(airspaceHeadingStyle.slice(2, 5), ['16px', '24px', '-0.08px']);
  assert.deepEqual(airspaceHeadingStyle.slice(5), weatherHeadingStyle.slice(5));
  assert.deepEqual(await airspace.locator('.airspace-preview-heading .airspace-muted').evaluate(textStyle), weatherSupportingStyle);
  await page.screenshot({path:join(output,'airspace-shared-typography.png')});
  await page.mouse.move(20,100);
  await airspace.waitFor({state:'hidden'});
  await hover(weather);
  await weather.click(); await pause();
  assert.equal(await page.locator('.context-popover:popover-open').count(), 0);
  assert.equal(await weather.evaluate(n => n.tagName), 'SPAN');
  assert.equal(await weather.evaluate(n => getComputedStyle(n).cursor), 'default');
  assert.equal(await hint.getAttribute('data-pressed'), null);

  for (const [id, artwork] of [
    ['outland-vizcom', 'identity-vizcom'],
    ['victoria-s-secret', 'identity-victoria-s-secret'],
    ['barbour', 'identity-barbour'],
    ['motion-mockups', 'icon-motionmockups'],
    ['valkaai', 'identity-valkaai'],
  ]) {
    await hover(page.locator(`.project-card[data-project="${id}"]`));
    const logo = hint.locator('.identity-tile img');
    assert.match(await logo.getAttribute('src'), new RegExp(artwork));
    await logo.evaluate(n => n.decode());
    assert.deepEqual(await logo.evaluate(n => [n.width, n.height]), [15, 15]);
    assert.equal(await hint.locator('.cursor-hint-icon').isVisible(), false);
    assert.equal(await hint.locator('.context-meta').textContent(), id === 'motion-mockups' ? 'View project' : 'View case study');
  }
  await page.screenshot({ path: join(output, 'valkaai-brand-tooltip.png') });

  await page.getByRole('tab', { name: 'About', exact: true }).click();
  await page.waitForTimeout(650);
  const education = page.locator('.biography-emphasis[data-informational]');
  await hover(education);
  assert.match(await hint.textContent(), /Czech Technical University.*Sep 2022–Jun 2025/s);
  assert.deepEqual(await hint.locator('.context-image img').evaluate(n => [n.getBoundingClientRect().width, n.getBoundingClientRect().height]), [15,15]);
  await hint.locator('.context-image img').evaluate(n => n.decode());
  await page.screenshot({ path: join(output, 'education-desktop.png') });
  await education.click(); await pause();
  assert.equal(await page.locator('.context-popover:popover-open').count(), 0);
  await page.keyboard.press('Tab');
  assert.equal(await hint.getAttribute('data-visible'), null);
  await education.focus(); await page.keyboard.press('Enter'); await pause();
  const panel = page.locator('.context-popover:popover-open');
  assert.equal(await panel.getAttribute('role'), 'tooltip');
  assert.match(await panel.textContent(), /Czech Technical University/);
  assert.equal(await panel.locator('a,button').count(), 0);
  assert(await education.evaluate(n => n === document.activeElement));
  await page.keyboard.press('Escape');
  assert(await education.evaluate(n => n === document.activeElement));
  assert.equal(await panel.count(), 0);

  await page.goto(`${base}/work/barbour`);
  const stella = page.getByRole('button', { name: 'Stella Grotti', exact: true });
  await hover(stella);
  assert.match(await hint.textContent(), /philosophy/);
  assert.equal(await hint.locator('.context-image').isVisible(), true);
  assert.match(await hint.locator('.context-image img').getAttribute('src'), /monopo/);
  await page.screenshot({ path: join(output, 'credits-desktop.png') });
  await stella.click(); await pause();
  assert.equal(await panel.getByRole('link', { name: /View profile/ }).getAttribute('href'), 'https://monopo.london/team/stella-grotti/');
  await panel.getByRole('button', { name: 'Close' }).click();

  const unlinked = page.locator('.context-trigger[data-hint="Josef Talač"]');
  assert.equal(await unlinked.evaluate(n => n.tagName), 'SPAN');
  await unlinked.click(); await pause();
  assert.equal(await panel.count(), 0);

  // Long URLs wrap, dynamic text updates without moving the pointer, edge flip.
  const link = page.locator('.site-footer a[href^="https:"]').first();
  await hover(link);
  await link.evaluate(n => n.href = 'https://example.com/' + 'long-path-'.repeat(20));
  await pause();
  assert.match(await hint.textContent(), /example.com/);
  await link.evaluate(n => n.dispatchEvent(new PointerEvent('pointermove', { bubbles:true, pointerType:'mouse', clientX:innerWidth-2, clientY:innerHeight-2 })));
  const bounds = await hint.boundingBox();
  assert(bounds.width <= 280 && bounds.x >= 12 && bounds.x + bounds.width <= 1428 && bounds.y + bounds.height <= 888);
  await page.emulateMedia({ reducedMotion: 'reduce' }); await hover(stella);
  assert.equal(await hint.evaluate(n => n.getAnimations({subtree:true}).length), 0);
  await page.setViewportSize({width:834,height:1112}); await hover(stella);
  await page.screenshot({path:join(output,'credits-tablet.png')});

  const touch = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const mobile = await touch.newPage();
  await mobile.goto(base); await mobile.getByRole('tab',{name:'About',exact:true}).click();
  await mobile.locator('.biography-emphasis[data-informational]').tap();
  await mobile.waitForTimeout(300);
  const mobilePanel = mobile.locator('.context-popover:popover-open');
  assert.equal(await mobilePanel.count(), 0, 'Informational text does not open on tap');
  assert.equal(await mobile.locator('.cursor-hint').evaluate(n=>getComputedStyle(n).display),'none');
  await mobile.screenshot({path:join(output,'education-mobile.png')});
  await mobile.goto(`${base}/work/barbour`);
  await mobile.getByRole('button',{name:'Stella Grotti',exact:true}).tap();
  await mobile.waitForTimeout(300);
  assert.match(await mobilePanel.textContent(), /philosophy/);
  const mobileBounds=await mobilePanel.boundingBox();
  assert(mobileBounds.x>=12 && mobileBounds.x+mobileBounds.width<=378 && mobileBounds.y>=12 && mobileBounds.y+mobileBounds.height<=832);
  await mobilePanel.getByRole('button',{name:'Close'}).tap();
  await touch.close();

  await page.unroute('**/api/weather');
  await page.route('**/api/weather', route=>route.fulfill({status:503,json:{temperature:null}}));
  await page.goto(base); await page.waitForTimeout(600); await hover(page.locator('.prague-temperature'));
  assert.match(await hint.textContent(), /temporarily unavailable/);
  assert.doesNotMatch(await hint.textContent(), /Sunny|Partly cloudy/);
  assert.deepEqual(errors,[]);
  console.log(`PASS: sourced context, weather parsing/failure, destinations, email, education logo, credit bios, keyboard/touch, live updates, long URLs, edges, reduced motion. Screenshots: ${output}`);
} finally { await browser.close(); }
