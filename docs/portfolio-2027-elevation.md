# Overlay elevation

Owner-approved direction, 24 September 2026: subtle shadows distinguish floating
interfaces from the page. Use two shared levels in CSS and Figma.

[Figma elevation guide](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=420-2)

| Level | CSS token | Shadow layers (x / y / blur / opacity) |
| --- | --- | --- |
| Floating | `--shadow-floating` | 0 / 2 / 4 / 4%; 0 / 8 / 24 / 8% |
| Modal | `--shadow-modal` | 0 / 4 / 12 / 6%; 0 / 24 / 64 / 12% |

All dimensions are pixels, all layers use ink `#05070A`, and spread is zero.
Figma effect styles are `Portfolio / Elevation / Floating` and
`Portfolio / Elevation / Modal`. They match the CSS tokens in
`styles/portfolio.css`.

Apply Floating to cursor-hint surfaces, source-note popovers, copy-error messages
and route-status messages. The Prague hover preview and desktop detail popover
also use it in Figma; the airspace feature remains a design proposal.
Apply Modal to bounded recognition dialogs on desktop and tablet. Retain the
existing 32% ink backdrop. Full-screen mobile dialogs have no exterior shadow;
bounded mobile popovers retain Floating.

Apply the effect once to the outer surface. Keep existing thin borders, radii,
padding and hit areas. Ordinary cards, sections and buttons remain flat. Inset
shadows used as recognition-row dividers are separators, not elevation, and
remain unchanged. Shadows follow the existing opacity/transform transitions;
do not animate blur, spread or shadow strength. Reduced-motion behavior remains
unchanged.

## Verification

- Browser review of the recognition modal, Barbour source note and cursor hint.
- Figma guide and linked airspace preview inspected; effect styles inherit into
  screen instances without adding a second shadow to the container.
- Lint, production build, portfolio verification, tooltip checks and interaction
  checks pass, including reduced motion and touch behavior.
- All 33 Figma layout screens and 431 coordinate checks pass without changing
  reference measurements.

No deployment was requested or performed.
