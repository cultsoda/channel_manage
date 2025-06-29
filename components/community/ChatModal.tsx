"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Send, 
  Users, 
  Settings, 
  Smile,
  MoreVertical,
  X,
  Shield,
  Clock
} from "lucide-react"

interface ChatMessage {
  id: string
  user: {
    name: string
    level: number
    badge?: string
    isCreator?: boolean
    isModerator?: boolean
  }
  message: string
  timestamp: string
  type?: "message" | "system" | "join" | "leave"
}

interface ChatModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  roomData: {
    id: string
    name: string
    description: string
    memberCount: number
    accessLevel: string
    isActive: boolean
  }
  isCreatorView?: boolean // 크리에이터 관리 페이지에서 사용할 때
  mode?: "modal" | "embedded" | "mobile" // 표시 모드
}

// 임시 채팅 메시지 데이터
const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: { name: "팬1234", level: 5, badge: "VIP" },
    message: "안녕하세요! 오늘 콘텐츠 정말 좋았어요 💕",
    timestamp: "14:23",
    type: "message"
  },
  {
    id: "2",
    user: { name: "케인", level: 999, isCreator: true },
    message: "감사해요! 다음 콘텐츠도 기대해주세요 😊",
    timestamp: "14:25",
    type: "message"
  },
  {
    id: "3",
    user: { name: "골드팬567", level: 8, badge: "골드" },
    message: "VROOK 다음편 언제 나와요?",
    timestamp: "14:26",
    type: "message"
  },
  {
    id: "4",
    user: { name: "시스템", level: 0 },
    message: "VIP팬890님이 입장하셨습니다.",
    timestamp: "14:27",
    type: "join"
  },
  {
    id: "5",
    user: { name: "VIP팬890", level: 6, badge: "VIP" },
    message: "안녕하세요~ 늦게 왔네요",
    timestamp: "14:27",
    type: "message"
  }
]

const onlineUsers = [
  { name: "케인", level: 999, isCreator: true },
  { name: "팬1234", level: 5, badge: "VIP" },
  { name: "골드팬567", level: 8, badge: "골드" },
  { name: "VIP팬890", level: 6, badge: "VIP" },
  { name: "새내기팬123", level: 2 },
  { name: "실버팬456", level: 7, badge: "실버" }
]

