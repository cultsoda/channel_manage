// 후원 데이터
export const supportData = {
    // 현재 후원 목표
    currentGoal: {
      title: "새로운 XR 스튜디오 구축",
      description: "더 고품질의 VR 콘텐츠 제작을 위한 전문 XR 스튜디오 구축에 여러분의 도움이 필요해요!",
      targetAmount: 5000000, // 500만원
      currentAmount: 3250000, // 325만원
      percentage: 65,
      deadline: "2024.08.31",
      supporters: 1247,
      daysLeft: 32,
      thumbnail: "/api/placeholder/400/300"
    },
  
    // 후원 옵션
    supportOptions: [
      {
        id: "tip-1000",
        amount: 1000,
        title: "응원의 한마디",
        description: "따뜻한 응원 메시지와 함께",
        icon: "💝",
        benefits: ["감사 인사", "후원자 명단 등록"]
      },
      {
        id: "tip-5000", 
        amount: 5000,
        title: "커피 한 잔",
        description: "콘텐츠 제작에 힘이 되는 커피 한 잔",
        icon: "☕",
        benefits: ["감사 인사", "후원자 명단 등록", "월간 소식지"]
      },
      {
        id: "tip-10000",
        amount: 10000,
        title: "든든한 응원",
        description: "항상 응원하고 있어요!",
        icon: "🍀",
        benefits: ["감사 인사", "후원자 명단 등록", "월간 소식지", "특별 배지"]
      },
      {
        id: "tip-30000",
        amount: 30000,
        title: "VIP 서포터",
        description: "VIP 전용 혜택까지 드려요",
        icon: "⭐",
        benefits: ["감사 인사", "후원자 명단 등록", "월간 소식지", "특별 배지", "VIP 채팅방 입장권"]
      },
      {
        id: "tip-50000",
        amount: 50000,
        title: "골든 서포터",
        description: "최고의 서포터님께 특별한 혜택을",
        icon: "👑",
        benefits: ["감사 인사", "후원자 명단 등록", "월간 소식지", "특별 배지", "VIP 채팅방 입장권", "개인 감사 메시지"]
      },
      {
        id: "custom",
        amount: 0,
        title: "직접 입력",
        description: "원하는 금액으로 후원하기",
        icon: "💎",
        benefits: ["맞춤형 혜택"]
      }
    ],
  
    // 이번 달 톱 후원자들
    topSupporters: [
      {
        name: "익명의후원자1",
        amount: 150000,
        rank: 1,
        badge: "👑 골든 서포터",
        message: "항상 응원하고 있어요! 화이팅!",
        date: "2024.06.25"
      },
      {
        name: "VIP팬123",
        amount: 120000,
        rank: 2,
        badge: "⭐ VIP 서포터",
        message: "새로운 스튜디오 기대돼요~",
        date: "2024.06.20"
      },
      {
        name: "든든한팬456",
        amount: 100000,
        rank: 3,
        badge: "⭐ VIP 서포터",
        message: "더 좋은 콘텐츠 만들어주세요",
        date: "2024.06.18"
      },
      {
        name: "응원팬789",
        amount: 80000,
        rank: 4,
        badge: "🍀 든든한 응원",
        message: "언제나 함께할게요!",
        date: "2024.06.15"
      },
      {
        name: "충성팬012",
        amount: 75000,
        rank: 5,
        badge: "🍀 든든한 응원",
        message: "",
        date: "2024.06.12"
      }
    ],
  
    // 최근 후원 내역
    recentSupports: [
      {
        id: "support-1",
        supporter: "새로운팬ABC",
        amount: 5000,
        message: "첫 후원이에요! 앞으로도 화이팅!",
        time: "3분 전",
        isAnonymous: false
      },
      {
        id: "support-2", 
        supporter: "익명",
        amount: 10000,
        message: "오늘 콘텐츠 너무 좋았어요 💕",
        time: "12분 전",
        isAnonymous: true
      },
      {
        id: "support-3",
        supporter: "단골팬DEF",
        amount: 3000,
        message: "커피 한 잔 드세요~",
        time: "25분 전",
        isAnonymous: false
      },
      {
        id: "support-4",
        supporter: "충성팬GHI",
        amount: 15000,
        message: "새 스튜디오 응원해요!",
        time: "1시간 전",
        isAnonymous: false
      },
      {
        id: "support-5",
        supporter: "익명",
        amount: 50000,
        message: "",
        time: "2시간 전",
        isAnonymous: true
      }
    ],
  
    // 후원 통계
    statistics: {
      totalAmount: 8450000, // 총 후원 금액
      totalSupporters: 2156, // 총 후원자 수
      averageAmount: 3920, // 평균 후원 금액
      thisMonthAmount: 1240000, // 이번 달 후원 금액
      thisMonthSupporters: 186, // 이번 달 후원자 수
      thisMonthGrowth: 15.8 // 전월 대비 증가율 (%)
    },
  
    // 후원 활용 내역
    usageHistory: [
      {
        id: "usage-1",
        title: "VR 촬영 장비 구매",
        amount: 2800000,
        description: "고품질 VR 콘텐츠 제작을 위한 전문 촬영 장비 구입",
        date: "2024.05.15",
        category: "장비",
        status: "완료"
      },
      {
        id: "usage-2",
        title: "스튜디오 인테리어 공사",
        amount: 1500000,
        description: "쾌적한 촬영 환경 조성을 위한 스튜디오 리모델링",
        date: "2024.04.20",
        category: "시설",
        status: "완료"
      },
      {
        id: "usage-3",
        title: "AI 화보 제작 소프트웨어",
        amount: 800000,
        description: "VROOK AI 화보 제작을 위한 전문 소프트웨어 라이선스",
        date: "2024.03.10",
        category: "소프트웨어",
        status: "완료"
      }
    ]
  }
  
  // 후원 리워드 시스템
  export const supportRewards = {
    // 누적 후원 금액별 혜택
    milestones: [
      {
        amount: 10000,
        title: "브론즈 서포터",
        badge: "🥉",
        benefits: ["서포터 전용 배지", "월간 소식지 구독"]
      },
      {
        amount: 50000,
        title: "실버 서포터", 
        badge: "🥈",
        benefits: ["서포터 전용 배지", "월간 소식지 구독", "VIP 채팅방 입장권", "분기별 특별 콘텐츠"]
      },
      {
        amount: 100000,
        title: "골드 서포터",
        badge: "🥇",
        benefits: ["서포터 전용 배지", "월간 소식지 구독", "VIP 채팅방 입장권", "분기별 특별 콘텐츠", "연간 팬미팅 우선 초대"]
      },
      {
        amount: 300000,
        title: "플래티넘 서포터",
        badge: "💎",
        benefits: ["서포터 전용 배지", "월간 소식지 구독", "VIP 채팅방 입장권", "분기별 특별 콘텐츠", "연간 팬미팅 우선 초대", "개인 감사 영상 메시지"]
      }
    ],
  
    // 후원 인증 방법
    verificationMethods: [
      {
        id: "card",
        name: "신용카드",
        icon: "💳",
        description: "간편하고 빠른 결제",
        fee: 0
      },
      {
        id: "bank",
        name: "계좌이체",
        icon: "🏦", 
        description: "수수료 없는 직접 이체",
        fee: 0
      },
      {
        id: "toss",
        name: "토스페이",
        icon: "📱",
        description: "토스앱으로 간편결제",
        fee: 0
      },
      {
        id: "kakaopay",
        name: "카카오페이",
        icon: "💛",
        description: "카카오톡으로 간편결제", 
        fee: 0
      }
    ]
  }