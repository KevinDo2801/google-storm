import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Import test utilities for development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/weather-test-utils')
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: '<kevindo.dev> - Sustainable Crisis Resource Finder',
  description: 'Find emergency shelters, food banks, and clinics in your area during crisis situations. Powered by sustainable technology.',
  keywords: ['emergency', 'crisis', 'shelter', 'food bank', 'clinic', 'disaster relief', 'sustainable', 'green'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
