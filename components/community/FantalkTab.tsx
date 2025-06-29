"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Shield, Archive, UserX, Users, Eye, AlertTriangle, Ban, Clock, CheckCircle } from "lucide-react"
import ChatManager from "@/components/community/ChatManager"

// 기존 chatRooms 데이터 (기존 코드와 동일)
const chatRooms = [
  { id: "1", name: "일반 채팅", members: 1284, type: "public" },
  { id: "2", name: "VIP 전용", members: 45, type: "private" },
  { id: "3", name: "질문과 답변", members: 892, type: "public" },
]

interface ModerationLog {
  id: string;
  timestamp: string;
  action: 'warning' | 'block' | 'delete' | 'unblock';
  user: string;
  reason: string;
  chatRoom: string;
  moderator: string;
}

interface BlockedUser {
  id: string;
  username: string;
  name: string;
  reason: string;
  blockedAt: string;
  blockedBy: string;
  isTemporary: boolean;
  unblockAt?: string;
}

const mockModerationLogs: ModerationLog[] = [
  {
    id: '1',
    timestamp: '2024-06-29 15:30',
    action: 'warning',
    user: '문제유저1',
    reason: '부적절한 언어 사용',
    chatRoom: '일반 채팅',
    moderator: '관리자'
  },
  {
    id: '2',
    timestamp: '2024-06-29 14:15',
    action: 'delete',
    user: '스팸유저2',
    reason: '스팸 메시지',
    chatRoom: 'VIP 전용',
    moderator: '자동 시스템'
  }
];

const mockBlockedUsers: BlockedUser[] = [
  {
    id: '1',
    username: '@blocked_user1',
    name: '차단유저1',
    reason: '반복적인 스팸 행위',
    blockedAt: '2024-06-28 10:30',
    blockedBy: '관리자',
    isTemporary: false
  },
  {
    id: '2',
    username: '@temp_blocked',
    name: '임시차단유저',
    reason: '부적절한 언어 사용',
    blockedAt: '2024-06-29 09:00',
    blockedBy: '관리자',
    isTemporary: true,
    unblockAt: '2024-07-01 09:00'
  }
];

export default function FantalkTab() {
  const [spamWords, setSpamWords] = useState("")
  const [autoBlock, setAutoBlock] = useState(false)
  const [saveChat, setSaveChat] = useState(true)
  const [showModerationLogs, setShowModerationLogs] = useState(false)
  const [showBlockedUsers, setShowBlockedUsers] = useState(false)

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'block': return <Ban className="w-4 h-4 text-red-500" />;
      case 'delete': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'unblock': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getActionName = (action: string) => {
    switch (action) {
      case 'warning': return '경고';
      case 'block': return '차단';
      case 'delete': return '메시지 삭제';
      case 'unblock': return '차단 해제';
      default: return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'block': return 'bg-red-100 text-red-800 border-red-200';
      case 'delete': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'unblock': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* 기존 채팅방 관리 + 실시간 채팅 관리 (기존 코드와 동일) */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>채팅방 관리</CardTitle>
            <CardDescription>다양한 주제의 채팅방을 생성하고 관리하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatRooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{room.name}</p>
                    <p className="text-sm text-muted-foreground">{room.members}명 참여</p>
                  </div>
                </div>
                <Badge variant={room.type === "public" ? "default" : "secondary"}>
                  {room.type === "public" ? "공개" : "멤버십"}
                </Badge>
              </div>
            ))}
            <Button className="w-full">새 채팅방 생성</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>실시간 채팅 관리</CardTitle>
            <CardDescription>채팅방별 실시간 대화를 확인하고 관리하세요.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ChatManager chatRooms={chatRooms} isCreatorView={true} />
          </CardContent>
        </Card>
      </div>

      {/* 개선된 모더레이션 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>모더레이션 설정</CardTitle>
          <CardDescription>채팅방의 안전한 환경을 위한 설정을 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <Label>스팸 메시지 자동 차단</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  등록된 스팸 키워드가 포함된 메시지를 자동으로 차단합니다
                </p>
              </div>
              <Checkbox checked={autoBlock} onCheckedChange={(checked) => setAutoBlock(Boolean(checked))} />
            </div>

            {autoBlock && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="spam-words">스팸 키워드 등록</Label>
                <Textarea
                  id="spam-words"
                  placeholder="스팸으로 차단할 키워드를 쉼표로 구분하여 입력하세요"
                  value={spamWords}
                  onChange={(e) => setSpamWords(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button size="sm">키워드 저장</Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4" />
                  <Label>사용자 차단 관리</Label>
                </div>
                <p className="text-sm text-muted-foreground">부적절한 행동을 하는 사용자를 차단하고 관리합니다</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowBlockedUsers(!showBlockedUsers)}
              >
                차단 목록 관리
              </Button>
            </div>
            
            {/* 차단된 사용자 목록 */}
            {showBlockedUsers && (
              <div className="ml-6 p-4 border rounded-lg bg-gray-50 space-y-3">
                <h5 className="font-medium text-sm">차단된 사용자</h5>
                {mockBlockedUsers.length > 0 ? (
                  <div className="space-y-2">
                    {mockBlockedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-white border rounded">
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.username}</p>
                          <p className="text-xs text-gray-500">사유: {user.reason}</p>
                          <p className="text-xs text-gray-500">
                            차단일: {user.blockedAt}
                            {user.isTemporary && user.unblockAt && ` → 해제: ${user.unblockAt}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {user.isTemporary && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              임시
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            해제
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">차단된 사용자가 없습니다.</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  <Label>채팅 기록 저장</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  채팅 기록을 서버에 저장하여 관리 목적으로 활용합니다
                </p>
              </div>
              <Checkbox checked={saveChat} onCheckedChange={(checked) => setSaveChat(Boolean(checked))} />
            </div>
          </div>

          {/* 모더레이션 로그 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <Label>모더레이션 활동 기록</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  최근 모더레이션 활동 내역을 확인합니다
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowModerationLogs(!showModerationLogs)}
              >
                활동 기록 보기
              </Button>
            </div>

            {/* 모더레이션 로그 목록 */}
            {showModerationLogs && (
              <div className="ml-6 p-4 border rounded-lg bg-gray-50 space-y-3">
                <h5 className="font-medium text-sm">최근 모더레이션 활동</h5>
                {mockModerationLogs.length > 0 ? (
                  <div className="space-y-2">
                    {mockModerationLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-white border rounded">
                        <div className="flex items-center gap-3">
                          {getActionIcon(log.action)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getActionColor(log.action)}`}>
                                {getActionName(log.action)}
                              </span>
                              <span className="text-sm font-medium">{log.user}</span>
                            </div>
                            <p className="text-xs text-gray-600">
                              {log.chatRoom} • {log.reason}
                            </p>
                            <p className="text-xs text-gray-500">
                              {log.timestamp} • {log.moderator}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">모더레이션 활동 내역이 없습니다.</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 추가 통계 및 모니터링 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">오늘의 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">총 메시지</span>
                </div>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm">활성 사용자</span>
                </div>
                <span className="font-semibold">342</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">경고 발생</span>
                </div>
                <span className="font-semibold">5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">자동 차단 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">스팸 메시지</span>
                <span className="font-semibold text-red-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">부적절한 언어</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">도배 행위</span>
                <span className="font-semibold text-yellow-600">7</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">채팅방별 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chatRooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between">
                  <span className="text-sm">{room.name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${room.type === "public" ? "bg-green-500" : "bg-blue-500"}`}></div>
                    <span className="text-sm font-medium">{room.members}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}