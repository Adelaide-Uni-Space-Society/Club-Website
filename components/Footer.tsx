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

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-space-navy w-full">
      {/* Replaced absolute row values with responsive grid switching to stack elements vertically on mobile viewports */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">

        <Link href="/" className="flex-shrink-0 min-h-[44px] flex items-center">
          <img
            src="/high-def-light-background.svg"
            alt="Society logo"
            className="h-7 sm:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Dynamic Social Anchors Grid Row */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
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
                className="text-white/40 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>

        <p className="text-white/30 text-xs sm:text-sm md:text-xs tracking-normal md:flex-shrink-0 mt-2 md:mt-0">
          © 2026 Adelaide University Space Society. All rights reserved.
        </p>

      </div>
    </footer>
  )
}