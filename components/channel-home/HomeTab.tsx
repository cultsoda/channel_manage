"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, List, Grid3X3, ChevronDown, ChevronUp } from "lucide-react"
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
            {showAllContent && (
              <div className="flex items-center gap-1 mr-2">
                <Button
                  variant={contentViewMode === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentViewMode("normal")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={contentViewMode === "compact" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContentViewMode("compact")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            )}
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
          contentViewMode === "compact" && showAllContent
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }>
          {displayedRecentContent.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content} 
              isCompact={contentViewMode === "compact" && showAllContent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}