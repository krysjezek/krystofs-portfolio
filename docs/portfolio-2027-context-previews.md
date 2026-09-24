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
| Published project card | A short authored explanation of what is inside; identifies personal projects separately. Unlinked cards remain informational. |
| Prague temperature | Temperature, readable condition, Prague forecast hour and MET Norway / CC BY 4.0 attribution. Explicit loading and unavailable states. |
| About: software engineering | Czech Technical University, original university identity, subject, Sep 2022–Jun 2025 and Prague. No added graduation or grade claim. |
| Case-study person | Short sourced bio or documented project context, plus source where available. Repeat the existing affiliation mark using the shared 15px Identity tile; no profile photos. |

Weather, education and credits are dotted-underlined buttons. Hover previews the context; click, Enter, Space or touch opens an anchored native popover with the same information and a source link where available. Escape, Close or outside activation dismisses it. The cursor preview hides while a context popover is open. Opening focuses its content, and keyboard dismissal restores the trigger. Ordinary external links and email keep native navigation.

## Design system

The original Cursor Tooltip set and four state IDs are retained. Added optional Detail, Source, Show detail, Show source, Image and Show image properties. Reuses existing tooltip color, padding, gap and radius variables, Portfolio / Label (Roobert PRO 11/16, 2% tracking), supplied Unicons Line and Floating elevation. Image swaps use the shared [Identity tile](portfolio-2027-identity-tiles.md) for brands, apps, schools and affiliations.

Compact height remains 24px. All previews hug their content up to a 280px outer maximum, with content-driven height, 4px vertical gap and original 4px/10px padding. Every identity logo is 15×15 with contain fit and a 3px radius, including the university. Source is white at 75% opacity. Wrapping never truncates a long URL. Native popovers also hug their content and add 44px source/Close hit areas.

Original 160ms fade, 240ms rise/press and 150ms whole-content update remain. Position follows the pointer immediately, flips at viewport edges and keeps a 12px inset. Touch/narrow screens hide only the cursor decoration. Reduced motion changes states instantly. Native pointer stays visible.

Figma padding propagation was verified before the content-hugging refinement; the original 10px alias was restored. The shared identity radius also passed a main-to-nested-instance propagation probe and was restored to 3px. Actual examples, screen and anchored-state renders were inspected. Figma scenes illustrate states; free pointer tracking and data fetching are verified in the browser.

## Sources and content ownership

`content/context-previews.json` owns education and person context. `content/gallery.json` owns project preview copy. Do not manufacture personal history for people without a verified biography. Use the explicitly labelled project-credit summary until a better source is supplied.

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
- `node scripts/verify-tooltip.mjs`: original typography, inverted surface, icons, press/cancel, reversal, edges and responsive behavior; rich link surface is now 44px high.
- Regular lint, build, portfolio verifier, interaction suite and 33-screen / 431-coordinate Figma layout suite remain required.

All checks above passed on 24 September 2026. Desktop, tablet and mobile renders were visually reviewed. A live `/api/weather` request also returned a valid temperature, forecast timestamp and condition (the UI regression uses fixed weather fixtures for repeatability).

No deployment or push is part of this change.
