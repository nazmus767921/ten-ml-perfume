"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export interface BannerItem {
  id: string | number;
  text: string;
  link?: string;
  badge?: string;
}

interface AnnouncementBannerProps {
  items: BannerItem[];
  speed?: number; // Duration in seconds for one full loop
  pauseOnHover?: boolean;
}

export default function AnnouncementBanner({
  items,
  speed = 25,
  pauseOnHover = true,
}: AnnouncementBannerProps) {
  // Guard clause for empty data
  if (!items || items.length === 0) return null;

  // Duplicate the array to ensure seamless infinite looping without gaps
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-linear-to-r from-neutral-950 via-neutral-900 to-neutral-950 py-3 text-white backdrop-blur-md z-10">
      {/* Premium Ambient Glow Left/Right Overlays */}
      <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap min-w-full gap-16 items-center"
        animate={{ x: [0, "-33.33%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {duplicatedItems.map((item, index) => {
          const content = (
            <div className="flex items-center gap-3 text-sm font-medium tracking-wide group cursor-pointer">
              {item.badge && (
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)] uppercase">
                  {item.badge}
                </span>
              )}
              <span className="text-neutral-200 group-hover:text-white transition-colors duration-200">
                {item.text}
              </span>
              {item.link && (
                <svg
                  className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </div>
          );

          return (
            <div key={`${item.id}-${index}`} className="flex items-center gap-16">
              {item.link ? (
                <Link href={item.link}>
                  {content}
                </Link>
              ) : (
                content
              )}
              {/* Premium geometric separator between items */}
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 block" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}