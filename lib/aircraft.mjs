export const CENTER = { lat: 50.0755, lon: 14.4378 }
export const RADIUS_KM = 30
export const STALE_MS = 60000
export const EXPIRE_MS = 120000
const rad = Math.PI / 180
const finite = (n) => typeof n === 'number' && Number.isFinite(n)

export function distanceKm(lat, lon) {
  const a = Math.sin((lat - CENTER.lat) * rad / 2) ** 2 +
    Math.cos(CENTER.lat * rad) * Math.cos(lat * rad) * Math.sin((lon - CENTER.lon) * rad / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Local equirectangular projection; identical for geography and aircraft.
export function project(lat, lon) {
  const scale = 78 / RADIUS_KM
  return [216 + (lon - CENTER.lon) * 111.195 * Math.cos(CENTER.lat * rad) * scale,
    90 - (lat - CENTER.lat) * 111.195 * scale]
}

export function normalizeAircraft(raw, receivedAt = Date.now()) {
  if (!Array.isArray(raw.ac) || !finite(raw.now) || raw.msg !== 'No error') throw new Error('Invalid ADSB response')
  const observedAt = raw.now > 1e12 ? raw.now : raw.now * 1000
  if (observedAt > receivedAt + 60000 || observedAt < 1e12) throw new Error('Invalid observation time')
  const aircraft = raw.ac.filter(a => finite(a.lat) && finite(a.lon) &&
    Math.abs(a.lat) <= 90 && Math.abs(a.lon) <= 180 && finite(a.seen_pos) && a.seen_pos >= 0 &&
    a.seen_pos < 120 && typeof a.hex === 'string' && a.alt_baro !== 'ground' &&
    distanceKm(a.lat, a.lon) <= RADIUS_KM).map(a => ({
    id: a.hex, callsign: a.flight?.trim() || null, aircraftType: a.t?.trim() || null,
    lat: a.lat, lon: a.lon, observedAt: observedAt - a.seen_pos * 1000,
    altitude: finite(a.alt_baro) ? a.alt_baro : null,
    speed: finite(a.gs) && a.gs >= 0 ? a.gs : null,
    track: finite(a.track) ? ((a.track % 360) + 360) % 360 : null,
  }))
  return { observedAt, receivedAt, aircraft: [...new Map(aircraft.map(a => [a.id, a])).values()] }
}

// Dead reckoning is explicitly estimated, bounded to 30 s, and never applied
// without an observed ground speed AND track. Do not infer heading from identity.
export function displayedPosition(aircraft, now, reducedMotion = false) {
  const age = Math.max(0, now - aircraft.observedAt)
  const estimated = !reducedMotion && age > 0 && aircraft.speed !== null && aircraft.track !== null
  const seconds = estimated ? Math.min(age / 1000, 30) : 0
  const km = aircraft.speed * 1.852 * seconds / 3600
  const lat = aircraft.lat + km * Math.cos(aircraft.track * rad) / 111.195
  const lon = aircraft.lon + km * Math.sin(aircraft.track * rad) / (111.195 * Math.cos(aircraft.lat * rad))
  return { point: project(lat, lon), estimated, stale: age >= STALE_MS, age }
}

// Blend a new report from the last rendered pose, while the new target keeps
// moving. Shortest-angle rotation avoids a full spin when crossing north.
export function smoothAircraftPose(aircraft, now, correction, reducedMotion = false) {
  const position = displayedPosition(aircraft, now, reducedMotion)
  const progress = correction ? Math.min(1, Math.max(0, (now - correction.startedAt) / 2000)) : 1
  const weight = reducedMotion || position.stale ? 0 : 1 - progress * progress * (3 - 2 * progress)
  return {
    ...position,
    point: position.point.map((value, i) => value + (correction?.offset[i] || 0) * weight),
    heading: (aircraft.track || 0) + (correction?.headingOffset || 0) * weight,
  }
}

export function retryDelay(value, now = Date.now()) {
  const seconds = Number(value)
  const delay = value && Number.isFinite(seconds) ? seconds * 1000 : Date.parse(value) - now
  return Math.max(60000, Number.isFinite(delay) ? delay : 60000)
}

export function mergeAircraft(previous, next) {
  if (previous?.observedAt === next.observedAt) return previous
  const trails = Object.fromEntries(next.aircraft.map(a => {
    const history = (previous?.trails?.[a.id] || []).filter(p => a.observedAt - p.at < EXPIRE_MS)
    if (!history.length || a.observedAt > history.at(-1).at) history.push({ point: project(a.lat, a.lon), at: a.observedAt })
    return [a.id, history.slice(-5)]
  }))
  return { ...next, trails }
}
