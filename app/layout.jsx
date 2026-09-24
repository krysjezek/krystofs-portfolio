import JsonLd from "@/components/JsonLd";
import Footer from "@/components/portfolio/Footer";
import Experience from "@/components/portfolio/Experience";
import VercelAnalytics from "@/components/VercelAnalytics";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_URL,
  pageSeo,
  siteStructuredData,
} from "./seo";
import "@/styles/portfolio.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Krystof Jezek, Independent CGI Designer",
    template: "%s | Krystof Jezek",
  },
  description:
    "Independent CGI designer creating art-directed environments, motion visuals, and mixed reality campaigns for brands and studios.",
  ...pageSeo("/"),
  openGraph: {
    ...pageSeo("/").openGraph,
    type: "website",
    siteName: "Krystof Jezek",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: OG_IMAGE,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/RoobertPRO-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RoobertPRO-Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com"
        />
        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/webclip.jpg" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <JsonLd data={siteStructuredData()} />
        <div className="portfolio-shell">
          <div className="page-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          {children}
          <Footer />
        </div>
        <Experience />
        <VercelAnalytics />
      </body>
    </html>
  );
}
