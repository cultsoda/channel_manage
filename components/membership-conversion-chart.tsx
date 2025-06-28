"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function MembershipConversionChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={conversionData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            formatter={(value) => [`${value}%`, "전환율"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Line
            type="monotone"
            dataKey="conversionRate"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ fill: "#ff7300", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const conversionData = [
  { month: "1월", conversionRate: 12.5 },
  { month: "2월", conversionRate: 15.2 },
  { month: "3월", conversionRate: 18.7 },
  { month: "4월", conversionRate: 22.1 },
  { month: "5월", conversionRate: 19.8 },
  { month: "6월", conversionRate: 25.3 },
  { month: "7월", conversionRate: 28.9 },
  { month: "8월", conversionRate: 26.6 },
  { month: "9월", conversionRate: 31.2 },
  { month: "10월", conversionRate: 29.8 },
  { month: "11월", conversionRate: 33.5 },
  { month: "12월", conversionRate: 35.7 },
]
