import FinalCtaSection from '@/components/sections/FinalCtaSection'
import FooterSection from '@/components/sections/FooterSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ProblemSection from '@/components/sections/ProblemSection'
import StatsSection from '@/components/sections/StatsSection'
import TrustLogosSection from '@/components/sections/TrustLogosSection'
import Hero from '@/src/components/landing/Hero'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--ferdi-white)] text-[var(--color-text-primary)]">
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <StatsSection />
        <TrustLogosSection />
        <FinalCtaSection />
      </main>
      <FooterSection />
    </div>
  )
}
