import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Upload, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ContentPage() {
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

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="콘텐츠 검색..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
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
                      <input type="checkbox" className="rounded" />
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
                      <Button variant="ghost" size="sm">
                        편집
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
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
]
