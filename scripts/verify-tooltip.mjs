import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const output = join(tmpdir(), "portfolio-tooltip");
await mkdir(output, { recursive: true });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const hint = page.locator(".cursor-hint");
const surface = page.locator(".cursor-hint-surface");
const label = page.locator(".cursor-hint-label");
const waitForRest = () => page.waitForTimeout(650);

try {
  await page.goto(process.env.INTERACTION_BASE_URL || "http://localhost:3000");
  await page.waitForTimeout(900);
  const link = page.getByRole("link", { name: "Motion Mockups", exact: true }).first();
  await link.hover();
  await page.waitForTimeout(100);
  const entrance = await surface.evaluate((node) => ({
    scale: new DOMMatrix(getComputedStyle(node).transform).a,
    labelChildren: node.querySelector(".cursor-hint-label").childElementCount,
  }));
  assert(entrance.scale >= .97 && entrance.scale <= 1, "Original subtle entrance");
  assert.equal(entrance.labelChildren, 0, "Keep the original whole-label typography");
  await page.screenshot({ path: join(output, "browser-enter.png") });
  await waitForRest();
  assert.equal(await label.textContent(), "Visit site");
  assert.equal(await hint.getAttribute("data-icon"), "arrow");
  assert.deepEqual(await surface.evaluate((node) => {
    const css = getComputedStyle(node);
    return [css.backgroundColor, css.color, css.borderRadius, node.offsetHeight, css.fontSize, css.lineHeight, css.letterSpacing];
  }), ["rgb(5, 7, 10)", "rgb(255, 255, 255)", "3px", 24, "11px", "16px", "0.22px"]);
  assert(await hint.locator('[data-ui-icon="arrow"]').evaluate(
    (node) => getComputedStyle(node).maskImage.includes("/icons/line-awesome/arrow.svg") && node.getBoundingClientRect().width === 12,
  ));
  await page.screenshot({ path: join(output, "browser-rest.png") });

  // Moving within the same semantic link must never replay its entrance.
  const starts = () => label.evaluate((node) => node.getAnimations({ subtree: true }).map((a) => a.startTime));
  const before = await starts();
  const rect = await link.boundingBox();
  await page.mouse.move(rect.x + 20, rect.y + rect.height / 2);
  assert.deepEqual(await starts(), before);
  const position = await hint.boundingBox();
  await page.mouse.down();
  await page.waitForTimeout(230);
  assert(Math.abs(await page.locator(".cursor-hint-press").evaluate(
    (node) => new DOMMatrix(getComputedStyle(node).transform).a,
  ) - .96) < .01);
  assert.deepEqual(await hint.boundingBox(), position, "Press keeps tracking geometry fixed");
  await page.evaluate(() => document.dispatchEvent(new PointerEvent("pointercancel")));
  assert.equal(await hint.getAttribute("data-visible"), null);
  assert.equal(await hint.getAttribute("data-pressed"), null);
  await page.mouse.move(20, 100);
  await page.mouse.up();

  // Rapid leave/re-entry retargets the running scale without a fresh zero frame.
  await link.hover();
  await waitForRest();
  const retargetRect = await link.boundingBox();
  // Scrolling dismisses the hint; move again after hover's auto-scroll settles.
  await page.mouse.move(retargetRect.x + 20, retargetRect.y + retargetRect.height / 2);
  await waitForRest();
  await page.mouse.move(20, 100);
  await page.waitForTimeout(65);
  // Move directly: locator.hover waits for the inline arrow's layout to settle.
  await page.mouse.move(retargetRect.x + 20, retargetRect.y + retargetRect.height / 2);
  const retargetScale = await surface.evaluate((node) => ({
    scale: new DOMMatrix(getComputedStyle(node).transform).a,
    visible: node.closest(".cursor-hint").hasAttribute("data-visible"),
    immediate: node.closest(".cursor-hint").hasAttribute("data-immediate"),
  }));
  assert(retargetScale.visible && retargetScale.scale > .5, JSON.stringify(retargetScale));
  await waitForRest();
  await page.mouse.move(20, 100);
  await page.waitForTimeout(220);
  assert.equal(await hint.evaluate((node) => getComputedStyle(node).visibility), "hidden");

  // A target at the viewport edge uses final dimensions even while scaling.
  await link.evaluate((node) => node.dispatchEvent(new PointerEvent("pointermove", {
    bubbles: true, pointerType: "mouse", clientX: innerWidth - 3, clientY: innerHeight - 3,
  })));
  const edge = await hint.boundingBox();
  const viewport = await page.evaluate(() => ({
    width: innerWidth, root: document.documentElement.getBoundingClientRect().toJSON(),
    left: document.querySelector(".cursor-hint").style.left,
  }));
  assert(edge.x >= 12 && edge.x + edge.width <= 1440 - 12, JSON.stringify({ edge, viewport }));
  assert(edge.y >= 12 && edge.y + edge.height <= 900 - 12, JSON.stringify(edge));
  await page.keyboard.press("Escape");
  assert.equal(await hint.getAttribute("data-visible"), null);

  const copy = page.locator(".copy-email > button");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true, value: { writeText: async () => {} },
  }));
  await copy.hover();
  assert.equal(await hint.getAttribute("data-icon"), "copy");
  await copy.click();
  await page.waitForFunction(() => document.querySelector(".cursor-hint").dataset.icon === "check");
  assert.equal(await label.textContent(), "Email copied");
  await waitForRest();
  await page.screenshot({ path: join(output, "browser-copied.png") });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.hover();
  assert.equal(await hint.evaluate((node) => node.getAnimations({ subtree: true }).length), 0);
  assert.equal(await surface.evaluate((node) => getComputedStyle(node).transform), "none");
  assert.equal(await hint.getAttribute("data-visible"), "");
  await page.mouse.move(20, 100);
  assert.equal(await hint.evaluate((node) => getComputedStyle(node).visibility), "hidden");

  await page.setViewportSize({ width: 834, height: 1112 });
  await link.hover();
  await page.screenshot({ path: join(output, "browser-tablet.png") });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await hint.evaluate((node) => getComputedStyle(node).display), "none");
  await page.screenshot({ path: join(output, "browser-mobile.png") });
  assert.deepEqual(errors, []);
  console.log("PASS: compact tooltip, original typography, inverted surface, Line Awesome icons, press/cancel, rapid retarget, edges, clipboard, reduced motion and responsive states");
  console.log(`Screenshots: ${output}`);
} finally {
  await context.close();
  await browser.close();
}
