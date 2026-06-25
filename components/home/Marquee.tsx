import Link from "next/link"
import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok, FaDiscord } from "react-icons/fa"
import { SiLinktree } from "react-icons/si"
import { MdEmail } from "react-icons/md"
import { socials } from "@/lib/data/socials"
import type { IconType } from "react-icons"

const iconMap: Record<string, IconType> = {
  Instagram: FaInstagram,
  Email:     MdEmail,
  LinkedIn:  FaLinkedin,
  Facebook:  FaFacebook,
  TikTok:    FaTiktok,
  Discord:   FaDiscord,
  Linktree:  SiLinktree,
}

const words = ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"]

export default function Marquee() {
  const track = [...words, ...words, ...words, ...words]

  return (
    <div className="relative overflow-hidden bg-space-dark">

      <svg
        viewBox="0 0 1440 80"
        className="w-full block h-10 sm:h-20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
          fill="#0f1729"
        />
      </svg>

      <div className="bg-space-navy py-12 sm:py-16">

        {[
          { top: "15%", left: "8%",  size: 2, opacity: 0.6 },
          { top: "70%", left: "15%", size: 1, opacity: 0.4 },
          { top: "30%", left: "25%", size: 2, opacity: 0.5 },
          { top: "80%", left: "35%", size: 1, opacity: 0.3 },
          { top: "20%", left: "55%", size: 2, opacity: 0.5 },
          { top: "65%", left: "65%", size: 1, opacity: 0.4 },
          { top: "40%", left: "75%", size: 2, opacity: 0.6 },
          { top: "85%", left: "85%", size: 1, opacity: 0.3 },
          { top: "10%", left: "92%", size: 2, opacity: 0.5 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-xs bg-white pointer-events-none"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}

        <div className="overflow-hidden mb-8 sm:mb-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {track.map((text, i) => (
              <span
                key={i}
                className="flex-shrink-0 mx-4 sm:mx-8 text-white/20 font-bold text-2xl sm:text-4xl md:text-5xl uppercase tracking-widest select-none"
              >
                {text}
                <span className="text-space-blue mx-4 sm:mx-8">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-4 max-w-xl mx-auto">
          {socials.map(({ label, href }) => {
            const Icon = iconMap[label]
            if (!Icon) return null
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-white/30 hover:text-space-blue transition-colors group min-h-[44px]"
              >
                <div className="w-11 h-11 rounded-xs border border-white/10 group-hover:border-space-blue/50 flex items-center justify-center transition-colors">
                  <Icon size={18} />
                </div>
                <span className="text-[10px] tracking-widest uppercase">{label}</span>
              </a>
            )
          })}
        </div>

      </div>

      <svg
        viewBox="0 0 1440 80"
        className="w-full block h-10 sm:h-20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
          fill="#0f1729"
        />
      </svg>

    </div>
  )
}