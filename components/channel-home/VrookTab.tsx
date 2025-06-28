"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Eye, Heart, MessageCircle, Play, BookOpen, Star, Sparkles, Gift, ShoppingCart } from "lucide-react"

// 임시 데이터 - 실제로는 API에서 가져올 데이터
const vrookInfluencers = [
  {
    id: 1,
    name: "브이툭 패키지",
    price: 39000,
    priceUSD: 29.7,
    thumbnail: "https://via.placeholder.com/300x200/8B5CF6/ffffff?text=브이툭+패키지",
    views: "45623",
    likes: "8934",
    uploadDate: "2024.06.18",
    isPopular: true,
    isNew: false,
    benefits: [
      "메인 화보 20장",
      "메이킹 영상 1개", 
      "VR 영상 1개"
    ]
  },
  {
    id: 2,
    name: "브이툭 스페셜 패키지",
    price: 59000,
    priceUSD: 49.5,
    thumbnail: "https://via.placeholder.com/300x200/EC4899/ffffff?text=브이툭+스페셜",
    views: "67890",
    likes: "12456",
    uploadDate: "2024.06.17",
    isPopular: false,
    isNew: true,
    benefits: [
      "메인 화보 20장",
      "메이킹 영상 1개",
      "✨ VR 영상(올바른) 1개",
      "✨ 올바른 VR HMD 특별 출장(국내 배송만 가능)"
    ]
  },
  {
    id: 3,
    name: "브이툭 ALL 패키지",
    price: 79000,
    priceUSD: 69.3,
    thumbnail: "https://via.placeholder.com/300x200/06B6D4/ffffff?text=브이툭+ALL",
    views: "89012",
    likes: "15678",
    uploadDate: "2024.06.16",
    isPopular: false,
    isNew: true,
    benefits: [
      "메인 화보 20장",
      "✨ B컷 화보 시리 20장",
      "메이킹 영상 1개",
      "VR 영상(올바른) 1개",
      "올바른 VR HMD 특별 출장(국내 배송만 가능)",
      "✨ AI 포토카드 3장(디지털, 실물→국내 배송만 가능)"
    ]
  }
]

const freePreviewContent = [
  {
    id: 101,
    title: "오늘의 거우디 메인 화보",
    description: "고품질 메인 화보를 미리 만나보세요.",
    thumbnail: "https://via.placeholder.com/300x200/10B981/ffffff?text=메인+화보+미리보기",
    duration: "20장",
    views: "34567",
    likes: "6789",
    uploadDate: "2024.06.13",
    type: "이미지"
  },
  {
    id: 102,
    title: "그녀의 여운을 B컷으로",
    description: "카메라가 담은 순간 포착된 거우디의 고급진 표정과 몸짓, 팬만을 위한 은밀한 돌져서 모습",
    thumbnail: "https://via.placeholder.com/300x200/F59E0B/ffffff?text=B컷+미리보기",
    duration: "B컷 20장",
    views: "23456",
    likes: "4321",
    uploadDate: "2024.06.14",
    type: "이미지"
  },
  {
    id: 103,
    title: "거우디를 화보 영상으로 만나요",
    description: "코스를 디렉팅부터 현장의 눈빛까지, 거우디의 몸짓이 모두 담겨 있는 감각적인 촬영 현장이에요.",
    thumbnail: "https://via.placeholder.com/300x200/EF4444/ffffff?text=메이킹+영상",
    duration: "메이킹 영상",
    views: "45678",
    likes: "8901",
    uploadDate: "2024.06.15",
    type: "영상"
  }
]

export default function VrookTab() {
  const [viewMode, setViewMode] = useState("grid") // grid, compact
  const [showAllPackages, setShowAllPackages] = useState(false)
  const [showAllPreview, setShowAllPreview] = useState(false)

  const displayedPackages = showAllPackages ? vrookInfluencers : vrookInfluencers.slice(0, 3)
  const displayedPreview = showAllPreview ? freePreviewContent : freePreviewContent.slice(0, 3)

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
              <Badge className="bg-purple-600 text-white text-xs px-2 py-1">
                VROOK
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
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm mb-1">{packageData.name}</h4>
            <div className="text-purple-600 font-bold text-sm">
              ₩{packageData.price.toLocaleString()}
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
              alt={packageData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-purple-600 text-white text-sm px-3 py-1 font-bold">
                VROOK PACKAGE
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
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-1">{packageData.name}</h3>
          <div className="text-purple-600 font-bold text-2xl mb-4">
            ₩{packageData.price.toLocaleString()}
            <span className="text-gray-500 text-base ml-2">${packageData.priceUSD}</span>
          </div>
          
          {/* 패키지 구성품 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">패키지 구성</h4>
            <div className="space-y-1">
              {packageData.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={benefit.includes('✨') ? 'text-purple-600 font-medium' : 'text-gray-600'}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{packageData.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{packageData.likes}</span>
              </div>
              <span>{packageData.uploadDate}</span>
            </div>
          </div>

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            XROMEDA에서 구매
          </button>
        </CardContent>
      </Card>
    )
  }

  const PreviewCard = ({ content, isCompact = false }: { content: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              무료
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
            </div>
            {content.type === "영상" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
                </div>
              </div>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {content.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {content.likes}
              </span>
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
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">
              <Gift className="h-4 w-4 inline mr-1" />
              무료
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {content.duration}
            </div>
            {content.type === "영상" && (
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
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{content.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{content.likes}</span>
              </div>
              <span>{content.uploadDate}</span>
            </div>
          </div>

          <button className="w-full bg-green-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
            무료로 체험하기
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4">
      {/* VROOK 소개 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">📖</div>
          <div>
            <h2 className="text-2xl font-bold">VR 셀럽 화보</h2>
            <p className="text-sm opacity-90">VROOK</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          VROOK은 VR 영상과 AI 화보를 통해 팬들에게 새로운 몰입 경험을 전달합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">📹 VR 영상</h3>
            <p className="text-xs">몰입할 수 있는 VR 기술로 제작된 독점 영상 콘텐츠</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">📸 디지털 사진</h3>
            <p className="text-xs">고품질 2D 사진으로 구성된 포토 프리미엄 화보 콘텐츠</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">🤖 AI 화보</h3>
            <p className="text-xs">AI 기술로 생성된 창의적이고 독특한 합성 화보</p>
          </div>
        </div>
      </div>

      {/* VROOK 패키지 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">패키지 안내</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "compact" : "grid")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  viewMode === "compact" ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    viewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {vrookInfluencers.length > 3 && (
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
        </div>

        <div className={
          viewMode === "compact"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {displayedPackages.map((packageData) => (
            <PackageCard 
              key={packageData.id} 
              packageData={packageData}
              isCompact={viewMode === "compact"}
            />
          ))}
        </div>
      </div>

      {/* 무료 미리보기 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-green-800">콘텐츠 안내</h2>
            <p className="text-sm text-green-700">패키지에 포함된 콘텐츠들을 확인해보세요. 어떤 특별한 경험이 기다리고 있는지 살펴보세요.</p>
          </div>
          {freePreviewContent.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllPreview(!showAllPreview)}
              className="flex items-center gap-1"
            >
              {showAllPreview ? (
                <>접기 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>더보기 <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>

        <div className={
          viewMode === "compact"
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {displayedPreview.map((content) => (
            <PreviewCard 
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