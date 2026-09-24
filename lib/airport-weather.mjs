const number = value => Number.isFinite(value) ? value : null;

export function normalizeAirportWeather(data, now = Date.now()) {
  const w = data?.[0];
  const observedAt = w?.obsTime * 1000;
  if (w?.icaoId !== "LKPR" || !Number.isFinite(w.obsTime) || observedAt < 1e12 || observedAt > now + 60000) throw new Error("Invalid METAR");
  return {
    observedAt, temp: number(w.temp), dew: number(w.dewp),
    wind: w.wdir === "VRB" ? "VRB" : Number.isFinite(w.wdir) && w.wdir >= 0 && w.wdir <= 360 ? w.wdir : null,
    speed: Number.isFinite(w.wspd) && w.wspd >= 0 ? w.wspd : null,
    visibility: /^(\d+(\.\d+)?\+?)$/.test(String(w.visib)) ? w.visib : null,
    pressure: number(w.altim),
    clouds: Array.isArray(w.clouds) ? w.clouds.filter(c => c && typeof c.cover === "string").map(c => ({ cover: c.cover.slice(0, 10), base: number(c.base) })) : [],
    raw: typeof w.rawOb === "string" ? w.rawOb : "",
  };
}
