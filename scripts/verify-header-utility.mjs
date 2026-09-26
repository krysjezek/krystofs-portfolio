import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browser = await chromium.launch();
const output = join(tmpdir(), "portfolio-header-utility");
await mkdir(output, { recursive: true });
const base = process.env.INTERACTION_BASE_URL || "http://localhost:3000";
const scenarios = [
  [8, "clearsky_day", "sun"], [-12, "snow", "snowflake"],
  [31, "clearsky_night", "moon"], [18, "partlycloudy_day", "cloud-sun"],
  [18, "partlycloudy_night", "cloud-moon"], [18, "cloudy", "cloud"],
  [18, "rain", "cloud-rain"], [18, "heavyrainandthunder", "thunderstorm"],
  [18, "fog", "cloud-wind"], [18, "unknown", "temperature"],
  [null, null, "temperature"],
];
try {
  for (const width of [1440, 834, 599, 480, 390, 375, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 600, isMobile: width < 600, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    let report = { temperature: 18, symbol: "partlycloudy_day", condition: "Partly cloudy" };
    await page.route("**/api/weather", route => route.fulfill({ status: report.temperature === null ? 503 : 200, json: report }));
    await page.clock.install({ time: new Date("2026-09-26T09:11:00Z") });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const weather = page.locator(".prague-temperature");
    await page.waitForFunction(() => document.querySelector(".temperature-value")?.textContent === "18°C");
    const positions = () => page.locator(".prague-airspace-trigger, .prague-temperature, .prague-clock time").evaluateAll(nodes => nodes.map(n => {
      const r = n.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }));
    const initial = await positions();
    assert(initial[0].x + initial[0].width <= initial[1].x);
    assert(initial[1].x + initial[1].width <= initial[2].x);
    assert(initial[0].height >= 44 && initial[1].height >= 44, "44px action targets");
    const name = await page.locator(".site-name").boundingBox();
    assert(name.y + name.height <= initial[0].y || name.x + name.width + 8 <= initial[0].x, "Name and utilities have breathing room");
    for (const [temperature, symbol, icon] of scenarios) {
      report = { temperature, symbol, condition: "Test weather" };
      const response = page.waitForResponse("**/api/weather");
      await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
      await response;
      await page.waitForFunction(({ temperature, icon }) => document.querySelector(".temperature-value")?.textContent === `${temperature ?? "—"}°C` && document.querySelector(".prague-temperature .ui-icon")?.dataset.uiIcon === icon, { temperature, icon });
      assert.deepEqual(await positions(), initial, `${width}px: values and weather icons never shift adjacent controls`);
    }
    await page.clock.fastForward(48 * 60 * 1000);
    assert.equal(await page.locator(".prague-clock time").textContent(), "11:59");
    assert.deepEqual(await positions(), initial, "Clock digits keep the same outer bounds");
    const colors = await page.locator(".prague-airspace-trigger, .prague-temperature, .prague-clock time").evaluateAll(nodes => nodes.map(n => getComputedStyle(n).color));
    assert.deepEqual(colors, ["rgb(5, 7, 10)", "rgb(5, 7, 10)", "rgb(112, 118, 129)"]);
    if (width < 600) await weather.tap();
    else { await weather.focus(); await page.keyboard.press("Enter"); }
    await page.waitForFunction(() => document.querySelector(".prague-temperature").getAttribute("aria-expanded") === "true");
    const panel = page.locator(".context-popover:popover-open");
    assert.match(await panel.textContent(), /temporarily unavailable/);
    const bounds = await panel.boundingBox();
    assert(bounds.x >= 0 && bounds.x + bounds.width <= width);
    await page.keyboard.press("Escape");
    assert.equal(await panel.count(), 0);
    if (width < 600) {
      await weather.tap();
      await page.locator(".practice-copy").tap();
      assert.equal(await panel.count(), 0, "Touch outside dismisses weather");
    }
    report = { temperature: 18, symbol: "partlycloudy_day", condition: "Partly cloudy" };
    await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
    await page.waitForFunction(() => document.querySelector(".temperature-value")?.textContent === "18°C");
    await page.mouse.move(0, 150);
    await page.screenshot({ path: join(output, `header-${width}.png`) });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "No horizontal overflow");
    assert.deepEqual(errors, []);
    await context.close();
  }
  console.log(`PASS: weather states, unavailable state, fixed numeric slots, order, colors, touch/keyboard disclosures and responsive bounds at seven widths. Screenshots: ${output}`);
} finally { await browser.close(); }
