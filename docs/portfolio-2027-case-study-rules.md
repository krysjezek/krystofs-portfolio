# Portfolio 2027 case-study rules

Owner-approved direction, 23 September 2026. Applies to every new or revised case study. This supersedes earlier case-study instructions about full credits on every page, preserving every source ratio, and embedded YouTube/Vimeo players. Vizcom remains the layout reference.

[Figma case studies](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=275-5951) · [Figma rules board](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=306-363) · [Frame directory and route contracts](portfolio-2027-handoff-audit.md)

## Work and Fun

| Category | Current cases | Page treatment |
| --- | --- | --- |
| Work | Vizcom, ValkaAI, Barbour, Victoria’s Secret / VSX Sports Bra | Work date label, client/agency/deliverable specifications, named credits |
| Fun | The Mag Wrap 2025, Chainer | Fun date label, personal introduction, no client/agency specifications or credits |

Fun pages must not call themselves work projects or discuss clients. Explain what was made and explored. This classification does not imply that the original project was unpaid or self-initiated. Keep the shared Vizcom typography, grid, media, narrative rhythm and footer; distinguish Fun through its content and leaner structure. Authored Back/Home controls return to the corresponding homepage tab. Browser Back restores the previous tab, focused card and scroll.

## Header specifications

Work uses **Client | Agency | Deliverable**, in that order. For a mockup the middle label is **Brand**. When working directly with the client, leave the middle cell genuinely empty: no dash, “Direct”, duplicate client or invented agency. Keep the desktop column position and reading order.

| Case | Client | Agency / Brand | Deliverable |
| --- | --- | --- | --- |
| Vizcom | Outland | Brand: Vizcom | Animated brand mockup and stills |
| ValkaAI | ValkaAI | Agency: Less and Better | Glass-prism logo animation |
| Barbour | Barbour | Agency: Monopo London | CGI campaign films |
| VSX Sports Bra | Victoria’s Secret | Agency: TMRZV Studio | CGI product film |

Do not put views, likes, impressions, reach or other audience metrics in the header. Descriptions of actual outputs may include durations, resolutions and quantities when supported by the source project.

Every client, agency and brand name has its own identity icon and real link. The agent creating the case must find and inspect a suitable mark from the organisation’s official site or an existing verified asset. Reuse the shared linked-identity component and icon slot; do not substitute an arbitrary letter or decorative symbol. Check the rendered instance, since an inherited deleted-icon override can hide an otherwise correct component property.

## Narrative and voice

All cases read **Brief → Process → My role → Result**. The existing placement of media between narrative pairs is intentional.

For Work, explain the task, decisions, personal contribution and delivered result. For Fun, retain that sequence using:

1. **Brief / Why I did it** — motivation and what I wanted to explore.
2. **Process / Tools & thinking process** — actual tools, experiments and decisions.
3. **My role / What I made** — the parts I made and how they fit together.
4. **Result / What I learned** — a concrete takeaway, not a marketing claim.

Use plain, first-person language, short sentences and specific observations. Avoid inflated outcomes, invented client praise or generic agency language. The current Fun reflections are editorial drafts inferred from the existing project descriptions, not quotations. Mag’s named tools come from the current case source. Chainer’s source confirms 3D, sound and web work but not an exact software list; its copy names those disciplines instead of inventing applications. Add exact applications only when verified.

Verified numbers may appear **inside the Result paragraph**, in black, with the reusable anchored [source note](portfolio-2027-source-notes.md). The note explains the measurement or calculation, source, date and scope; it is separate from the cursor tooltip. Optional extended Impact can follow Result when needed. Distinguish campaign totals from the artist’s contribution and correlation from causation. Do not reuse an old unsourced views/likes claim merely because it is in the code. VSX has no audience figures because its source post was deleted. Barbour uses **About 407k views** across four linked city Reels, based on rounded public counters observed on 23 September 2026. Drop the old average-view and engagement-comparison claims. Keep the note open while exploring the figure, gap or panel; close it after leaving the whole region.

## Credits

Work credit rows use role plus **[Icon] Person name**. Do not append or repeat the company/brand in the name. Keep the existing shared icon sizing and spacing.

- Kryštof Ježek uses the existing green designer mark.
- Less and Better contributors, including **Dominik Smuchar**, use the LAB mark.
- Vizcom has separate **Jordan Jenkins** and **Evan Place** entries, each using the Outland mark, plus Kryštof Ježek.
- Monopo contributors use the Monopo mark; Artem Morozov uses TMRZV’s mark.
- Other individually named collaborators retain the existing credit icon treatment; these marks are design affiliations, not claimed personal logos.
- Fun pages have no credits section.

The VS source credits “TMRZV Studio” for sound design/compositing without an individual’s name. That company-only row is omitted from the new person-only design. Do not silently attribute that work to Artem Morozov; add it when the individual is confirmed. The source website remains unchanged.

## Media geometry and behaviour

