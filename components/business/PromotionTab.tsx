"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import DiscountCodeModal from "@/components/business-modals/DiscountCodeModal"
import EventDiscountModal from "@/components/business-modals/EventDiscountModal"

export default function PromotionTab() {
  const [discountCodeModalOpen, setDiscountCodeModalOpen] = useState(false)
  const [eventDiscountModalOpen, setEventDiscountModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* 프로모션 현황 요약 */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">활성 할인 코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8개</div>
            <p className="text-xs text-muted-foreground">현재 사용 가능</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">이번 달 사용량</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156회</div>
            <p className="text-xs text-muted-foreground">전월 대비 +23%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">할인 매출 손실</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩ 89,000</div>
            <p className="text-xs text-muted-foreground">총 매출의 3.2%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">할인 전환율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">업계 평균 대비 높음</p>
          </CardContent>
        </Card>
      </div>

      {/* 할인 코드 관리 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>할인 코드 관리</CardTitle>
            <CardDescription>할인 코드 생성 및 관리</CardDescription>
          </div>
          <Button onClick={() => setDiscountCodeModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 할인 코드
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 테이블 헤더 */}
            <div className="grid grid-cols-6 gap-4 p-3 bg-muted rounded-lg text-sm font-medium">
              <div>코드명</div>
              <div>할인</div>
              <div>사용 횟수</div>
              <div>유효 기간</div>
              <div>상태</div>
              <div>관리</div>
            </div>
            
            {/* 할인 코드 목록 */}
            <div className="space-y-2">
              <div className="grid grid-cols-6 gap-4 p-3 border rounded-lg items-center">
                <div className="font-medium">WELCOME2024</div>
                <div>20%</div>
                <div>45/100</div>
                <div className="text-sm">2024.12.31까지</div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit">활성</div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">수정</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">삭제</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-3 border rounded-lg items-center">
                <div className="font-medium">FIRST10</div>
                <div>₩10,000</div>
                <div>23/50</div>
                <div className="text-sm">2025.01.15까지</div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit">활성</div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">수정</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">삭제</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4 p-3 border rounded-lg items-center">
                <div className="font-medium">SUMMER2024</div>
                <div>15%</div>
                <div>100/100</div>
                <div className="text-sm">2024.08.31까지</div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded w-fit">만료</div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" disabled>수정</Button>
                  <Button variant="ghost" size="sm" className="text-red-600">삭제</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 이벤트 할인 관리 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>이벤트 할인 관리</CardTitle>
            <CardDescription>기간 한정 특별 할인</CardDescription>
          </div>
          <Button onClick={() => setEventDiscountModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 이벤트 할인
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">신년 특가 이벤트</h4>
                  <p className="text-sm text-muted-foreground">모든 상품 30% 할인</p>
                </div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">진행중</div>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                2024.12.25 - 2025.01.05
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">수정</Button>
                <Button variant="outline" size="sm" className="text-red-600">종료</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">VIP 회원 특별 할인</h4>
                  <p className="text-sm text-muted-foreground">VIP 멤버십 20% 할인</p>
                </div>
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">예정</div>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                2025.01.10 - 2025.01.20
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">수정</Button>
                <Button variant="outline" size="sm" className="text-red-600">취소</Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">블랙프라이데이</h4>
                  <p className="text-sm text-muted-foreground">전 상품 50% 할인</p>
                </div>
                <div className="text-xs bg-gray-100 px-2 py-1 rounded">종료</div>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                2024.11.25 - 2024.11.30
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>수정</Button>
                <Button variant="outline" size="sm" className="text-red-600">삭제</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 사용 통계 및 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 통계 및 분석</CardTitle>
          <CardDescription>할인 코드별 사용 현황과 효과 분석</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">코드별 사용 현황</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">WELCOME2024</div>
                    <div className="text-sm text-muted-foreground">20% 할인</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">45회 사용</div>
                    <div className="text-sm text-muted-foreground">₩18,000 할인</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">FIRST10</div>
                    <div className="text-sm text-muted-foreground">₩10,000 할인</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">23회 사용</div>
                    <div className="text-sm text-muted-foreground">₩230,000 할인</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">기간별 할인 효과</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">이번 주</div>
                    <div className="text-sm text-muted-foreground">할인 적용 주문</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">34건</div>
                    <div className="text-sm text-green-600">+15% ↑</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">이번 달</div>
                    <div className="text-sm text-muted-foreground">전환율 증가</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">12.4%</div>
                    <div className="text-sm text-green-600">+3.2% ↑</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DiscountCodeModal
        open={discountCodeModalOpen}
        onOpenChange={setDiscountCodeModalOpen}
      />

      <EventDiscountModal
        open={eventDiscountModalOpen}
        onOpenChange={setEventDiscountModalOpen}
      />
    </div>
  )
}