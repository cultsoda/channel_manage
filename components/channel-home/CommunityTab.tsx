"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  MessageCircle, 
  Megaphone, 
  Trophy, 
  Vote, 
  Calendar,
  Gift,
  Users,
  Clock,
  Award,
  CheckCircle,
  Star,
  Crown
} from "lucide-react"
import { 
  chatRooms, 
  announcements, 
  fanLevelSystem, 
  polls, 
  fanmeetings, 
  fanEvents 
} from "@/data/communityData"

export default function CommunityTab() {
  const [activeSection, setActiveSection] = useState("chat")

  const sectionButtons = [
    { id: "chat", label: "팬톡", icon: MessageCircle },
    { id: "announcements", label: "공지사항", icon: Megaphone },
    { id: "level", label: "팬 레벨", icon: Trophy },
    { id: "polls", label: "투표", icon: Vote },
    { id: "fanmeetings", label: "팬미팅", icon: Calendar },
    { id: "events", label: "이벤트", icon: Gift }
  ]

  const renderChatSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold">팬톡</h3>
      </div>
      
      {chatRooms.map((room) => (
        <Card key={room.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${room.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                <h4 className="font-medium">{room.name}</h4>
                <Badge variant={room.accessLevel === "all" ? "default" : "secondary"}>
                  {room.accessLevel === "all" ? "전체" : 
                   room.accessLevel === "premium" ? "프리미엄" : "골드"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{room.memberCount}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{room.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-blue-600">{room.latestMessage.user}</span>
                <span className="text-gray-500">{room.latestMessage.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{room.latestMessage.message}</p>
            </div>
            
            <Button className="w-full mt-3">
              채팅방 입장
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderAnnouncementsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-bold">공지사항</h3>
      </div>
      
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{announcement.title}</h4>
                {announcement.isImportant && (
                  <Badge variant="destructive" className="text-xs">중요</Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">{announcement.date}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>조회수 {announcement.views.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderLevelSection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-600" />
        <h3 className="text-lg font-bold">팬 레벨</h3>
      </div>
      
      {/* 현재 레벨 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            현재 레벨
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              Lv.{fanLevelSystem.currentLevel.level}
            </div>
            <div className="text-lg text-gray-700">
              {fanLevelSystem.currentLevel.name}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>경험치</span>
              <span>{fanLevelSystem.currentLevel.currentExp} / {fanLevelSystem.currentLevel.requiredExp}</span>
            </div>
            <Progress value={fanLevelSystem.currentLevel.percentage} className="h-3" />
            <p className="text-xs text-gray-500 text-center">
              다음 레벨까지 {fanLevelSystem.currentLevel.requiredExp - fanLevelSystem.currentLevel.currentExp}exp 남음
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 획득한 배지 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            내 배지 컬렉션
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fanLevelSystem.badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`p-3 rounded-lg border ${
                  badge.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}>
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <span className={`font-medium text-sm ${badge.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                    {badge.name}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{badge.description}</p>
                {badge.earned && badge.date && (
                  <p className="text-xs text-yellow-600 mt-1">획득일: {badge.date}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPollsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Vote className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-bold">팬 투표</h3>
      </div>
      
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium mb-1">{poll.title}</h4>
                <p className="text-sm text-gray-600">{poll.description}</p>
              </div>
              <Badge variant={poll.isActive ? "default" : "secondary"}>
                {poll.isActive ? "진행중" : "종료"}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-4">
              {poll.options.map((option) => (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{option.text}</span>
                    <span>{option.percentage}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={option.percentage} className="h-2" />
                    <span className="absolute right-1 top-0 text-xs text-gray-500">
                      {option.votes}표
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>총 {poll.totalVotes.toLocaleString()}표</span>
              <span>마감: {poll.endDate}</span>
            </div>
            
            {poll.isActive && (
              <Button 
                className="w-full mt-3" 
                disabled={poll.hasVoted}
                variant={poll.hasVoted ? "secondary" : "default"}
              >
                {poll.hasVoted ? "투표 완료" : "투표하기"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFanmeetingsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-bold">팬미팅 신청</h3>
      </div>
      
      {fanmeetings.map((meeting) => (
        <Card key={meeting.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium mb-1">{meeting.title}</h4>
                <p className="text-sm text-gray-600">{meeting.description}</p>
              </div>
              <Badge variant={meeting.type === "XR" ? "default" : "secondary"}>
                {meeting.type === "XR" ? "XR 팬미팅" : 
                 meeting.type === "offline" ? "오프라인" : "온라인"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{meeting.time}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>신청 현황</span>
                <span>{meeting.currentApplicants} / {meeting.maxParticipants}명</span>
              </div>
              <Progress 
                value={(meeting.currentApplicants / meeting.maxParticipants) * 100} 
                className="h-2" 
              />
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2">참여 조건</h5>
              <div className="space-y-1">
                {meeting.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2">혜택</h5>
              <div className="flex flex-wrap gap-2">
                {meeting.prizes.map((prize, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {prize}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              disabled={!meeting.isApplicationOpen || meeting.hasApplied}
              variant={meeting.hasApplied ? "secondary" : "default"}
            >
              {meeting.hasApplied ? "신청 완료" : 
               !meeting.isApplicationOpen ? "신청 마감" : "신청하기"}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              신청 마감: {meeting.applicationEndDate}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderEventsSection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="h-5 w-5 text-pink-600" />
        <h3 className="text-lg font-bold">팬 이벤트</h3>
      </div>
      
      {fanEvents.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <Badge variant={event.isActive ? "default" : "secondary"}>
                {event.isActive ? "진행중" : "종료"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{event.startDate} ~ {event.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{event.participants}명 참여</span>
              </div>
            </div>
            
            {event.progress && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>진행 상황</span>
                  <span>{event.progress.current} / {event.progress.required}일</span>
                </div>
                <Progress 
                  value={(event.progress.current / event.progress.required) * 100} 
                  className="h-2" 
                />
              </div>
            )}
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2">참여 방법</h5>
              <p className="text-sm text-gray-600">{event.howToParticipate}</p>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2">
                {event.maxWinners ? `당첨자 ${event.maxWinners}명` : "참여 보상"}
              </h5>
              <div className="flex flex-wrap gap-2">
                {event.prizes.map((prize, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {prize}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              disabled={!event.isActive || event.hasParticipated}
              variant={event.hasParticipated ? "secondary" : "default"}
            >
              {event.hasParticipated ? "참여 완료" : 
               !event.isActive ? "이벤트 종료" : "참여하기"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "chat":
        return renderChatSection()
      case "announcements":
        return renderAnnouncementsSection()
      case "level":
        return renderLevelSection()
      case "polls":
        return renderPollsSection()
      case "fanmeetings":
        return renderFanmeetingsSection()
      case "events":
        return renderEventsSection()
      default:
        return renderChatSection()
    }
  }

  return (
    <div className="p-4">
      {/* 커뮤니티 소개 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">💬</div>
          <div>
            <h2 className="text-2xl font-bold">커뮤니티</h2>
            <p className="text-sm opacity-90">팬들과 함께하는 특별한 공간</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          다른 팬들과 소통하고, 이벤트에 참여하며, 나만의 팬 레벨을 키워보세요!
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
    </div>
  )
}