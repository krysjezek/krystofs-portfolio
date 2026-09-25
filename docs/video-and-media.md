# Media in Portfolio 2027

Delivery files live in Vercel Blob. Ignored public/images and public/videos are staging directories; original masters need separate storage. The complete preparation and upload standard is in [AGENTS.md](../AGENTS.md).

## Runtime

components/portfolio/Media.jsx accepts a media record containing poster (or src for a still), alt, aspect and optional srcH265, srcAv1, srcMp4 and legacy srcWebm. Pass sizes and priority on the component. aspect reserves the display area before loading; object-fit covers the authored crop. Case heroes use 16:10.

The Next Image poster appears first (quality 90 for video, 75 for stills). Video mounts when its frame first intersects the viewport, with preload none, muted autoplay, loop and playsInline. Using the frame edge avoids percentage thresholds that cannot be reached by very tall cards. The poster stays visible until playback actually starts, then the video fades in over 360ms. Mounted videos pause when offscreen, in hidden tabs or in a background document, and resume when visible. Source order is H.265, AV1, H.264. The complete AV1 codec identifier is required for Chromium capability detection. Unsupported source errors must not be mistaken for failure of the entire video; final failure leaves the poster and a retry button.

Reduced-motion and data-saver preferences keep the poster. Preference changes are observed while the page is open. Do not mount YouTube/Vimeo players in current case studies. Archives can retain original embeds.

## Records and provenance

- content/outland-rounds-media.json: owner-supplied Card BCG, Wide Indoor 16x9 hero and seven distinct device, merchandise and course clips. Full-duration 30fps deliveries preserve the selected 16:9, 3:4 and square source compositions. The case uses equal-height mixed rows and stacks each composition on mobile. Original masters remain in the supplied Outland Rounds Dropbox folder. Rounds uses the visually inspected official SVG wordmark from rounds.cc; Outland marks reuse the verified Vizcom assets.

- content/shelby-media.json: owner-supplied April 2026 device and merch mockups for Ashfall Studio, square homepage card, phone still and official identity marks. Full-duration videos retain 30 fps, with 1440x810 landscape, 1080x1440 portrait and 1080x1080 square deliveries. The MacBook opens the case in the standard 16:10 display crop; mixed rows pair iPad/pin, badge/phone and bottle/clothing. Original masters remain in the supplied Shelby Dropbox folder.
- content/cases.json: current case media and explicit source-master-needed records.
- content/outpost-fantasy-media.json: owner-supplied Fantasy reel excerpt, homepage CARD BCG, three device stills and official identity marks, with delivery hashes and remotely verified media properties. Original masters remain in the supplied Dropbox folder.
- content/outpost-gusto-media.json: owner-supplied Card BCG, full 16:9 Gusto showreel and six selected motion details. Landscape deliveries use 1440×810 and portrait deliveries 1080×1350, at 30 fps without audio. The case pairs landscape and 3:4 display crops at equal heights, then stacks them on mobile. Original masters remain in the supplied Outpost Gusto Dropbox folder; the Gusto wordmark comes from the official site.
- content/vojta-zizka-media.json: supplied Patreon card/section clip, ProductionBot market-chart demo, prepared credits still and verified explainer links. Both videos retain their source dimensions and 30 fps; masters remain in Downloads. The case has no header media; the Patreon section uses the owner-requested 16:9 video.
- content/worlds.json: original service video deliveries.
- content/design-assets.json: prepared Figma assets, node IDs, dimensions and SHA-256 hashes.
- content/gallery-media.json: prepared Work/Fun card videos, original sources, encoding settings, dimensions and delivery hashes. These use the existing project and FOOH clips, including Barbour London, Arctic Landscape (Frozen Jewelry), Bouncy Greens (CGI Karlin) and Gemstone (Tweezers). New versioned deliveries preserve source proportions, omit audio, cap frame rates at 30fps and include all three codecs plus first-frame posters. Gallery display crops remain in gallery.json; case-study media records are separate. Erem uses the second video (CpX0iy8DMEJ) from the owner?s Instagram post CpX0vqDsmAk, retrieved at 720?720/30fps; its source copy with audio is preserved in the external portfolio media archive, while the card deliveries are silent.
- content/media-inventory.json: checkpoint reference inventory, not a claim that every old asset is available.

Some Figma thumbnails are small source images. They were not enlarged. Replace them only from a better master, preserving the authored composition.

## Publishing

Use WebP around quality 82 for new raster artwork and SVG for vectors. Inspect sources with ffprobe, strip metadata, preserve aspect ratio, and never upscale. New videos require H.265, AV1 and H.264 plus a first-frame JPEG poster; see AGENTS.md for exact encoding settings.

scripts/prepare-design-assets.mjs consumes a temporary download manifest with id, node, url, dest and cap. Temporary Figma URLs must not be committed. The resulting checked manifest can be uploaded with scripts/upload-design-assets.mjs; its optional argument filters paths. It verifies local hashes and remote content types. Supply BLOB_READ_WRITE_TOKEN only through the process environment.

For general staging uploads use scripts/upload-to-blob.mjs, or scripts/upload-posters.mjs for posters. Use a new versioned slug when replacing published bytes. Verify codec selection, deferred requests, poster-first display, playback and reduced motion in a browser; HEAD checks alone do not prove playback.
