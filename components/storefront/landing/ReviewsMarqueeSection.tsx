"use client"

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
    <div className="group relative flex w-80 flex-shrink-0 flex-col gap-6 border border-white/10 bg-zinc-950 p-8 transition-colors hover:bg-zinc-900 md:w-[400px]">
      {/* Editorial Decorative Quote */}
      <span className="absolute left-6 top-4 font-serif text-[6rem] leading-none text-white/5 transition-colors group-hover:text-white/10">
        &ldquo;
      </span>
      
      <div className="relative z-10">
        <p className="min-h-[80px] text-base font-medium leading-relaxed text-white/90 md:text-lg">
          {review.text}
        </p>
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={review.avatar} alt={review.name} className="size-12 rounded-none object-cover grayscale transition-all group-hover:grayscale-0" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black tracking-widest text-white uppercase">{review.name}</span>
            <div className="pointer-events-none">
              <StarRating value={review.rating} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sharp Border Tag */}
      <div className="absolute right-0 top-0 border-b border-l border-white/10 bg-zinc-950 px-3 py-1.5 transition-colors group-hover:bg-zinc-900">
        <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/60 uppercase">
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
    <section className="overflow-hidden bg-black py-20 md:py-32 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-10 text-center mb-16 md:mb-24">
        <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.8] tracking-tighter text-white uppercase">
          4.9
        </h2>
        <div className="pointer-events-none mt-4 mb-2 flex scale-125 md:scale-150 transform justify-center">
          <StarRating value={5} />
        </div>
        <p className="mt-4 text-xs font-bold tracking-[0.3em] text-white/60 uppercase md:text-sm">
          Based on 2,500+ Verified Reviews
        </p>
      </div>

      <div className="flex flex-col gap-6 group/marquee relative w-full">
        {/* Left and Right Sharp Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black via-black/80 to-transparent md:w-64" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black via-black/80 to-transparent md:w-64" />

        {/* Row 1 (Scroll Left) */}
        <div className="flex w-max gap-6 hover:![animation-play-state:paused]" style={{ animation: "marquee 50s linear infinite" }}>
          {duplicatedRow1.map((review, i) => (
            <ReviewCard key={`row1-${review.id}-${i}`} review={review} />
          ))}
        </div>

        {/* Row 2 (Scroll Right) */}
        <div className="flex w-max gap-6 hover:![animation-play-state:paused]" style={{ animation: "marquee 60s linear infinite reverse" }}>
          {duplicatedRow2.map((review, i) => (
            <ReviewCard key={`row2-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
