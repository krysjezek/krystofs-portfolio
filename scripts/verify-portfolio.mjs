import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const json = async (name) =>
  JSON.parse(await readFile(`content/${name}.json`, "utf8"));
const [cases, gallery, recognition, pages, assets] = await Promise.all(
  ["cases", "gallery", "recognition", "pages", "design-assets"].map(json),
);
const routes = new Set(cases.map((project) => project.path));
assert.equal(routes.size, cases.length, 'Case routes must be unique');
assert(routes.has('/work/outpost-fantasy'));
assert(routes.has('/work/outpost-gusto'));
assert(routes.has('/work/vojta-zizka'));
assert(routes.has('/work/shelby'));
const vojta = cases.find(project => project.slug === 'vojta-zizka');
assert.equal(vojta.date, 'Fun · 2025');
assert.equal(vojta.hero, null);
assert.deepEqual(vojta.chapters.map(chapter => chapter.title), ['Automated Patreon "Thank You"', 'Automated Market Charts']);
assert.equal(vojta.chapters[0].media.aspect, 16 / 9);
assert.deepEqual(vojta.chapters.map(chapter => chapter.explainer), ['https://www.youtube.com/watch?v=lvB0eOoDT_E', 'https://www.youtube.com/watch?v=uLsedHtZuzY']);
assert.equal(recognition.length, 18);
assert.equal(new Set(recognition.map((item) => item.href)).size, 18);
for (const category of ["work", "fun"]) {
  const group = gallery[category];
  assert.equal(group.cards.length, 12);
  const ids = group.cards.map((card) => card.id).sort();
  for (const width of ["desktop", "tablet", "mobile"])
    assert.deepEqual([...group[width]].sort(), ids);
  for (const card of group.cards) {
    if (card.href?.startsWith("/work/")) assert(routes.has(card.href));
    assert(card.aspect > 0 && card.mobileAspect > 0 && card.tabletAspect > 0);
  }
}
for (const project of cases) {
  if (project.category === "fun") {
    assert.equal(project.specs.length, 0);
    assert.equal(project.credits.length, 0);
  }
  // Owner-approved 16:9 opening reels; other cases retain 16:10.
  if (project.hero) assert.equal(project.hero.aspect, ['outpost-fantasy', 'outpost-gusto', 'outland-rounds', 'trezor'].includes(project.slug) ? 16 / 9 : 1.6);
  else assert(project.chapters?.length > 0, 'Cases without a hero need project media');
  for (const index of project.rows.flat()) assert(project.media[index]);
  for (const media of [project.hero, ...project.media, ...(project.chapters || []).map(chapter => chapter.media)].filter(Boolean))
    assert(media.poster || media.src);
}
assert.equal(new Set(assets.map((asset) => asset.path)).size, assets.length);
for (const asset of assets) {
  assert(asset.width <= asset.sourceWidth);
  assert(asset.height <= asset.sourceHeight);
  assert.match(asset.sha256, /^[a-f0-9]{64}$/);
}
const app = ".next/server/app";
const home = await readFile(`${app}/index.html`, "utf8");
assert(!home.includes('href="/work/old-projects/'));
for (const route of [
  ...routes,
  ...Object.keys(pages),
  "/other/work",
  "/other/cv-print",
  "/services/3d-environments",
]) {
  const html = await readFile(`${app}${route}.html`, "utf8");
  assert.equal(
    (html.match(/<main\b/g) || []).length,
    1,
    `${route}: main landmark`,
  );
  assert(
    html.includes(`href="https://www.krystofjezek.com${route}"`),
    `${route}: canonical`,
  );
  if (route.includes("/old-projects/") || route === "/other/cv-print")
    assert(html.includes("noindex, nofollow"), `${route}: archive indexing`);
  if (routes.has(route)) {
    assert(!html.includes("<iframe"));
    assert(!html.includes('href="/work/old-projects/'));
  }
}
const files = await readdir("styles");
assert.deepEqual(files, ["portfolio.css"]);
console.log(
  `Passed: gallery orders, ${routes.size} case routes, 18 recognition URLs, media dimensions, canonicals, main landmarks and archive indexing.`,
);
