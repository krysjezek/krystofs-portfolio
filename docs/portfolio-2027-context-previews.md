# Contextual cursor previews

Designed in Figma first, then implemented on 24 September 2026. Extends the compact cursor hint with information beyond an action label.

- [Editable component](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=191-714)
- [Current examples and guidance](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=185-702)
- [About desktop preview](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=445-1021)
- [Keyboard and touch state](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=446-1183)

## Content rules

| Target | Preview |
| --- | --- |
| External / social link | Actual host and path, plus whether it opens a new tab. No duplicate “Visit site” or “Follow” label. Query strings are omitted from the display; the link destination is unchanged. |
| Email link | Actual email address and email-app behavior. This remains a mailto action. |
| Published project card | Project name and eye icon, with “View case study” in grey on the second line. No project description. External project links use “View project”. Unlinked cards remain informational. |
| Prague temperature | “Prague Live weather”, then temperature • condition, then source: MET Norway / CC BY 4.0. No forecast timestamp or forecast explanation in the tooltip. Explicit loading and unavailable states. |
| About: software engineering | Czech Technical University, original university identity, subject, Sep 2022–Jun 2025 and Prague. No added graduation or grade claim. |
| Case-study person | Short sourced bio or documented project context, plus source where available. Repeat the existing affiliation mark using the shared 15px Identity tile; no profile photos. |

Weather, education and credits without a destination are informational text with a normal cursor. Hover shows context; keyboard focus shows an anchored tooltip with no actions. Escape or blur dismisses it. Clicking or tapping does not pin anything. Their descriptions remain associated with the text for assistive technology. CTU and weather source URLs are provenance, not reasons to turn the text into a button.

Credits with a destination retain a disclosure button: click, Enter, Space or touch opens the same information with its source link. Escape, Close or outside activation dismisses it. Opening focuses its content, and keyboard dismissal restores the trigger. The cursor preview hides while an anchored preview is open. Ordinary external links and email keep native navigation.

## Design system

Links and text triggers have no underline, including hover and informational previews. Keep keyboard focus outlines and existing contextual feedback.

The original Cursor Tooltip set and four state IDs are retained. Added optional Detail, Source, Show detail, Show source, Image and Show image properties. Reuses existing tooltip color, padding, gap and radius variables, supplied Unicons Line and Floating elevation. Image swaps use the shared [Identity tile](portfolio-2027-identity-tiles.md) for brands, apps, schools and affiliations.

All tooltip text uses `Portfolio / Label`: Roobert PRO Regular 11/16, 2% tracking. Titles use `text/primary` (`--ink`); supporting details and sources use `text/secondary` (`--muted`) at full opacity. CSS mirrors this style with `--type-label` and `--tracking-label`, sharing `--font-family`. The Prague airspace preview retains its larger `Portfolio / Body Compact` 16/24 title while sharing the same semantic colors and supporting Label style. Do not approximate secondary text using opacity.

One-line previews are 24px high; a one-line title plus supporting line is 44px. All previews hug their content up to a 280px outer maximum, with content-driven height, 4px vertical gap and 4px/10px padding. Every identity logo remains 15×15 with contain fit and a 3px radius. The surface is white with primary ink icons. Reuse the Floating shadow: 0/2/4px at 4% ink plus 0/8/24px at 8% ink. Wrapping never truncates a long URL. Native popovers share the same hierarchy and add 44px source/Close hit areas, a subtle divider and visible keyboard focus outlines.

Original 160ms fade, 240ms rise/press and 150ms whole-content update remain. Position follows the pointer immediately, flips at viewport edges and keeps a 12px inset. Touch/narrow screens hide only the cursor decoration. Reduced motion changes states instantly. Native pointer stays visible.

Figma padding propagation was verified before the content-hugging refinement; the original 10px alias was restored. The shared identity radius also passed a main-to-nested-instance propagation probe and was restored to 3px. Actual examples, screen and anchored-state renders were inspected. Figma scenes illustrate states; free pointer tracking and data fetching are verified in the browser.

## Sources and content ownership

`content/context-previews.json` owns education and person context. Project tooltips use the card name from the gallery or recommendation data. Do not manufacture personal history for people without a verified biography. Use the explicitly labelled project-credit summary until a better source is supplied.

Education: `checkpoint/pre-rebuild-2026-09-23:app/page.jsx` lists CTU, Software Engineering, 22–25 and `/images/cvutlogo-2.png`. The archived `app/other/cv/page.jsx` gives Sep 2022–Jun 2025 and Prague. Existing 704×704 PNG is reused from the published CDN; inspected with ffprobe and rendered in the shared 15px tile. No new media upload or conversion was needed.

Person sources inspected 24 September 2026:

| Person | Source / scope |
| --- | --- |
| Kryštof Ježek | Existing portfolio introduction and `content/profile.json`. |
| Jordan Jenkins | Existing Vizcom credits and [Outland](https://enteroutland.com/). Summary is project context, not an inferred founder biography. |
| Evan Place | [Personal website](https://evanplace.com/) and [professional profile](https://www.linkedin.com/in/evanplace). |
| Dominik Smuchar, Petr Skovajsa | Existing ValkaAI credits. No personal biography asserted beyond this collaboration. |
| Mary Wu | [monopo profile](https://monopo.london/team/mary-wu/). |
| Maud Dedecker | [monopo profile](https://monopo.london/team/maud-dedecker/). Corrects the displayed source-content typo “Maud Dedrecked”; lookup preserves the existing record key. |
| Stella Grotti | [monopo profile](https://monopo.london/team/stella-grotti/). |
| Luna Gooriah | [monopo profile](https://monopo.london/team/luna-gooriah/). |
| Josef Talač, David Hájek | Existing Barbour credits; project context only. |
| Artem Morozov | [Creator profile](https://linktr.ee/tmrzv) and existing VSX credit. |

Weather: [MET Norway Locationforecast](https://api.met.no/weatherapi/locationforecast/2.0/documentation). The nearest valid hourly forecast within 90 minutes supplies temperature; `next_1_hours.summary.symbol_code` supplies the condition. Unknown symbols omit the condition rather than inventing one; stale/malformed forecasts return the existing 503 fallback. Day/night symbols and the provider’s two legacy spelling exceptions are handled. Forecasts are not presented as measured observations.

## Verification

- `node scripts/verify-context-previews.mjs`: weather parsing/staleness/missing conditions, mocked successful and failed weather UI, destination and email content, logo loading and dimensions, credit bio/source, keyboard focus and dismissal, touch popover, long URLs, stationary content updates, viewport bounds, reduced motion, and browser errors.
- `node scripts/verify-tooltip.mjs`: shared title/supporting typography, semantic colors, white surface, Floating shadow, icons, press/cancel, reversal, edges and responsive behavior; a short two-line link preview is 44px high.
- Regular lint, build, portfolio verifier, interaction suite and 33-screen / 431-coordinate Figma layout suite remain required.

All checks above passed on 24 September 2026. Desktop, tablet and mobile renders were visually reviewed. A live `/api/weather` request also returned a valid temperature, forecast timestamp and condition (the UI regression uses fixed weather fixtures for repeatability).

No deployment or push is part of this change.