- Opening images/videos use a **16:10** frame at every breakpoint. Crop with cover/fill; never stretch. Barbour uses its current header poster, cropped into that frame. VSX uses the owner-supplied knitting header clip with the same 16:10 display crop. **Outpost Fantasy (24 September 2026), Gusto (25 September 2026), Rounds (25 September 2026), and Trezor (25 September 2026) are owner-approved exceptions: their opening videos use 16:9 at every breakpoint. Vojta Zizka omits the header video at the owner's request; its Patreon video sits within the Automated Patreon section in 16:9.**
- Portrait videos use **3:4** frames with cover/fill. Barbour uses three portrait tiles per row on desktop/tablet and a single stack on mobile.
- Items in a media row have the same rendered height. Use 16:9 landscape rows or 1:1 square rows where authored; crop mixed source shapes to the row frame. Remove empty pockets caused by mismatched heights. Preserve source order. Gusto, Shelby, Rounds and VSX use owner-requested mixed-ratio rows: widths follow the display aspect ratios to keep equal heights without empty cells; mobile stacks each clip at its own display ratio.
- Keep the intentional **5px** outer media gutters and gaps. “No white spaces” means no vacant cells or letterboxing inside the grid, not removing those gutters.
- Case media is either a photo or a **background video on the page**. No YouTube/Vimeo player cards, play overlays or media click-through links. Figma posters represent the background-video state.
- Keep the existing poster-first `EmbedVideo` / `BackgroundVideo` pipeline: **H.265 → AV1 → H.264**, muted loop, `playsInline`, `preload="none"`, viewport mounting, and poster-only reduced-motion/data-saver behaviour. Loading reserves geometry; actual failure retains the poster and the defined retry feedback.
- Display crops do not change source masters. Do not distort or upscale media. Future preparation/upload follows [video and media conventions](video-and-media.md) and AGENTS.md.

Some current-site entries only provide YouTube/Vimeo embeds. The design now presents their still previews as background-video frames, but this task did not obtain source masters or create delivery encodes. Before implementation, obtain authorised source files, prepare all three codecs and a poster, and verify URLs. Keep the poster if delivery is not ready; never invent codec URLs or reintroduce a player card. The Chainer Vimeo preview uses the existing project poster because the source did not supply a thumbnail. Existing codec gaps remain explicit migration work.

## Icon provenance

Interface/action icons follow the supplied Unicons Line [icon guidelines](portfolio-2027-icons.md). The identity artwork and emojis described here remain unchanged by that standard.

New reusable 15px icon components are on the Components page. Official-site favicons are used at their intended small display size; existing Outland, Vizcom and designer marks are reused.

| Identity | Figma component | Source inspected |
| --- | --- | --- |
| ValkaAI | `296:981` | [Official apple icon](https://valka.ai/apple-icon.png) |
| Barbour | `296:982` | [Official favicon](https://www.barbour.com/on/demandware.static/Sites-barbour-gb-Site/-/default/dw8893e595/images/favicons/favicon-32x32.png) |
| Victoria’s Secret | `296:983` | [Official icon](https://www.victoriassecret.com/assets/m6549-V8Y8Fh1vSzKgvR100yTVg/images/android-chrome-192x192.png) |
| Less and Better | `296:984` | [Official site favicon](https://cdn.prod.website-files.com/6706a826a75feeacbce5dd78/6731feed961b658e1c25c8f3_L-AB%20favicon.png) |
| Monopo London | `296:985` | [Official favicon](https://monopo.london/favicon/favicon-32x32.png) |
| TMRZV Studio | `296:986` | Existing portfolio asset `/images/tmrzvlogo.jpg` on the configured CDN |

## Routes and recommendations

Case studies have a Back control in the header only. The bottom Return home row was removed from the implementation and all 18 responsive Figma case frames on 23 September 2026; the shared footer follows More case studies directly.

Classification does not rename routes. Preserve all six current `/work/...` URLs, metadata, indexing, `featuredCreativeWorks`, sitemaps and robots rules. Work / Fun / About remain states of one homepage. Legacy `/work/old-projects/*` stay unlisted and `noindex, nofollow`.

404 and More case studies draw only from cases that actually have a published page. Both Work and Fun can be eligible. Sample two distinct cases once per page entry, exclude the current case from More, and keep the selection stable across hydration and rerenders. Never use an unlinked gallery card. Figma shows illustrative fixed samples, not runtime randomness.

## Verification before future handoff

Check all cases at 1440, 834 and 390 widths: correct category; header order and visible icons; no audience metrics; person-only Work credits; no Fun clients/credits; four-part narrative; 16:10 heroes; 3:4 portrait crops; equal row heights; no empty media pockets or player actions; valid recommendations. Confirm focal subjects survive each crop. Browser media and accessibility behaviour must be checked when the website implementation changes; static Figma previews do not prove playback.

Applied to all 18 case frames on 23 September 2026. Structural inspection confirmed hero artwork ratios inside the 5px gutters, portrait crops, visible header icons, category-specific sections, equal media-row heights and no overflowing text. Visually reviewed all six desktop compositions, Barbour tablet, Chainer mobile, the corrected Mag grid and the Figma rules board. Lint passed with 61 existing warnings and no errors; the production build passed. Only Figma and documentation changed; no website deployment or media upload was performed.
