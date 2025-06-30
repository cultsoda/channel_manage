"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 새로 만든 탭 컴포넌트들 import
import FantalkTab from "@/components/community/FantalkTab"
import MembersTab from "@/components/community/MembersTab"
import MessagesTab from "@/components/community/MessagesTab"
import EventsTab from "@/components/community/EventsTab"
import BoardTab from "@/components/community/BoardTab"  // 이 줄 추가

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">커뮤니티</h1>
        <p className="text-muted-foreground">팬톡, 회원 관리, 메시지, 게시판, 이벤트를 관리하세요.</p>  {/* 여기도 수정 */}
      </div>

      <Tabs defaultValue="fantalk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fantalk">팬톡 관리</TabsTrigger>
          <TabsTrigger value="members">회원 관리</TabsTrigger>
          <TabsTrigger value="messages">메시지 관리</TabsTrigger>
          <TabsTrigger value="board">게시판 관리</TabsTrigger>
          <TabsTrigger value="events">이벤트 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="fantalk" className="space-y-4">
          <FantalkTab />
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <MembersTab />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <MessagesTab />
        </TabsContent>

        <TabsContent value="board" className="space-y-4">  {/* 이 부분 추가 */}
          <BoardTab />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <EventsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}