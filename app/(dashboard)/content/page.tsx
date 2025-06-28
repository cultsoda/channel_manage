"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import { ContentListTab } from "@/components/content/content-list-tab"
import { CategoryManagementTab } from "@/components/content/category-management-tab"
import { PlaylistManagementTab } from "@/components/content/playlist-management-tab"
import Link from "next/link"

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("content")
  
  // 더미 데이터
  const [contentList] = useState([
    {
      id: "1",
      title: "단건구매콘텐츠",
      description: "beetle-8320899_1280 복사본",
      type: "일반 이미지",
      membership: "무료 회원",
      uploadDate: "2025.04.28",
      publishDate: "2025.04.28",
      views: 2,
      likes: 0,
      comments: 0,
      thumbnail: "/placeholder.svg?height=48&width=64",
    },
    {
      id: "2",
      title: "단건구매의 왕버섯",
      description: "bird-8897237_1280 복사본",
      type: "일반 이미지",
      membership: "₩ 2,000",
      uploadDate: "2025.04.28",
      publishDate: "2025.04.28",
      views: 19,
      likes: 0,
      comments: 0,
      thumbnail: "/placeholder.svg?height=48&width=64",
    },
    {
      id: "3",
      title: "butterfly-8742569_1280 복사본",
      description: "butterfly-8742569_1280 복사본",
      type: "일반 이미지",
      membership: "₩ 2,000",
      uploadDate: "2025.04.03",
      publishDate: "2025.04.03",
      views: 9,
      likes: 0,
      comments: 0,
      thumbnail: "/placeholder.svg?height=48&width=64",
    },
    {
      id: "4",
      title: "새우깡의 감패기",
      description: "영상도 > 구름뜨기 기능 감패기에 새우깡을 넣어 기계 영상 영상",
      type: "전체 공개",
      membership: "전체 공개",
      uploadDate: "2025.03.07",
      publishDate: "2025.03.07",
      views: 8,
      likes: 0,
      comments: 0,
      thumbnail: "/placeholder.svg?height=48&width=64",
    },
  ])

  const [categories, setCategories] = useState([
    { id: "1", name: "VR 콘텐츠", description: "가상현실 관련 콘텐츠", icon: "🥽", color: "#3b82f6", order: 1, contentCount: 15 },
    { id: "2", name: "일반 영상", description: "일반 동영상 콘텐츠", icon: "🎬", color: "#10b981", order: 2, contentCount: 8 },
    { id: "3", name: "오디오", description: "음성 콘텐츠", icon: "🎵", color: "#f59e0b", order: 3, contentCount: 4 },
  ])

  const [playlists, setPlaylists] = useState([
    { id: "1", name: "인기 콘텐츠", description: "가장 인기 있는 콘텐츠 모음", thumbnail: null, isPublic: true, order: 1, contentCount: 12 },
    { id: "2", name: "신작 모음", description: "최신 업로드 콘텐츠", thumbnail: null, isPublic: true, order: 2, contentCount: 6 },
    { id: "3", name: "VR 체험관", description: "VR 전용 콘텐츠 모음", thumbnail: null, isPublic: false, order: 3, contentCount: 9 },
  ])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">콘텐츠 관리</h1>
          <p className="text-muted-foreground">업로드된 콘텐츠를 관리하고 편집하세요.</p>
        </div>
        <Link href="/upload">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Upload className="mr-2 h-4 w-4" />
            업로드
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">콘텐츠</TabsTrigger>
          <TabsTrigger value="categories">카테고리 관리</TabsTrigger>
          <TabsTrigger value="playlists">플레이리스트 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ContentListTab contentList={contentList} />
        </TabsContent>

        <TabsContent value="categories">
          <CategoryManagementTab 
            categories={categories} 
            setCategories={setCategories} 
          />
        </TabsContent>

        <TabsContent value="playlists">
          <PlaylistManagementTab 
            playlists={playlists} 
            setPlaylists={setPlaylists} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}