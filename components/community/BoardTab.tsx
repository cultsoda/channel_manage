"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Pin, 
  Eye,
  MessageSquare,
  Vote,
  Megaphone,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react"

// 게시글 타입 정의
export interface BoardPost {
  id: string
  title: string
  content: string
  type: 'announcement' | 'poll' | 'general'
  author: string
  date: string
  views: number
  comments: number
  isImportant?: boolean
  isPinned?: boolean
  isPublished: boolean
  targetAudience: 'all' | 'premium' | 'gold' | 'platinum' | 'diamond'
  pollData?: {
    question: string
    options: Array<{
      id: string
      text: string
      votes: number
    }>
    endDate: string
    multipleChoice: boolean
  }
}

// 목업 데이터
const mockPosts: BoardPost[] = [
  {
    id: "post-1",
    title: "7월 XR 팬미팅 일정 공지",
    content: "안녕하세요 팬여러분! 7월 15일 저녁 8시에 XR 팬미팅을 진행할 예정입니다...",
    type: "announcement",
    author: "관리자",
    date: "2024.06.29",
    views: 1847,
    comments: 23,
    isImportant: true,
    isPinned: true,
    isPublished: true,
    targetAudience: "all"
  },
  {
    id: "post-2", 
    title: "다음 VROOK 콘텐츠 컨셉 투표",
    content: "다음에 제작할 VROOK 콘텐츠의 컨셉을 정해주세요!",
    type: "poll",
    author: "케인",
    date: "2024.06.28",
    views: 956,
    comments: 12,
    isPublished: true,
    targetAudience: "premium",
    pollData: {
      question: "어떤 컨셉의 VROOK을 원하시나요?",
      options: [
        { id: "opt1", text: "우아한 드레스 컨셉", votes: 245 },
        { id: "opt2", text: "캐주얼 데일리 컨셉", votes: 189 },
        { id: "opt3", text: "스포티 액티브 컨셉", votes: 156 },
        { id: "opt4", text: "빈티지 레트로 컨셉", votes: 87 }
      ],
      endDate: "2024.07.05",
      multipleChoice: false
    }
  },
  {
    id: "post-3",
    title: "팬분들께 감사 인사",
    content: "구독자 1000명 돌파 기념으로 감사 인사드립니다! 앞으로도 좋은 콘텐츠로...",
    type: "general",
    author: "케인", 
    date: "2024.06.27",
    views: 2156,
    comments: 89,
    isPublished: true,
    targetAudience: "all"
  }
]

