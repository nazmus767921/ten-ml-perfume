"use client"

import SectionHeader from "@/components/storefront/landing/SectionHeader"
import StarRating from "@/components/storefront/products/StarRating"

interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  product: string
}

const TOP_REVIEWS: Review[] = [
  { id: "r1", name: "Rafi A.", avatar: "https://i.pravatar.cc/48?img=11", rating: 5, text: "Smells exactly like the real thing! Will definitely buy again.", product: "Dior Sauvage" },
  { id: "r2", name: "Sarah K.", avatar: "https://i.pravatar.cc/48?img=5", rating: 5, text: "Perfect size for traveling. The scent lasts all day long.", product: "Baccarat Rouge 540" },
  { id: "r3", name: "John M.", avatar: "https://i.pravatar.cc/48?img=12", rating: 4, text: "Great projection and sillage. Very close to original.", product: "Oud Wood" },
  { id: "r4", name: "Aisha T.", avatar: "https://i.pravatar.cc/48?img=9", rating: 5, text: "My new signature scent. Fast delivery and premium packaging.", product: "Bleu de Chanel" },
  { id: "r5", name: "Omar F.", avatar: "https://i.pravatar.cc/48?img=13", rating: 5, text: "Authentic juice, highly recommend this decant shop.", product: "Aventus" },
  { id: "r6", name: "Nadia L.", avatar: "https://i.pravatar.cc/48?img=21", rating: 5, text: "So convenient to test before committing to a full bottle.", product: "Lost Cherry" },
  { id: "r7", name: "David S.", avatar: "https://i.pravatar.cc/48?img=33", rating: 4, text: "Solid 9/10 performance. The atomizer is also really good.", product: "Layton" },
  { id: "r8", name: "Mia R.", avatar: "https://i.pravatar.cc/48?img=41", rating: 5, text: "Love it! Have already ordered three more decants.", product: "Delina" },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-72 flex-shrink-0 flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-5 transition-colors hover:bg-white/10 md:w-80">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={review.avatar} alt={review.name} className="size-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">{review.name}</span>
          <div className="pointer-events-none mt-0.5">
            <StarRating value={review.rating} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-white/80 line-clamp-3">"{review.text}"</p>
      <div className="mt-auto pt-2">
        <span className="inline-flex items-center rounded-sm bg-white/10 px-2 py-1 text-[0.65rem] font-bold tracking-widest text-white/70 uppercase">
          {review.product}
        </span>
      </div>
    </div>
  )
}

export default function ReviewsMarqueeSection() {
  const row1 = TOP_REVIEWS.slice(0, 4)
  const row2 = TOP_REVIEWS.slice(4, 8)
  
  // Duplicate arrays for seamless looping
  const duplicatedRow1 = [...row1, ...row1, ...row1]
  const duplicatedRow2 = [...row2, ...row2, ...row2]

  return (
    <section className="overflow-hidden bg-zinc-950 py-16 md:py-24">
      <div className="mb-10 text-white">
        <SectionHeader 
          label="COMMUNITY REVIEWS" 
          subtitle="Don't just take our word for it"
        />
      </div>

      <div className="flex flex-col gap-6 group/marquee relative w-full pb-8">
        {/* Left and Right Fades for seamless marquee look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-950 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-950 to-transparent md:w-32" />

        {/* Row 1 (Scroll Left) */}
        <div className="flex w-max gap-6 hover:![animation-play-state:paused]" style={{ animation: "marquee 40s linear infinite" }}>
          {duplicatedRow1.map((review, i) => (
            <ReviewCard key={`row1-${review.id}-${i}`} review={review} />
          ))}
        </div>

        {/* Row 2 (Scroll Right) */}
        <div className="flex w-max gap-6 hover:![animation-play-state:paused]" style={{ animation: "marquee 45s linear infinite reverse" }}>
          {duplicatedRow2.map((review, i) => (
            <ReviewCard key={`row2-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
