"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Palette, Shield, Bell } from "lucide-react"

export default function ChannelSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">채널 설정</h1>
        <p className="text-muted-foreground">채널의 기본 정보와 설정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="design">디자인</TabsTrigger>
          <TabsTrigger value="privacy">개인정보</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                기본 정보
              </CardTitle>
              <CardDescription>채널의 기본 정보를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="channel-name">채널명</Label>
                <Input id="channel-name" placeholder="채널명을 입력하세요" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel-description">채널 설명</Label>
                <Textarea
                  id="channel-description"
                  placeholder="채널에 대한 설명을 입력하세요"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel-category">카테고리</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entertainment">엔터테인먼트</SelectItem>
                    <SelectItem value="music">음악</SelectItem>
                    <SelectItem value="gaming">게임</SelectItem>
                    <SelectItem value="education">교육</SelectItem>
                    <SelectItem value="lifestyle">라이프스타일</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">연락처 이메일</Label>
                <Input id="contact-email" type="email" placeholder="contact@example.com" />
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>비주얼 브랜딩</CardTitle>
              <CardDescription>채널의 시각적 요소를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>프로필 이미지</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">이미지 업로드</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>커버 이미지</Label>
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">커버 이미지</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  커버 이미지 업로드
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-color">브랜드 컬러</Label>
                <div className="flex items-center gap-2">
                  <Input id="brand-color" type="color" className="w-16 h-10" />
                  <Input placeholder="#FF5733" />
                </div>
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                디자인 설정
              </CardTitle>
              <CardDescription>채널 페이지의 디자인을 커스터마이징하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>테마</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="테마를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">라이트</SelectItem>
                    <SelectItem value="dark">다크</SelectItem>
                    <SelectItem value="auto">자동</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>레이아웃</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="레이아웃을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">그리드</SelectItem>
                    <SelectItem value="list">리스트</SelectItem>
                    <SelectItem value="card">카드</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>애니메이션 효과</Label>
                  <p className="text-sm text-muted-foreground">페이지 전환 시 애니메이션 사용</p>
                </div>
                <Switch />
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                개인정보 설정
              </CardTitle>
              <CardDescription>개인정보 보호 및 접근 권한을 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>채널 공개</Label>
                  <p className="text-sm text-muted-foreground">다른 사용자가 채널을 검색할 수 있습니다</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>댓글 허용</Label>
                  <p className="text-sm text-muted-foreground">콘텐츠에 댓글을 달 수 있습니다</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>연령 제한</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="연령 제한을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 이용가</SelectItem>
                    <SelectItem value="12">12세 이상</SelectItem>
                    <SelectItem value="15">15세 이상</SelectItem>
                    <SelectItem value="19">19세 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>데이터 수집 동의</Label>
                  <p className="text-sm text-muted-foreground">분석을 위한 사용자 데이터 수집</p>
                </div>
                <Switch />
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                알림 설정
              </CardTitle>
              <CardDescription>다양한 알림 설정을 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>새 구독자 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 구독자가 생겼을 때 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>댓글 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 댓글이 달렸을 때 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>멤버십 가입 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 멤버십 가입자 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>후원 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 후원이 들어왔을 때 알림</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">중요한 알림을 이메일로 받기</p>
                </div>
                <Switch />
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
