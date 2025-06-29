// 내 활동 탭 데이터
export const activityData = {
    // 사용자 정보
    userInfo: {
      name: "VR매니아123",
      joinDate: "2023.08.15",
      membershipTier: "VIP",
      level: 47,
      totalPoints: 8450,
      nextLevelPoints: 1550,
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
        attendedEvents: 3
      },
      allTime: {
        totalComments: 342,
        totalLikes: 1879,
        totalWatchTime: "486시간 15분",
        totalSupport: 127000,
        totalEvents: 18,
        firstVideoWatched: "2023.08.20"
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
        id: "vip-member",
        name: "VIP 멤버",
        description: "VIP 멤버십 가입자",
        icon: "⭐",
        rarity: "epic",
        earnedDate: "2023.12.01"
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
        description: "누적 후원 10만원 이상",
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
        isLiked: true
      },
      {
        id: "comment-2", 
        videoTitle: "신작 VR 게임 리뷰 - Half-Life: Alyx 모드 특집",
        comment: "이 모드 진짜 재밌더라구요! 케인님 덕분에 알게 됐어요 감사합니다 ㅎㅎ",
        likes: 8,
        date: "2024.06.25",
        isLiked: false
      },
      {
        id: "comment-3",
        videoTitle: "VROOK으로 만든 AI 화보 공개! 이런 게 가능하다고?",
        comment: "VROOK 기술 정말 놀라워요... 미래가 온 것 같아요",
        likes: 15,
        date: "2024.06.22",
        isLiked: true
      },
      {
        id: "comment-4",
        videoTitle: "Meta Quest 3 vs PICO 4 완벽 비교 리뷰",
        comment: "덕분에 PICO 4로 결정했어요! 리뷰 너무 상세해서 도움 많이 됐습니다 👍",
        likes: 6,
        date: "2024.06.20",
        isLiked: false
      },
      {
        id: "comment-5",
        videoTitle: "VR 채팅으로 전 세계 친구들과 만나기",
        comment: "저도 VR 채팅 해봤는데 정말 신기했어요! 언어의 벽도 없고",
        likes: 4,
        date: "2024.06.18",
        isLiked: true
      }
    ],
  
    // 관심 콘텐츠 (좋아요/북마크)
    favoriteContent: [
      {
        id: "fav-1",
        title: "VR로 체험하는 우주여행! 진짜 같은 신기한 경험",
        thumbnail: "/api/placeholder/160/90",
        duration: "12:45",
        views: 890000,
        addedDate: "2024.06.27",
        type: "video"
      },
      {
        id: "fav-2",
        title: "VROOK으로 만든 AI 화보 공개! 이런 게 가능하다고?",
        thumbnail: "/api/placeholder/160/90", 
        duration: "8:32",
        views: 456000,
        addedDate: "2024.06.22",
        type: "video"
      },
      {
        id: "fav-3",
        title: "Meta Quest 3 완벽 가이드",
        thumbnail: "/api/placeholder/160/90",
        duration: "15:20",
        views: 234000,
        addedDate: "2024.06.15",
        type: "playlist"
      },
      {
        id: "fav-4",
        title: "VR 게임 추천 베스트 10",
        thumbnail: "/api/placeholder/160/90",
        duration: "22:18",
        views: 567000,
        addedDate: "2024.06.10",
        type: "video"
      }
    ],
  
    // 구매 내역
    purchaseHistory: [
      {
        id: "purchase-1",
        type: "membership",
        title: "VIP 멤버십 (월간)",
        amount: 9900,
        date: "2024.06.01",
        status: "active",
        description: "VIP 전용 콘텐츠 및 혜택 이용",
        validUntil: "2024.07.01"
      },
      {
        id: "purchase-2", 
        type: "content",
        title: "VR 게임 개발 비하인드 스토리",
        amount: 3000,
        date: "2024.05.15",
        status: "completed",
        description: "단건 구매 콘텐츠"
      },
      {
        id: "purchase-3",
        type: "vrook",
        title: "VROOK 프리미엄 화보 제작권",
        amount: 15000,
        date: "2024.04.28",
        status: "completed",
        description: "AI 화보 5회 제작 가능"
      },
      {
        id: "purchase-4",
        type: "fanmeeting",
        title: "XR 팬미팅 티켓 (4월)",
        amount: 25000,
        date: "2024.04.10",
        status: "completed",
        description: "VR 환경에서 진행된 팬미팅 참여"
      }
    ],
  
    // 후원 내역
    supportHistory: [
      {
        id: "support-1",
        amount: 5000,
        message: "새로운 스튜디오 응원해요! 화이팅!",
        date: "2024.06.25",
        isAnonymous: false
      },
      {
        id: "support-2",
        amount: 10000,
        message: "항상 좋은 콘텐츠 감사해요 ^^",
        date: "2024.05.30",
        isAnonymous: false
      },
      {
        id: "support-3",
        amount: 3000,
        message: "",
        date: "2024.05.15",
        isAnonymous: true
      },
      {
        id: "support-4",
        amount: 7000,
        message: "VR 게임 리뷰 최고예요!",
        date: "2024.04.20",
        isAnonymous: false
      }
    ],
  
    // 이벤트 참여 기록
    eventHistory: [
      {
        id: "event-1",
        title: "VR 게임 추천 이벤트",
        type: "댓글 이벤트",
        participationDate: "2024.06.20",
        status: "참여 완료",
        reward: "VR 게임 쿠폰",
        isWinner: false
      },
      {
        id: "event-2",
        title: "VROOK 베타 테스터 모집",
        type: "신청 이벤트",
        participationDate: "2024.05.25",
        status: "당선",
        reward: "VROOK 프리미엄 이용권",
        isWinner: true
      },
      {
        id: "event-3",
        title: "구독자 15만명 기념 이벤트",
        type: "댓글 이벤트",
        participationDate: "2024.06.01",
        status: "참여 완료",
        reward: "특별 배지",
        isWinner: true
      }
    ],
  
    // 팬 랭킹 정보
    ranking: {
      currentRank: 23,
      totalFans: 1024,
      thisMonthRank: 15,
      bestRank: 12,
      bestRankDate: "2024.03.15",
      rankingCategories: [
        { category: "댓글 활동", rank: 18, total: 1024 },
        { category: "후원 금액", rank: 31, total: 1024 },
        { category: "시청 시간", rank: 25, total: 1024 },
        { category: "이벤트 참여", rank: 12, total: 1024 }
      ]
    }
  }