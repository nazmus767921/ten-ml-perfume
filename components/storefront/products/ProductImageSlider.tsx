"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SliderImage {
  id: number;
  src: string;
  alt: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface MainImageProps {
  image: SliderImage;
  isAnimating: boolean;
}

function MainImage({ image, isAnimating }: MainImageProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#e8e8e8] aspect-3/4">
      <img
        key={image.id}
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

interface ThumbnailProps {
  image: SliderImage;
  isActive: boolean;
  onClick: () => void;
}

function Thumbnail({ image, isActive, onClick }: ThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 overflow-hidden bg-[#e8e8e8] aspect-square transition-all duration-300 cursor-pointer ${
        isActive
          ? "ring-2 ring-white ring-offset-2 ring-offset-transparent opacity-100"
          : "opacity-60 hover:opacity-80"
      }`}
      aria-label={`View image: ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover object-top"
      />
      {isActive && (
        <div className="absolute inset-0 ring-2 ring-white pointer-events-none" />
      )}
    </button>
  );
}

interface ThumbnailStripProps {
  images: SliderImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function ThumbnailStrip({ images, activeIndex, onSelect }: ThumbnailStripProps) {
  return (
    <div className="flex gap-2.5 mt-3">
      {images.map((image, index) => (
        <Thumbnail
          key={image.id}
          image={image}
          isActive={activeIndex === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}

interface DotIndicatorProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

function DotIndicator({ total, activeIndex, onSelect }: DotIndicatorProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-300 ${
            activeIndex === i
              ? "w-5 h-1.5 bg-white"
              : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"
          }`}
          aria-label={`Go to image ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProductImageSliderProps {
  images?: SliderImage[];
  autoPlayInterval?: number;
}

const DEFAULT_IMAGES: SliderImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    alt: "Maroon oversized hoodie - front view",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    alt: "Maroon oversized hoodie - side view",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80",
    alt: "Maroon oversized hoodie - flat lay",
  },
];

export default function ProductImageSlider({
  images = DEFAULT_IMAGES,
  autoPlayInterval = 0,
}: ProductImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToIndex = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsAnimating(false);
      }, 150);
    },
    [activeIndex, isAnimating]
  );

  const goToNext = useCallback(() => {
    goToIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, goToIndex]);

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoPlayRef.current = setInterval(goToNext, autoPlayInterval);
      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlayInterval, goToNext]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goToNext() : goToPrev();
    }
    touchStartX.current = null;
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToNext, goToPrev]);

  return (
    <div className="w-full max-w-xl mx-auto select-none">
      {/* Main image with swipe & dot overlay */}
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <MainImage image={images[activeIndex]} isAnimating={isAnimating} />
        <DotIndicator
          total={images.length}
          activeIndex={activeIndex}
          onSelect={goToIndex}
        />
      </div>

      {/* Thumbnail strip */}
      <ThumbnailStrip
        images={images}
        activeIndex={activeIndex}
        onSelect={goToIndex}
      />
    </div>
  );
}

 