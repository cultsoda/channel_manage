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

interface DiscountCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DiscountCodeModal({
  open,
  onOpenChange
}: DiscountCodeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 할인 코드 생성</DialogTitle>
          <DialogDescription>할인 코드 정보와 조건을 설정하세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code-name">할인 코드명</Label>
            <Input id="code-name" placeholder="예: WELCOME2025" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>할인 유형</Label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option>정률 할인 (%)</option>
                <option>정액 할인 (원)</option>
                <option>무료 배송</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount-value">할인값</Label>
              <Input id="discount-value" type="number" placeholder="예: 20" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">시작일</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">종료일</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="usage-limit">사용 횟수 제한</Label>
            <Input id="usage-limit" type="number" placeholder="예: 100 (무제한은 0)" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="min-amount">최소 구매 금액</Label>
            <Input id="min-amount" type="number" placeholder="예: 50000 (제한 없음은 0)" />
          </div>
          
          <div className="space-y-3">
            <Label>추가 조건</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="first-purchase" />
                <Label htmlFor="first-purchase" className="text-sm">첫 구매 고객 전용</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="membership-only" />
                <Label htmlFor="membership-only" className="text-sm">멤버십 가입자 전용</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="stackable" />
                <Label htmlFor="stackable" className="text-sm">다른 할인과 중복 가능</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            할인 코드 생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}