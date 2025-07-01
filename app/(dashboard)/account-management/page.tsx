import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Shield, 
  CreditCard, 
  Crown, 
  ShoppingBag, 
  Bell,
  Camera,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Key,
  Smartphone,
  Download,
  Receipt
} from "lucide-react"

export default function AccountManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">계정 관리</h1>
        <p className="text-muted-foreground">내 계정의 모든 설정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            프로필 설정
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            보안 설정
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            결제 설정
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            구독 관리
          </TabsTrigger>
          <TabsTrigger value="purchase" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            구매 관리
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            알림 설정
          </TabsTrigger>
        </TabsList>

        {/* 프로필 설정 탭 */}
        <TabsContent value="profile" className="space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
              <CardDescription>프로필 이미지, 닉네임, 연락처 정보를 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 프로필 이미지 */}
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback>사용자</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    이미지 변경
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG 파일 (최대 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input id="nickname" placeholder="닉네임을 입력하세요" defaultValue="사용자" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue="user@example.com" />
                    <Badge variant="secondary">인증됨</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">휴대폰번호</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="010-0000-0000" defaultValue="010-1234-5678" />
                    <Badge variant="secondary">인증됨</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">지역</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="region" placeholder="지역을 입력하세요" defaultValue="서울특별시" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 추가 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>추가 정보</CardTitle>
              <CardDescription>생년월일, 성별, 관심사 등의 추가 정보를 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthday">생년월일</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input id="birthday" type="date" defaultValue="1990-01-01" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">성별</Label>
                  <select id="gender" className="w-full p-2 border rounded-md">
                    <option>선택 안함</option>
                    <option>남성</option>
                    <option>여성</option>
                    <option>기타</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">관심사 태그</Label>
                <div className="space-y-2">
                  <Input id="interests" placeholder="관심사를 쉼표로 구분하여 입력하세요" />
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">K-POP</Badge>
                    <Badge variant="outline">게임</Badge>
                    <Badge variant="outline">영화</Badge>
                    <Badge variant="outline">음악</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>변경사항 저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 보안 설정 탭 */}
        <TabsContent value="security" className="space-y-6">
          {/* 비밀번호 관리 */}
          <Card>
            <CardHeader>
              <CardTitle>비밀번호 관리</CardTitle>
              <CardDescription>계정의 비밀번호를 변경하고 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                비밀번호 변경
              </Button>
            </CardContent>
          </Card>

          {/* 본인 인증 */}
          <Card>
            <CardHeader>
              <CardTitle>본인 인증</CardTitle>
              <CardDescription>휴대폰과 이메일 인증을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5" />
                  <div>
                    <p className="font-medium">휴대폰 인증</p>
                    <p className="text-sm text-muted-foreground">010-1234-5678</p>
                  </div>
                </div>
                <Badge variant="secondary">인증완료</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-medium">이메일 인증</p>
                    <p className="text-sm text-muted-foreground">user@example.com</p>
                  </div>
                </div>
                <Badge variant="secondary">인증완료</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 2단계 인증 */}
          <Card>
            <CardHeader>
              <CardTitle>2단계 인증</CardTitle>
              <CardDescription>계정 보안을 더욱 강화하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">2단계 인증 활성화</p>
                  <p className="text-sm text-muted-foreground">로그인 시 추가 인증 단계를 거칩니다</p>
                </div>
                <Button variant="outline">설정하기</Button>
              </div>
            </CardContent>
          </Card>

          {/* 접근 관리 */}
          <Card>
            <CardHeader>
              <CardTitle>접근 관리</CardTitle>
              <CardDescription>로그인 이력과 기기 정보를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">최근 로그인 이력</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">2024-01-15 10:30 • 서울, 한국</p>
                    </div>
                    <Badge variant="default">현재 세션</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">2024-01-14 18:45 • 서울, 한국</p>
                    </div>
                    <Button variant="ghost" size="sm">종료</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">의심스러운 활동 알림</p>
                  <p className="text-sm text-muted-foreground">새로운 기기에서 로그인 시 알림을 받습니다</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>

              <Separator />

              <Button variant="destructive" size="sm">계정 탈퇴</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 결제 설정 탭 */}
        <TabsContent value="payment" className="space-y-6">
          {/* 결제 수단 */}
          <Card>
            <CardHeader>
              <CardTitle>결제 수단</CardTitle>
              <CardDescription>등록된 결제 수단을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">신한카드 ****1234</p>
                      <p className="text-sm text-muted-foreground">유효기간: 12/26</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">기본</Badge>
                    <Button variant="ghost" size="sm">삭제</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="font-medium">카카오페이</p>
                      <p className="text-sm text-muted-foreground">연결됨</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">해제</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">새 결제 수단 추가</Button>
            </CardContent>
          </Card>

          {/* 결제 내역 */}
          <Card>
            <CardHeader>
              <CardTitle>결제 내역</CardTitle>
              <CardDescription>최근 결제 내역을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">프리미엄 멤버십</p>
                    <p className="text-sm text-muted-foreground">2024-01-15 • 신한카드 ****1234</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₩12,000</p>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Receipt className="h-3 w-3" />
                      영수증
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">VR 콘텐츠 구매</p>
                    <p className="text-sm text-muted-foreground">2024-01-10 • 카카오페이</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₩5,000</p>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Receipt className="h-3 w-3" />
                      영수증
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">전체 내역 보기</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 구독 관리 탭 */}
        <TabsContent value="subscription" className="space-y-6">
          {/* 멤버십 현황 */}
          <Card>
            <CardHeader>
              <CardTitle>멤버십 현황</CardTitle>
              <CardDescription>현재 가입된 멤버십을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-600">프리미엄 멤버십</span>
                  </div>
                  <Badge variant="secondary">활성</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>혜택:</strong> 전체 콘텐츠 무제한 시청, 전용 채팅방, 월 2회 라이브 참여</p>
                  <p><strong>다음 갱신일:</strong> 2024-02-15</p>
                  <p><strong>월 요금:</strong> ₩12,000</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">업그레이드</Button>
                <Button variant="outline">일시정지</Button>
                <Button variant="destructive">해지</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 구매 관리 탭 */}
        <TabsContent value="purchase" className="space-y-6">
          {/* 구매 내역 */}
          <Card>
            <CardHeader>
              <CardTitle>구매 내역</CardTitle>
              <CardDescription>구매한 콘텐츠와 상품을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div>
                      <p className="font-medium">VR 콘서트 체험</p>
                      <p className="text-sm text-muted-foreground">2024-01-10 구매</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    다운로드
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div>
                      <p className="font-medium">VROOK 패키지</p>
                      <p className="text-sm text-muted-foreground">2024-01-05 구매</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">이용하기</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 다운로드 관리 */}
          <Card>
            <CardHeader>
              <CardTitle>다운로드 관리</CardTitle>
              <CardDescription>다운로드 가능한 콘텐츠와 이력을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">다운로드 제한</p>
                    <span className="text-sm text-muted-foreground">5개 / 10개</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '50%'}}></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">다운로드 이력 보기</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 설정 탭 */}
        <TabsContent value="notification" className="space-y-6">
          {/* 푸시 알림 */}
          <Card>
            <CardHeader>
              <CardTitle>푸시 알림</CardTitle>
              <CardDescription>앱과 브라우저 푸시 알림을 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">마케팅 알림</p>
                  <p className="text-sm text-muted-foreground">이벤트, 할인 등의 마케팅 정보</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">결제 알림</p>
                  <p className="text-sm text-muted-foreground">결제 완료, 실패 등의 알림</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">콘텐츠 알림</p>
                  <p className="text-sm text-muted-foreground">새 콘텐츠 업로드, 라이브 시작</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* 이메일 알림 */}
          <Card>
            <CardHeader>
              <CardTitle>이메일 알림</CardTitle>
              <CardDescription>이메일로 받을 알림을 설정하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">뉴스레터</p>
                  <p className="text-sm text-muted-foreground">주간 소식과 추천 콘텐츠</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">중요 공지</p>
                  <p className="text-sm text-muted-foreground">시스템 업데이트, 정책 변경</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>알림 설정 저장</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}