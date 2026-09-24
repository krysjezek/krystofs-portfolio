# Portfolio 2027 — motion direction

Design proposal, 23 September 2026. Source: [Portfolio 2027](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=141-2398). The linked node is the file directory; the canonical Work screen is `1:27`. This proposal extends the existing Interactions library. It is a Figma design deliverable, not a production-site implementation.

## Runtime revision — 24 September 2026

The implementation now uses the calmer pacing requested by the owner, including the explicitly requested grid draw from the old design. This section supersedes the original timing tables below for the website; the Figma studies remain the historical proposal.

- Reference inspected: `checkpoint/pre-rebuild-2026-09-23`, especially `hooks/useScrollReveal.js`, `components/CustomCursor.jsx` and `docs/animations.md`. Preserve its deliberate sequencing, one-time reveals and immediate pointer positioning using CSS/WAAPI rather than restoring the old runtime dependencies.
- On load, vertical rules draw downward across the first viewport and horizontal dividers draw left to right: 1800ms ease-out, beginning at 200ms with 150ms column offsets. The rules settle to their original full-page geometry. This is one draw per document load; tabs and client navigation do not replay it. Scrolling, history restoration and reduced motion finish it immediately.
- First-paint content entrances are CSS-owned, so hydration never shows content and then hides it again. Header content uses 520ms; introduction, visible gallery and route introductions use 640ms, with offsets capped at 140ms and 4–8px movement. Fonts are preloaded. No media-dependent loader.
- Only unseen offscreen content receives a scroll reveal: 560ms, 6–10px, desktop batch offsets capped at 90ms and no mobile stagger. IntersectionObserver replaces full-gallery measurement on every scroll. Fast scroll, focus, activation, resizing and preference changes settle affected content. Coverage includes About, cases, service/editorial pages, work index, archive content and footer.
- Tabs retain the shared header and grid. Outgoing content fades for 180ms while incoming content starts after 50ms and settles over 480ms. Rapid changes start from captured rendered values; only the latest panel remains interactive. Individual first-view cards do not replay inside the panel entrance. The selected rule slides over 320ms.
- Hover labels enter over 340ms and leave softly. Cursor appearance and label updates ease separately from immediate pointer positioning. Pointer cancellation, scrolling, navigation and keyboard input dismiss the hint. Copy confirmation crossfades in a reserved slot without changing the header width; actual clipboard success remains the prerequisite.
- Native Next.js links start navigation immediately instead of waiting for an extra HEAD request. The outgoing route remains while the router is pending, with “Opening…” after 250ms. Actual route render errors use `app/error.jsx` and its retry action. Browser Back restores the gallery category, card focus and scroll without replaying load-in.
- Recognition retains its 150ms fade, now retargeting the current opacity on early dismissal. Explicit keyboard wrapping keeps Shift+Tab from the title inside the dialog. Button feedback scales only the inner label, leaving hit areas fixed.
- Videos fade over 360ms only after `playing`, keep their poster during loading, pause outside the viewport/inactive tabs/background documents, and resume when visible. Reduced motion and data saver remain poster-only.

Regression checks: `node scripts/verify-interactions.mjs` covers first-paint continuity, grid staging, interrupted tabs, keyboard and pointer behavior, clipboard outcomes, dialog focus, delayed routes/history, public route families, responsive/touch views, live motion preferences, data saver and no-JavaScript visibility. `npm run test:layout` continues to check the original Figma coordinates.

## Direction: quiet surface, quick response

Keep the white canvas, continuous hairline grid, authored masonry, Roobert PRO typography, 5px media gutters and 3px grey labels. Artwork stays still during hover. Small controls react immediately and settle softly. Animate one meaningful group at a time; never animate individual letters in 11px labels. No elastic overshoot, magnetic targets, scroll hijacking or looping decorative motion.

## Motion vocabulary

