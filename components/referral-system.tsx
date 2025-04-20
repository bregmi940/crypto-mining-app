"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Share2, Copy, Check, Users, Search, ArrowUpRight, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Mock data for friends
const friendsData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "JD",
    joinDate: "2 days ago",
    status: "active",
    miningLevel: "Basic",
    reward: 15,
    totalMined: 24,
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "AS",
    joinDate: "5 days ago",
    status: "active",
    miningLevel: "Premium",
    reward: 15,
    totalMined: 45,
  },
  {
    id: 3,
    name: "Robert Johnson",
    avatar: "RJ",
    joinDate: "1 week ago",
    status: "inactive",
    miningLevel: "Basic",
    reward: 15,
    totalMined: 12,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "EW",
    joinDate: "2 weeks ago",
    status: "active",
    miningLevel: "Elite",
    reward: 15,
    totalMined: 87,
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "MB",
    joinDate: "3 weeks ago",
    status: "inactive",
    miningLevel: "Basic",
    reward: 15,
    totalMined: 9,
  },
]

export function ReferralSystem() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Generate a fake referral link
  const referralLink = `https://regmining.app/ref/${Math.random().toString(36).substring(2, 10)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)

    toast({
      title: "Referral link copied!",
      description: "Share with friends to earn 15 REG per signup",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  // Update the shareReferral function to be more robust and provide better feedback
  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join REG Mining App",
          text: "Mine 3 REG daily and earn 20% APY on staking. Use my referral link:",
          url: referralLink,
        })

        toast({
          title: "Referral shared!",
          description: "Thanks for spreading the word!",
        })
      } catch (error) {
        console.error("Error sharing:", error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  // Filter friends based on search query
  const filteredFriends = friendsData.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calculate total rewards
  const totalRewards = friendsData.reduce((sum, friend) => sum + friend.reward, 0)
  const activeFriends = friendsData.filter((friend) => friend.status === "active").length

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="friends">Friend List</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                Referral Program
              </CardTitle>
              <CardDescription>Earn 15 REG for each friend who joins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-zinc-800 p-4">
                <div className="text-sm text-zinc-400 mb-2">Your referral link</div>
                <div className="flex">
                  <Input value={referralLink} readOnly className="bg-zinc-700 border-zinc-600 text-sm" />
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-zinc-800 p-4 text-center">
                  <div className="text-2xl font-bold">{friendsData.length}</div>
                  <div className="text-sm text-zinc-400">Friends referred</div>
                </div>
                <div className="rounded-lg bg-zinc-800 p-4 text-center">
                  <div className="text-2xl font-bold">{totalRewards} REG</div>
                  <div className="text-sm text-zinc-400">Rewards earned</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-base"
                onClick={shareReferral}
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Referral Link
              </Button>

              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center p-2 h-auto bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() => {
                    copyToClipboard()
                    window.open(
                      "https://twitter.com/intent/tweet?text=" +
                        encodeURIComponent(
                          "Join REG Mining App! Mine 3 REG daily and earn 20% APY on staking. Use my referral link: " +
                            referralLink,
                        ),
                      "_blank",
                    )
                  }}
                >
                  <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-xs">Twitter</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center p-2 h-auto bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() => {
                    copyToClipboard()
                    window.open(
                      "https://t.me/share/url?url=" +
                        encodeURIComponent(referralLink) +
                        "&text=" +
                        encodeURIComponent("Join REG Mining App! Mine 3 REG daily and earn 20% APY on staking."),
                      "_blank",
                    )
                  }}
                >
                  <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.25-.02-.11.02-1.84 1.17-5.2 3.44-.49.33-.94.5-1.35.48-.44-.01-1.29-.25-1.92-.46-.78-.26-1.4-.4-1.34-.85.03-.22.32-.45.88-.68 3.44-1.5 5.73-2.49 6.88-2.95 3.28-1.33 3.97-1.56 4.41-1.56.1 0 .32.02.46.1.17.1.28.25.31.42.04.27-.01.61-.19 1.09z" />
                  </svg>
                  <span className="text-xs">Telegram</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center p-2 h-auto bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  onClick={() => {
                    copyToClipboard()
                    window.open(
                      "https://wa.me/?text=" +
                        encodeURIComponent(
                          "Join REG Mining App! Mine 3 REG daily and earn 20% APY on staking. Use my referral link: " +
                            referralLink,
                        ),
                      "_blank",
                    )
                  }}
                >
                  <svg className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-xs">WhatsApp</span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm">Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {friendsData.slice(0, 3).map((friend) => (
                  <div key={friend.id} className="flex justify-between items-center p-2 rounded bg-zinc-800">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium">
                        {friend.avatar}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">{friend.name}</div>
                        <div className="text-xs text-zinc-400">{friend.joinDate}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-500">+{friend.reward} REG</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="mt-4 space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" />
                Friend List
              </CardTitle>
              <CardDescription>
                You have referred {friendsData.length} friends ({activeFriends} active)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search friends..."
                  className="pl-8 bg-zinc-800 border-zinc-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalRewards} REG</div>
                    <div className="text-sm text-zinc-400">Total Rewards</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {friendsData.reduce((sum, friend) => sum + friend.totalMined, 0)} REG
                    </div>
                    <div className="text-sm text-zinc-400">Total Mined by Friends</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-zinc-700 space-y-2 sm:space-y-0"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                              friend.status === "active" ? "bg-green-900/30" : "bg-zinc-600"
                            }`}
                          >
                            {friend.avatar}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <div className="text-sm font-medium">{friend.name}</div>
                              <Badge
                                className={`ml-2 ${
                                  friend.status === "active"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-zinc-500/20 text-zinc-400"
                                }`}
                                variant="outline"
                              >
                                {friend.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <div className="text-xs text-zinc-400 mt-0.5">Joined {friend.joinDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 ml-13 sm:ml-0">
                          <div className="flex flex-col items-end">
                            <div className="flex items-center">
                              <Badge
                                className={`${
                                  friend.miningLevel === "Elite"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : friend.miningLevel === "Premium"
                                      ? "bg-purple-500/20 text-purple-500"
                                      : "bg-blue-500/20 text-blue-500"
                                }`}
                                variant="outline"
                              >
                                {friend.miningLevel}
                              </Badge>
                              <div className="ml-2 text-sm font-medium">{friend.totalMined} REG</div>
                            </div>
                            <div className="text-xs text-green-500 mt-0.5">+{friend.reward} REG reward</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-zinc-800 hover:bg-zinc-600"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-zinc-500">
                      <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No friends found matching your search</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={shareReferral}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Invite More Friends
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Award className="mr-2 h-4 w-4 text-yellow-500" />
                Top Performing Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...friendsData]
                  .sort((a, b) => b.totalMined - a.totalMined)
                  .slice(0, 3)
                  .map((friend, index) => (
                    <div key={friend.id} className="flex justify-between items-center p-3 rounded bg-zinc-800">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium mr-2">
                          {index + 1}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium">
                          {friend.avatar}
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium">{friend.name}</div>
                          <div className="text-xs text-zinc-400">{friend.miningLevel} miner</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{friend.totalMined} REG</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
