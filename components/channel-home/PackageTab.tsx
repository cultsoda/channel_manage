"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, Heart, MessageCircle, Package, Star, Sparkles } from "lucide-react"
import { packageContents, packageCategories, packageSortOptions } from "@/data/packageData"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PackageTab() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [showAllPackage, setShowAllPackage] = useState(false)
  const [packageViewMode, setPackageViewMode] = useState("normal")

  // 카테고리 필터링
  const filterByCategory = (content: any) => {
    switch (categoryFilter) {
      case 'popular':
        return content.isPopular
      case 'new':
        return content.isNew
      case 'all':
        return true
      default:
        return content.category === categoryFilter
    }
  }

  // 정렬 함수
  const sortContent = (contents: any[]) => {
    const sorted = [...contents]
    switch (sortBy) {
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views)
      case 'price-low':
        return sorted.sort((a, b) => a.packagePrice - b.packagePrice)
      case 'price-high':
        return sorted.sort((a, b) => b.packagePrice - a.packagePrice)
      case 'discount':
        return sorted.sort((a, b) => b.discount - a.discount)
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    }
  }

  // 필터링 및 정렬된 콘텐츠
  const filteredAndSortedContent = sortContent(
    packageContents.filter(filterByCategory)
  )
  
  const displayedPackageContent = showAllPackage ? filteredAndSortedContent : filteredAndSortedContent.slice(0, 6)

  const PackageCard = ({ content, isCompact = false }: { content: any, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1 left-1">
              <Badge variant="secondary" className="text-[10px] px-1 py-0 bg-green-600 text-white">
                <Package className="h-2 w-2 mr-0.5" />
                패키지
              </Badge>
            </div>
            {content.isPopular && (
              <div className="absolute top-1 right-1 bg-yellow-500 text-black px-1 py-0.5 rounded text-[10px] font-bold">
                <Star className="h-2 w-2 inline mr-0.5" />
                인기
              </div>
            )}
            {content.isNew && (
              <div className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
                <Sparkles className="h-2 w-2 inline mr-0.5" />
                NEW
              </div>
            )}
            <div className="absolute bottom-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
              -{content.discount}%
            </div>
          </div>
          <div className="p-2">
            <h4 className="font-medium text-xs mb-1 line-clamp-2 leading-tight">{content.title}</h4>
            <div className="text-[10px] mb-1">
              <span className="text-gray-400 line-through">
                {content.originalPrice.toLocaleString()}원
              </span>
              <span className="text-green-600 font-bold ml-1">
                {content.packagePrice.toLocaleString()}원
              </span>
            </div>
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
            <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
              <Package className="h-3 w-3 inline mr-1" />
              패키지
            </div>
            {content.isPopular && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                <Star className="h-3 w-3 inline mr-1" />
                인기
              </div>
            )}
            {content.isNew && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                <Sparkles className="h-3 w-3 inline mr-1" />
                NEW
              </div>
            )}
            <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              -{content.discount}% 할인
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{content.description}</p>
          
          {/* 패키지 구성품 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">패키지 구성 ({content.items.length}개)</h4>
            <div className="space-y-1">
              {content.items.slice(0, 3).map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-xs text-gray-600">
                  <span className="flex-1 truncate">• {item.name}</span>
                  <span className="text-gray-400 ml-2">{item.price.toLocaleString()}원</span>
                </div>
              ))}
              {content.items.length > 3 && (
                <div className="text-xs text-gray-500">+ {content.items.length - 3}개 더...</div>
              )}
            </div>
          </div>

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

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">
                  {content.originalPrice.toLocaleString()}원
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                  {content.discount}% 할인
                </span>
              </div>
              <span className="text-green-600 font-bold text-xl">
                {content.packagePrice.toLocaleString()}원
              </span>
              <p className="text-xs text-gray-500 mt-1">
                개별 구매 시 {(content.originalPrice - content.packagePrice).toLocaleString()}원 절약!
              </p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              패키지 구매
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4">
      {/* 패키지 소개 헤더 */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <Package className="h-8 w-8 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">패키지 상품</h2>
            <p className="text-sm opacity-90">여러 콘텐츠를 묶어서 더 저렴하게!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">💰 최대 44% 할인</h3>
            <p className="text-xs">개별 구매보다 훨씬 저렴한 가격</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">📦 다양한 구성</h3>
            <p className="text-xs">영상, 이미지, 음원이 한 번에</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">⭐ 특별 혜택</h3>
            <p className="text-xs">패키지 전용 보너스 콘텐츠</p>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
        {packageCategories.map((category) => (
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

      {/* 정렬 및 뷰 옵션 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">패키지 상품 목록</h2>
        <div className="flex items-center gap-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {packageSortOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 패키지 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {categoryFilter === 'all' ? '전체' : 
             categoryFilter === 'popular' ? '인기 패키지' :
             categoryFilter === 'new' ? '신규 패키지' :
             packageCategories.find(c => c.id === categoryFilter)?.label} 
            ({filteredAndSortedContent.length}개)
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setPackageViewMode(packageViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  packageViewMode === "compact" ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    packageViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {filteredAndSortedContent.length > 6 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllPackage(!showAllPackage)}
                className="flex items-center gap-1"
              >
                {showAllPackage ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 패키지 상품 그리드 */}
        <div className={
          packageViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        }>
          {displayedPackageContent.map((content) => (
            <PackageCard 
              key={content.id} 
              content={content} 
              isCompact={packageViewMode === "compact"}
            />
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredAndSortedContent.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">해당하는 패키지가 없습니다</h3>
            <p className="text-gray-600">다른 카테고리를 확인해보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}