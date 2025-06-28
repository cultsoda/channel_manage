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
import { MessageCircle, Calendar, Send, Shield, Archive, UserX } from "lucide-react"

export default function CommunityPage() {
  const [eventOpen, setEventOpen] = useState(false)
  const [spamWords, setSpamWords] = useState("")
  const [autoBlock, setAutoBlock] = useState(false)
  const [saveChat, setSaveChat] = useState(true)

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
                <CardTitle>실시간 활동</CardTitle>
                <CardDescription>현재 진행 중인 채팅 활동을 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>실시간 채팅 활동이 없습니다.</p>
                  </div>
                </div>
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
                  <Checkbox checked={autoBlock} onCheckedChange={setAutoBlock} />
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
                  <Checkbox checked={saveChat} onCheckedChange={setSaveChat} />
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
          <Card>
            <CardHeader>
              <CardTitle>이벤트 관리</CardTitle>
              <CardDescription>팬 이벤트를 생성하고 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <p>진행 중인 이벤트가 없습니다.</p>
                <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4">새 이벤트 생성</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>이벤트 생성</DialogTitle>
                      <DialogDescription>새로운 팬 이벤트를 생성하세요.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-type">이벤트 유형 선택</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="이벤트 유형을 선택하세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="giveaway">경품 이벤트</SelectItem>
                            <SelectItem value="contest">콘테스트</SelectItem>
                            <SelectItem value="live">라이브 이벤트</SelectItem>
                            <SelectItem value="meetup">팬미팅</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-title">이벤트 제목</Label>
                        <Input id="event-title" placeholder="이벤트 제목을 입력하세요" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="event-start">시작일</Label>
                          <Input id="event-start" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-end">종료일</Label>
                          <Input id="event-end" type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-description">이벤트 설명</Label>
                        <div className="border rounded-md">
                          <div className="border-b p-2 flex gap-2">
                            <Button type="button" variant="ghost" size="sm">
                              B
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              I
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              U
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              링크
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              이미지
                            </Button>
                          </div>
                          <Textarea
                            id="event-description"
                            placeholder="이벤트 설명을 입력하세요"
                            className="min-h-[150px] border-0 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setEventOpen(false)}>
                        취소
                      </Button>
                      <Button type="submit" onClick={() => setEventOpen(false)}>
                        저장
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
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
