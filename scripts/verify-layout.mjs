import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

// Reference coordinates are measured from Figma, never recorded from the app.
const reference = JSON.parse(
  await readFile(
    new URL("./fixtures/portfolio-layout.json", import.meta.url),
    "utf8",
  ),
);
const browser = process.env.LAYOUT_CDP_URL
  ? await chromium.connectOverCDP(process.env.LAYOUT_CDP_URL)
  : await chromium.launch();
const context = await browser.newContext({
  reducedMotion: "reduce",
  viewport: { width: 1440, height: 844 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const base = process.env.LAYOUT_BASE_URL || "http://localhost:3000";
let checks = 0;
const failures = [];

try {
  for (const screen of reference.screens) {
    await page.setViewportSize({ width: screen.width, height: 844 });
    await page.goto(base + screen.route);
    await page.evaluate(() => document.fonts.ready);
    if (screen.tab) {
      await page.locator(`#tab-${screen.tab}`).click();
      const columns = screen.width < 600 ? 1 : screen.width < 1100 ? 2 : 3;
      await page.waitForFunction(
        (columns) =>
          document.querySelectorAll("#panel-work .gallery-column").length ===
          columns,
        columns,
      );
    }
    for (const anchor of screen.anchors) {
      const element = page.locator(anchor.selector).nth(anchor.index || 0);
      const actual = await element.evaluate((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y + scrollY,
          width: rect.width,
          height: rect.height,
        };
      });
      for (const key of ["x", "y", "width", "height"]) {
        if (anchor[key] === undefined) continue;
        checks++;
        if (Math.abs(actual[key] - anchor[key]) > reference.tolerance)
          failures.push(
            `${screen.frame} ${screen.width}px ${anchor.selector}[${anchor.index || 0}] ${key}: ${actual[key].toFixed(2)}, expected ${anchor[key]}`,
          );
      }
    }
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Horizontal overflow: ${screen.frame}`,
    );
    const rules = page.locator(".page-grid > span:visible");
    const ruleCount =
      screen.width < 600
        ? 0
        : screen.width >= 1100 || screen.route === "/services/3d-environments"
          ? 4
          : 3;
    assert.equal(await rules.count(), ruleCount, `Grid rules: ${screen.frame}`);
    for (let index = 0; index < ruleCount; index++) {
      const rule = await rules.nth(index).boundingBox();
      assert(
        Math.abs(rule.x - (index * (screen.width - 0.5)) / (ruleCount - 1)) <
          reference.tolerance,
      );
      assert.equal(rule.width, 0.5);
      assert.equal(
        await rules
          .nth(index)
          .evaluate((n) => getComputedStyle(n).backgroundColor),
        "rgb(210, 210, 210)",
      );
    }
  }

  // The canvas and reading widths must stay fixed on wider displays.
  await page.setViewportSize({ width: 1920, height: 1000 });
  for (const route of ["/", "/work/vizcom", "/services/3d-environments"]) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    const canvas = await page.locator(".portfolio-shell").boundingBox();
    assert.equal(canvas.width, 1440);
    assert.equal(canvas.x, 240);
    assert.equal(await page.locator(".page-grid > span:visible").count(), 4);
  }

  // Modal layout and keyboard dismissal remain usable after font/grid changes.
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    await page.getByRole("tab", { name: "About", exact: true }).click();
    await page.getByRole("button", { name: "More info", exact: true }).click();
    const dialog = page.getByRole("dialog");
    assert.equal(await dialog.locator("article").count(), 18);
    assert.equal(
      (await dialog.boundingBox()).width,
      width === 390 ? 390 : 1000,
    );
    assert.equal(
      await dialog
        .locator("header")
        .evaluate((n) => n.getBoundingClientRect().height),
      width === 390 ? 97.5 : 127.5,
    );
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent),
      "More info",
    );
  }

  assert.deepEqual(errors, [], "Browser runtime errors");
  assert.deepEqual(failures, [], "Figma coordinate differences");
  console.log(
    `PASS: ${reference.screens.length} Figma screens, ${checks} coordinate checks (±${reference.tolerance}px), 1920px canvas, and recognition dialog.`,
  );
} finally {
  await context.close();
  await browser.close();
}