export default function BoardTab() {
  const [posts, setPosts] = useState<BoardPost[]>(mockPosts)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BoardPost | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterAudience, setFilterAudience] = useState<string>("all")

  // 게시글 작성 폼 상태
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "general" as BoardPost['type'],
    targetAudience: "all" as BoardPost['targetAudience'],
    isImportant: false,
    isPinned: false,
    isPublished: true,
    pollData: {
      question: "",
      options: [{ id: "1", text: "" }, { id: "2", text: "" }],
      endDate: "",
      multipleChoice: false
    }
  })

  // 필터링된 게시글
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || post.type === filterType
    const matchesAudience = filterAudience === "all" || post.targetAudience === filterAudience
    
    return matchesSearch && matchesType && matchesAudience
  })

  // 게시글 타입별 아이콘 및 색상
  const getPostTypeInfo = (type: BoardPost['type']) => {
    switch (type) {
      case 'announcement':
        return { icon: Megaphone, label: '공지사항', color: 'text-red-600', bgColor: 'bg-red-50' }
      case 'poll':
        return { icon: Vote, label: '투표', color: 'text-blue-600', bgColor: 'bg-blue-50' }
      case 'general':
        return { icon: MessageSquare, label: '일반', color: 'text-gray-600', bgColor: 'bg-gray-50' }
    }
  }

  // 타겟 오디언스 정보
  const getAudienceInfo = (audience: BoardPost['targetAudience']) => {
    switch (audience) {
      case 'all':
        return { label: '전체', color: 'bg-gray-100 text-gray-800' }
      case 'premium':
        return { label: '프리미엄+', color: 'bg-blue-100 text-blue-800' }
      case 'gold':
        return { label: '골드+', color: 'bg-yellow-100 text-yellow-800' }
      case 'platinum':
        return { label: '플래티넘+', color: 'bg-purple-100 text-purple-800' }
      case 'diamond':
        return { label: '다이아몬드', color: 'bg-pink-100 text-pink-800' }
    }
  }

  // 게시글 삭제
  const handleDeletePost = (postId: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  // 게시글 고정/해제
  const handleTogglePin = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isPinned: !post.isPinned } : post
    ))
  }

  // 게시글 발행/비공개
  const handleTogglePublish = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isPublished: !post.isPublished } : post
    ))
  }

  // 폼 초기화
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "general",
      targetAudience: "all",
      isImportant: false,
      isPinned: false,
      isPublished: true,
      pollData: {
        question: "",
        options: [{ id: "1", text: "" }, { id: "2", text: "" }],
        endDate: "",
        multipleChoice: false
      }
    })
  }

  // 모달 열기/닫기
  const handleOpenCreateModal = () => {
    resetForm()
    setEditingPost(null)
    setIsCreateModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsCreateModalOpen(false)
    setEditingPost(null)
    resetForm()
  }

  // 투표 옵션 추가/제거
  const addPollOption = () => {
    const newId = (formData.pollData.options.length + 1).toString()
    setFormData({
      ...formData,
      pollData: {
        ...formData.pollData,
        options: [...formData.pollData.options, { id: newId, text: "" }]
      }
    })
  }

  const removePollOption = (optionId: string) => {
    if (formData.pollData.options.length <= 2) return // 최소 2개 옵션 유지
    setFormData({
      ...formData,
      pollData: {
        ...formData.pollData,
        options: formData.pollData.options.filter(option => option.id !== optionId)
      }
    })
  }

  const updatePollOption = (optionId: string, text: string) => {
    setFormData({
      ...formData,
      pollData: {
        ...formData.pollData,
        options: formData.pollData.options.map(option =>
          option.id === optionId ? { ...option, text } : option
        )
      }
    })
  }

  // 게시글 저장
  const handleSavePost = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    if (formData.type === 'poll') {
      if (!formData.pollData.question.trim()) {
        alert('투표 질문을 입력해주세요.')
        return
      }
      const validOptions = formData.pollData.options.filter(opt => opt.text.trim())
      if (validOptions.length < 2) {
        alert('투표 옵션을 최소 2개 이상 입력해주세요.')
        return
      }
    }

    const newPost: BoardPost = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      type: formData.type,
      author: editingPost ? editingPost.author : "관리자",
      date: editingPost ? editingPost.date : new Date().toLocaleDateString('ko-KR'),
      views: editingPost ? editingPost.views : 0,
      comments: editingPost ? editingPost.comments : 0,
      isImportant: formData.isImportant,
      isPinned: formData.isPinned,
      isPublished: formData.isPublished,
      targetAudience: formData.targetAudience,
      pollData: formData.type === 'poll' ? {
        ...formData.pollData,
        options: formData.pollData.options
          .filter(opt => opt.text.trim())
          .map(opt => ({ ...opt, votes: editingPost?.pollData?.options.find(o => o.id === opt.id)?.votes || 0 }))
      } : undefined
    }

    if (editingPost) {
      setPosts(posts.map(post => post.id === editingPost.id ? newPost : post))
    } else {
      setPosts([newPost, ...posts])
    }

    handleCloseModal()
  }

  // 편집 모드로 폼 채우기
  const handleEditPost = (post: BoardPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      type: post.type,
      targetAudience: post.targetAudience,
      isImportant: post.isImportant || false,
      isPinned: post.isPinned || false,
      isPublished: post.isPublished,
      pollData: post.pollData || {
        question: "",
        options: [{ id: "1", text: "" }, { id: "2", text: "" }],
        endDate: "",
        multipleChoice: false
      }
    })
    setEditingPost(post)
    setIsCreateModalOpen(true)
  }

  const renderPostsList = () => (
    <div className="space-y-4">
      {filteredPosts
        .sort((a, b) => {
          // 고정된 글이 먼저 오도록 정렬
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          // 그 다음은 날짜순
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        .map((post) => {
          const typeInfo = getPostTypeInfo(post.type)
          const audienceInfo = getAudienceInfo(post.targetAudience)
          const TypeIcon = typeInfo.icon

          return (
            <Card key={post.id} className={`${!post.isPublished ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.isPinned && (
                        <Pin className="h-4 w-4 text-orange-500" />
                      )}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${typeInfo.bgColor} ${typeInfo.color}`}>
                        <TypeIcon className="h-3 w-3" />
                        <span>{typeInfo.label}</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${audienceInfo.color}`}>
                        {audienceInfo.label}
                      </Badge>
                      {post.isImportant && (
                        <Badge variant="destructive" className="text-xs">중요</Badge>
                      )}
                      {!post.isPublished && (
                        <Badge variant="secondary" className="text-xs">비공개</Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>작성자: {post.author}</span>
                      <span>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditPost(post)}>
                        <Edit className="h-4 w-4 mr-2" />
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePin(post.id)}>
                        <Pin className="h-4 w-4 mr-2" />
                        {post.isPinned ? '고정 해제' : '고정'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePublish(post.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {post.isPublished ? '비공개' : '발행'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
    </div>
  )

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Megaphone className="h-5 w-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-600">
            {posts.filter(p => p.type === 'announcement').length}
          </div>
          <div className="text-sm text-gray-600">공지사항</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Vote className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {posts.filter(p => p.type === 'poll').length}
          </div>
          <div className="text-sm text-gray-600">투표</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <MessageSquare className="h-5 w-5 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-600">
            {posts.filter(p => p.type === 'general').length}
          </div>
          <div className="text-sm text-gray-600">일반 게시글</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">총 조회수</div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">게시판 관리</h2>
          <p className="text-gray-600">공지사항, 투표, 일반 게시글을 작성하고 관리하세요.</p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          새 게시글 작성
        </Button>
      </div>

      {/* 통계 */}
      {renderStats()}

      {/* 검색 및 필터 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="제목이나 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="타입 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 타입</SelectItem>
            <SelectItem value="announcement">공지사항</SelectItem>
            <SelectItem value="poll">투표</SelectItem>
            <SelectItem value="general">일반 게시글</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAudience} onValueChange={setFilterAudience}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="대상 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 대상</SelectItem>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="premium">프리미엄+</SelectItem>
            <SelectItem value="gold">골드+</SelectItem>
            <SelectItem value="platinum">플래티넘+</SelectItem>
            <SelectItem value="diamond">다이아몬드</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 게시글 목록 */}
      {renderPostsList()}

      {/* 빈 상태 */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">게시글이 없습니다</h3>
          <p className="text-gray-500 mb-4">첫 번째 게시글을 작성해보세요!</p>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            게시글 작성
          </Button>
        </div>
      )}
      {/* 게시글 작성/편집 모달 */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                {editingPost ? '게시글 수정' : '새 게시글 작성'}
              </h2>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* 게시글 타입 선택 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">게시글 타입</label>
              <Select 
                value={formData.type} 
                onValueChange={(value: BoardPost['type']) => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반 게시글</SelectItem>
                  <SelectItem value="announcement">공지사항</SelectItem>
                  <SelectItem value="poll">투표</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 제목 */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">제목</label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="게시글 제목을 입력하세요"
              />
            </div>

            {/* 투표인 경우 투표 질문 */}
            {formData.type === 'poll' && (
              <div className="space-y-2">
                <label htmlFor="poll-question" className="text-sm font-medium">투표 질문</label>
                <Input
                  id="poll-question"
                  value={formData.pollData.question}
                  onChange={(e) => setFormData({
                    ...formData,
                    pollData: { ...formData.pollData, question: e.target.value }
                  })}
                  placeholder="투표에서 묻고 싶은 질문을 입력하세요"
                />
              </div>
            )}

            {/* 내용 */}
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">내용</label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={
                  formData.type === 'announcement' 
                    ? '중요한 공지사항 내용을 작성하세요'
                    : formData.type === 'poll'
                    ? '투표에 대한 설명을 작성하세요'
                    : '게시글 내용을 작성하세요'
                }
                rows={6}
              />
            </div>

            {/* 투표 옵션 (투표인 경우만) */}
            {formData.type === 'poll' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">투표 옵션</label>
                  <Button type="button" variant="outline" size="sm" onClick={addPollOption}>
                    <Plus className="h-4 w-4 mr-1" />
                    옵션 추가
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formData.pollData.options.map((option, index) => (
                    <div key={option.id} className="flex gap-2">
                      <Input
                        value={option.text}
                        onChange={(e) => updatePollOption(option.id, e.target.value)}
                        placeholder={`옵션 ${index + 1}`}
                      />
                      {formData.pollData.options.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePollOption(option.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="poll-end-date" className="text-sm font-medium">투표 마감일</label>
                    <Input
                      id="poll-end-date"
                      type="date"
                      value={formData.pollData.endDate}
                      onChange={(e) => setFormData({
                        ...formData,
                        pollData: { ...formData.pollData, endDate: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">투표 타입</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="multiple-choice"
                        checked={formData.pollData.multipleChoice}
                        onCheckedChange={(checked: boolean) => setFormData({
                          ...formData,
                          pollData: { ...formData.pollData, multipleChoice: checked }
                        })}
                      />
                      <label htmlFor="multiple-choice" className="text-sm">복수 선택 허용</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 대상 설정 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">공개 대상</label>
              <Select 
                value={formData.targetAudience} 
                onValueChange={(value: BoardPost['targetAudience']) => 
                  setFormData({ ...formData, targetAudience: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 팬</SelectItem>
                  <SelectItem value="premium">프리미엄 이상</SelectItem>
                  <SelectItem value="gold">골드 이상</SelectItem>
                  <SelectItem value="platinum">플래티넘 이상</SelectItem>
                  <SelectItem value="diamond">다이아몬드 전용</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 추가 옵션 */}
            <div className="space-y-4">
              <label className="text-sm font-medium">추가 설정</label>
              <div className="space-y-3">
                {formData.type === 'announcement' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="important"
                      checked={formData.isImportant}
                      onCheckedChange={(checked: boolean) => setFormData({ ...formData, isImportant: checked })}
                    />
                    <label htmlFor="important" className="text-sm">중요 공지사항</label>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pinned"
                    checked={formData.isPinned}
                    onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPinned: checked })}
                  />
                  <label htmlFor="pinned" className="text-sm">상단 고정</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="published"
                    checked={formData.isPublished}
                    onCheckedChange={(checked: boolean) => setFormData({ ...formData, isPublished: checked })}
                  />
                  <label htmlFor="published" className="text-sm">즉시 발행</label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              취소
            </Button>
            <Button onClick={handleSavePost}>
              {editingPost ? '수정 완료' : '게시글 작성'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}