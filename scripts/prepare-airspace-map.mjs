import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

// Rebuild the static map from checked-in geographic data. No runtime tile/API requests.
const { paths } = JSON.parse(await readFile('design/airspace/map-areas.json', 'utf8'))
const naturalEarth = JSON.parse(await readFile('data/prague-map.json', 'utf8'))
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="432" height="200" viewBox="0 0 432 200">
<title>Prague and surrounding countryside</title>
<desc>OpenStreetMap contributors, ODbL 1.0; Natural Earth public-domain roads and rivers. Local projection shared with aircraft positions.</desc>
<path id="land" fill="#f3f1eb" d="M0 0H432V200H0Z"/>
<g transform="translate(0 10)" stroke-linecap="round" stroke-linejoin="round">
<path id="urban" fill="#e8e6df" d="${paths.urban.join('')}"/>
<path id="green" fill="#d4e6c5" d="${paths.green.join('')}"/>
<path id="water" fill="#a9d9ea" d="${paths.water.join('')}"/>
<path id="rivers" fill="none" stroke="#a9d9ea" stroke-width="1.65" d="${naturalEarth.rivers}"/>
<path id="road-edge" fill="none" stroke="#d3d0c7" stroke-width="1.3" d="${naturalEarth.roads}"/>
<path id="road" fill="none" stroke="#ffffff" stroke-width=".8" d="${naturalEarth.roads}"/>
</g><circle cx="216" cy="100" r="78" fill="none" stroke="#3b82d0" stroke-opacity=".25" stroke-width=".4" stroke-dasharray="2 3"/></svg>`
await mkdir('public/images/airspace', { recursive: true })
await writeFile('design/airspace/prague-map-v1.svg', svg)
await writeFile('public/images/airspace/prague-map-v1.svg', svg)
await sharp(Buffer.from(svg)).resize(1536).webp({ quality: 82 }).toFile('public/images/airspace/prague-map-v1.webp')
console.log(`Prepared map SVG: ${(Buffer.byteLength(svg) / 1024).toFixed(0)} KB`)
