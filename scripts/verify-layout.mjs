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
  : await chromium.launch({ ignoreDefaultArgs: ["--hide-scrollbars"] });
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
    // Figma measures the content canvas; classic scrollbars occupy extra space.
    const gutter = await page.evaluate(
      () => innerWidth - document.body.clientWidth,
    );
    if (gutter)
      await page.setViewportSize({ width: screen.width + gutter, height: 844 });
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
          x:
            rect.x -
            document.querySelector(".portfolio-shell").getBoundingClientRect()
              .x,
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
      const canvas = await page.locator(".portfolio-shell").boundingBox();
      assert(
        Math.abs(
          rule.x - canvas.x - (index * (screen.width - 0.5)) / (ruleCount - 1),
        ) < reference.tolerance,
      );
      assert.equal(rule.width, 0.5);
      assert.equal(rule.y, canvas.y, "Column rules start at the page top");
      assert.equal(
        rule.height,
        canvas.height,
        "Column rules reach the page bottom",
      );
      assert.equal(
        await rules
          .nth(index)
          .evaluate((n) => getComputedStyle(n).backgroundColor),
        "rgb(237, 237, 237)",
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
    const dividers = await page
      .locator(
        ".site-header, .site-footer, .portfolio-navigation, .case-specifications:visible, .recommendations, .worlds-deliverables, .worlds-gallery-intro, .worlds-fit",
      )
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const style = getComputedStyle(
            node,
            node.matches(".site-header") ? "::after" : "::before",
          );
          return {
            width: parseFloat(style.width),
            height: parseFloat(style.height),
            pageWidth: document.body.clientWidth,
          };
        }),
      );
    for (const divider of dividers) {
      assert.equal(
        divider.width,
        divider.pageWidth,
        "Horizontal divider spans the page",
      );
      assert.equal(divider.height, 0.5);
    }
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Full-width dividers must not create horizontal scrolling",
    );
  }

  // Switching between overflowing galleries and a short About page must not
  // change the canvas position. The short page's footer meets the viewport edge.
  for (const [width, height] of [
    [1920, 1400],
    [1280, 1600],
    [834, 1600],
    [390, 2400],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    let initial;
    for (const tab of ["Work", "About", "Fun", "About", "Work"]) {
      await page.getByRole("tab", { name: tab, exact: true }).click();
      const state = await page.evaluate(() => {
        const canvas = document
          .querySelector(".portfolio-shell")
          .getBoundingClientRect();
        const footer = document
          .querySelector(".site-footer")
          .getBoundingClientRect();
        return {
          x: canvas.x,
          width: canvas.width,
          navTop:
            document
              .querySelector(".portfolio-navigation")
              .getBoundingClientRect().top + scrollY,
          footerBottom: footer.bottom + scrollY,
          contentBottom:
            document
              .querySelector("[role=tabpanel]:not([hidden])")
              .getBoundingClientRect().bottom + scrollY,
          footerTop: footer.top + scrollY,
        };
      });
      initial ||= state;
      assert.equal(state.x, initial.x, `Tab shifts sideways at ${width}px`);
      assert.equal(
        state.width,
        initial.width,
        `Tab changes width at ${width}px`,
      );
      assert.equal(
        state.navTop,
        initial.navTop,
        `Tab changes header layout at ${width}px`,
      );
      assert(
        state.footerTop >= state.contentBottom + 34.9,
        "Footer overlaps content",
      );
      if (tab === "About")
        assert(
          Math.abs(state.footerBottom - height) < 0.6,
          `Footer above viewport bottom at ${width}px`,
        );
    }
  }

  // Modal layout and keyboard dismissal remain usable after font/grid changes.
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    const gutter = await page.evaluate(
      () => innerWidth - document.body.clientWidth,
    );
    if (gutter)
      await page.setViewportSize({ width: width + gutter, height: 844 });
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
    `PASS: ${reference.screens.length} Figma screens, ${checks} coordinate checks (±${reference.tolerance}px), stable tab layout, bottom-aligned footer, 1920px canvas, and recognition dialog.`,
  );
} finally {
  await context.close();
  await browser.close();
}