| Token | Curve | Use |
| --- | --- | --- |
| arrive | cubic-bezier(.16,1,.3,1) | Content entrance, card labels, tooltip entrance |
| respond | cubic-bezier(.2,.8,.2,1) | Press recovery and selected navigation indicator |
| leave | cubic-bezier(.4,0,1,1) | Route content leaving |
| quiet | ease-out | Small colour changes, modal fades, tooltip dismissal |
| inline | cubic-bezier(.87,0,.13,1) | Existing external-arrow width reveal only |

Durations are milliseconds. Physical motion stays within 4–12px. Exits finish sooner than entrances. Retarget interrupted motion from its current rendered value; never queue hover animations. Focus has priority over hover exit. Pointercancel restores the resting state.

## 01 — First visit

Start when the initial view is ready to paint; do not wait for all media or show a branded loader. Content is visible without JavaScript. Reserve media dimensions before loading. Animate only content currently in the viewport.

| Group | Start | Duration | Initial → final |
| --- | ---: | ---: | --- |
| Continuous grid + dividers | 0 | 240 | opacity 0 → 1; no line drawing |
| Name + utility group | 0 | 280 | opacity 0 → 1; y 4 → 0 |
| Practice paragraph | 40 | 400 | opacity 0 → 1; y 8 → 0 |
| Motion Mockups paragraph | 80 | 400 | opacity 0 → 1; y 8 → 0 |
| Contact paragraph | 120 | 400 | opacity 0 → 1; y 8 → 0 |
| Work / Fun / About navigation | 120 | 280 | opacity 0 → 1; y 4 → 0 |
| Visible gallery cards | 160 + 40 × index | 440 | opacity 0 → 1; y 12 → 0 |

Use arrive for transform and opacity, except grid opacity uses quiet. Cap gallery staggering at 120ms; the first viewport settles by 720ms even on a large monitor. Order cards by visual top, then left; keep the authored column placement. A focused/activated element finishes immediately. Do not hide the first-view content again after it has appeared.

## 02 — Scroll arrivals

Reveal an unseen card once when its top crosses 92% of the viewport: opacity 0 → 1 and y 8 → 0 over 360ms, arrive. Batch cards entering the same animation frame with 35ms stagger, capped at 70ms. On mobile use y 6px and no stagger. Long cards trigger on their top edge, not percentage visibility. On fast scroll, immediately show anything already above that threshold. About paragraphs and photo pairs, case-study narrative blocks and stills, and footer groups use the same rule. Do not hide previously seen content when scrolling away or back. Back/forward navigation restores scroll and skips entrance replay.

## 03 — Hover and focus

Implementation update: About photo-grid images zoom to 1.045× on hover, entering and leaving over 600ms with the respond curve. Their clipped frames and grid positions stay fixed. Enable this only for fine pointers with hover and no reduced-motion preference; project-card artwork retains its existing behavior.

| Target | Enter / focus | Leave |
| --- | --- | --- |
| Project card | Existing name label: y 12 → 0, opacity 0 → 1, 240ms arrive. Category begins 60ms later. Artwork and hit area stay fixed. | Both labels exit together in 180ms arrive; reverse from current value. |
| Work / Fun / About | Existing text colour / selected rule, 150ms quiet. Selected state stays visible while another item is hovered. | 150ms quiet. |
| Text / resume / footer links | Existing colour + underline, 150ms quiet. | 150ms quiet. |
| External link / publication | Existing arrow scales 0 → 1, opacity 0 → 1; slot 0 → 12px and gap 0 → 5px, 240ms inline. | Reverse all four properties together, 240ms inline. |
| Back / Close | Existing neutral hover fill, 150ms quiet. | 150ms quiet. |

Keyboard focus shows project labels and external arrows immediately with the existing 2px ring. Hover does not remove the focus ring. Touch shows project labels and external arrows permanently; one tap activates a linked card. A card without a destination is informational: hover labels still reveal, but it has a default cursor, no action tooltip, click response or tab stop. All 18 recognition URLs are migrated from code; only six published case routes are eligible for case recommendations.

## 04 — Press and completed actions

