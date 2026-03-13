import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FERDI Skill Deploy | AI Agent Deployment Platform',
  description:
    'Deploy AI agent skills in seconds with automatic framework detection, claimable deployments, and Vercel integration.',
  keywords: 'Skill Deploy, AI Agent Deployment, Vercel, Next.js, Vite, Astro, DevOps',
  openGraph: {
    title: 'FERDI Skill Deploy',
    description:
      'The fastest way to turn AI agent scripts into live, claimable deployments with full Vercel integration.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="relative min-h-screen ferdi-atmosphere-root">
        <div className="ferdi-global-atmosphere" aria-hidden="true">
          <div className="ferdi-atmo-plane ferdi-atmo-plane-base" />
          <div className="ferdi-atmo-plane ferdi-atmo-plane-smoke" />
          <div className="ferdi-atmo-plane ferdi-atmo-plane-warm" />
          <div className="ferdi-atmo-plane ferdi-atmo-plane-cool" />
          <div className="ferdi-atmo-plane ferdi-atmo-plane-falloff" />
        </div>
        {children}
      </body>
    </html>
  )
}
