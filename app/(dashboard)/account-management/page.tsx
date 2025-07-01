"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  Receipt,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  Globe
} from "lucide-react"
import { useState } from "react"

export default function AccountManagementPage() {
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [verificationRegion, setVerificationRegion] = useState<'domestic' | 'overseas'>('domestic')
  const [accountType] = useState<'creator' | 'user'>('creator') // 실제로는 로그인 정보에서 가져옴
  
  // 모달 상태들
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [verificationOpen, setVerificationOpen] = useState(false)
  const [twoFactorOpen, setTwoFactorOpen] = useState(false)
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false)
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)
    }
  }

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
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById('profileImageInput')?.click()}>
                    <Camera className="h-4 w-4" />
                    이미지 변경
                  </Button>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
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
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">휴대폰번호</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="010-0000-0000" defaultValue="010-1234-5678" />
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
              <Button className="flex items-center gap-2" onClick={() => setChangePasswordOpen(true)}>
                <Key className="h-4 w-4" />
                비밀번호 변경
              </Button>
              
              {/* 비밀번호 변경 모달 */}
              <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>비밀번호 변경</DialogTitle>
                    <DialogDescription>새로운 비밀번호를 설정해주세요.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-currentPassword">현재 비밀번호</Label>
                      <Input id="modal-currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-newPassword">새 비밀번호</Label>
                      <Input id="modal-newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-confirmPassword">비밀번호 확인</Label>
                      <Input id="modal-confirmPassword" type="password" />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>취소</Button>
                      <Button onClick={() => setChangePasswordOpen(false)}>변경 완료</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* 본인 인증 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                본인 인증
                {accountType === 'creator' && <Badge variant="destructive">필수</Badge>}
              </CardTitle>
              <CardDescription>
                {accountType === 'creator' 
                  ? '정산을 위한 본인인증이 필요합니다.' 
                  : '성인 콘텐츠 이용을 위한 본인인증을 완료하세요.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 현재 인증 상태 */}
              <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">본인 인증이 필요합니다</span>
                </div>
                <p className="text-sm text-yellow-700">
                  {accountType === 'creator' 
                    ? '크리에이터로서 수익 정산을 받기 위해 본인 인증이 필요합니다.'
                    : '성인 콘텐츠를 시청하려면 본인 인증을 완료해주세요.'
                  }
                </p>
              </div>

              {/* 거주지역 선택 */}
              <div className="space-y-3">
                <Label>거주 지역</Label>
                <RadioGroup 
                  value={verificationRegion} 
                  onValueChange={(value) => setVerificationRegion(value as 'domestic' | 'overseas')}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="domestic" id="domestic" />
                    <Label htmlFor="domestic">국내 거주</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="overseas" id="overseas" />
                    <Label htmlFor="overseas">해외 거주</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 인증 방법 안내 */}
              <div className="p-4 border rounded-lg">
                {verificationRegion === 'domestic' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">PASS 앱 인증</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      PASS 인증서를 통한 본인인증을 진행합니다. 스마트폰에 PASS 앱이 설치되어 있어야 합니다.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-600" />
                      <span className="font-medium">여권 인증</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      여권 사진과 여권을 들고 있는 본인 사진을 업로드하여 인증을 진행합니다.
                    </p>
                  </div>
                )}
              </div>

              <Dialog open={verificationOpen} onOpenChange={setVerificationOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">본인 인증 시작</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>본인 인증</DialogTitle>
                    <DialogDescription>
                      {verificationRegion === 'domestic' ? 'PASS 앱을 통한 본인인증' : '여권을 통한 본인인증'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {verificationRegion === 'domestic' ? (
                    <div className="space-y-4">
                      <div className="text-center p-6 border-2 border-dashed rounded-lg">
                        <Smartphone className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                        <p className="font-medium mb-2">PASS 앱 인증</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          PASS 앱에서 QR코드를 스캔하거나<br/>
                          인증번호를 입력해주세요.
                        </p>
                        <div className="w-24 h-24 bg-gray-200 mx-auto mb-4 rounded">
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                            QR 코드
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          인증번호: 1234-5678
                        </p>
                      </div>
                      <Button className="w-full">인증 완료 확인</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>여권 사진 업로드</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-muted-foreground mb-2">여권 사진을 업로드해주세요</p>
                          <Button variant="outline" size="sm">파일 선택</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>본인 확인 사진 업로드</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-muted-foreground mb-2">여권과 함께 촬영한 본인 사진</p>
                          <Button variant="outline" size="sm">파일 선택</Button>
                        </div>
                      </div>
                      
                      <Button className="w-full">인증 요청</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
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
                <Button variant="outline" onClick={() => setTwoFactorOpen(true)}>설정하기</Button>
              </div>
              
              {/* 2단계 인증 설정 모달 */}
              <Dialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>2단계 인증 설정</DialogTitle>
                    <DialogDescription>계정 보안을 더욱 강화하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>인증 방법 선택</Label>
                      <RadioGroup defaultValue="sms">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sms" id="sms" />
                          <Label htmlFor="sms">SMS 인증</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="app" id="app" />
                          <Label htmlFor="app">인증 앱 (Google Authenticator)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone-2fa">휴대폰 번호</Label>
                      <Input id="phone-2fa" placeholder="010-0000-0000" defaultValue="010-1234-5678" />
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        2단계 인증을 활성화하면 로그인 시 추가 인증 코드가 필요합니다.
                      </p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setTwoFactorOpen(false)}>취소</Button>
                      <Button onClick={() => setTwoFactorOpen(false)}>활성화</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
              <Button variant="outline" className="w-full" onClick={() => setPaymentMethodOpen(true)}>새 결제 수단 추가</Button>
              
              {/* 결제 수단 추가 모달 */}
              <Dialog open={paymentMethodOpen} onOpenChange={setPaymentMethodOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>결제 수단 추가</DialogTitle>
                    <DialogDescription>새로운 결제 수단을 등록하세요.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>결제 수단 선택</Label>
                      <RadioGroup defaultValue="card">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card">신용/체크카드</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="kakao" id="kakao" />
                          <Label htmlFor="kakao">카카오페이</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="naver" id="naver" />
                          <Label htmlFor="naver">네이버페이</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">카드 번호</Label>
                        <Input id="card-number" placeholder="0000-0000-0000-0000" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">유효기간</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">카드 소유자명</Label>
                        <Input id="card-name" placeholder="홍길동" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="set-default" className="rounded" />
                      <Label htmlFor="set-default">기본 결제 수단으로 설정</Label>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setPaymentMethodOpen(false)}>취소</Button>
                      <Button onClick={() => setPaymentMethodOpen(false)}>등록</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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