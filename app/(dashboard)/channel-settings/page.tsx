"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"


export default function ChannelSettingsPage() {
  const [ageRestrictionDialog, setAgeRestrictionDialog] = useState(false)
  const [identityVerificationDialog, setIdentityVerificationDialog] = useState(false)

  // 👇 여기에 추가하세요!
  const [isChannelPublic, setIsChannelPublic] = useState(true)
  const [isSearchVisible, setIsSearchVisible] = useState(true) 
  const [isCommentsAllowed, setIsCommentsAllowed] = useState(true)

  const handleAgeRestrictionChange = (value: string) => {
    if (value === "19") {
      setAgeRestrictionDialog(true)
    }
  }

  const handleIdentityVerification = () => {
    setAgeRestrictionDialog(false)
    setIdentityVerificationDialog(true)
    // 본인 인증 로직 구현
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">채널 설정</h1>
        <p className="text-muted-foreground">채널 기본 정보와 정책을 설정하세요.</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="design">디자인</TabsTrigger>
          <TabsTrigger value="policy">정책 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>채널 정보</CardTitle>
              <CardDescription>채널의 기본 정보를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channelName">채널명</Label>
                <Input id="channelName" defaultValue="채널의 채널" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channelDescription">채널 설명</Label>
                <textarea
                  id="channelDescription"
                  placeholder="채널에 대한 설명을 입력하세요..."
                  className="w-full p-2 border rounded-md h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <select id="category" className="w-full p-2 border rounded-md">
                  <option>엔터테인먼트</option>
                  <option>교육</option>
                  <option>게임</option>
                  <option>음악</option>
                  <option>기타</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">태그</Label>
                <Input id="tags" placeholder="태그를 쉼표로 구분하여 입력하세요" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>비주얼 브랜딩</CardTitle>
              <CardDescription>채널의 시각적 요소를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>프로필 이미지</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>채널</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">이미지 변경</Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>배너 이미지</Label>
                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">배너 이미지 (1920x480)</p>
                </div>
                <Button variant="outline">배너 변경</Button>
              </div>

              <div className="space-y-4">
                <Label>모바일 배너 이미지</Label>
                <div className="w-full h-24 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">모바일 배너 (750x300)</p>
                </div>
                <Button variant="outline">모바일 배너 변경</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>연결 정보</CardTitle>
              <CardDescription>외부 링크와 연락처 정보를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">공식 웹사이트</Label>
                <Input id="website" placeholder="https://example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">인스타그램</Label>
                <Input id="instagram" placeholder="@username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">유튜브</Label>
                <Input id="youtube" placeholder="채널 URL" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">비즈니스 연락처</Label>
                <Input id="contact" placeholder="business@example.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>레이아웃 설정</CardTitle>
              <CardDescription>채널 홈 페이지의 레이아웃을 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pageTemplate">페이지 템플릿 선택</Label>
                <select id="pageTemplate" className="w-full p-2 border rounded-md">
                  <option>기본 템플릿</option>
                  <option>미니멀 템플릿</option>
                  <option>매거진 템플릿</option>
                  <option>포트폴리오 템플릿</option>
                </select>
                <p className="text-sm text-muted-foreground">채널 홈 페이지 레이아웃 템플릿</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sectionOrder">섹션 배치 설정</Label>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md bg-muted/50">
                    <p className="text-sm">홈 페이지 섹션 순서 및 배치</p>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <div>1. 헤더 배너</div>
                      <div>2. 최신 콘텐츠</div>
                      <div>3. 인기 콘텐츠</div>
                      <div>4. 커뮤니티</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    섹션 순서 변경
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gridLayout">그리드 레이아웃 조정</Label>
                <select id="gridLayout" className="w-full p-2 border rounded-md">
                  <option>2열 그리드</option>
                  <option>3열 그리드</option>
                  <option>4열 그리드</option>
                  <option>리스트 형태</option>
                </select>
                <p className="text-sm text-muted-foreground">콘텐츠 그리드 레이아웃 설정</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>디자인 설정</CardTitle>
              <CardDescription>채널의 시각적 디자인을 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brandColor">브랜드 컬러 설정</Label>
                <div className="flex items-center gap-4">
                  <Input id="brandColor" type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                  <Input placeholder="#3b82f6" className="flex-1" />
                </div>
                <p className="text-sm text-muted-foreground">채널 테마 색상 설정</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channelTheme">채널 테마 선택</Label>
                <select id="channelTheme" className="w-full p-2 border rounded-md">
                  <option>라이트 테마</option>
                  <option>다크 테마</option>
                  <option>오토 (시스템 설정)</option>
                  <option>커스텀 테마</option>
                </select>
                <p className="text-sm text-muted-foreground">미리 정의된 디자인 테마 선택</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">폰트 선택</Label>
                <select id="fontFamily" className="w-full p-2 border rounded-md">
                  <option>Pretendard (기본)</option>
                  <option>Noto Sans KR</option>
                  <option>Malgun Gothic</option>
                  <option>Apple SD Gothic Neo</option>
                </select>
                <p className="text-sm text-muted-foreground">채널에서 사용할 폰트 설정</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>공개 설정</CardTitle>
              <CardDescription>채널과 콘텐츠의 공개 범위를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>채널 공개</Label>
                  <p className="text-sm text-muted-foreground">검색 결과에 채널이 노출됩니다</p>
                </div>
                <Switch checked={isChannelPublic} onCheckedChange={setIsChannelPublic} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>검색 엔진 노출</Label>
                  <p className="text-sm text-muted-foreground">구글 등 검색 엔진에서 찾을 수 있습니다</p>
                </div>
                <Switch checked={isSearchVisible} onCheckedChange={setIsSearchVisible} />
              </div>

              <div className="space-y-2">
                <Label>연령 제한</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => handleAgeRestrictionChange(e.target.value)}
                >
                  <option value="all">전체 이용가</option>
                  <option value="19">19세 이상</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>커뮤니티 정책</CardTitle>
              <CardDescription>댓글과 커뮤니티 이용 정책을 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>팬 가입 승인</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>자동 승인</option>
                  <option>수동 승인</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>댓글 허용</Label>
                  <p className="text-sm text-muted-foreground">새 콘텐츠에 기본적으로 댓글을 허용합니다</p>
                </div>
                <Switch checked={isCommentsAllowed} onCheckedChange={setIsCommentsAllowed} />
              </div>

              <div className="space-y-2">
                <Label>커뮤니티 가이드라인</Label>
                <textarea
                  placeholder="커뮤니티 이용 규칙을 입력하세요..."
                  className="w-full p-2 border rounded-md h-24"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>설정 저장</Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* 19세 이상 선택 시 확인 다이얼로그 */}
      <AlertDialog open={ageRestrictionDialog} onOpenChange={setAgeRestrictionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>본인 인증이 필요합니다</AlertDialogTitle>
            <AlertDialogDescription>
              19세 이상 콘텐츠로 설정하려면 본인 인증을 완료해야 합니다. 본인 인증을 진행하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleIdentityVerification}>본인 인증</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 본인 인증 완료 다이얼로그 */}
      <Dialog open={identityVerificationDialog} onOpenChange={setIdentityVerificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>본인 인증</DialogTitle>
            <DialogDescription>본인 인증을 위해 휴대폰 번호를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">휴대폰 번호</Label>
              <Input id="phone" placeholder="010-0000-0000" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIdentityVerificationDialog(false)}>
              취소
            </Button>
            <Button type="submit" onClick={() => setIdentityVerificationDialog(false)}>
              인증 요청
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
