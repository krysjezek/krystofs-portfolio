/**
 * Generates inline low-quality image placeholders (LQIP) for rendered media.
 *
 * Downloads each poster/still from Blob, downscales it to a 32px-wide WebP and
 * writes the result back onto its own record as a base64 `lqip` data URI, which
 * Media hands to next/image as blurDataURL. The placeholder is inline, so it
 * costs no request and paints with the HTML.
 *
 * Only content files the app actually imports are touched; the *-media.json
 * delivery records are provenance, not render data, and are left alone.
 * Icons, emoji and identity marks are excluded: they render at <=64px and
 * arrive in a single packet, so a blurred placeholder under them buys nothing.
 *
 * Requires ffmpeg on PATH.
 *   node scripts/generate-lqip.mjs --list    report scope, write nothing
 *   node scripts/generate-lqip.mjs           generate and update records
 *   node scripts/generate-lqip.mjs --print /videos/posters/x.jpg
 */

import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const CDN = process.env.NEXT_PUBLIC_CDN_URL || "https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com";
const WIDTH = 32;
const FILES = ["gallery.json", "cases.json", "pages.json", "profile.json", "worlds.json"];
const MEDIA_PATH = /^\/(images|videos)\//;

// Media renders `poster || src`; Worlds overrides that with `preview || poster`.
// `preview` is prose everywhere else, so only treat it as artwork in worlds.json.
function mediaKey(node, file) {
  const candidates = file === "worlds.json"
    ? [node.preview, node.poster, node.src]
    : [node.poster, node.src];
  return candidates.find(value =>
    typeof value === "string" && MEDIA_PATH.test(value) && !value.endsWith(".svg"));
}

function walk(node, file, visit) {
  if (Array.isArray(node)) return node.forEach(child => walk(child, file, visit));
  if (!node || typeof node !== "object") return;
  const key = mediaKey(node, file);
  if (key) visit(node, key);
  for (const value of Object.values(node)) walk(value, file, visit);
}

// A blurred placeholder under a transparent mark paints a colour blob where the
// artwork is see-through, so identity logos are skipped rather than blurred.
const ALPHA = /^(rgba|bgra|argb|abgr|ya8|ya16|pal8|yuva)/;

async function lqipFor(path, work) {
  const response = await fetch(`${CDN}${path}`);
  if (!response.ok) throw new Error(`${response.status} for ${path}`);
  const source = join(work, "source" + (path.match(/\.[a-z0-9]+$/i)?.[0] || ".bin"));
  await writeFile(source, Buffer.from(await response.arrayBuffer()));
  const { stdout } = await run("ffprobe", ["-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=pix_fmt", "-of", "csv=p=0", source]);
  if (ALPHA.test(stdout.trim())) return null;
  const target = join(work, "lqip.webp");
  await run("ffmpeg", ["-y", "-loglevel", "error", "-i", source,
    "-vf", `scale=${WIDTH}:-2`, "-q:v", "30", target]);
  return `data:image/webp;base64,${(await readFile(target)).toString("base64")}`;
}

const mode = process.argv[2];

if (mode === "--print") {
  const work = await mkdtemp(join(tmpdir(), "lqip-"));
  try { console.log(await lqipFor(process.argv[3], work)); }
  finally { await rm(work, { recursive: true, force: true }); }
  process.exit(0);
}

// Collect every record first so one asset is fetched once, however often it is used.
const records = new Map();
const originals = new Map();
for (const file of FILES) {
  const raw = await readFile(join("content", file), "utf8");
  const data = JSON.parse(raw);
  // Refuse to rewrite a file our formatter would reshape; a churned diff hides the real change.
  const roundTrip = JSON.stringify(data, null, 2) + "\n";
  if (roundTrip !== raw.replace(/\r\n/g, "\n"))
    throw new Error(`${file} does not round-trip cleanly; aborting rather than reformatting it`);
  originals.set(file, data);
  walk(data, file, (node, key) => {
    if (!records.has(key)) records.set(key, []);
    records.get(key).push(node);
  });
}

const paths = [...records.keys()].sort();
console.log(`${paths.length} unique assets across ${FILES.length} files, ${[...records.values()].reduce((n, list) => n + list.length, 0)} records`);
if (mode === "--list") {
  for (const path of paths) console.log(`  ${path} (${records.get(path).length})`);
  process.exit(0);
}

const work = await mkdtemp(join(tmpdir(), "lqip-"));
let done = 0, failed = [], transparent = [];
try {
  const queue = [...paths];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const path = queue.shift();
      const slot = await mkdtemp(join(work, "a-"));
      try {
        const lqip = await lqipFor(path, slot);
        if (!lqip) {
          transparent.push(path);
          for (const node of records.get(path)) delete node.lqip;
          console.log(`  ${++done}/${paths.length} ${path} skipped (transparent)`);
          continue;
        }
        for (const node of records.get(path)) node.lqip = lqip;
        console.log(`  ${++done}/${paths.length} ${path} ${lqip.length}B`);
      } catch (error) {
        failed.push(`${path}: ${error.message}`);
      }
    }
  }));
} finally {
  await rm(work, { recursive: true, force: true });
}

for (const file of FILES)
  await writeFile(join("content", file), JSON.stringify(originals.get(file), null, 2) + "\n");

console.log(`\nWrote ${done - transparent.length} placeholders into ${FILES.join(", ")}`);
if (transparent.length)
  console.log(`Skipped ${transparent.length} transparent marks: ${transparent.join(", ")}`);
if (failed.length) {
  console.log(`\n${failed.length} failed:`);
  for (const message of failed) console.log(`  ${message}`);
  process.exit(1);
}
