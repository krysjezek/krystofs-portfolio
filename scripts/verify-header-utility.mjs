import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browser = await chromium.launch();
const output = join(tmpdir(), "portfolio-header-utility");
await mkdir(output, { recursive: true });
const base = process.env.INTERACTION_BASE_URL || "http://localhost:3000";
// [temperature, provider symbol, the brief term the dateline must show].
// null means the field is dropped rather than rendered empty.
const scenarios = [
  [8, "clearsky_day", "Sunny"], [-12, "snow", "Snow"],
  [31, "clearsky_night", "Clear sky"], [18, "partlycloudy_day", "Partly cloudy"],
  [18, "partlycloudy_night", "Partly cloudy"], [18, "cloudy", "Cloudy"],
  [18, "rain", "Rain"], [18, "heavyrainandthunder", "Thunderstorms"],
  [18, "heavyrainshowersandthunder", "Thunderstorms"], [18, "lightsleetshowers", "Light sleet"],
  [18, "fog", "Foggy"], [18, "unknown", null],
  [null, null, null],
];
try {
  for (const width of [1440, 834, 599, 480, 393, 375, 360, 344, 320]) {
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
    const positions = () => page.locator(".prague-airspace-trigger, .dateline time, .prague-temperature").evaluateAll(nodes => nodes.map(n => {
      const r = n.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }));
    const initial = await positions();
    const geometry = () => page.evaluate(() => {
      const header = document.querySelector(".site-header");
      const hd = header.getBoundingClientRect();
      const inset = parseFloat(getComputedStyle(header).paddingRight);
      const name = document.querySelector(".site-name").getBoundingClientRect();
      const dl = document.querySelector(".dateline").getBoundingClientRect();
      return {
        height: +hd.height.toFixed(1),
        rightSlack: +((hd.right - inset) - dl.right).toFixed(1),
        leftGap: +(dl.left - name.right).toFixed(1),
        stacked: dl.top > name.bottom - 2,
        docOverflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    const geo = await geometry();
    const anchor = geo.rightSlack;
    // Time precedes weather on the second row; Prague sits on the row above it
    // when ranged right, and simply precedes both once stacked.
    assert(initial[1].x + initial[1].width <= initial[2].x, `${width}px: time precedes weather`);
    if (width >= 600) assert(initial[0].y + initial[0].height <= initial[1].y + 2, `${width}px: Prague sits on the row above`);
    else assert(initial[0].x + initial[0].width <= initial[1].x, `${width}px: Prague precedes time`);

    // The masthead is one object at every width: 70.5px tall, never overflowing.
    assert(geo.height <= 72, `${width}px: header keeps its height (got ${geo.height})`);
    assert(!geo.docOverflow, `${width}px: no horizontal overflow`);
    assert(geo.rightSlack >= 0, `${width}px: dateline clears the inset (slack ${geo.rightSlack})`);

    // Ranged right beside the name above 600px; stacked beneath it below.
    assert.equal(geo.stacked, width < 600, `${width}px: dateline stacks only below 600px`);
    if (width >= 600) {
      assert.equal(geo.rightSlack, 0, `${width}px: dateline ranges flush to the inset`);
      assert(geo.leftGap > 40, `${width}px: dateline clears the wordmark (gap ${geo.leftGap})`);
    }

    // One micro type role across every field, and the date drops below 600px.
    const type = await page.locator(".dateline, .prague-airspace-trigger, .prague-temperature, .dateline time, .temperature-value, .condition-value")
      .evaluateAll(nodes => [...new Set(nodes.map(n => { const c = getComputedStyle(n); return `${c.fontSize}/${c.lineHeight} ${c.textTransform}`; }))]);
    assert.deepEqual(type, ["10px/15px uppercase"], `${width}px: dateline shares one micro type role`);
    assert.equal(await page.locator(".dateline-date").isVisible(), width >= 600, `${width}px: date presence`);

    // Both disclosures read as plain text but keep a real target via ::after,
    // and crucially must not cover each other on the adjacent rows.
    const targets = await page.evaluate(() => [".prague-airspace-trigger", ".prague-temperature"].map(sel => {
      const n = document.querySelector(sel);
      const b = n.getBoundingClientRect();
      const a = getComputedStyle(n, "::after");
      const top = b.top - Math.abs(parseFloat(a.insetBlockStart || a.top || "0"));
      const bottom = b.bottom + Math.abs(parseFloat(a.insetBlockEnd || a.bottom || "0"));
      return { sel, top: +top.toFixed(1), bottom: +bottom.toFixed(1), height: +(bottom - top).toFixed(1) };
    }));
    const floor = width < 600 ? 44 : 32;
    for (const t of targets) assert(t.height >= floor, `${width}px: ${t.sel} target is ${t.height}, below ${floor}`);
    // Whichever way they are laid out, one target must never sit over the other.
    const [air, wx] = targets;
    const overlaps = air.bottom > wx.top && wx.bottom > air.top;
    assert.equal(overlaps, width < 600, `${width}px: stacked-row targets must not overlap vertically`);
    // Hit-testing the rendered centre of Prague must reach Prague itself.
    const hitsPrague = await page.evaluate(() => {
      const b = document.querySelector(".prague-airspace-trigger").getBoundingClientRect();
      const hit = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
      return !!hit?.closest(".prague-airspace-trigger");
    });
    assert(hitsPrague, `${width}px: the weather target is covering Prague`);
    for (const [temperature, symbol, brief] of scenarios) {
      report = { temperature, symbol, condition: "Test weather" };
      const response = page.waitForResponse("**/api/weather");
      await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
      await response;
      await page.waitForFunction(({ temperature, brief }) =>
        document.querySelector(".temperature-value")?.textContent === `${temperature ?? "—"}°C`
        && (document.querySelector(".condition-value")?.textContent ?? null) === brief, { temperature, brief });
      // The longest provider phrase must still fit the narrowest line.
      const shown = await page.locator(".condition-value").evaluateAll(n => n[0]?.textContent ?? null);
      assert(shown === null || shown.length <= 14, `${width}px: "${shown}" exceeds the dateline's room`);
      // Ranged right, the anchored edge must hold still while the phrase
      // reflows behind it. Stacked, the block is left-aligned, so what must
      // hold is that it never grows past the inset.
      const live = await geometry();
      if (width >= 600) assert.equal(live.rightSlack, anchor, `${width}px: dateline keeps a stable right edge as values change`);
      else assert(live.rightSlack >= 0 && !live.docOverflow, `${width}px: stacked dateline stays inside the inset (slack ${live.rightSlack})`);
    }
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
    await page.evaluate(() => scrollTo(0, 0));
    assert.deepEqual(await positions(), initial, "Restoring a value restores the layout exactly");
    await page.clock.fastForward(48 * 60 * 1000);
    assert.equal(await page.locator(".dateline time").textContent(), "11:59");
    assert.deepEqual(await positions(), initial, "Tabular figures keep the clock from shifting the dateline");
    const colors = await page.locator(".prague-airspace-trigger, .dateline time, .prague-temperature").evaluateAll(nodes => nodes.map(n => getComputedStyle(n).color));
    assert.deepEqual(colors, Array(3).fill("rgb(112, 118, 129)"), "the cluster speaks in one muted voice");
    assert.equal(await page.locator(".site-name").evaluate(n => getComputedStyle(n).color), "rgb(5, 7, 10)", "the wordmark is the only ink in the header");
    await page.screenshot({ path: join(output, `header-${width}.png`) });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "No horizontal overflow");
    assert.deepEqual(errors, []);
    await context.close();
  }
  console.log(`PASS: weather states, unavailable state, masthead height, one micro type role, muted dateline, ranged right above 600px and stacked below, stable right edge, date reduction, 44px targets, order, touch/keyboard disclosures and responsive bounds at nine widths. Screenshots: ${output}`);
} finally { await browser.close(); }
