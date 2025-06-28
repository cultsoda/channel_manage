// 구매한 콘텐츠 데이터 (예시 - 실제로는 API에서 가져올 데이터)
export const purchasedContents = [
    // 단건구매로 산 것들
    {
      id: "pc1",
      title: "신곡 뮤직비디오 - Director's Cut",
      description: "감독판 뮤직비디오로 미공개 장면과 비하인드 스토리가 포함되어 있습니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "8:45",
      uploadDate: "2024.06.26",
      likes: 4521,
      views: 23456,
      comments: 189,
      purchaseSource: "single",
      purchaseInfo: {
        packageName: "개별 구매",
        purchaseDate: "2024.06.26",
        packagePrice: 12900,
        discount: 0,
        source: "single" as const
      }
    },
    {
      id: "pc2",
      title: "개인 메시지 팩 (음성)",
      description: "팬들을 위한 특별한 개인 메시지 모음입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "15:30",
      uploadDate: "2024.06.23",
      likes: 2134,
      views: 9876,
      comments: 78,
      purchaseSource: "single",
      purchaseInfo: {
        packageName: "개별 구매",
        purchaseDate: "2024.06.23",
        packagePrice: 4900,
        discount: 0,
        source: "single" as const
      }
    },
  
    // 패키지로 산 것들 (신곡 완전판 패키지)
    {
      id: "pc3",
      title: "비하인드 영상 - 뮤비 제작기",
      description: "뮤직비디오 촬영 현장의 모든 과정을 담은 완전한 비하인드 영상입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "32:15",
      uploadDate: "2024.06.22",
      likes: 5432,
      views: 17890,
      comments: 203,
      purchaseSource: "package",
      purchaseInfo: {
        packageName: "신곡 완전판 패키지",
        purchaseDate: "2024.06.20",
        packagePrice: 29900,
        discount: 35,
        source: "package" as const
      }
    },
    {
      id: "pc4",
      title: "프리미엄 화보집",
      description: "전문 사진작가와 함께 촬영한 아트워크 수준의 화보 컬렉션입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 이미지",
      duration: "50장",
      uploadDate: "2024.06.20",
      likes: 6543,
      views: 21098,
      comments: 345,
      purchaseSource: "package",
      purchaseInfo: {
        packageName: "신곡 완전판 패키지",
        purchaseDate: "2024.06.20",
        packagePrice: 29900,
        discount: 35,
        source: "package" as const
      }
    },
    {
      id: "pc5",
      title: "라이브 음원 - 어쿠스틱 버전",
      description: "스튜디오에서 라이브로 녹음한 어쿠스틱 버전 음원입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "4:32",
      uploadDate: "2024.06.21",
      likes: 8765,
      views: 34567,
      comments: 456,
      purchaseSource: "package",
      purchaseInfo: {
        packageName: "신곡 완전판 패키지",
        purchaseDate: "2024.06.20",
        packagePrice: 29900,
        discount: 35,
        source: "package" as const
      }
    },
  
    // VROOK으로 산 것들 (브이룩 ALL 패키지)
    {
      id: "pc6",
      title: "VROOK - 메인 화보 20장",
      description: "브이룩 메인 콘텐츠인 고화질 화보 컬렉션입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 이미지",
      duration: "20장",
      uploadDate: "2024.06.18",
      likes: 9876,
      views: 45632,
      comments: 678,
      purchaseSource: "vrook",
      purchaseInfo: {
        packageName: "브이룩 ALL 패키지",
        purchaseDate: "2024.06.18",
        packagePrice: 79000,
        discount: 30,
        source: "vrook" as const
      }
    },
    {
      id: "pc7", 
      title: "VROOK - 메이킹 영상",
      description: "브이룩 촬영 과정을 담은 특별한 메이킹 영상입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "일반 영상",
      duration: "12:34",
      uploadDate: "2024.06.17",
      likes: 7654,
      views: 32109,
      comments: 234,
      purchaseSource: "vrook",
      purchaseInfo: {
        packageName: "브이룩 ALL 패키지",
        purchaseDate: "2024.06.18",
        packagePrice: 79000,
        discount: 30,
        source: "vrook" as const
      }
    },
    {
      id: "pc8",
      title: "VROOK - VR 영상",
      description: "VR 환경에서 브이룩을 체험할 수 있는 특별한 콘텐츠입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "8:45",
      uploadDate: "2024.06.16",
      likes: 5432,
      views: 28765,
      comments: 345,
      purchaseSource: "vrook",
      purchaseInfo: {
        packageName: "브이룩 ALL 패키지",
        purchaseDate: "2024.06.18",
        packagePrice: 79000,
        discount: 30,
        source: "vrook" as const
      }
    },
  
    // XR 팬미팅으로 산 것들 (XR 팬미팅 프리미엄 패키지)
    {
      id: "pc9",
      title: "XR 팬미팅 - 팬미팅 전 VR 영상",
      description: "팬미팅 시작 전 대기실에서의 특별한 순간들을 VR로 체험하세요.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "15:20",
      uploadDate: "2024.06.15",
      likes: 6789,
      views: 35421,
      comments: 456,
      purchaseSource: "xr-fanmeeting",
      purchaseInfo: {
        packageName: "XR 팬미팅 프리미엄 패키지",
        purchaseDate: "2024.06.15",
        packagePrice: 49900,
        discount: 25,
        source: "xr-fanmeeting-package" as const
      }
    },
    {
      id: "pc10",
      title: "XR 팬미팅 - 메인 세션",
      description: "XR 환경에서 진행된 팬미팅 메인 세션 풀버전입니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "45:30",
      uploadDate: "2024.06.14",
      likes: 12345,
      views: 67890,
      comments: 890,
      purchaseSource: "xr-fanmeeting",
      purchaseInfo: {
        packageName: "XR 팬미팅 프리미엄 패키지",
        purchaseDate: "2024.06.15",
        packagePrice: 49900,
        discount: 25,
        source: "xr-fanmeeting-package" as const
      }
    },
    {
      id: "pc11",
      title: "XR 팬미팅 - 집가는 길",
      description: "팬미팅 후 집으로 가는 길의 소소한 일상을 담았습니다.",
      thumbnail: "/api/placeholder/400/300",
      type: "VR 영상",
      duration: "8:15",
      uploadDate: "2024.06.13",
      likes: 8765,
      views: 43210,
      comments: 567,
      purchaseSource: "xr-fanmeeting",
      purchaseInfo: {
        packageName: "XR 팬미팅 프리미엄 패키지",
        purchaseDate: "2024.06.15",
        packagePrice: 49900,
        discount: 25,
        source: "xr-fanmeeting-package" as const
      }
    }
  ]
  
  export const purchaseSourceCategories = [
    { 
      id: "all", 
      label: "전체", 
      count: purchasedContents.length 
    },
    { 
      id: "single", 
      label: "단건구매", 
      count: purchasedContents.filter(c => c.purchaseSource === "single").length 
    },
    { 
      id: "package", 
      label: "패키지", 
      count: purchasedContents.filter(c => c.purchaseSource === "package").length 
    },
    { 
      id: "vrook", 
      label: "VROOK", 
      count: purchasedContents.filter(c => c.purchaseSource === "vrook").length 
    },
    { 
      id: "xr-fanmeeting", 
      label: "XR 팬미팅", 
      count: purchasedContents.filter(c => c.purchaseSource === "xr-fanmeeting").length 
    }
  ]
  
  export const purchasedContentSortOptions = [
    { id: "latest", label: "최신 구매순" },
    { id: "upload-latest", label: "최신 업로드순" },
    { id: "popular", label: "인기순" },
    { id: "alphabetical", label: "가나다순" }
  ]