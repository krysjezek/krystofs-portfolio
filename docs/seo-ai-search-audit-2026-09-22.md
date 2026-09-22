# SEO, AI search, credibility, and content audit — 22 September 2026

Krystof has credible work and credible external recognition. The main opportunity is to make that evidence visible, specific, consistent, and easier to act on. More promotional language or more schema will not substitute for that work.

This audit covers the live homepage at https://www.krystofjezek.com, its supporting service and case-study pages, and the current local checkout. “ASO” is interpreted as AI/answer-search optimization (usually called AEO or GEO), rather than app-store optimization. Recommendations are proposals; no website implementation or deployment was performed.

**Scope and evidence.** Inspected raw HTTP responses, metadata, JSON-LD, sitemap entries, source code, desktop rendering at 1264/1440px and mobile rendering at 390px, browser accessibility snapshots, external credit pages, and one mobile Lighthouse run. Sampled branded and commercial searches using the available web search provider; these are not controlled Google rank measurements. No Search Console, Bing Webmaster Tools, private campaign analytics, verified crawler logs, or comprehensive backlink database was available. Search positions, search volume, actual AI recommendation share, manual-action status, and real-user Core Web Vitals remain unmeasured. An audit can identify these gaps without inventing results.

**The deployed site is behind the checkout.** Live has 12 recognition entries, five works in homepage structured data, and four visible work cards. Local has 18 recognition entries and six works in structured data. `/work/vizcom` exists locally but returns HTTP 404 in a fresh production request. Production `/services/3d-environments` has title “Custom Motion Mockups for Agencies” and H1 “Custom Motion Mockups”; local has title “3D Worlds for Brands and Studios” and H1 “3D Worlds.” These differences are not necessarily bugs, but local improvements cannot affect production search until intentionally released.

**What already works well**

- Main content, links, and JSON-LD arrive in the initial HTML. The homepage being a client component does not make it an empty JavaScript shell. The local build confirms prerendering.
- The checked public pages have descriptive titles, descriptions, canonical URLs, and a single H1. HTTP/non-www variants resolve to the HTTPS www homepage. A fabricated nonexistent URL correctly returns 404.
- Production sitemap has 11 public URLs; local source lists 12, including Vizcom. All 11 production sitemap routes returned 200. The sitemap omits archival/test/print routes. Sampled archive and test pages, plus the print CV, have `noindex, nofollow`.
- `Person`, `WebSite`, `CreativeWork`, `ItemList`, and `VideoObject` data provide a useful foundation. The person has a stable ID, accented name variants, Prague location, email, and social profiles.
- All 19 unique image/video URLs extracted from the sampled live structured data returned 200 with appropriate image/video content types. This validates these URLs, not every media asset on the site.
- Most current images use responsive Next image delivery. Video posters exist before playback; local video logic respects reduced motion and data saving. The sampled Chromium session selected H.264 fallback, with no observed resource errors; codec preference varies by browser support.
- Case studies already include roles, deliverables, process, and collaborators. VSX explicitly credits TMRZV Studio; Vizcom locally credits Outland. This is a stronger approach than presenting every brand as a direct client.
- Independent credit pages substantiate real production experience. The code repositories linked from the homepage were publicly accessible in fresh requests.
- Local analytics already records contact, work, service, recognition, and identifiable AI-referral events. Build passed; lint passed with 61 existing image warnings and no errors. The older 104-warning/Next 16.1.6 repository notes are stale for this checkout.

**Technical and semantic findings, in priority order**

