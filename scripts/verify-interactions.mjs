import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browser = await chromium.launch();
const base = process.env.INTERACTION_BASE_URL || "http://localhost:3000";
const output = join(tmpdir(), "portfolio-motion-review");
await mkdir(output, { recursive: true });
const errors = [];
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
const settle = () => page.waitForTimeout(850);
const tab = (name) => page.getByRole("tab", { name, exact: true });
async function visiblePanel(name) {
  await page.waitForFunction((name) => {
    const panels = [...document.querySelectorAll('[role="tabpanel"]')].filter(
      (p) => !p.hidden,
    );
    return (
      panels.length === 1 &&
      panels[0].id === `panel-${name}` &&
      !panels[0].inert
    );
  }, name);
}
try {
  // Observe actual paints: hydration must not restart the first entrance.
  await page.addInitScript(() => {
    window.entranceSamples = [];
    const start = performance.now();
    function sample() {
      const intro = document.querySelector(".practice-copy");
      if (intro)
        window.entranceSamples.push(Number(getComputedStyle(intro).opacity));
      if (performance.now() - start < 2500) requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
  await page.goto(base);
  await settle();
  const samples = await page.evaluate(() => window.entranceSamples);
  assert(samples.length > 4);
  assert(
    samples.every((v, i) => i === 0 || v >= samples[i - 1] - 0.01),
    "Load-in must not flash visible then disappear",
  );
  await page.screenshot({ path: join(output, "desktop.png") });
  console.log("PASS: first-paint entrance never resets during hydration");
  const grid = await page
    .locator(".page-grid > span")
    .evaluateAll((nodes) => nodes.map((n) => n.getBoundingClientRect().height));
  assert(
    grid.some((height) => height > 0 && height < 900),
    "Grid draws during load-in",
  );
  assert.notEqual(grid[0], grid[1], "Grid lines are staggered");
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll("#panel-work video")].some(
        (v) => !v.paused && v.currentTime > 0,
      ),
    { timeout: 20000 },
  );
  assert(
    (await page.locator("#panel-work video.is-ready").count()) > 0,
    "Video fades in only after playback starts",
  );

  // All tab changes retain the header and settle to the latest intent.
  const header = await page.locator(".home-introduction").boundingBox();
  for (const name of ["Fun", "About", "Work", "About", "Fun", "Work"]) {
    await tab(name).evaluate((node) => node.click());
    await page.waitForTimeout(65);
  }
  await settle();
  await visiblePanel("work");
  assert.deepEqual(
    await page.locator(".home-introduction").boundingBox(),
    header,
  );
  await tab("Work").focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await settle();
  await visiblePanel("fun");
  assert.equal(await page.evaluate(() => document.activeElement.id), "tab-fun");
  assert(
    await page
      .locator("#panel-work video")
      .evaluateAll((videos) => videos.every((v) => v.paused)),
    "Inactive tab videos pause",
  );
  assert.equal(
    await page
      .locator(".page-grid > span")
      .first()
      .evaluate((n) => n.getAnimations().length),
    0,
    "Tab changes do not restart the grid",
  );
  console.log("PASS: rapid tab reversals, stationary header, keyboard tabs");

  await tab("Work").click();
  await settle();
  const card = page.locator("#panel-work a.project-card").first();
  await card.hover();
  await page.waitForTimeout(380);
  assert.equal(
    await page.locator(".cursor-hint").getAttribute("data-visible"),
    "",
  );
  assert.equal(
    await card
      .locator(".tag")
      .first()
      .evaluate((n) => getComputedStyle(n).opacity),
    "1",
  );
  const cardRect = await card.boundingBox();
  await page.mouse.down();
  await page.evaluate(() =>
    document.dispatchEvent(new PointerEvent("pointercancel")),
  );
  await page.mouse.move(20, 100);
  await page.mouse.up();
  assert.equal(
    await page.locator(".cursor-hint").getAttribute("data-pressed"),
    null,
  );
  assert.deepEqual(
    await card.boundingBox(),
    cardRect,
    "Artwork and hit area stay still",
  );
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await settle();
  assert.equal(
    await page
      .locator(".page-grid > span")
      .first()
      .evaluate((n) => n.getBoundingClientRect().height),
    await page
      .locator(".portfolio-shell")
      .evaluate((n) => n.getBoundingClientRect().height),
  );
  const lastCard = page.locator("#panel-work .project-card").last();
  assert.equal(
    await lastCard.evaluate((n) => getComputedStyle(n).opacity),
    "1",
  );
  await page.evaluate(() => scrollTo(0, 0));
  await settle();
  assert.equal(await card.evaluate((n) => n.getAnimations().length), 0);
  console.log(
    "PASS: hover/press cancellation and fast-scroll arrivals without replay",
  );

  // Clipboard can resolve or reject without moving the header or lying about success.
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => {} },
    }),
  );
  const copy = page.locator(".copy-email > button");
  const copyRect = await copy.boundingBox();
  await copy.hover();
  await copy.click();
  await page
    .getByRole("button", { name: "Email copied", exact: true })
    .waitFor();
  assert.deepEqual(await copy.boundingBox(), copyRect);
  assert.equal(
    await page.locator(".cursor-hint-label").textContent(),
    "Email copied",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
    }),
  );
  await copy.click();
  await page.locator(".copy-error").waitFor();
  assert.match(
    await page.locator(".copy-error").textContent(),
    /krystof@jezek.me/,
  );
  console.log(
    "PASS: stable copy confirmation, stationary cursor update, denied clipboard",
  );

  await tab("About").click();
  await settle();
  const recognitionTrigger = page.getByRole("button", { name: "Mentions and credits", exact: true });
  const recognition = page.locator(".recognition-popover");
  await recognitionTrigger.click();
  await page.waitForFunction(() => document.activeElement === document.querySelector(".recognition-popover h2"));
  assert.equal(await recognition.locator("article").count(), 18);
  assert.equal(await recognition.getAttribute("aria-modal"), null);
  assert.equal(await recognition.getByText("View resume").count(), 0);
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  await page.keyboard.press("Shift+Tab");
  assert(await recognitionTrigger.evaluate(n => n === document.activeElement), "Tab can leave the popover");
  await page.keyboard.press("Escape");
  await recognition.waitFor({ state: "hidden" });
  assert(await recognitionTrigger.evaluate(n => n === document.activeElement));
  await recognitionTrigger.click();
  await recognition.getByRole("button", { name: "Close", exact: true }).click();
  await recognition.waitFor({ state: "hidden" });
  assert(await recognitionTrigger.evaluate(n => n === document.activeElement));
  await recognitionTrigger.click();
  await tab("Work").click();
  await recognition.waitFor({ state: "hidden" });
  assert.equal(await tab("Work").getAttribute("aria-selected"), "true");
  console.log("PASS: non-modal recognition, all records, keyboard exit, Close/Escape and outside interaction");

  // Slow navigation retains context; native Link makes no blocking HEAD preflight.
  await tab("Work").click();
  await settle();
  const methods = [];
  page.on("request", (r) => {
    if (r.url().includes("/work/vizcom")) methods.push(r.method());
  });
  await page.route("**/work/vizcom?*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    await route.continue();
  });
  await card.click();
  await page.waitForTimeout(320);
  assert(await page.locator(".home-introduction").isVisible());
  assert(
    await page.getByRole("status").filter({ hasText: "Opening" }).isVisible(),
  );
  await page.waitForURL("**/work/vizcom");
  await settle();
  assert(!methods.includes("HEAD"));
  assert.equal(await page.evaluate(() => document.activeElement.tagName), "H1");
  await page.goBack();
  await visiblePanel("work");
  await settle();
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    await card.getAttribute("id"),
  );
  assert.equal(
    await page
      .locator(".portfolio-panels")
      .evaluate((n) => n.getAnimations().length),
    0,
  );
  console.log(
    "PASS: immediate route request, slow-route status, heading focus and browser Back",
  );

  for (const route of [
    "/work/barbour",
    "/work/chainer",
    "/work/the-mag-w-rap-2025",
    "/work/the-vsx-sports-bra",
    "/work/valkaai",
    "/services/3d-environments",
    "/services/mixed-reality",
    "/other/work",
    "/other/cv",
    "/other/cv-print",
    "/other/join",
    "/work/old-projects/apify",
    "/missing-motion-check",
  ]) {
    await page.goto(base + route);
    await settle();
    assert(await page.locator("main h1").isVisible(), route);
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await settle();
    assert.equal(
      await page
        .locator(".site-footer")
        .evaluate((n) => getComputedStyle(n).opacity),
      "1",
    );
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    );
  }
  console.log("PASS: all six cases, services and other public page families");

  for (const width of [834, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    await settle();
    await tab("Fun").click();
    await settle();
    await visiblePanel("fun");
    await page.screenshot({ path: join(output, `${width}.png`) });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  await settle();
  assert.equal(await page.locator("video").count(), 0);
  await tab("Fun").click();
  await visiblePanel("fun");
  assert.equal(
    await page.locator("#panel-fun").evaluate((n) => n.getAnimations().length),
    0,
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await tab("Work").click();
  await page.waitForTimeout(70);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await visiblePanel("work");
  assert.equal(
    await page.locator("#panel-work").evaluate((n) => n.getAnimations().length),
    0,
  );
  console.log("PASS: tablet/mobile and live reduced-motion changes");

  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const touchPage = await touch.newPage();
  await touchPage.goto(base);
  await touchPage.getByRole("tab", { name: "Fun", exact: true }).tap();
  await touchPage.waitForTimeout(700);
  assert.equal(
    await touchPage
      .locator("#panel-fun .tag")
      .first()
      .evaluate((n) => getComputedStyle(n).opacity),
    "1",
  );
  assert.equal(
    await touchPage
      .locator(".cursor-hint")
      .evaluate((n) => getComputedStyle(n).display),
    "none",
  );
  await touchPage.getByRole("tab", { name: "About", exact: true }).tap();
  await touchPage.getByRole("button", { name: "Mentions and credits" }).tap();
  await touchPage.getByRole("button", { name: "Close", exact: true }).tap();
  await touchPage.locator(".recognition-popover").waitFor({ state: "hidden" });
  await touch.close();

  const saver = await browser.newContext();
  await saver.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: Object.assign(new EventTarget(), { saveData: true }),
    }),
  );
  const saverPage = await saver.newPage();
  await saverPage.goto(base);
  await saverPage.waitForTimeout(800);
  assert.equal(await saverPage.locator("video").count(), 0);
  await saver.close();
  console.log(
    "PASS: touch controls, persistent labels and data-saver poster-only mode",
  );

  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base);
  await staticPage.waitForTimeout(900);
  assert.equal(
    await staticPage
      .locator(".practice-copy")
      .evaluate((n) => getComputedStyle(n).opacity),
    "1",
  );
  assert(
    await staticPage.locator("#panel-work a.project-card").first().isVisible(),
  );
  await nojs.close();
  console.log("PASS: no-JavaScript content remains visible");
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(`Screenshots: ${output}`);
} finally {
  await context.close();
  await browser.close();
}
