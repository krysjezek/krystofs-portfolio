import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch();
const base = process.env.MEDIA_BASE_URL || "http://localhost:3000";
const context = await browser.newContext({ viewport: { width: 412, height: 823 } });
const page = await context.newPage();
const videos = [];
page.on("request", request => {
  if (request.resourceType() === "media") videos.push(request.url());
});
let releasePoster;
const posterGate = new Promise(resolve => { releasePoster = resolve; });
await page.route(/\/_next\/image\?.*outland-rounds-card-v2/, async route => {
  await posterGate;
  await route.continue();
});

try {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  assert.deepEqual(videos, [], "Video must not compete with the initial poster");
  const first = page.locator("#project-outland-rounds");
  assert.equal(await first.locator("img").getAttribute("fetchpriority"), "high");
  releasePoster();
  await page.waitForFunction(() => {
    const video = document.querySelector("#project-outland-rounds video");
    return video && !video.paused && video.currentTime > 0;
  });
  assert(await first.locator("img").evaluate(img => img.complete && img.naturalWidth > 0));
  assert(!videos.some(url => url.includes("motion-mockups")), "A thin visible edge must not download another film");
  await page.locator("#project-motion-mockups").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const video = document.querySelector("#project-motion-mockups video");
    return video && !video.paused && video.currentTime > 0;
  });
  await page.getByRole("tab", { name: "About", exact: true }).click();
  await page.waitForTimeout(700);
  assert(await page.locator("#panel-work video").evaluateAll(nodes => nodes.every(video => video.paused)));
  // An unusually tall frame must still start; fixed percentage thresholds fail here.
  await page.getByRole("tab", { name: "Fun", exact: true }).click();
  const tall = page.locator('#project-blender-addon');
  await tall.evaluate(node => { node.style.height = "4000px"; });
  await tall.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const video = document.querySelector("#project-blender-addon video");
    return video && !video.paused && video.currentTime > 0;
  });
  console.log("PASS: poster-first requests, high-priority LCP, deferred edge videos, scroll playback, hidden-tab pause and tall frames");

  // Every rendered poster carries an inline blurred placeholder, so artwork is
  // recognisable before the full-size poster arrives rather than being a blank box.
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const blurContext = await browser.newContext({
      viewport: { width: 412, height: 823 }, reducedMotion,
    });
    const blurPage = await blurContext.newPage();
    let releaseAll;
    const allPosters = new Promise(resolve => { releaseAll = resolve; });
    await blurPage.route(/\/_next\/image\?/, async route => {
      await allPosters;
      await route.continue();
    });
    try {
      await blurPage.goto(base, { waitUntil: "domcontentloaded" });
      await blurPage.locator(".media img").first().waitFor({ state: "attached" });
      const state = await blurPage.evaluate(() =>
        [...document.querySelectorAll(".media img")].map(img => ({
          alt: img.alt || "(untitled)",
          blurred: /url\(["']?data:image\//.test(img.style.backgroundImage || ""),
        })));
      assert(state.length >= 20, `expected the gallery, saw ${state.length} posters`);
      assert.deepEqual(state.filter(item => !item.blurred), [],
        "every rendered poster must carry an inline placeholder");
      // The blur replaces the shimmer on media; the primitive stays for the airspace panel.
      assert.equal(await blurPage.locator(".media.is-loading").count(), 0);
      releaseAll();
      // The placeholder is handed off once the real poster paints.
      await blurPage.waitForFunction(() => {
        const img = document.querySelector("#project-outland-rounds img");
        return img && img.complete && img.naturalWidth > 0
          && !/url\(["']?data:image\//.test(img.style.backgroundImage || "");
      });
      console.log(`PASS: inline blur placeholder, ${reducedMotion} (${state.length} posters)`);
    } finally {
      releaseAll();
      await blurContext.close();
    }
  }

} finally {
  releasePoster();
  await context.close();
  await browser.close();
}
