import { FinalCta } from "@/components/landing/final-cta"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { Navbar } from "@/components/landing/navbar"
import { ProductPreview } from "@/components/landing/product-preview"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
