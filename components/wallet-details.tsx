"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wallet, ExternalLink, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletDetails() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Mock wallet address
  const walletAddress = "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
  const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)

    toast({
      title: "Wallet address copied!",
      description: "Address copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-blue-500" />
            Your Wallet
          </CardTitle>
          <CardDescription>Manage your REG tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="text-sm text-zinc-400 mb-2">Wallet Address</div>
            <div className="flex">
              <Input value={shortAddress} readOnly className="bg-zinc-700 border-zinc-600 text-sm" />
              <Button
                variant="outline"
                size="icon"
                className="ml-2 bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-2xl font-bold">75 REG</div>
              <div className="text-sm text-zinc-400">Available Balance</div>
            </div>
            <div className="rounded-lg bg-zinc-800 p-4 text-center">
              <div className="text-2xl font-bold">125 REG</div>
              <div className="text-sm text-zinc-400">Total Claimed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-sm">Recent Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded bg-zinc-800">
              <div>
                <div className="text-sm font-medium">Claimed to Wallet</div>
                <div className="text-xs text-zinc-400">2 days ago</div>
              </div>
              <div className="text-sm font-medium text-green-500">+50 REG</div>
            </div>

            <div className="flex justify-between items-center p-3 rounded bg-zinc-800">
              <div>
                <div className="text-sm font-medium">Claimed to Wallet</div>
                <div className="text-xs text-zinc-400">7 days ago</div>
              </div>
              <div className="text-sm font-medium text-green-500">+75 REG</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
