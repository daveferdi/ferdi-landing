import type { Metadata } from 'next'
import './ferdi-tokens.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ferdi | Infrastructure that gets out of your way',
  description:
    'Ferdi builds modern infrastructure tooling that keeps teams focused, confident, and shipping.',
  keywords: 'Ferdi, infrastructure, developer platform, startup',
  openGraph: {
    title: 'Ferdi',
    description:
      'Infrastructure that gets out of your way.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  )
}
