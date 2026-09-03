import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { CompareProvider } from '@/context/CompareContext'
import { FavoriteProvider } from '@/context/FavoriteContext'

export const metadata = {
  title: 'TravelXXX — Find stays that fit your trip',

  description:
    'Discover trustworthy stays, transparent prices, and places matched to how you travel.',

  icons: {
    icon: '/favicon.ico',
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
    <html lang="en" className="light">
      <body className="antialiased">
        <CompareProvider>
          <FavoriteProvider>
            {children}
          </FavoriteProvider>
        </CompareProvider>

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}