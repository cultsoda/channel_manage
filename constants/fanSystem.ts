// 팬 레벨/멤버십 등급 시스템 상수

// 멤버십 등급 시스템 (결제/후원 기반)
export const MEMBERSHIP_TIERS = [
    { 
      level: 1, 
      name: "브론즈", 
      emoji: "🥉", 
      color: "#CD7F32", 
      bgColor: "#FDF4E6",
      textColor: "#B8860B",
      minAmount: 0,
      description: "채널을 사랑하는 기본 서포터"
    },
    { 
      level: 2, 
      name: "실버", 
      emoji: "🥈", 
      color: "#C0C0C0", 
      bgColor: "#F8F9FA",
      textColor: "#6C757D",
      minAmount: 50000,
      description: "꾸준한 관심과 응원을 보내주는 팬"
    },
    { 
      level: 3, 
      name: "골드", 
      emoji: "🥇", 
      color: "#FFD700", 
      bgColor: "#FFFBF0",
      textColor: "#FF8C00",
      minAmount: 150000,
      description: "특별한 애정으로 채널을 후원하는 팬"
    },
    { 
      level: 4, 
      name: "플래티넘", 
      emoji: "💎", 
      color: "#E5E4E2", 
      bgColor: "#F0F8FF",
      textColor: "#4169E1",
      minAmount: 300000,
      description: "채널의 핵심 서포터이자 VIP"
    },
    { 
      level: 5, 
      name: "다이아", 
      emoji: "👑", 
      color: "#B9F2FF", 
      bgColor: "#F5F0FF",
      textColor: "#8A2BE2",
      minAmount: 500000,
      description: "최고 등급의 프리미엄 서포터"
    }
  ]
  
  // 팬 레벨 시스템 (활동 기반, 1~100레벨)
  export const FAN_LEVEL_SYSTEM = {
    maxLevel: 100,
    
    // 레벨별 필요 포인트 계산 (누적)
    getRequiredPoints: (level: number): number => {
      if (level <= 1) return 0
      return Math.floor(level * 200 + (level - 1) * 50) // 레벨이 높아질수록 더 많은 포인트 필요
    },
    
    // 활동별 획득 포인트
    pointsByActivity: {
      comment: 10,           // 댓글 작성
      like: 5,               // 좋아요
      share: 15,             // 공유
      watchMinute: 1,        // 1분 시청
      dailyVisit: 20,        // 일일 방문
      eventParticipation: 30, // 이벤트 참여
      contentPurchase: 50,   // 콘텐츠 구매
      membershipSubscribe: 100, // 멤버십 가입
      vrookPurchase: 80,     // VROOK 구매
      fanmeetingAttend: 150  // 팬미팅 참석
    },
    
    // 레벨 구간별 명칭 (선택사항)
    getLevelTitle: (level: number): string => {
      if (level >= 90) return "레전드"
      if (level >= 80) return "마스터" 
      if (level >= 70) return "베테랑"
      if (level >= 60) return "엑스퍼트"
      if (level >= 50) return "시니어"
      if (level >= 40) return "레귤러"
      if (level >= 30) return "액티브"
      if (level >= 20) return "주니어"
      if (level >= 10) return "비기너"
      return "뉴비"
    }
  }
  
  // 유틸리티 함수들
  export const FanSystemUtils = {
    // 후원 금액으로 멤버십 등급 계산
    getMembershipTierByAmount: (totalAmount: number) => {
      return MEMBERSHIP_TIERS
        .slice()
        .reverse()
        .find(tier => totalAmount >= tier.minAmount) || MEMBERSHIP_TIERS[0]
    },
    
    // 레벨에서 포인트 계산
    getLevelProgress: (currentPoints: number) => {
      let level = 1
      let totalPointsForLevel = 0
      
      while (level <= FAN_LEVEL_SYSTEM.maxLevel) {
        const pointsNeeded = FAN_LEVEL_SYSTEM.getRequiredPoints(level + 1)
        if (currentPoints < pointsNeeded) break
        level++
        totalPointsForLevel = pointsNeeded
      }
      
      const nextLevelPoints = FAN_LEVEL_SYSTEM.getRequiredPoints(level + 1)
      const progressPoints = currentPoints - totalPointsForLevel
      const neededPoints = nextLevelPoints - totalPointsForLevel
      
      return {
        currentLevel: level,
        currentPoints,
        progressPoints,
        nextLevelPoints: neededPoints,
        progressPercentage: (progressPoints / neededPoints) * 100,
        levelTitle: FAN_LEVEL_SYSTEM.getLevelTitle(level)
      }
    },
    
    // 등급 정보 포매팅
    formatMembershipTier: (tier: typeof MEMBERSHIP_TIERS[0]) => {
      return `${tier.emoji} ${tier.name}`
    },
    
    // 레벨 정보 포매팅  
    formatFanLevel: (level: number) => {
      const title = FAN_LEVEL_SYSTEM.getLevelTitle(level)
      return `Lv.${level} ${title}`
    },
    
    // 통합 표시용 포매팅
    formatFanInfo: (level: number, membershipTier: typeof MEMBERSHIP_TIERS[0]) => {
      return `${FanSystemUtils.formatFanLevel(level)} | ${FanSystemUtils.formatMembershipTier(membershipTier)}`
    }
  }