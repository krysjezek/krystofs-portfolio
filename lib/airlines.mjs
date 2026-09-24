import airlines from '../content/airlines.json' with { type: 'json' }

const operators = new Map(airlines.flatMap(airline =>
  Object.entries(airline.operators).map(([icao, name]) => [icao, { name, icon: airline.icon }]),
))

// Reported ICAO callsigns identify operators, not marketing flight numbers.
// Require a numeric flight suffix to avoid matching registrations or bare codes.
export function airlineForCallsign(callsign) {
  if (typeof callsign !== 'string') return null
  const match = /^([A-Z]{3})([A-Z0-9]{1,5})$/.exec(callsign.trim().toUpperCase())
  return match && /\d/.test(match[2]) ? operators.get(match[1]) || null : null
}
