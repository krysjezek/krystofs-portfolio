import Script from 'next/script'
import ClientCursor from '@/components/ClientCursor'
import JsonLd from '@/components/JsonLd'
import LinkLines from '@/components/LinkLines'
import ScrollReveal from '@/components/ScrollReveal'
import VercelAnalytics from '@/components/VercelAnalytics'
import { OG_IMAGE, OG_IMAGE_ALT, SITE_URL, pageSeo, siteStructuredData } from './seo'
import '@/styles/normalize.css'
import '@/styles/webflow.css'
import '@/styles/krystofs-portfolio.webflow.scss'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Krystof Jezek, Independent 3D Designer',
    template: '%s — Krystof Jezek',
  },
  description: 'Independent 3D designer creating art-directed environments and visualizations for brands and studios, supported by a background in software engineering and motion design.',
  ...pageSeo('/'),
  openGraph: {
    ...pageSeo('/').openGraph,
    type: 'website',
    siteName: 'Krystof Jezek',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: OG_IMAGE,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-mod-js" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://s3.amazonaws.com" />
        <link rel="preconnect" href="https://cdn.prod.website-files.com" />

        <Script id="webflow-touch-class" strategy="beforeInteractive">{`
          (function(window, document) {
            var html = document.documentElement;
            if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
              html.className += ' w-mod-touch';
            }
          })(window, document);
        `}</Script>

        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/webclip.jpg" />
      </head>
      <body className="body">
        <ClientCursor />
        <JsonLd data={siteStructuredData()} />
        <LinkLines />
        <ScrollReveal />
        {children}
        <VercelAnalytics />
      </body>
    </html>
  )
}
