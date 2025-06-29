"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { activityData } from "@/data/activityData"
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
  Eye
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

  const levelProgress = (activityData.userInfo.totalPoints / (activityData.userInfo.totalPoints + activityData.userInfo.nextLevelPoints)) * 100

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
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                  {activityData.userInfo.membershipTier}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{activityData.userInfo.bio}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">레벨 {activityData.userInfo.level}</span>
              <span className="text-gray-500">
                {formatNumber(activityData.userInfo.totalPoints)} / {formatNumber(activityData.userInfo.totalPoints + activityData.userInfo.nextLevelPoints)} P
              </span>
            </div>
            <Progress value={levelProgress} className="h-2" />
            <div className="text-xs text-gray-500 text-right">
              다음 레벨까지 {formatNumber(activityData.userInfo.nextLevelPoints)}P
            </div>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">
                {activityData.activitySummary.thisMonth.commentsCount}
              </div>
              <div className="text-sm text-gray-600">댓글 작성</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-red-600">
                {activityData.activitySummary.thisMonth.likesGiven}
              </div>
              <div className="text-sm text-gray-600">좋아요</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-lg font-bold text-purple-600">
                {activityData.activitySummary.thisMonth.watchTime}
              </div>
              <div className="text-sm text-gray-600">시청 시간</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Gift className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-lg font-bold text-yellow-600">
                {formatAmount(activityData.activitySummary.thisMonth.supportAmount)}
              </div>
              <div className="text-sm text-gray-600">후원 금액</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 전체 활동 통계 */}
      <Card>
        <CardHeader>
          <CardTitle>전체 활동 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "총 댓글 수", value: formatNumber(activityData.activitySummary.allTime.totalComments), icon: MessageCircle, color: "blue" },
              { label: "총 좋아요", value: formatNumber(activityData.activitySummary.allTime.totalLikes), icon: Heart, color: "red" },
              { label: "총 시청 시간", value: activityData.activitySummary.allTime.totalWatchTime, icon: Clock, color: "purple" },
              { label: "총 후원 금액", value: formatAmount(activityData.activitySummary.allTime.totalSupport), icon: Gift, color: "yellow" },
              { label: "이벤트 참여", value: formatNumber(activityData.activitySummary.allTime.totalEvents) + "회", icon: Calendar, color: "green" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                  <span className="font-medium">{stat.label}</span>
                </div>
                <span className="font-bold text-gray-800">{stat.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBadges = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">수집한 배지</h3>
        <p className="text-gray-600 text-sm">총 {activityData.badges.length}개의 배지를 보유하고 있어요!</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {activityData.badges.map((badge) => (
          <Card key={badge.id} className={`border-2 ${getRarityBorder(badge.rarity)}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRarityColor(badge.rarity)} flex items-center justify-center text-2xl`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{badge.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-700' :
                      badge.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs text-gray-500">획득일: {badge.earnedDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderComments = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">내가 쓴 댓글</h3>
        <p className="text-gray-600 text-sm">최근 작성한 댓글들을 확인해보세요</p>
      </div>

      {activityData.myComments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="p-4">
            <div className="mb-3">
              <h4 className="font-medium text-sm mb-1">{comment.videoTitle}</h4>
              <div className="text-xs text-gray-500">{comment.date}</div>
            </div>
            <p className="text-gray-700 mb-3">{comment.comment}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${comment.isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-600">{comment.likes}</span>
              </div>
              <Button variant="outline" size="sm">
                영상 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFavorites = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">관심 콘텐츠</h3>
        <p className="text-gray-600 text-sm">좋아요를 누른 콘텐츠들이에요</p>
      </div>

      {activityData.favoriteContent.map((content) => (
        <Card key={content.id}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">{content.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>⏱️ {content.duration}</span>
                  <span>👁️ {formatNumber(content.views)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    content.type === 'playlist' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {content.type === 'playlist' ? '플레이리스트' : '영상'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">추가일: {content.addedDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderPurchases = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">구매 내역</h3>
        <p className="text-gray-600 text-sm">지금까지의 구매 기록을 확인하세요</p>
      </div>

      {activityData.purchaseHistory.map((purchase) => (
        <Card key={purchase.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{purchase.title}</h4>
                <p className="text-sm text-gray-600">{purchase.description}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{formatAmount(purchase.amount)}</div>
                <div className="text-xs text-gray-500">{purchase.date}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                purchase.type === 'membership' ? 'bg-purple-100 text-purple-700' :
                purchase.type === 'content' ? 'bg-blue-100 text-blue-700' :
                purchase.type === 'vrook' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {purchase.type === 'membership' ? '멤버십' :
                 purchase.type === 'content' ? '콘텐츠' :
                 purchase.type === 'vrook' ? 'VROOK' : '팬미팅'}
              </span>
              <span className={`text-xs font-medium ${
                purchase.status === 'active' ? 'text-green-600' : 'text-gray-600'
              }`}>
                {purchase.status === 'active' ? '이용중' : '완료'}
              </span>
            </div>
            {purchase.validUntil && (
              <div className="text-xs text-gray-500 mt-2">
                이용 기간: ~ {purchase.validUntil}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderSupport = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">후원 내역</h3>
        <p className="text-gray-600 text-sm">지금까지 총 {formatAmount(activityData.activitySummary.allTime.totalSupport)}을 후원했어요</p>
      </div>

      {activityData.supportHistory.map((support) => (
        <Card key={support.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-bold text-blue-600 mb-1">{formatAmount(support.amount)}</div>
                {support.message && (
                  <p className="text-sm text-gray-700 mb-2">"{support.message}"</p>
                )}
                <div className="text-xs text-gray-500">{support.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-yellow-500" />
                {support.isAnonymous && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">익명</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">이벤트 참여 기록</h3>
        <p className="text-gray-600 text-sm">총 {activityData.activitySummary.allTime.totalEvents}개 이벤트에 참여했어요</p>
      </div>

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
                  <div className="font-bold text-blue-600">#{category.rank}</div>
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
    <div className="space-y-6 p-4">
      {/* 섹션 네비게이션 */}
      <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
        {sectionButtons.map((section) => {
          const IconComponent = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
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