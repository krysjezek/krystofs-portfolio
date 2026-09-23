# Krystof Jezek — Portfolio 2027

Next.js 16, React 19, JavaScript and plain CSS. The portfolio is rebuilt from the approved [Figma design](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=141-2398).

## Run locally

```powershell
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. Media uses the existing Vercel Blob CDN. Override its public URL with NEXT_PUBLIC_CDN_URL in an ignored .env.local file if needed. Upload credentials are only needed for media publishing; never commit them.

## Editing

- Page layouts and interaction components: components/portfolio/
- Content, gallery ordering, case studies and media references: content/
- Design tokens and responsive rules: styles/portfolio.css
- URLs, indexing and structured data: app/seo.js
- Media preparation: [media guide](docs/video-and-media.md) and [AGENTS.md](AGENTS.md)
- Scope, recovery and remaining source-media gaps: [rebuild record](docs/rebuild.md)

Work, Fun and About are tabs on one homepage. Six case studies are publicly listed. Older case URLs remain direct-only, noindex/nofollow archives. Aircraft and depth experiments are preserved in Git, outside the current application.

## Verify

```powershell
npm.cmd run lint
npm.cmd run build
node scripts/verify-portfolio.mjs
git diff --check
```

Check desktop, tablet and mobile in a browser, including keyboard focus, history restoration, reduced motion and lazy video playback. No push or deployment without an explicit owner request; see [deploy.md](deploy.md).

With the local server running, verify the measured Figma layouts:

```powershell
npx.cmd playwright install chromium # First run only
npm.cmd run test:layout
```

This checks 33 reference screens at 1440, 834 and 390px, visible grid rules, a centered 1440px canvas at 1920px, and the recognition dialog. Coordinates come from Figma; tolerance is 0.6px for browser rounding. See the [fidelity record](docs/portfolio-2027-fidelity.md). `LAYOUT_BASE_URL` can point at another local server; `LAYOUT_CDP_URL` optionally attaches to an existing Chromium browser.
