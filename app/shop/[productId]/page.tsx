import ProductImageSlider from "@/components/storefront/products/ProductImageSlider"
import ProductDetailAddToCartSection from "@/components/storefront/products/ProductDetailAddToCartSection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TakaFormatter } from "@/lib/utils"
import RatingAndReviews, { RatingSummary, Review } from "@/components/storefront/products/ProductRatingAndReview"
import { DropIcon, TildeIcon } from "@phosphor-icons/react/dist/ssr"

const MY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyZnVtZSUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    alt: "Front view",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcmZ1bWUlMjBwcm9kdWN0fGVufDB8fDB8fHww",
    alt: "Side view",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcmZ1bWUlMjBwcm9kdWN0fGVufDB8fDB8fHww",
    alt: "Flat lay",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1615108395437-df128ad79e80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcmZ1bWUlMjBwcm9kdWN0fGVufDB8fDB8fHww",
    alt: "Flat lay",
  },
]

const FRAGRANCE_NOTES = {
  top: ["Pineapple", "Granny Smith apple", "Mandarin"],
  middle: ["Vanilla", "Oakmoss", "Cedarwood"],
  bottom: ["Caramel", "Dry Woods", "Ambergris", "Musk"],
}

const TAGS = ["Men's", "winter", "party"]

// Fetched from your API / DB
const summary: RatingSummary = {
  average: 4.5,
  total: 50,
  breakdown: [
    { star: 5, count: 30 },
    { star: 4, count: 10 },
    { star: 3, count: 5 },
    { star: 2, count: 3 },
    { star: 1, count: 2 },
  ],
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Nazmus Sakib",
    rating: 4,
    date: "13 Oct 2024",
    body: "One of the best one can get at this price...",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: 2,
    name: "Anonymous",
    rating: 5,
    date: "13 Oct 2024",
    body: "Great shop. recommended.",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: 3,
    name: "Anonymous",
    rating: 5,
    date: "13 Oct 2024",
    body: "Great shop. recommended.",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: 4,
    name: "Anonymous",
    rating: 5,
    date: "13 Oct 2024",
    body: "Great shop. recommended.",
    avatarUrl: "https://i.pravatar.cc/300",
  },
]

export default async function ProductDetailsPage({ params }: PageProps<"/shop/[productId]">) {
  const { productId } = await params

  return (
    <div className="container mx-auto w-full px-3 py-4 lg:px-6 lg:py-8">
      {/* Product Section */}
      <section className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        {/* IMAGES */}
        <div>
          <ProductImageSlider images={MY_IMAGES} autoPlayInterval={3000} />
        </div>

        {/* PRODUCT INFO */}
        <div className="info-section">
          <Badge variant={"secondary"} className="px-4 py-4 text-base uppercase">
            Latafa
          </Badge>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">Latafa Hawas</h1>

          {/* product tags */}
          <div className="mt-1 flex items-center gap-2">
            {TAGS.map((tag) => (
              <Badge key={tag} variant={"secondary"} className="py-3">
                {tag}
              </Badge>
            ))}
          </div>

          {/* price */}
          <div className="mt-6 text-xl font-bold tracking-tighter">{TakaFormatter.format(1200)}</div>

          <ProductDetailAddToCartSection
            product={{
              id: productId,
              name: "Latafa Hawas",
              price: 1200,
              mlVariants: [
                { ml: 3, price: 1200 },
                { ml: 5, price: 1800 },
                { ml: 10, price: 3200 },
                { ml: 15, price: 4800 },
                { ml: 30, price: 8500 },
              ],
            }}
          />

          {/* description */}
          <Card className="mt-6 lg:mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-1 text-base tracking-wide">
                <TildeIcon /> About
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base tracking-wide">
              Parfums de Marly Layton is a highly popular, luxurious, and versatile niche fragrance designed for both men and women, known for its
              addictive, crowd-pleasing scent profile. It is best characterized as a sweet, spicy, and woody vanilla fragrance.
            </CardContent>
          </Card>

          {/* Fragrance Notes */}
          <Card className="mt-3 lg:mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-1 text-base tracking-wide">
                <DropIcon /> Fragrance Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {Object.entries(FRAGRANCE_NOTES).map(([key, value]) => {
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      {/* Capitalize the key (top -> Top) for better UI */}
                      <span className="text-base font-semibold capitalize">{key}</span>
                      <div className="flex flex-wrap gap-2">
                        {value.map((note, index) => (
                          <Badge key={`${key}-${index}`} variant={"secondary"} className="py-3">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Review Section */}
      <section className="mt-8 lg:col-span-2 lg:pl-17">
        <RatingAndReviews summary={summary} reviews={reviews} />
      </section>

      {/* Recommendation Section (later) */}
    </div>
  )
}
