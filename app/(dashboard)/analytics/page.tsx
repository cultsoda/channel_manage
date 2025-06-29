"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Trophy,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  Target,
  DollarSign,
  CreditCard,
  Package,
  Gift,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { 
  FanTrendChart, 
  MembershipPieChart, 
  RegionChart, 
  AccessTimeChart, 
  ContentPerformanceChart, 
  RevenuePieChart, 
  RevenueMonthlyChart 
} from "@/components/analytics-charts"


export default function AnalyticsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("fans")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["fans", "content", "revenue"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">분석</h1>
        <p className="text-muted-foreground">채널의 상세한 분석 데이터를 확인하세요.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="fans">팬 분석</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 분석</TabsTrigger>
          <TabsTrigger value="revenue">수익 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="fans" className="space-y-6">
          {/* 팬 현황 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">팬 현황</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 팬 수 추이</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">일별/주별/월별 팬 수 증가 추이 분석</p>
                  <div className="mt-2">
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">+68% 이번 달</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">신규/기존 팬 비율</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342 / 942</div>
                  <p className="text-xs text-muted-foreground">신규 팬과 기존 팬의 비율 및 변화 추이</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">신규 27%</Badge>
                    <Badge variant="outline">기존 73%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">팬 이탈률 분석</CardTitle>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">팬이 구독을 해지하는 비율 및 이유 분석</p>
                  <div className="mt-2">
                    <Progress value={32} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">-1.2% 지난 달 대비</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">재방문율 통계</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.5%</div>
                  <p className="text-xs text-muted-foreground">팬들이 채널에 재방문하는 빈도 분석</p>
                  <div className="mt-2">
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">주간 평균</p>
                  </div>
                </CardContent>
              </Card>
              // 팬 현황 4개 카드 다음에 추가
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>팬 수 추이</CardTitle>
                </CardHeader>
                <CardContent>
                  <FanTrendChart />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 팬 분포 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">팬 분포</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* 멤버십 등급별 분포 - 차트로 교체 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 등급별 분포</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <MembershipPieChart />
                </CardContent>
              </Card>

              {/* 지역별 팬 분포 - 차트로 교체 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">지역별 팬 분포</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <RegionChart />
                </CardContent>
              </Card>

              {/* 연령/성별 통계 - 기존 그대로 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">연령/성별 통계</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>10-19세</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>20-29세</span>
                      <span>42%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>30-39세</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>40세 이상</span>
                      <span>15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 디바이스별 접속 현황 - 기존 그대로 */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">디바이스별 접속 현황</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        모바일
                      </span>
                      <span>58%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Monitor className="h-3 w-3" />
                        PC
                      </span>
                      <span>32%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>태블릿</span>
                      <span>7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HMD</span>
                      <span>3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 팬 행동 패턴 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">팬 행동 패턴</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">접속 시간대 분석</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">20:00-22:00</div>
                  <p className="text-xs text-muted-foreground">팬들이 주로 접속하는 시간대 분석</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>피크 시간</span>
                      <span>21:30</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>최고 동접</span>
                      <span>456명</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">평균 체류시간</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12분 34초</div>
                  <p className="text-xs text-muted-foreground">팬들이 채널에 머무는 평균 시간</p>
                  <div className="mt-2">
                    <Progress value={76} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">+2분 지난 주 대비</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">페이지 이동 경로</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>홈 → 콘텐츠</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>홈 → 커뮤니티</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>콘텐츠 → 멤버십</span>
                      <span>18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>기타</span>
                      <span>9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">선호 콘텐츠 타입</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VR 콘텐츠</span>
                      <span>38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>라이브 스트림</span>
                      <span>29%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일반 영상</span>
                      <span>22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>오디오</span>
                      <span>11%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* 콘텐츠 성과 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">콘텐츠 성과</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">조회수/좋아요 통계</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground">콘텐츠별 조회수, 좋아요 수 통계</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>총 좋아요</span>
                      <span>3,847</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>좋아요율</span>
                      <span>8.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">댓글 및 공유 분석</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,847</div>
                  <p className="text-xs text-muted-foreground">댓글 수, 공유 횟수 등 참여도 분석</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>공유 수</span>
                      <span>234</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>참여율</span>
                      <span>4.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">콘텐츠 완주율</CardTitle>
                  <Play className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">67.3%</div>
                  <p className="text-xs text-muted-foreground">영상/오디오 콘텐츠의 완료 시청률</p>
                  <div className="mt-2">
                    <Progress value={67} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">평균 시청 시간 8분 12초</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">인기 콘텐츠 랭킹</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>1. VR 팬미팅 하이라이트</span>
                      <span>8.9K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2. 단건구매의 왕버섯</span>
                      <span>6.2K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3. butterfly 복사본</span>
                      <span>4.8K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4. 새우깡의 감패기</span>
                      <span>3.1K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* XR 콘텐츠 특화 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">XR 콘텐츠 특화</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">XR 체험 시간 분석</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18분 45초</div>
                  <p className="text-xs text-muted-foreground">VR/AR 콘텐츠의 평균 체험 시간</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>VR 콘텐츠</span>
                      <span>22분 12초</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>AR 콘텐츠</span>
                      <span>15분 18초</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>360도 영상</span>
                      <span>12분 34초</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">XR 디바이스별 성과</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Oculus Quest</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>HTC Vive</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>PlayStation VR</span>
                        <span>18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>기타</span>
                        <span>9%</span>
                      </div>
                      <Progress value={9} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 콘텐츠 트렌드 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">콘텐츠 트렌드</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">시간대별 업로드 최적화</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">19:00</div>
                  <p className="text-xs text-muted-foreground">최적의 콘텐츠 업로드 시간대 분석</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>최고 조회율</span>
                      <span>19:00-21:00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>참여율</span>
                      <span>+34%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">카테고리별 성과 비교</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VR 체험</span>
                      <Badge>9.2점</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>라이브 스트림</span>
                      <Badge variant="secondary">8.7점</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>일반 영상</span>
                      <Badge variant="outline">7.8점</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>오디오</span>
                      <Badge variant="outline">7.2점</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">플레이리스트별 성과 비교</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VR 시리즈</span>
                      <span>92.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>일상 브이로그</span>
                      <span>78.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>팬미팅 하이라이트</span>
                      <span>85.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Q&A 세션</span>
                      <span>71.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">해시태그 효과성</CardTitle>
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>#VR</span>
                      <span className="text-green-600">+34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>#라이브</span>
                      <span className="text-green-600">+28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>#팬미팅</span>
                      <span className="text-green-600">+22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>#XROMEDA</span>
                      <span className="text-green-600">+18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* 수익 현황 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">수익 현황</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">총 수익 및 트렌드</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₩ 2,450,000</div>
                  <p className="text-xs text-muted-foreground">전체 수익과 시간별 변화 추이</p>
                  <div className="mt-2">
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">+22% 지난 달 대비</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">수익원별 분석</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>멤버십</span>
                      <span>68.6%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>단건구매</span>
                      <span>22.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>후원</span>
                      <span>8.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">멤버십/단건구매/후원/굿즈 별 수익 분석</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">월별/일별 수익 추이</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₩ 81,667</div>
                  <p className="text-xs text-muted-foreground">일평균 수익</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>이번 달</span>
                      <span>₩ 2,450,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>지난 달</span>
                      <span>₩ 2,008,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">수익 예측 모델</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₩ 2,940,000</div>
                  <p className="text-xs text-muted-foreground">AI 기반 다음 달 수익 예측</p>
                  <div className="mt-2">
                    <Progress value={87} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">신뢰도 87.3%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 멤버십 분석 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">멤버십 분석</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">등급별 수익 기여도</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VIP</span>
                      <span>45.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>프리미엄</span>
                      <span>38.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>베이직</span>
                      <span>16.1%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">각 멤버십 등급이 전체 수익에 기여하는 비율</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">멤버십 전환율</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.4%</div>
                  <p className="text-xs text-muted-foreground">무료 팬이 유료 멤버십으로 전환하는 비율</p>
                  <div className="mt-2">
                    <Progress value={12.4} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">목표 15% 대비 82.7%</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">이탈률 및 갱신율</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>월간 이탈률</span>
                      <span className="text-red-600">3.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>갱신율</span>
                      <span className="text-green-600">89.7%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">멤버십 해지율과 갱신율 추적</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">LTV (고객 생애 가치)</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₩ 284,000</div>
                  <p className="text-xs text-muted-foreground">팬 1명이 가져다주는 평생 수익 계산</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>VIP</span>
                      <span>₩ 450,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>프리미엄</span>
                      <span>₩ 280,000</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>베이직</span>
                      <span>₩ 120,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 상품 분석 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">상품 분석</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">베스트셀러 콘텐츠</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>1. 단건구매의 왕버섯</span>
                      <Badge>₩45K</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>2. butterfly 복사본</span>
                      <Badge variant="secondary">₩32K</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>3. 새우깡의 감패기</span>
                      <Badge variant="outline">₩28K</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">가장 많이 팔린 콘텐츠 순위</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">가격대별 판매 성과</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>₩1-10K</span>
                      <span>45.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>₩10-30K</span>
                      <span>38.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>₩30K+</span>
                      <span>16.1%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">가격 구간별 판매 실적 분석</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">할인/프로모션 효과</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+156%</div>
                  <p className="text-xs text-muted-foreground">할인 이벤트의 매출 증대 효과 측정</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>20% 할인</span>
                      <span>+89%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>30% 할인</span>
                      <span>+156%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">번들 상품 성과</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VR 패키지</span>
                      <span>₩450K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>스페셜 에디션</span>
                      <span>₩280K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>베이직 번들</span>
                      <span>₩120K</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">패키지 상품의 판매 성과 분석</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">후원 현황</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₩ 210,000</div>
                  <p className="text-xs text-muted-foreground">후원 금액 집계</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>총 후원자</span>
                      <span>47명</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>평균 후원액</span>
                      <span>₩4,468</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>이번 달 증가</span>
                      <span className="text-green-600">+23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
