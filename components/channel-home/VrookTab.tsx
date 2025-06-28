"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Play, Star, Sparkles, Gift, ShoppingCart } from "lucide-react"
import { vrookPackages, vrookAllContent, vrookCategories } from "@/data/vrookData"

export default function VrookTab() {
  const [viewMode, setViewMode] = useState("grid") // grid, compact
  const [showAllPackages, setShowAllPackages] = useState(false)
  const [showAllContent, setShowAllContent] = useState(false)

  const displayedPackages = showAllPackages ? vrookPackages : vrookPackages.slice(0, 3)
  const displayedContent = showAllContent ? vrookAllContent : vrookAllContent.slice(0, 6)

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
            <h4 className="font-medium text-sm mb-1">{packageData.title}</h4>
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
              alt={packageData.title}
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
          <h3 className="font-bold text-xl mb-1">{packageData.title}</h3>
          <div className="text-purple-600 font-bold text-2xl mb-4">
            ₩{packageData.price.toLocaleString()}
            <span className="text-gray-500 text-base ml-2">${packageData.priceUSD}</span>
          </div>
          
          {/* 패키지 구성품 */}
          <div className="mb-6">
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

          <button className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            구매하기
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
                : "bg-purple-600 text-white"
            }`}>
              {content.isFree ? "무료" : "VROOK"}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
            </div>
            {content.type.includes("영상") && (
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
                : "bg-purple-600 text-white"
            }`}>
              {content.isFree ? (
                <>
                  <Gift className="h-4 w-4" />
                  무료
                </>
              ) : (
                "VROOK"
              )}
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {content.duration}
            </div>
            {content.type.includes("영상") && (
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
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}>
            {content.isFree ? "무료로 체험하기" : "패키지 구매하여 보기"}
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
          {vrookPackages.length > 3 && (
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
            <p className="text-sm text-gray-700">패키지에 포함된 콘텐츠들을 확인해보세요. 어떤 특별한 경험이 기다리고 있는지 살펴보세요.</p>
          </div>
          {vrookAllContent.length > 6 && (
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