"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProductModal from "@/components/business-modals/ProductModal"
import { allContent } from "@/data/contentData"

export default function ProductsTab() {
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [productModalType, setProductModalType] = useState<'single' | 'bundle' | 'vrook' | 'xr-fanmeeting' | null>(null)

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
  }

  return (
    <div className="space-y-4">
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

      <ProductModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        productModalType={productModalType}
        availableContent={availableContent}
      />
    </div>
  )
}