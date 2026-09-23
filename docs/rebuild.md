# Portfolio 2027 rebuild

The application is being rebuilt from the approved Figma design on `rebuild/portfolio-2027`.
The recoverable source is the annotated tag `checkpoint/pre-rebuild-2026-09-23`
(`5d7e130f1494e1438c30c04d7da5d6a9e9194cc0`). Do not merge, push or deploy without an explicit request.

## Scope and completion gates

- [x] Preserve the original implementation and all committed research in a Git checkpoint.
- [ ] Inventory existing media references and separately back up ignored local media.
- [ ] Extract project, recognition, service, CV and archive content from presentation code.
- [ ] Implement Work, Fun and About from their desktop, tablet and mobile Figma references.
- [ ] Implement all six current case studies, 3D Worlds, recognition, source notes and 404.
- [ ] Rebuild remaining public pages and archived direct URLs with the shared system.
- [ ] Preserve canonical URLs, public project eligibility, indexing and media behavior.
- [ ] Remove Webflow styles/markup, obsolete components, unused dependencies and stale guidance.
- [ ] Verify responsive appearance, keyboard use, history, media, error states and route policies.
- [ ] Pass lint, build, applicable tests and `git diff --check`; commit the finished work.

## Sources of truth

1. Owner instructions and current Figma screens: [Portfolio 2027](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=141-2398).
2. [Approved handoff](portfolio-2027-handoff-audit.md), [case rules](portfolio-2027-case-study-rules.md),
   [source notes](portfolio-2027-source-notes.md), [3D Worlds](portfolio-2027-3d-worlds.md).
3. [Motion direction](portfolio-2027-motion.md), implemented with reduced-motion alternatives.
4. Existing source content and stable CDN media. Earlier audit suggestions do not override approved decisions.

## Preserve versus replace

Keep content, evidence, media delivery assets, useful media behavior, URL policies and the
Next.js/React/Vercel foundation. Rebuild HTML, CSS and presentation components. No old
global stylesheet belongs in the new application. Archives remain direct-only and
`noindex, nofollow`; old UI implementations remain recoverable in Git.

Figma-only stills are previews, not proof that a delivery video exists. Missing source
masters/codec variants must remain explicit. Use approved posters until authorized
delivery files exist. Never infer a playable URL from its filename.

The homepage weather provider remains deferred in the approved handoff. Show Prague
time; omit weather when no selected provider supplies a current observation. The
airport experiment is not a requirement of the new homepage.
