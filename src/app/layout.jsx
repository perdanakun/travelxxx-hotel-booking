import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'TravelXXX — Find stays that fit your trip',
  description: 'Discover trustworthy stays, transparent prices, and places matched to how you travel.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
