"use client"

import { useState, useEffect } from "react"

interface ChannelFooterProps {
  onPromotionClick?: (targetTab: string) => void
}

export default function ChannelFooter({ onPromotionClick }: ChannelFooterProps) {
  const [currentPromo, setCurrentPromo] = useState(0)

  // 프로모션 정보
  const promotions = [
    {
      id: 1,
      text: "🎉 신규 멤버십 가입 시 첫 달 50% 할인!",
      targetTab: "membership",
      bgColor: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      text: "🔥 VROOK 패키지 런칭 기념 30% 할인",
      targetTab: "vrook", 
      bgColor: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      text: "💎 단건구매 상품 모음 - 지금 확인하세요",
      targetTab: "purchase",
      bgColor: "from-blue-500 to-indigo-500"
    }
  ]

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [promotions.length])

  const handlePromotionClick = () => {
    const promo = promotions[currentPromo]
    onPromotionClick?.(promo.targetTab)
  }

  return (
    <div className="mt-auto">
      {/* 프로모션 배너 */}
      <div 
        className={`bg-gradient-to-r ${promotions[currentPromo].bgColor} text-white p-4 cursor-pointer hover:opacity-90 transition-opacity`}
        onClick={handlePromotionClick}
      >
        <div className="container mx-auto text-center">
          <p className="font-medium">
            {promotions[currentPromo].text}
          </p>
          <div className="flex justify-center mt-2 space-x-2">
            {promotions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPromo ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 채널 정보 푸터 */}
      <div className="bg-gray-800 text-white p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-1">케인의 채널</h3>
              <p className="text-gray-300 text-sm">
                © 2024 케인캐인캐인. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">문의하기</a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
            <p>
              최고의 XR 콘텐츠 경험을 제공하는 케인의 공식 채널입니다. 
              VR/AR 기술로 새로운 차원의 엔터테인먼트를 만나보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}