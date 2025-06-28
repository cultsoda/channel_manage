import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, Users, MessageCircle, DollarSign } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function NotificationsPage() {
  const [newFanNotification, setNewFanNotification] = useState(true)
  const [commentNotification, setCommentNotification] = useState(true)
  const [revenueNotification, setRevenueNotification] = useState(true)
  const [systemNotification, setSystemNotification] = useState(true)
  const [emailNotification, setEmailNotification] = useState(false)
  const [pushNotification, setPushNotification] = useState(true)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">알림</h1>
        <p className="text-muted-foreground">실시간 알림을 확인하고 설정을 관리하세요.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>실시간 알림</CardTitle>
            <CardDescription>최근 7일간의 활동 알림</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-1">
                    {notification.type === "fan" && <Users className="h-4 w-4 text-blue-500" />}
                    {notification.type === "revenue" && <DollarSign className="h-4 w-4 text-green-500" />}
                    {notification.type === "comment" && <MessageCircle className="h-4 w-4 text-orange-500" />}
                    {notification.type === "system" && <Bell className="h-4 w-4 text-gray-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {notification.isNew && (
                    <Badge variant="destructive" className="text-xs">
                      NEW
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>알림 설정</CardTitle>
            <CardDescription>알림 수신 방식을 설정하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>새 팬 가입 알림</Label>
                  <p className="text-sm text-muted-foreground">신규 팬 가입 시 알림을 받습니다</p>
                </div>
                <Switch checked={newFanNotification} onCheckedChange={setNewFanNotification} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>댓글/반응 알림</Label>
                  <p className="text-sm text-muted-foreground">새로운 댓글과 좋아요 알림</p>
                </div>
                <Switch checked={commentNotification} onCheckedChange={setCommentNotification} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>수익 발생 알림</Label>
                  <p className="text-sm text-muted-foreground">구매, 후원 발생 시 알림</p>
                </div>
                <Switch checked={revenueNotification} onCheckedChange={setRevenueNotification} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>시스템 공지사항</Label>
                  <p className="text-sm text-muted-foreground">플랫폼 관련 중요 공지</p>
                </div>
                <Switch checked={systemNotification} onCheckedChange={setSystemNotification} />
              </div>
            </div>

            <hr />

            <div className="space-y-4">
              <h4 className="font-medium">알림 수신 방식</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">이메일로 알림을 받습니다</p>
                </div>
                <Switch checked={emailNotification} onCheckedChange={setEmailNotification} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>모바일 푸시 알림</Label>
                  <p className="text-sm text-muted-foreground">모바일 앱 푸시 알림</p>
                </div>
                <Switch checked={pushNotification} onCheckedChange={setPushNotification} />
              </div>

              <div className="space-y-2">
                <Label>알림 수신 시간</Label>
                <div className="grid grid-cols-2 gap-2">
                  <select className="p-2 border rounded-md">
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                  </select>
                  <select className="p-2 border rounded-md">
                    <option>22:00</option>
                    <option>23:00</option>
                    <option>24:00</option>
                  </select>
                </div>
                <p className="text-xs text-muted-foreground">알림을 받을 시간대를 설정하세요</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const recentNotifications = [
  {
    id: "1",
    type: "fan",
    title: "새로운 팬 가입",
    message: "김팬님이 채널을 구독했습니다.",
    time: "2시간 전",
    isNew: true,
  },
  {
    id: "2",
    type: "revenue",
    title: "수익 발생",
    message: "이팬님이 VIP 멤버십에 가입했습니다. (₩19,900)",
    time: "4시간 전",
    isNew: true,
  },
  {
    id: "3",
    type: "comment",
    title: "새로운 댓글",
    message: '박팬님이 "새우깡의 감패기"에 댓글을 남겼습니다.',
    time: "6시간 전",
    isNew: false,
  },
  {
    id: "4",
    type: "system",
    title: "시스템 공지",
    message: "정산 시스템 점검이 완료되었습니다.",
    time: "1일 전",
    isNew: false,
  },
]
