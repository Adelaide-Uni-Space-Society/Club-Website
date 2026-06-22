import type { CommitteeMember } from "@/lib/types/committee"
import { FaLinkedin } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-space-navy overflow-hidden hover:border-white/15 transition-colors">

      {/* Photo */}
      <div className="aspect-square overflow-hidden bg-space-dark">
        <img
          src={member.photoUrl}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="text-space-blue text-xs font-semibold tracking-widest uppercase mb-1">
          {member.role}
        </p>
        <h3 className="text-white font-bold text-lg mb-3">{member.name}</h3>
        {member.bio && (
          <p className="text-white/40 text-sm leading-relaxed mb-4">{member.bio}</p>
        )}

        {/* Links */}
        {(member.linkedinUrl || member.email) && (
          <div className="flex gap-3 pt-3 border-t border-white/5">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-white/30 hover:text-space-blue transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="text-white/30 hover:text-space-blue transition-colors"
              >
                <MdEmail size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}