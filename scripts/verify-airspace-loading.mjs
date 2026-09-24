import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const browser = await chromium.launch();
const base = process.env.AIRSPACE_BASE_URL || "http://localhost:3000";
const output = join(tmpdir(), "portfolio-airspace-loading");
await mkdir(output, { recursive: true });
const errors = [];

async function ready(page, selector) {
  await page.waitForFunction(selector =>
    document.querySelector(selector)?.getAttribute("aria-busy") === "false", selector);
}

try {
  for (const [width, reducedMotion, fail] of [
    [1440, "no-preference", false],
    [834, "no-preference", false],
    [390, "no-preference", false],
    [390, "reduce", true],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 }, reducedMotion,
      isMobile: width < 600, hasTouch: width < 600,
    });
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    const requests = {};
    for (const path of ["aircraft", "airport-weather", "aircraft/abc001"]) {
      await page.route(`**/api/${path}`, route => { requests[path] = route; });
    }
    await page.goto(base);
    const trigger = page.getByRole("button", { name: "Prague airspace", exact: true });
    if (width < 600) await trigger.tap(); else await trigger.hover();
    const panel = page.locator(".airspace-panel");
    await panel.waitFor();
    await page.locator(".airspace-weather .airspace-skeleton").first().waitFor();
    const initialMap = await panel.locator(".airspace-map").boundingBox();
    assert.equal(await panel.locator(".airspace-map").getAttribute("aria-busy"), "true");
    assert.equal(await panel.locator("[data-aircraft-id]").count(), 0);
    assert.equal(await panel.locator(".airspace-weather .airspace-skeleton").count(), width < 600 ? 6 : 3);
    const animation = await panel.locator(".airspace-skeleton").first().evaluate(
      element => getComputedStyle(element, "::after").animationName);
    assert.equal(animation, reducedMotion === "reduce" ? "none" : "airspace-shimmer");
    assert(await panel.evaluate(element => element.scrollWidth <= element.clientWidth));
    await panel.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
    await panel.locator(".airspace-geography").evaluate(image => image.decode());
    await panel.screenshot({ path: join(output, `${width}-${reducedMotion}-loading.png`) });

    if (width >= 600) {
      await panel.getByRole("button", { name: "Click for more details" }).click();
      assert.equal(await panel.locator(".airspace-weather .airspace-skeleton").count(), 6);
      await panel.screenshot({ path: join(output, `${width}-details-loading.png`) });
    }
    // Release feeds independently to verify that one never gates the other.
    assert(requests["airport-weather"] && requests.aircraft);
    const mapBeforeWeather = await panel.locator(".airspace-map").boundingBox();
    await requests["airport-weather"].fulfill(fail
      ? { status: 503, json: { ok: false } }
      : { json: { ok: true, observedAt: Date.now(), temp: 18, wind: 240, speed: 8,
        visibility: "6+", clouds: [{ cover: "FEW", base: 3000 }], dew: 10, pressure: 1018 } });
    await ready(page, ".airspace-weather");
    assert.equal(await panel.locator(".airspace-weather .airspace-skeleton").count(), 0);
    assert.equal(await panel.locator(".airspace-map").getAttribute("aria-busy"), "true");
    const mapBeforeTraffic = await panel.locator(".airspace-map").boundingBox();
    if (!fail) assert.equal(mapBeforeWeather.y, mapBeforeTraffic.y, "weather completion does not move the map");
    await requests.aircraft.fulfill(fail
      ? { status: 503, json: { ok: false } }
      : { json: { ok: true, fixture: true, observedAt: Date.now(), aircraft: [
        { id: "abc001", callsign: "EWG7KG", lat: 50.18, lon: 14.28,
          track: null, speed: null, aircraftType: null, observedAt: Date.now() },
      ] } });
    await ready(page, ".airspace-map");
    assert.equal(await panel.locator(".airspace-skeleton").count(), 0);
    const mapAfterTraffic = await panel.locator(".airspace-map").boundingBox();
    assert.equal(mapBeforeTraffic.height, mapAfterTraffic.height, "map height stays reserved");
    if (width < 600) assert.equal(initialMap.height, mapAfterTraffic.height);
    if (fail) {
      assert.match(await panel.innerText(), /Traffic unavailable/);
      assert.match(await panel.innerText(), /Weather unavailable/);
    } else {
      await panel.locator('[data-aircraft-id="abc001"]').focus();
      await page.keyboard.press("Enter");
      await panel.locator(".airspace-selected .airspace-skeleton").first().waitFor();
      assert.equal(await panel.locator(".airspace-selected .airspace-skeleton").count(), 3);
      await panel.screenshot({ path: join(output, `${width}-flight-loading.png`) });
      assert(requests["aircraft/abc001"]);
      await requests["aircraft/abc001"].fulfill({ json: { ok: true, callsign: "EWG7KG",
        model: "Airbus A320", route: { from: { code: "PRG", city: "Prague" }, to: { code: "DUS", city: "Düsseldorf" } } } });
      await ready(page, ".airspace-selected");
      assert.equal(await panel.locator(".airspace-skeleton").count(), 0);
      await panel.getByRole("button", { name: "Close", exact: true }).click();
      await panel.waitFor({ state: "hidden" });
      await trigger.click();
      await panel.waitFor();
      assert.equal(await panel.locator(".airspace-skeleton").count(), 0, "cached readings do not reenter loading");
    }
    await context.close();
    console.log(`PASS: ${width}px ${reducedMotion}, ${fail ? "unavailable" : "independent feeds, flight lookup, cached reopen"}`);
  }
  assert.deepEqual(errors, [], "Browser errors");
  console.log(`Screenshots: ${output}`);
} finally {
  await browser.close();
}
