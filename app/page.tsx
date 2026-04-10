import ProblemSection from '@/components/sections/ProblemSection'
import Hero from '@/src/components/landing/Hero'
import GlassCarousel from '@/src/components/landing/GlassCarousel'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--ferdi-white)]">
      <main>
        <Hero />
        <div className="relative z-20 mt-[-220px] max-md:mt-[-140px]">
          <GlassCarousel />
        </div>
        <ProblemSection />
      </main>
    </div>
  )
}
