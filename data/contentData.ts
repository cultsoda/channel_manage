// 공통 콘텐츠 데이터
export const allContent = [
    {
      id: "1",
      title: "단건구매의 왕버섯",
      type: "일반 이미지",
      category: "단건구매",
      membership: "₩ 2,000",
      views: 19,
      likes: 5,
      comments: 2,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.28"
    },
    {
      id: "2", 
      title: "VR 새우깡 체험",
      type: "VR 영상",
      category: "VROOK",
      membership: "프리미엄",
      views: 156,
      likes: 23,
      comments: 8,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.25"
    },
    {
      id: "3",
      title: "팬미팅 하이라이트",
      type: "XR TOUR",
      category: "XR팬미팅", 
      membership: "무료",
      views: 89,
      likes: 15,
      comments: 12,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.20"
    },
    {
      id: "4",
      title: "비하인드 스토리",
      type: "일반 영상",
      category: "멤버십",
      membership: "골드",
      views: 234,
      likes: 45,
      comments: 18,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.18"
    },
    {
      id: "5",
      title: "일상 브이로그",
      type: "일반 영상",
      category: "무료",
      membership: "무료",
      views: 567,
      likes: 89,
      comments: 34,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.15"
    },
    {
      id: "6",
      title: "특별한 메시지",
      type: "일반 이미지",
      category: "멤버십",
      membership: "실버",
      views: 123,
      likes: 28,
      comments: 7,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.12"
    },
    {
      id: "7",
      title: "VR 아트 갤러리",
      type: "VR 영상",
      category: "VROOK",
      membership: "₩ 5,000",
      views: 78,
      likes: 12,
      comments: 4,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.10"
    },
    {
      id: "8",
      title: "라이브 하이라이트",
      type: "일반 영상",
      category: "무료",
      membership: "무료",
      views: 345,
      likes: 67,
      comments: 23,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.08"
    },
    {
      id: "9",
      title: "신곡 뮤직비디오 티저",
      type: "일반 영상",
      category: "무료",
      membership: "무료",
      views: 892,
      likes: 156,
      comments: 45,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.07"
    },
    {
      id: "10",
      title: "VR 콘서트 하이라이트",
      type: "VR 영상",
      category: "멤버십",
      membership: "골드",
      views: 445,
      likes: 78,
      comments: 29,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.06"
    },
    {
      id: "11",
      title: "팬들과의 Q&A 세션",
      type: "일반 영상",
      category: "무료",
      membership: "무료",
      views: 623,
      likes: 134,
      comments: 67,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.05"
    },
    {
      id: "12",
      title: "스튜디오 투어 360°",
      type: "VR 영상",
      category: "멤버십",
      membership: "실버",
      views: 298,
      likes: 56,
      comments: 18,
      thumbnail: "/api/placeholder/300/200",
      uploadDate: "2025.04.04"
    }
  ]
  
  export const contentTypes = [
    { id: "all", label: "전체", count: allContent.length },
    { id: "vr-video", label: "VR영상", count: allContent.filter(c => c.type === "VR 영상").length },
    { id: "normal-video", label: "일반영상", count: allContent.filter(c => c.type === "일반 영상").length },
    { id: "image", label: "이미지", count: allContent.filter(c => c.type === "일반 이미지").length },
    { id: "xr-tour", label: "XR TOUR", count: allContent.filter(c => c.type === "XR TOUR").length }
  ]