import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Local Korea — Preview App',
  description: 'UI preview for Local Korea vNext',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

