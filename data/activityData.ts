// 내 활동 탭 데이터
import { MEMBERSHIP_TIERS, FanSystemUtils } from "@/constants/fanSystem"

// 사용자의 현재 포인트로 레벨 정보 계산
const currentPoints = 8450
const levelInfo = FanSystemUtils.getLevelProgress(currentPoints)
const membershipTier = FanSystemUtils.getMembershipTierByAmount(127000) // 총 펀딩 금액

export const activityData = {
    // 사용자 정보
    userInfo: {
      name: "VR매니아123",
      joinDate: "2023.08.15",
      
      // 팬 레벨 시스템 (활동 기반)
      level: levelInfo.currentLevel,
      levelTitle: levelInfo.levelTitle,
      totalPoints: currentPoints,
      progressPoints: levelInfo.progressPoints,
      nextLevelPoints: levelInfo.nextLevelPoints,
      progressPercentage: levelInfo.progressPercentage,
      
      // 멤버십 등급 시스템 (결제 기반)
      membershipTier: membershipTier.name,
      membershipLevel: membershipTier.level,
      membershipEmoji: membershipTier.emoji,
      totalSpentAmount: 127000, // 총 펀딩/구매 금액
      
      avatar: "/api/placeholder/80/80",
      bio: "VR 게임을 사랑하는 케인님의 열렬한 팬입니다! 🥽✨"
    },
  
    // 활동 요약
    activitySummary: {
      thisMonth: {
        commentsCount: 23,
        likesGiven: 156,
        watchTime: "47시간 32분",
        supportAmount: 15000,
        attendedEvents: 3,
        earnedPoints: 450 // 이번 달 획득한 포인트
      },
      allTime: {
        totalComments: 342,
        totalLikes: 1879,
        totalWatchTime: "486시간 15분",
        totalSupport: 127000,
        totalEvents: 18,
        totalPurchases: 8, // 콘텐츠 구매 횟수
        firstVideoWatched: "2023.08.20",
        totalEarnedPoints: currentPoints
      }
    },
  
    // 배지 및 업적
    badges: [
      {
        id: "early-supporter",
        name: "얼리 서포터",
        description: "채널 초기부터 함께한 특별한 팬",
        icon: "🏆",
        rarity: "legendary",
        earnedDate: "2023.08.15"
      },
      {
        id: "membership-tier-4",
        name: `${membershipTier.emoji} ${membershipTier.name} 멤버`,
        description: `${membershipTier.description}`,
        icon: membershipTier.emoji,
        rarity: "epic",
        earnedDate: "2024.04.20"
      },
      {
        id: "comment-master",
        name: "댓글 마스터",
        description: "댓글 100개 이상 작성",
        icon: "💬",
        rarity: "rare",
        earnedDate: "2024.02.14"
      },
      {
        id: "golden-supporter",
        name: "골든 서포터",
        description: "누적 펀딩 10만원 이상",
        icon: "👑",
        rarity: "epic",
        earnedDate: "2024.04.20"
      },
      {
        id: "event-enthusiast",
        name: "이벤트 매니아",
        description: "이벤트 10회 이상 참여",
        icon: "🎉",
        rarity: "rare",
        earnedDate: "2024.05.10"
      },
      {
        id: "watch-veteran",
        name: "시청 베테랑",
        description: "총 시청시간 400시간 이상",
        icon: "📺",
        rarity: "epic",
        earnedDate: "2024.06.01"
      },
      {
        id: `level-${Math.floor(levelInfo.currentLevel / 10) * 10}`,
        name: `레벨 ${levelInfo.currentLevel} ${levelInfo.levelTitle}`,
        description: `팬 레벨 ${levelInfo.currentLevel} 달성`,
        icon: "⭐",
        rarity: levelInfo.currentLevel >= 40 ? "epic" : "rare",
        earnedDate: "2024.06.15"
      }
    ],
  
    // 내가 쓴 댓글 (최근 5개)
    myComments: [
      {
        id: "comment-1",
        videoTitle: "VR로 체험하는 우주여행! 진짜 같은 신기한 경험",
        comment: "와 정말 우주에 있는 것 같아요! 다음엔 화성 탐험도 해주세요 🚀",
        likes: 12,
        date: "2024.06.27",
        isLiked: true,
        earnedPoints: 10 // 댓글 작성으로 획득한 포인트
      },
      {
        id: "comment-2", 
        videoTitle: "신작 VR 게임 리뷰 - Half-Life: Alyx 모드 특집",
        comment: "이 모드 진짜 재밌더라구요! 케인님 덕분에 알게 됐어요 감사합니다 ㅎㅎ",
        likes: 8,
        date: "2024.06.25",
        isLiked: false,
        earnedPoints: 10
      },
      {
        id: "comment-3",
        videoTitle: "VROOK으로 만든 AI 화보 공개! 이런 게 가능하다고?",
        comment: "VROOK 기술 정말 놀라워요... 미래가 온 것 같아요",
        likes: 15,
        date: "2024.06.22",
        isLiked: true,
        earnedPoints: 10
      },
      {
        id: "comment-4",
        videoTitle: "Meta Quest 3 vs PICO 4 완벽 비교 리뷰",
        comment: "덕분에 PICO 4로 결정했어요! 리뷰 너무 상세해서 도움 많이 됐습니다 👍",
        likes: 6,
        date: "2024.06.20",
        isLiked: false,
        earnedPoints: 10
      },
      {
        id: "comment-5",
        videoTitle: "VR 채팅으로 전 세계 친구들과 만나기",
        comment: "저도 VR 채팅 해봤는데 정말 신기했어요! 다음에 함께 해봐요~",
        likes: 9,
        date: "2024.06.18",
        isLiked: true,
        earnedPoints: 10
      }
    ],
  
    // 관심 콘텐츠 (찜한 콘텐츠)
    favoriteContent: [
      {
        id: "fav-1",
        title: "VR로 체험하는 우주여행! 진짜 같은 신기한 경험",
        type: "VR 영상",
        thumbnail: "/api/placeholder/300/200",
        addedDate: "2024.06.27",
        views: 45200,
        isWatched: true
      },
      {
        id: "fav-2",
        title: "VROOK으로 만든 AI 화보 공개! 이런 게 가능하다고?",
        type: "VROOK",
        thumbnail: "/api/placeholder/300/200", 
        addedDate: "2024.06.22",
        views: 38900,
        isWatched: true
      },
      {
        id: "fav-3",
        title: "Meta Quest 3 언박싱 & 첫 인상 리뷰",
        type: "일반 영상",
        thumbnail: "/api/placeholder/300/200",
        addedDate: "2024.06.15",
        views: 62100,
        isWatched: false
      }
    ],
  
    // 구매 내역
    purchaseHistory: [
      {
        id: "purchase-1",
        type: "VROOK",
        title: "AI 화보 컬렉션 Vol.3",
        amount: 25000,
        date: "2024.06.20",
        status: "완료",
        earnedPoints: 80
      },
      {
        id: "purchase-2", 
        type: "VR 영상",
        title: "프리미엄 VR 콘서트 체험",
        amount: 15000,
        date: "2024.06.10",
        status: "완료",
        earnedPoints: 50
      },
      {
        id: "purchase-3",
        type: "멤버십",
        title: "플래티넘 멤버십 (월간)",
        amount: 39900,
        date: "2024.06.01",
        status: "완료",
        earnedPoints: 100
      }
    ],
  
    // 펀딩 내역
    supportHistory: [
      {
        id: "support-1",
        amount: 10000,
        message: "항상 좋은 콘텐츠 감사해요! 응원합니다 💪",
        date: "2024.06.25",
        isPublic: true,
        earnedPoints: 50
      },
      {
        id: "support-2",
        amount: 5000,
        message: "VROOK 정말 신기해요!",
        date: "2024.06.15",
        isPublic: true,
        earnedPoints: 25
      },
      {
        id: "support-3",
        amount: 20000,
        message: "", // 익명 펀딩
        date: "2024.06.01",
        isPublic: false,
        earnedPoints: 100
      }
    ],
  
    // 이벤트 참여 내역
    eventHistory: [
      {
        id: "event-1",
        title: "VR 팬미팅 이벤트",
        type: "팬미팅",
        participationDate: "2024.06.20",
        status: "참여 완료",
        reward: "한정판 굿즈",
        isWinner: true,
        earnedPoints: 150
      },
      {
        id: "event-2",
        title: "VROOK 베타 체험단",
        type: "베타 테스트",
        participationDate: "2024.06.10",
        status: "참여 완료", 
        reward: "베타 테스터 배지",
        isWinner: false,
        earnedPoints: 30
      },
      {
        id: "event-3",
        title: "댓글 이벤트 - 최고의 VR 게임은?",
        type: "댓글 이벤트",
        participationDate: "2024.05.25",
        status: "참여 완료",
        reward: "포인트 +100",
        isWinner: true,
        earnedPoints: 130 // 이벤트 참여 30 + 당첨 보너스 100
      }
    ],
  
    // 랭킹 정보
    ranking: {
      currentRank: 23,
      totalFans: 1247,
      thisMonthRank: 18,
      bestRank: 15,
      rankingCategories: [
        { category: "활동 포인트", rank: 23, total: 1247 },
        { category: "댓글 활동", rank: 15, total: 1247 },
        { category: "펀딩 금액", rank: 45, total: 1247 },
        { category: "시청 시간", rank: 12, total: 1247 }
      ]
    }
}