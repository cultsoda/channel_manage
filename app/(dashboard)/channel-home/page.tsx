"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Gift, Info, Activity } from "lucide-react"
import HomeTab from "@/components/channel-home/HomeTab"
import MembershipTab from "@/components/channel-home/MembershipTab"
import PurchasedContentTab from "@/components/channel-home/PurchasedContentTab"
import PurchaseTab from "@/components/channel-home/PurchaseTab"
import PackageTab from "@/components/channel-home/PackageTab"
import ChannelFooter from "@/components/channel-home/ChannelFooter"

export default function ChannelHomePage() {
  const [activeTab, setActiveTab] = useState("home")

  const handlePromotionClick = (targetTab: string) => {
    setActiveTab(targetTab)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col">
      {/* 채널 헤더 */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/30 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold">케인의 채널</h1>
            <p className="text-blue-100">케인캐인캐인</p>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm">
              <span>희원 7 • 콘텐츠 9 • 채널 소개 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="bg-white flex-1 flex flex-col">
        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <div className="border-b bg-white sticky top-0 z-10">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger value="home" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                홈
              </TabsTrigger>
              <TabsTrigger value="membership" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                멤버십
              </TabsTrigger>
              <TabsTrigger value="purchased-content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                구매 콘텐츠
              </TabsTrigger>
              <TabsTrigger value="purchase" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                단건구매
              </TabsTrigger>
              <TabsTrigger value="package" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                패키지
              </TabsTrigger>
              <TabsTrigger value="vrook" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                VROOK
              </TabsTrigger>
              <TabsTrigger value="xr-fanmeeting" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                XR팬미팅
              </TabsTrigger>
              <TabsTrigger value="community" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                <Users className="h-4 w-4 mr-1" />
                커뮤니티
              </TabsTrigger>
              <TabsTrigger value="support" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                <Gift className="h-4 w-4 mr-1" />
                후원
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                <Info className="h-4 w-4 mr-1" />
                소개
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                <Activity className="h-4 w-4 mr-1" />
                내 활동
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="flex-1">
            <TabsContent value="home" className="mt-0 h-full">
              <HomeTab />
            </TabsContent>

            <TabsContent value="membership" className="mt-0 h-full">
              <MembershipTab />
            </TabsContent>

            <TabsContent value="purchased-content" className="mt-0 h-full">
              <PurchasedContentTab />
            </TabsContent>

            <TabsContent value="purchase" className="mt-0 h-full">
              <PurchaseTab />
            </TabsContent>

            <TabsContent value="package" className="mt-0 h-full">
              <PackageTab />
            </TabsContent>

            <TabsContent value="vrook" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">VROOK 탭</h2>
                <p className="text-gray-600">VROOK 콘텐츠가 여기에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="xr-fanmeeting" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">XR 팬미팅 탭</h2>
                <p className="text-gray-600">XR 팬미팅 콘텐츠가 여기에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="community" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">커뮤니티 탭</h2>
                <p className="text-gray-600">팬톡, 게시판, 이벤트가 여기에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="support" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">후원 탭</h2>
                <p className="text-gray-600">후원 관련 기능이 여기에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="about" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">소개 탭</h2>
                <p className="text-gray-600">채널 소개가 여기에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-4">
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">내 활동 탭</h2>
                <p className="text-gray-600">나의 활동 내역이 여기에 표시됩니다.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* 푸터 */}
        <ChannelFooter onPromotionClick={handlePromotionClick} />
      </div>
    </div>
  )
}