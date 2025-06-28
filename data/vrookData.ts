// VROOK 패키지 데이터
export const vrookPackages = [
    {
      id: "vrook-basic",
      title: "브이룩 패키지",
      price: 39000,
      priceUSD: 29.7,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: false,
      isNew: false,
      benefits: [
        "메인 화보 20장",
        "메이킹 영상 1개", 
        "VR 영상 1개"
      ],
      items: [
        { name: "메인 화보", type: "이미지", count: "20장", description: "고화질 프로페셔널 화보" },
        { name: "메이킹 영상", type: "영상", count: "1개", description: "촬영 비하인드 영상" },
        { name: "VR 영상", type: "VR", count: "1개", description: "몰입형 VR 체험" }
      ],
      uploadDate: "2024.06.18",
      likes: 8934,
      views: 45623,
      comments: 567
    },
    {
      id: "vrook-special",
      title: "브이룩 스페셜 패키지", 
      price: 59000,
      priceUSD: 49.5,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: true,
      isNew: false,
      benefits: [
        "메인 화보 20장",
        "메이킹 영상 1개",
        "✨ VR 영상(풀버전) 1개",
        "✨ 올림픽 VR HMD 특별 증정(국내 배송만 가능)"
      ],
      items: [
        { name: "메인 화보", type: "이미지", count: "20장", description: "고화질 프로페셔널 화보" },
        { name: "메이킹 영상", type: "영상", count: "1개", description: "촬영 비하인드 영상" },
        { name: "VR 영상(풀버전)", type: "VR", count: "1개", description: "확장된 몰입형 VR 체험" },
        { name: "올림픽 VR HMD", type: "굿즈", count: "1개", description: "특별 증정품 (국내 배송만)" }
      ],
      uploadDate: "2024.06.17",
      likes: 12456,
      views: 67890,
      comments: 789
    },
    {
      id: "vrook-all",
      title: "브이룩 ALL 패키지",
      price: 79000,
      priceUSD: 69.3,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: false,
      isNew: true,
      benefits: [
        "메인 화보 20장",
        "✨ B컷 화보 사진 20장",
        "메이킹 영상 1개",
        "VR 영상(풀버전) 1개",
        "올림픽 VR HMD 특별 증정(국내 배송만 가능)",
        "✨ AI 포토카드 3장(디지털, 실물-국내 배송만 가능)"
      ],
      items: [
        { name: "메인 화보", type: "이미지", count: "20장", description: "고화질 프로페셔널 화보" },
        { name: "B컷 화보 사진", type: "이미지", count: "20장", description: "미공개 B컷 화보" },
        { name: "메이킹 영상", type: "영상", count: "1개", description: "촬영 비하인드 영상" },
        { name: "VR 영상(풀버전)", type: "VR", count: "1개", description: "확장된 몰입형 VR 체험" },
        { name: "올림픽 VR HMD", type: "굿즈", count: "1개", description: "특별 증정품 (국내 배송만)" },
        { name: "AI 포토카드", type: "굿즈", count: "3장", description: "디지털+실물 (국내 배송만)" }
      ],
      uploadDate: "2024.06.16",
      likes: 15678,
      views: 89012,
      comments: 1234
    }
  ]
  
  // 무료 미끼 콘텐츠
  export const vrookFreeContent = [
    {
      id: "vrook-free-1",
      title: "브이룩 메이킹 하이라이트",
      description: "브이룩 촬영 현장의 특별한 순간들을 미리 만나보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "2:30",
      uploadDate: "2024.06.15",
      likes: 5432,
      views: 28765,
      comments: 345,
      isFree: true
    },
    {
      id: "vrook-free-2", 
      title: "브이룩 컨셉 소개",
      description: "이번 브이룩의 컨셉과 스토리를 간단히 소개합니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "1:45",
      uploadDate: "2024.06.14",
      likes: 4321,
      views: 23456,
      comments: 234,
      isFree: true
    },
    {
      id: "vrook-free-3",
      title: "브이룩 샘플 이미지",
      description: "브이룩 화보의 퀄리티를 미리 확인해보세요.",
      thumbnail: "/api/placeholder/400/300", 
      type: "일반 이미지",
      duration: "3장",
      uploadDate: "2024.06.13",
      likes: 6789,
      views: 34567,
      comments: 456,
      isFree: true
    }
  ]
  
  export const vrookCategories = [
    { id: "all", label: "전체", count: vrookPackages.length + vrookFreeContent.length },
    { id: "packages", label: "패키지", count: vrookPackages.length },
    { id: "free", label: "무료 미끼", count: vrookFreeContent.length }
  ]