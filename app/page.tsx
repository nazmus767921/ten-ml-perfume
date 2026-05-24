import HeroSection           from "@/components/storefront/landing/HeroSection"
import NewArrivalsSection    from "@/components/storefront/landing/NewArrivalsSection"
import TrendingNowSection    from "@/components/storefront/landing/TrendingNowSection"
import ShopByCategorySection from "@/components/storefront/landing/ShopByCategorySection"
import BrandSpotlightSection from "@/components/storefront/landing/BrandSpotlightSection"
import GiftBundlesSection    from "@/components/storefront/landing/GiftBundlesSection"
import ReviewsMarqueeSection from "@/components/storefront/landing/ReviewsMarqueeSection"
import WhyTenMLSection       from "@/components/storefront/landing/WhyTenMLSection"
import FAQSection            from "@/components/storefront/landing/FAQSection"

export default function Page() {
  return (
    <div className="flex min-h-(--page-height-safe) flex-col">
      <HeroSection />
      <NewArrivalsSection />
      <TrendingNowSection />
      <ShopByCategorySection />
      <BrandSpotlightSection />
      <GiftBundlesSection />
      <ReviewsMarqueeSection />
      <WhyTenMLSection />
      <FAQSection />
    </div>
  )
}
