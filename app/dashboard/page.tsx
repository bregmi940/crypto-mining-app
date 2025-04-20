"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Users, TrendingUp } from "lucide-react"
import { MiningStatus } from "@/components/mining-status"
import { ReferralSystem } from "@/components/referral-system"
import { StakingInterface } from "@/components/staking-interface"
import { DashboardHeader } from "@/components/dashboard-header"
import { StakingTiers } from "@/components/staking-tiers"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("mining")

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <DashboardHeader />

      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Mining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3 REG</div>
                <Coins className="h-4 w-4 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Mined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">45 REG</div>
                <Coins className="h-4 w-4 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Referral Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">30 REG</div>
                <Users className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Staking APY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">20%</div>
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
            <TabsTrigger value="mining">Mining</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
          </TabsList>

          <TabsContent value="mining" className="mt-4">
            <MiningStatus />
          </TabsContent>

          <TabsContent value="referrals" className="mt-4">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="staking" className="mt-4">
            <div className="space-y-4">
              <StakingInterface />
              <StakingTiers />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