- Back, Close and compact utility buttons: visual inner content scales 1 → .98 over 80ms respond on pointerdown; returns over 180ms respond on pointerup/cancel. Keep the 44px hit target stationary. Enter/Space use the same feedback for buttons; links activate on Enter. Activation is immediate and never waits for the animation.
- Text links and the gallery artwork do not shrink. The cursor tooltip supplies the small press acknowledgement on linked cards: 1 → .96 over 100ms quiet, release 180ms quiet.
- Email copy: start clipboard write immediately. On success crossfade label + icon to “Email copied” in 150ms quiet, retaining the target width. Keep inline confirmation for 1600ms then restore in 150ms. Cursor success stays until exit, resetting on the next enter. Announce success once in a polite live region. On failure show “Couldn’t copy — try again” beside the control and keep the email selectable; never show a success state before the write resolves. No confetti or success bounce.
- Mailto email links keep mailto behaviour and use “Email me”; apply “Copy email” only to actual copy controls. External links retain native modifier-click/new-tab behaviour and do not run route-exit choreography.
- Decorative background videos keep the current poster-first H.265 → AV1 → H.264 delivery, muted loop, playsInline, preload none and viewport mounting. Do not add player controls to them. Loading retains the poster; real playback failure retains it with the designed Try again action. Intentional poster-only reduced-motion/data-saver mode is not an error. Case studies contain only photos and background videos, per the [case-study rules](portfolio-2027-case-study-rules.md); existing embed-only sources need authorised masters and delivery encodes before implementation.

## 05 — Cursor hint

Reuse Cursor Tooltip (`191:714`): native pointer retained, 24px height, 3px corners, surface/tag, Roobert PRO 11/16 with 2% tracking, 4px/10px padding, optional 12px icon and 5px gap.

Only `(hover: hover) and (pointer: fine)` enables the hint. Position immediately at pointer +16px/+16px; animate the inner label separately so tracking never trails. Flip at screen edges and clamp to 12px inset. Never obscure the pointer. Resolve the nearest tagged ancestor; child boundaries do not restart the animation.

Enter: opacity 0 → 1, scale .96 → 1 and y 4 → 0 in 240ms arrive. Leave: opacity → 0, y → 4 and scale → .96 in 150ms quiet. A new target during exit retargets the same hint; labels crossfade in place for 150ms. No dwell timer, per-character motion or repeated pop on pointermove.

Copy: View project / eye; Visit site / arrow; Follow / arrow; Copy email / envelope; Email copied / check. Booking and WhatsApp labels only appear if those actual controls exist. Hide on keyboard input, window blur, scroll, pointer exit, route change and dialog dismissal. After scroll, reappear on the next pointermove over a valid target. In a modal, resolve only targets in the active layer. Hint is `aria-hidden`, non-interactive and not focusable.

## 06 — Navigation and disappearance

Work / Fun / About are tabs on `/`, not separate routes. Change the active panel immediately while keeping the shared identity, introduction and grid steady. Move the selected rule in 220ms respond. Old content fades 1 → 0 and moves y 0 → −4px in 120ms leave. New content begins 40ms later, overlapping it: opacity 0 → 1, y 8 → 0 in 280ms arrive. No column-by-column exit, reordering morph or blank wait. Rapid activation cancels the previous transition; the latest selected tab wins. Keep focus on the activated tab. Tab switches do not add history entries; preserve tab, focused card and scroll in the homepage history entry for browser Back.

Homepage tabs switch locally without a route loader. For actual case-route navigation, retain outgoing content and show a small “Opening…” status after 250ms; cancel it on completion. On error retain context with “Couldn’t open this page” and Try again. Retry the same destination. Browser history restores position without replay. On a new route, move focus to its main heading after commit; do not steal focus on hover or scroll. The visible states are in [Feedback / Route status](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=281-807).

Project → case study: hide tooltip immediately, start route immediately, crossfade outgoing content in 120ms and introduce title / context / poster in 320ms arrive with a maximum 40ms group offset. The shared grid is stable; the artwork does not expand to fill the viewport. Both case-study Back controls navigate to `/` with the case’s category selected (Work, or Fun for The Mag Wrap and Chainer); browser Back separately restores the prior tab, focused card and scroll position. More case studies and 404 sample two unique published cases per page entry, excluding the current case where applicable; keep the selection stable for the visit and across hydration.

