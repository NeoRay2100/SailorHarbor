import './globals.css'
import { Inter } from 'next/font/google'
import { GoogleAnalytics, UmamiAnalytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "丈母娘模拟器",
  description:
    "丈母娘模拟器"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <meta
        name="description"
        content="丈母娘模拟器"
      />
      <meta
        property="og:description"
        content="丈母娘模拟器"
      />
      <meta property="og:title" content="丈母娘模拟器" />
      <meta
        name="twitter:description"
        content="丈母娘模拟器"
      />
      <meta
        property="og:image"
        content="https://hong.azhubaby.com/og-image.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@JOJOhanbo" />
      <meta name="twitter:title" content="丈母娘模拟器" />
      <meta name="twitter:description" content="丈母娘模拟器" />
      <meta name="twitter:image" content="https://hong.azhubaby.com/og-image.png" />
      <meta name="twitter:creator" content="@JOJOhanbo" />
      <meta name="google-site-verification" content={process.env.GOOGLE_CONSOLE} />
      <body className={inter.className}>
        {children}
      </body>
      {process.env.NODE_ENV === "development" ? (
        <></>
      ) : (
        <>
          <GoogleAnalytics />
          <UmamiAnalytics />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8924495239960816"
            crossOrigin="anonymous"></script>
        </>
      )}
    </html>
  )
}
