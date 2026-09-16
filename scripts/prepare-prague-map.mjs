// Natural Earth is public domain. Keep the extract local: no runtime tile service.
// Rebuild with: node scripts/prepare-prague-map.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { project } from '../lib/aircraft.mjs'

const layers = { rivers: 'ne_10m_rivers_lake_centerlines', roads: 'ne_10m_roads' }
const paths = {}
for (const [name, file] of Object.entries(layers)) {
  const response = await fetch(`https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/${file}.geojson`)
  if (!response.ok) throw new Error(`${file}: ${response.status}`)
  const data = await response.json()
  const chunks = []
  for (const { geometry } of data.features) {
    const lines = geometry.type === 'LineString' ? [geometry.coordinates] : geometry.type === 'MultiLineString' ? geometry.coordinates : []
    for (const line of lines) {
      let drawing = false
      for (let i = 0; i < line.length; i++) {
        const [lon, lat] = line[i]
        const inside = (p) => p && p[0] > 12.3 && p[0] < 16.6 && p[1] > 49.4 && p[1] < 50.8
        if (!inside(line[i]) && !inside(line[i - 1]) && !inside(line[i + 1])) { drawing = false; continue }
        const [x, y] = project(lat, lon)
        chunks.push(`${drawing ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
        drawing = true
      }
    }
  }
  paths[name] = chunks.join('')
}
await mkdir('data', { recursive: true })
await writeFile('data/prague-map.json', JSON.stringify(paths) + '\n')
console.log(`Prague geography: ${JSON.stringify(paths).length} bytes`)
