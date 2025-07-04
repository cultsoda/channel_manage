"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Heart, MessageCircle } from "lucide-react"

interface ContentCardProps {
    content: any
    isCompact?: boolean
    showMembershipBadge?: boolean
    packageInfo?: {
      packageName: string
      purchaseDate: string
      packagePrice: number
      discount: number
      source: 'package' | 'vrook' | 'xr-fanmeeting-package' | 'xr-fanmeeting-single'
    }
  }

export default function ContentCard({ content, isCompact = false, showMembershipBadge = false }: ContentCardProps) {
  if (isCompact) {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
          <img 
            src={content.thumbnail} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 left-1">
            <Badge variant="secondary" className="text-[10px] px-1 py-0">{content.type}</Badge>
          </div>
          {showMembershipBadge && content.membershipLevel && (
            <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-[10px] font-bold ${
              content.membershipLevel === 'bronze' 
                ? 'bg-orange-500 text-white' 
                : content.membershipLevel === 'silver'
                ? 'bg-gray-500 text-white'
                : 'bg-yellow-500 text-black'
            }`}>
              {content.membershipLevel === 'bronze' ? '🥉' : 
               content.membershipLevel === 'silver' ? '🥈' : '🥇'}
            </div>
          )}
          {content.duration && (
            <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-[10px]">
              {content.duration}
            </div>
          )}
          {content.type.includes("영상") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                <Play className="h-3 w-3 text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}
        </div>
        <div className="p-2">
          <h4 className="font-medium text-xs mb-1 line-clamp-2 leading-tight">{content.title}</h4>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <span className="flex items-center gap-0.5">
              <Eye className="h-2.5 w-2.5" />
              {content.views}
            </span>
            <span className="flex items-center gap-0.5">
              <Heart className="h-2.5 w-2.5" />
              {content.likes}
            </span>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={content.thumbnail} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{content.type}</Badge>
          </div>
          {showMembershipBadge && content.membershipLevel && (
            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${
              content.membershipLevel === 'bronze' 
                ? 'bg-orange-500 text-white' 
                : content.membershipLevel === 'silver'
                ? 'bg-gray-500 text-white'
                : 'bg-yellow-500 text-black'
            }`}>
              {content.membershipLevel === 'bronze' ? '🥉' : 
               content.membershipLevel === 'silver' ? '🥈' : '🥇'}
            </div>
          )}
          {content.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {content.duration}
            </div>
          )}
          {content.type.includes("영상") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                <Play className="h-6 w-6 text-white ml-1" fill="white" />
              </div>
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{content.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{content.uploadDate}</span>
          {content.membership && (
            <Badge variant={content.membership.includes("₩") ? "default" : "secondary"}>
              {content.membership}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {content.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {content.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {content.comments}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}