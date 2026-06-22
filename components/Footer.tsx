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
    <footer className="border-t border-white/10 bg-space-navy">
      <div className="max-w-6xl mx-auto px-10 py-8 flex items-center justify-between gap-8">

        <Link href="/" className="flex-shrink-0">
          <img
            src="https://logoipsum.com/artwork/329"
            alt="Society logo"
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>

        <div className="flex items-center gap-5">
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
                className="text-white/40 hover:text-white transition-colors"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>

        <p className="text-white/30 text-xs flex-shrink-0">
          © 2026 Adelaide University Space Society. All rights reserved.
        </p>

      </div>
    </footer>
  )
}