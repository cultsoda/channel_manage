"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Play, 
  Heart, 
  MessageCircle,
  Share2,
  Users,
  Gift,
  Info,
  Activity
} from "lucide-react"

export default function ChannelHomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [contentFilter, setContentFilter] = useState("all")

  // 더미 데이터
  const allContent = [
    {
      id: "1",
      title: "단건구매의 왕버섯",
      type: "일반 이미지",
      category: "단건구매",
      membership: "₩ 2,000",
      views: 19,
      likes: 5,
      comments: 2,
      thumbnail: "/placeholder.svg?height=200&width=300",
      uploadDate: "2025.04.28"
    },
    {
      id: "2", 
      title: "VR 새우깡 체험",
      type: "VR 영상",
      category: "VROOK",
      membership: "프리미엄",
      views: 156,
      likes: 23,
      comments: 8,
      thumbnail: "/placeholder.svg?height=200&width=300",
      uploadDate: "2025.04.25"
    },
    {
      id: "3",
      title: "팬미팅 하이라이트",
      type: "XR TOUR",
      category: "XR팬미팅", 
      membership: "무료",
      views: 89,
      likes: 15,
      comments: 12,
      thumbnail: "/placeholder.svg?height=200&width=300",
      uploadDate: "2025.04.20"
    }
  ]

  const contentTypes = [
    { id: "all", label: "전체", count: allContent.length },
    { id: "vr-video", label: "VR영상", count: allContent.filter(c => c.type === "VR 영상").length },
    { id: "normal-video", label: "일반영상", count: allContent.filter(c => c.type === "일반 영상").length },
    { id: "image", label: "이미지", count: allContent.filter(c => c.type === "일반 이미지").length },
    { id: "xr-tour", label: "XR TOUR", count: allContent.filter(c => c.type === "XR TOUR").length }
  ]

  const filteredContent = contentFilter === "all" 
    ? allContent 
    : allContent.filter(content => {
        switch(contentFilter) {
          case "vr-video": return content.type === "VR 영상"
          case "normal-video": return content.type === "일반 영상"
          case "image": return content.type === "일반 이미지"
          case "xr-tour": return content.type === "XR TOUR"
          default: return true
        }
      })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600">
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
      <div className="bg-white">
        {/* 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-white sticky top-0 z-10">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger value="home" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                홈
              </TabsTrigger>
              <TabsTrigger value="membership" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                멤버십
              </TabsTrigger>
              <TabsTrigger value="purchase" className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent">
                단건구매
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

          {/* 홈 탭 */}
          <TabsContent value="home" className="p-4">
            {/* 검색 및 필터 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="콘텐츠 검색..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* 콘텐츠 유형 필터 */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={contentFilter === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContentFilter(type.id)}
                    className="whitespace-nowrap"
                  >
                    {type.label} ({type.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* 최신 콘텐츠 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">최근 콘텐츠</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContent.map((content) => (
                  <Card key={content.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary">{content.type}</Badge>
                        </div>
                        {content.type.includes("영상") && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-white ml-1" fill="white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{content.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>{content.uploadDate}</span>
                        <Badge variant={content.membership.includes("₩") ? "default" : "secondary"}>
                          {content.membership}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {content.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {content.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {content.comments}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 인기 콘텐츠 섹션 */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">인기 콘텐츠</h2>
                <Button variant="ghost" size="sm">더보기</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {allContent.slice(0, 4).map((content) => (
                  <Card key={`popular-${content.id}`} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-1 line-clamp-1">{content.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>조회 {content.views}</span>
                        <span>•</span>
                        <span>좋아요 {content.likes}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 다른 탭들 - 추후 구현 */}
          <TabsContent value="membership" className="p-4">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">멤버십 탭</h2>
              <p className="text-gray-600">멤버십 전용 콘텐츠가 여기에 표시됩니다.</p>
            </div>
          </TabsContent>

          <TabsContent value="purchase" className="p-4">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">단건구매 탭</h2>
              <p className="text-gray-600">구매 가능한 콘텐츠가 여기에 표시됩니다.</p>
            </div>
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
        </Tabs>
      </div>
    </div>
  )
}