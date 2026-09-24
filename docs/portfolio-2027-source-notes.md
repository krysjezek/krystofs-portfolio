# Source notes for inline figures

Design direction, 23 September 2026. A reusable anchored source note belongs to a fact or figure inside running copy. It is separate from the pointer-following Cursor Tooltip. This task edits Figma and handoff documentation; it does not implement website behaviour.

## Figma references

- [Interaction and component guide](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=316-808)
- [Inline evidence component family](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=314-1017)
- [Source note panel](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=313-981)
- [Mobile examples](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=321-894)
- [Barbour views: sources and calculation](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=316-872)

## Visual and content contract

The panel uses the shared Floating shadow alongside its thin border; see
[overlay elevation](portfolio-2027-elevation.md) for matching Figma and CSS values.

Use a black figure in the grey Result paragraph, without an underline in any state. Match surrounding body size: 17.5/28 desktop, 16/24 compact. Preserve the keyboard focus indicator and source-preview interaction. Do not make a headline statistic or move audience metrics back into the header.

The white panel uses the current shared tokens: `surface/page`, `text/primary`, `text/secondary`, `border/subtle`, 0.5px border, 3px `radius/tag`, 16px padding and 10px gap. Use existing Body, Body Compact, Small Link and Label styles. No new colour, font or spacing collection is introduced. The figure family has Density (Desktop/Compact), State (Default/Open/Focus), and Placement (Below/Above): 12 variants. It contains an instance of the reusable Source note panel.

Panel fields are editable text properties: Eyebrow, Title, Explanation, Method, Source, Source 2–4 and Date. Each source row must link to the evidence for that exact figure; update the prototype URL as well as the label when changing a source. A source label is not evidence by itself. The current four-source example is 320 × 393px and grows with its text. Boolean Show source 2–4 properties hide unused rows. After changing content height, resize the Figma hover-region frame to include the panel, 10px gap and figure, and reposition Above panels so the gap remains 10px. Website positioning must calculate those bounds from rendered content.

Every published numerical claim needs:

1. The exact metric and what is counted (views, likes, average per post, rate, delivered films).
2. An observation or calculation that can be reproduced, including denominator, exclusions and rounding.
3. The primary source: exact post, dated analytics report, or named agency/client publication.
4. Measurement cutoff or reporting period, separately from the date the source was checked.
5. Scope and limits: campaign versus one asset; paid versus organic when known; no claim of unique people from a view count; no implication that one contributor caused the whole campaign result.

Keep the explanation short enough to read in the panel. Link to a fuller methodology if it requires a post-by-post table. Label historical observations with their actual date. Do not invent a timestamp, baseline or organic split. An old portfolio claim can identify what needs verification, but repeating it is not independent substantiation.

## Interaction

- Hover opens after 150ms. The panel stays anchored to the figure, with a 10px gap. Keep it open while pointer or focus is on either surface, including safe pointer travel across the gap. A 150ms exit delay avoids flicker.
- Mouse clicks do not pin the note. Leaving the figure, safe gap and panel closes a pointer-opened note, including after moving into the panel to explore its contents. Touch users tap to open and tap the figure, Close or outside to dismiss. Only one note is open. After explicit dismissal, suppress automatic reopening until hover/focus leaves and re-enters.
- Keyboard focus reveals the note without moving focus. Enter/Space toggles it; Tab reaches the panel controls/source in a predictable order. Keep a keyboard-opened note available while focus remains in the figure/panel region, and close it when focus leaves. Do not trap focus. Escape/Close returns focus to the originating figure; outside click preserves focus on the clicked target. A mouse click must not create a persistent keyboard-focus state that defeats hover-out dismissal.
- Use a button within the paragraph, with a useful accessible name such as “Sources for about 407 thousand views”, `aria-expanded` and `aria-controls`. The figure inherits paragraph typography; avoid an oversized invisible hit area that overlaps adjacent text.
- A note containing a citation link is an interactive non-modal popover, not an ARIA tooltip. Use an appropriately labelled non-modal dialog/popover with no focus stealing on hover, and a 44px Close target. A text-only tooltip pattern must not contain interactive links. See the [WAI-ARIA tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).
- Position at 320px wide, capped to viewport width minus 32px. Shift horizontally to fit, and flip above when there is not enough space below. Preserve the underlying paragraph flow. At large text/zoom, allow the panel content to scroll within the viewport rather than clipping the source or Close control.
- Use a 150ms opacity fade, without scaling or pointer tracking. Reduced motion switches immediately. Suppress the global cursor hint while using a source note.

The hover/focus content must remain dismissible, hoverable and persistent; this follows [WCAG 2.2 SC 1.4.13 guidance](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html).