| Priority | Verified finding | Recommended action and acceptance check |
| --- | --- | --- |
| P1 | About, location, experience, education, and recognition trigger disappear at 390px. `.container-3.nopad` is `display: none` in the mobile rules near SCSS line 8566. | Restore access on mobile. A compact expandable About section is fine. Check that a phone visitor and browser agent can read the bio and follow the evidence links. |
| P1 | Muzli’s genuine portfolio feature links through a tracking URL to `/work/the-mag-wrap`, which returns 404. Its former archive destination `/work/old-projects/the-mag-wrap23` also returns 404 in fresh HTTP requests. A cached search fetch still describes the old page. | Recover the original page at its archival URL and redirect the old URL there, keeping archival noindex policy; or map it to an actually equivalent replacement. Do not silently equate the 2023 and 2025 seasons. Verify final status and content with a fresh request. Do not redirect every missing URL to the homepage. |
| P1 | Live navigation says “3D Environments,” but its destination sells “Custom Motion Mockups.” Local switches to “3D Worlds,” an evocative but less explicit service label. | Choose one clear commercial offer and align title, H1, introduction, internal anchors, examples, and metadata. Keep the current URL if appropriate; an aesthetic rename does not require a URL migration. |
| P1 | Homepage emits Chainer in its featured-work graph although its card is hidden. Local also retains a homepage mixed-reality reel in JSON-LD after removing the corresponding service card. | Make homepage schema reflect visible homepage content; retain Chainer schema on its actual page. Check every emitted video against what users can watch on that page. Google requires representative, truthful structured data. [Structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) |
| P1 | `videoStructuredData()` constructs every upload date as January 1 of its creation year. This is a fabricated precision, not a verified upload date. | Store the actual first-publication date for each video. Keep creation, campaign, case-study publication, and article publication dates distinct. Add truthful duration where useful. A descriptive summary of a silent video belongs in its description rather than pretending to be a spoken transcript. [VideoObject documentation](https://developers.google.com/search/docs/appearance/structured-data/video) |
| P1 | Contact buttons copy email rather than opening email. Success only changes custom-cursor data; there is no visible mobile confirmation, live region, or clipboard error handling in `CopyEmailLink.jsx`. | Make the principal contact link a descriptive `mailto:` link with visible email; retain a separately labelled copy button with success/error feedback. Browser agents should understand the action without needing a custom cursor. |
| P2 | “Why art-directed 3D,” R&D, Chainer, and metric badges remain in HTML while hidden in the rendered homepage. Search extraction nevertheless surfaced some of that text. | Remove obsolete blocks or make useful content accessible. Do not maintain an invisible SEO paragraph bank. This is an inconsistency, not proof of deliberate cloaking or a penalty. The recognition dialog is different: its content is available on user request on desktop and is already server-rendered. |
| P2 | Hero paragraph is 12px at 390px. No horizontal overflow was observed, but reading is unnecessarily difficult. | Test a 16px body size and more generous layout. Keep the name, specialty, strongest work, proof, and contact legible before secondary promotion. |
| P2 | The primary navigation exposes only the name/home link; the hero/footer expose services and tech. Work index and CV are weakly promoted. | Add clear Work, Services, About, and Contact navigation as appropriate. Link service pages to relevant case studies and case studies back to the related service. Every important page should have a useful crawlable entry path. [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) |
| P2 | Some schema is semantically loose: Person image is the general OG artwork; director/designer roles are broader than the narrow visible bio. | Use the actual portrait for Person, precise visible roles, and only identity-equivalent profiles in `sameAs`. Link articles as evidence in content, rather than placing every press article in `sameAs` or calling every feature an award. |
| P3 | Image sitemap mainly lists OG artwork and video posters. `<image:title>` is legacy metadata. | Consider including representative project stills and descriptive captions. Use truthful `lastmod` values on substantive updates; do not update timestamps automatically to suggest freshness. No need to expand every image into a separate SEO page. |

**Performance needs targeted work, not a rewrite.** Lighthouse 13.5.0, one simulated mobile run at 2026-09-22 18:57 UTC: performance 77, accessibility 91, best practices 100, basic SEO 100; FCP 1.5s, LCP 6.2s, total blocking time 50ms, CLS 0.003, captured transfer approximately 1,037 KiB. This is a lab sample, not field performance, an INP measurement, or evidence of ranking strength.

The LCP element was the Motion Mockups promo background (`.div-block-152`): a roughly 244KB PNG, discovered through CSS without high fetch priority. Lighthouse estimated roughly 220KB savings for that image and flagged discovery. Replace this decorative duplicate background with the existing responsive poster where possible, or explicitly optimize and prioritize the actual LCP image. Do not indiscriminately preload all media. The report also flags image sizing, approximately 300ms of render-blocking opportunity, four font files in the critical dependency tree, and a Tech Projects contrast issue. Visually confirm contrast through animation states before changing colors. Preserve the low CLS and low blocking time. Validate across representative mobile devices and then field data. Google’s good-experience targets are LCP within 2.5s, INP under 200ms, and CLS under 0.1. [Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

**The recognition links are useful, but their kinds of value differ.** An outgoing link helps someone verify your claim. A real incoming link may support discovery and search signals; an unlinked named credit still gives readers corroboration. Linking to a prestigious publisher does not transfer that publisher’s reputation automatically. `noopener`/`noreferrer` on your outgoing links are not `nofollow`. The table distinguishes the sources rather than counting all 18 as equivalent endorsements.

| Recognition in local component | Evidence checked | Assessment |
| --- | --- | --- |
| [Awwwards](https://www.awwwards.com/sites/krystof-portfolio-website) | Source states Honorable Mention, December 7, 2023. Incoming links have mixed rel attributes, including nofollow. | Genuine website recognition. Keep the exact distinction; it is not Site of the Day or a CGI campaign award. It concerns an earlier portfolio version. |
| [Vizcom / The Brand Identity](https://the-brandidentity.com/project/outlands-brand-for-design-platform-vizcom-puts-process-over-polish) | Named 3D credit and direct portfolio link. | Strong topical evidence. Promote alongside the case study once it is actually live. |
| [The Brand Identity directory](https://the-brandidentity.com/directory) | Both “Krystof Jezek” and “Kryštof Ježek” appear with links to the same site. | Real directory presence, not proof of a separately commissioned editorial profile. Duplicate name entries are an entity-consistency opportunity; request consolidation when appropriate. |
| [Motionfolios](https://motionfolios.com/inspirations/krystof-jezek) | Browser-rendered profile and Visit Site link verified; raw HTML extractor got no profile text. Embedded portfolio says “refused to connect.” | Real listing, but less accessible to simple extractors. Ask for a screenshot preview instead of weakening global iframe protection. Its “with his team” wording may need updating to match independent practice. |
| [Shelby / The Brand Identity](https://the-brandidentity.com/project/how-ashfall-built-out-shelbys-identity-from-an-extruded-hexagon) | Named 3D credit and direct portfolio link. | Strong supporting evidence; keep Ashfall’s identity-design credit explicit. Remove the unnecessary `brid` query from the outgoing URL. |
| [DESIGN BOD](https://www.instagram.com/p/DWV5ftiDJhn/) | Public page metadata credits Krystof and praises Motion Mockups; March 26, 2026. | Genuine social spotlight, specifically about the mockup work. Not an award or direct client testimonial. |
| [Database](https://www.instagram.com/p/DUiLHrFjBYK/) | Public metadata names Less and Better and Krystof for ValkaAI, February 9, 2026. | Genuine project feature. Keep the collaboration wording. |
| [VEHA / Brands in Motion](https://www.brandsinmotion.xyz/resource/yiskra-veha) | Explicit 3D Motion credit, January 2026. | Strong corroboration of the stated role. |
| [3D Art Academy](https://www.linkedin.com/posts/3dartacademy_3drendering-blender3d-cgi-ugcPost-7388975297259413505-U6d6) | Public metadata names and praises Krystof’s rendering. | Genuine social praise; access may vary across crawlers. |
| [Fifth Row / Brands in Motion](https://www.brandsinmotion.xyz/resource/ashfallstudio-fifthrow) | Explicit 3D credit, April 2025. | Good production evidence; not ownership of the full brand identity. |
| [Tekuma / Brands in Motion](https://www.brandsinmotion.xyz/resource/ashfallstudio-tekuma) | Explicit Case Study 3D credit, February 2025. Another person is credited as 3D Designer. | Current scoped wording is good. Preserve the distinction between case-study imagery and the identity’s core 3D design. |
| [Lucas Miller](https://www.linkedin.com/posts/lucaselijahmiller_3drendering-blender3d-jewelrydesign-ugcPost-7282809161397010433-Mj1i) | Public metadata names Krystof and praises realism/detail. | Genuine social praise; not a client outcome measurement. |
| [Barbour / Monopo](https://monopo.london/work/barbour-icons-in-quilting/) | Main narrative explains his contribution; credits name 3D Design & Animation. | Among the strongest proofs. The inspected credit is plain text, not a portfolio backlink. |
| [Yonex ASTROX / Monopo](https://monopo.london/work/yonex-astrox-88-sd-launch-campaign/) | Explicit 3D & Motion Designer credit. | Strong role evidence; no direct portfolio backlink found. |
| [Muzli 2023 roundup](https://muz.li/blog/60-most-creative-portfolio-websites-of-2023/) | Real entry with a malformed title “Krysto — fThe Mag W/RAP”; outbound tracking link is nofollow and targets an obsolete URL. | Genuine feature, but repair the destination. Do not describe it as winning a ranked competition. |
| [Yonex All England / Monopo](https://monopo.london/work/yonex-all-england-brand-identity/) | Specifically Motion designer (Teasing assets). | Strong, narrowly scoped credit; current teaser wording is accurate. |
| [Yonex All England / Abduzeedo](https://abduzeedo.com/yonex-all-englands-vibrant-branding-refresh) | Krystof appears among three motion designers in project credits. | Say “Motion-design credit in Abduzeedo’s feature on Monopo’s Yonex identity.” “Featured by Abduzeedo” can otherwise suggest a personal profile. |
| [ARCFEST / Monopo](https://monopo.london/work/arcfest-badminton-digital-festival/) | Krystof and Julien Suard named for motion design. | Valid production credit, not sole authorship. |

The named roles were corroborated. Not every displayed month was independently verified, and the directory/feature counts are not an authority score. No evidence here establishes that any listing was paid. If a placement is paid, label it honestly and have the publisher qualify paid links appropriately. Do not buy followed links. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

Put two or three relevant proofs close to the hero/work, with a readable full “Recognition and credits” page or section. Keep the dialog as an enhancement if desired. Order for the target buyer: relevant project credit, relevant publication, then design-award/directory/social evidence. Eighteen links behind one button are less persuasive than three relevant, immediately understandable proofs.

**Credibility issues are mostly imprecision, not evidence of dishonesty.**

The biggest problem is outcome attribution. VSX says 870k organic views in the case study while hidden homepage HTML says 900k. The Mag says 10,000+ Patreon subscribers in the case study and 11,000+ in hidden homepage HTML. These could be different snapshots, but there are no exact snapshot dates. The Mag’s “+50% watch-time” cannot be computed from public cumulative views and Patreon counts. Barbour’s “30% more engagement” needs a definition, comparison set, and timeframe. Public Instagram totals do not by themselves establish that views were organic rather than promoted.

Use “Campaign reach” or “Published audience figures” rather than “Total Impact” when causality is not measured. Include platform, as-of date, source, and measurement method. Explain whether the number covers one post, the entire campaign, or an entire season. Attribute private figures to client analytics if that is the source and you have permission. Remove “most-watched show on Czech and Slovak YouTube” unless there is a defensible scope and independent comparison. None of these claims was disproved; their current evidence is inadequate for the strength of the wording.

Label the logo row “Selected brands I’ve contributed work to, directly and through partner studios” if truthful. The independent portfolio is credible without implying each relationship was direct. The code/CGI combination is a real differentiator; distinguish personal research from commissioned work and academic projects. If education status is mentioned, make completion status explicit rather than suggesting a degree through dates alone. Do not add a degree, client quote, award, team size, response-time promise, or business result without support.

**Copy verdict: competent, occasionally generic, and underselling the strongest evidence.**

The specific process and deliverable descriptions are convincing. The interchangeable adjectives and broad positioning do less work. “High-end” is a claim the imagery can support, but it is not a reason to choose Krystof. “Designer and creative problem solver” could describe almost any portfolio. “Bridge art and tech” becomes believable only when the tools, code, and production advantages are shown. “A nerd with taste” has personality; keep it in the bio rather than making it carry the commercial proposition.

The opening sentence about free-time software work takes valuable space before explaining the main deliverables. “I still take on broader projects when they’re a good fit” reads slightly defensive. Present the specialty confidently, with adjacent capabilities beneath it. The Motion Mockups promotion before commissioned work makes the first screen partly a template-store advertisement. Move it below selected work if premium custom commissions are the primary goal.

Suggested hero, using facts already supported by the site:

> **CGI environments & motion design for brands and studios**
>
> I’m Kryštof Ježek, an independent CGI designer based in Prague. I create 3D brand worlds, product films, and mixed-reality campaigns, working directly with brands and alongside design studios.
>
> **View selected work** · **Discuss a project**

Suggested proof sentence:

> Selected contributions include 3D design and animation for Monopo’s Barbour campaign and 3D work for Outland’s Vizcom identity.

Link each clause to the actual project and independent credit. Publish the Vizcom page before linking to it. Suggested title: `Krystof Jezek — CGI Environments & Motion Design`. Suggested description: `Prague-based independent CGI designer creating 3D brand worlds, product animation and FOOH campaigns for brands and design studios. Explore selected work.` These are editorial proposals, not guarantees about which search snippet Google will display.

Suggested Work introduction:

> Selected CGI environments, product films, and motion identities. Each project includes my role, the production approach, and the people I worked with.

For each case study, keep the existing role/brief/process/result structure but add one difficult, specific production decision and its evidence: a simulation constraint, a rejected lighting approach, a tracking challenge, a version comparison, or how the asset system was reused. A short original breakdown is more useful than another paragraph saying the result was immersive and premium. The local Vizcom text—32-second animation, four stills, workshop setting, camera choreography, named partner—is a good model.

Service pages should answer actual buying questions: whom the service suits, outputs and formats, input files needed, collaboration with an agency’s art director, approval stages, what changes scope, handover, licensing/source-file policy, and how to start. Publish budget ranges, typical timing, timezone overlap, NDA terms, or source-file promises only after Krystof confirms them. Existing mixed-reality FAQs already cover several of these; extend the useful answers rather than adding keyword variants.

**What the research supports for SEO and AI search**

Google’s current guidance prioritizes original, useful content and a clear technical structure. It explicitly rejects special Google ranking value from `llms.txt`, arbitrary content chunking, inauthentic mentions, and excessive focus on schema. The practical recommendation here is better project evidence and clearer buyer information—not an AI-specific prose formula. [Google’s AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

OpenAI distinguishes search access (`OAI-SearchBot`) from training access (`GPTBot`) and user-triggered fetches (`ChatGPT-User`). Allowing training is not required to allow ChatGPT search. The live robots file already allows them all. This is permission, not a ranking guarantee; production infrastructure must also let legitimate crawlers fetch pages. [Official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)

Current Google controls also deserve checking in the actual account: Settings → Search generative AI should include the site or inherit an included setting. Inclusion is the default, but this audit cannot inspect the property setting. [Search generative AI control](https://support.google.com/webmasters/answer/16908024)

Human-readable question-and-answer content is useful. FAQ schema is not a shortcut: Google retired FAQ rich results in May 2026. Service/Person/CreativeWork schema can clarify entities but does not confer special “recommended designer” status. E-E-A-T is a quality framework, not a numeric field to increase. [Google updates](https://developers.google.com/search/updates), [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

Browser-agent usability is a related but distinct task from AI recommendation visibility. Keep native anchors/buttons, clear labels, visible success states, predictable navigation, accessible dialogs, and information in text. The desktop recognition dialog passed a browser-agent open/read check; the mobile hiding rule prevents access. Email-copy behavior is unnecessarily ambiguous. A special MCP server, chatbot, or agent-only endpoint is not necessary to let someone evaluate and contact a designer.

No inspected evidence demonstrates keyword stuffing, a link scheme, doorway pages, or deliberate cloaking. That is not a full backlink/manual-action clearance. Correct hidden-content/schema mismatches and unsupported precision before expanding. Avoid fake testimonials, self-awarded review stars, hundreds of city pages, generic AI-written design articles, and unverifiable “best designer” claims. Relevant editorial coverage, credited collaborations, useful original breakdowns, and honest buyer information are the sustainable direction.

**Comparison with other portfolios**

This is a small, relevant content benchmark, not a ranking league table. These pages were inspected; their conversion rates, backlinks, and Google rankings were not measured.

| Portfolio | Observable strength | Lesson for Krystof |
| --- | --- | --- |
| [Nicolas Papin](https://nicolaspapin.fr/) | Explicit product CGI/animation/set-design offer for US agencies; clear FAQ on process, team structure, confidentiality, and collaboration; project inquiry form. | Stronger buyer qualification and operational clarity. Krystof can explain the working relationship this directly while preserving his own visual identity. |
| [Alex Glawion](https://www.alexglawion.com/) | Immediate specialty statement and plainly named project outputs: packshots, ads, device visualizations, films. | Descriptive project labels reduce ambiguity. Krystof’s dedicated case-study narratives offer more room for evidence than this sparse homepage. |
| [Peter Tarka](https://petertarka.com/) | Separates commercial work from personal experiments, names recognizable projects, and gives representation/contact details. | Clear distinction between paid work and exploration, plus a direct commissioning route. Do not infer that sparse copy causes search success; an established external reputation changes the context. |
| [Monopo’s Barbour case study](https://monopo.london/work/barbour-icons-in-quilting/) | Explains the challenge, creative approach, production, global collaboration, and named team. | A useful case-study benchmark rather than a freelancer peer. Krystof is already part of this evidence; link to it and make his specific contribution easy to find. |

Krystof’s technical content delivery and depth of project material are competitive in this sample. His weakest relative point is commissioning clarity and the visibility of proof. There is no evidence to assign an honest percentile or declare him above/below these designers in Google or AI recommendations.

**A ranking strategy needs a defined query and buyer.** “Number one on Google” has no single meaning without geography, language, query, and device. The audit’s branded search sample did surface the homepage and external profiles; it does not establish Google #1. Start with branded-name coverage, then commercial searches that fit actual work:

| Intent | Candidate query family, to validate in search data | Best destination |
| --- | --- | --- |
| Find this person | Krystof Jezek / Kryštof Ježek CGI designer | Homepage + consistent profiles |
| Commission a brand environment | CGI brand worlds, 3D environments for brands, freelance CGI designer | Existing environments service |
| Commission a campaign | FOOH CGI artist, mixed-reality campaign production | Mixed-reality service + Barbour |
| Commission a specific output | CGI sportswear animation, cloth simulation product film | VSX case study; a dedicated service only if it becomes a sustained offer |
| Buy/customize presentation assets | Custom animated brand mockups | Clear custom-work section; Motion Mockups site for ready-made products |

These are intent hypotheses, not measured high-volume keywords. “3D environment artist” alone can attract game-environment or architectural intent. “3D Worlds” needs the surrounding brand/campaign context. If Czech commissions matter, consider genuinely localized Czech pages later with accurate translations and reciprocal language metadata; do not create thin location variants or a fictitious office. Prioritize two strong commercial offers over trying to rank for every creative skill.

**Recommended execution order**

1. Restore mobile proof and improve reading size; repair the dead externally linked URL; provide a clear email action. These improve the experience before buying more traffic.
2. Reconcile visible work, schema, video dates, metrics, and attribution. Promote three strongest proofs. Review the local/live differences as a deliberate release, not an automatic deployment of every local commit.
3. Resolve the LCP promo image, verify the contrast finding, and remeasure. Target actual bottlenecks while preserving the visual portfolio.
4. Tighten homepage/service positioning; put relevant work before the template promotion; publish the completed Vizcom case study through the normal authorized release process.
5. Deepen two or three existing case studies with original production evidence. Add permissioned client comments if available. Invite partners to link their existing factual credits to the matching portfolio work; no automated outreach was sent.
6. Measure monthly and improve based on actual discovery and qualified inquiries. Do not promise a ranking position or fabricate ROI.

**Measurement plan and unresolved inputs.** Establish a baseline of branded/nonbranded impressions, clicks, average position by query/country/device, indexed canonical URLs, query-to-page fit, and qualified inquiries. Use URL Inspection for the homepage and service/case-study pages, including rendered mobile content. Check Google’s current dedicated Generative AI performance reports and inclusion setting, rather than assuming all AI visibility is unmeasurable or available only in the old aggregate Web report. [Google’s June 2026 announcement, updated August 31](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)

Use Bing Webmaster Tools’ AI Performance for citation activity and grounding-query samples; citation counts are not rankings. IndexNow can notify participating engines of real content changes, but is not a ranking boost. [Bing AI Performance documentation](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

Track form/email/call leads to qualification where possible: an email-copy click is not a sent inquiry or booked job. Existing AI referral tracking is useful but incomplete when referrers are stripped or recommendations produce no click. For a small fixed set of realistic buyer prompts, record the model/product, date, location context, recommendations, citations, and factual errors repeatedly over time. A single answer from an assistant is not a stable ranking.

Before making numerical outcome claims, obtain the campaign metrics and methodology. Before choosing markets/budget promises, confirm the actual target buyer and working terms. The audit is complete as an evidence-based assessment; implementation, private-data validation, and ongoing ranking improvements remain separate work.
