"use client";

import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import type { Sponsor } from "@/lib/types/sponsor";

type TierConfig = {
  label: string
  description: string
  logoHeight: string
  gridCols: string
  cardPadding: string
  accent: string
  dot: string
}

type Props = {
  tier: Sponsor["tier"]
  sponsors: Sponsor[]
  config: TierConfig
}

function SponsorCard({ sponsor, config }: { sponsor: Sponsor; config: TierConfig }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDarkLogo, setIsDarkLogo] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const fac = new FastAverageColor();

    const handleLoad = async () => {
      try {
        const color = await fac.getColorAsync(image);
        setIsDarkLogo(color.isDark);
      } catch (err) {
        console.error("Failed to analyze image color matrix:", err);
      }
    };

    if (image.complete) {
      handleLoad();
    } else {
      image.addEventListener("load", handleLoad);
    }

    return () => {
      image.removeEventListener("load", handleLoad);
      fac.destroy();
    };
  }, [sponsor.logoUrl]);

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group flex items-center justify-center rounded-xs border
        transition-all duration-300 hover:scale-105 min-h-[90px]
        w-full sm:w-[280px] shrink-0
        ${config.cardPadding}
        
        /* White cards stay standard, black cards now get a thick white border */
        ${isDarkLogo 
          ? "bg-white/95 border-white/20 shadow-lg shadow-white/5 text-black" 
          : "bg-black border-4 border-white shadow-xl shadow-black/40 text-white hover:bg-white/5"
        }
      `}
    >
      <img
        ref={imageRef}
        src={sponsor.logoUrl}
        alt={`${sponsor.name} Logo`}
        crossOrigin="anonymous"
        /* Removed strict pixel constraints to let the image expand to full width and height maximums smoothly */
        className="w-full h-full max-h-[70px] object-contain object-center transition-all duration-300"
      />
    </a>
  );
}

export default function SponsorTier({ sponsors, config }: Props) {
  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-2 h-2 rounded-xs flex-shrink-0 ${config.dot}`} />
        <h2 className="text-white font-bold text-xl tracking-tight">{config.label}</h2>
      </div>
      <p className="text-white/40 text-sm mb-6 sm:mb-8 ml-5 leading-relaxed">{config.description}</p>

      <div className="border-t border-white/5 mb-6 sm:mb-8 w-full" />

      <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-5xl mx-auto">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} config={config} />
        ))}
      </div>
    </section>
  );
}