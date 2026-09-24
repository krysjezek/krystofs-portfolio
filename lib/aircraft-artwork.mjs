// Illustrative size categories, based only on the reported ICAO aircraft type.
// These are map symbols, not to-scale drawings or wake-turbulence classifications.
export const aircraftCategories = {
  light: { label: 'Light aircraft', size: 26, icon: '/images/airspace/aircraft-light-muted-v1.png', selectedIcon: '/images/airspace/aircraft-light-blue-v2.png' },
  turboprop: { label: 'Turboprop', size: 30, icon: '/images/airspace/aircraft-turboprop-muted-v1.png', selectedIcon: '/images/airspace/aircraft-turboprop-blue-v2.png' },
  jet: { label: 'Jet', size: 34, icon: '/images/airspace/aircraft-jet-muted-v1.png', selectedIcon: '/images/airspace/aircraft-jet-blue-v2.png' },
  widebody: { label: 'Wide-body jet', size: 42, icon: '/images/airspace/aircraft-widebody-muted-v1.png', selectedIcon: '/images/airspace/aircraft-widebody-blue-v2.png' },
  fourengine: { label: 'Four-engine wide-body', size: 46, icon: '/images/airspace/aircraft-fourengine-muted-v1.png', selectedIcon: '/images/airspace/aircraft-fourengine-blue-v2.png' },
  unknown: { label: 'Unclassified aircraft', size: 14, icon: null },
}

const groups = {
  light: 'C150 C152 C162 C172 C177 C182 C185 C206 C208 C210 C303 C310 C340 C402 C404 C414 C421 C441 DA20 DA40 DA42 DA50 DA62 P28A P28B P28R P28T PA28 PA31 PA32 PA34 PA44 PA46 SR20 SR22 S22T PC12 BE33 BE35 BE36 M20P M20T P06T RV7 RV8 RV9 RV10 Z42 Z43 Z50 Z142 Z242',
  turboprop: 'AT43 AT45 AT46 AT72 AT73 AT75 AT76 DH8A DH8B DH8C DH8D D328 SF34 SB20 BE20 BE30 B350 B190 D228 DHC6 L410 JS31 JS32 JS41',
  jet: 'A318 A319 A320 A321 A19N A20N A21N B712 B731 B732 B733 B734 B735 B736 B737 B738 B739 B37M B38M B39M B3XM B752 B753 E170 E175 E75L E75S E190 E195 E290 E295 CRJ1 CRJ2 CRJ7 CRJ9 CRJX F70 F100 SU95 BCS1 BCS3 C25A C25B C25C C510 C525 C550 C560 C56X C650 C680 C68A C700 C750 CL30 CL35 CL60 GL5T GL7T GLF4 GLF5 GLF6 GLFA GLEX FA50 FA7X FA8X F900 LJ35 LJ40 LJ45 LJ60 PC24',
  widebody: 'A306 A310 A332 A333 A338 A339 A359 A35K B762 B763 B764 B772 B773 B77L B77W B778 B779 B788 B789 B78X',
  fourengine: 'A342 A343 A345 A346 A388 B741 B742 B743 B744 B748 B74R B74S IL96',
}
const types = new Map(Object.entries(groups).flatMap(([category, codes]) => codes.split(' ').map(code => [code, category])))

export function aircraftArtwork(type) {
  const category = typeof type === 'string' && types.get(type.trim().toUpperCase()) || 'unknown'
  return { category, ...aircraftCategories[category] }
}
