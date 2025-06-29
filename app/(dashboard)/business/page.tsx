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
  const [sponsorshipGradeModalOpen, setSponsorshipGradeModalOpen] = useState(false)
  const [sponsorListModalOpen, setSponsorListModalOpen] = useState(false)


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
        <p className="text-muted-foreground">멤버십, 상품, 후원을 관리하세요.</p>
      </div>

      <Tabs defaultValue="membership" className="space-y-4">
        <TabsList>
          <TabsTrigger value="membership">멤버십 관리</TabsTrigger>
          <TabsTrigger value="products">상품 관리</TabsTrigger>
          <TabsTrigger value="sponsorship">후원</TabsTrigger>
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
        <CardTitle className="text-sm font-medium">패키지</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3개</div>
        <p className="text-xs text-muted-foreground">활성 패키지</p>
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
        <CardTitle className="text-base">패키지</CardTitle>
        <CardDescription className="text-sm">여러 콘텐츠 패키지 구성</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-transparent"
          onClick={() => handleProductModal('bundle')}
        >
          패키지만들기
        </Button>
        <Button variant="ghost" size="sm" className="w-full">
          패키지관리
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
          {productModalType === 'bundle' && "패키지 만들기"}
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
              <Label htmlFor="bundle-name">패키지이름</Label>
              <Input id="bundle-name" placeholder="패키지 이름을 입력하세요" />
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
              <Label htmlFor="bundle-price">패키지가격</Label>
              <Input id="bundle-price" type="number" placeholder="패키지판매 가격" />
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
                {productModalType === 'bundle' && "패키지생성"}
                {productModalType === 'vrook' && "제작 신청"}
                {productModalType === 'xr-fanmeeting' && "팬미팅 신청"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* 후원 등급 설정 모달 */}
      <Dialog open={sponsorshipGradeModalOpen} onOpenChange={setSponsorshipGradeModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>후원 등급 설정</DialogTitle>
            <DialogDescription>각 등급별 최소 후원 금액과 혜택을 설정하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* 플래티넘 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <Label className="font-medium">플래티넘 등급</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="platinum-amount">최소 후원 금액</Label>
                <Input id="platinum-amount" type="number" placeholder="300000" defaultValue="300000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platinum-benefits">제공 혜택</Label>
                <textarea 
                  id="platinum-benefits"
                  className="w-full p-2 text-sm border rounded-md min-h-[60px]"
                  defaultValue="서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠, 연간 팬미팅 우선 초대, 개인 감사 영상 메시지"
                />
              </div>
            </div>

            {/* 골드 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <Label className="font-medium">골드 등급</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gold-amount">최소 후원 금액</Label>
                <Input id="gold-amount" type="number" placeholder="100000" defaultValue="100000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gold-benefits">제공 혜택</Label>
                <textarea 
                  id="gold-benefits"
                  className="w-full p-2 text-sm border rounded-md min-h-[60px]"
                  defaultValue="서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠, 연간 팬미팅 우선 초대"
                />
              </div>
            </div>

            {/* 실버 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <Label className="font-medium">실버 등급</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="silver-amount">최소 후원 금액</Label>
                <Input id="silver-amount" type="number" placeholder="50000" defaultValue="50000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="silver-benefits">제공 혜택</Label>
                <textarea 
                  id="silver-benefits"
                  className="w-full p-2 text-sm border rounded-md min-h-[60px]"
                  defaultValue="서포터 전용 배지, 월간 소식지 구독, VIP 채팅방 입장권, 본기획 특별 콘텐츠"
                />
              </div>
            </div>

            {/* 브론즈 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <Label className="font-medium">브론즈 등급</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bronze-amount">최소 후원 금액</Label>
                <Input id="bronze-amount" type="number" placeholder="10000" defaultValue="10000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bronze-benefits">제공 혜택</Label>
                <textarea 
                  id="bronze-benefits"
                  className="w-full p-2 text-sm border rounded-md min-h-[60px]"
                  defaultValue="서포터 전용 배지, 월간 소식지 구독"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSponsorshipGradeModalOpen(false)}>
              취소
            </Button>
            <Button type="submit" onClick={() => setSponsorshipGradeModalOpen(false)}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* 전체 후원자 리스트 모달 */}
      <Dialog open={sponsorListModalOpen} onOpenChange={setSponsorListModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>전체 후원자 목록</DialogTitle>
            <DialogDescription>모든 후원 내역을 확인하고 관리하세요.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 필터 및 검색 */}
            <div className="flex space-x-2">
              <Input placeholder="후원자 검색..." className="flex-1" />
              <select className="px-3 py-2 border rounded-md">
                <option>전체</option>
                <option>플래티넘</option>
                <option>골드</option>
                <option>실버</option>
                <option>브론즈</option>
              </select>
            </div>
            
            {/* 후원자 목록 */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {Array.from({length: 20}, (_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">김</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">김후원{i + 1}</div>
                      <div className="text-xs text-muted-foreground">2024.12.{String(28 - i).padStart(2, '0')} • {i + 1}번째 후원</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">₩ {(50000 - i * 1000).toLocaleString()}</div>
                      <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block">
                        {i % 3 === 0 ? '공개' : i % 3 === 1 ? '익명' : 'VIP'}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">메시지</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSponsorListModalOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </TabsContent>
       
      <TabsContent value="sponsorship" className="space-y-4">
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
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">공개</div>
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
            <div className="text-xs bg-gray-100 px-2 py-1 rounded">익명</div>
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
            <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">VIP</div>
          </div>
          <Button variant="ghost" size="sm">메시지</Button>
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
