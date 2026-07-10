import type { CommitteeMember } from "@/lib/types/committee"
import { FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="group rounded-2xs border border-white/5 bg-space-navy overflow-hidden hover:border-white/15 transition-colors w-full flex flex-col justify-between">

      <div className="w-full">
        {/* Aspect square photo container with dynamic fallback handling */}
        <div className="aspect-square overflow-hidden bg-space-dark relative flex items-center justify-center">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            // Dark elegant placeholder SVG icon that blends perfectly on a dark background
            <svg 
              className="w-1/3 h-1/3 text-white/10" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        <div className="p-3 sm:p-6">
          <p className="text-space-blue text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1 truncate">
            {member.role}
          </p>
          <h3 className="text-white font-bold text-sm sm:text-lg mb-2 line-clamp-1">
            {member.name}
          </h3>
          
          {member.bio && (
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-3 sm:line-clamp-none">
              {member.bio}
            </p>
          )}
        </div>
      </div>

      {(member.linkedinUrl || member.email) && (
        <div className="flex gap-4 p-3 sm:p-6 pt-2 sm:pt-3 border-t border-white/5 mt-auto">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s LinkedIn`}
              className="text-white/30 hover:text-space-blue transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center sm:justify-start"
            >
              <FaLinkedin size={16} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="text-white/30 hover:text-space-blue transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center sm:justify-start"
            >
              <MdEmail size={16} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}