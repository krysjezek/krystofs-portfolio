# Identity tiles

Owner-approved direction, 24 September 2026: one **15×15px** identity component everywhere, including tooltips. No larger preview size.

- [Figma component](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=452-1126)
- [Figma usage guide and linked tooltip examples](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=452-1233)
- Web: `components/portfolio/IdentityTile.jsx`

The tile has a 3px clipped radius, white matte and contained artwork. Preserve original brand colors and proportions. A 5px gap separates the tile from its label. It is decorative beside explicit text, with no separate focus stop or animation. The surrounding link or disclosure owns interaction.

| Figma semantic variable | CSS token | Value |
| --- | --- | --- |
| `size/identity` | `--identity-size` | 15px |
| `radius/identity` | `--identity-radius` | 3px |
| `surface/identity` | `--identity-surface` | White |
| `space/icon-gap` | `--icon-gap` | 5px |

Figma preserves 22 existing logo preset IDs and links them through the shared tile. The `Artwork` instance-swap property selects the verified mark. School, social, app and credit tooltip presets use the same tile. The guide shows actual linked tooltip instances, not flattened screenshots.

On the website, use `IdentityTile` for brand, app, publication, social, university and credit affiliation marks. `ExternalLink` passes its existing logo into the contextual cursor preview. Credit previews repeat the row's affiliation mark with the short bio; preserve the green designer mark for existing collaborator rows without an affiliation image. Kryštof Ježek's credit rows use the green designer tile beside plain text, without a link or preview. No profile photos are introduced. The school preview resolves the existing university artwork.

Action symbols still use `Icon` from the supplied Unicons Line pack. Large artwork within case-study media is not an inline identity tile.

The shared size remains fixed in every preview. CTU, weather and credits without a destination use hover/focus information tooltips with no click action. Linked credit disclosures retain source links, Close and keyboard/touch activation. Pointer tracking updates position without rerendering on every pointer move; React updates preview content only when the target or its content changes.

Tooltips hug their content up to 280px wide, including padding. Short destinations stay compact; longer bios wrap. The same sizing rule applies to pinned previews.

Existing artwork URLs and media remain unchanged. A Figma token propagation probe confirmed that changing the shared radius updates the main component and a nested logo preset; the 3px alias was restored afterward.
