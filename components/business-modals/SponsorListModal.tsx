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

interface SponsorListModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SponsorListModal({
  open,
  onOpenChange
}: SponsorListModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}