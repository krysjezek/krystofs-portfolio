# Portfolio 2027 approved design handoff

Updated 2026-09-23 following the owner’s audit decisions. This replaces the earlier open-findings report. Figma and documentation were edited; the production website, routes, SEO and media delivery were not changed.

[Decisions & QA](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=271-3) · [Case studies](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=92-1937) · [404](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=279-1365) · [Feedback](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=281-806)

## Case-study references

The original Vizcom frames retain their IDs on **10 · Case studies**. All six cases follow the [case-study rules](portfolio-2027-case-study-rules.md), including the distinct Work/Fun content, named Work credits, identity icons and media crops. Those rules supersede the earlier uniform migration.

| Case route | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| `/work/vizcom` | [92:1937](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=92-1937) | [100:2952](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=100-2952) | [100:2870](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=100-2870) |
| `/work/valkaai` | [277:6138](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-6138) | [277:6363](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-6363) | [277:6584](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-6584) |
| `/work/the-mag-w-rap-2025` | [277:6763](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-6763) | [277:7037](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-7037) | [277:7307](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-7307) |
| `/work/barbour` | [277:7532](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-7532) | [277:7804](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-7804) | [277:8072](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-8072) |
| `/work/the-vsx-sports-bra` | [277:8297](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-8297) | [277:8523](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-8523) | [277:8745](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-8745) |
| `/work/chainer` | [277:8929](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-8929) | [277:9170](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-9170) | [277:9407](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=277-9407) |

404: [Desktop](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=279-1365), [Tablet](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=279-1493), [Mobile](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=279-1617).

## Approved handoff decisions

**Scope**

The current design is authoritative. Work / Fun / About are tabs of the single homepage. Six existing case studies and the new 404 now use the Vizcom design system at desktop, tablet and mobile sizes.

**Resolved**

Gallery destinations and no-link semantics; footer targets; 18 recognition URLs; app-wide label style; responsive documentation; six case layouts; published-only recommendations; loading, copy and retry states.

**Deliberately open**

F03 contrast adjustment is deferred. F11 weather provider will be chosen later. Prague time uses Europe/Prague and weather failure hides only the weather.

**Where to review**

10 · Case studies contains the six cases and 404 in 1440, 834 and 390 widths. 04 · Interactions contains Feedback / Email copy, Route status and Background media. This task changes Figma and the handoff, not the live website.

## Links and card behavior

**Gallery links**

Vizcom → /work/vizcom
ValkaAI → /work/valkaai
Barbour → /work/barbour
Victoria’s Secret → /work/the-vsx-sports-bra
Chainer → /work/chainer
The Mag Wrap → /work/the-mag-w-rap-2025

**External gallery links**

Motion Mockups → https://www.motionmockups.com/
C++ Render Engine → https://gitlab.fel.cvut.cz/jezekkr2/pcc-ray-tracing
ReliveAR → https://www.instagram.com/relive.ar/

**Informational cards**

Shelby, Custom Mockups, STNCK, Outland / Rounds, Gusto, Trezor, Fantasy, Frozen Jewelry, Blender addon, Renders, Erem, Tweezers Jewelry, FWA logo, Vojta Zizka and CGI Karlin have no destination. Hover labels still work. Default cursor; no grab, no action tooltip, no click reaction, no tab stop. No case study is required.

**Footer and contact**

Each footer label has its own target: mailto:krystof@jezek.me, x.com/krysjezek, instagram.com/krystof.jezek, linkedin.com/in/krystofjezek, github.com/krysjezek. Utility Email uses copy feedback; prose “email me” is mailto. Recognition rows use all 18 exact source URLs from code; View resume opens /other/cv.

## One homepage · existing routes

**Tabs**

Work is the default tab on /. Fun and About are local tab states, never /fun or /about routes. Use an accessible tablist: roving tabindex, Left/Right/Home/End to move, Enter/Space activates. Keep focus on the activated tab; the panel is labelled by its tab. Inactive panels are hidden/inert.

**History**

Changing tabs does not add browser-history entries. Preserve the active tab, focused card and scroll in the existing homepage history entry before navigating to a case. Browser Back restores them. Direct homepage load defaults to Work. Authored case Back/Home controls return to / with the case’s category selected: Work for the four Work cases, Fun for The Mag Wrap and Chainer.

**SEO preservation**

