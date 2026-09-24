import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.env.AIRSPACE_BASE_URL || "http://localhost:3000";
const output = join(tmpdir(), "portfolio-airspace");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const errors = [];
let checks = 0;
const check = (condition, message) => { assert.ok(condition, message); checks++; };
const until = async (fn, message) => { for (let n = 0; n < 80; n++) { if (await fn()) { checks++; return; } await new Promise(resolve => setTimeout(resolve, 50)); } throw new Error(message); };
const report = (now, id = "abc001", extra = {}) => ({ id, callsign: id === "abc001" ? "EWG7KG" : "TEST02", aircraftType: "A320", lat: 50.18, lon: 14.28, speed: 200, track: 45, observedAt: now - 5000, ...extra });

async function setup(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...options });
  const page = await context.newPage();
  await page.clock.install();
  page.on("pageerror", e => errors.push(e.message));
  const state = { traffic: 0, weather: 0, details: 0, scenario: "normal", stamp: Date.now() };
  await page.route("**/api/aircraft", async route => {
    state.traffic++;
    const now = await page.evaluate(() => Date.now());
    if (state.scenario === "error") return route.fulfill({ status: 503, json: { ok: false } });
    const observedAt = state.scenario === "old" ? state.stamp : now;
    await route.fulfill({ json: { ok: true, fixture: true, delayed: state.scenario === "delayed", observedAt, aircraft: state.scenario === "empty" ? [] : [report(observedAt), report(observedAt, "abc002", { lon: 14.29 }), report(observedAt, "abc003", { lat: 49.91, lon: 14.55, track: null })] } });
  });
  await page.route("**/api/airport-weather", route => {
    state.weather++;
    return route.fulfill(state.scenario === "weather-error" ? { status: 503, json: { ok: false } } : { json: { ok: true, observedAt: state.stamp, temp: 18, wind: 240, speed: 8, visibility: "6+", raw: "METAR LKPR 241200Z 9999 FEW030", clouds: [{ cover: "FEW", base: 3000 }], dew: 10, pressure: 1018 } });
  });
  await page.route("**/api/aircraft/*", route => {
    state.details++;
    return route.fulfill(state.scenario === "details-error" ? { status: 503, json: { ok: false } } : { json: { ok: true, id: "abc001", callsign: "EWG7KG", model: "Airbus A320-214", route: { from: { code: "PRG", city: "Prague" }, to: { code: "DUS", city: "Düsseldorf" } } } });
  });
  await page.goto(base);
  await page.getByRole("button", { name: "Prague airspace", exact: true }).waitFor();
  return { context, page, state, trigger: page.getByRole("button", { name: "Prague airspace", exact: true }), panel: page.locator(".airspace-panel") };
}

