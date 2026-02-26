import Script from 'next/script'

export const metadata = {
  title: 'Krystof Jezek, CGI Designer & Software Engineer',
  description: 'I craft high-end 3D and motion visuals for brands and studios. When I\'m not designing, I\'m building apps and tools that bridge art and tech',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google WebFont loader */}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          strategy="beforeInteractive"
        />
        <Script id="webfont-load" strategy="beforeInteractive">{`
          WebFont.load({ google: { families: ["IBM Plex Mono:300,400,500,600,700","Inter:300,400,500,600,700"] } });
        `}</Script>

        {/* Adobe Typekit */}
        <Script src="https://use.typekit.net/drn7car.js" strategy="beforeInteractive" />
        <Script id="typekit-load" strategy="beforeInteractive">{`
          try { Typekit.load(); } catch(e) {}
        `}</Script>

        {/* Webflow CSS */}
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/webflow.css" />
        <link rel="stylesheet" href="/css/krystofs-portfolio.webflow.css" />

        <link rel="shortcut icon" href="/favicon.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/webclip.jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
