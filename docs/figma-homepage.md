# Current homepage: Figma editing map

Exported 2026-09-16 from the local homepage at source commit `7b5dae7`.
Figma file: `2wt1HbmFsNjaVPKF8tv8YW`.
Page: `67:63` — **Homepage — current site / editable**.

- [Desktop, 1440 × 4332](https://www.figma.com/design/2wt1HbmFsNjaVPKF8tv8YW?node-id=64-63)
- [Mobile, 390 × 3317](https://www.figma.com/design/2wt1HbmFsNjaVPKF8tv8YW?node-id=66-63)
- [Editing guide](https://www.figma.com/design/2wt1HbmFsNjaVPKF8tv8YW?node-id=68-63)

## Returning edits to code

Ask for or use the edited frame URL. Read this map and `figma-homepage-baseline.json`
before implementing. The JSON records the exported text, font assignments, dimensions,
and positions by stable Figma node ID. Compare edited nodes with this baseline and
the source commit; do not assume every difference from today's code is intentional.
Keep unrelated changes. Confirm desktop and mobile behavior in the browser after edits.

The export contains editable native text, frames, shapes, and replaceable image fills.
It is a design handoff, not automatic two-way sync or a published component library.
Section and project layer names identify their source files/selectors. Prefer retaining
these names. A changed Figma frame link plus a short description is sufficient to
locate the intended work; note whether a change applies to one breakpoint or both.

## Section mapping

| Section | Desktop node | Mobile node | Source |
| --- | --- | --- | --- |
| Navigation | `64:689` | `66:476` | `components/Navbar.jsx`, `.navbar` |
| Background grid | `64:64` | `66:64` | `components/Footer.jsx`, `.background` |
| Hero, portrait, introduction, actions | `64:77`, `64:81` | `66:73` | `app/page.jsx`, `.main-hero`, `.footer-left` |
| Motion Mockups banner | `64:134` | within `66:73` | `app/page.jsx`, `.div-block-149` |
| 3D Worlds feature | `64:164` | within `66:73` | `app/page.jsx`, `.proj-item` |
| Client marquee | `64:217` | hidden by site CSS | `app/page.jsx`, `hooks/useMarquee.js` |
| Selected Work | `64:218` | `66:180` | `app/page.jsx`, `.main-projects` |
| Tech Projects | `64:340` | `66:296` | `app/page.jsx`, `#tech-projects` |
| About, experience, education | `64:441` | hidden by site CSS | `app/page.jsx`, `.main-resume` |
| Contact footer | `64:608` | `66:398` | `components/Footer.jsx`, `#footer` |

All shared styling lives in `styles/krystofs-portfolio.webflow.scss`.
Note that the source reuses `id="main-projects"` on the resume section: use its class
or component context to distinguish it from the Selected Work section.

## Project mapping

| Project | Desktop | Mobile | Source link / selector |
| --- | --- | --- | --- |
| Vizcom Brand World | `64:230` | `66:192` | `/work/vizcom`, `.proj-item` |
| ValkaAI | `64:257` | `66:217` | `/work/valkaai`, `.proj-item` |
| Barbour Quilt FOOH | `64:284` | `66:244` | `/work/barbour`, `.proj-item` |
| The VSX Sports Bra | `64:311` | `66:269` | `/work/the-vsx-sports-bra`, `.proj-item` |
| Ray tracing engine | `64:353` | `66:309` | `app/page.jsx`, first `.cp-wrap` |
| Relive AR | `64:379` | `66:334` | `app/page.jsx`, second `.cp-wrap` |
| Video backend | `64:409` | `66:363` | `app/page.jsx`, third `.cp-wrap` |

## Fidelity and interactive behavior

- Roobert's existing webfont bytes were loaded under the family alias **Roobert PRO**
  for capture, as requested. Original weights were retained. **Clashgrotesk** remains
  on headings that actually use it. JetBrains Mono is used in the editing guide;
  the current homepage itself does not use the airport module's monospace style.
- The Figma service cannot load Roobert PRO from its available font catalog. The
  exact font assignment is retained, but the editor needs the custom fonts available
  locally or through the team's font library for accurate text editing/rendering.
- Videos use their actual poster images. Images remain replaceable raster fills;
  the original media files and paths remain in `app/page.jsx`, `EmbedVideo.jsx`, and
  `BackgroundVideo.jsx`. Video playback and underlying CGI scenes are not editable
  Figma objects.
- Capture used reduced motion and loaded lazy images. The fixed background was
  extended over the full document only in the capture browser. Source code was not
  altered for these visual adjustments. Marquee position is one captured moment.
- The capture's extra translation of three mobile project titles was corrected to
  the browser positions. Wrapper auto-layout was disabled only for those title
  transform wrappers (`66:216`, `66:268`, `66:293`).
- Scroll reveals, navbar hiding, hover/tilt, custom cursor, link underline animations,
  copy-email feedback, and the recognition dialog remain implemented in code.
  The default closed-dialog homepage was exported. For interaction changes, supply
  a comment/prototype or a separate state design; do not infer animation changes
  from a static frame. See `docs/animations.md` and `components/RecognitionModal.jsx`.
- The existing mobile layout hides About/experience and the client marquee. Hidden
  legacy services, featured content, R&D, and the Chainer card were not resurrected.
- The airport module is still at `/test/aircraft`, not part of this homepage capture.
- Frames clip off-canvas content such as the unfocused accessibility skip link.
  The skip link remains in the layer tree and in the real website.

## Validation

Compared desktop and mobile screenshots against the rendered local page. Checked
section content, poster imagery, card arrangement, font-family assignments, and
mobile title positions. Desktop contains 96 native text layers and 56 image layers;
mobile contains 65 native text layers and 20 image layers. Duplicate marquee images
are intentional. Existing older Figma concepts and the airport module were preserved.
