import { committee } from "@/lib/data/committee"
import CommitteeCard from "@/components/about/CommitteeCard"

export const metadata = {
  title: "Meet the committee — Adelaide Space Society",
}

export default function MeetTheCommitteePage() {
  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            The team
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the committee
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Our committee is elected each year by society members. They're the
            students who keep the lights on, the events running, and the rockets flying.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {committee.map((member) => (
            <CommitteeCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </div>
  )
}