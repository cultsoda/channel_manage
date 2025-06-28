"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ShoppingBag, Package, Book, Gamepad2, Crown } from "lucide-react"
import { purchasedContents, purchaseSourceCategories, purchasedContentSortOptions } from "@/data/purchasedContentData"
import ContentCard from "./ContentCard"

export default function PurchasedContentTab() {
  const [sourceFilter, setSourceFilter] = useState("all")
  const [sortBy, setSortBy] = useState("latest")
  const [showAllPurchased, setShowAllPurchased] = useState(false)
  const [purchasedViewMode, setPurchasedViewMode] = useState("normal")

  // 구매 출처별 필터링
  const filterBySource = (content: any) => {
    if (sourceFilter === 'all') return true
    return content.purchaseSource === sourceFilter
  }

  // 정렬 함수
  const sortContent = (contents: any[]) => {
    const sorted = [...contents]
    switch (sortBy) {
      case 'upload-latest':
        return sorted.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
      case 'popular':
        return sorted.sort((a, b) => b.views - a.views)
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.purchaseInfo.purchaseDate).getTime() - new Date(a.purchaseInfo.purchaseDate).getTime())
    }
  }

  // 필터링 및 정렬된 콘텐츠
  const filteredAndSortedContent = sortContent(
    purchasedContents.filter(filterBySource)
  )
  
  const displayedPurchasedContent = showAllPurchased ? filteredAndSortedContent : filteredAndSortedContent.slice(0, 8)

  const getSourceIcon = (sourceId: string) => {
    switch (sourceId) {
      case 'single':
        return <ShoppingBag className="h-4 w-4" />
      case 'package':
        return <Package className="h-4 w-4" />
      case 'vrook':
        return <Book className="h-4 w-4" />
      case 'xr-fanmeeting':
        return <Gamepad2 className="h-4 w-4" />
      default:
        return <Crown className="h-4 w-4" />
    }
  }

  return (
    <div className="p-4">
      {/* 구매 콘텐츠 소개 헤더 */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <Crown className="h-8 w-8 mr-3" />
          <div>
            <h2 className="text-2xl font-bold">구매 콘텐츠</h2>
            <p className="text-sm opacity-90">내가 구매한 모든 콘텐츠를 한눈에</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">💎 영구 소장</h3>
            <p className="text-xs">한 번 구매하면 평생 시청 가능</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">📱 언제든지</h3>
            <p className="text-xs">모바일, PC, VR 어디서나</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <h3 className="font-bold mb-1">🔄 출처별 관리</h3>
            <p className="text-xs">어디서 샀는지 쉽게 확인</p>
          </div>
        </div>
      </div>

      {/* 구매 출처별 필터 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
        {purchaseSourceCategories.map((category) => (
          <Button
            key={category.id}
            variant={sourceFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSourceFilter(category.id)}
            className="whitespace-nowrap flex items-center gap-1"
          >
            {getSourceIcon(category.id)}
            {category.label} ({category.count})
          </Button>
        ))}
      </div>

      {/* 정렬 및 뷰 옵션 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">내 콘텐츠 라이브러리</h2>
        <div className="flex items-center gap-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {purchasedContentSortOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 구매 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {sourceFilter === 'all' ? '전체' :
             sourceFilter === 'single' ? '단건구매' :
             sourceFilter === 'package' ? '패키지' :
             sourceFilter === 'vrook' ? 'VROOK' :
             'XR 팬미팅'} 콘텐츠
            ({filteredAndSortedContent.length}개)
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setPurchasedViewMode(purchasedViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  purchasedViewMode === "compact" ? "bg-emerald-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    purchasedViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {filteredAndSortedContent.length > 8 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllPurchased(!showAllPurchased)}
                className="flex items-center gap-1"
              >
                {showAllPurchased ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 구매 콘텐츠 그리드 */}
        <div className={
          purchasedViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }>
          {displayedPurchasedContent.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content} 
              isCompact={purchasedViewMode === "compact"}
              packageInfo={content.purchaseInfo}
            />
          ))}
        </div>

        {/* 빈 상태 */}
        {filteredAndSortedContent.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-2">아직 구매한 콘텐츠가 없습니다</h3>
            <p className="text-gray-600 mb-4">
              {sourceFilter === 'all' ? 
                '다른 탭에서 마음에 드는 콘텐츠를 구매해보세요!' :
                `${purchaseSourceCategories.find(c => c.id === sourceFilter)?.label} 구매 내역이 없습니다.`
              }
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={() => {/* 단건구매 탭으로 이동 */}}>
                단건구매 보러가기
              </Button>
              <Button variant="outline" onClick={() => {/* 패키지 탭으로 이동 */}}>
                패키지 보러가기
              </Button>
            </div>
          </div>
        )}
        </div>
    </div>
  )
}