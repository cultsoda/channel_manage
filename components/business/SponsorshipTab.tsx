"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import SponsorshipGradeModal from "@/components/business-modals/SponsorshipGradeModal"
import SponsorListModal from "@/components/business-modals/SponsorListModal"

export default function SponsorshipTab() {
  const [sponsorshipGradeModalOpen, setSponsorshipGradeModalOpen] = useState(false)
  const [sponsorListModalOpen, setSponsorListModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* 후원 현황 요약 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">이번 달 후원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 320,000</div>
            <p className="text-xs text-muted-foreground">47명이 후원</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">목표 달성률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64%</div>
            <p className="text-xs text-muted-foreground">₩ 180,000 남음</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">평균 후원액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 6,809</div>
            <p className="text-xs text-muted-foreground">전월 대비 +12%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">신규 후원자</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12명</div>
            <p className="text-xs text-muted-foreground">이번 달 신규</p>
          </CardContent>
        </Card>
      </div>

      {/* 후원 관리 메뉴 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">후원 설정</CardTitle>
            <CardDescription>후원 금액 범위와 리워드를 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min-amount">최소 금액</Label>
                <Input id="min-amount" placeholder="1,000" defaultValue="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-amount">최대 금액</Label>
                <Input id="max-amount" placeholder="1,000,000" defaultValue="1000000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>후원자 혜택</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="community-priority" defaultChecked />
                  <Label htmlFor="community-priority" className="text-sm">커뮤니티 우선 참여</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="event-priority" defaultChecked />
                  <Label htmlFor="event-priority" className="text-sm">이벤트 우선 참여</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="anonymous-support" defaultChecked />
                  <Label htmlFor="anonymous-support" className="text-sm">익명 후원 허용</Label>
                </div>
              </div>
            </div>
            
            <Button className="w-full">설정 저장</Button>
          </CardContent>
        </Card>

        {/* 후원 등급 시스템 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">후원 등급 시스템</CardTitle>
            <CardDescription>후원 금액별 등급과 혜택을 설정하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="font-medium">플래티넘</span>
                  </div>
                  <span className="text-sm text-muted-foreground">₩300,000 이상</span>
                </div>
                <div className="text-xs text-muted-foreground">서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠, 연간 팬미팅 우선 초대, 개인 감사 영상 메시지</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="font-medium">골드</span>
                  </div>
                  <span className="text-sm text-muted-foreground">₩100,000 이상</span>
                </div>
                <div className="text-xs text-muted-foreground">서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠, 연간 팬미팅 우선 초대</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-medium">실버</span>
                  </div>
                  <span className="text-sm text-muted-foreground">₩50,000 이상</span>
                </div>
                <div className="text-xs text-muted-foreground">서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="font-medium">브론즈</span>
                  </div>
                  <span className="text-sm text-muted-foreground">₩10,000 이상</span>
                </div>
                <div className="text-xs text-muted-foreground">서포터 전용 배지, 월간 소식지 구독</div>
              </div>
            </div>
            
            <Button className="w-full" onClick={() => setSponsorshipGradeModalOpen(true)}>
              등급 설정 수정
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">후원 목표</CardTitle>
            <CardDescription>이번 달 후원 목표 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-goal">월 목표 금액</Label>
              <Input id="monthly-goal" placeholder="500,000" defaultValue="500000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal-description">목표 설명</Label>
              <Input id="goal-description" placeholder="새 장비 구입을 위한 후원" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>현재 진행률</span>
                <span className="font-medium">64%</span>
              </div>
              <Progress value={64} className="h-2" />
              <div className="text-sm text-muted-foreground">₩ 320,000 / ₩ 500,000</div>
            </div>
            
            <Button className="w-full">목표 수정</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">감사 메시지</CardTitle>
            <CardDescription>후원자에게 보낼 메시지 관리</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>자동 감사 메시지</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-thanks" defaultChecked />
                <Label htmlFor="auto-thanks" className="text-sm">후원 시 자동 발송</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thanks-message">메시지 내용</Label>
              <textarea 
                id="thanks-message" 
                className="w-full p-2 text-sm border rounded-md min-h-[80px]"
                placeholder="후원해주셔서 감사합니다..."
                defaultValue="소중한 후원 감사드립니다! 더 좋은 콘텐츠로 보답하겠습니다."
              />
            </div>
            
            <Button className="w-full">메시지 설정</Button>
          </CardContent>
        </Card>
      </div>

      {/* 후원자 목록 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>후원자 관리</CardTitle>
            <CardDescription>최근 후원 내역 및 후원자 정보</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSponsorListModalOpen(true)}>전체 보기</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">김</span>
                </div>
                <div>
                  <div className="font-medium">김후원</div>
                  <div className="text-sm text-muted-foreground">2024.12.28 • 3번째 후원</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">₩ 50,000</div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block">공개</div>
                </div>
                <Button variant="ghost" size="sm">메시지</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">익</span>
                </div>
                <div>
                  <div className="font-medium">익명</div>
                  <div className="text-sm text-muted-foreground">2024.12.27 • 1번째 후원</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">₩ 10,000</div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded inline-block">익명</div>
                </div>
                <Button variant="ghost" size="sm" disabled>메시지</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">박</span>
                </div>
                <div>
                  <div className="font-medium">박팬</div>
                  <div className="text-sm text-muted-foreground">2024.12.26 • 7번째 후원</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">₩ 25,000</div>
                  <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded inline-block">VIP</div>
                </div>
                <Button variant="ghost" size="sm">메시지</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SponsorshipGradeModal
        open={sponsorshipGradeModalOpen}
        onOpenChange={setSponsorshipGradeModalOpen}
      />

      <SponsorListModal
        open={sponsorListModalOpen}
        onOpenChange={setSponsorListModalOpen}
      />
    </div>
  )
}