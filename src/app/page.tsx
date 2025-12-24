import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { FeaturedSection } from '@/components/home/FeaturedSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedSection />
      <HowItWorks />
    </>
  )
}