Figma simulates hover/click opening, hover-out dismissal and click-to-close, and contains real source-link destinations. The Open variants wrap the figure, gap and panel in one native hover-region frame; its Mouse Leave transition returns to Default after 150ms. Focus states, outside click, Escape, single-open state and responsive collision handling are implementation requirements, not behaviours proven by static Figma frames. The case mockups overlay a component on the first phrase of native text; the website should use one semantic inline button, not duplicated text or coordinate-positioned hit boxes.

## Evidence audit: VSX and Barbour

Owner decisions on 23 September 2026: omit VSX audience metrics because its original post was deleted; drop Barbour’s engagement comparison and use the combined views of the four supplied city Reels. The old average-view claim is not carried forward. Removed metric drafts are no longer presented as candidate content in Figma.

### Verified Barbour source register

All four posts were opened in the signed-in browser. Their captions identify the cities below and their displayed publication date is 30 September 2024. The post detail pages show likes, not views. View counts were read from the corresponding linked cards in [Barbour’s public Reels grid](https://www.instagram.com/barbour/reels/) on **23 September 2026**. The Czech UI labels these counters “Ikona počtu zobrazení”; “tis.” means thousand. The four counters were also visually checked together in the grid.

| Reel / primary source | Displayed counter | Interpreted rounded views |
| --- | --- | ---: |
| [New York](https://www.instagram.com/barbour/reel/DAil9S2I_Kp/) | 69,8 tis. | 69,800 |
| [London](https://www.instagram.com/barbour/reel/DAiDom-o3fR/) | 100 tis. | 100,000 |
| [Seoul](https://www.instagram.com/barbour/reel/DAhoHegINvh/) | 163 tis. | 163,000 |
| [Shanghai](https://www.instagram.com/barbour/reel/DAhTliTIksm/) | 74,6 tis. | 74,600 |

Calculation: `69,800 + 100,000 + 163,000 + 74,600 = 407,400` using the abbreviated displayed values. Since the inputs are rounded, this is an **approximate** combined count. The public-facing figure is **About 407k views**, rounded to the nearest thousand; do not present 407,400 as an exact analytics total or use “407k+” as a proven lower bound.

Scope: only these four posts on Barbour’s Instagram, observed on that date. This is not unique viewers, an organic-only audience, or total reach across all campaign assets, accounts or platforms. The paid/organic split is unknown. Do not imply that Kryštof’s contribution alone caused the audience result. Counters can change after the observation date.

The canonical Result at desktop, tablet and mobile widths reads:

> About 407k views across the four city Reels on Barbour’s Instagram. CGI quilting and procedural nature brought the campaign into London, New York, Seoul and Shanghai.

The black first phrase opens the shared panel with the four separately clickable source rows, the arithmetic, rounding explanation and observation date. Neither the trigger nor source links are underlined. [Monopo’s project case study](https://monopo.london/work/barbour-icons-in-quilting/) corroborates the four-city campaign and two additional department-store films, but is not used as evidence of audience numbers.

## Vojta Zizka automation estimates — 24 September 2026

The owner identified both [ProductionBot](https://www.productionbot.xyz/) examples as Vojta Zizka projects and confirmed completion during 2025. The page reports Patreon end-screen preparation falling from 2 hours to 30 seconds per video and market-chart preparation from 1 hour to 2 minutes. These are attributed workflow estimates from the creator's own project description, not independently timed benchmarks. The source supplies neither a test protocol nor a measurement period; both limitations are stated in the inline Result notes. No percentage or audience-growth claim is inferred.

The site's separate explainers were verified on YouTube: [Patreon End Screen Automation](https://www.youtube.com/watch?v=lvB0eOoDT_E), published 9 May 2025, and [Automated Creation of Market Charts](https://www.youtube.com/watch?v=uLsedHtZuzY), published 10 May 2025. These publication dates do not narrow the owner's whole-year completion date. Each project section links its own explainer; background-video previews stay self-hosted.

## Verification

The panel and inline-figure variants reuse the current tokens and styles. A temporary padding change propagated through main panel → nested variant → Barbour screen instance, then the exact 16px token binding was restored. Review covers desktop default/open/focus, compact default/open, above/below placement, source links, paragraph alignment and panel bounds. No website accessibility or runtime playback claim is made by this Figma work.

The Figma prototype was opened in Chrome: activating the default figure displayed its anchored note; moving into the panel kept it open; leaving the combined region triggered dismissal. Close was also checked. The canonical Barbour Result was inspected at readable desktop scale; compact open/closed examples were rendered and inspected. Lint passed with 61 existing warnings and no errors; the build passed with 32 routes. No runtime code was changed.
