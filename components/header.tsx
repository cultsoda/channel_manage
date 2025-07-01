"use client"

import { useState, useEffect } from "react"
import { useSidebar } from "./sidebar-provider"
import { Bell, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AI_PROMPTS = [
  "이번 달 수익이 얼마야?",
  "새 이벤트 만들고 싶어",
  "콘텐츠 업로드하는 곳이 어디야?",
  "팬들에게 메시지 보내는 방법",
  "멤버십 설정 어떻게 해?",
  "채널 분석 데이터 보고 싶어",
  "새로운 팬이 몇 명 늘었어?",
  "댓글 관리는 어떻게 하지?",
  "정산 신청하려면?",
  "VR 콘텐츠 업로드 방법"
]

export function Header() {
  const { toggle } = useSidebar()
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentPrompt = AI_PROMPTS[currentPromptIndex]
    
    if (isTyping) {
      // 타이핑 효과
      if (displayText.length < currentPrompt.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentPrompt.slice(0, displayText.length + 1))
        }, 100) // 타이핑 속도
        return () => clearTimeout(timer)
      } else {
        // 타이핑 완료 후 2초 대기
        const timer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } else {
      // 지우기 효과
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50) // 지우기 속도
        return () => clearTimeout(timer)
      } else {
        // 다음 프롬프트로 이동
        setCurrentPromptIndex((prev) => (prev + 1) % AI_PROMPTS.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, currentPromptIndex])

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-14 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggle}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={displayText}
              className="w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account-management">계정 관리</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}