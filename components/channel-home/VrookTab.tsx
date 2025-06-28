"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Eye, Heart, MessageCircle, Play, BookOpen, Star, Sparkles, Gift } from "lucide-react"
import { vrookPackages, vrookFreeContent, vrookCategories } from "@/data/vrookData"

export default function VrookTab() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAllVrook, setShowAllVrook] = useState(false)
  const [vrookViewMode, setVrookViewMode] = useState("normal")

  // 카테고리 필터링
  const filterByCategory = () => {
    switch (categoryFilter) {
      case 'packages':
        return vrookPackages
      case 'free':
        return vrookFreeContent
      case 'all':
      default:
        return [...vrookPackages, ...vrookFreeContent]
    }
  }

  const filteredContent = filterByCategory()
  const displayedContent = showAllVrook ? filteredContent : filteredContent.slice(0, 6)

  const VrookPackageCard = ({ packageData, isCompact = false }: { packageData: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={packageData.thumbnail} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1 left-1">
              <Badge variant="secondary" className="text-[10px] px-1 py-0 bg-cyan-600 text-white">
                📖 VROOK
              </Badge>
            </div>
            {packageData.isPopular && (
              <div className="absolute top-1 right-1 bg-yellow-500 text-black px-1 py-0.5 rounded text-[10px] font-bold">
                <Star className="h-2 w-2 inline mr-0.5" />
                인기
              </div>
            )}
            {packageData.isNew && (
              <div className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
                <Sparkles className="h-2 w-2 inline mr-0.5" />
                NEW
              </div>
            )}
          </div>
          <div className="p-2">
            <h4 className="font-medium text-xs mb-1 line-clamp-2 leading-tight">{packageData.title}</h4>
            <div className="text-[10px] text-cyan-600 font-bold">
              ₩{packageData.price.toLocaleString()} / ${packageData.priceUSD}
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
            <img 
              src={packageData.thumbnail} 
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-cyan-600 text-white px-2 py-1 rounded text-xs font-bold">
              <BookOpen className="h-3 w-3 inline mr-1" />
              VROOK
            </div>
            {packageData.isPopular && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                <Star className="h-3 w-3 inline mr-1" />
                인기
              </div>
            )}
            {packageData.isNew && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                <Sparkles className="h-3 w-3 inline mr-1" />
                NEW
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2">{packageData.title}</h3>
          
          {/* 패키지 구성품 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">패키지 구성</h4>
            <div className="space-y-1">
              {packageData.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  <div className="w-1 h-1 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={benefit.includes('✨') ? 'text-cyan-600 font-medium' : 'text-gray-600'}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{packageData.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{packageData.likes}</span>
              </div>
              <span>{packageData.uploadDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-cyan-600 font-bold text-xl">
                ₩{packageData.price.toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">
                ${packageData.priceUSD}
              </div>
            </div>
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
              XROMEDA에서 구매
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const FreeContentCard = ({ content, isCompact = false }: { content: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1 left-1 bg-green-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
              무료
            </div>
            <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-[10px]">
              {content.duration}
            </div>
            {content.type.includes("영상") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="h-3 w-3 text-white ml-0.5" fill="white" />
                </div>
              </div>
            )}
          </div>
          <div className="p-2">
            <h4 className="font-medium text-xs mb-1 line-clamp-2 leading-tight">{content.title}</h4>
            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <span className="flex items-center gap-0.5">
                <Eye className="h-2.5 w-2.5" />
                {content.views}
              </span>
              <span className="flex items-center gap-0.5">
                <Heart className="h-2.5 w-2.5" />
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
          <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              <Gift className="h-3 w-3 inline mr-1" />
              무료
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
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
          <h3 className="font-bold text-lg mb-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{content.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{content.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{content.likes}</span>
              </div>
              <span>{content.uploadDate}</span>
            </div>
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
            무료로 시청하기
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4">
      {/* VROOK 소개 헤더 */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-3">📖</div>
          <div>
            <h2 className="text-2xl font-bold">VROOK</h2>
            <p className="text-sm opacity-90">가상현실로 만나는 새로운 독서 경험</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          VROOK은 기존의 평면적인 독서를 넘어서, 3D 가상공간에서 몰입감 있는 스토리텔링을 경험할 수 있는 혁신적인 콘텐츠입니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">📖 몰입형 독서</h3>
            <p className="text-xs">VR로 경험하는 새로운 차원의 스토리</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">🎨 아트워크</h3>
            <p className="text-xs">고품질 비주얼과 사운드 경험</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">🎁 특별 굿즈</h3>
            <p className="text-xs">VR HMD, AI 포토카드 등 한정판</p>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
        {vrookCategories.map((category) => (
          <Button
            key={category.id}
            variant={categoryFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(category.id)}
            className="whitespace-nowrap"
          >
            {category.label} ({category.count})
          </Button>
        ))}
      </div>

      {/* VROOK 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {categoryFilter === 'packages' ? 'VROOK 패키지' :
             categoryFilter === 'free' ? '무료 미끼 콘텐츠' :
             'VROOK 전체 콘텐츠'}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setVrookViewMode(vrookViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  vrookViewMode === "compact" ? "bg-cyan-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    vrookViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {filteredContent.length > 6 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllVrook(!showAllVrook)}
                className="flex items-center gap-1"
              >
                {showAllVrook ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* VROOK 콘텐츠 그리드 */}
        <div className={
          vrookViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {displayedContent.map((item) => (
            item.benefits ? (
              <VrookPackageCard 
                key={item.id} 
                packageData={item}
                isCompact={vrookViewMode === "compact"}
              />
            ) : (
              <FreeContentCard 
                key={item.id} 
                content={item}
                isCompact={vrookViewMode === "compact"}
              />
            )
          ))}
        </div>
      </div>

      {/* VR 디바이스 호환성 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <span className="mr-2">ℹ️</span>
          VR 디바이스 호환성
        </h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <strong>VR HMD</strong>: Oculus Quest, HTC Vive, PlayStation VR 등</p>
          <p>• <strong>모바일</strong>: iOS/Android 앱으로도 체험 가능</p>
          <p>• <strong>PC</strong>: Windows/Mac 브라우저 지원</p>
          <p className="text-xs text-blue-600 mt-2">
            * VR 디바이스가 없어도 모바일/PC에서 360도 영상으로 감상할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}