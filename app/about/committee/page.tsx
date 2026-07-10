import CommitteeCard from "@/components/about/CommitteeCard"
import { committee } from "@/lib/data/committee" // Swap with your actual array data path

export const metadata = {
  title: "Meet the committee — Adelaide Space Society",
}

export default function MeetTheCommitteePage() {
  return (
    <div className="min-h-screen bg-space-dark py-24 px-4 sm:px-6 w-full flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Dynamic Header Block */}
        <div className="mb-12 text-center sm:text-left">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Space Society Team
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Meet the Committee
          </h1>
        </div>

        {/* Responsive Layout Grid matching your layout metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {committee.map((member: any) => (
            <CommitteeCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </div>
  )
}