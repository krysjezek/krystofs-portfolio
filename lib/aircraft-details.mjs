const text = value => typeof value === 'string' && value.trim() ? value.trim().slice(0, 160) : null

export function normalizeRoute(data, callsign) {
  // Standing data is a callsign match, never a confirmed live flight plan.
  // Do not collapse multi-leg routes into a guessed current leg.
  if (data?.callsign !== callsign || !Array.isArray(data._airports) || data._airports.length !== 2) return null
  const airports = data._airports.map(a => ({
    code: text(a?.iata) || text(a?.icao), city: text(a?.location) || text(a?.name),
  }))
  if (airports.some(a => !a.code || !a.city)) return null
  return { from: airports[0], to: airports[1], confirmed: false }
}

export function normalizeModel(data, id) {
  const aircraft = data?.response?.aircraft
  if (text(aircraft?.mode_s)?.toLowerCase() !== id.toLowerCase()) return null
  const model = text(aircraft.type)
  const manufacturer = text(aircraft.manufacturer)
  if (!model) return null
  return manufacturer && !model.toLowerCase().startsWith(manufacturer.toLowerCase()) ? `${manufacturer} ${model}` : model
}
