"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Coins, Clock } from "lucide-react"

export function MiningStatus() {
  const [miningProgress, setMiningProgress] = useState(0)
  const [isMining, setIsMining] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60) // 24 hours in seconds
  const [lastMined, setLastMined] = useState<Date | null>(null)

  useEffect(() => {
    // Check if user has already mined today
    const lastMinedStr = localStorage.getItem("lastMined")
    if (lastMinedStr) {
      const lastMined = new Date(lastMinedStr)
      const now = new Date()
      const diffHours = (now.getTime() - lastMined.getTime()) / (1000 * 60 * 60)

      if (diffHours < 24) {
        // Calculate remaining time
        const remainingHours = 24 - diffHours
        setTimeRemaining(remainingHours * 60 * 60)
        setLastMined(lastMined)
      } else {
        // Reset if 24 hours have passed
        setTimeRemaining(0)
        setLastMined(null)
      }
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isMining) {
      interval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) {
            setIsMining(false)
            // Record mining time
            const now = new Date()
            localStorage.setItem("lastMined", now.toISOString())
            setLastMined(now)
            setTimeRemaining(24 * 60 * 60)
            return 0
          }
          return prev + 1
        })
      }, 50) // Complete in 5 seconds
    }

    return () => clearInterval(interval)
  }, [isMining])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timeRemaining > 0 && lastMined) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timeRemaining, lastMined])

  const formatTimeRemaining = () => {
    const hours = Math.floor(timeRemaining / 3600)
    const minutes = Math.floor((timeRemaining % 3600) / 60)
    const seconds = timeRemaining % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleStartMining = () => {
    setIsMining(true)
    setMiningProgress(0)
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5 text-purple-500" />
          Daily Mining
        </CardTitle>
        <CardDescription>Mine 3 REG tokens daily</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isMining ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Mining in progress...</span>
              <span className="text-sm font-medium">{miningProgress}%</span>
            </div>
            <Progress value={miningProgress} className="h-2" />
          </>
        ) : lastMined && timeRemaining > 0 ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-sm text-zinc-400 mb-1">Next mining available in</div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4 text-zinc-400" />
                <span className="text-xl font-mono">{formatTimeRemaining()}</span>
              </div>
            </div>
            <div className="text-center text-sm text-zinc-400">You've already mined your 3 REG for today</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-lg font-semibold mb-1">3 REG Available</div>
              <div className="text-sm text-zinc-400">Claim your daily mining reward</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={isMining || (lastMined && timeRemaining > 0)}
          onClick={handleStartMining}
        >
          {isMining ? "Mining..." : "Start Mining"}
        </Button>
      </CardFooter>
    </Card>
  )
}
