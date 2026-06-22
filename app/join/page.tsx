import JoinForm from "@/components/join/JoinForm"

export const metadata = {
  title: "Join us — Adelaide Space Society",
  description: "Become a member of the Adelaide Space Society.",
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <JoinForm />
      </div>
    </div>
  )
}