"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Play, Star, Sparkles, Gift, ShoppingCart, Calendar, Users, Headphones, Camera } from "lucide-react"
import { xrFanmeetingPackages, xrFanmeetingContent, xrDeviceCompatibility } from "@/data/xrFanmeetingData"

export default function XrFanmeetingTab() {
  const [viewMode, setViewMode] = useState("grid") // grid, compact
  const [showAllPackages, setShowAllPackages] = useState(false)
  const [showAllContent, setShowAllContent] = useState(false)

  const displayedPackages = showAllPackages ? xrFanmeetingPackages : xrFanmeetingPackages.slice(0, 3)
  const displayedContent = showAllContent ? xrFanmeetingContent : xrFanmeetingContent.slice(0, 6)

  const PackageCard = ({ packageData, isCompact = false }: { packageData: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={packageData.thumbnail} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
                XR 팬미팅
              </Badge>
            </div>
            {packageData.isPopular && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                인기
              </div>
            )}
            {packageData.isNew && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                NEW
              </div>
            )}
            {packageData.discount && (
              <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                {packageData.discount}% 할인
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm mb-1">{packageData.title}</h4>
            <div className="flex items-center gap-1">
              {packageData.originalPrice && (
                <span className="text-gray-400 text-xs line-through">
                  ₩{packageData.originalPrice.toLocaleString()}
                </span>
              )}
              <div className="text-blue-600 font-bold text-sm">
                ₩{packageData.price.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative">
          <div className="aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden">
            <img 
              src={packageData.thumbnail} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-blue-600 text-white text-sm px-3 py-1 font-bold">
                XR 팬미팅 패키지
              </Badge>
            </div>
            {packageData.isPopular && (
              <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                <Star className="h-3 w-3 inline mr-1" />
                인기
              </div>
            )}
            {packageData.isNew && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                <Sparkles className="h-3 w-3 inline mr-1" />
                NEW
              </div>
            )}
            {packageData.discount && (
              <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                {packageData.discount}% 할인
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-1">{packageData.title}</h3>
          <div className="flex items-center gap-2 mb-4">
            {packageData.originalPrice && (
              <span className="text-gray-400 text-lg line-through">
                ₩{packageData.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="text-blue-600 font-bold text-2xl">
              ₩{packageData.price.toLocaleString()}
            </div>
            <span className="text-gray-500 text-base">${packageData.priceUSD}</span>
          </div>
          
          {/* 패키지 구성품 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-800 mb-2">패키지 구성</h4>
            <div className="space-y-1">
              {packageData.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={benefit.includes('✨') ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            예매하기
          </button>
        </CardContent>
      </Card>
    )
  }

  const ContentCard = ({ content, isCompact = false }: { content: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${
              content.isFree 
                ? "bg-green-500 text-white" 
                : "bg-blue-600 text-white"
            }`}>
              {content.isFree ? "무료" : "XR"}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
            </div>
            {(content.type.includes("영상") || content.type.includes("라이브")) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
                </div>
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h4>
          </div>
        </Card>
      )
    }

    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative">
          <div className="aspect-[4/3] bg-gray-200 rounded-t-lg overflow-hidden">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-3 left-3 px-3 py-1 rounded text-sm font-bold flex items-center gap-1 ${
              content.isFree 
                ? "bg-green-500 text-white" 
                : "bg-blue-600 text-white"
            }`}>
              {content.isFree ? (
                <>
                  <Gift className="h-4 w-4" />
                  무료
                </>
              ) : (
                "XR 팬미팅"
              )}
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {content.duration}
            </div>
            {(content.type.includes("영상") || content.type.includes("라이브")) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1" fill="white" />
                </div>
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{content.description}</p>

          <button className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
            content.isFree 
              ? "bg-green-500 text-white hover:bg-green-600" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
            {content.isFree ? "무료로 시청하기" : "패키지 예매하여 보기"}
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4">
      {/* XR 팬미팅 소개 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">🥽</div>
          <div>
            <h2 className="text-2xl font-bold">XR 팬미팅</h2>
            <p className="text-sm opacity-90">가상현실에서 만나는 특별한 팬미팅</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          XR(확장현실) 기술로 구현된 가상공간에서 실시간으로 소통하는 새로운 차원의 팬미팅을 경험해보세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              실시간 소통
            </h3>
            <p className="text-xs">라이브로 진행되는 실시간 팬미팅</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1 flex items-center gap-1">
              <Users className="h-4 w-4" />
              1:1 대화
            </h3>
            <p className="text-xs">개별 팬과의 특별한 대화 시간</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1 flex items-center gap-1">
              <Camera className="h-4 w-4" />
              XR 포토존
            </h3>
            <p className="text-xs">가상공간에서의 특별한 기념사진</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1 flex items-center gap-1">
              <Headphones className="h-4 w-4" />
              몰입 체험
            </h3>
            <p className="text-xs">VR/AR로 체험하는 새로운 팬미팅</p>
          </div>
        </div>
      </div>

      {/* 다가오는 팬미팅 일정 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="h-5 w-5 text-amber-600" />
          <h3 className="font-bold text-amber-800">다가오는 XR 팬미팅</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/50 rounded-lg p-3">
            <h4 className="font-medium text-amber-800 mb-1">2024년 7월 15일 (월)</h4>
            <p className="text-amber-700">오후 8시 - 10시 (120분)</p>
            <p className="text-amber-600 text-xs mt-1">예매 마감: 7월 13일 자정</p>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <h4 className="font-medium text-amber-800 mb-1">특별 이벤트</h4>
            <p className="text-amber-700">생일 기념 XR 팬미팅</p>
            <p className="text-amber-600 text-xs mt-1">한정 100명 참여 가능</p>
          </div>
        </div>
      </div>

      {/* XR 팬미팅 패키지 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">팬미팅 패키지</h2>
          {xrFanmeetingPackages.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllPackages(!showAllPackages)}
              className="flex items-center gap-1"
            >
              {showAllPackages ? (
                <>접기 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>더보기 <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPackages.map((packageData) => (
            <PackageCard 
              key={packageData.id} 
              packageData={packageData}
              isCompact={false}
            />
          ))}
        </div>
      </div>

      {/* 콘텐츠 안내 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">콘텐츠 안내</h2>
            <p className="text-sm text-gray-700">XR 팬미팅과 관련된 콘텐츠들을 확인해보세요.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "compact" : "grid")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  viewMode === "compact" ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    viewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {xrFanmeetingContent.length > 6 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllContent(!showAllContent)}
                className="flex items-center gap-1"
              >
                {showAllContent ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className={
          viewMode === "compact"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {displayedContent.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content}
              isCompact={viewMode === "compact"}
            />
          ))}
        </div>
      </div>
  
    </div>
  )
}