"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import Autoplay from "embla-carousel-autoplay"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  id: number
  name: string
  rating: number // 1–5
  date: string // e.g. "13 Oct 2024"
  body: string
  avatarUrl: string
}

export interface RatingBreakdown {
  star: number // 5 → 1
  count: number
}

export interface RatingSummary {
  average: number // e.g. 4.5
  total: number // e.g. 50
  breakdown: RatingBreakdown[]
}

export interface WriteReviewPayload {
  name: string
  rating: number
  body: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMaxCount(breakdown: RatingBreakdown[]): number {
  return Math.max(...breakdown.map((b) => b.count), 1)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StarIconProps {
  filled?: boolean
  size?: number
}

function StarIcon({ filled = true, size = 18 }: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? "#F5A623" : "#E5E7EB"}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
    </svg>
  )
}

interface StarRowProps {
  rating: number
  size?: number
}

function StarRow({ rating, size = 18 }: StarRowProps) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= rating} size={size} />
      ))}
    </div>
  )
}

// ── Interactive star picker (for write review form) ───────────────────────────

interface StarPickerProps {
  value: number
  onChange: (rating: number) => void
}

function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0)
  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Select rating"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <StarIcon filled={i <= (hovered || value)} size={24} />
        </button>
      ))}
    </div>
  )
}

// ── Rating Summary (left panel) ───────────────────────────────────────────────

interface RatingSummaryPanelProps {
  summary: RatingSummary
}

function RatingBar({ star, count, max }: RatingBreakdown & { max: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <StarIcon size={14} />
      <span className="w-2 text-sm text-gray-700">{star}</span>
      {/* FIX: removed flex-1 from bar column — use explicit w here instead */}
      <div className="h-1.5 w-32 overflow-hidden bg-gray-200 sm:w-40">
        <div
          className="h-full bg-gray-900 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function RatingSummaryPanel({ summary }: RatingSummaryPanelProps) {
  const max = getMaxCount(summary.breakdown)
  const sorted = [...summary.breakdown].sort((a, b) => b.star - a.star)

  return (
    // FIX: no flex-1 children here — width is determined by content, not stretching
    <div className="flex items-start gap-6">
      {/* Big average */}
      <div className="shrink-0">
        <div className="flex items-end">
          <p className="text-[72px] leading-none font-black tracking-tighter text-gray-950 sm:text-[80px]">
            {summary.average.toFixed(1).replace(".", ",")}
          </p>
          <p className="mb-1 ml-2 text-sm text-gray-500">/ 5</p>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          ({summary.total} New Reviews)
        </p>
      </div>

      {/* Bar breakdown — explicit width, no flex-1 */}
      <div className="flex shrink-0 flex-col gap-2.5 pt-5">
        {sorted.map((b) => (
          <RatingBar key={b.star} {...b} max={max} />
        ))}
      </div>
    </div>
  )
}

// ── Review Card ───────────────────────────────────────────────────────────────

interface ReviewCardProps {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex w-[min(100%,var(--container-2xl))] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      {/* Header row: name + date */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm leading-tight font-semibold text-gray-900">
            {review.name}
          </p>
          <StarRow rating={review.rating} size={14} />
        </div>
        <span className="shrink-0 pt-0.5 text-xs whitespace-nowrap text-gray-400">
          {review.date}
        </span>
      </div>

      {/* Body */}
      <p className="flex-1 text-sm leading-relaxed text-gray-500">
        &ldquo;{review.body}&rdquo;
      </p>

      {/* Footer: avatar + name + verified badge */}
      <div className="flex items-center gap-2.5 border-t border-border pt-2">
        <Image
          src={review.avatarUrl}
          alt={review.name}
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-xs font-medium text-gray-700">{review.name}</p>
          <p className="text-xs text-gray-400">Verified Buyer</p>
        </div>
      </div>
    </div>
  )
}

// ── Progress Indicator ────────────────────────────────────────────────────────

interface ProgressIndicatorProps {
  total: number
  activeIndex: number
}

function ProgressIndicator({ total, activeIndex }: ProgressIndicatorProps) {
  const segmentWidth = 100 / total
  return (
    <div className="mt-4 h-[3px] w-[160px] overflow-hidden bg-gray-200 sm:w-[200px]">
      <div
        className="h-full bg-gray-900 transition-all duration-300"
        style={{ width: `${segmentWidth * (activeIndex + 1)}%` }}
      />
    </div>
  )
}

// ── Write Review Form ─────────────────────────────────────────────────────────

interface WriteReviewFormProps {
  onSubmit: (payload: WriteReviewPayload) => Promise<void> | void
}

function WriteReviewForm({ onSubmit }: WriteReviewFormProps) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [body, setBody] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your name.")
      return
    }
    if (rating === 0) {
      setError("Please select a rating.")
      return
    }
    if (!body.trim()) {
      setError("Please write your review.")
      return
    }

    setError("")
    setStatus("loading")
    try {
      await onSubmit({ name: name.trim(), rating, body: body.trim() })
      setStatus("success")
      setName("")
      setRating(0)
      setBody("")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center">
        <span className="text-2xl">🎉</span>
        <p className="text-sm font-semibold text-gray-900">
          Thank you for your review!
        </p>
        <p className="text-xs text-gray-400">
          Your feedback helps other shoppers.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-gray-500 underline underline-offset-2"
        >
          Write another
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-semibold text-gray-900">Write a Review</p>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium text-gray-600"
          htmlFor="review-name"
        >
          Your name
        </label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Mathio"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-gray-900 transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/20 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-gray-600">Rating</span>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-xs font-medium text-gray-600"
          htmlFor="review-body"
        >
          Review
        </label>
        <textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience with this product…"
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-gray-900 transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900/20 focus:outline-none"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <Button
      size={'sm'}
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Submitting…" : "Submit Review"}
      </Button>
    </div>
  )
}

