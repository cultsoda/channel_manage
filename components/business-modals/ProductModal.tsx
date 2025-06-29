"use client"

import { useState } from "react"
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

interface Content {
  id: string
  title: string
  type: string
  views: number
  price: number | null
  thumbnail: string
  category: string
}

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productModalType: 'single' | 'bundle' | 'vrook' | 'xr-fanmeeting' | null
  availableContent: Content[]
}

export default function ProductModal({
  open,
  onOpenChange,
  productModalType,
  availableContent
}: ProductModalProps) {
  const [selectedContent, setSelectedContent] = useState<Content[]>([])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            {productModalType === 'single' && "상품 등록"}
            {productModalType === 'bundle' && "패키지생성"}
            {productModalType === 'vrook' && "제작 신청"}
            {productModalType === 'xr-fanmeeting' && "팬미팅 신청"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}