"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, Heart, MessageCircle, Play } from "lucide-react"
import { purchaseContents, priceRanges, sortOptions } from "@/data/purchaseData"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PurchaseTab() {
  const [priceFilter, setPriceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [showAllPurchase, setShowAllPurchase] = useState(false)
  const [purchaseViewMode, setPurchaseViewMode] = useState("normal")

  // 가격 필터링
  const filterByPrice = (content: any) => {
    const range = priceRanges.find(r => r.id === priceFilter)
    if (!range) return true
    return content.price >= range.min && content.price <= range.max
  }

  // 정렬 함수
  const sortContent = (contents: any[]) => {
    const sorted = [...contents]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views)
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    }
  }

  // 필터링 및 정렬된 콘텐츠
  const filteredAndSortedContent = sortContent(
    purchaseContents.filter(filterByPrice)
  )
  
  const displayedPurchaseContent = showAllPurchase ? filteredAndSortedContent : filteredAndSortedContent.slice(0, 8)

  const PurchaseCard = ({ content, isCompact = false }: { content: any, isCompact?: boolean }) => {
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
              <Badge variant="secondary" className="text-[10px] px-1 py-0">
                {content.type === 'VR 영상' ? '🥽 VR' :
                 content.type === '일반 영상' ? '🎥 영상' :
                 content.type === '일반 이미지' ? '📷 사진' : '📄 기타'}
              </Badge>
            </div>
            {content.discount && (
              <div className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-[10px] font-bold">
                -{content.discount}%
              </div>
            )}
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
            <div className="flex items-center justify-between text-[10px] mb-1">
              {content.discount ? (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 line-through">
                    {content.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-blue-600 font-bold">
                    {content.price.toLocaleString()}원
                  </span>
                </div>
              ) : (
                <span className="text-blue-600 font-bold">
                  {content.price.toLocaleString()}원
                </span>
              )}
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
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              {content.type === 'VR 영상' ? '🥽 VR' :
               content.type === '일반 영상' ? '🎥 영상' :
               content.type === '일반 이미지' ? '📷 사진' : '📄 기타'}
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
            </div>
            {content.discount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{content.discount}%
              </div>
            )}
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
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{content.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{content.description}</p>
          
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
              {content.discount ? (
                <div>
                  <span className="text-gray-400 line-through text-sm">
                    {content.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-blue-600 font-bold text-lg ml-2">
                    {content.price.toLocaleString()}원
                  </span>
                </div>
              ) : (
                <span className="text-blue-600 font-bold text-lg">
                  {content.price.toLocaleString()}원
                </span>
              )}
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              구매하기
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-4">
      {/* 가격 필터 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
        {priceRanges.map((range) => (
          <Button
            key={range.id}
            variant={priceFilter === range.id ? "default" : "outline"}
            size="sm"
            onClick={() => setPriceFilter(range.id)}
            className="whitespace-nowrap"
          >
            {range.label} ({purchaseContents.filter(content => {
              return content.price >= range.min && content.price <= range.max
            }).length})
          </Button>
        ))}
      </div>

      {/* 정렬 및 뷰 옵션 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">개별 구매 콘텐츠</h2>
        <div className="flex items-center gap-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 단건구매 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {priceFilter === 'all' ? '전체' : priceRanges.find(r => r.id === priceFilter)?.label} 상품 
            ({filteredAndSortedContent.length}개)
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setPurchaseViewMode(purchaseViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  purchaseViewMode === "compact" ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    purchaseViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {filteredAndSortedContent.length > 8 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllPurchase(!showAllPurchase)}
                className="flex items-center gap-1"
              >
                {showAllPurchase ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 단건구매 콘텐츠 그리드 */}
        <div className={
          purchaseViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }>
          {displayedPurchaseContent.map((content) => (
            <PurchaseCard 
              key={content.id} 
              content={content} 
              isCompact={purchaseViewMode === "compact"}
            />
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredAndSortedContent.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-2">해당하는 콘텐츠가 없습니다</h3>
            <p className="text-gray-600">다른 가격대의 콘텐츠를 확인해보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}