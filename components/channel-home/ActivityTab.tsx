"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { activityData } from "@/data/activityData"
import { MEMBERSHIP_TIERS, FanSystemUtils } from "@/constants/fanSystem"
import { 
  User, 
  Trophy, 
  MessageCircle, 
  Heart, 
  Clock, 
  Gift, 
  ShoppingCart, 
  Calendar,
  Star,
  PlayCircle,
  TrendingUp,
  Award,
  Target,
  Eye,
  Crown,
  Zap
} from "lucide-react"

export default function ActivityTab() {
  const [activeSection, setActiveSection] = useState("overview")

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString() + "원"
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "from-yellow-400 to-yellow-600"
      case "epic": return "from-purple-400 to-purple-600"
      case "rare": return "from-blue-400 to-blue-600"
      default: return "from-gray-400 to-gray-600"
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "border-yellow-500"
      case "epic": return "border-purple-500"
      case "rare": return "border-blue-500"
      default: return "border-gray-500"
    }
  }

  // 현재 멤버십 등급 정보 가져오기
  const currentMembershipTier = MEMBERSHIP_TIERS.find(
    tier => tier.name === activityData.userInfo.membershipTier
  ) || MEMBERSHIP_TIERS[0]

  const sectionButtons = [
    { id: "overview", label: "활동 요약", icon: TrendingUp },
    { id: "badges", label: "배지 & 업적", icon: Award },
    { id: "comments", label: "내 댓글", icon: MessageCircle },
    { id: "favorites", label: "관심 콘텐츠", icon: Heart },
    { id: "purchases", label: "구매 내역", icon: ShoppingCart },
    { id: "support", label: "후원 내역", icon: Gift },
    { id: "events", label: "이벤트 참여", icon: Calendar },
    { id: "ranking", label: "팬 랭킹", icon: Trophy }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 유저 프로필 카드 */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {activityData.userInfo.name[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{activityData.userInfo.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span>가입일: {activityData.userInfo.joinDate}</span>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: currentMembershipTier.bgColor,
                    color: currentMembershipTier.textColor 
                  }}
                >
                  <span>{currentMembershipTier.emoji}</span>
                  <span>{currentMembershipTier.name} 멤버</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{activityData.userInfo.bio}</p>
            </div>
          </div>
          
          {/* 팬 레벨 정보 */}
          <div className="space-y-3 bg-white rounded-lg p-4 border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">
                  Lv.{activityData.userInfo.level} {activityData.userInfo.levelTitle}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {formatNumber(activityData.userInfo.totalPoints)} P
              </span>
            </div>
            <Progress value={activityData.userInfo.progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>현재 진행도: {activityData.userInfo.progressPoints}P</span>
              <span>다음 레벨까지: {activityData.userInfo.nextLevelPoints}P</span>
            </div>
          </div>

          {/* 멤버십 등급 정보 */}
          <div className="space-y-2 bg-white rounded-lg p-4 border mt-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" style={{ color: currentMembershipTier.color }} />
                <span className="font-medium">멤버십 등급</span>
              </div>
              <span className="text-sm text-gray-500">
                총 {formatAmount(activityData.userInfo.totalSpentAmount)}
              </span>
            </div>
            <div className="text-sm text-gray-600">{currentMembershipTier.description}</div>
            {currentMembershipTier.level < 5 && (
              <div className="text-xs text-gray-500">
                다음 등급까지: {formatAmount(MEMBERSHIP_TIERS[currentMembershipTier.level].minAmount - activityData.userInfo.totalSpentAmount)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 이번 달 활동 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            이번 달 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{activityData.activitySummary.thisMonth.commentsCount}</div>
              <div className="text-sm text-gray-600">댓글 작성</div>
              <div className="text-xs text-green-600 mt-1">+{activityData.activitySummary.thisMonth.commentsCount * 10}P</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">{activityData.activitySummary.thisMonth.likesGiven}</div>
              <div className="text-sm text-gray-600">좋아요</div>
              <div className="text-xs text-green-600 mt-1">+{activityData.activitySummary.thisMonth.likesGiven * 5}P</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-lg font-bold text-purple-600">{activityData.activitySummary.thisMonth.watchTime}</div>
              <div className="text-sm text-gray-600">시청 시간</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Gift className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-lg font-bold text-yellow-600">{formatAmount(activityData.activitySummary.thisMonth.supportAmount)}</div>
              <div className="text-sm text-gray-600">후원 금액</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{activityData.activitySummary.thisMonth.attendedEvents}</div>
              <div className="text-sm text-gray-600">이벤트 참여</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <Zap className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold text-indigo-600">{activityData.activitySummary.thisMonth.earnedPoints}</div>
              <div className="text-sm text-gray-600">획득 포인트</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 전체 활동 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            전체 활동 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 border rounded-lg">
              <div className="font-bold text-lg">{activityData.activitySummary.allTime.totalComments}</div>
              <div className="text-gray-600">총 댓글</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="font-bold text-lg">{activityData.activitySummary.allTime.totalLikes}</div>
              <div className="text-gray-600">총 좋아요</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="font-bold text-lg">{activityData.activitySummary.allTime.totalWatchTime}</div>
              <div className="text-gray-600">총 시청시간</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="font-bold text-lg">{formatAmount(activityData.activitySummary.allTime.totalSupport)}</div>
              <div className="text-gray-600">총 후원</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">획득한 배지 & 업적</h3>
        <p className="text-gray-600 text-sm">다양한 활동으로 배지를 모아보세요!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activityData.badges.map((badge, index) => (
          <Card key={index} className={`${getRarityBorder(badge.rarity)} border-2`}>
            <CardContent className={`p-4 bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white`}>
              <div className="text-center">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-bold mb-1">{badge.name}</h4>
                <p className="text-sm opacity-90 mb-2">{badge.description}</p>
                <div className="text-xs opacity-75">획득일: {badge.earnedDate}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderComments = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">내가 쓴 댓글</h3>
        <span className="text-sm text-gray-500">최근 5개</span>
      </div>
      
      {activityData.myComments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{comment.videoTitle}</h4>
              <div className="text-right text-xs text-gray-500">
                <div>{comment.date}</div>
                <div className="text-green-600">+{comment.earnedPoints}P</div>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{comment.comment}</p>
            <div className="flex items-center gap-2 text-sm">
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              <span>{comment.likes}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFavorites = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">관심 콘텐츠</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activityData.favoriteContent.map((content) => (
          <Card key={content.id}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-20 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{content.title}</h4>
                  <div className="text-sm text-gray-600 mb-1">{content.type}</div>
                  <div className="text-xs text-gray-500">
                    {formatNumber(content.views)} 조회 • 찜한 날: {content.addedDate}
                  </div>
                  {content.isWatched && (
                    <div className="text-xs text-green-600 mt-1">✅ 시청완료</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPurchases = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">구매 내역</h3>
      
      {activityData.purchaseHistory.map((purchase) => (
        <Card key={purchase.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{purchase.title}</h4>
                <div className="text-sm text-gray-600">{purchase.type}</div>
                <div className="text-xs text-gray-500">{purchase.date}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{formatAmount(purchase.amount)}</div>
                <div className="text-xs text-green-600">+{purchase.earnedPoints}P</div>
                <div className={`text-xs px-2 py-1 rounded ${
                  purchase.status === '완료' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {purchase.status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">후원 내역</h3>
      
      {activityData.supportHistory.map((support) => (
        <Card key={support.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-lg">{formatAmount(support.amount)}</div>
                {support.message && (
                  <p className="text-gray-700 mt-1">{support.message}</p>
                )}
                <div className="text-xs text-gray-500 mt-2">{support.date}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-green-600">+{support.earnedPoints}P</div>
                <div className={`text-xs px-2 py-1 rounded mt-1 ${
                  support.isPublic ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {support.isPublic ? '공개' : '익명'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">이벤트 참여 내역</h3>
      
      {activityData.eventHistory.map((event) => (
        <Card key={event.id} className={event.isWinner ? 'border-yellow-300 bg-yellow-50' : ''}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.type}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{event.participationDate}</div>
                <div className="text-xs text-green-600">+{event.earnedPoints}P</div>
                {event.isWinner && (
                  <div className="text-xs text-yellow-600 font-bold">🎉 당첨!</div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {event.status}
              </span>
              <span className="text-sm font-medium text-green-600">
                {event.reward}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderRanking = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">팬 랭킹</h3>
        <p className="text-gray-600 text-sm">전체 팬 중에서의 내 순위를 확인해보세요</p>
      </div>

      {/* 전체 랭킹 */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <div className="text-3xl font-bold text-blue-600 mb-2">#{activityData.ranking.currentRank}</div>
          <div className="text-gray-600 mb-4">전체 {formatNumber(activityData.ranking.totalFans)}명 중</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">이번 달 순위</div>
              <div className="font-bold">#{activityData.ranking.thisMonthRank}</div>
            </div>
            <div>
              <div className="text-gray-500">최고 순위</div>
              <div className="font-bold">#{activityData.ranking.bestRank}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 카테고리별 랭킹 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 랭킹</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityData.ranking.rankingCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="font-medium">{category.category}</span>
                <div className="text-right">
                  <div className="font-bold">#{category.rank}</div>
                  <div className="text-xs text-gray-500">/ {formatNumber(category.total)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview": return renderOverview()
      case "badges": return renderBadges()
      case "comments": return renderComments()
      case "favorites": return renderFavorites()
      case "purchases": return renderPurchases()
      case "support": return renderSupport()
      case "events": return renderEvents()
      case "ranking": return renderRanking()
      default: return renderOverview()
    }
  }

  return (
    <div className="p-4">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">내 활동</h2>
        <p className="text-purple-100 mb-4">
          채널에서의 모든 활동을 확인하고 성장해보세요!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Target className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">레벨 시스템</h3>
            <p className="text-xs">활동으로 레벨업</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Crown className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">멤버십 등급</h3>
            <p className="text-xs">후원으로 등급업</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Award className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">배지 수집</h3>
            <p className="text-xs">업적 달성 보상</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Trophy className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">팬 랭킹</h3>
            <p className="text-xs">다른 팬들과 경쟁</p>
          </div>
        </div>
      </div>

      {/* 섹션 네비게이션 */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2">
        {sectionButtons.map((section) => {
          const IconComponent = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          )
        })}
      </div>

      {/* 활성 섹션 콘텐츠 */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  )
}