try {
  const { context, page, state, trigger, panel } = await setup();
  await page.waitForTimeout(300);
  check(state.traffic === 0 && state.weather === 0, "closed module does not fetch traffic or METAR");
  await trigger.hover();
  await page.locator(".airspace-preview").waitFor();
  await until(() => page.locator("[data-aircraft-id]").count().then(n => n === 3), "preview traffic");
  check(await panel.getAttribute("role") === "dialog", "preview is an interactive popover");
  check(await panel.locator("button[data-aircraft-id]").count() === 0, "preview has no selectable aircraft");
  await panel.hover();
  await page.waitForTimeout(250);
  check(await panel.isVisible(), "crossing the gap keeps preview open");
  await page.screenshot({ path: join(output, "desktop-preview.png") });
  const requestCount = state.traffic;
  await panel.getByRole("button", { name: "Click for more details" }).click();
  await page.locator(".airspace-details").waitFor();
  const alignment = await panel.evaluate(e => {
    const header = document.querySelector(".home-header");
    return Math.abs(e.getBoundingClientRect().right - (header.getBoundingClientRect().right - parseFloat(getComputedStyle(header).paddingRight)));
  });
  check(alignment < 1, "panel aligns with header inset without double-counting scrollbars");
  check(await panel.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), "all Figma SVG assets load");
  check(await panel.locator(".airspace-plane img").first().evaluate(e => getComputedStyle(e).width === "15px" && getComputedStyle(e).height === "15px"), "15px aircraft artwork retains its square canvas");
  check(state.traffic === requestCount, "preview to details reuses snapshot and polling cadence");
  check(await page.locator('[data-aircraft-id="abc001"]').evaluate(e => e.style.transform.includes("translate(")), "detail markers retain their projected positions");
  await page.locator('[data-aircraft-id="abc001"]').focus();
  await page.keyboard.press("Enter");
  await until(() => panel.innerText().then(t => t.includes("Airbus A320-214")), "selected details");
  check((await panel.innerText()).includes("PRG · Prague") && (await panel.innerText()).includes("DUS · Düsseldorf"), "selected route and aircraft model render");
  await page.screenshot({ path: join(output, "desktop-selected.png") });
  await page.locator('[data-aircraft-id="abc001"]').focus();
  await page.keyboard.press("Enter");
  check((await panel.innerText()).includes("Select an aircraft to explore."), "reselecting clears details");
  const movingTarget = await page.locator('[data-aircraft-id="abc002"]').boundingBox();
  await page.mouse.click(movingTarget.x + movingTarget.width / 2, movingTarget.y + movingTarget.height / 2);
  await page.locator(".airspace-chooser").waitFor();
  check(await page.locator(".airspace-chooser button").count() === 2, "overlap chooser exposes both callsigns");
  await page.locator(".airspace-chooser").getByRole("button", { name: "EWG7KG" }).click();
  await page.keyboard.press("Escape");
  await until(() => panel.count().then(n => n === 0), "Escape closes panel");
  await until(() => trigger.evaluate(e => e === document.activeElement), "Escape restores trigger focus");
  await page.waitForTimeout(300);
  check(await panel.count() === 0, "Escape suppresses focus reopening");
  await trigger.click();
  await panel.waitFor();
  await page.getByRole("tab", { name: "About", exact: true }).click();
  await until(() => panel.count().then(n => n === 0), "outside click dismisses");
  check(await page.getByRole("tab", { name: "About", exact: true }).evaluate(e => e === document.activeElement), "outside target retains focus");
  await page.getByRole("tab", { name: "Work", exact: true }).click();
  await trigger.click();
  await panel.waitFor();
  await page.waitForTimeout(100);
  await page.clock.fastForward(31000);
  await until(() => state.traffic > requestCount, "30 second refresh");
  state.scenario = "error";
  await page.clock.fastForward(31000);
  await until(() => panel.innerText().then(t => t.includes("Updates delayed.")), "refresh failure retains last known positions");
  const frozen = await page.locator('[data-aircraft-id="abc001"]').getAttribute("style");
  await page.clock.fastForward(5000);
  check(await page.locator('[data-aircraft-id="abc001"]').getAttribute("style") === frozen, "delayed motion is frozen");
  await page.locator('[data-aircraft-id="abc001"]').focus();
  await page.keyboard.press("Enter");
  await page.clock.fastForward(125000);
  await until(() => page.locator("[data-aircraft-id]").count().then(n => n === 0), "old reports expire");
  check((await panel.innerText()).includes("Aircraft left coverage or its report expired."), "expired selection is explicit");
  await panel.getByRole("button", { name: "Close", exact: true }).click();
  const closedCount = state.traffic;
  await page.clock.fastForward(400000);
  check(state.traffic === closedCount, "closed module stops polling");
  await context.close();

  {
    const { context, page, state, trigger } = await setup();
    await trigger.click();
    await until(() => state.traffic === 1 && state.weather === 1, "initial visible fetches");
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(100);
    const hiddenCount = { traffic: state.traffic, weather: state.weather };
    await page.clock.fastForward(310000);
    check(state.traffic === hiddenCount.traffic && state.weather === hiddenCount.weather, "hidden tab pauses both feeds");
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await until(() => state.traffic > hiddenCount.traffic && state.weather > hiddenCount.weather, "visible tab resumes due traffic and five-minute weather");
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(150);
    const offscreenCount = { traffic: state.traffic, weather: state.weather };
    await page.clock.fastForward(310000);
    check(state.traffic === offscreenCount.traffic && state.weather === offscreenCount.weather, "off-screen header pauses feeds");
    await page.evaluate(() => window.scrollTo(0, 0));
    await until(() => state.traffic > offscreenCount.traffic, "on-screen header resumes due polling");
    await context.close();
  }

  for (const scenario of ["empty", "error", "delayed", "weather-error", "details-error"]) {
    const { context, page, state, trigger, panel } = await setup({ reducedMotion: "reduce" });
    state.scenario = scenario;
    await trigger.click();
    await until(() => state.traffic > 0 && state.weather > 0, "feedback requests");
    if (scenario === "empty") await until(() => panel.innerText().then(t => t.includes("No airborne aircraft reported within 30 km.")), "empty state");
    if (scenario === "error") await until(() => panel.innerText().then(t => t.includes("Traffic unavailable. Retrying automatically.")), "outage state");
    if (scenario === "delayed") {
      await until(() => panel.innerText().then(t => t.includes("Updates delayed. Last known traffic shown.")), "new visitor receives collector's retained traffic with honest status");
      check(await page.locator("[data-aircraft-id]").count() === 3, "collector outage does not erase last known positions for a new visitor");
    }
    if (scenario === "weather-error") await until(() => panel.innerText().then(t => t.includes("Weather unavailable")), "independent weather failure");
    if (scenario === "details-error") {
      await page.locator('[data-aircraft-id="abc001"]').waitFor();
      await page.locator('[data-aircraft-id="abc001"]').focus(); await page.keyboard.press("Enter");
      await until(() => panel.innerText().then(t => t.includes("Not reported")), "details fallback");
      check((await panel.innerText()).includes("AIRCRAFT / A320"), "unknown model retains reported type");
    }
    check(await panel.evaluate(e => getComputedStyle(e).animationName) === "none", "reduced motion disables transition");
    if (scenario !== "empty" && scenario !== "error") {
      check(await panel.locator('[data-aircraft-id="abc001"] img').getAttribute("src") === "/airspace/observed.svg", "reduced motion uses received positions");
      const before = await panel.locator('[data-aircraft-id="abc001"]').getAttribute("style");
      await page.waitForTimeout(150);
      check(await panel.locator('[data-aircraft-id="abc001"]').getAttribute("style") === before, "received markers do not project");
    }
    await context.close();
  }

  {
    const { context, page, state, trigger, panel } = await setup({ reducedMotion: "reduce" });
    state.scenario = "error";
    await trigger.click();
    await until(() => panel.innerText().then(t => t.includes("Traffic unavailable.")), "initial failure");
    state.scenario = "normal";
    await page.clock.fastForward(16000);
    await until(() => page.locator("[data-aircraft-id]").count().then(n => n === 3), "transient failures recover in 15 seconds, not minutes");
    state.scenario = "error";
    await page.clock.fastForward(31000);
    await until(() => panel.innerText().then(t => t.includes("Updates delayed.")), "second network failure");
    state.scenario = "normal";
    const before = state.traffic;
    await page.evaluate(() => window.dispatchEvent(new Event("online")));
    await until(() => state.traffic > before, "network reconnection retries immediately");
    await until(() => panel.innerText().then(t => !t.includes("Updates delayed.")), "network reconnection restores healthy status");
    await context.close();
  }

  for (const width of [834, 390, 320]) {
    const mobile = width < 600;
    const { context, page, trigger, panel } = await setup({ viewport: { width, height: 844 }, isMobile: mobile, hasTouch: mobile });
    if (mobile) await trigger.tap(); else await trigger.click();
    await page.locator('[data-aircraft-id="abc001"]').waitFor();
    const box = await panel.boundingBox();
    check(Math.abs(box.width - (mobile ? width - 40 : 440)) < 1, `${width}px panel width`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px no page overflow`);
    check(await panel.evaluate(e => e.scrollWidth <= e.clientWidth), `${width}px no panel overflow`);
    check(await page.locator(".airspace-geography").evaluate(e => e.getBoundingClientRect().width) === 432, "map keeps fixed geographic scale");
    if (mobile) {
      check(await panel.getAttribute("aria-modal") === "true", "mobile sheet is modal");
      await panel.getByRole("button", { name: "Close", exact: true }).focus();
      await page.keyboard.press("Shift+Tab");
      check(await panel.evaluate(e => e.contains(document.activeElement)), "mobile traps backward focus");
      await page.keyboard.press("Tab");
      check(await page.getByRole("button", { name: "Close", exact: true }).evaluate(e => e === document.activeElement), "mobile wraps forward focus");
      await page.setViewportSize({ width, height: 568 });
      check(await panel.evaluate(e => e.scrollHeight > e.clientHeight && getComputedStyle(e).overflowY === "auto"), "short mobile sheet scrolls vertically");
      await page.setViewportSize({ width, height: 844 });
    }
    await page.screenshot({ path: join(output, `airspace-${width}.png`) });
    await panel.getByRole("button", { name: "Close", exact: true }).click();
    await until(() => trigger.evaluate(e => e === document.activeElement), "mobile focus restoration");
    check(!await page.locator(".portfolio-shell").evaluate(e => e.inert), "page is interactive after sheet dismissal");
    await context.close();
  }
  check(errors.length === 0, errors.join("\n"));
  console.log(`Airspace: ${checks} checks passed. Screenshots: ${output}`);
} finally { await browser.close(); }
