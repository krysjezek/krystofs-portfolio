// MET Norway symbol codes describe the next hour, not a live observation.
export function describeWeather(symbol) {
  const [code, period] = (symbol || "").split("_");
  const simple = {
    clearsky: period === "night" ? "Clear sky" : "Sunny",
    fair: period === "night" ? "Mostly clear" : "Mostly sunny",
    partlycloudy: "Partly cloudy", cloudy: "Cloudy", fog: "Foggy",
  };
  if (simple[code]) return simple[code];
  // The provider retains two misspelled 'lights...' thunderstorm codes.
  const normalized = code.replace(/^lightss/, "lights");
  if (!/^(light|heavy)?(rain|sleet|snow)(showers)?(andthunder)?$/.test(normalized)) return null;
  const intensity = normalized.startsWith("heavy") ? "Heavy " : normalized.startsWith("light") ? "Light " : "";
  const type = normalized.includes("sleet") ? "sleet" : normalized.includes("snow") ? "snow" : "rain";
  const text = intensity + type + (normalized.includes("showers") ? " showers" : "") + (normalized.includes("thunder") ? " and thunder" : "");
  return text[0].toUpperCase() + text.slice(1);
}

export function weatherIcon(symbol) {
  const [code = "", period] = (symbol || "").split("_");
  if (code.includes("thunder")) return "thunderstorm";
  if (code.includes("snow") || code.includes("sleet")) return "snowflake";
  if (code.includes("rain")) return "cloud-rain";
  if (code === "fog") return "cloud-wind";
  if (code === "cloudy") return "cloud";
  if (code === "fair" || code === "partlycloudy") return period === "night" ? "cloud-moon" : "cloud-sun";
  if (code === "clearsky") return period === "night" ? "moon" : "sun";
  return "temperature";
}

export function currentForecast(forecast, now = Date.now()) {
  if (forecast.properties?.meta?.units?.air_temperature !== "celsius") throw new Error("Unexpected temperature unit");
  const hours = forecast.properties.timeseries;
  if (!Array.isArray(hours)) throw new Error("Missing forecast");
  const closest = hours.reduce((best, hour) => {
    const distance = Math.abs(Date.parse(hour.time) - now);
    const temperature = hour.data?.instant?.details?.air_temperature;
    if (!Number.isFinite(temperature) || !Number.isFinite(distance) || distance > 90 * 60 * 1000) return best;
    const symbol = hour.data?.next_1_hours?.summary?.symbol_code || null;
    return !best || distance < best.distance ? { distance, temperature, time: hour.time, symbol, condition: describeWeather(symbol) } : best;
  }, null);
  if (!closest) throw new Error("No current forecast");
  return { temperature: Math.round(closest.temperature), time: closest.time, condition: closest.condition, symbol: closest.symbol };
}
