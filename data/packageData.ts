// 패키지 상품 데이터
export const packageContents = [
    {
      id: "pkg1",
      title: "신곡 완전판 패키지",
      description: "뮤직비디오, 비하인드 영상, 포토북, 음원을 하나로 묶은 완전판 패키지입니다.",
      thumbnail: "/api/placeholder/400/300",
      packagePrice: 29900,
      originalPrice: 45800,
      discount: 35,
      category: "music",
      uploadDate: "2024.06.26",
      likes: 8934,
      views: 45623,
      comments: 567,
      items: [
        { name: "신곡 뮤직비디오 - Director's Cut", type: "영상", price: 12900 },
        { name: "비하인드 영상 - 뮤비 제작기", type: "영상", price: 8900 },
        { name: "프리미엄 화보집", type: "이미지", price: 15900 },
        { name: "라이브 음원 - 어쿠스틱 버전", type: "음원", price: 3900 },
        { name: "개인 메시지 팩", type: "음성", price: 4900 }
      ],
      isPopular: true,
      isNew: false
    },
    {
      id: "pkg2",
      title: "VR 체험 완전판",
      description: "모든 VR 콘텐츠를 한 번에! VR 기기가 없어도 모바일로 체험 가능합니다.",
      thumbnail: "/api/placeholder/400/300",
      packagePrice: 49900,
      originalPrice: 89000,
      discount: 44,
      category: "vr",
      uploadDate: "2024.06.25",
      likes: 6789,
      views: 28934,
      comments: 423,
      items: [
        { name: "VR 콘서트 체험", type: "VR", price: 25000 },
        { name: "VR 팬미팅 - 개인 세션", type: "VR", price: 89000 },
        { name: "VR 아트 갤러리", type: "VR", price: 5000 },
        { name: "스튜디오 투어 360°", type: "VR", price: 8900 }
      ],
      isPopular: false,
      isNew: true
    },
    {
      id: "pkg3", 
      title: "팬미팅 기념 패키지",
      description: "팬미팅의 모든 순간을 담은 특별한 패키지. 한정 수량으로 제공됩니다.",
      thumbnail: "/api/placeholder/400/300",
      packagePrice: 19900,
      originalPrice: 28700,
      discount: 31,
      category: "fanmeeting",
      uploadDate: "2024.06.24",
      likes: 12456,
      views: 67890,
      comments: 789,
      items: [
        { name: "팬미팅 하이라이트", type: "영상", price: 8900 },
        { name: "팬들과의 Q&A 세션", type: "영상", price: 6900 },
        { name: "팬미팅 포토북", type: "이미지", price: 7900 },
        { name: "팬미팅 감사 메시지", type: "음성", price: 4900 }
      ],
      isPopular: true,
      isNew: false
    },
    {
      id: "pkg4",
      title: "일상 브이로그 시즌1",
      description: "평소 궁금했던 일상의 모든 순간들을 담은 브이로그 전체 시즌입니다.",
      thumbnail: "/api/placeholder/400/300",
      packagePrice: 15900,
      originalPrice: 24500,
      discount: 35,
      category: "vlog",
      uploadDate: "2024.06.23",
      likes: 5432,
      views: 23456,
      comments: 345,
      items: [
        { name: "일상 브이로그 #1-5", type: "영상", price: 6900 },
        { name: "브이로그 비하인드", type: "영상", price: 4900 },
        { name: "일상 사진 모음집", type: "이미지", price: 7900 },
        { name: "브이로그 촬영 팁", type: "영상", price: 4800 }
      ],
      isPopular: false,
      isNew: false
    },
    {
      id: "pkg5",
      title: "멤버십 스타터 패키지",
      description: "처음 멤버십에 가입하시는 분들을 위한 특별 혜택 패키지입니다.",
      thumbnail: "/api/placeholder/400/300", 
      packagePrice: 9900,
      originalPrice: 17800,
      discount: 44,
      category: "membership",
      uploadDate: "2024.06.22",
      likes: 3456,
      views: 15678,
      comments: 234,
      items: [
        { name: "멤버십 가이드 영상", type: "영상", price: 0 },
        { name: "특별 셀카 모음집", type: "이미지", price: 2900 },
        { name: "개인 메시지 - 환영인사", type: "음성", price: 4900 },
        { name: "멤버십 전용 배경화면", type: "이미지", price: 1900 },
        { name: "첫 달 멤버십 50% 할인권", type: "쿠폰", price: 8100 }
      ],
      isPopular: false,
      isNew: true
    },
    {
      id: "pkg6",
      title: "연말 스페셜 패키지",
      description: "한 해를 마무리하는 특별한 패키지. 감사 인사와 함께 2025년을 준비해요!",
      thumbnail: "/api/placeholder/400/300",
      packagePrice: 35900,
      originalPrice: 52700,
      discount: 32,
      category: "special",
      uploadDate: "2024.06.21",
      likes: 9876,
      views: 43210,
      comments: 678,
      items: [
        { name: "연말 감사 영상", type: "영상", price: 8900 },
        { name: "2024년 하이라이트", type: "영상", price: 12900 },
        { name: "연말 화보 촬영", type: "이미지", price: 15900 },
        { name: "신년 계획 공유", type: "영상", price: 6900 },
        { name: "팬들에게 보내는 편지", type: "이미지", price: 3900 },
        { name: "새해 축하 메시지", type: "음성", price: 4200 }
      ],
      isPopular: true,
      isNew: false
    }
  ]
  
  export const packageCategories = [
    { id: "all", label: "전체", count: packageContents.length },
    { id: "popular", label: "인기 패키지", count: packageContents.filter(p => p.isPopular).length },
    { id: "new", label: "신규 패키지", count: packageContents.filter(p => p.isNew).length },
    { id: "music", label: "음악", count: packageContents.filter(p => p.category === "music").length },
    { id: "vr", label: "VR 체험", count: packageContents.filter(p => p.category === "vr").length },
    { id: "fanmeeting", label: "팬미팅", count: packageContents.filter(p => p.category === "fanmeeting").length },
    { id: "vlog", label: "브이로그", count: packageContents.filter(p => p.category === "vlog").length }
  ]
  
  export const packageSortOptions = [
    { id: "latest", label: "최신순" },
    { id: "popular", label: "인기순" },
    { id: "price-low", label: "가격 낮은순" },
    { id: "price-high", label: "가격 높은순" },
    { id: "discount", label: "할인율 높은순" }
  ]