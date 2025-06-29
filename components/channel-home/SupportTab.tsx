"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { supportData, supportRewards } from "@/data/supportData"
import { Heart, Target, TrendingUp, Users, Gift, Clock } from "lucide-react"

export default function SupportTab() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [message, setMessage] = useState("")
  const [showSupportForm, setShowSupportForm] = useState(false)

  const formatAmount = (amount: number) => {
    return amount.toLocaleString() + "원"
  }

  const handleSupportClick = (optionId: string) => {
    setSelectedOption(optionId)
    setShowSupportForm(true)
    if (optionId !== "custom") {
      setCustomAmount("")
    }
  }

  const getSupportStats = () => {
    const { statistics } = supportData
    return [
      {
        icon: TrendingUp,
        title: "총 후원 금액",
        value: formatAmount(statistics.totalAmount),
        description: "누적 후원 금액"
      },
      {
        icon: Users,
        title: "총 후원자 수",
        value: statistics.totalSupporters.toLocaleString() + "명",
        description: "누적 후원자 수"
      },
      {
        icon: Heart,
        title: "평균 후원 금액",
        value: formatAmount(statistics.averageAmount),
        description: "1회 평균 후원"
      }
    ]
  }

  return (
    <div className="space-y-6 p-4">
      {/* 현재 후원 목표 */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">현재 후원 목표</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {supportData.currentGoal.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {supportData.currentGoal.description}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                {formatAmount(supportData.currentGoal.currentAmount)} 달성
              </span>
              <span className="text-gray-500">
                목표: {formatAmount(supportData.currentGoal.targetAmount)}
              </span>
            </div>
            <Progress 
              value={supportData.currentGoal.percentage} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{supportData.currentGoal.percentage}% 달성</span>
              <span>D-{supportData.currentGoal.daysLeft}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{supportData.currentGoal.supporters.toLocaleString()}명 참여</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>마감: {supportData.currentGoal.deadline}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 후원 옵션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            후원하기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {supportData.supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSupportClick(option.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="font-medium text-sm">{option.title}</div>
                {option.amount > 0 && (
                  <div className="text-blue-600 font-bold">
                    {formatAmount(option.amount)}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {option.description}
                </div>
              </button>
            ))}
          </div>

          {showSupportForm && (
            <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
              {selectedOption === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    후원 금액 (원)
                  </label>
                  <Input
                    type="number"
                    placeholder="원하는 금액을 입력하세요"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="1000"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  응원 메시지 (선택)
                </label>
                <Textarea
                  placeholder="따뜻한 응원 메시지를 남겨주세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // 후원 로직 구현
                    alert("후원해주셔서 감사합니다!")
                    setShowSupportForm(false)
                    setSelectedOption(null)
                    setMessage("")
                    setCustomAmount("")
                  }}
                >
                  후원하기
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowSupportForm(false)
                    setSelectedOption(null)
                  }}
                >
                  취소
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 후원 통계 */}
      <div className="grid grid-cols-1 gap-4">
        {getSupportStats().map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{stat.title}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 이번 달 톱 후원자 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-500" />
            이번 달 톱 후원자
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportData.topSupporters.map((supporter) => (
              <div key={supporter.rank} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  supporter.rank === 1 ? 'bg-yellow-500 text-white' :
                  supporter.rank === 2 ? 'bg-gray-400 text-white' :
                  supporter.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {supporter.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{supporter.name}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                      {supporter.badge}
                    </span>
                  </div>
                  <div className="text-blue-600 font-bold text-sm">
                    {formatAmount(supporter.amount)}
                  </div>
                  {supporter.message && (
                    <div className="text-xs text-gray-500 mt-1">
                      "{supporter.message}"
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400">
                  {supporter.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 최근 후원 내역 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 후원 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportData.recentSupports.map((support) => (
              <div key={support.id} className="flex items-start gap-3 p-3 border-l-4 border-blue-200 bg-blue-50/50 rounded-r-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {support.isAnonymous ? "익명의 후원자" : support.supporter}
                    </span>
                    <span className="text-blue-600 font-bold text-sm">
                      {formatAmount(support.amount)}
                    </span>
                  </div>
                  {support.message && (
                    <div className="text-sm text-gray-600 mb-1">
                      "{support.message}"
                    </div>
                  )}
                  <div className="text-xs text-gray-400">
                    {support.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 후원 활용 내역 */}
      <Card>
        <CardHeader>
          <CardTitle>후원금 활용 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportData.usageHistory.map((usage) => (
              <div key={usage.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{usage.title}</h4>
                  <div className="text-right">
                    <div className="text-red-600 font-bold">
                      -{formatAmount(usage.amount)}
                    </div>
                    <div className="text-xs text-gray-500">{usage.date}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{usage.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {usage.category}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    {usage.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 후원 리워드 시스템 */}
      <Card>
        <CardHeader>
          <CardTitle>후원 리워드 혜택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportRewards.milestones.map((milestone, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{milestone.badge}</span>
                  <div>
                    <h4 className="font-medium">{milestone.title}</h4>
                    <div className="text-sm text-blue-600 font-bold">
                      누적 {formatAmount(milestone.amount)} 이상
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>혜택:</strong> {milestone.benefits.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}