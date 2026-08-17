import { DataReadiness } from "@/components/landing/data-readiness"
import { FaqAndCta } from "@/components/landing/faq-and-cta"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { ProcessSection } from "@/components/landing/process-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return <div className="min-h-screen bg-background"><Header /><main id="main-content"><HeroSection /><FeatureGrid /><ProcessSection /><DataReadiness /><FaqAndCta /></main><Footer /></div>
}
