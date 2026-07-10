# AGENTS.md

Fast map for agents working in this repository. Prefer this file over rediscovering the project; open the linked deep-dive docs only when the task touches that subsystem.

## Project at a glance

- Next.js 16 App Router portfolio, React 19, JavaScript/JSX, npm.
- Mostly static pages; `npm run build` currently prerenders 25 application routes plus framework routes.
- UI was migrated from Webflow. Preserve existing Webflow class names and DOM structure unless the task explicitly calls for a redesign.
- Styling: `styles/normalize.css`, `styles/webflow.css`, then the main editable SCSS file `styles/krystofs-portfolio.webflow.scss`, all imported by `app/layout.jsx`.
- Interactions: GSAP hooks/components; Three.js is used by the depth effect. There is no test suite.

## Start here

| Need | Location |
| --- | --- |
| Global layout, fonts, analytics, cursor, JSON-LD | `app/layout.jsx` |
| Homepage | `app/page.jsx` |
| Public pages | `app/**/page.jsx` |
| Shared UI | `components/` |
| Reusable interaction logic | `hooks/` |
| Main styles | `styles/krystofs-portfolio.webflow.scss` |
| SEO source of truth, route list, structured data | `app/seo.js` |
| Sitemaps and robots | `app/sitemap.js`, `app/image-sitemap.xml/route.js`, `app/robots.js` |
| Media behavior and codec conventions | `docs/video-and-media.md` |
| Animation inventory | `docs/animations.md` |
| 3D service-card behavior | `docs/3d-tilt-service-cards.md` |
| Blob/poster utilities | `scripts/` |

Route groups worth knowing:

- `/services/*`: current service landing pages.
- `/work/*`: current case studies. Public navigation, work indexes, sitemaps, and structured data must expose only the four projects in `featuredCreativeWorks`/the homepage. `/work/old-projects/*` is legacy Webflow-derived content kept only for direct archival URLs; keep those routes `noindex, nofollow` and never link or list them publicly.
- `/other/*`: CV, print CV, work index, and join page.
- `/test/depth`: experimental depth-effect route; do not treat it as portfolio navigation.

## Local workflow

For UI or visual work, start the local server early and leave it running so the user can inspect changes at `http://localhost:3000` while you work. Do not start a duplicate server if port 3000 is already in use. A compact background launch command is:

```powershell
Start-Process npm.cmd -ArgumentList 'run','dev' -WindowStyle Hidden
```

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. On Windows use `npm.cmd`/`npx.cmd` if PowerShell blocks `.ps1` shims.

Most visual assets are not tracked (`public/images/` and `public/videos/` are gitignored). For accurate local visuals create `.env.local`:

```dotenv
NEXT_PUBLIC_CDN_URL=https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com
```

`BLOB_READ_WRITE_TOKEN` is secret and only required by upload scripts. Never commit `.env*`, tokens, `.vercel/`, or generated media.

## Change patterns

- New/renamed public page: update its `app/**/page.jsx` and also `portfolioRoutes`/metadata in `app/seo.js`; verify sitemap and structured data remain correct.
- Shared navigation/contact: edit `components/Navbar.jsx` and/or `components/Footer.jsx`.
- Video: use `EmbedVideo` inside a parent with explicit dimensions, or `BackgroundVideo`; read `docs/video-and-media.md` first.
- Animation: prefer the existing GSAP hooks and honor `prefers-reduced-motion`; read `docs/animations.md` before changing global reveal/cursor behavior.
- Images: prefer `next/image` for new content. Existing raw `<img>` tags are legacy and produce known lint warnings; do not perform a broad migration during an unrelated change.
- Client boundaries: pages are client components only where browser APIs/interactions require them. Keep new static content server-renderable when practical.

Some deep-dive docs contain historical migration notes. Trust current imports/files over examples in docs; notably, `docs/video-and-media.md` still mentions a removed `ShimmerImage` component.

## Verify before handoff

```powershell
npm.cmd run lint
npm.cmd run build
git diff --check
git status --short
```

Baseline as of 2026-07-10: build passes; lint exits successfully with 104 existing `@next/next/no-img-element` warnings and no errors. There are no automated tests. For visual/interaction changes, check desktop and mobile widths in a browser; custom cursor/hover behavior requires a fine pointer.

## GitHub

- Repository: `https://github.com/krysjezek/krystofs-portfolio`
- Default working branch in this checkout: `master`
- Remote: `origin`

```powershell
git status --short --branch
git diff
git add <files>
git commit -m "<concise message>"
git push origin master
```

Commit after each coherent change so the repository always has a clean recovery point. Keep commits narrowly scoped and use concise messages. Do not push, rewrite history, or open a PR unless the user asks. Preserve unrelated user changes.

## Vercel deployment

- Vercel project: `krystofs-portfolio`
- Production site/SEO canonical: `https://www.krystofjezek.com`
- This checkout may not have `.vercel/project.json` because `.vercel/` is intentionally ignored. Link once if needed:

```powershell
vercel.cmd link --project krystofs-portfolio --yes
vercel.cmd deploy --prod --yes
vercel.cmd inspect <deployment-url>
```

Deploy only when explicitly requested. Before production deployment, require a passing build and verify the affected page at the returned deployment URL.

## Known audit items

- `npm audit --omit=dev` currently reports 5 production dependency vulnerabilities (4 high, 1 moderate), including `next@16.1.6`; treat a framework upgrade as a dedicated task and retest visuals/build.
- `README.md` is still the create-next-app placeholder and contains stale `.tsx`/Geist guidance.
- `deploy.md` contains an old absolute checkout path, an SSH remote different from the current HTTPS remote, and assumes a local `.vercel` link. Use the portable commands above.
