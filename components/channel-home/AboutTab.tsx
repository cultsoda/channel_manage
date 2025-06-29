"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { aboutData } from "@/data/aboutData"
import { 
  Calendar, 
  Globe, 
  Mail, 
  ExternalLink, 
  Award, 
  Users, 
  Eye, 
  PlayCircle,
  Clock,
  MapPin,
  Tag,
  Zap,
  ChevronDown,
  ChevronUp
} from "lucide-react"

export default function AboutTab() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toLocaleString()
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-yellow-500"
      case "epic": return "bg-purple-500"
      case "rare": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* 채널 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            채널 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-2">{aboutData.channelInfo.name}</h3>
            <p className="text-gray-600 mb-4">{aboutData.channelInfo.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>개설: {aboutData.channelInfo.since}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span>{aboutData.channelInfo.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span>{aboutData.channelInfo.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{aboutData.channelInfo.country}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">태그</h4>
            <div className="flex flex-wrap gap-2">
              {aboutData.channelInfo.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      
      {/* 콘텐츠 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            콘텐츠 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <PlayCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">
                {aboutData.statistics.totalVideos}
              </div>
              <div className="text-sm text-gray-600">총 영상 수</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Eye className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(aboutData.statistics.totalViews)}
              </div>
              <div className="text-sm text-gray-600">총 조회수</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(aboutData.statistics.totalSubscribers)}
              </div>
              <div className="text-sm text-gray-600">구독자 수</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm font-medium text-orange-600">업로드</div>
              <div className="text-xs text-gray-600">{aboutData.statistics.uploadSchedule}</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-600" />
              최고 인기 영상
            </h4>
            <div className="text-sm">
              <div className="font-medium">{aboutData.statistics.topVideo.title}</div>
              <div className="text-gray-600">
                {formatNumber(aboutData.statistics.topVideo.views)} 조회 • {aboutData.statistics.topVideo.date}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 연락처 및 소셜 미디어 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            연락처 & 소셜 미디어
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>일반 문의: {aboutData.contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>비즈니스: {aboutData.contact.business}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink className="w-4 h-4 text-gray-500" />
              <a href={aboutData.contact.website} className="text-blue-600 hover:underline">
                {aboutData.contact.website}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">소셜 미디어</h4>
            <div className="grid grid-cols-2 gap-3">
              {aboutData.contact.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{social.icon}</span>
                    <span className="font-medium text-sm">{social.platform}</span>
                  </div>
                  <span className="text-xs text-gray-500">{social.followers}</span>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>자주 묻는 질문</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aboutData.faq.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      

      
    </div>
  )
}