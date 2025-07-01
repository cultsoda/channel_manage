"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  UsersIcon,
  TrendingUp,
  EyeIcon,
  MessageCircleIcon,
  HeartIcon,
  BellIcon,
  MailIcon,
  CalendarIcon,
  UploadIcon,
  ChevronRight,
  UserPlus,
  Heart,
  Gift,
  Upload,
  Megaphone,
  Mail,
  Calendar,
} from "lucide-react"
import { DashboardChart } from "@/components/dashboard-chart"
import { RevenueChart } from "@/components/revenue-chart"
import { ContentComparisonChart } from "@/components/content-comparison-chart"
import { MembershipConversionChart } from "@/components/membership-conversion-chart"
import Link from "next/link"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily")
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const [eventOpen, setEventOpen] = useState(false)
  const [customDateOpen, setCustomDateOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">내 채널의 모든 요약 정보를 확인해 보세요</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">기본</TabsTrigger>
            <TabsTrigger value="weekly">주별</TabsTrigger>
            <TabsTrigger value="monthly">월별</TabsTrigger>
            <TabsTrigger value="custom">직접설정</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="space-y-6">
          {/* 핵심 지표 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">핵심 지표</h2>

            {/* 팬 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">팬 현황</h3>
                <Link
                  href="/analytics?tab=fans"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">총 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">현재 채널을 구독하고 있는 전체 팬 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">신규 팬</CardTitle>
                    <UsersIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">최근 7일/30일간 새로 가입한 팬 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">멤버십 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">유료 멤버십에 가입한 팬 수 및 비율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 수익 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">수익 현황</h3>
                <Link
                  href="/analytics?tab=revenue"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">이번 달 총 수익</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₩ 2,450,000</div>
                    <p className="text-xs text-muted-foreground">당월 발생한 모든 수익의 합계</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">전월 대비 증감률</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">+22%</div>
                    <p className="text-xs text-muted-foreground">지난 달 대비 수익 증가/감소 비율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 콘텐츠 성과 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">콘텐츠 성과</h3>
                <Link
                  href="/analytics?tab=content"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground">전체 콘텐츠의 누적 조회수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
                    <HeartIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.4%</div>
                    <p className="text-xs text-muted-foreground">조회수 대비 좋아요, 댓글 등의 참여 비율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 커뮤니티 활동 */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-muted-foreground">커뮤니티 활동</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">댓글 수</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,847</div>
                    <p className="text-xs text-muted-foreground">최근 기간 동안 작성된 총 댓글 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">팬톡 활성도</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">팬톡 채팅방의 메시지 수 및 참여자 수</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* 실시간 활동 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">실시간 활동</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 팬 가입</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">3명</div>
                  <p className="text-xs text-muted-foreground">실시간으로 새로 가입한 팬 알림 표시(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 펀딩 참여</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">₩ 45,000</div>
                  <p className="text-xs text-muted-foreground">실시간 펀딩 참여 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">댓글 및 반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">28개</div>
                  <p className="text-xs text-muted-foreground">새로운 댓글, 좋아요 등의 반응 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 업그레이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">5명</div>
                  <p className="text-xs text-muted-foreground">팬이 멤버십 등급을 올린 경우 알림(최근7일)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 빠른 실행 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">빠른 실행</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* 새 콘텐츠 업로드 */}
              <Link href="/upload">
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <UploadIcon className="h-8 w-8 mb-2 text-orange-500" />
                    <h3 className="font-medium">새 콘텐츠 업로드</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 업로드 페이지로 이동</p>
                  </CardContent>
                </Card>
              </Link>

              {/* 공지사항 작성 */}
              <Dialog open={noticeOpen} onOpenChange={setNoticeOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <BellIcon className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">공지사항 작성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 공지사항 작성 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>공지사항 작성</DialogTitle>
                    <DialogDescription>팬들에게 전달할 공지사항을 작성하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-title">제목</Label>
                      <Input id="notice-title" placeholder="공지사항 제목을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-type">내용 유형</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="내용 유형을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">텍스트</SelectItem>
                          <SelectItem value="poll">설문</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-content">내용</Label>
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
                          id="notice-content"
                          placeholder="공지사항 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNoticeOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setNoticeOpen(false)}>
                      저장
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 팬에게 메시지 */}
              <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <MailIcon className="h-8 w-8 mb-2 text-green-500" />
                      <h3 className="font-medium">팬에게 메시지</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 메시지 보내기 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>팬에게 메시지 보내기</DialogTitle>
                    <DialogDescription>팬들에게 개별 또는 그룹 메시지를 보내세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>대상 선택</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-fans" />
                          <Label htmlFor="all-fans">전체 팬</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vip-fans" />
                          <Label htmlFor="vip-fans">VIP 멤버십</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-fans" />
                          <Label htmlFor="premium-fans">프리미엄 멤버십</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-content">메시지 내용</Label>
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
                          id="message-content"
                          placeholder="메시지 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setMessageOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setMessageOpen(false)}>
                      보내기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 이벤트 생성 */}
              <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CalendarIcon className="h-8 w-8 mb-2 text-purple-500" />
                      <h3 className="font-medium">이벤트 생성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 이벤트 생성 모달</p>
                    </CardContent>
                  </Card>
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
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          {/* 핵심 지표 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">핵심 지표</h2>

            {/* 팬 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">팬 현황</h3>
                <Link
                  href="/analytics?tab=fans"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">총 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">+8% 지난 주 대비</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">신규 팬</CardTitle>
                    <UsersIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">이번 주 신규 가입</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">멤버십 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">+5% 지난 주 대비</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 수익 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">수익 현황</h3>
                <Link
                  href="/analytics?tab=revenue"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">이번 주 총 수익</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₩ 612,500</div>
                    <p className="text-xs text-muted-foreground">주간 발생한 모든 수익의 합계</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">전주 대비 증감률</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">+12%</div>
                    <p className="text-xs text-muted-foreground">지난 주 대비 수익 증가/감소 비율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 콘텐츠 성과 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">콘텐츠 성과</h3>
                <Link
                  href="/analytics?tab=content"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">주간 조회수</CardTitle>
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">11,308</div>
                    <p className="text-xs text-muted-foreground">이번 주 전체 콘텐츠 조회수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
                    <HeartIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">9.2%</div>
                    <p className="text-xs text-muted-foreground">+0.8% 지난 주 대비</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 커뮤니티 활동 */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-muted-foreground">커뮤니티 활동</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">주간 댓글 수</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">462</div>
                    <p className="text-xs text-muted-foreground">이번 주 작성된 총 댓글 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">팬톡 활성도</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">주간 팬톡 메시지 수</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* 실시간 활동 - 동일한 구조 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">실시간 활동</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 팬 가입</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">3명</div>
                  <p className="text-xs text-muted-foreground">실시간으로 새로 가입한 팬 알림 표시(최근7일)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 펀딩</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">₩ 45,000</div>
                  <p className="text-xs text-muted-foreground">실시간 펀딩 알림(최근7일)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">댓글 및 반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">28개</div>
                  <p className="text-xs text-muted-foreground">새로운 댓글, 좋아요 등의 반응 알림(최근7일)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 업그레이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">5명</div>
                  <p className="text-xs text-muted-foreground">팬이 멤버십 등급을 올린 경우 알림(최근7일)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 빠른 실행 - 동일한 구조 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">빠른 실행</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* 새 콘텐츠 업로드 */}
              <Link href="/content">
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <UploadIcon className="h-8 w-8 mb-2 text-orange-500" />
                    <h3 className="font-medium">새 콘텐츠 업로드</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 업로드 페이지로 이동</p>
                  </CardContent>
                </Card>
              </Link>

              {/* 공지사항 작성 */}
              <Dialog open={noticeOpen} onOpenChange={setNoticeOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <BellIcon className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">공지사항 작성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 공지사항 작성 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>공지사항 작성</DialogTitle>
                    <DialogDescription>팬들에게 전달할 공지사항을 작성하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-title">제목</Label>
                      <Input id="notice-title" placeholder="공지사항 제목을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-type">내용 유형</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="내용 유형을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">텍스트</SelectItem>
                          <SelectItem value="poll">설문</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-content">내용</Label>
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
                          id="notice-content"
                          placeholder="공지사항 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNoticeOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setNoticeOpen(false)}>
                      저장
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 팬에게 메시지 */}
              <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <MailIcon className="h-8 w-8 mb-2 text-green-500" />
                      <h3 className="font-medium">팬에게 메시지</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 메시지 보내기 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>팬에게 메시지 보내기</DialogTitle>
                    <DialogDescription>팬들에게 개별 또는 그룹 메시지를 보내세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>대상 선택</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-fans" />
                          <Label htmlFor="all-fans">전체 팬</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vip-fans" />
                          <Label htmlFor="vip-fans">VIP 멤버십</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-fans" />
                          <Label htmlFor="premium-fans">프리미엄 멤버십</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-content">메시지 내용</Label>
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
                          id="message-content"
                          placeholder="메시지 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setMessageOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setMessageOpen(false)}>
                      보내기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 이벤트 생성 */}
              <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CalendarIcon className="h-8 w-8 mb-2 text-purple-500" />
                      <h3 className="font-medium">이벤트 생성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 이벤트 생성 모달</p>
                    </CardContent>
                  </Card>
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
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          {/* 핵심 지표 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">핵심 지표</h2>

            {/* 팬 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">팬 현황</h3>
                <Link
                  href="/analytics?tab=fans"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">총 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">+15% 지난 달 대비</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">신규 팬</CardTitle>
                    <UsersIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">642</div>
                    <p className="text-xs text-muted-foreground">이번 달 신규 가입</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">멤버십 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">+18% 지난 달 대비</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 수익 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">수익 현황</h3>
                <Link
                  href="/analytics?tab=revenue"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">이번 달 총 수익</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₩ 2,450,000</div>
                    <p className="text-xs text-muted-foreground">당월 발생한 모든 수익의 합계</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">전월 대비 증감률</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">+22%</div>
                    <p className="text-xs text-muted-foreground">지난 달 대비 수익 증가/감소 비율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 콘텐츠 성과 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">콘텐츠 성과</h3>
                <Link
                  href="/analytics?tab=content"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">월간 조회수</CardTitle>
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground">이번 달 전체 콘텐츠 조회수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
                    <HeartIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.4%</div>
                    <p className="text-xs text-muted-foreground">+1.2% 지난 달 대비</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 커뮤니티 활동 */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-muted-foreground">커뮤니티 활동</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">월간 댓글 수</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,847</div>
                    <p className="text-xs text-muted-foreground">이번 달 작성된 총 댓글 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">팬톡 활성도</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">356</div>
                    <p className="text-xs text-muted-foreground">월간 팬톡 메시지 수</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* 실시간 활동 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">실시간 활동</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 팬 가입</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">3명</div>
                  <p className="text-xs text-muted-foreground">실시간으로 새로 가입한 팬 알림 표시(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 펀딩</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">₩ 45,000</div>
                  <p className="text-xs text-muted-foreground">실시간 펀딩 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">댓글 및 반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">28개</div>
                  <p className="text-xs text-muted-foreground">새로운 댓글, 좋아요 등의 반응 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 업그레이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">5명</div>
                  <p className="text-xs text-muted-foreground">팬이 멤버십 등급을 올린 경우 알림(최근7일)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 빠른 실행 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">빠른 실행</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* 새 콘텐츠 업로드 */}
              <Link href="/content">
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <UploadIcon className="h-8 w-8 mb-2 text-orange-500" />
                    <h3 className="font-medium">새 콘텐츠 업로드</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 업로드 페이지로 이동</p>
                  </CardContent>
                </Card>
              </Link>

              {/* 공지사항 작성 */}
              <Dialog open={noticeOpen} onOpenChange={setNoticeOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <BellIcon className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">공지사항 작성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 공지사항 작성 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>공지사항 작성</DialogTitle>
                    <DialogDescription>팬들에게 전달할 공지사항을 작성하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-title">제목</Label>
                      <Input id="notice-title" placeholder="공지사항 제목을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-type">내용 유형</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="내용 유형을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">텍스트</SelectItem>
                          <SelectItem value="poll">설문</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-content">내용</Label>
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
                          id="notice-content"
                          placeholder="공지사항 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNoticeOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setNoticeOpen(false)}>
                      저장
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 팬에게 메시지 */}
              <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <MailIcon className="h-8 w-8 mb-2 text-green-500" />
                      <h3 className="font-medium">팬에게 메시지</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 메시지 보내기 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>팬에게 메시지 보내기</DialogTitle>
                    <DialogDescription>팬들에게 개별 또는 그룹 메시지를 보내세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>대상 선택</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-fans" />
                          <Label htmlFor="all-fans">전체 팬</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vip-fans" />
                          <Label htmlFor="vip-fans">VIP 멤버십</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-fans" />
                          <Label htmlFor="premium-fans">프리미엄 멤버십</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-content">메시지 내용</Label>
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
                          id="message-content"
                          placeholder="메시지 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setMessageOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setMessageOpen(false)}>
                      보내기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 이벤트 생성 */}
              <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CalendarIcon className="h-8 w-8 mb-2 text-purple-500" />
                      <h3 className="font-medium">이벤트 생성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 이벤트 생성 모달</p>
                    </CardContent>
                  </Card>
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
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">기간 직접 설정</h2>
            <Dialog open={customDateOpen} onOpenChange={setCustomDateOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">기간 설정</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>기간 직접 설정</DialogTitle>
                  <DialogDescription>조회할 기간을 선택하세요.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">시작일</Label>
                    <Input
                      id="start-date"
                      type="date"
                      defaultValue={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">종료일</Label>
                    <Input id="end-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setCustomDateOpen(false)}>
                    취소
                  </Button>
                  <Button type="submit" onClick={() => setCustomDateOpen(false)}>
                    조회
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* 핵심 지표 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">핵심 지표</h2>

            {/* 팬 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">팬 현황</h3>
                <Link
                  href="/analytics?tab=fans"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">총 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,284</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 팬 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">신규 팬</CardTitle>
                    <UsersIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 신규 가입</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">멤버십 팬 수</CardTitle>
                    <UsersIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 멤버십 팬</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 수익 현황 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">수익 현황</h3>
                <Link
                  href="/analytics?tab=revenue"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">기간 내 총 수익</CardTitle>
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₩ 1,850,000</div>
                    <p className="text-xs text-muted-foreground">선택 기간 발생한 모든 수익의 합계</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">일평균 수익</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₩ 61,667</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 일평균 수익</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 콘텐츠 성과 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-muted-foreground">콘텐츠 성과</h3>
                <Link
                  href="/analytics?tab=content"
                  className="flex items-center text-sm text-blue-500 hover:text-blue-600"
                >
                  자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">기간 내 조회수</CardTitle>
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32,456</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 전체 콘텐츠 조회수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">평균 참여율</CardTitle>
                    <HeartIcon className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.8%</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 평균 참여율</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 커뮤니티 활동 */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3 text-muted-foreground">커뮤니티 활동</h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">기간 내 댓글 수</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 작성된 총 댓글 수</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">팬톡 활성도</CardTitle>
                    <MessageCircleIcon className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">267</div>
                    <p className="text-xs text-muted-foreground">선택 기간 내 팬톡 메시지 수</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* 실시간 활동 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">실시간 활동</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 팬 가입</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">3명</div>
                  <p className="text-xs text-muted-foreground">실시간으로 새로 가입한 팬 알림 표시(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">새로운 펀딩</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">₩ 45,000</div>
                  <p className="text-xs text-muted-foreground">실시간 펀딩 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">댓글 및 반응</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">28개</div>
                  <p className="text-xs text-muted-foreground">새로운 댓글, 좋아요 등의 반응 알림(최근7일)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 업그레이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">5명</div>
                  <p className="text-xs text-muted-foreground">팬이 멤버십 등급을 올린 경우 알림(최근7일)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 빠른 실행 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">빠른 실행</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* 새 콘텐츠 업로드 */}
              <Link href="/content">
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <UploadIcon className="h-8 w-8 mb-2 text-orange-500" />
                    <h3 className="font-medium">새 콘텐츠 업로드</h3>
                    <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 업로드 페이지로 이동</p>
                  </CardContent>
                </Card>
              </Link>

              {/* 공지사항 작성 */}
              <Dialog open={noticeOpen} onOpenChange={setNoticeOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <BellIcon className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="font-medium">공지사항 작성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 공지사항 작성 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>공지사항 작성</DialogTitle>
                    <DialogDescription>팬들에게 전달할 공지사항을 작성하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-title">제목</Label>
                      <Input id="notice-title" placeholder="공지사항 제목을 입력하세요" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-type">내용 유형</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="내용 유형을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">텍스트</SelectItem>
                          <SelectItem value="poll">설문</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-content">내용</Label>
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
                          id="notice-content"
                          placeholder="공지사항 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setNoticeOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setNoticeOpen(false)}>
                      저장
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 팬에게 메시지 */}
              <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <MailIcon className="h-8 w-8 mb-2 text-green-500" />
                      <h3 className="font-medium">팬에게 메시지</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 메시지 보내기 모달</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>팬에게 메시지 보내기</DialogTitle>
                    <DialogDescription>팬들에게 개별 또는 그룹 메시지를 보내세요.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>대상 선택</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all-fans" />
                          <Label htmlFor="all-fans">전체 팬</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vip-fans" />
                          <Label htmlFor="vip-fans">VIP 멤버십</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-fans" />
                          <Label htmlFor="premium-fans">프리미엄 멤버십</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message-content">메시지 내용</Label>
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
                          id="message-content"
                          placeholder="메시지 내용을 입력하세요"
                          className="min-h-[150px] border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setMessageOpen(false)}>
                      취소
                    </Button>
                    <Button type="submit" onClick={() => setMessageOpen(false)}>
                      보내기
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* 이벤트 생성 */}
              <Dialog open={eventOpen} onOpenChange={setEventOpen}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CalendarIcon className="h-8 w-8 mb-2 text-purple-500" />
                      <h3 className="font-medium">이벤트 생성</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">클릭 시 이벤트 생성 모달</p>
                    </CardContent>
                  </Card>
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
          </div>
        </TabsContent>
      </Tabs>

      {/* 차트 및 그래프 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">차트 및 그래프</h2>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>팬 증가 추이</CardTitle>
              <CardDescription>기간별 팬 증가 추이를 그래프로 표시</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <DashboardChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>수익 트렌드</CardTitle>
              <CardDescription>시간대별 수익의 변화를 차트로 시각화</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 성과 비교</CardTitle>
              <CardDescription>최근 올린 콘텐츠의 조회수, 좋아요수, 댓글수 비교</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentComparisonChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>멤버십 전환율</CardTitle>
              <CardDescription>무료 팬이 유료 멤버십으로 전환하는 비율 (월별)</CardDescription>
            </CardHeader>
            <CardContent>
              <MembershipConversionChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
