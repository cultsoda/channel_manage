"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

// 팬 수 추이 그래프
export function FanTrendChart() {
  const data = [
    { date: '1주전', fans: 1150 },
    { date: '6일전', fans: 1167 },
    { date: '5일전', fans: 1189 },
    { date: '4일전', fans: 1203 },
    { date: '3일전', fans: 1245 },
    { date: '2일전', fans: 1267 },
    { date: '1일전', fans: 1278 },
    { date: '오늘', fans: 1284 },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="fans" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// 멤버십 등급별 파이차트
export function MembershipPieChart() {
  const data = [
    { name: '무료', value: 942, color: '#e5e7eb' },
    { name: '베이직', value: 234, color: '#3b82f6' },
    { name: '프리미엄', value: 89, color: '#8b5cf6' },
    { name: 'VIP', value: 19, color: '#f59e0b' },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any, name: any) => [value + '명', name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// 지역별 차트
export function RegionChart() {
  const data = [
    { region: '한국', fans: 856 },
    { region: '일본', fans: 192 },
    { region: '미국', fans: 128 },
    { region: '기타', fans: 108 },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="fans" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// 접속 시간대 히트맵 (간단한 바 차트로 대체)
export function AccessTimeChart() {
  const data = [
    { time: '06:00', users: 45 },
    { time: '09:00', users: 89 },
    { time: '12:00', users: 156 },
    { time: '15:00', users: 203 },
    { time: '18:00', users: 312 },
    { time: '21:00', users: 456 },
    { time: '24:00', users: 234 },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="users" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// 조회수/좋아요 트렌드 차트
export function ContentPerformanceChart() {
  const data = [
    { date: '1주전', views: 4200, likes: 356 },
    { date: '6일전', views: 4567, likes: 389 },
    { date: '5일전', views: 5123, likes: 434 },
    { date: '4일전', views: 4890, likes: 412 },
    { date: '3일전', views: 6234, likes: 528 },
    { date: '2일전', views: 5678, likes: 481 },
    { date: '1일전', views: 6890, likes: 583 },
    { date: '오늘', views: 7234, likes: 612 },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="조회수" />
          <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} name="좋아요" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// 수익원별 파이차트
export function RevenuePieChart() {
  const data = [
    { name: '멤버십', value: 68.6, color: '#3b82f6' },
    { name: '단건구매', value: 22.9, color: '#10b981' },
    { name: '후원', value: 8.5, color: '#f59e0b' },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any, name: any) => [value + '%', name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// 월별 수익 트렌드
export function RevenueMonthlyChart() {
  const data = [
    { month: '3월', revenue: 1850000 },
    { month: '4월', revenue: 2100000 },
    { month: '5월', revenue: 2350000 },
    { month: '6월', revenue: 2008000 },
    { month: '7월', revenue: 2450000 },
  ]

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={12} tickFormatter={(value) => `₩${(value / 1000000).toFixed(1)}M`} />
          <Tooltip formatter={(value: any) => [`₩${value.toLocaleString()}`, '수익']} />
          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}