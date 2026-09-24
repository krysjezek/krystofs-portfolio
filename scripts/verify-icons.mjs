import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright";

const root = new URL("../", import.meta.url);
const icons = JSON.parse(await readFile(new URL("content/interface-icons.json", root), "utf8"));
const identities = JSON.parse(await readFile(new URL("content/icons.json", root), "utf8"));

for (const [name, icon] of Object.entries(icons)) {
  const asset = await readFile(new URL(`public${icon.src}`, root));
  assert.equal(createHash("sha256").update(asset).digest("hex"), icon.sha256, `${name}: preserve exact Figma export`);
  const svg = asset.toString("utf8");
  assert.match(svg, /<svg[^>]*width="24"[^>]*height="24"[^>]*viewBox="0 0 24 24"/);
  assert.match(svg, /<path\s/);
  assert(!/<(?:image|rect|script)\b/.test(svg), `${name}: artwork only, no opaque backplate or raster substitute`);
  assert.equal(icon.library, "Unicons Line");
  assert.match(icon.sourceNode, /^408:/);
}

const files = await readdir(new URL("components/portfolio/", root));
for (const file of files.filter((name) => name.endsWith(".jsx"))) {
  const source = await readFile(new URL(`components/portfolio/${file}`, root), "utf8");
  assert(!/<svg\b|cursor-eye\.svg|cursor-message\.svg|arrow-leftup\.svg|CheckIcon/.test(source), `${file}: no mixed or handwritten UI icons`);
  for (const match of source.matchAll(/<Icon\b[^>]*\bname="([^"]+)"/g))
    assert(icons[match[1]], `${file}: registered interface icon ${match[1]}`);
}
assert.deepEqual(Object.keys(identities).sort(), ["motionMockups", "x", "xSmall"]);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(process.env.INTERACTION_BASE_URL || "http://localhost:3000");
  for (const icon of Object.values(icons)) {
    const response = await page.request.get(new URL(icon.src, page.url()).href);
    assert(response.ok(), icon.src);
    assert.match(response.headers()["content-type"], /image\/svg\+xml/);
  }
  assert.equal(await page.locator('.header-utility .ui-icon, .header-utility .identity-icon').count(), 0, "Header is location, time and temperature only");
  const email = page.locator('.contact-copy [data-ui-icon="email"]');
  assert.equal(await email.evaluate(node => node.getBoundingClientRect().width), 15);
  assert(await page.locator('.contact-copy img.identity-icon').count() > 0, "Keep inline X identity artwork");
  await email.hover();
  assert.equal(await page.locator('.cursor-hint').getAttribute('data-icon'), 'email');
  const inverse = await page.locator('.cursor-hint [data-ui-icon="email"]').evaluate(node => ({
    width: node.getBoundingClientRect().width,
    color: getComputedStyle(node).color,
    mask: getComputedStyle(node, '::before').maskImage,
  }));
  assert.equal(inverse.width, 12);
  assert.equal(inverse.color, 'rgb(255, 255, 255)');
  assert(inverse.mask.includes('/icons/unicons/email.svg'));
  await page.goto(new URL("/work/vizcom", page.url()).href);
  assert(await page.locator(".identity-icon").count() >= 5, "Keep case-study client and credit logos");
  assert.deepEqual(errors, []);
  console.log("PASS: six exact Unicons Line exports, source-only UI icons, shared sizes/colors, inverse state, and preserved identity marks");
} finally {
  await browser.close();
}
