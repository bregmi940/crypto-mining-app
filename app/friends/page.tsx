import { DashboardHeader } from "@/components/dashboard-header"
import { ReferralSystem } from "@/components/referral-system"

export default function FriendsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Friend Referrals</h1>
        <ReferralSystem />
      </main>
    </div>
  )
}
