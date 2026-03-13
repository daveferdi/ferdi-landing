import type { Metadata } from 'next'
import HomePage from '../page'

export const metadata: Metadata = {
  title: 'FERDI Skill Deploy | Brand Color Preview',
  description: 'Homepage color-only preview with FERDI brand palette.',
}

export default function BrandColorPreviewPage() {
  return (
    <div className="brand-palette-preview">
      <HomePage />
    </div>
  )
}
