import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch();
const base = process.env.INTERACTION_BASE_URL || "http://localhost:3000";
const errors = [];

async function checkFooter(page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  // isVisible alone does not detect content hidden by an opacity animation.
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".site-footer > *")].every((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= innerHeight &&
        getComputedStyle(element).opacity === "1";
    }),
    null,
    { timeout: 3000 },
  );
  assert.equal(await page.locator(".site-footer a").count(), 5);
}

try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
    { width: 834, height: 1194 },
    { width: 390, height: 844 },
    { width: 844, height: 390 },
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/work/vizcom"]) {
      await page.goto(`${base}${route}`);
      // Wait for hydration before scrolling; resizing would cancel reveals
      // and accidentally conceal the regression.
      await page.waitForFunction(() =>
        document.querySelector(".site-footer nav").getAnimations().length > 0,
      );
      await checkFooter(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await checkFooter(page);
      await page.locator(".site-footer a").first().focus();
      assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), "Email");
      console.log(`PASS: footer on ${route} at ${viewport.width}x${viewport.height}`);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base);
    await checkFooter(page);
    await context.close();
  }
  assert.deepEqual(errors, [], "Browser runtime errors");
} finally {
  await browser.close();
}
