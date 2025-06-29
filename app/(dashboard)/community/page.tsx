"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Calendar, Send, Shield, Archive, UserX, Plus, Edit, Trash2 } from "lucide-react"
import ChatManager from "@/components/community/ChatManager"


// 타입 정의
interface Event {
  id: number
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  participants: number
  maxParticipants: number
  hasParticipantLimit: boolean
  status: string
}

interface NewEvent {
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  hasParticipantLimit: boolean
  maxParticipants: string
}

interface EventDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  title: string
  description: string
}

export default function CommunityPage() {
  const [eventOpen, setEventOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [spamWords, setSpamWords] = useState("")
  const [autoBlock, setAutoBlock] = useState(false)
  const [saveChat, setSaveChat] = useState(true)

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "VR 팬미팅",
      description: "특별한 VR 공간에서 만나요",
      startDate: "2024-12-30",
      startTime: "20:00",
      endDate: "2024-12-30", 
      endTime: "22:00",
      participants: 45,
      maxParticipants: 100,
      hasParticipantLimit: true,
      status: "예정"
    },
    {
      id: 2,
      title: "라이브 Q&A",
      description: "팬들의 질문에 답해드려요",
      startDate: "2024-12-28",
      startTime: "19:00",
      endDate: "2024-12-28",
      endTime: "21:00", 
      participants: 234,
      maxParticipants: 300,
      hasParticipantLimit: true,
      status: "진행중"
    },
    {
      id: 3,
      title: "신년 이벤트",
      description: "2024년을 마무리하는 특별한 시간",
      startDate: "2024-12-25",
      startTime: "18:00",
      endDate: "2024-12-25",
      endTime: "20:00",
      participants: 150,
      maxParticipants: 150,
      hasParticipantLimit: true,
      status: "완료"
    }
  ])

  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    hasParticipantLimit: false,
    maxParticipants: "",
  })

  const handleCreateEvent = () => {
    const eventData: Event = {
      id: events.length + 1,
      ...newEvent,
      maxParticipants: parseInt(newEvent.maxParticipants) || 0,
      participants: 0,
      status: "예정"
    }
    setEvents([...events, eventData])
    setEventOpen(false)
    setNewEvent({
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      hasParticipantLimit: false,
      maxParticipants: "",
    })
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setNewEvent({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime,
      hasParticipantLimit: event.hasParticipantLimit,
      maxParticipants: event.maxParticipants.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateEvent = () => {
    if (!selectedEvent) return
    
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, ...newEvent, maxParticipants: parseInt(newEvent.maxParticipants) || 0 }
        : event
    )
    setEvents(updatedEvents)
    setIsEditDialogOpen(false)
    setSelectedEvent(null)
    setNewEvent({
      title: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      hasParticipantLimit: false,
      maxParticipants: "",
    })
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "예정": return "default"
      case "진행중": return "secondary" 
      case "완료": return "outline"
      default: return "default"
    }
  }

  const EventDialog = ({ isOpen, onOpenChange, onSubmit, title, description }: EventDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">이벤트 제목</Label>
            <Input
              id="event-title"
              value={newEvent.title}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="이벤트 제목을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">이벤트 설명</Label>
            <Textarea
              id="event-description"
              value={newEvent.description}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="이벤트에 대한 자세한 설명을 입력하세요"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">시작일시</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="start-date"
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, startDate: e.target.value }))}
                />
                <Input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">종료일시</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="end-date"
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, endDate: e.target.value }))}
                />
                <Input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="participant-limit"
                checked={newEvent.hasParticipantLimit}
                onCheckedChange={(checked) => setNewEvent((prev) => ({ ...prev, hasParticipantLimit: Boolean(checked) }))}
              />
              <Label htmlFor="participant-limit">참여자 제한 설정</Label>
            </div>
            
            {newEvent.hasParticipantLimit && (
              <div className="space-y-2">
                <Label htmlFor="max-participants">최대 참여자 수</Label>
                <Input
                  id="max-participants"
                  type="number"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, maxParticipants: e.target.value }))}
                  placeholder="최대 참여자 수를 입력하세요"
                  min="1"
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit" onClick={onSubmit}>
            {title === "이벤트 수정" ? "수정 완료" : "저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-muted-foreground">팬톡, 회원 관리, 메시지, 이벤트를 관리하세요.</p>
      </div>

      <Tabs defaultValue="fantalk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fantalk">팬톡 관리</TabsTrigger>
          <TabsTrigger value="members">회원 관리</TabsTrigger>
          <TabsTrigger value="messages">메시지 관리</TabsTrigger>
          <TabsTrigger value="events">이벤트 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="fantalk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>채팅방 관리</CardTitle>
                <CardDescription>다양한 주제의 채팅방을 생성하고 관리하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {chatRooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-muted-foreground">{room.members}명 참여</p>
                      </div>
                    </div>
                    <Badge variant={room.type === "public" ? "default" : "secondary"}>
                      {room.type === "public" ? "공개" : "멤버십"}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full">새 채팅방 생성</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>실시간 채팅 관리</CardTitle>
                <CardDescription>채팅방별 실시간 대화를 확인하고 관리하세요.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChatManager chatRooms={chatRooms} isCreatorView={true} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>모더레이션 설정</CardTitle>
              <CardDescription>채팅방의 안전한 환경을 위한 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <Label>스팸 메시지 자동 차단</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      등록된 스팸 키워드가 포함된 메시지를 자동으로 차단합니다
                    </p>
                  </div>
                  <Checkbox checked={autoBlock} onCheckedChange={(checked) => setAutoBlock(Boolean(checked))} />
                </div>

                {autoBlock && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="spam-words">스팸 키워드 등록</Label>
                    <Textarea
                      id="spam-words"
                      placeholder="스팸으로 차단할 키워드를 쉼표로 구분하여 입력하세요"
                      value={spamWords}
                      onChange={(e) => setSpamWords(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button size="sm">키워드 저장</Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <UserX className="h-4 w-4" />
                      <Label>사용자 차단 관리</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">부적절한 행동을 하는 사용자를 차단하고 관리합니다</p>
                  </div>
                  <Button variant="outline" size="sm">
                    차단 목록 관리
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Archive className="h-4 w-4" />
                      <Label>채팅 기록 저장</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      채팅 기록을 서버에 저장하여 관리 목적으로 활용합니다
                    </p>
                  </div>
                  <Checkbox checked={saveChat} onCheckedChange={(checked) => setSaveChat(Boolean(checked))} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>팬 목록</CardTitle>
              <CardDescription>전체 팬 목록과 등급별 현황을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input placeholder="팬 검색..." className="max-w-sm" />
                  <Button variant="outline">필터</Button>
                </div>

                <div className="space-y-3">
                  {fanList.map((fan) => (
                    <div key={fan.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{fan.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{fan.name}</p>
                          <p className="text-sm text-muted-foreground">가입일: {fan.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-muted rounded text-xs">{fan.tier}</span>
                        <Button variant="outline" size="sm">
                          메시지
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>받은 메시지</CardTitle>
                <CardDescription>팬들이 보낸 메시지를 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center py-8 text-muted-foreground">
                    <Send className="h-8 w-8 mx-auto mb-2" />
                    <p>새로운 메시지가 없습니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>일괄 메시지 발송</CardTitle>
                <CardDescription>팬들에게 메시지를 일괄 발송하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">발송 대상</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>전체 팬</option>
                    <option>멤버십 팬만</option>
                    <option>VIP 팬만</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">메시지 내용</label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24"
                    placeholder="팬들에게 보낼 메시지를 입력하세요..."
                  />
                </div>
                <Button className="w-full">메시지 발송</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">이벤트 관리</h2>
              <p className="text-muted-foreground">팬들과의 특별한 이벤트를 계획하고 관리하세요.</p>
            </div>
            <Dialog open={eventOpen} onOpenChange={setEventOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />새 이벤트 생성
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={getBadgeVariant(event.status)}>{event.status}</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>시작일</span>
                      <span>{event.startDate} {event.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>종료일</span>
                      <span>{event.endDate} {event.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>참여자</span>
                      <span>
                        {event.participants}
                        {event.hasParticipantLimit ? `/${event.maxParticipants}` : ''}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 새 이벤트 생성 모달 */}
          <EventDialog 
            isOpen={eventOpen}
            onOpenChange={setEventOpen}
            onSubmit={handleCreateEvent}
            title="새 이벤트 생성"
            description="팬들과 함께할 새로운 이벤트를 만들어보세요."
          />

          {/* 이벤트 수정 모달 */}
          <EventDialog 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleUpdateEvent}
            title="이벤트 수정"
            description="이벤트 정보를 수정하세요."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const chatRooms = [
  { id: "1", name: "일반 채팅", members: 1284, type: "public" },
  { id: "2", name: "VIP 전용", members: 45, type: "private" },
  { id: "3", name: "질문과 답변", members: 892, type: "public" },
]

const fanList = [
  { id: "1", name: "김팬1", joinDate: "2024.01.15", tier: "VIP", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "이팬2", joinDate: "2024.02.20", tier: "프리미엄", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "박팬3", joinDate: "2024.03.10", tier: "베이직", avatar: "/placeholder.svg?height=40&width=40" },
]