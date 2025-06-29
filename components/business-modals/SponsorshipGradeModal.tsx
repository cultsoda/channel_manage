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

interface SponsorshipGradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SponsorshipGradeModal({
  open,
  onOpenChange
}: SponsorshipGradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}