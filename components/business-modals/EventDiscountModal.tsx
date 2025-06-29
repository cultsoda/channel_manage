"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface EventDiscountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EventDiscountModal({
  open,
  onOpenChange
}: EventDiscountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 이벤트 할인 생성</DialogTitle>
          <DialogDescription>기간 한정 특별 할인 이벤트를 설정하세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">이벤트 제목</Label>
            <Input id="event-title" placeholder="예: 신년 특가 이벤트" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-description">이벤트 설명</Label>
            <textarea 
              id="event-description"
              className="w-full p-2 text-sm border rounded-md min-h-[60px]"
              placeholder="이벤트에 대한 상세 설명을 입력하세요"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>할인 유형</Label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>전체 상품 할인</option>
                <option>카테고리별 할인</option>
                <option>특정 상품 할인</option>
                <option>멤버십 할인</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-discount">할인율 (%)</Label>
              <Input id="event-discount" type="number" placeholder="예: 30" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-start">시작일시</Label>
              <Input id="event-start" type="datetime-local" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end">종료일시</Label>
              <Input id="event-end" type="datetime-local" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>적용 대상</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all-products" defaultChecked />
                <Label htmlFor="all-products" className="text-sm">모든 상품</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="membership-products" />
                <Label htmlFor="membership-products" className="text-sm">멤버십 상품</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="single-products" />
                <Label htmlFor="single-products" className="text-sm">단건 상품</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vrook-products" />
                <Label htmlFor="vrook-products" className="text-sm">VROOK</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>이벤트 조건</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-apply" defaultChecked />
                <Label htmlFor="auto-apply" className="text-sm">자동 적용 (코드 불필요)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="banner-display" defaultChecked />
                <Label htmlFor="banner-display" className="text-sm">메인 페이지 배너 표시</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="push-notification" />
                <Label htmlFor="push-notification" className="text-sm">팬들에게 알림 발송</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            이벤트 할인 생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}