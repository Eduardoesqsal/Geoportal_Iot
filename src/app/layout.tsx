import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'GeoPortal IoT',
  description: 'Monitoreo geoespacial de sensores IoT en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
