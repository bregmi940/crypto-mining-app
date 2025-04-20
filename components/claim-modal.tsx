"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ClaimModal() {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(75) // Default to max amount
  const [isClaiming, setIsClaiming] = useState(false)
  const { toast } = useToast()

  const maxAmount = 75 // Total available REG

  const handleClaim = () => {
    if (amount <= 0 || amount > maxAmount) {
      toast({
        title: "Invalid amount",
        description: `Please enter an amount between 1 and ${maxAmount}`,
        variant: "destructive",
      })
      return
    }

    setIsClaiming(true)

    // Simulate claiming process
    setTimeout(() => {
      setIsClaiming(false)
      setOpen(false)

      toast({
        title: "Claimed Successfully!",
        description: `${amount} REG has been transferred to your wallet`,
      })

      setAmount(maxAmount) // Reset to max amount
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
          <DollarSign className="mr-2 h-4 w-4" />
          Claim REG
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Claim REG Tokens</DialogTitle>
          <DialogDescription className="text-zinc-400">Transfer your REG tokens to your wallet.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              max={maxAmount}
              className="bg-zinc-800 border-zinc-700"
            />
            <div className="text-xs text-zinc-400">Available: {maxAmount} REG</div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => setAmount(25)}
            >
              25 REG
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => setAmount(50)}
            >
              50 REG
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              onClick={() => setAmount(maxAmount)}
            >
              Max
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={handleClaim}
            disabled={isClaiming}
          >
            {isClaiming ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Claiming...
              </>
            ) : (
              `Claim ${amount} REG`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
