"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Users, TrendingUp, Wallet, ChevronDown, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { ClaimModal } from "@/components/claim-modal"

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const { toast } = useToast()

  const handleClaim = (type: "full" | "partial", amount?: number) => {
    setIsClaiming(true)

    // Simulate claiming process
    setTimeout(() => {
      setIsClaiming(false)

      if (type === "full") {
        toast({
          title: "Claimed Successfully!",
          description: "75 REG has been transferred to your wallet",
        })
      } else {
        toast({
          title: "Claimed Successfully!",
          description: `${amount} REG has been transferred to your wallet`,
        })
      }
    }, 1500)
  }

  return (
    <header className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/75 border-b border-zinc-800">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-zinc-900 border-zinc-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">REG Mining App</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                <a
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-200 transition-all hover:text-white bg-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="/friends"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white hover:bg-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  Friends
                </a>
                <a
                  href="/staking"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white hover:bg-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  <TrendingUp className="h-5 w-5" />
                  Staking
                </a>
                <a
                  href="/wallet"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-white hover:bg-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Wallet className="h-5 w-5" />
                  Wallet
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <a href="/" className="flex items-center gap-2 font-semibold text-white">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
            <span className="hidden md:inline-block">REG Mining App</span>
          </a>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center text-sm mr-2">
            <div className="font-medium text-white">75 REG</div>
          </div>

          {/* Show dropdown on larger screens */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white"
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
                      Claiming...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Claim REG
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-800 border-zinc-700 text-white">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                  onClick={() => handleClaim("full")}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Claim All (75 REG)</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                  onClick={() => handleClaim("partial", 25)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Claim 25 REG</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                  onClick={() => handleClaim("partial", 50)}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Claim 50 REG</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Show modal on mobile */}
          <div className="md:hidden">
            <ClaimModal />
          </div>

          <Avatar className="h-8 w-8 border border-zinc-700">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-zinc-800 text-zinc-400">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
