# Header utility redesign — 24 September 2026

Source: homepage at `http://localhost:3000` and the owner's header screenshot. Designed in the existing [Figma utility component](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=253-918) before implementation.

- Roobert PRO Regular 14/20 replaces the previous 12px light utility text. Prague is secondary; the local time and actions use primary ink.
- The clock and actions have a 32px gap. The owner requested removal of the proposed vertical divider; it is removed in Figma and CSS.
- Copy email uses a 112×44px grey surface with 5px corners. X has a 44×44px outlined target; the action gap is 8px. Existing 12px Unicons and X artwork remain unchanged.
- Below 600px, the header shows Copy email instead of the clock and X. Clipboard success, failure recovery, live announcement, keyboard focus and reduced-motion behavior remain intact. Success retains the fixed button dimensions.
- Existing desktop/tablet header components retain the linked utility. Mobile uses linked instance `430:1128`; Work's identity row override was corrected to match the main component's right alignment. No new raster assets or dependencies.

Verification: temporary spacing changes propagated from main utility through the header module to the actual Work screen and were restored. Figma renders and browser views were inspected. Targeted browser checks pass at 320, 390, 599, 600, 834, 1440 and 1920px, including keyboard focus, clipboard success/failure, fixed hit areas and no horizontal overflow/runtime errors. Icon and tooltip checks pass; production build and portfolio verification pass.

The full layout suite encountered an unrelated recognition-popover width assertion (328px actual versus 358px expected at the mobile viewport) while that subsystem was being edited separately. Its reference measurements were not changed by this header work.
