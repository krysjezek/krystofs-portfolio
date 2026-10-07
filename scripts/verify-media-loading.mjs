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

  // Media placeholders shimmer only while an unloaded poster is in the viewport.
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const shimmerContext = await browser.newContext({
      viewport: { width: 412, height: 823 }, reducedMotion,
    });
    const shimmerPage = await shimmerContext.newPage();
    let releaseAll;
    const allPosters = new Promise(resolve => { releaseAll = resolve; });
    await shimmerPage.route(/\/_next\/image\?/, async route => {
      await allPosters;
      await route.continue();
    });
    try {
      await shimmerPage.goto(base, { waitUntil: "domcontentloaded" });
      await shimmerPage.locator(".media.is-loading").first().waitFor();
      const placeholder = shimmerPage.locator(".media.is-loading").first();
      assert.equal(
        await placeholder.evaluate(element => getComputedStyle(element, "::after").animationName),
        reducedMotion === "reduce" ? "none" : "shimmer",
        "reduced motion holds the placeholder still",
      );
      if (reducedMotion === "no-preference") {
        // A grace period keeps cached posters from flashing a sweep they never need.
        assert.equal(
          await placeholder.evaluate(element => getComputedStyle(element, "::after").animationDelay),
          "0.3s",
        );
      }
      // Offscreen artwork must not animate: a long gallery never sweeps every card at once.
      const state = await shimmerPage.evaluate(() =>
        [...document.querySelectorAll(".media")].map(media => {
          const box = media.getBoundingClientRect();
          return {
            loading: media.classList.contains("is-loading"),
            onscreen: box.width > 0 && box.bottom > 0 && box.top < innerHeight,
          };
        }));
      assert(state.some(item => item.onscreen), "expected artwork in the viewport");
      assert(state.some(item => !item.onscreen), "expected artwork below the fold");
      for (const item of state)
        assert.equal(item.loading, item.onscreen, "shimmer is limited to in-viewport artwork");
      releaseAll();
      await shimmerPage.waitForFunction(() => !document.querySelector(".media.is-loading"));
      console.log(`PASS: shimmer placeholder, ${reducedMotion}`);
    } finally {
      releaseAll();
      await shimmerContext.close();
    }
  }

  // A poster that never arrives stops its own shimmer instead of sweeping forever.
  const brokenContext = await browser.newContext({ viewport: { width: 412, height: 823 } });
  const brokenPage = await brokenContext.newPage();
  await brokenPage.route(/\/_next\/image\?/, route => route.fulfill({ status: 404, body: "" }));
  try {
    await brokenPage.goto(base, { waitUntil: "domcontentloaded" });
    await brokenPage.waitForFunction(() => {
      const media = document.querySelector(".media");
      return media && !media.classList.contains("is-loading");
    });
    assert.equal(await brokenPage.locator(".media.is-loading").count(), 0);
    console.log("PASS: a failed poster ends its shimmer");
  } finally {
    await brokenContext.close();
  }
} finally {
  releasePoster();
  await context.close();
  await browser.close();
}
