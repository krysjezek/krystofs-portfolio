// Run after npm run build. Check schema against actual page media, including
// undated editorial records, so a missing date cannot conceal stale media URLs.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { assetUrl, videoAssets } from '../app/seo.js';

const cases = JSON.parse(await readFile('content/cases.json', 'utf8'));
const gallery = JSON.parse(await readFile('content/gallery.json', 'utf8'));
const pages = JSON.parse(await readFile('content/pages.json', 'utf8'));
const readGraph = async path => {
  const file = path === '/' ? 'index' : path.slice(1);
  const html = await readFile(`.next/server/app/${file}.html`, 'utf8');
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .flatMap(match => JSON.parse(match[1])['@graph'] || []);
};
const normalize = path => decodeURI(assetUrl(decodeURI(path)));
const displayedCaseMedia = project => [
  project.hero,
  ...project.rows.flat().map(index => project.media[index]),
  ...(project.chapters || []).map(chapter => chapter.media),
].filter(Boolean);

const home = await readGraph('/');
assert.equal(home.filter(node => node['@type'] === 'VideoObject').length, 0, 'Homepage must not claim removed reels');
const list = home.find(node => node['@type'] === 'ItemList');
assert(list, 'Homepage featured-work list must be rendered');
const works = home.filter(node => node['@type'] === 'CreativeWork');
const linkedCases = new Set([...gallery.work.cards, ...gallery.fun.cards]
  .map(card => card.href).filter(href => href?.startsWith('/work/')));
assert.deepEqual(new Set(works.map(work => new URL(work.url).pathname)), linkedCases);
assert.deepEqual(new Set(list.itemListElement.map(item => item.item['@id'])), new Set(works.map(work => work['@id'])));
assert.deepEqual(list.itemListElement.map(item => item.position), works.map((_, index) => index + 1));

for (const video of videoAssets) {
  assert(video.page !== '/', 'No legacy homepage reel records');
  assert(!video.embedUrl, 'Poster-only source embeds must not become playable video claims');
  const project = cases.find(project => project.path === video.page);
  const media = project ? displayedCaseMedia(project) : pages[video.page]?.media;
  if (media) {
    assert(media.some(item => item.srcMp4 && normalize(item.srcMp4) === normalize(video.contentUrl)
      && normalize(item.poster) === normalize(video.thumbnailUrl)), `${video.name}: delivery/poster must match displayed media`);
  } else {
    assert.equal(video.page, '/services/3d-environments');
    const component = await readFile('components/portfolio/Worlds.jsx', 'utf8');
    assert(component.includes(`srcMp4: "${video.contentUrl}"`));
    assert(component.includes(`poster: "${video.thumbnailUrl}"`));
  }
  if (video.uploadDate) {
    assert.match(video.uploadDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(video.uploadDate).toISOString().slice(0, 10), video.uploadDate);
  }
}

let count = 0;
for (const path of new Set([...cases.map(project => project.path), ...videoAssets.map(video => video.page)])) {
  const graph = await readGraph(path);
  const emitted = graph.filter(node => node['@type'] === 'VideoObject');
  const dated = videoAssets.filter(video => video.page === path && video.uploadDate);
  assert.equal(emitted.length, dated.length, `${path}: only explicitly dated videos may be emitted`);
  for (const video of emitted) {
    const source = dated.find(item => normalize(item.contentUrl) === decodeURI(video.contentUrl));
    assert(source, `${path}: unexpected video`);
    assert.equal(video.uploadDate, source.uploadDate, 'Publication dates must not be inferred from project dates');
    assert.equal(video.thumbnailUrl, assetUrl(source.thumbnailUrl));
    assert.equal(video.mainEntityOfPage, `https://www.krystofjezek.com${path}`);
    assert(!video.transcript, 'Visual summaries of silent footage are descriptions, not transcripts');
  }
  const work = graph.find(node => node['@type'] === 'CreativeWork');
  if (work) assert.deepEqual(new Set((work.hasPart || []).map(part => part['@id'])), new Set(emitted.map(video => video['@id'])), `${path}: video references must resolve`);
  count += emitted.length;
}
console.log(`Passed: ${works.length} homepage projects, ${videoAssets.length} current media records, ${count} dated VideoObjects, no stale embeds or dangling references.`);
