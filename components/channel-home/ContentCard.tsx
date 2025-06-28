"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Eye, Heart, MessageCircle } from "lucide-react"

interface ContentCardProps {
  content: any
  isCompact?: boolean
  showMembershipBadge?: boolean
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
            <Badge variant="secondary" className="text-xs">{content.type}</Badge>
          </div>
          {showMembershipBadge && content.membershipLevel && (
            <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-bold ${
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
            <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
              {content.duration}
            </div>
          )}
          {content.type.includes("영상") && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-white ml-0.5" fill="white" />
              </div>
            </div>
          )}
        </div>
        <div className="p-2">
          <h4 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {content.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
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