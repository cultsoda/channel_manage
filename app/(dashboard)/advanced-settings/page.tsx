import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Key, Download, ExternalLink } from "lucide-react"

export default function AdvancedSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">고급 설정</h1>
        <p className="text-muted-foreground">API 연동, 보안 설정, 개발자 도구를 관리하세요.</p>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">보안 설정</TabsTrigger>
          <TabsTrigger value="api">API 연동</TabsTrigger>
          <TabsTrigger value="data">데이터 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>계정 보안</CardTitle>
              <CardDescription>계정의 보안을 강화하세요.</CardDescription>
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

              <Button>비밀번호 변경</Button>

              <hr />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>2단계 인증</Label>
                  <p className="text-sm text-muted-foreground">계정 보안을 위한 2단계 인증을 활성화합니다</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>

              <div className="space-y-3">
                <Label>로그인 히스토리</Label>
                <div className="space-y-2">
                  {loginHistory.map((login) => (
                    <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{login.device}</p>
                        <p className="text-xs text-muted-foreground">
                          {login.location} • {login.time}
                        </p>
                      </div>
                      <Badge variant={login.current ? "default" : "secondary"}>
                        {login.current ? "현재 세션" : "이전 로그인"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>외부 서비스 연동</CardTitle>
              <CardDescription>외부 서비스와 API를 연동하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">구글 애널리틱스</p>
                    <p className="text-sm text-muted-foreground">웹사이트 분석 도구</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    연동
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">이메일 마케팅</p>
                    <p className="text-sm text-muted-foreground">이메일 자동화 도구</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    연동
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">소셜 미디어</p>
                    <p className="text-sm text-muted-foreground">SNS 자동 연동</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    연동
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">결제 시스템</p>
                    <p className="text-sm text-muted-foreground">외부 결제 게이트웨이</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    연동
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>개발자 도구</CardTitle>
              <CardDescription>API 키와 웹훅을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API 키</Label>
                <div className="flex gap-2">
                  <Input value="xrom_live_sk_1234567890abcdef" readOnly />
                  <Button variant="outline" size="icon">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">API 키를 안전하게 보관하세요</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook">웹훅 URL</Label>
                <Input id="webhook" placeholder="https://your-server.com/webhook" />
                <p className="text-xs text-muted-foreground">이벤트 발생 시 알림을 받을 URL을 입력하세요</p>
              </div>

              <Button variant="outline">개발자 문서 보기</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>데이터 관리</CardTitle>
              <CardDescription>채널 데이터를 백업하고 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">채널 데이터 백업</p>
                    <p className="text-sm text-muted-foreground">전체 채널 데이터를 다운로드합니다</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    백업
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">콘텐츠 데이터 내보내기</p>
                    <p className="text-sm text-muted-foreground">업로드한 콘텐츠 목록을 CSV로 내보냅니다</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    내보내기
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">팬 데이터 내보내기</p>
                    <p className="text-sm text-muted-foreground">팬 목록과 통계를 CSV로 내보냅니다</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    내보내기
                  </Button>
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h4 className="font-medium text-destructive">위험 구역</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>자동 백업</Label>
                    <p className="text-sm text-muted-foreground">매주 자동으로 데이터를 백업합니다</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>

                <div className="p-4 border border-destructive rounded-lg">
                  <p className="font-medium text-destructive mb-2">계정 삭제</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                  </p>
                  <Button variant="destructive" size="sm">
                    계정 삭제 요청
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const loginHistory = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "서울, 대한민국",
    time: "현재",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "서울, 대한민국",
    time: "2시간 전",
    current: false,
  },
  {
    id: "3",
    device: "Chrome on Mac",
    location: "부산, 대한민국",
    time: "1일 전",
    current: false,
  },
]
