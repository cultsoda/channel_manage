"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Gift, Info, Activity } from "lucide-react"
import HomeTab from "@/components/channel-home/HomeTab"
import MembershipTab from "@/components/channel-home/MembershipTab"
import PurchasedContentTab from "@/components/channel-home/PurchasedContentTab"
import PurchaseTab from "@/components/channel-home/PurchaseTab"
import PackageTab from "@/components/channel-home/PackageTab"
import VrookTab from "@/components/channel-home/VrookTab"
import ChannelFooter from "@/components/channel-home/ChannelFooter"
import XrFanmeetingTab from "@/components/channel-home/XrFanmeetingTab"
import CommunityTab from "@/components/channel-home/CommunityTab"
import SupportTab from "@/components/channel-home/SupportTab"


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
            <p className="text-blue-100">케인과 함께하는 우당탕탕 일상</p>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm">
              <span>희원 1,024 • 콘텐츠 97 </span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="bg-white flex-1 flex flex-col">
        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex overflow-x-auto scrollbar-hide px-4">
            {[
              { id: "home", name: "홈" },
              { id: "membership", name: "멤버십" },
              { id: "purchase", name: "단건구매" },
              { id: "vrook", name: "VROOK" },
              { id: "xr-fanmeeting", name: "XR팬미팅" },
              { id: "community", name: "커뮤니티" },
              { id: "support", name: "후원" },
              { id: "about", name: "소개" },
              { id: "activity", name: "내 활동" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col"></Tabs>

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

            <TabsContent value="vrook" className="mt-0 h-full">
              <VrookTab />
            </TabsContent>

            <TabsContent value="xr-fanmeeting" className="mt-0 h-full">
                <XrFanmeetingTab />
            </TabsContent>

            <TabsContent value="community" className="mt-0 h-full">
                <CommunityTab />
            </TabsContent>

            <TabsContent value="support" className="mt-0 h-full">
                <SupportTab />
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