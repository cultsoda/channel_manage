"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Button } from "@/components/ui/button"

export function ContentComparisonChart() {
  const [mounted, setMounted] = useState(false)
  const [selectedContents, setSelectedContents] = useState<string[]>([])
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const contentList = [
    { id: "1", title: "단건구매콘텐츠", views: 2, likes: 0, comments: 0 },
    { id: "2", title: "단건구매의 왕버섯", views: 19, likes: 3, comments: 1 },
    { id: "3", title: "butterfly 복사본", views: 9, likes: 1, comments: 0 },
    { id: "4", title: "새우깡의 감패기", views: 8, likes: 2, comments: 1 },
  ]

  const handleContentSelect = (contentId: string) => {
    if (selectedContents.includes(contentId)) {
      setSelectedContents(selectedContents.filter((id) => id !== contentId))
    } else if (selectedContents.length < 3) {
      setSelectedContents([...selectedContents, contentId])
    }
  }

  const generateChart = () => {
    const data = selectedContents.map((id) => {
      const content = contentList.find((c) => c.id === id)
      return {
        name: content?.title.substring(0, 10) + "...",
        조회수: content?.views || 0,
        좋아요: content?.likes || 0,
        댓글수: content?.comments || 0,
      }
    })
    setChartData(data)
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">콘텐츠 선택 (최대 3개)</p>
        <div className="grid grid-cols-1 gap-2">
          {contentList.map((content) => (
            <div key={content.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={content.id}
                checked={selectedContents.includes(content.id)}
                onChange={() => handleContentSelect(content.id)}
                disabled={!selectedContents.includes(content.id) && selectedContents.length >= 3}
                className="rounded"
              />
              <label htmlFor={content.id} className="text-sm">
                {content.title}
              </label>
            </div>
          ))}
        </div>
        <Button onClick={generateChart} disabled={selectedContents.length === 0} size="sm">
          비교 차트 생성
        </Button>
      </div>

      <div className="h-[250px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar dataKey="조회수" fill="#8884d8" />
              <Bar dataKey="좋아요" fill="#82ca9d" />
              <Bar dataKey="댓글수" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-muted/20 rounded-md">
            <p className="text-muted-foreground">콘텐츠를 선택하고 차트를 생성하세요</p>
          </div>
        )}
      </div>
    </div>
  )
}
