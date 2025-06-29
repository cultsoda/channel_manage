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

interface Membership {
  id: number
  name: string
  description: string
  price: number
  features: string[]
}

interface MembershipModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingMembership: Membership | null
  isNewMembership: boolean
}

export default function MembershipModal({
  open,
  onOpenChange,
  editingMembership,
  isNewMembership
}: MembershipModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button type="submit" onClick={() => onOpenChange(false)}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}