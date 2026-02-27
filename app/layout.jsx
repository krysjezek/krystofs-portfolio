import Script from 'next/script'
import CustomCursor from '@/components/CustomCursor'
import LinkLines from '@/components/LinkLines'
import '@/styles/normalize.css'
import '@/styles/webflow.css'
import '@/styles/krystofs-portfolio.webflow.scss'

export const metadata = {
  title: 'Krystof Jezek, CGI Designer & Software Engineer',
  description: 'I craft high-end 3D and motion visuals for brands and studios. When I\'m not designing, I\'m building apps and tools that bridge art and tech',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — direct link, no JS loader */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Adobe Typekit */}
        <Script src="https://use.typekit.net/drn7car.js" strategy="afterInteractive" />
        <Script id="typekit-load" strategy="afterInteractive">{`
          try { Typekit.load(); } catch(e) {}
        `}</Script>

        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/webclip.jpg" />
      </head>
      <body>
        <CustomCursor />
        <LinkLines />
{children}
      </body>
    </html>
  )
}
