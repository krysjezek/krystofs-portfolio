import Script from 'next/script'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import ClientCursor from '@/components/ClientCursor'
import LinkLines from '@/components/LinkLines'
import '@/styles/normalize.css'
import '@/styles/webflow.css'
import '@/styles/krystofs-portfolio.webflow.scss'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    default: 'Krystof Jezek, CGI Designer & Software Engineer',
    template: '%s — Krystof Jezek',
  },
  description: 'I craft high-end 3D and motion visuals for brands and studios. When I\'m not designing, I\'m building apps and tools that bridge art and tech',
  openGraph: {
    type: 'website',
    siteName: 'Krystof Jezek',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://s3.amazonaws.com" />
        <link rel="preconnect" href="https://cdn.prod.website-files.com" />

        {/* Adobe Typekit */}
        <Script src="https://use.typekit.net/drn7car.js" strategy="lazyOnload" />
        <Script id="typekit-load" strategy="lazyOnload">{`
          try { Typekit.load(); } catch(e) {}
        `}</Script>

        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/webclip.jpg" />
      </head>
      <body>
        <ClientCursor />
        <LinkLines />
{children}
      </body>
    </html>
  )
}