Recognition modal: preserve the canonical 150ms ease-out opacity open and close. Scrim and panel fade together; keep panel dimensions, backdrop and recognition rows steady. No row stagger. Closing remains dismissible with Close, Escape or a pointer action starting and ending on the backdrop. Open moves focus to the title, traps focus, makes the page inert and locks background scroll. After the closing fade, restore focus to More info and restore the saved scroll position. Rapid open/close retargets from the current opacity. On mobile use the existing full-height sheet layout with the same fade and safe-area insets.

## 07 — Comfort and implementation boundaries

Reduced motion: show initial and scrolled content immediately; remove translations, scales, stagger and animated navigation. Hover/focus/copy/modal changes remain functional and switch immediately. Tooltip tracking remains immediate; hover hints remain optional decoration. Listen for preference and pointer-capability changes while the page is open. A user-triggered media control can still play video; automatic decorative video stays on its poster for reduced motion or data saver.

Separate wrappers own separate motion: route container, one-time reveal wrapper, hover labels, press inner, fixed cursor position and cursor appearance. Do not let multiple timelines overwrite the same transform. Clean up listeners/observers on unmount. No permanent will-change on the gallery. Use transform + opacity; the existing inline-arrow width transition is a small, intentional exception. Never block scrolling, clicks or link semantics to finish a visual effect.

## Reference interpretation

Inspected live on 23 September 2026. These are design takeaways, not claims of matching their exact curves.

- [Interior](https://www.interior.dev/): action feedback and compact state changes. Inspected the copy-button example and its replay. Primary influence for satisfying completion feedback.
- [Rachel Chen / Fun](https://www.rachelchen.tech/fun): observed a contextual “View on Devpost” hint over the hovered work. Adapt its clear action language to the portfolio’s smaller neutral tooltip.
- [Chronicle](https://chroniclehq.com/): inspected the presentation selector; selecting Pitch deck changes the active underline and preview. Adapt the persistent navigation structure and local state response.
- [Daryl](https://imdaryl.com/): inspected experiment tiles and their small destination hint. Keep that discoverability; leave the larger theatrical motion out of this direction.

## Deliverable and verification

- [Motion direction / start here](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=256-2)
- [First-visit timeline](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=257-867)
- [Hover, press and exit timeline](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=257-1241)
- [Work → Fun timeline](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=259-205)
- [Recognition open / close timeline](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=259-779)
- [Existing interactive hover playground](https://www.figma.com/proto/z5qZnFX6vkOKlWrVKzdoFR?node-id=147-145&starting-point-node-id=147%3A145)

The Figma motion page contains the organized specification, native editable timeline studies for first visit, project hover/press/exit, homepage tab change and modal fade, and links to the existing interactive hover playground. Timeline specimens simulate triggers on a clock; free pointer tracking, clipboard writes, focus trapping and real routing are implementation contracts, not behaviours that Figma playback proves. Source screens and existing main component IDs remain intact.

Review the studies at 1× speed. Browser acceptance for a future implementation: desktop fine pointer, 390px touch layout, keyboard navigation, rapid enter/leave, cancelled press, fast scroll, repeated tab changes, denied clipboard, slow destination, reduced motion and history return. There is no claim that this design task changed or verified the production website.

Design QA completed: all four studies were exported and inspected at sampled start, transition and settled frames. Corrected inherited card entrance in the hover specimen, text wrapping in the boards, and incoming-route layering; overlapped route fades to avoid a blank frame. The four boards have no overflowing text or unfinished placeholders. The six canonical desktop frames retain their original IDs and dimensions and have no added timeline tracks. A linked entry was added to the file directory.

Repository checks: `npm run lint` passed with 61 existing warnings and no errors; `npm run build` passed; `git diff --check` passed. This motion document and the approved design handoff record the design changes. No production code or deployment was changed.
