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
} finally {
  releasePoster();
  await context.close();
  await browser.close();
}
