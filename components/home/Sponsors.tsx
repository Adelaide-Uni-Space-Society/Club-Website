"use client";

import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import { getSponsorsByTier } from "@/lib/data/sponsors";

function SponsorLogo({ name, logoUrl, websiteUrl, tierSize }: {
  name: string
  logoUrl: string
  websiteUrl: string
  tierSize: string
}) {
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
  }, [logoUrl]);

  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full sm:w-[280px] shrink-0 transition-all duration-300 hover:scale-[1.03] group"
    >
      <div 
        className={`flex items-center justify-center p-6 rounded-xs w-full min-h-[120px] sm:min-h-[140px] shadow-xl shadow-black/30 transition-all duration-300 ${
          isDarkLogo 
            ? "bg-white/95 border border-white/20 text-black shadow-lg shadow-white/5" 
            : "bg-black border-4 border-white text-white hover:bg-white/5 shadow-xl shadow-black/40"
        }`}
      >
        <img 
          ref={imageRef}
          src={logoUrl} 
          alt={name} 
          crossOrigin="anonymous"
          className="w-full h-full max-h-[70px] object-contain object-center transition-all duration-300" 
        />
      </div>
    </a>
  );
}

export default function Sponsors() {
  const galaxy    = getSponsorsByTier("galaxy")
  const supernova = getSponsorsByTier("supernova")
  const milkyWay  = getSponsorsByTier("milky way")
  const nebula    = getSponsorsByTier("nebula")
  const eclipse   = getSponsorsByTier("eclipse")

  // Common typography layout classes for maximum visibility text weights
  const tierHeadingClass = "text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-6 sm:mb-8 text-white drop-shadow-sm"

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Our Supporters
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Sponsors
          </h2>
        </div>

        {/* Galaxy */}
        {galaxy.length > 0 && (
          <div className="mb-16 sm:mb-20 w-full">
            <h3 className={`${tierHeadingClass} text-purple-400 font-black tracking-wide uppercase text-sm sm:text-base`}>
              Galaxy
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {galaxy.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-16 sm:h-20" />
              ))}
            </div>
          </div>
        )}

        {/* Supernova */}
        {supernova.length > 0 && (
          <div className="mb-16 sm:mb-20 w-full">
            <h3 className={tierHeadingClass}>
              Supernova
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {supernova.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-12 sm:h-16" />
              ))}
            </div>
          </div>
        )}

        {/* Milky Way */}
        {milkyWay.length > 0 && (
          <div className="mb-16 sm:mb-20 w-full">
            <h3 className={tierHeadingClass}>
              Milky Way
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto w-full">
              {milkyWay.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-10 sm:h-12" />
              ))}
            </div>
          </div>
        )}

        {/* Nebula */}
        {nebula.length > 0 && (
          <div className="mb-16 sm:mb-20 w-full">
            <h3 className={tierHeadingClass}>
              Nebula
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {nebula.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-8 sm:h-10" />
              ))}
            </div>
          </div>
        )}

        {/* Eclipse */}
        {eclipse.length > 0 && (
          <div className="w-full">
            <h3 className={tierHeadingClass}>
              Eclipse
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {eclipse.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-7 sm:h-8" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}