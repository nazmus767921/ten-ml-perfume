import { StarIcon } from "@phosphor-icons/react/dist/ssr"

interface StarRatingProps {
  value: number
}

export default function StarRating({ value }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <StarIcon weight={i <= value ? "fill" : "regular"} className="size-3.5 text-yellow-300 lg:size-4" />
        </button>
      ))}
    </div>
  )
}
