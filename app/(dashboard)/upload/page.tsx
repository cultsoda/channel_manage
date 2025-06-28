"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  Upload, 
  FileVideo, 
  FileAudio, 
  FileImage, 
  Globe,
  Check,
  X,
  AlertCircle,
  Camera
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type ContentType = "vr-video" | "normal-video" | "normal-image" | "xr-tour" | null
type UploadStep = "type-selection" | "file-upload" | "content-settings"

export default function ContentUploadPage() {
  const [currentStep, setCurrentStep] = useState<UploadStep>("type-selection")
  const [selectedType, setSelectedType] = useState<ContentType>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // 폼 데이터
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null as File | null,
    tags: "",
    category: "",
    playlist: "",
    publicScope: "all", // all, membership
    scheduledPublish: false,
    publishDate: "",
    publishTime: "",
    isPublic: true,
    allowComments: true,
    // VR 전용 설정
    vrFormat: "360",
    // 일반 영상 전용 설정
    videoQuality: "auto",
  })

  // 카테고리와 플레이리스트 데이터 (실제로는 props나 API에서 가져와야 함)
  const categories = [
    { id: "1", name: "VR 콘텐츠" },
    { id: "2", name: "일반 영상" },
    { id: "3", name: "오디오" },
  ]

  const playlists = [
    { id: "1", name: "인기 콘텐츠" },
    { id: "2", name: "신작 모음" },
    { id: "3", name: "VR 체험관" },
  ]

  const contentTypes = [
    {
      id: "vr-video" as ContentType,
      title: "VR 영상 업로드",
      description: "180°, 360° 영상을 공유해 보세요.",
      icon: <div className="text-2xl">🥽</div>,
      maxSize: "30GB",
      formats: "mp4, mov"
    },
    {
      id: "normal-video" as ContentType,
      title: "일반 영상 업로드",
      description: "일반 영상을 공유해 보세요.",
      icon: <FileVideo className="h-8 w-8" />,
      maxSize: "10GB",
      formats: "mp4, mov, avi"
    },
    {
      id: "normal-image" as ContentType,
      title: "일반 이미지 업로드",
      description: "일반 이미지를 공유해 보세요.",
      icon: <FileImage className="h-8 w-8" />,
      maxSize: "50MB",
      formats: "jpg, jpeg, png, webp"
    },
    {
      id: "xr-tour" as ContentType,
      title: "웹 주소(URL) 업로드",
      description: "호스팅된 XR 콘텐츠를 공유해 보세요.",
      icon: <Globe className="h-8 w-8" />,
      maxSize: "-",
      formats: "URL"
    }
  ]

  const handleTypeSelect = (type: ContentType) => {
    setSelectedType(type)
    setCurrentStep("file-upload")
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    
    // 파일 업로드 시뮬레이션
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setTimeout(() => setCurrentStep("content-settings"), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const handleBack = () => {
    if (currentStep === "file-upload") {
      setCurrentStep("type-selection")
      setSelectedType(null)
      setUploadProgress(0)
      setUploadedFile(null)
    } else if (currentStep === "content-settings") {
      setCurrentStep("file-upload")
      setUploadProgress(0)
      setUploadedFile(null)
    }
  }

  const handleSubmit = () => {
    // 여기서 실제 업로드 처리
    console.log("업로드 완료:", { selectedType, uploadedFile, formData })
    // 성공 후 콘텐츠 관리 페이지로 이동
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case "type-selection": return 1
      case "file-upload": return 2
      case "content-settings": return 3
      default: return 1
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-4">
        <Link href="/content">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">콘텐츠 업로드</h1>
          <p className="text-muted-foreground">새로운 콘텐츠를 업로드하고 설정하세요.</p>
        </div>
      </div>

      {/* 진행 상태 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepNumber() >= 1 ? 'bg-orange-500 text-white' : 'bg-muted'}`}>
                {getStepNumber() > 1 ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">유형 선택</span>
            </div>
            <div className="flex-1 h-2 mx-4 bg-muted rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((getStepNumber() - 1) * 50, 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepNumber() >= 2 ? 'bg-orange-500 text-white' : 'bg-muted'}`}>
                {getStepNumber() > 2 ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">파일 업로드</span>
            </div>
            <div className="flex-1 h-2 mx-4 bg-muted rounded-full">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-300" 
                style={{ width: `${Math.max((getStepNumber() - 2) * 100, 0)}%` }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getStepNumber() >= 3 ? 'bg-orange-500 text-white' : 'bg-muted'}`}>
                3
              </div>
              <span className="text-sm font-medium">설정 완료</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 단계별 내용 */}
      {currentStep === "type-selection" && (
        <Card>
          <CardHeader>
            <CardTitle>업로드 콘텐츠 유형 선택</CardTitle>
            <p className="text-sm text-muted-foreground">
              모든 유형의 콘텐츠 업로드는 <span className="text-red-500 font-medium">무료</span>입니다. 
              당신의 콘텐츠를 쉽러보세요!
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {contentTypes.map((type) => (
              <Card 
                key={type.id} 
                className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-orange-200"
                onClick={() => handleTypeSelect(type.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {type.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>권장 사이즈: 최대 {type.maxSize}</p>
                    <p>파일 형식: {type.formats}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {currentStep === "file-upload" && selectedType && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              <div>
                <CardTitle>
                  {contentTypes.find(t => t.id === selectedType)?.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  파일을 드래그 앤 드롭하거나 파일 선택 버튼을 클릭하세요
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!isUploading && !uploadedFile && (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-2">
                      파일을 드래그 앤 드롭하여 업로드
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      또는, 업로드 버튼을 클릭해 파일 선택하기
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground mb-4">
                      <Badge variant="outline">
                        권장 사이즈: 최대 {contentTypes.find(t => t.id === selectedType)?.maxSize}
                      </Badge>
                      <Badge variant="outline">
                        파일 형식: {contentTypes.find(t => t.id === selectedType)?.formats}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = selectedType === 'normal-image' ? 'image/*' : 'video/*'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) handleFileUpload(file)
                      }
                      input.click()
                    }}
                  >
                    파일 선택
                  </Button>
                </div>
              </div>
            )}

            {isUploading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-orange-500 animate-pulse" />
                </div>
                <h3 className="text-lg font-medium mb-2">업로드 중...</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  파일 업로드가 진행 중입니다. 잠시만 기다려주세요.
                </p>
                <div className="max-w-md mx-auto">
                  <Progress value={uploadProgress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {uploadProgress.toFixed(0)}% 완료
                  </p>
                </div>
              </div>
            )}

            {uploadedFile && !isUploading && uploadProgress === 100 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">업로드 완료!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  파일: {uploadedFile.name}
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  복합첨부를 재처리 상태 조건 편인 참고 더 차단해야 한 한정식 정보 보존 관리를
                  참여해서는 한 편입니다.
                </p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => setCurrentStep("content-settings")}
                >
                  다음 단계로
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === "content-settings" && selectedType && (
        <div className="space-y-6">
          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  이전
                </Button>
                <CardTitle>콘텐츠 정보 설정</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  콘텐츠 제목 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="콘텐츠 제목을 입력하세요"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  maxLength={50}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>콘텐츠의 제목을 입력해주세요</span>
                  <span>{formData.title.length} / 50</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  placeholder="콘텐츠 설명을 입력하세요"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  maxLength={1000}
                  rows={4}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>콘텐츠에 대한 자세한 설명을 작성해주세요</span>
                  <span>{formData.description.length} / 1000</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">태그</Label>
                <Input
                  id="tags"
                  placeholder="태그를 입력하세요 (쉼표로 구분)"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  검색 및 분류를 위한 태그를 입력해주세요 (예: VR, 게임, 체험)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playlist">플레이리스트</Label>
                  <Select value={formData.playlist} onValueChange={(value) => setFormData({...formData, playlist: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="플레이리스트를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {playlists.map((playlist) => (
                        <SelectItem key={playlist.id} value={playlist.id}>
                          {playlist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>
                  썸네일 <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  저장 썸네일은 이미지에서만 썸네일 용으로 제공된 보세요
                </p>
                <div className="grid grid-cols-6 gap-3">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:border-orange-200">
                    <Camera className="h-6 w-6 text-muted-foreground" />
                  </div>
                  {/* 썸네일 미리보기 */}
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="border rounded-lg aspect-square bg-muted/30 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg" />
                      {i === 2 && (
                        <div className="absolute top-1 right-1">
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 권장 사이즈: 1280x720px</p>
                  <p>• 권장 크기: 5MB이하의 이미지 파일 권장</p>
                  <p>• 지원 형식: JPG, JPEG, PNG, WEBP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 고급 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>고급 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="format">콘텐츠 포맷</Label>
                <Select value={formData.vrFormat} onValueChange={(value) => setFormData({...formData, vrFormat: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mono">Mono</SelectItem>
                    <SelectItem value="stereo">Stereo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedType === "vr-video" && (
                <div className="space-y-2">
                  <Label>콘텐츠 화각</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="angle" 
                        value="360" 
                        checked={formData.vrFormat === "360"}
                        onChange={(e) => setFormData({...formData, vrFormat: e.target.value})}
                      />
                      <span>360°</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="angle" 
                        value="180" 
                        checked={formData.vrFormat === "180"}
                        onChange={(e) => setFormData({...formData, vrFormat: e.target.value})}
                      />
                      <span>180°</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>공개 설정</Label>
                    <p className="text-sm text-muted-foreground">
                      팬들이 콘텐츠를 볼 수 있는지 설정
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>댓글 설정</Label>
                    <p className="text-sm text-muted-foreground">
                      팬들이 댓글을 남길 수 있는지 설정
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => setFormData({...formData, allowComments: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>공개 범위 설정</Label>
                  <Select value={formData.publicScope} onValueChange={(value) => setFormData({...formData, publicScope: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 공개</SelectItem>
                      <SelectItem value="membership">멤버십 전용</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>예약 발행</Label>
                      <p className="text-sm text-muted-foreground">
                        특정 시간에 자동으로 콘텐츠 공개
                      </p>
                    </div>
                    <Switch
                      checked={formData.scheduledPublish}
                      onCheckedChange={(checked) => setFormData({...formData, scheduledPublish: checked})}
                    />
                  </div>

                  {formData.scheduledPublish && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="publish-date">발행 날짜</Label>
                        <Input
                          id="publish-date"
                          type="date"
                          value={formData.publishDate}
                          onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="publish-time">발행 시간</Label>
                        <Input
                          id="publish-time"
                          type="time"
                          value={formData.publishTime}
                          onChange={(e) => setFormData({...formData, publishTime: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 업로드 버튼 */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              취소
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSubmit}
              disabled={!formData.title.trim()}
            >
              업로드
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}