Keep current case URLs, canonical metadata, structured data, portfolioRoutes and featuredCreativeWorks. Work/Fun/About share the homepage canonical. No extra tab sitemap entries. Existing service/CV routes retain their policies. /work/old-projects/* remain direct archives with noindex,nofollow and no public listings. /test/depth stays out of navigation.

**404 and More case studies**

Sample two unique published cases per page entry. More excludes the current route. Keep the sampled choice stable during the visit and across hydration; do not randomize on every render. 404 returns real HTTP 404 and remains non-indexable. Never offer an unlinked card. Figma uses fixed illustrative samples; case links inside this page navigate to the matching-width frame.

## Reading order and layout

**Desktop Work — canonical columns**

Column 1: Vizcom → Shelby → Victoria’s Secret → Barbour
Column 2: Motion Mockups → Custom Mockups → STNCK → Outland / Rounds
Column 3: ValkaAI → Gusto → Trezor → Fantasy

**Desktop Fun — canonical columns**

Column 1: C++ Render Engine → Frozen Jewelry → The Mag Wrap → Blender addon
Column 2: Chainer → ReliveAR → Renders → Erem
Column 3: Tweezers Jewelry → FWA logo → Vojta Zizka → CGI Karlin

**DOM and keyboard contract**

Desktop reads column 1 top-to-bottom, then column 2, then column 3. DOM, screen-reader and focus order use that same sequence. Keep the current compact ordering from its reference frames; tablet reads its authored columns, mobile its single stack. Reconcile one DOM representation when crossing a breakpoint, retaining focus by project ID; never use positive tabindex or CSS-only reordering that disagrees with reading order.

**Current geometry wins**

Desktop composition is never re-sorted by priority or shortest-column logic. Tablet About has two equal padded text cells, then all eight photos. Mobile related cards deliberately have 20px insets and 24px vertical gap. Other case media uses 5px gutters. The narrow Vizcom detail uses cover crop.

## Shared typography and media

**One label throughout the app**

Portfolio / Label: Roobert PRO Regular 11/16, +2% tracking. Tags: surface/tag, 3px corner, 4px vertical and 10px horizontal padding; no stroke. Titles use text/primary; metadata and disciplines use text/secondary. The obsolete 9.5px style is removed. Caption/status text shares the typography; not every label needs a background.

**Background video**

Retain current EmbedVideo / BackgroundVideo behavior: poster first, preferred H.265 then AV1 then H.264; muted loop, playsInline, preload none, mount at the current viewport threshold. Reduced motion/data saver retain the poster. Case heroes are 16:10; portrait videos are cropped to 3:4; media in each row shares a height with 5px gutters and no empty pockets. Preserve source masters, captions and useful alt text.

**Failure and source embeds**

Loading retains the poster and reserved space. A real video failure shows Video unavailable + Try again, while preserving the poster. The new cases contain only photos and background videos, with no YouTube/Vimeo player cards or media click-throughs. Existing embed-only sources need authorised masters and delivery encodes before implementation; do not invent URLs. The Vimeo launch film uses the existing Chainer project poster in the Figma still preview because oEmbed supplied no thumbnail.

**Asset completeness**

The five additional cases use 35 existing posters/stills, inspected with ffprobe. Seven WebP stills also have lossless PNG previews inside Figma because its renderer did not display the uploaded WebP bytes. Published WebP files remain unchanged; no upscale or CDN replacement. Source sequences are retained, including the entries previously presented as Mag’s two embeds, Barbour’s four embeds and BTS clips, VSX’s five clips and Chainer’s ten media entries. Figma now specifies background-video treatment for moving media. Existing codec gaps and embed source acquisition are tracked for implementation.

## Feedback and accessibility

**Email copy**

Idle → Copying… → Email copied, only after clipboard success. Keep address selectable and control width stable. Announce once through a polite live region. Restore after 1600ms. Failure: Couldn’t copy the email + selectable address + Try again; never show success early. Prose email links retain mailto.

**Page loading and retry**

Real case-route navigation retains outgoing content and focus. Opening… appears only after 250ms. Failed navigation shows Couldn’t open this page + Try again, preserving context. Retry requests the same destination. Homepage tabs switch locally without a route-loading state.

**Interaction semantics**

Only linked cards expose native anchors and the View project / Visit site hint. Keyboard focus reveals labels and a 2px ring; hover never removes it. Touch labels stay visible. No grab cursor. Dialog: focus title, trap focus, inert background, Escape/Close/backdrop dismiss, restore opener and scroll.

**Design references**

Feedback / Email copy: 281:806
Feedback / Route status: 281:807
Feedback / Background media: 281:808
Figma transitions simulate state changes. Clipboard permissions, network failures, focus management and media loading must be verified in the browser during implementation.

## Source and implementation notes

- `components/RecognitionModal.jsx`: all 18 records and URLs.
- `app/work/*/page.jsx`: existing content, full credits and media sequence.
- `app/seo.js`: public-case eligibility and SEO source of truth.
- `components/EmbedVideo.jsx`, `components/BackgroundVideo.jsx`, `docs/video-and-media.md`: poster/codec/loading behavior. Existing missing codec variants remain explicit asset work; never invent URLs.
- Cross-page Figma prototypes use matching-width prototype URLs because Figma disallows direct NAVIGATE across pages. Related cases on the case page use native prototype navigation. These URLs do not replace the website route contracts.
- The 404 requires a real HTTP 404 response in the later implementation. This design task does not create `app/not-found.jsx`.

## Verification

- Inspected the running homepage and extracted actual links.
- Verified all 18 recognition URLs across three dialog components.
- Verified two distinct eligible recommendations on all 18 case references, with no self-links.
- Structural checks on 21 case/404 screens found no out-of-bounds text or stale Vizcom body copy in migrated cases.
- Proved label-style propagation through the main component, homepage instance and recommendation; restored the original 11px value.
- Inspected source dimensions with ffprobe; corrected compact variant artwork and Figma still rendering.
- Visually reviewed all six desktop case compositions, a tablet case, mobile case and 404, and copy/media feedback variants. Corrected label wrapping, compact recommendation artwork, and missing WebP previews.
- `npm run lint` passed with 61 existing warnings and no errors; `npm run build` passed (Next.js 16.2.10); `git diff --check` passed. No runtime redesign was implemented or deployed.

## Deliberately deferred

- F03: contrast adjustment, per owner.
- F11: weather provider selection. Clock, units and graceful weather omission are defined.

No push or deployment is included.
