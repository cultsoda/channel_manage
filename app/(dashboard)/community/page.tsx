"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, Users, Settings } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-muted-foreground">팬 커뮤니티와 이벤트를 관리하세요.</p>
      </div>

      <Tabs defaultValue="fantalk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fantalk">팬톡 관리</TabsTrigger>
          <TabsTrigger value="events">이벤트 관리</TabsTrigger>
          <TabsTrigger value="feedback">피드백</TabsTrigger>
          <TabsTrigger value="notifications">알림 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="fantalk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                팬톡 설정
              </CardTitle>
              <CardDescription>팬톡 채팅방 설정을 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>팬톡 활성화</Label>
                  <p className="text-sm text-muted-foreground">팬들과의 실시간 채팅을 허용합니다</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>멤버십 전용 채팅</Label>
                  <p className="text-sm text-muted-foreground">유료 멤버만 참여 가능한 채팅방</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chat-rules">채팅 규칙</Label>
                <Textarea id="chat-rules" placeholder="채팅방 규칙을 입력하세요..." className="min-h-[100px]" />
              </div>

              <Button>설정 저장</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>최근 채팅 활동</CardTitle>
              <CardDescription>팬톡 채팅방의 최근 활동 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">김</span>
                    </div>
                    <div>
                      <p className="font-medium">김팬덤</p>
                      <p className="text-sm text-muted-foreground">안녕하세요! 새로운 콘텐츠 기대됩니다</p>
                    </div>
                  </div>
                  <Badge variant="secondary">5분 전</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">박</span>
                    </div>
                    <div>
                      <p className="font-medium">박VR</p>
                      <p className="text-sm text-muted-foreground">VR 콘텐츠 정말 재미있어요!</p>
                    </div>
                  </div>
                  <Badge variant="secondary">10분 전</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                이벤트 관리
              </CardTitle>
              <CardDescription>팬 이벤트를 생성하고 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">새 이벤트 만들기</Button>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">VR 팬미팅 이벤트</h4>
                    <Badge>진행중</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">특별한 VR 공간에서 팬들과 만나는 시간</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      수정
                    </Button>
                    <Button size="sm" variant="outline">
                      참가자 보기
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">신년 인사 이벤트</h4>
                    <Badge variant="secondary">예정</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">새해를 맞이하여 팬들과 함께하는 특별한 시간</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      수정
                    </Button>
                    <Button size="sm" variant="outline">
                      참가자 보기
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />팬 피드백
              </CardTitle>
              <CardDescription>팬들의 의견과 제안을 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">김팬덤</span>
                      <Badge variant="outline">제안</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">2024.12.28</span>
                  </div>
                  <p className="text-sm mb-3">VR 콘텐츠에 더 많은 인터랙션 요소가 있으면 좋겠어요!</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      답변
                    </Button>
                    <Button size="sm" variant="outline">
                      처리완료
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">박VR</span>
                      <Badge variant="outline">문의</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">2024.12.27</span>
                  </div>
                  <p className="text-sm mb-3">멤버십 혜택에 대해 더 자세히 알고 싶습니다.</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      답변
                    </Button>
                    <Button size="sm" variant="outline">
                      처리완료
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                알림 설정
              </CardTitle>
              <CardDescription>커뮤니티 알림 설정을 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>새 채팅 알림</Label>
                  <p className="text-sm text-muted-foreground">팬톡에 새 메시지가 올 때 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>이벤트 참가 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 이벤트 참가자 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>피드백 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 팬 피드백 알림</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>주간 리포트</Label>
                  <p className="text-sm text-muted-foreground">주간 커뮤니티 활동 요약</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button>설정 저장</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
