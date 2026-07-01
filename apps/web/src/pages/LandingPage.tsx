import { Navbar } from "../components/layout/Navbar"
import { Hero } from "../components/landing/Hero"
import { ProductPreview } from "../components/landing/ProductPreview"
import { TrustedBy } from "../components/landing/TrustedBy"
import { Features } from "../components/landing/Features"
import { AIChatPreview } from "../components/landing/AIChatPreview"
import { HowItWorks } from "../components/landing/HowItWorks"
import { CTA } from "../components/landing/CTA"
import { Footer } from "../components/layout/Footer"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative">
      <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-noise z-0 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
        <Hero />
        <ProductPreview />
        <TrustedBy />
        <Features />
        <AIChatPreview />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
      </div>
    </div>
  )
}
