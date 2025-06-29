"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { allContent } from "@/data/contentData"



export default function BusinessPage() {
  const [membershipModalOpen, setMembershipModalOpen] = useState(false)
  const [editingMembership, setEditingMembership] = useState<any>(null)
  const [isNewMembership, setIsNewMembership] = useState(false)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [productModalType, setProductModalType] = useState<'single' | 'bundle' | 'vrook' | 'xr-fanmeeting' | null>(null)
  const [selectedContent, setSelectedContent] = useState<any[]>([])

  const memberships = [
    {
      id: 1,
      name: "베이직",
      description: "기본 멤버십",
      price: 9900,
      features: ["기본 콘텐츠 접근", "커뮤니티 참여", "월 2회 라이브 참여"],
    },
    {
      id: 2,
      name: "스탠다드",
      description: "인기 멤버십",
      price: 19900,
      features: ["모든 콘텐츠 접근", "독점 콘텐츠", "무제한 라이브 참여", "월 1회 VR 팬미팅"],
    },
    {
      id: 3,
      name: "프리미엄",
      description: "최고급 멤버십",
      price: 39900,
      features: ["모든 혜택 포함", "1:1 VR 미팅", "굿즈 할인", "우선 예약"],
    },
  ]
  const availableContent = allContent.map(content => ({
    id: content.id,
    title: content.title,
    type: content.type,
    views: content.views,
    price: content.membership.startsWith('₩') ? parseInt(content.membership.replace(/[₩,\s]/g, '')) : null,
    thumbnail: content.thumbnail,
    category: content.category
  }))

  const singleProducts = availableContent.filter(content => content.price !== null)

  const handleProductModal = (type: 'single' | 'bundle' | 'vrook' | 'xr-fanmeeting') => {
    setProductModalType(type)
    setProductModalOpen(true)
    setSelectedContent([])
  }
  const handleEditMembership = (membership: any) => {
    setEditingMembership(membership)
    setIsNewMembership(false)
    setMembershipModalOpen(true)
  }

  const handleNewMembership = () => {
    setEditingMembership({
      name: "",
      description: "",
      price: "",
      features: [],
    })
    setIsNewMembership(true)
    setMembershipModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">비즈니스 모델</h1>
        <p className="text-muted-foreground">멤버십, 상품, 후원 시스템을 관리하세요.</p>
      </div>

      <Tabs defaultValue="membership" className="space-y-4">
        <TabsList>
          <TabsTrigger value="membership">멤버십 관리</TabsTrigger>
          <TabsTrigger value="products">상품 관리</TabsTrigger>
          <TabsTrigger value="sponsorship">후원 시스템</TabsTrigger>
          <TabsTrigger value="promotion">프로모션</TabsTrigger>
        </TabsList>

        <TabsContent value="membership" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">멤버십 등급 설정</h3>
              <p className="text-sm text-muted-foreground">다양한 멤버십 등급을 설정하고 관리하세요.</p>
            </div>
            <Button onClick={handleNewMembership} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />새 멤버십 등급 추가
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {memberships.map((membership) => (
              <Card key={membership.id} className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">{membership.name}</CardTitle>
                  <CardDescription>{membership.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">₩ {membership.price.toLocaleString()}/월</div>
                  <ul className="space-y-1 text-sm">
                    {membership.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleEditMembership(membership)}
                  >
                    설정 수정
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={membershipModalOpen} onOpenChange={setMembershipModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isNewMembership ? "새 멤버십 등급" : "멤버십 설정 수정"}</DialogTitle>
                <DialogDescription>멤버십 정보를 입력하고 권한을 설정하세요.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="membership-name">멤버십 명</Label>
                  <Input
                    id="membership-name"
                    defaultValue={editingMembership?.name || ""}
                    placeholder="멤버십 이름을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membership-image">멤버십 이미지</Label>
                  <Input id="membership-image" type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membership-price">멤버십 금액</Label>
                  <Input
                    id="membership-price"
                    type="number"
                    defaultValue={editingMembership?.price || ""}
                    placeholder="월 구독료를 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label>멤버십 권한 설정</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="basic-content" />
                      <Label htmlFor="basic-content">기본 콘텐츠 접근</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-content" />
                      <Label htmlFor="premium-content">프리미엄 콘텐츠 접근</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="community-access" />
                      <Label htmlFor="community-access">커뮤니티 참여</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="live-access" />
                      <Label htmlFor="live-access">라이브 참여</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vr-fanmeeting" />
                      <Label htmlFor="vr-fanmeeting">VR 팬미팅 참여</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exclusive-content" />
                      <Label htmlFor="exclusive-content">독점 콘텐츠</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="goods-discount" />
                      <Label htmlFor="goods-discount">굿즈 할인</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="priority-booking" />
                      <Label htmlFor="priority-booking">우선 예약</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setMembershipModalOpen(false)}>
                  저장
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
  {/* 상품 현황 요약 */}
  <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">단건 상품</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{singleProducts.length}개</div>
        <p className="text-xs text-muted-foreground">판매 중인 단건 상품</p>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">번들 상품</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3개</div>
        <p className="text-xs text-muted-foreground">활성 번들 상품</p>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">VROOK</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">2개</div>
        <p className="text-xs text-muted-foreground">제작 완료</p>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">XR 팬미팅</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1개</div>
        <p className="text-xs text-muted-foreground">예정된 팬미팅</p>
      </CardContent>
    </Card>
  </div>

  {/* 상품 관리 메뉴 */}
  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">단건 상품</CardTitle>
        <CardDescription className="text-sm">개별 콘텐츠 판매 설정</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-transparent"
          onClick={() => handleProductModal('single')}
        >
          상품 설정
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          판매 현황 보기
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">번들 상품</CardTitle>
        <CardDescription className="text-sm">여러 콘텐츠 패키지 구성</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-transparent"
          onClick={() => handleProductModal('bundle')}
        >
          번들 만들기
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          번들 관리
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">VROOK</CardTitle>
        <CardDescription className="text-sm">VROOK 제작 신청 및 관리</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-transparent"
          onClick={() => handleProductModal('vrook')}
        >
          제작 신청
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          진행 상황
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">XR 팬미팅</CardTitle>
        <CardDescription className="text-sm">XR 팬미팅 기획 및 제작</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-transparent"
          onClick={() => handleProductModal('xr-fanmeeting')}
        >
          팬미팅 신청
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          예약 현황
        </Button>
      </CardContent>
    </Card>
  </div>

  {/* 상품 설정 모달 */}
  <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {productModalType === 'single' && "단건 상품 설정"}
          {productModalType === 'bundle' && "번들 상품 만들기"}
          {productModalType === 'vrook' && "VROOK 제작 신청"}
          {productModalType === 'xr-fanmeeting' && "XR 팬미팅 신청"}
        </DialogTitle>
        <DialogDescription>
          {productModalType === 'single' && "판매할 콘텐츠를 선택하고 가격을 설정하세요."}
          {productModalType === 'bundle' && "패키지로 묶을 콘텐츠들을 선택하세요."}
          {productModalType === 'vrook' && "VROOK으로 제작할 콘텐츠와 설정을 입력하세요."}
          {productModalType === 'xr-fanmeeting' && "XR 팬미팅 기획안을 작성하세요."}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        {productModalType === 'single' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>콘텐츠 선택</Label>
              <div className="max-h-[300px] overflow-y-auto space-y-2 border rounded-lg p-4">
                {availableContent.map((content) => (
                  <div key={content.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                    <Checkbox 
                      checked={selectedContent.some(item => item.id === content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContent([...selectedContent, content])
                        } else {
                          setSelectedContent(selectedContent.filter(item => item.id !== content.id))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {content.type} • {content.views.toLocaleString()} 조회
                        {content.price && <span> • 현재 가격: ₩{content.price.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {selectedContent.length > 0 && (
              <div className="space-y-3">
                <Label>선택된 콘텐츠 가격 설정</Label>
                {selectedContent.map((content) => (
                  <div key={content.id} className="flex items-center space-x-3 p-2 border rounded">
                    <div className="flex-1">
                      <div className="font-medium">{content.title}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`price-${content.id}`}>₩</Label>
                      <Input 
                        id={`price-${content.id}`}
                        type="number" 
                        placeholder="가격"
                        defaultValue={content.price || ""}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {productModalType === 'bundle' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bundle-name">번들 이름</Label>
              <Input id="bundle-name" placeholder="번들 상품 이름을 입력하세요" />
            </div>
            
            <div className="space-y-2">
              <Label>포함할 콘텐츠 선택</Label>
              <div className="max-h-[200px] overflow-y-auto space-y-2 border rounded-lg p-4">
                {availableContent.map((content) => (
                  <div key={content.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                    <Checkbox 
                      checked={selectedContent.some(item => item.id === content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContent([...selectedContent, content])
                        } else {
                          setSelectedContent(selectedContent.filter(item => item.id !== content.id))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-muted-foreground">{content.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bundle-price">번들 가격</Label>
              <Input id="bundle-price" type="number" placeholder="번들 판매 가격" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bundle-discount">할인율</Label>
              <Input id="bundle-discount" type="number" placeholder="개별 구매 대비 할인율 (%)" />
            </div>
          </div>
        )}

        {productModalType === 'vrook' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vrook-title">VROOK 제목</Label>
              <Input id="vrook-title" placeholder="VROOK 제목을 입력하세요" />
            </div>
            
            <div className="space-y-2">
              <Label>기반 콘텐츠 선택</Label>
              <div className="max-h-[200px] overflow-y-auto space-y-2 border rounded-lg p-4">
                {availableContent.filter(content => content.type === 'VR 영상' || content.type === '360도 영상').map((content) => (
                  <div key={content.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded">
                    <Checkbox 
                      checked={selectedContent.some(item => item.id === content.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedContent([content])
                        } else {
                          setSelectedContent([])
                        }
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-muted-foreground">{content.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vrook-price">VROOK 판매가격</Label>
              <Input id="vrook-price" type="number" placeholder="VROOK 판매 가격" />
            </div>
          </div>
        )}

        {productModalType === 'xr-fanmeeting' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fanmeeting-title">팬미팅 제목</Label>
              <Input id="fanmeeting-title" placeholder="XR 팬미팅 제목을 입력하세요" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fanmeeting-date">예정 일시</Label>
              <Input id="fanmeeting-date" type="datetime-local" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fanmeeting-capacity">최대 참여 인원</Label>
              <Input id="fanmeeting-capacity" type="number" placeholder="최대 참여 가능 인원" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fanmeeting-price">참여 가격</Label>
              <Input id="fanmeeting-price" type="number" placeholder="XR 팬미팅 참여 가격" />
            </div>
          </div>
        )}
      </div>
      
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setProductModalOpen(false)}>
                취소
              </Button>
              <Button type="submit" onClick={() => setProductModalOpen(false)}>
                {productModalType === 'single' && "상품 등록"}
                {productModalType === 'bundle' && "번들 생성"}
                {productModalType === 'vrook' && "제작 신청"}
                {productModalType === 'xr-fanmeeting' && "팬미팅 신청"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

        <TabsContent value="sponsorship" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>후원 시스템 설정</CardTitle>
              <CardDescription>후원 금액 범위와 리워드를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="min-amount">최소 후원 금액</Label>
                  <Input id="min-amount" placeholder="1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-amount">최대 후원 금액</Label>
                  <Input id="max-amount" placeholder="1000000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-goal">월별 후원 목표</Label>
                <Input id="monthly-goal" placeholder="500000" />
              </div>

              <div className="space-y-4">
                <Label>후원자 리워드 설정</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="community-priority" />
                    <Label htmlFor="community-priority">커뮤니티 참여</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="event-priority" />
                    <Label htmlFor="event-priority">이벤트 우선 참여</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="membership-discount" />
                    <Label htmlFor="membership-discount">멤버십 할인</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anonymous-support" />
                    <Label htmlFor="anonymous-support">익명 후원 허용</Label>
                  </div>
                </div>
              </div>

              <Button>설정 저장</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>후원 목표 진행률</CardTitle>
              <CardDescription>이번 달 후원 목표 달성 현황</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>현재 후원 금액</span>
                <span className="font-medium">₩ 320,000 / ₩ 500,000</span>
              </div>
              <Progress value={64} className="h-2" />
              <div className="text-sm text-muted-foreground">목표까지 ₩ 180,000 남음 (64% 달성)</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>후원자 목록</CardTitle>
              <CardDescription>최근 후원 내역을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">김후원</div>
                    <div className="text-sm text-muted-foreground">2024.12.28</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₩ 50,000</div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">공개</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>프로모션 관리</CardTitle>
              <CardDescription>할인 코드와 이벤트 할인을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">할인 코드</CardTitle>
                    <CardDescription className="text-sm">할인 코드 생성 및 관리</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      관리
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">이벤트 할인</CardTitle>
                    <CardDescription className="text-sm">기간 한정 특별 할인</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      관리
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