// 메시지 아이템 컴포넌트 분리
function MessageItem({ message, isCreatorView }: { message: ChatMessage, isCreatorView: boolean }) {
  if (!message || !message.user) {
    return null
  }

  if (message.type === "system" || message.type === "join" || message.type === "leave") {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {message.message}
        </span>
      </div>
    )
  }

  const isMyMessage = message.user.name === (isCreatorView ? "케인" : "나")

  return (
    <div className={`flex gap-3 mb-4 ${isMyMessage ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
        message.user?.isCreator ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
        message.user?.badge === 'VIP' ? 'bg-blue-500 text-white' :
        message.user?.badge === '골드' ? 'bg-yellow-500 text-white' :
        'bg-gray-300 text-gray-700'
      }`}>
        {message.user?.name?.slice(0, 2) || "?"}
      </div>
      
      <div className={`flex-1 max-w-[70%] ${isMyMessage ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-2 mb-1 ${isMyMessage ? 'justify-end' : ''}`}>
          <span className="text-sm font-medium">
            {message.user?.name || "익명"}
          </span>
          {message.user?.isCreator && (
            <Badge variant="default" className="text-xs bg-purple-600">
              크리에이터
            </Badge>
          )}
          {message.user?.isModerator && (
            <Badge variant="secondary" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              관리자
            </Badge>
          )}
          {message.user?.badge && !message.user?.isCreator && (
            <Badge variant="outline" className="text-xs">
              {message.user.badge}
            </Badge>
          )}
          <span className="text-xs text-gray-500">Lv.{message.user?.level || 0}</span>
          <span className="text-xs text-gray-400">{message.timestamp}</span>
        </div>
        
        <div className={`p-3 rounded-lg ${
          isMyMessage 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
        </div>
      </div>
    </div>
  )
}

export default function ChatModal({ isOpen, onOpenChange, roomData, isCreatorView = false, mode = "modal" }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showUserList, setShowUserList] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 후 메시지 초기화
  useEffect(() => {
    if (isOpen && roomData) {
      setMessages(mockMessages)
    }
  }, [isOpen, roomData])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      } else {
        // fallback for regular div
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: { 
          name: isCreatorView ? "케인" : "나", 
          level: isCreatorView ? 999 : 5, 
          isCreator: isCreatorView,
          badge: isCreatorView ? undefined : "VIP"
        },
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        type: "message"
      }
      setMessages((prev: ChatMessage[]) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 임베디드나 모바일 모드일 때는 Dialog 없이 직접 렌더링
  if (mode === "embedded" || mode === "mobile") {
    if (!roomData) return null

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="flex-1 flex overflow-hidden">
          {/* 메인 채팅 영역 */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* 메시지 리스트 */}
            <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
              <div className="space-y-1">
                {messages.map((message: ChatMessage, index: number) => (
                  <MessageItem 
                    key={`${message.id}-${index}`} 
                    message={message} 
                    isCreatorView={isCreatorView}
                  />
                ))}
              </div>
            </div>

            {/* 메시지 입력 */}
            <div className="p-4 border-t bg-gray-50 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1"
                />
                <Button size="sm" onClick={() => {/* 이모지 */}}>
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
                {isCreatorView && (
                  <div className="flex items-center gap-4">
                    <span>관리자 권한으로 참여 중</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <MoreVertical className="h-3 w-3 mr-1" />
                      관리
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 온라인 유저 사이드바 (데스크톱 임베디드 모드에서만) */}
          {mode === "embedded" && showUserList && (
            <div className="w-64 border-l bg-gray-50 flex flex-col">
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">온라인 ({onlineUsers.length})</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserList(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {onlineUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.isCreator ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        user.badge === 'VIP' ? 'bg-blue-500 text-white' :
                        user.badge === '골드' ? 'bg-yellow-500 text-white' :
                        user.badge === '실버' ? 'bg-gray-400 text-white' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {user.name.slice(0, 2)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium truncate">{user.name}</span>
                          {user.isCreator && (
                            <Badge variant="default" className="text-xs bg-purple-600 px-1">
                              👑
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>Lv.{user.level}</span>
                          {user.badge && !user.isCreator && (
                            <>
                              <span>•</span>
                              <span>{user.badge}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {isCreatorView && !user.isCreator && (
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!isOpen || !roomData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${roomData.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
              <DialogTitle className="text-lg">{roomData.name}</DialogTitle>
              <Badge variant={roomData.accessLevel === "all" ? "default" : "secondary"}>
                {roomData.accessLevel === "all" ? "전체" : 
                 roomData.accessLevel === "premium" ? "프리미엄" : "골드"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserList(!showUserList)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>{roomData.memberCount}</span>
              </Button>
              
              {isCreatorView && (
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600">{roomData.description}</p>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* 메인 채팅 영역 */}
          <div className="flex-1 flex flex-col">
            {/* 메시지 리스트 */}
            <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
              <div className="space-y-1">
                {messages.map((message: ChatMessage, index: number) => (
                  <MessageItem 
                    key={`${message.id}-${index}`} 
                    message={message} 
                    isCreatorView={isCreatorView}
                  />
                ))}
              </div>
            </div>

            {/* 메시지 입력 */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1"
                />
                <Button size="sm" onClick={() => {/* 이모지 */}}>
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
                {isCreatorView && (
                  <div className="flex items-center gap-4">
                    <span>관리자 권한으로 참여 중</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <MoreVertical className="h-3 w-3 mr-1" />
                      관리
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 온라인 유저 사이드바 */}
          {showUserList && (
            <div className="w-64 border-l bg-gray-50 flex flex-col">
              <div className="p-4 border-b bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">온라인 ({onlineUsers.length})</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserList(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                  {onlineUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.isCreator ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        user.badge === 'VIP' ? 'bg-blue-500 text-white' :
                        user.badge === '골드' ? 'bg-yellow-500 text-white' :
                        user.badge === '실버' ? 'bg-gray-400 text-white' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {user.name.slice(0, 2)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium truncate">{user.name}</span>
                          {user.isCreator && (
                            <Badge variant="default" className="text-xs bg-purple-600 px-1">
                              👑
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>Lv.{user.level}</span>
                          {user.badge && !user.isCreator && (
                            <>
                              <span>•</span>
                              <span>{user.badge}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {isCreatorView && !user.isCreator && (
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}