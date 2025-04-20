"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function StakingInterface() {
  const [stakeAmount, setStakeAmount] = useState(0)
  const [stakeDuration, setStakeDuration] = useState(30) // days
  const [isStaking, setIsStaking] = useState(false)
  const { toast } = useToast()

  const totalBalance = 75 // REG
  const stakedBalance = 25 // REG
  const availableBalance = totalBalance - stakedBalance

  // Updated function to calculate the APY based on staking duration
  const calculateAPY = (days: number) => {
    // Base APY is 20%
    const baseAPY = 0.2

    if (days < 90) {
      return baseAPY // 20% for less than 90 days
    }

    // For 90+ days, start with 5% bonus (25% total)
    let bonusAPY = 0.05

    // For each additional month (30 days) beyond 90 days, add 5%
    const additionalMonths = Math.floor((days - 90) / 30)
    bonusAPY += additionalMonths * 0.05

    // Cap at 2 years (24 months total, or 22 months beyond the first 90 days)
    // Maximum bonus would be 0.05 + (22 * 0.05) = 1.15, for a total of 1.35 (135%)
    const maxBonusAPY = 0.05 + 22 * 0.05 // 1.15

    return baseAPY + Math.min(bonusAPY, maxBonusAPY)
  }

  // Update the estimatedReward calculation to use the dynamic APY
  const currentAPY = calculateAPY(stakeDuration)
  const estimatedReward = stakeAmount * ((currentAPY * stakeDuration) / 365)

  // Function to get a human-readable APY bonus description
  const getAPYDescription = (days: number) => {
    if (days < 90) {
      return "Stake for 90+ days to get APY bonuses"
    }

    const additionalMonths = Math.floor((days - 90) / 30)
    const totalBonusPercentage = 5 + additionalMonths * 5
    const cappedBonus = Math.min(totalBonusPercentage, 115) // Cap at 115% bonus

    if (days >= 90 && days < 120) {
      return "+5% APY bonus for 90+ days staking!"
    }

    const monthsText = additionalMonths + 3 > 24 ? "24 months" : `${additionalMonths + 3} months`
    return `+${cappedBonus}% APY bonus for ${monthsText} staking!`
  }

  const handleStakeAmountChange = (value: number) => {
    setStakeAmount(Math.min(value, availableBalance))
  }

  const handleStake = () => {
    if (stakeAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter an amount greater than 0",
        variant: "destructive",
      })
      return
    }

    if (stakeAmount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough REG tokens",
        variant: "destructive",
      })
      return
    }

    setIsStaking(true)

    // Simulate staking process
    setTimeout(() => {
      setIsStaking(false)
      toast({
        title: "Staking successful!",
        description: `You've staked ${stakeAmount} REG for ${stakeDuration} days`,
      })
      setStakeAmount(0)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-yellow-500" />
            Staking
          </CardTitle>
          <CardDescription>
            Earn up to {(calculateAPY(730) * 100).toFixed(0)}% APY by staking your REG tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-2xl font-bold">{stakedBalance} REG</div>
              <div className="text-sm text-zinc-400">Currently Staked</div>
            </div>
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-2xl font-bold">{availableBalance} REG</div>
              <div className="text-sm text-zinc-400">Available Balance</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Stake Amount</label>
                <span className="text-sm text-zinc-400">{stakeAmount} REG</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => handleStakeAmountChange(Number.parseFloat(e.target.value) || 0)}
                  min={0}
                  max={availableBalance}
                  step={1}
                  className="bg-zinc-800 border-zinc-700"
                />
                <Button
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() => setStakeAmount(availableBalance)}
                >
                  Max
                </Button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Staking Period</label>
                <span className="text-sm text-zinc-400">{stakeDuration} days</span>
              </div>
              <Slider
                value={[stakeDuration]}
                min={30}
                max={730} // 2 years (730 days)
                step={30}
                onValueChange={(values) => setStakeDuration(values[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-zinc-400">
                <span>30 days</span>
                <span>1 year</span>
                <span>2 years</span>
              </div>
              <div className="mt-2 text-xs">
                <span className="text-yellow-500">{getAPYDescription(stakeDuration)}</span>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-800 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Estimated Reward</span>
                <span className="text-sm font-medium text-yellow-500">+{estimatedReward.toFixed(2)} REG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Annual Percentage Yield</span>
                <span className="text-sm font-medium">{(currentAPY * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-700">
                <div className="text-xs text-zinc-400 mb-1">Reward breakdown:</div>
                <div className="flex justify-between text-xs">
                  <span>Principal</span>
                  <span>{stakeAmount} REG</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>+ Interest ({stakeDuration} days)</span>
                  <span className="text-yellow-500">+{estimatedReward.toFixed(2)} REG</span>
                </div>
                <div className="flex justify-between text-xs font-medium mt-1 pt-1 border-t border-zinc-700">
                  <span>Total return</span>
                  <span>{(stakeAmount + estimatedReward).toFixed(2)} REG</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 h-12 text-base relative overflow-hidden group"
            disabled={stakeAmount <= 0 || stakeAmount > availableBalance || isStaking}
            onClick={handleStake}
          >
            <span className="relative z-10 flex items-center justify-center">
              {isStaking ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Stake {stakeAmount > 0 ? `${stakeAmount} REG` : "REG"}
                </>
              )}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => handleStakeAmountChange(Math.max(1, Math.floor(availableBalance * 0.25)))}
            >
              25%
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => handleStakeAmountChange(Math.max(1, Math.floor(availableBalance * 0.5)))}
            >
              50%
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => handleStakeAmountChange(availableBalance)}
            >
              Max
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm">Active Stakes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded bg-zinc-800">
              <div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-yellow-500 mr-2" />
                  <div className="text-sm font-medium">25 REG</div>
                </div>
                <div className="text-xs text-zinc-400 mt-1">Locked for 90 days</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-500">+1.23 REG</div>
                <div className="text-xs text-zinc-400 mt-1">Ends in 45 days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
