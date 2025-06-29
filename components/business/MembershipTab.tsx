"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import MembershipModal from "@/components/business-modals/MembershipModal"

interface Membership {
  id: number
  name: string
  description: string
  price: number
  features: string[]
}

const INITIAL_MEMBERSHIPS: Membership[] = [
  {
    id: 1,
    name: "베이직",
    description: "기본 멤버십",
    price: 9900,
    features: ["기본 콘텐츠 접근", "커뮤니티 참여", "월 2회 라이브 참여"],
  },
  {
    id: 2,
    name: "스탠다드",
    description: "인기 멤버십",
    price: 19900,
    features: ["모든 콘텐츠 접근", "독점 콘텐츠", "무제한 라이브 참여", "월 1회 VR 팬미팅"],
  },
  {
    id: 3,
    name: "프리미엄",
    description: "최고급 멤버십",
    price: 39900,
    features: ["모든 혜택 포함", "1:1 VR 미팅", "굿즈 할인", "우선 예약"],
  },
]

export default function MembershipTab() {
  const [memberships] = useState<Membership[]>(INITIAL_MEMBERSHIPS)
  const [membershipModalOpen, setMembershipModalOpen] = useState(false)
  const [editingMembership, setEditingMembership] = useState<Membership | null>(null)
  const [isNewMembership, setIsNewMembership] = useState(false)

  const handleEditMembership = (membership: Membership) => {
    setEditingMembership(membership)
    setIsNewMembership(false)
    setMembershipModalOpen(true)
  }

  const handleNewMembership = () => {
    setEditingMembership({
      id: 0,
      name: "",
      description: "",
      price: 0,
      features: [],
    })
    setIsNewMembership(true)
    setMembershipModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">멤버십 등급 설정</h3>
          <p className="text-sm text-muted-foreground">다양한 멤버십 등급을 설정하고 관리하세요.</p>
        </div>
        <Button onClick={handleNewMembership} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          새 멤버십 등급 추가
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {memberships.map((membership) => (
          <Card key={membership.id} className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{membership.name}</CardTitle>
              <CardDescription>{membership.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-2xl font-bold">₩ {membership.price.toLocaleString()}/월</div>
              <ul className="space-y-1 text-sm">
                {membership.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleEditMembership(membership)}
              >
                설정 수정
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <MembershipModal
        open={membershipModalOpen}
        onOpenChange={setMembershipModalOpen}
        editingMembership={editingMembership}
        isNewMembership={isNewMembership}
      />
    </div>
  )
}