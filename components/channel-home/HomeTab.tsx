"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { allContent, contentTypes } from "@/data/contentData"
import ContentCard from "./ContentCard"

export default function HomeTab() {
  const [contentFilter, setContentFilter] = useState("all")
  const [showAllPopular, setShowAllPopular] = useState(false)
  const [showAllContent, setShowAllContent] = useState(false)
  const [contentViewMode, setContentViewMode] = useState("normal")

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

  // 인기 콘텐츠 (조회수 기준 정렬)
  const popularContent = [...filteredContent].sort((a, b) => b.views - a.views)
  const displayedPopularContent = showAllPopular ? popularContent.slice(0, 10) : popularContent.slice(0, 4)

  // 전체 콘텐츠 (최신순 정렬)
  const recentContent = [...filteredContent].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
  const displayedRecentContent = showAllContent ? recentContent : recentContent.slice(0, 8)

  return (
    <div className="p-4">
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

      {/* 인기 콘텐츠 섹션 */}
      {popularContent.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">🔥 인기 콘텐츠</h2>
            {popularContent.length > 4 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllPopular(!showAllPopular)}
                className="flex items-center gap-1"
              >
                {showAllPopular ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedPopularContent.map((content) => (
              <ContentCard key={`popular-${content.id}`} content={content} />
            ))}
          </div>
        </div>
      )}

      {/* 전체 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">📅 전체 콘텐츠</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setContentViewMode(contentViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  contentViewMode === "compact" ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    contentViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {recentContent.length > 8 && (
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
          contentViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }>
          {displayedRecentContent.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content} 
              isCompact={contentViewMode === "compact"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}