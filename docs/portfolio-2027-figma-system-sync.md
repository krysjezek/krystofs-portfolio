# Design system sync — 26 September 2026

The owner narrowed this pass to matching the implementation's shared design system. No new case-study screens were added. Existing case-study copy and media sequences were not migrated in this pass; shared style changes still reach their linked components.

[Figma components](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=9-2) · [Card states](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=22-257) · [Coming soon](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=564-1406)

Source: local implementation at `4cc2ac1`, using 1440px, 834px and 390px content canvases. No application behavior was changed, pushed or deployed by this sync.

## Shared rules

- Metadata tags use the new semantic `text/tag secondary` variable, `#676d77`, on exact `#f5f5f5` surfaces (4.78:1 contrast). General secondary text remains `#707681`.
- Roobert PRO Regular remains the shared family. Desktop case titles use 36/44; tooltips use 11/16 with 2% tracking. Small links use Regular. Compact footer links use 12/24 and -0.08px tracking.
- Desktop card labels are hidden at rest and visible on hover/focus. Compact and touch references keep labels visible. The motion notes now reflect the implemented 340ms reveal, 60ms metadata delay, and 220ms opacity / 280ms translation on exit.
- Project Card retains editable nested Project/Metadata tags. The new `Informational touch` and `Coming soon` variants reuse the tooltip component, eyes identity artwork, semantic colors, 10px card inset, 4px/10px tooltip padding and 3px corners. Compact STNCK instances use the informational variant.
- The Figma click interaction previews the two hint states. The implementation's scroll, keydown, outside-pointer and blur dismissal rules are recorded in the component description; they are not all emulated by the prototype.
- Work/Fun frames retain their IDs and now use the current card order, descriptions, posters, equal structural columns, half-gutters, and balanced column bottoms. About retains its layout with current artwork and implemented emphasis. Background rules span the page.
- Shared Prague map components use the current published dark geography asset, land `#376b5a`, labels `#e1ecf2`, accent `#79c5ff`, and current detail/preview zoom. Aircraft and live readings remain illustrative fixtures.

## Verification

- Checked all 72 cards in six Work/Fun frames against rendered source x/y/width/height, plus screen heights, within 0.6px. All pass.
- Verified all gallery cards retain main-component links, editable Roobert PRO labels, and non-empty artwork fills.
- Temporarily changed metadata color, media radius, tag inset and label type size; read the changed values through main → nested component → mobile screen. Restored exact original values/aliases and verified the final 5px radius, 10px inset, 11px label and metadata color.
- Reviewed full gallery renders, readable card/hint renders, mobile About, and the map preview. Fixed doubled compact insets, a swapped-card size override, and preview-map scale overrides found during verification.
- Photographs, video posters and geography remain source artwork; ordinary UI is editable. Video playback and live time/weather/aircraft are represented by still or illustrative states.

Temporary captures and empty new-case frames were removed. The temporary capture script was removed from the app. Historical case-study layout fixtures were not overwritten with application measurements.

Measured final gallery heights:

| Canvas | Work | Fun |
| --- | ---: | ---: |
| 1440 | 2248.25 | 2357.27 |
| 834 | 2921.45 | 3097.08 |
| 390 | 5151.36 | 5048.44 |

## Header utility redesign

The subsequent owner-requested implementation change is reflected in the linked [Prague utility variants](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=587-1424). The existing desktop component ID `253:918` is preserved; compact is `587:1407`.

- Order: Prague, weather, local time. The two actions use primary ink; the passive clock uses secondary text. The vertical divider was removed at the owner's request.
- All utility text is 14/20 Roobert, reduced following owner feedback. To balance visual weight, the plane is 12px and weather is 15px; both use transparent 16px slots and a 5px label gap. The owner requested removal of icon backgrounds.
- Temperature occupies 39px. The clock occupies 54px plus a 6px leading margin on desktop/tablet, or 50px on compact screens. Clock padding is 12px desktop/tablet and 8px mobile. Time remains right aligned. The web uses tabular numerals. Visible values never resize adjacent controls.
- Weather exposes a linked icon swap property. Eleven added source exports cover plane, day/night weather, precipitation, thunder, fog, and a neutral thermometer fallback. Weather details open on tap/click or keyboard activation and dismiss on Escape/outside interaction.
- Below 480px, identity and utility use two rows. Figma Mobile Identity `23:237` grows from 70px to 104px; the shared mobile header is now 458.5px high. Work/Fun/About references inherit the 34px increase, with final heights 5185.36 / 5082.44 / 2243.86px. Layout checks derive this delta from the edited Figma component while preserving the historical fixture.

Live values remain illustrative in Figma. No case-study screens were added.
