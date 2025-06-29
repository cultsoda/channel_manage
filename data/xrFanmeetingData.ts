// XR 팬미팅 패키지 데이터
export const xrFanmeetingPackages = [
    {
      id: "xr-basic",
      title: "XR 팬미팅 기본",
      price: 29000,
      priceUSD: 22.0,
      originalPrice: null,
      discount: null,
      thumbnail: "/api/placeholder/400/300",
      isPopular: false,
      isNew: false,
      benefits: [
        "메인 팬미팅 세션 시청",
        "실시간 채팅 참여",
        "XR 환경 기본 체험"
      ],
      items: [
        { name: "메인 팬미팅 세션", type: "라이브", count: "1회", description: "실시간 XR 팬미팅 참여" },
        { name: "실시간 채팅", type: "커뮤니티", count: "무제한", description: "팬미팅 중 실시간 소통" },
        { name: "XR 환경 체험", type: "XR", count: "기본", description: "XR 가상공간 체험" }
      ],
      uploadDate: "2024.06.20",
      likes: 5432,
      views: 28765,
      comments: 234
    },
    {
      id: "xr-premium",
      title: "XR 팬미팅 프리미엄",
      price: 49000,
      priceUSD: 37.5,
      originalPrice: 59000,
      discount: 17,
      thumbnail: "/api/placeholder/400/300",
      isPopular: true,
      isNew: false,
      benefits: [
        "메인 팬미팅 세션 시청",
        "실시간 채팅 참여",
        "✨ 1:1 대화 기회 (2분)",
        "✨ XR 전용 포토존 이용",
        "녹화본 다시보기 30일"
      ],
      items: [
        { name: "메인 팬미팅 세션", type: "라이브", count: "1회", description: "실시간 XR 팬미팅 참여" },
        { name: "실시간 채팅", type: "커뮤니티", count: "무제한", description: "팬미팅 중 실시간 소통" },
        { name: "1:1 대화", type: "특별", count: "2분", description: "개별 대화 기회" },
        { name: "XR 포토존", type: "XR", count: "무제한", description: "특별 포토존 이용" },
        { name: "다시보기", type: "VOD", count: "30일", description: "녹화본 시청" }
      ],
      uploadDate: "2024.06.19",
      likes: 9876,
      views: 45321,
      comments: 567
    },
    {
      id: "xr-vip",
      title: "XR 팬미팅 VIP",
      price: 99000,
      priceUSD: 75.0,
      originalPrice: 120000,
      discount: 18,
      thumbnail: "/api/placeholder/400/300",
      isPopular: false,
      isNew: true,
      benefits: [
        "메인 팬미팅 세션 시청",
        "실시간 채팅 참여",
        "✨ 1:1 대화 기회 (5분)",
        "✨ XR 전용 포토존 이용",
        "✨ 사인회 참여 (XR)",
        "✨ 특별 굿즈 (실물 배송)",
        "녹화본 다시보기 60일"
      ],
      items: [
        { name: "메인 팬미팅 세션", type: "라이브", count: "1회", description: "실시간 XR 팬미팅 참여" },
        { name: "실시간 채팅", type: "커뮤니티", count: "무제한", description: "팬미팅 중 실시간 소통" },
        { name: "1:1 대화", type: "특별", count: "5분", description: "개별 대화 기회 연장" },
        { name: "XR 포토존", type: "XR", count: "무제한", description: "특별 포토존 이용" },
        { name: "XR 사인회", type: "특별", count: "1회", description: "가상 사인회 참여" },
        { name: "특별 굿즈", type: "굿즈", count: "1세트", description: "실물 굿즈 배송" },
        { name: "다시보기", type: "VOD", count: "60일", description: "녹화본 시청 연장" }
      ],
      uploadDate: "2024.06.18",
      likes: 12345,
      views: 67890,
      comments: 890
    }
  ]
  
  // XR 팬미팅 관련 콘텐츠
  export const xrFanmeetingContent = [
    // 무료 미리보기
    {
      id: "xr-free-1",
      title: "XR 팬미팅 예고편",
      description: "다가오는 XR 팬미팅의 특별한 순간들을 미리 만나보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "3:45",
      uploadDate: "2024.06.22",
      likes: 8765,
      views: 43210,
      comments: 567,
      isFree: true
    },
    {
      id: "xr-free-2",
      title: "XR 환경 체험 가이드",
      description: "XR 팬미팅 참여 전 알아두면 좋은 XR 환경 사용법을 안내합니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "5:20",
      uploadDate: "2024.06.21",
      likes: 6543,
      views: 32109,
      comments: 345,
      isFree: true
    },
    {
      id: "xr-free-3",
      title: "팬미팅 준비 비하인드",
      description: "XR 팬미팅을 위한 준비 과정과 비하인드 스토리를 공개합니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "7:30",
      uploadDate: "2024.06.20",
      likes: 5432,
      views: 27890,
      comments: 234,
      isFree: true
    },
    // 유료 콘텐츠 (패키지 구매 후 이용)
    {
      id: "xr-paid-1",
      title: "XR 팬미팅 메인 세션",
      description: "XR 환경에서 진행되는 메인 팬미팅 세션 풀버전입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "XR 라이브",
      duration: "90분",
      uploadDate: "2024.06.19",
      likes: 15678,
      views: 89012,
      comments: 1234,
      isFree: false
    },
    {
      id: "xr-paid-2",
      title: "1:1 대화 하이라이트",
      description: "팬들과의 특별한 1:1 대화 순간들을 모은 하이라이트 영상입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "XR 영상",
      duration: "25분",
      uploadDate: "2024.06.18",
      likes: 12345,
      views: 67890,
      comments: 890,
      isFree: false
    },
    {
      id: "xr-paid-3",
      title: "XR 포토존 체험",
      description: "XR 가상공간에서 특별한 포토존을 체험하고 기념사진을 찍어보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "XR 체험",
      duration: "상시 이용",
      uploadDate: "2024.06.17",
      likes: 9876,
      views: 54321,
      comments: 678,
      isFree: false
    },
    {
      id: "xr-paid-4",
      title: "XR 사인회 체험",
      description: "가상공간에서 진행되는 특별한 사인회에 참여해보세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "XR 체험",
      duration: "15분",
      uploadDate: "2024.06.16",
      likes: 8765,
      views: 43210,
      comments: 456,
      isFree: false
    },
    {
      id: "xr-paid-5",
      title: "팬미팅 비하인드 XR",
      description: "팬미팅 전후의 특별한 순간들을 XR로 체험할 수 있습니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "XR 영상",
      duration: "20분",
      uploadDate: "2024.06.15",
      likes: 7654,
      views: 38765,
      comments: 345,
      isFree: false
    }
  ]
  
  // 기존 무료 콘텐츠만 (하위 호환성을 위해 유지)
  export const xrFreeContent = xrFanmeetingContent.filter(content => content.isFree)
  
  export const xrFanmeetingCategories = [
    { id: "all", label: "전체", count: xrFanmeetingPackages.length + xrFanmeetingContent.length },
    { id: "packages", label: "패키지", count: xrFanmeetingPackages.length },
    { id: "free", label: "무료 미리보기", count: xrFreeContent.length }
  ]
  
  // XR 디바이스 호환성 정보
  export const xrDeviceCompatibility = [
    {
      category: "VR 헤드셋",
      devices: ["Oculus Quest 2/3", "HTC Vive", "PlayStation VR", "Pico 4"],
      description: "완전한 XR 팬미팅 체험"
    },
    {
      category: "모바일",
      devices: ["iOS 12+", "Android 8+"],
      description: "360도 영상으로 시청 가능"
    },
    {
      category: "PC/웹",
      devices: ["Chrome", "Edge", "Safari"],
      description: "웹브라우저에서 시청 가능"
    }
  ]