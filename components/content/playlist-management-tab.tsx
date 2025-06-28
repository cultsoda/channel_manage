"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Playlist {
  id: string
  name: string
  description: string
  thumbnail: string | null
  isPublic: boolean
  order: number
  contentCount: number
}

interface PlaylistManagementTabProps {
  playlists: Playlist[]
  setPlaylists: (playlists: Playlist[]) => void
}

export function PlaylistManagementTab({ playlists, setPlaylists }: PlaylistManagementTabProps) {
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false)
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    description: "",
    thumbnail: null,
    isPublic: true
  })

  const handleAddPlaylist = () => {
    const maxOrder = Math.max(...playlists.map(p => p.order), 0)
    const newPlay = {
      id: Date.now().toString(),
      ...newPlaylist,
      order: maxOrder + 1,
      contentCount: 0
    }
    setPlaylists([...playlists, newPlay])
    setPlaylistModalOpen(false)
    setNewPlaylist({ name: "", description: "", thumbnail: null, isPublic: true })
  }

  const movePlaylistOrder = (id: string, direction: "up" | "down") => {
    const sortedPlaylists = [...playlists].sort((a, b) => a.order - b.order)
    const currentIndex = sortedPlaylists.findIndex(p => p.id === id)
    
    if (direction === "up" && currentIndex > 0) {
      const temp = sortedPlaylists[currentIndex].order
      sortedPlaylists[currentIndex].order = sortedPlaylists[currentIndex - 1].order
      sortedPlaylists[currentIndex - 1].order = temp
    } else if (direction === "down" && currentIndex < sortedPlaylists.length - 1) {
      const temp = sortedPlaylists[currentIndex].order
      sortedPlaylists[currentIndex].order = sortedPlaylists[currentIndex + 1].order
      sortedPlaylists[currentIndex + 1].order = temp
    }
    
    setPlaylists(sortedPlaylists)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">플레이리스트 관리</h3>
          <p className="text-sm text-muted-foreground">관련 콘텐츠를 묶어서 관리하세요.</p>
        </div>
        <Button onClick={() => setPlaylistModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          플레이리스트 추가
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>플레이리스트</TableHead>
                <TableHead>설명</TableHead>
                <TableHead>공개 설정</TableHead>
                <TableHead>순서</TableHead>
                <TableHead>콘텐츠 수</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playlists
                .sort((a, b) => a.order - b.order)
                .map((playlist, index) => (
                <TableRow key={playlist.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-muted rounded overflow-hidden">
                        {playlist.thumbnail ? (
                          <img
                            src={playlist.thumbnail}
                            alt={playlist.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                        )}
                      </div>
                      <span className="font-medium">{playlist.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {playlist.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant={playlist.isPublic ? "default" : "secondary"}>
                      {playlist.isPublic ? "공개" : "비공개"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{playlist.order}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => movePlaylistOrder(playlist.id, "up")}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => movePlaylistOrder(playlist.id, "down")}
                          disabled={index === playlists.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
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

      {/* 플레이리스트 추가 모달 */}
      <Dialog open={playlistModalOpen} onOpenChange={setPlaylistModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>새 플레이리스트 추가</DialogTitle>
            <DialogDescription>
              관련 콘텐츠를 묶을 새 플레이리스트를 생성합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">플레이리스트명 *</Label>
              <Input
                id="playlist-name"
                placeholder="플레이리스트명을 입력하세요"
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playlist-description">설명</Label>
              <Input
                id="playlist-description"
                placeholder="플레이리스트 설명을 입력하세요"
                value={newPlaylist.description}
                onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playlist-thumbnail">썸네일 이미지</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  id="playlist-thumbnail"
                  accept="image/*"
                  className="flex-1"
                />
                <div className="w-12 h-8 bg-muted rounded overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">권장 크기: 16:9 비율</p>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="playlist-public">공개 설정</Label>
              <Switch
                id="playlist-public"
                checked={newPlaylist.isPublic}
                onCheckedChange={(checked) => setNewPlaylist({...newPlaylist, isPublic: checked})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlaylistModalOpen(false)}>
              취소
            </Button>
            <Button 
              onClick={handleAddPlaylist}
              disabled={!newPlaylist.name.trim()}
            >
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}