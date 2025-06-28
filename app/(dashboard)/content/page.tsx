"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Upload, 
  Filter, 
  Grid3X3, 
  List, 
  MoreHorizontal,
  Edit3,
  Trash2,
  Plus,
  ArrowUpDown,
  ChevronDown,
  Settings
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContentPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<any>(null)

  // 탭별 관리
  const [activeTab, setActiveTab] = useState("content")
  const [categories, setCategories] = useState([
    { id: "1", name: "VR 콘텐츠", order: 1, contentCount: 15 },
    { id: "2", name: "일반 영상", order: 2, contentCount: 8 },
    { id: "3", name: "오디오", order: 3, contentCount: 4 },
  ])
  const [playlists, setPlaylists] = useState([
    { id: "1", name: "인기 콘텐츠", order: 1, contentCount: 12 },
    { id: "2", name: "신작 모음", order: 2, contentCount: 6 },
    { id: "3", name: "VR 체험관", order: 3, contentCount: 9 },
  ])

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedItems(contentList.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
      setSelectAll(false)
    }
  }

  const handleEdit = (content: any) => {
    setEditingContent(content)
    setEditDialogOpen(true)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
  }

  const handleBulkEdit = () => {
    if (selectedItems.length > 0) {
      setEditDialogOpen(true)
    }
  }

  const handleBulkDelete = () => {
    if (selectedItems.length > 0) {
      setDeleteDialogOpen(true)
    }
  }

  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된순" },
    { value: "views", label: "조회수순" },
    { value: "likes", label: "좋아요순" },
    { value: "comments", label: "댓글순" },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">콘텐츠 관리</h1>
          <p className="text-muted-foreground">업로드된 콘텐츠를 관리하고 편집하세요.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Upload className="mr-2 h-4 w-4" />
          업로드
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">콘텐츠</TabsTrigger>
          <TabsTrigger value="categories">카테고리 관리</TabsTrigger>
          <TabsTrigger value="playlists">플레이리스트 관리</TabsTrigger>
        </TabsList>

        {/* 콘텐츠 탭 */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* 검색 */}
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="콘텐츠 검색..." className="h-9" />
                </div>

                {/* 오른쪽 컨트롤들 */}
                <div className="flex items-center gap-2 ml-auto">
                  {/* 정렬 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        {sortOptions.find(opt => opt.value === sortBy)?.label}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {sortOptions.map(option => (
                        <DropdownMenuItem 
                          key={option.value}
                          onClick={() => setSortBy(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* 필터 */}
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    필터
                  </Button>

                  {/* 뷰 모드 */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* 선택된 아이템이 있을 때 일괄 작업 버튼들 */}
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
                  <span className="text-sm text-muted-foreground">
                    {selectedItems.length}개 선택됨
                  </span>
                  <div className="flex gap-2 ml-auto">
                    <Button size="sm" variant="outline" onClick={handleBulkEdit}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      편집
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleBulkDelete}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="p-0 overflow-auto">
              {viewMode === "list" ? (
                <div className="w-full min-w-[800px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input 
                            type="checkbox" 
                            className="rounded" 
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </TableHead>
                        <TableHead>콘텐츠</TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>멤버십</TableHead>
                        <TableHead>업로드 날짜</TableHead>
                        <TableHead>게시 날짜</TableHead>
                        <TableHead>조회수</TableHead>
                        <TableHead>좋아요</TableHead>
                        <TableHead>댓글</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentList.map((content) => (
                        <TableRow key={content.id}>
                          <TableCell>
                            <input 
                              type="checkbox" 
                              className="rounded" 
                              checked={selectedItems.includes(content.id)}
                              onChange={(e) => handleSelectItem(content.id, e.target.checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-12 bg-muted rounded overflow-hidden">
                                <img
                                  src={content.thumbnail || "/placeholder.svg"}
                                  alt={content.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{content.title}</p>
                                <p className="text-sm text-muted-foreground">{content.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{content.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={content.membership === "무료 회원" ? "secondary" : "default"}>
                              {content.membership}
                            </Badge>
                          </TableCell>
                          <TableCell>{content.uploadDate}</TableCell>
                          <TableCell>{content.publishDate}</TableCell>
                          <TableCell>{content.views.toLocaleString()}</TableCell>
                          <TableCell>{content.likes}</TableCell>
                          <TableCell>{content.comments}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(content)}>
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  편집
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  삭제
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                // 그리드 뷰
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                  {contentList.map((content) => (
                    <Card key={content.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <div className="relative">
                        <div className="absolute top-2 left-2 z-10">
                          <input 
                            type="checkbox" 
                            className="rounded bg-white/80" 
                            checked={selectedItems.includes(content.id)}
                            onChange={(e) => handleSelectItem(content.id, e.target.checked)}
                          />
                        </div>
                        <div className="w-full h-32 bg-muted rounded-t overflow-hidden">
                          <img
                            src={content.thumbnail || "/placeholder.svg"}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{content.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <Badge variant="outline" className="text-xs">{content.type}</Badge>
                          <span className="text-muted-foreground">{content.views.toLocaleString()} 조회</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 카테고리 관리 탭 */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">카테고리 관리</h3>
              <p className="text-sm text-muted-foreground">콘텐츠 분류를 위한 카테고리를 관리하세요.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              카테고리 추가
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>카테고리명</TableHead>
                    <TableHead>순서</TableHead>
                    <TableHead>콘텐츠 수</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.order}</TableCell>
                      <TableCell>{category.contentCount}개</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              편집
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUpDown className="h-4 w-4 mr-2" />
                              순서 변경
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="h-4 w-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 플레이리스트 관리 탭 */}
        <TabsContent value="playlists" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">플레이리스트 관리</h3>
              <p className="text-sm text-muted-foreground">관련 콘텐츠를 묶어서 관리하세요.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              플레이리스트 추가
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>플레이리스트명</TableHead>
                    <TableHead>순서</TableHead>
                    <TableHead>콘텐츠 수</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playlists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell className="font-medium">{playlist.name}</TableCell>
                      <TableCell>{playlist.order}</TableCell>
                      <TableCell>{playlist.contentCount}개</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit3 className="h-4 w-4 mr-2" />
                              편집
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUpDown className="h-4 w-4 mr-2" />
                              순서 변경
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="h-4 w-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 편집 다이얼로그 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedItems.length > 1 ? `${selectedItems.length}개 콘텐츠 편집` : "콘텐츠 편집"}
            </DialogTitle>
            <DialogDescription>
              선택한 콘텐츠의 설정을 수정합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="public-toggle">공개 범위</Label>
              <Switch id="public-toggle" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="comment-toggle">댓글 허용</Label>
              <Switch id="comment-toggle" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vr">VR 콘텐츠</SelectItem>
                  <SelectItem value="video">일반 영상</SelectItem>
                  <SelectItem value="audio">오디오</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="membership">멤버십</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="멤버십 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">무료 회원</SelectItem>
                  <SelectItem value="basic">베이직</SelectItem>
                  <SelectItem value="premium">프리미엄</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>
              편집
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>콘텐츠 삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedItems.length > 1 
                ? `선택한 ${selectedItems.length}개 콘텐츠를 삭제하시겠습니까?` 
                : "선택한 콘텐츠를 삭제하시겠습니까?"
              } 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

const contentList = [
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
    type: "일般 이미지",
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
]