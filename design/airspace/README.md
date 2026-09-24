# Airspace map and aircraft assets

Designed in Figma before implementation. [Aircraft guide](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=513-1895), marker variants `373:7358`, native editable map `507:1827`.

Aircraft PNGs were generated with the built-in ImageGen tool. Original blue masters and edited muted masters are retained locally in ignored `aircraft-icons/*-master.png`; exact generation prompts are tracked in `aircraft-icons/prompts.json` and `aircraft-icons/muted-prompt.txt`. Each is 1254×1254 RGBA with transparent alpha. Delivery PNGs use twice their displayed size: light 26px, turboprop 30px, jet 34px, twin-engine wide-body 42px, four-engine wide-body 46px. PNG preserves the requested alpha artwork. Deliveries are staged in ignored `public/images/airspace/` and published to Vercel Blob under the paths in `lib/aircraft-artwork.mjs`.

Default uses the muted silver-blue image with a light silhouette edge and neutral shadow. Selection reveals the original blue image with a stronger blue shadow. Both images load together, so selection does not wait for a network request. No circular backplates or estimate halos. Keyboard focus uses the blue shadow; selected/focused aircraft sit above neighbouring targets. Unknown type or heading uses a neutral position symbol rather than an invented orientation.

The Apple Maps-inspired palette uses warm land, pale roads, green vegetation and blue water. This is our own static map rendering, not Apple Maps tiles. Figma map paints are bound to semantic `map/*` variables. The website's map is a 1536×711 WebP (quality 82); original vector artwork stays editable in Figma and `prague-map-v1.svg`.

`map-areas.json` contains simplified projected areas from OpenStreetMap downloaded via Overpass on 2026-09-24. This derived data is © OpenStreetMap contributors, available under [ODbL 1.0](https://www.openstreetmap.org/copyright). Forest multipolygon interiors are retained. Roads and rivers reuse the public-domain Natural Earth data in `data/prague-map.json`. Runways retain the existing OurAirports source. The map and flights use the same projection from `lib/aircraft.mjs`.

Rebuild the map with `node scripts/prepare-airspace-map.mjs`. Map attribution is visible in preview and detail views. Static geographic data avoids new runtime map/tile requests. Type categories are illustrative visual groupings, not exact model drawings or wake-turbulence classes.
