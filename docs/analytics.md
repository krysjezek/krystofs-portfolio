# Vercel Web Analytics

[Project dashboard](https://vercel.com/krystofjezeks-projects/krystofs-portfolio/analytics)

Web Analytics is enabled on the existing Pro project. `components/VercelAnalytics.jsx` mounts the Next.js integration once in the root layout, collecting page views and client-side route changes. `components/AnalyticsEvents.jsx` tracks deliberate interactions through one delegated listener that also covers controls rendered after navigation.

## Events

| Event | Trigger | Properties |
| --- | --- | --- |
| `contact_click` | Email, phone, Calendly or WhatsApp link | `method`, `placement` |
| `work_open` | Case-study link | `path`, `placement` |
| `service_open` | Service-page link | `path`, `placement` |
| `cv_open` | CV or print-CV link | `path`, `placement` |
| `cv_print` | Browser print action on a CV page | `path` |
| `outbound_click` | External web link, including social profiles and Motion Mockups | `destination`, `placement` |
| `section_nav` | Work/Fun/About tab change or section anchor | `section`, `placement` |
| `recognition_open` | Open Mentions and credits | `placement` |
| `weather_open` | Open weather details | `placement` |
| `airspace_open` | Click/tap Prague to open airspace details | `placement` |
| `source_detail_open` | Click a case-study source figure | `figure` |
| `coming_soon_click` | Click/tap an informational project card | `project`, `section` |
| `ai_referral` | Recognized AI referrer or `utm_source`, once per source/landing path per browser session | `source`, `landing_path` |

Placements distinguish header, introduction, footer, Work/Fun/About, recommendations, credits, recognition and other content. The event's page URL is supplied by Vercel. External destinations omit query strings and fragments. Contact events omit recipient addresses and message bodies. Events use at most two string properties, each limited to 255 characters, matching standard Pro [custom-event limits](https://vercel.com/docs/analytics/limits-and-pricing). No new paid add-on is required.

Active-tab re-clicks, popover closes, hover previews, autoplay loops, and weather/aircraft polling do not create events. Mouse, touch, keyboard activation and middle-click links are covered. Development uses the SDK's debug behavior; browser tests capture SDK calls and block the collector to avoid synthetic traffic.

Open the Analytics dashboard's Events panel and select an event to inspect/filter it. `contact_click` measures contact intent, not a successfully sent email. `cv_print` measures opening the browser print flow, not confirmation that a document was printed.

## Verification

Run `npm run test:analytics` against the local dev server. Override `INTERACTION_BASE_URL` to test a different accessible build. The browser suite checks actual event payloads, contact classification, query stripping, tab/keyboard behavior, control opens versus closes, project links, CV actions, referral deduplication, listener cleanup, and the two-property limit. The test does not submit analytics events.