// ─── Root Component ───────────────────────────────────────────────────────────

export interface RatingAndReviewsProps {
  summary: RatingSummary
  reviews: Review[]
  onSubmitReview: (payload: WriteReviewPayload) => Promise<void> | void
}

export default function RatingAndReviews({
  summary,
  reviews,
  onSubmitReview,
}: RatingAndReviewsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)

  // Wire up embla events — runs once api is ready
  useEffect(() => {
    if (!api) return

    const onSelect = () => setActiveReviewIndex(api.selectedScrollSnap())
    api.on("select", onSelect)
    // Sync initial state
    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])

  const canScrollPrev = activeReviewIndex > 0
  const canScrollNext = activeReviewIndex < reviews.length - 1

  return (
    <section className="flex w-full flex-col gap-8 overflow-x-clip font-sans">
      {/* ── Rating + Carousel row ── */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
        {/* Left — summary */}
        <div className="w-full shrink-0 md:w-auto">
          <h2 className="mb-5 text-center text-xl font-semibold text-gray-900 lg:text-start">
            Rating &amp; Reviews
          </h2>
          <RatingSummaryPanel summary={summary} />
        </div>

        {/* Right — carousel + progress */}
        <div className="w-full min-w-0 flex-1">
          <div className="flex items-center gap-2 px-0 lg:px-12">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              opts={{
                align: "start",
              }}
              className="w-full max-w-full"
            >
              <CarouselContent>
                {reviews.map((r) => (
                  <CarouselItem key={r.id} className="basis-full lg:basis-1/2">
                    <ReviewCard review={r} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          </div>

          {/* Progress bar + x/n counter on mobile */}
          <div className="mt-1 flex items-center gap-3 px-4 md:px-0">
            <ProgressIndicator
              total={reviews.length}
              activeIndex={activeReviewIndex}
            />
            <span className="text-xs text-gray-400 sm:hidden">
              {activeReviewIndex + 1} / {reviews.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Write a Review ── */}
      <WriteReviewForm onSubmit={onSubmitReview} />
    </section>
  )
}
