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

interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  contentCount: number
}

interface CategoryManagementTabProps {
  categories: Category[]
  setCategories: (categories: Category[]) => void
}

export function CategoryManagementTab({ categories, setCategories }: CategoryManagementTabProps) {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "📁",
    color: "#3b82f6"
  })

  const iconOptions = ["📁", "🥽", "🎬", "🎵", "🎮", "📸", "🎭", "🎨", "⭐", "🔥"]

  const handleAddCategory = () => {
    const maxOrder = Math.max(...categories.map(c => c.order), 0)
    const newCat = {
      id: Date.now().toString(),
      ...newCategory,
      order: maxOrder + 1,
      contentCount: 0
    }
    setCategories([...categories, newCat])
    setCategoryModalOpen(false)
    setNewCategory({ name: "", description: "", icon: "📁", color: "#3b82f6" })
  }

  const moveCategoryOrder = (id: string, direction: "up" | "down") => {
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order)
    const currentIndex = sortedCategories.findIndex(c => c.id === id)
    
    if (direction === "up" && currentIndex > 0) {
      const temp = sortedCategories[currentIndex].order
      sortedCategories[currentIndex].order = sortedCategories[currentIndex - 1].order
      sortedCategories[currentIndex - 1].order = temp
    } else if (direction === "down" && currentIndex < sortedCategories.length - 1) {
      const temp = sortedCategories[currentIndex].order
      sortedCategories[currentIndex].order = sortedCategories[currentIndex + 1].order
      sortedCategories[currentIndex + 1].order = temp
    }
    
    setCategories(sortedCategories)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">카테고리 관리</h3>
          <p className="text-sm text-muted-foreground">콘텐츠 분류를 위한 카테고리를 관리하세요.</p>
        </div>
        <Button onClick={() => setCategoryModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          카테고리 추가
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>카테고리</TableHead>
                <TableHead>설명</TableHead>
                <TableHead>순서</TableHead>
                <TableHead>콘텐츠 수</TableHead>
                <TableHead className="text-right">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories
                .sort((a, b) => a.order - b.order)
                .map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{category.order}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => moveCategoryOrder(category.id, "up")}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => moveCategoryOrder(category.id, "down")}
                          disabled={index === categories.length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
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

      {/* 카테고리 추가 모달 */}
      <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>새 카테고리 추가</DialogTitle>
            <DialogDescription>
              콘텐츠 분류를 위한 새 카테고리를 생성합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">카테고리명 *</Label>
              <Input
                id="category-name"
                placeholder="카테고리명을 입력하세요"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-description">설명</Label>
              <Input
                id="category-description"
                placeholder="카테고리 설명을 입력하세요"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>아이콘 선택</Label>
              <div className="grid grid-cols-5 gap-2">
                {iconOptions.map((icon) => (
                  <Button
                    key={icon}
                    variant={newCategory.icon === icon ? "default" : "outline"}
                    className="h-10 w-10 p-0"
                    onClick={() => setNewCategory({...newCategory, icon})}
                  >
                    {icon}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-color">색상</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="category-color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  className="w-10 h-10 rounded border"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryModalOpen(false)}>
              취소
            </Button>
            <Button 
              onClick={handleAddCategory}
              disabled={!newCategory.name.trim()}
            >
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}