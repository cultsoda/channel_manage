"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { membershipContents, membershipTiers } from "@/data/membershipData"
import ContentCard from "./ContentCard"

export default function MembershipTab() {
  const [membershipFilter, setMembershipFilter] = useState("all")
  const [showAllMembership, setShowAllMembership] = useState(false)
  const [membershipViewMode, setMembershipViewMode] = useState("normal")

  // 멤버십 콘텐츠 필터링 및 정렬
  const filteredMembershipContent = membershipContents.filter(content => {
    if (membershipFilter === 'all') return true
    return content.membershipLevel === membershipFilter
  }).sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
  
  const displayedMembershipContent = showAllMembership ? filteredMembershipContent : filteredMembershipContent.slice(0, 8)

  return (
    <div className="p-4">
      {/* 멤버십 등급 안내 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">멤버십 혜택</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {membershipTiers.map((tier) => (
            <div key={tier.id} className={`${tier.bgClass} backdrop-blur rounded-lg p-4 ${tier.borderClass}`}>
              <h3 className="font-bold mb-2">{tier.emoji} {tier.name}</h3>
              <p className="text-sm mb-2">{tier.price}</p>
              <ul className="text-xs space-y-1">
                {tier.benefits.map((benefit, index) => (
                  <li key={index}>• {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
          멤버십 업그레이드 하기
        </button>
      </div>

      {/* 현재 멤버십 상태 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">현재 멤버십</p>
            <p className="font-bold text-lg">🥈 SILVER 멤버</p>
            <p className="text-xs text-gray-500">다음 결제일: 2024.07.15</p>
          </div>
          <div className="text-right">
            <button className="text-purple-600 font-medium text-sm hover:underline">
              등급 변경
            </button>
          </div>
        </div>
      </div>

      {/* 멤버십 콘텐츠 필터 */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
        <Button
          variant={membershipFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setMembershipFilter("all")}
          className="whitespace-nowrap"
        >
          전체 ({membershipContents.length})
        </Button>
        {membershipTiers.map((tier) => (
          <Button
            key={tier.id}
            variant={membershipFilter === tier.id ? "default" : "outline"}
            size="sm"
            onClick={() => setMembershipFilter(tier.id)}
            className="whitespace-nowrap"
          >
            {tier.emoji} {tier.name} ({membershipContents.filter(c => c.membershipLevel === tier.id).length})
          </Button>
        ))}
      </div>

      {/* 멤버십 콘텐츠 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">멤버십 전용 콘텐츠</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">모아보기</span>
              <button
                onClick={() => setMembershipViewMode(membershipViewMode === "normal" ? "compact" : "normal")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  membershipViewMode === "compact" ? "bg-purple-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    membershipViewMode === "compact" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {filteredMembershipContent.length > 8 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllMembership(!showAllMembership)}
                className="flex items-center gap-1"
              >
                {showAllMembership ? (
                  <>접기 <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>더보기 <ChevronDown className="h-4 w-4" /></>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* 멤버십 콘텐츠 그리드 */}
        <div className={
          membershipViewMode === "compact"
            ? "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }>
          {displayedMembershipContent.map((content) => (
            <ContentCard 
              key={content.id} 
              content={content} 
              isCompact={membershipViewMode === "compact"}
              showMembershipBadge={true}
            />
          ))}
        </div>

        {/* 업그레이드 유도 CTA */}
        {membershipFilter !== 'all' && filteredMembershipContent.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">
              {membershipTiers.find(tier => tier.id === membershipFilter)?.emoji} {membershipTiers.find(tier => tier.id === membershipFilter)?.name}
              {' '}멤버십 전용 콘텐츠
            </h3>
            <p className="text-gray-600 mb-4">
              이 콘텐츠는 {membershipFilter.toUpperCase()} 등급 이상 멤버만 볼 수 있습니다.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              멤버십 업그레이드 하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}