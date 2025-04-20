import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function StakingTiers() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-sm">Staking Tiers</CardTitle>
        <CardDescription>Stake more and longer to unlock additional benefits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-zinc-800 p-4 border border-zinc-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-xs font-medium py-1 px-2 rounded-bl">Basic</div>
            <div className="pt-6">
              <div className="text-lg font-bold mb-2">10-49 REG</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <span>20% Base APY</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <span>30-day minimum lock</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <span>+5% APY for 90+ days</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4 border border-zinc-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600 text-xs font-medium py-1 px-2 rounded-bl">Premium</div>
            <div className="pt-6">
              <div className="text-lg font-bold mb-2">50-99 REG</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                  <span>20% Base APY</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                  <span>+5% per month beyond 90 days</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5" />
                  <span>Priority mining</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 border border-yellow-800/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-600 to-amber-600 text-xs font-medium py-1 px-2 rounded-bl">
              Elite
            </div>
            <div className="pt-6">
              <div className="text-lg font-bold mb-2">100+ REG</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>20% Base APY</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>Up to 135% APY for 2-year staking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                  <span>Priority mining + Referral bonus</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-800 p-4 border border-zinc-700">
          <h3 className="text-sm font-medium mb-3">APY Bonus Schedule</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>30-89 days:</span>
              <span className="font-medium">20% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>90-119 days:</span>
              <span className="font-medium">25% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>120-149 days:</span>
              <span className="font-medium">30% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>150-179 days:</span>
              <span className="font-medium">35% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>180-209 days:</span>
              <span className="font-medium">40% APY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>...</span>
              <span>...</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-yellow-500">
              <span>2 years (730 days):</span>
              <span>135% APY</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
