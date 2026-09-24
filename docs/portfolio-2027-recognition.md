# Mentions and credits

Updated 24 September 2026. Source: http://localhost:3000, About tab.
Target: Portfolio 2027, file `z5qZnFX6vkOKlWrVKzdoFR`.

[Editable popover variants](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=53-836)

## Final design

- The trigger and title read "Mentions and credits". The trigger sits below the
  third, personal biography paragraph. The label is 22px below the paragraph
  box: 8px margin and 14px padding within its 44px click target.
- The non-modal panel is at most 420px wide and 480px tall. Narrow viewports keep
  16px side clearance; the mobile Figma specimen is 358px wide at a 390px canvas.
- Keep a 10px trigger gap. Open below when space permits, otherwise above, and
  adjust to the available height. Reposition on resize/scroll; dismiss when the
  trigger leaves the viewport. Classic scrollbar gutters are accounted for.
- Fixed header, scrolling list of all 18 original source records, no resume footer.
  Description is 14/20, publisher and date are 12/18. Use Floating elevation,
  a 0.5px border, 3px radius and 16px horizontal padding.
- Native auto popover: Close, Escape, outside click and trigger toggle dismiss.
  Focus starts at the title; Tab can leave. The page remains usable. No scrim,
  background inertness or scroll lock. Fade 150ms; reduced motion is immediate.

## Figma ledger

Existing component IDs were preserved. Main set `53:836` owns desktop `53:481`,
tablet `53:658` and mobile `53:835`. Row set `53:304` owns the compact stacked
record structure; shared trigger set `137:2755` owns the label. New text style
`Portfolio / Body Small` is Roobert PRO Regular 14/20.

About triggers remain `137:3440`, `137:3720` and `137:3712`. Overlay presentation
frames remain `45:220`, `137:3716`, `137:3444` and playground `147:204`. Their
linked panel instances use Floating, with no scrim. A transparent dismissal
surface represents outside click in Figma; native browser pass-through and
keyboard behavior are verified in code, not guaranteed by Figma playback.

The elevation guide `420:2` and motion example `259:779` were updated. A temporary
main-component radius change propagated to desktop instance `55:220`; both were
restored to 3px. No detached replacement components were introduced.

## Verification

Desktop and mobile browser visuals, plus Figma desktop/mobile renders, reviewed.
All 33 layout screens and 431 coordinate checks pass, including the approved
8px mobile About spacing increase. Interaction checks at 320, 390, 834 and
1440px cover all records, third-paragraph placement, removal of the resume,
keyboard exit, focus restoration, Close, Escape, repeat click and outside
interaction. Lint, production build and portfolio verification pass.

Completed locally and in Figma. No push or deployment.
