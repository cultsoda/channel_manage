"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  DollarSign,
  Users,
  Settings,
  Calculator,
  Bell,
  Cog,
  Menu,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle } = useSidebar()

  return (
    <>
      <div
        className={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden", isOpen ? "block" : "hidden")}
        onClick={toggle}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-background",
          "transition-transform duration-300 ease-in-out",
          "border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="https://xromeda.com"
            target="_blank"
            className="text-lg font-semibold text-orange-500 hover:text-orange-600"
          >
            XROMEDA
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={toggle}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Channel Info Section */}
        <div className="border-b p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/channel-home" className="flex items-center gap-3 hover:bg-accent rounded-md p-2 -m-2 transition-colors">
                  <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">채널</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">채널의 채널</p>
                    <p className="text-xs text-muted-foreground">chiam(관리자)</p>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>채널 홈으로 이동</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link href="/upload">
            <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              업로드
            </Button>
          </Link>
        </div>

        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

const navItems = [
  { name: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { name: "콘텐츠 관리", href: "/content", icon: FileText },
  { name: "상품 & 수익", href: "/business", icon: DollarSign },
  { name: "커뮤니티 관리", href: "/community", icon: Users },
  { name: "채널 설정", href: "/channel-settings", icon: Settings },
  { name: "정산", href: "/settlement", icon: Calculator },
  { name: "분석", href: "/analytics", icon: BarChart3 },
  { name: "알림", href: "/notifications", icon: Bell },
  { name: "고급 설정", href: "/advanced-settings", icon: Cog },
]
