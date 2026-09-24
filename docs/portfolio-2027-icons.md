# Interface icon guidelines

Owner-approved scope, 24 September 2026: use only the supplied **Line Awesome** pack for interface icons. Keep identity logos and emojis.

- [Figma guidelines and specimens](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=399-39)
- [Curated UI Icon component](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=399-38)
- [Original supplied library: 98 - Icons](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=369-3385)

## Source and shape

Use the linked `UI Icon / Line Awesome` component in Figma and `components/portfolio/Icon.jsx` on the web. Each curated Figma component contains an instance of the supplied source component. Preserve the native 24×24 canvas, proportions and path weight. Do not trim the canvas to the vector bounds, redraw a glyph, add a stroke, substitute another pack, or apply individual optical scale factors.

The pack contains names with and without `-solid`; use the exact approved symbols below. The suffix alone is not a reason to switch to a different drawing. Transparent backplates and semantic color overrides belong to the component wrapper; source paths remain unchanged.

## Size, spacing and color

| Context | Token | Size |
| --- | --- | --- |
| Tooltip, header utility, copy feedback, external-link suffix | `--icon-compact` | 12×12px |
| Icon beside body text | `--icon-inline` | 15×15px |
| Original library artwork | Native viewBox | 24×24 |
| Icon-to-label spacing | `--icon-gap` | 5px |

Use one square size for every icon in a context. Center it in the text line box; do not add per-symbol baseline offsets. The existing tooltip retains its 24px height, 3px radius, 11/16 typography, 2% tracking and 4px/10px padding. The external-link reveal retains its 17px total slot: 5px gap plus 12px icon.

Icons inherit `currentColor`: primary ink beside ordinary text, muted color beside muted text, and white in the black tooltip. Hover, press and success must not change their size, baseline or weight. Keep the existing motion and reduced-motion behavior.

## Action mapping

| Meaning / application key | Supplied symbol | Source node | Web use |
| --- | --- | --- | --- |
| View project / `eye` | `eye` | `369:4346` | Project tooltip |
| Open external site / `arrow` | `external-link-alt-solid` | `369:4342` | External-link suffix; Visit site / Follow tooltips |
| Compose email / `email` | `envelope` | `369:4298` | Mailto link and Email me tooltip |
| Copy email / `copy` | `copy` | `369:4070` | Header copy button and Copy email tooltip |
| Completed action / `check` | `check-solid` | `369:3900` | Successful clipboard confirmation only |
| Location / `location` | `map-marker-alt-solid` | `369:5156` | Prague utility |

Figma also maps its existing calendar and cloud specimens to `calendar` (`369:3764`) and `cloud-solid` (`369:3990`). They are not shipped as new booking or weather features.

The same action uses the same symbol wherever it appears. An envelope means compose/send email; two sheets mean copy. A check indicates confirmed completion, never a pending or failed request. Keep text-only controls, including Back and Close, text-only unless their design is intentionally revised.

## Identity artwork and emojis

Project, client, agency, collaborator, publication and social logos remain identity artwork. Keep their original colors and proportions, including Motion Mockups, X, case-study credit marks and recognition favicons. Render these with `IdentityIcon` from `Links.jsx`; do not use them as action symbols or recolor them with the UI icon mask.

Keep existing emojis as authored text. Do not replace them with Line Awesome symbols. `content/icons.json` contains shared identity artwork only; `content/interface-icons.json` is the separate interface-icon registry.

## Web implementation

```jsx
import Icon from "./Icon";

<Icon name="copy" size="compact" />
<Icon name="email" /> // inline is the default
```

The exact exported SVG files are tracked under `public/icons/line-awesome/` as small UI assets shipped with the app. These are separate from CDN-hosted project photography, video and identity media. CSS masks preserve the source geometry while inheriting the surrounding text color; there are no handwritten SVG paths or external icon dependencies in the component.

The registry records the source component, curated component and SHA-256 of each exact export. To add an interface icon, select it from the owner's supplied Figma page, add a linked instance to the curated set, document its meaning, export the full 24px component as SVG, and register the export. If the supplied pack has no suitable symbol, use a text label or ask for a library addition; never silently import another pack.

Decorative icons have `aria-hidden="true"`. Buttons and links retain visible text or an accessible name; icons do not provide the sole accessible label. Keep existing 44px hit targets around icon-only controls. Copy confirmation remains tied to actual clipboard success and its existing live region.

## Verification

`node scripts/verify-icons.mjs` checks the six source exports, exact hashes, native canvases, allowed callsites, delivered SVGs, compact/inline geometry, inherited colors, and preserved identity assets. `node scripts/verify-tooltip.mjs` checks the compact design and its hover, copy, edge and reduced-motion behavior. Run the regular layout suite after changing icon slots; do not change Figma measurements just to accommodate an inconsistent glyph.
