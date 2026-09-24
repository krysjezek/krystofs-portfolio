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
        // Approved follow-up: desktop gallery gutters now sit on exact thirds.
        // This changes card widths and therefore masonry/page heights from Figma.
        // Keep the original fixture; verify the new geometry separately below.
        if (
          screen.width >= 1100 &&
          ["work", "fun"].includes(screen.tab) &&
          (key === "height" ||
            (key === "width" && anchor.selector.includes(".project-card")))
        ) continue;
        let expected = anchor[key];
        // Owner-approved Fun crops: Handheld 4:3 -> 1:1, Mag 4:3 -> 16:9.
        // Keep Figma's fixture and calculate only the resulting height delta.
        if (screen.tab === "fun" && key === "height" && anchor.selector === ".portfolio-shell") {
          const cardWidth = screen.width < 600 ? screen.width - 10 : (screen.width - 15) / 2;
          expected += cardWidth * (screen.width < 600 ? 1 / 16 : 1 / 4);
        }
        checks++;
        if (Math.abs(actual[key] - expected) > reference.tolerance)
          failures.push(
            `${screen.frame} ${screen.width}px ${anchor.selector}[${anchor.index || 0}] ${key}: ${actual[key].toFixed(2)}, expected ${expected}`,
          );
      }
    }
    if (screen.tab === "fun") {
      for (const [id, ratio] of [["blender-addon", 1], ["the-mag-wrap", 16 / 9]]) {
        const card = await page.locator(`#panel-fun [data-project="${id}"]`).boundingBox();
        assert(Math.abs(card.width / card.height - ratio) < 0.001, `${id} keeps its requested ratio at ${screen.width}px`);
        checks++;
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
    if (screen.tab && ["work", "fun"].includes(screen.tab) && ruleCount) {
      const columns = page.locator(`#panel-${screen.tab} .gallery-column`);
      const canvas = await page.locator(".portfolio-shell").boundingBox();
      const endings = await columns.evaluateAll((nodes) =>
        nodes.map((column) => {
          const cards = [...column.querySelectorAll(".project-card")];
          const last = cards.at(-1);
          return {
            bottom: last.getBoundingClientRect().bottom,
            mediaBottom: last.querySelector(".media").getBoundingClientRect().bottom,
            gaps: cards.slice(1).map((card, index) =>
              card.getBoundingClientRect().top - cards[index].getBoundingClientRect().bottom,
            ),
          };
        }),
      );
      for (const ending of endings) {
        assert(Math.abs(ending.bottom - endings[0].bottom) < 0.1, "Gallery columns end together");
        assert(Math.abs(ending.mediaBottom - ending.bottom) < 0.1, "Media fills the balanced final card");
        assert(ending.gaps.every((gap) => Math.abs(gap - 5) < 0.1), "Vertical card gaps stay 5px");
      }
      for (let index = 0; index < (await columns.count()) - 1; index++) {
        const left = await columns.nth(index).locator(".project-card").first().boundingBox();
        const right = await columns.nth(index + 1).locator(".project-card").first().boundingBox();
        const rule = await rules.nth(index + 1).boundingBox();
        assert(Math.abs(right.x - left.x - left.width - 5) < 0.04, "5px card gutter");
        assert(Math.abs((left.x + left.width + right.x) / 2 - rule.x - rule.width / 2) < 0.04, "Column rule centered in card gutter");
        assert(Math.abs(rule.x + rule.width / 2 - canvas.x - canvas.width * (index + 1) / (ruleCount - 1)) < 0.04, "Column rule on structural grid");
      }
    }
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

  // Owner-approved compact recognition popover, separate from page geometry.
  for (const width of [1440, 834, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base);
    await page.getByRole("tab", { name: "About", exact: true }).click();
    const trigger = page.getByRole("button", { name: "Mentions and credits", exact: true });
    await trigger.click();
    const popover = page.getByRole("dialog");
    assert.equal(await popover.locator("article").count(), 18);
    const bounds = await popover.boundingBox();
    assert.equal(bounds.width, await page.evaluate(() => Math.min(420, document.documentElement.getBoundingClientRect().width - 32)));
    assert(bounds.height <= 480 && bounds.height > 200);
    assert(bounds.x >= 0 && bounds.x + bounds.width <= width);
    assert(bounds.y >= 16 && bounds.y + bounds.height <= 828);
    assert((await popover.locator("header").boundingBox()).height >= 76);
    const headerY = (await popover.locator("header").boundingBox()).y;
    await popover.locator(".recognition-list").evaluate(n => { n.scrollTop = n.scrollHeight; });
    assert.equal((await popover.locator("header").boundingBox()).y, headerY);
    assert(await popover.locator("article").last().isVisible());
    await page.keyboard.press("Escape");
    await popover.waitFor({ state: "hidden" });
    assert(await trigger.evaluate(n => n === document.activeElement));
  }

  assert.deepEqual(errors, [], "Browser runtime errors");
  assert.deepEqual(failures, [], "Figma coordinate differences");
  console.log(
    `PASS: ${reference.screens.length} Figma screens, ${checks} coordinate checks (±${reference.tolerance}px), stable tab layout, bottom-aligned footer, 1920px canvas, and recognition popover.`,
  );
} finally {
  await context.close();
  await browser.close();
}
