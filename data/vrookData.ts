// VROOK 패키지 데이터
export const vrookPackages = [
    {
      id: "vrook-basic",
      title: "브이툭 패키지",
      price: 39000,
      priceUSD: 29.7,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: true,
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
      title: "브이툭 스페셜 패키지", 
      price: 59000,
      priceUSD: 49.5,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: false,
      isNew: true,
      benefits: [
        "메인 화보 20장",
        "메이킹 영상 1개",
        "✨ VR 영상(올바른) 1개",
        "✨ 몰입형 VR HMD 특별 (국내 배송만 가능)"
      ],
      items: [
        { name: "메인 화보", type: "이미지", count: "20장", description: "고화질 프로페셔널 화보" },
        { name: "메이킹 영상", type: "영상", count: "1개", description: "촬영 비하인드 영상" },
        { name: "VR 영상(올바른)", type: "VR", count: "1개", description: "확장된 몰입형 VR 체험" },
        { name: "올바른 VR HMD", type: "굿즈", count: "1개", description: "특별 증정품 (국내 배송만)" }
      ],
      uploadDate: "2024.06.17",
      likes: 12456,
      views: 67890,
      comments: 789
    },
    {
      id: "vrook-all",
      title: "브이툭 ALL 패키지",
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
        "VR 영상(올바른) 1개",
        "몰입형 VR HMD 특별 출장(국내 배송만 가능)",
        "✨ AI 포토카드 3장(디지털, 실물→국내 배송만 가능)"
      ],
      items: [
        { name: "메인 화보", type: "이미지", count: "20장", description: "고화질 프로페셔널 화보" },
        { name: "B컷 화보 사진", type: "이미지", count: "20장", description: "미공개 B컷 화보" },
        { name: "메이킹 영상", type: "영상", count: "1개", description: "촬영 비하인드 영상" },
        { name: "VR 영상(풀버전)", type: "VR", count: "1개", description: "확장된 몰입형 VR 체험" },
        { name: "올바른 VR HMD", type: "굿즈", count: "1개", description: "특별 출장품 (국내 배송만)" },
        { name: "AI 포토카드", type: "굿즈", count: "3장", description: "디지털+실물 (국내 배송만)" }
      ],
      uploadDate: "2024.06.16",
      likes: 15678,
      views: 89012,
      comments: 1234
    }
  ]
  
  // 전체 VROOK 콘텐츠 (무료 + 유료)
  export const vrookAllContent = [
    // 무료 미리보기 콘텐츠
    {
      id: "vrook-free-1",
      title: "오늘의 겨우디 메인 화보",
      description: "고품질 메인 화보를 미리 만나보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 이미지",
      duration: "20장",
      uploadDate: "2024.06.15",
      likes: 5432,
      views: 28765,
      comments: 345,
      isFree: true
    },
    {
      id: "vrook-free-2", 
      title: "그녀의 여운을 B컷으로",
      description: "카메라가 담은 순간 포착된 겨우디의 고급진 표정과 몸짓, 팬만을 위한 은밀한 돌져서 모습",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 이미지",
      duration: "B컷 20장",
      uploadDate: "2024.06.14",
      likes: 4321,
      views: 23456,
      comments: 234,
      isFree: true
    },
    {
      id: "vrook-free-3",
      title: "겨우디를 화보 영상으로 만나요",
      description: "코스를 디렉팅부터 현장의 눈빛까지, 겨우디의 몸짓이 모두 담겨 있는 감각적인 촬영 현장이에요.",
      thumbnail: "/api/placeholder/400/300", 
      type: "일반 영상",
      duration: "메이킹 영상",
      uploadDate: "2024.06.13",
      likes: 6789,
      views: 34567,
      comments: 456,
      isFree: true
    },
    // 유료 VROOK 콘텐츠
    {
      id: "vrook-paid-1",
      title: "눈 앞에 겨우디 VR",
      description: "시선이 마주친 순간, 1인칭 시점으로 만나는 겨우디 하이라이트 VR 영상만 모았어요.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "VR 영상",
      uploadDate: "2024.06.12",
      likes: 8901,
      views: 45678,
      comments: 567,
      isFree: false
    },
    {
      id: "vrook-paid-2",
      title: "눈 앞에 겨우디 VR 풀 버전",
      description: "빛 안에서 단 둘이 있는 듯한 몰입감, 시작부터 끝까지 겨우디를 눈앞에서 지켜보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "VR 영상 풀버전",
      uploadDate: "2024.06.11",
      likes: 12345,
      views: 67890,
      comments: 789,
      isFree: false
    },
    {
      id: "vrook-paid-3",
      title: "겨우디 AI 포토카드",
      description: "AI가 만들어낸 상상 속 겨우디에요. 현실과 환상의 경계에서 태어난 겨우디의 또 다른 모습들이에요.",
      thumbnail: "/api/placeholder/400/300",
      type: "AI 이미지",
      duration: "AI 창작",
      uploadDate: "2024.06.10",
      likes: 9876,
      views: 54321,
      comments: 432,
      isFree: false
    },
    {
        id: "vrook-paid-4",
        title: "겨우디 프라이빗 VR",
        description: "1:1 개인적인 공간에서 만나는 겨우디의 특별한 순간들을 VR로 체험하세요.",
        thumbnail: "/api/placeholder/400/300",
        type: "VR 영상",
        duration: "VR 프라이빗",
        uploadDate: "2024.06.09",
        likes: 7654,
        views: 43210,
        comments: 321,
        isFree: false
      },
      {
        id: "vrook-paid-5",
        title: "겨우디 B컷 스페셜",
        description: "공개되지 않았던 비하인드 B컷 화보들을 모은 특별 컬렉션입니다.",
        thumbnail: "/api/placeholder/400/300",
        type: "일반 이미지",
        duration: "B컷 스페셜",
        uploadDate: "2024.06.08",
        likes: 5432,
        views: 32109,
        comments: 210,
        isFree: false
      },
      {
        id: "vrook-free-4",
        title: "겨우디 VR 체험 티저",
        description: "VR로 만나는 겨우디의 매력을 짧게 미리 체험해볼 수 있습니다.",
        thumbnail: "/api/placeholder/400/300",
        type: "VR 영상",
        duration: "VR 티저",
        uploadDate: "2024.06.07",
        likes: 4321,
        views: 21098,
        comments: 123,
        isFree: true
      },
      {
        id: "vrook-paid-6",
        title: "겨우디 AI 아트 컬렉션",
        description: "AI가 창조한 겨우디의 환상적인 모습들을 담은 아트 컬렉션입니다.",
        thumbnail: "/api/placeholder/400/300",
        type: "AI 이미지",
        duration: "AI 아트",
        uploadDate: "2024.06.06",
        likes: 6543,
        views: 38765,
        comments: 287,
        isFree: false
      },
      {
        id: "vrook-free-5",
        title: "겨우디 메이킹 하이라이트",
        description: "화보 촬영 현장의 하이라이트 순간들을 담은 짧은 영상입니다.",
        thumbnail: "/api/placeholder/400/300",
        type: "일반 영상",
        duration: "하이라이트",
        uploadDate: "2024.06.05",
        likes: 3210,
        views: 19876,
        comments: 98,
        isFree: true
      }
  ]
  
  // 기존 무료 콘텐츠만 (하위 호환성을 위해 유지)
  export const vrookFreeContent = vrookAllContent.filter(content => content.isFree)
  
  export const vrookCategories = [
    { id: "all", label: "전체", count: vrookPackages.length + vrookAllContent.length },
    { id: "packages", label: "패키지", count: vrookPackages.length },
    { id: "free", label: "무료 미리보기", count: vrookFreeContent.length }
  ]