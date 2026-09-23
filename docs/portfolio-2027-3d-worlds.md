# 3D Worlds Figma redesign

Completed 23 September 2026. Source: `app/services/3d-environments/page.jsx`, inspected in the running local site. Destination: **10 · Case studies** in Portfolio 2027, file `z5qZnFX6vkOKlWrVKzdoFR`, page `275:5951`.

| View | Figma frame |
| --- | --- |
| Desktop 1440 | [340:1372](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=340-1372) |
| Tablet 834 | [340:1373](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=340-1373) |
| Mobile 390 | [340:1374](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=340-1374) |
| Linked directory | [341:7851](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=341-7851) |

## Design and editing

This remains a service presentation on `/services/3d-environments`, even though its frames live on the Case studies page. It does not claim a single client, project date or Work/Fun classification. The source introduction, service overview, six deliverables, all 12 selected worlds, five process steps and service-fit guidance are represented. The owner's follow-up removes the introductory contact buttons/address and the entire closing contact section at all three sizes.

The redesign follows Vizcom's white surface, Roobert PRO styles, muted supporting copy, column rules, fine dividers, 16:10 opening media and 5px media gutters. Desktop and tablet use three editorial columns and alternating 2:1 gallery pairs with equal image heights. Mobile stacks content in source order, using 20px text insets and 5px media insets. Gallery titles and collaborator credits sit below the images.

Motion Mockups is a standalone 17.5px Roobert PRO link at every size, with the same linked 15px icon and native external-link instance used in the homepage header. The original explanatory paragraph sits beneath it with a 10px gap, using the existing desktop/compact body styles. The Ready-made alternative label and separate Explore link are removed. Its URL is `https://www.motionmockups.com/`.

Edit global typography/colors in the existing Foundations styles and variables. Header, footer, secondary buttons, service details and media remain instances of existing shared components. Detail labels and values use their existing component properties; button labels use `Label`. Edit local copy and the gallery image fills on each responsive screen. No new competing component library was created. Directory links navigate to the three frames.

## Media provenance

All imagery comes from the source page's existing CDN media. The showreel uses its original `cgi-environments.jpg` poster. The 12 project posters were downloaded and inspected with ffprobe; they were not resized or uploaded to the website CDN.

Three near-empty opening posters have clearer Figma-only still previews extracted from their existing H.264 deliveries: Ashfall Launch at 15 seconds, Veha Architects at 8 seconds, and Fifthrow at 3 seconds. These are still representations of background videos. The website posters, source masters, delivery encodes and published URLs remain unchanged. All other selected-world posters retain the source imagery and order.

Video frames remain raster image fills, not editable 3D scenes or working Figma video players. Text, layout and shared UI are editable. The Motion Mockups link has a URL target. Existing website media contracts continue to apply during implementation.

## Verification

Initially reviewed all three full compositions and a readable mobile introduction. Structural checks confirmed Roobert PRO typography, no overflowing text and all 12 gallery images populated per screen. Following CTA removal and restoration of the Motion Mockups explanation, reviewed the revised blocks at all sizes: the label is 17.5px, its 15px icon is visible, the explanatory copy fits beneath it, and the contact CTAs remain removed. Column-rule heights match the revised page heights.

A temporary change to the shared secondary button's radius propagated through its main component, the case-header module and the new desktop screen; the original 5px radius was restored and verified. Shared style and semantic color bindings were retained; layout spacing is bound to existing variables where matching values exist.

The temporary source capture `339:1372` was removed after rebuilding and visual comparison. The temporary local capture script was removed. No application code, routing, SEO or deployment changed. Lint passed with 61 existing warnings and no errors; production build passed.
