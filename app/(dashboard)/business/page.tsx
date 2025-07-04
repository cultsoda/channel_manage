"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MembershipTab from "@/components/business/MembershipTab"
import ProductsTab from "@/components/business/ProductsTab"
import FundingTab from "@/components/business/FundingTab"
import PromotionTab from "@/components/business/PromotionTab"


export default function BusinessPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">상품 & 수익</h1>
        <p className="text-muted-foreground">멤버십, 상품, 펀딩을 관리하세요.</p>
      </div>

      <Tabs defaultValue="membership" className="space-y-4">
        <TabsList>
          <TabsTrigger value="membership">멤버십 관리</TabsTrigger>
          <TabsTrigger value="products">상품 관리</TabsTrigger>
          <TabsTrigger value="funding">펀딩</TabsTrigger>
          <TabsTrigger value="promotion">프로모션</TabsTrigger>
        </TabsList>

        <TabsContent value="membership" className="space-y-4">
          <MembershipTab />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <FundingTab />
        </TabsContent>

        <TabsContent value="promotion" className="space-y-4">
          <PromotionTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}