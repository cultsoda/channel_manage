"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Settings,
  MoreVertical,
  Users,
  MessageCircle,
  Shield,
  Volume2,
  VolumeX,
  Pin,
  Trash2
} from "lucide-react"
import ChatModal from "./ChatModal"

interface ChatManagerProps {
  chatRooms: any[]
  isCreatorView?: boolean
}

export default function ChatManager({ chatRooms, isCreatorView = false }: ChatManagerProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [showMobileChat, setShowMobileChat] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    checkMobile()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // 채팅방 입장 처리
  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room)
    if (isMobile) {
      setShowMobileChat(true)
    }
  }

  // 모바일에서 뒤로가기
  const handleMobileBack = () => {
    setShowMobileChat(false)
    setSelectedRoom(null)
  }

  // 채팅방 리스트 렌더링
  const renderChatRoomList = () => (
    <div className="space-y-3">
      {/* 헤더 (모바일에서만 표시) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-bold">채팅방 관리</h2>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* 전체 통계 (크리에이터 모드) */}
      {isCreatorView && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">실시간 현황</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">1,247</div>
                <div className="text-gray-600">전체 팬</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">156</div>
                <div className="text-gray-600">온라인</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">23</div>
                <div className="text-gray-600">미처리 신고</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 채팅방 목록 */}
      {chatRooms.map((room) => (
        <ChatRoomCard 
          key={room.id}
          room={room}
          onSelect={() => handleRoomSelect(room)}
          isCreatorView={isCreatorView}
          isMobile={isMobile}
        />
      ))}
    </div>
  )

  // 데스크톱 사이드바 레이아웃
  if (!isMobile) {
    return (
      <div className="flex h-[600px] border rounded-lg overflow-hidden">
        {/* 좌측 채팅방 목록 */}
        <div className="w-80 border-r bg-gray-50 overflow-y-auto">
          {renderChatRoomList()}
        </div>

        {/* 우측 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <div className="h-full">
              <ChatModal
                isOpen={true}
                onOpenChange={() => setSelectedRoom(null)}
                roomData={selectedRoom}
                isCreatorView={isCreatorView}
                mode="embedded" // 임베디드 모드
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>채팅방을 선택해주세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 모바일 스택 레이아웃
  return (
    <div className="relative">
      {/* 채팅방 목록 화면 */}
      <div className={`transition-transform duration-300 ${showMobileChat ? '-translate-x-full' : 'translate-x-0'}`}>
        {renderChatRoomList()}
      </div>

      {/* 개별 채팅방 화면 */}
      {showMobileChat && selectedRoom && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* 상단 헤더 */}
          <div className="flex items-center gap-3 p-4 border-b bg-white">
            <Button variant="ghost" size="sm" onClick={handleMobileBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex-1">
              <h3 className="font-medium">{selectedRoom.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedRoom.memberCount}명 참여 중
              </p>
            </div>

            {isCreatorView && (
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* 채팅 영역 */}
          <div className="flex-1">
            <ChatModal
              isOpen={true}
              onOpenChange={handleMobileBack}
              roomData={selectedRoom}
              isCreatorView={isCreatorView}
              mode="mobile" // 모바일 모드
            />
          </div>
        </div>
      )}
    </div>
  )
}

// 채팅방 카드 컴포넌트
function ChatRoomCard({ 
  room, 
  onSelect, 
  isCreatorView, 
  isMobile 
}: { 
  room: any
  onSelect: () => void
  isCreatorView: boolean
  isMobile: boolean 
}) {
  const [showActions, setShowActions] = useState(false)

  const handleLongPress = () => {
    if (isMobile && isCreatorView) {
      setShowActions(true)
    }
  }

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onSelect}
      onTouchStart={handleLongPress}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${room.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
            <h4 className="font-medium">{room.name}</h4>
            
            {/* 안 읽은 메시지 수 (크리에이터 모드) */}
            {isCreatorView && room.unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {room.unreadCount}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={room.accessLevel === "all" ? "default" : "secondary"}>
              {room.accessLevel === "all" ? "전체" : 
               room.accessLevel === "premium" ? "프리미엄" : "골드"}
            </Badge>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{room.memberCount}</span>
            </div>
          </div>
        </div>

        {/* 최근 메시지 */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="font-medium text-blue-600">{room.latestMessage?.user || "익명"}</span>
            <span className="text-gray-500">{room.latestMessage?.timestamp || ""}</span>
          </div>
          <p className="text-sm text-gray-700 truncate">{room.latestMessage?.message || "메시지가 없습니다."}</p>
        </div>

        {/* 크리에이터 관리 옵션 (데스크톱에서 항상 표시, 모바일에서 길게 눌렀을 때) */}
        {isCreatorView && (!isMobile || showActions) && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Button variant="ghost" size="sm" className="flex-1">
              <Shield className="h-4 w-4 mr-1" />
              관리
            </Button>
            <Button variant="ghost" size="sm">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <VolumeX className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}