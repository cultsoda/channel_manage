"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  MessageCircle, 
  Trophy, 
  Vote, 
  Gift, 
  Calendar, 
  Crown,
  TrendingUp,
  Award,
  Users,
  Star,
  Target
} from "lucide-react"
import { MEMBERSHIP_TIERS, FanSystemUtils } from "@/constants/fanSystem"
import ChatModal from "@/components/community/ChatModal"
import { chatRooms, announcements, polls, posts, fanEvents as events } from "@/data/communityData"

// 타입 정의
interface Event {
  id: string
  title: string
  description: string
  type: string
  startDate: string
  endDate: string
  isActive: boolean
  participants: number
  maxWinners: number | null
  prizes: string[]
  howToParticipate: string
  hasParticipated: boolean
  progress?: {
    current: number
    required: number
    streak: boolean
  }
}

export default function CommunityTab() {
  const [activeSection, setActiveSection] = useState("announcements")
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false)
  const [showAllPolls, setShowAllPolls] = useState(false)
  const [selectedChatRoom, setSelectedChatRoom] = useState<any>(null)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)
  const [showAllPosts, setShowAllPosts] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  const handleChatRoomClick = (room: any) => {
    setSelectedChatRoom(room)
    setIsChatModalOpen(true)
  }

  const handleAnnouncementClick = (announcement: any) => {
    setSelectedAnnouncement(announcement)
    setIsAnnouncementModalOpen(true)
  }

  const handlePostClick = (post: any) => {
  setSelectedPost(post)
  setIsPostModalOpen(true)
  } 

  const sectionButtons = [
    { id: "announcements", label: "공지사항", icon: MessageCircle },
    { id: "posts", label: "게시글", icon: MessageCircle }, 
    { id: "chat", label: "팬톡", icon: MessageCircle },
    { id: "events", label: "이벤트", icon: Gift },
    { id: "polls", label: "팬 투표", icon: Vote },
    { id: "fanmeetings", label: "팬미팅", icon: Calendar },
    { id: "stats", label: "팬 통계", icon: TrendingUp }
  ]

  // 새로운 팬 통계 데이터 (멤버십 등급 기반)
  const fanStats = {
    totalFans: 1247,
    
    // 멤버십 등급별 분포
    membershipDistribution: [
      { 
        tier: MEMBERSHIP_TIERS[0], 
        count: 623, 
        percentage: 50.0,
        totalSpent: 0 
      },
      { 
        tier: MEMBERSHIP_TIERS[1], 
        count: 298, 
        percentage: 23.9,
        totalSpent: 14900000 
      },
      { 
        tier: MEMBERSHIP_TIERS[2], 
        count: 187, 
        percentage: 15.0,
        totalSpent: 28050000 
      },
      { 
        tier: MEMBERSHIP_TIERS[3], 
        count: 89, 
        percentage: 7.1,
        totalSpent: 26700000 
      },
      { 
        tier: MEMBERSHIP_TIERS[4], 
        count: 50, 
        percentage: 4.0,
        totalSpent: 25000000 
      }
    ],
    
    // 팬 레벨 분포 (활동 기반)
    levelDistribution: [
      { levelRange: "1-10", title: "뉴비", count: 423, percentage: 33.9, color: "#94A3B8" },
      { levelRange: "11-20", title: "비기너", count: 298, percentage: 23.9, color: "#64748B" },
      { levelRange: "21-30", title: "액티브", count: 187, percentage: 15.0, color: "#10B981" },
      { levelRange: "31-40", title: "레귤러", count: 145, percentage: 11.6, color: "#3B82F6" },
      { levelRange: "41-50", title: "시니어", count: 89, percentage: 7.1, color: "#8B5CF6" },
      { levelRange: "51-60", title: "엑스퍼트", count: 67, percentage: 5.4, color: "#F59E0B" },
      { levelRange: "61-70", title: "베테랑", count: 23, percentage: 1.8, color: "#EF4444" },
      { levelRange: "71-80", title: "마스터", count: 12, percentage: 1.0, color: "#EC4899" },
      { levelRange: "81-90", title: "레전드", count: 3, percentage: 0.2, color: "#F97316" },
      { levelRange: "91-100", title: "갓", count: 0, percentage: 0.1, color: "#DC2626" }
    ],
    
    // 이달의 탑 팬들 (레벨 + 멤버십 등급 조합)
    topFans: [
      { 
        name: "VR레전드001", 
        level: 87, 
        levelTitle: "레전드",
        membershipTier: MEMBERSHIP_TIERS[4], // 다이아
        activityScore: 9850,
        totalSpent: 890000
      },
      { 
        name: "골드킹234", 
        level: 74, 
        levelTitle: "마스터",
        membershipTier: MEMBERSHIP_TIERS[3], // 플래티넘
        activityScore: 8420,
        totalSpent: 450000
      },
      { 
        name: "VIP최고567", 
        level: 68, 
        levelTitle: "베테랑",
        membershipTier: MEMBERSHIP_TIERS[4], // 다이아
        activityScore: 8210,
        totalSpent: 720000
      },
      { 
        name: "플래티넘890", 
        level: 62, 
        levelTitle: "엑스퍼트",
        membershipTier: MEMBERSHIP_TIERS[3], // 플래티넘
        activityScore: 7890,
        totalSpent: 380000
      },
      { 
        name: "충성팬123", 
        level: 55, 
        levelTitle: "시니어",
        membershipTier: MEMBERSHIP_TIERS[2], // 골드
        activityScore: 7650,
        totalSpent: 220000
      }
    ],
    
    // 최근 팬 활동
    recentActivity: [
      { 
        name: "신규팬456", 
        action: "레벨업!", 
        detail: "Lv.15 비기너 달성", 
        time: "3분 전",
        type: "level"
      },
      { 
        name: "열정팬789", 
        action: "배지 획득", 
        detail: "댓글 마스터 배지", 
        time: "15분 전",
        type: "badge"
      },
      { 
        name: "VIP팬012", 
        action: "등급 업그레이드", 
        detail: "골드 → 플래티넘 멤버", 
        time: "32분 전",
        type: "membership"
      },
      { 
        name: "활동왕345", 
        action: "레벨업!", 
        detail: "Lv.42 레귤러 달성", 
        time: "1시간 전",
        type: "level"
      }
    ]
  }

  const renderAnnouncements = () => {
    const displayedAnnouncements = showAllAnnouncements ? announcements : announcements.slice(0, 3)
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">공지사항</h3>
          {announcements.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
              className="flex items-center gap-1"
            >
              {showAllAnnouncements ? (
                <>접기 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>더보기 <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
        
        {displayedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`cursor-pointer hover:shadow-md transition-shadow ${announcement.isImportant ? "border-red-200 bg-red-50" : ""}`}>
            <CardContent className="p-4" onClick={() => handleAnnouncementClick(announcement)}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  {announcement.title}
                  {announcement.isImportant && (
                    <Badge variant="destructive" className="text-xs">중요</Badge>
                  )}
                </h4>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">{announcement.content}</p>
              <div className="text-xs text-gray-500">조회수 {announcement.views.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderPosts = () => {
    const displayedPosts = showAllPosts ? posts : posts.slice(0, 3)
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">크리에이터 게시글</h3>
          {posts.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllPosts(!showAllPosts)}
              className="flex items-center gap-1"
            >
              {showAllPosts ? (
                <>접기 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>더보기 <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
        
        {displayedPosts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4" onClick={() => handlePostClick(post)}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{post.title}</h4>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{post.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>by {post.author}</span>
                <div className="flex items-center gap-3">
                  <span>❤️ {post.likes.toLocaleString()}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderPolls = () => {
    const displayedPolls = showAllPolls ? polls : polls.slice(0, 2)
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">팬 투표</h3>
          {polls.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllPolls(!showAllPolls)}
              className="flex items-center gap-1"
            >
              {showAllPolls ? (
                <>접기 <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>더보기 <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
        
        {displayedPolls.map((poll) => (
          <Card key={poll.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold mb-1">{poll.title}</h4>
                  <p className="text-sm text-gray-600">{poll.description}</p>
                </div>
                <Badge variant={poll.isActive ? "default" : "secondary"}>
                  {poll.isActive ? "진행중" : "종료"}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-3">
                {poll.options.map((option) => (
                  <div key={option.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span>{option.percentage}% ({option.votes}표)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>총 {poll.totalVotes.toLocaleString()}명 참여</span>
                <span>마감: {poll.endDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderEvents = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">이벤트</h3>
      
      {events.map((event: Event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <Badge variant={event.isActive ? "default" : "secondary"}>
                {event.isActive ? "진행중" : "종료"}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                    <span className="text-gray-500">기간:</span>
                    <span>{event.startDate} - {event.endDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">참여자:</span>
                    <span>{event.participants}명</span>
                </div>
            </div>
            
            <div className="mb-3">
              <h5 className="font-medium text-sm mb-1">참여 방법</h5>
              <p className="text-xs text-gray-600">{event.howToParticipate}</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium text-sm">상품</h5>
              {event.prizes.map((prize: string, index: number) => (
                <div key={index} className="text-xs text-gray-600">• {prize}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderChat = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">팬톡 채팅방</h3>
      
      {chatRooms.map((room) => (
        <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4" onClick={() => handleChatRoomClick(room)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">{room.name}</h4>
                  <p className="text-sm text-gray-600">{room.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{room.memberCount}명</div>
                <Badge variant={room.accessLevel === "all" ? "default" : "secondary"} className="text-xs">
                  {room.accessLevel === "all" ? "전체" : 
                   room.accessLevel === "premium" ? "프리미엄" : "골드"}
                </Badge>
                {room.isActive && (
                  <div className="text-xs text-green-600 mt-1">● 활성</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFanmeetings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">팬미팅</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold mb-1">7월 생일 기념 XR 팬미팅</h4>
                <p className="text-sm text-gray-600">특별한 생일을 함께 축하해요!</p>
              </div>
              <Badge variant="default">신청중</Badge>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span>일시:</span>
                <span>2024.07.15 20:00-22:00</span>
              </div>
              <div className="flex justify-between">
                <span>신청자:</span>
                <span>73/100명</span>
              </div>
              <div className="flex justify-between">
                <span>신청 마감:</span>
                <span>2024.07.13</span>
              </div>
            </div>
            
            <Button className="w-full" size="sm">
              XR 팬미팅 신청
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold mb-1">오프라인 팬사인회</h4>
                <p className="text-sm text-gray-600">서울에서 진행되는 소규모 팬사인회</p>
              </div>
              <Badge variant="secondary">신청완료</Badge>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span>일시:</span>
                <span>2024.08.20 14:00-17:00</span>
              </div>
              <div className="flex justify-between">
                <span>신청자:</span>
                <span>127/50명</span>
              </div>
              <div className="flex justify-between">
                <span>신청 마감:</span>
                <span>2024.07.25</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full" size="sm" disabled>
              이미 신청함
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStats = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-bold">팬 커뮤니티 통계</h3>
      </div>
      
      {/* 전체 요약 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600 mb-1">{fanStats.totalFans.toLocaleString()}</div>
            <div className="text-sm text-gray-600">총 팬 수</div>
            </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <div className="text-2xl font-bold text-green-600 mb-1">+127</div>
            <div className="text-sm text-gray-600">이번 달 신규 팬</div>
            </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600 mb-1">624</div>
            <div className="text-sm text-gray-600">멤버십 팬</div>
            </CardContent>
        </Card>
        </div>
      
      {/* 멤버십 등급별 분포 & 팬 레벨 분포 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 멤버십 등급별 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-purple-500" />
              멤버십 등급별 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fanStats.membershipDistribution.map((tier, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span style={{ color: tier.tier.color }}>{tier.tier.emoji}</span>
                      <span className="font-medium">{tier.tier.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{tier.count}명 ({tier.percentage}%)</div>
                      <div className="text-xs text-gray-500">
                        총 {(tier.totalSpent / 10000).toFixed(0)}만원
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${tier.percentage}%`,
                        backgroundColor: tier.tier.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 팬 레벨 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              팬 레벨 분포 (활동 기반)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fanStats.levelDistribution.filter(level => level.count > 0).map((level, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Lv.{level.levelRange} {level.title}</span>
                    <span>{level.count}명 ({level.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${level.percentage}%`,
                        backgroundColor: level.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 이달의 톱 팬들 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            이달의 톱 팬들
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fanStats.topFans.map((fan, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-400' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{fan.name}</span>
                    <div 
                      className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                      style={{ 
                        backgroundColor: fan.membershipTier.bgColor,
                        color: fan.membershipTier.textColor 
                      }}
                    >
                      <span>{fan.membershipTier.emoji}</span>
                      <span>{fan.membershipTier.name}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Lv.{fan.level} {fan.levelTitle} • 활동점수 {fan.activityScore.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    총 펀딩 {(fan.totalSpent / 10000).toFixed(0)}만원
                  </div>
                </div>
                
                {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 최근 팬 활동 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            최근 팬 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fanStats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === 'level' ? 'bg-blue-500' :
                  activity.type === 'membership' ? 'bg-purple-500' :
                  activity.type === 'badge' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.name}</span>
                    <span className="text-sm text-blue-600">{activity.action}</span>
                  </div>
                  <div className="text-sm text-gray-600">{activity.detail}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "announcements": return renderAnnouncements()
      case "posts": return renderPosts() 
      case "chat": return renderChat()
      case "events": return renderEvents()
      case "polls": return renderPolls()
      case "fanmeetings": return renderFanmeetings()
      case "stats": return renderStats()
      default: return renderAnnouncements()
    }
  }

  return (
    <div className="p-4">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">커뮤니티</h2>
        <p className="text-purple-100 mb-4">
          팬들과 소통하고 다양한 이벤트에 참여해보세요!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <MessageCircle className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">실시간 채팅</h3>
            <p className="text-xs">팬들과 자유로운 소통</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Trophy className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">팬 레벨업</h3>
            <p className="text-xs">활동으로 레벨 성장</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Vote className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">팬 투표</h3>
            <p className="text-xs">콘텐츠 결정에 참여</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
            <Gift className="h-5 w-5 mx-auto mb-1" />
            <h3 className="font-bold mb-1">특별 이벤트</h3>
            <p className="text-xs">다양한 혜택과 경품</p>
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

      {/* 채팅 모달 */}
      {selectedChatRoom && (
        <ChatModal
          isOpen={isChatModalOpen}
          onOpenChange={setIsChatModalOpen}
          roomData={selectedChatRoom}
          isCreatorView={false}
        />
      )}

      {/* 공지사항 상세 모달 */}
      {selectedAnnouncement && (
        <Dialog open={isAnnouncementModalOpen} onOpenChange={setIsAnnouncementModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {selectedAnnouncement.title}
                  {selectedAnnouncement.isImportant && (
                    <Badge variant="destructive" className="text-xs">중요</Badge>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedAnnouncement.date} • 조회수 {selectedAnnouncement.views.toLocaleString()}
                </p>
              </div>
            </DialogHeader>
            <div className="py-4">
              <div className="whitespace-pre-wrap text-gray-700">
                {selectedAnnouncement.content}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAnnouncementModalOpen(false)}>
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* 게시글 상세 모달 */}
      {selectedPost && (
        <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">{selectedPost.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedPost.author} • {selectedPost.date}
                </p>
              </div>
            </DialogHeader>
            <div className="py-4">
              <div className="whitespace-pre-wrap text-gray-700 mb-4">
                {selectedPost.content}
              </div>
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button 
                  variant={selectedPost.isLiked ? "default" : "outline"} 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  ❤️ {selectedPost.likes.toLocaleString()}
                </Button>
                <span className="text-sm text-gray-500">💬 {selectedPost.comments}개 댓글</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}