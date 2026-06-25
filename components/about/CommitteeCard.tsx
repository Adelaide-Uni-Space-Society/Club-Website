import type { CommitteeMember } from "@/lib/types/committee"
import { FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="group rounded-2xs border border-white/5 bg-space-navy overflow-hidden hover:border-white/15 transition-colors w-full flex flex-col justify-between">

      <div className="w-full">
        {/* Aspect ratio layout */}
        <div className="aspect-square overflow-hidden bg-space-dark relative">
          <img
            src={member.photoUrl}
            alt="Lorem ipsum"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Compressed text configurations for multi-column phone viewports */}
        <div className="p-3 sm:p-6">
          <p className="text-space-blue text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-1 truncate">
            Lorem Ipsum
          </p>
          <h3 className="text-white font-bold text-sm sm:text-lg mb-2 line-clamp-1">
            Lorem ipsum
          </h3>
          
          <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Touch Target Compliant Links */}
      {(member.linkedinUrl || member.email) && (
        <div className="flex gap-4 p-3 sm:p-6 pt-2 sm:pt-3 border-t border-white/5 mt-auto">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/30 hover:text-space-blue transition-colors min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center sm:justify-start"
            >
              <FaLinkedin size={16} />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label="Email"
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