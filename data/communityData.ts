// 팬톡 채팅방 데이터
export const chatRooms = [
    {
      id: "general",
      name: "전체 채팅",
      description: "모든 팬들이 자유롭게 소통하는 공간",
      memberCount: 1247,
      isActive: true,
      accessLevel: "all", // all, premium, vip
      unreadCount: 0,
      latestMessage: {
        user: "팬님1234",
        message: "오늘 콘텐츠 너무 좋았어요! 💕",
        timestamp: "방금 전"
      }
    },
    {
      id: "vip",
      name: "VIP 채팅",
      description: "프리미엄 멤버십 이상만 입장 가능",
      memberCount: 89,
      isActive: true,
      accessLevel: "premium",
      unreadCount: 3,
      latestMessage: {
        user: "VIP팬567",
        message: "다음 VROOK 언제 나오나요?",
        timestamp: "3분 전"
      }
    },
    {
      id: "gold",
      name: "골드 채팅",
      description: "골드 등급 팬들만의 특별한 공간",
      memberCount: 23,
      isActive: true,
      accessLevel: "gold",
      unreadCount: 1,
      latestMessage: {
        user: "골드팬890",
        message: "팬미팅 정말 기대돼요!",
        timestamp: "7분 전"
      }
    }
  ]
  
  // 공지사항 데이터
  export const announcements = [
    {
      id: "ann-1",
      title: "7월 XR 팬미팅 일정 공지",
      content: "7월 15일 오후 8시에 진행될 XR 팬미팅의 상세 일정을 안내드립니다. 많은 참여 부탁드려요!",
      date: "2024.06.28",
      isImportant: true,
      views: 3421
    },
    {
      id: "ann-2", 
      title: "새로운 VROOK 콘텐츠 예고",
      content: "다음 주에 공개될 새로운 VROOK 콘텐츠의 티저를 공개합니다. 기대해주세요!",
      date: "2024.06.25",
      isImportant: false,
      views: 2156
    },
    {
      id: "ann-3",
      title: "커뮤니티 이용 규칙 안내",
      content: "건전한 커뮤니티 문화를 위한 기본 규칙들을 안내드립니다. 모든 팬분들의 협조 부탁드려요.",
      date: "2024.06.20",
      isImportant: false,
      views: 1890
    }
  ]
  
  // 팬 레벨 시스템
  export const fanLevelSystem = {
    currentLevel: {
      level: 7,
      name: "실버 팬",
      currentExp: 1250,
      requiredExp: 2000,
      percentage: 62.5
    },
    levels: [
      { level: 1, name: "새내기 팬", requiredExp: 0, color: "#gray" },
      { level: 2, name: "주니어 팬", requiredExp: 100, color: "#green" },
      { level: 3, name: "시니어 팬", requiredExp: 300, color: "#blue" },
      { level: 4, name: "브론즈 팬", requiredExp: 600, color: "#orange" },
      { level: 5, name: "실버 팬", requiredExp: 1000, color: "#silver" },
      { level: 6, name: "골드 팬", requiredExp: 1500, color: "#gold" },
      { level: 7, name: "플래티넘 팬", requiredExp: 2000, color: "#platinum" },
      { level: 8, name: "다이아 팬", requiredExp: 3000, color: "#diamond" },
      { level: 9, name: "마스터 팬", requiredExp: 5000, color: "#purple" },
      { level: 10, name: "레전드 팬", requiredExp: 10000, color: "#rainbow" }
    ],
    badges: [
      { id: "early-bird", name: "얼리버드", description: "채널 초기 가입자", earned: true, date: "2024.03.15" },
      { id: "commentor", name: "댓글 마스터", description: "댓글 100개 작성", earned: true, date: "2024.05.20" },
      { id: "supporter", name: "든든한 펀딩 참여자", description: "총 펀딩 금액 10만원 달성", earned: false, date: null },
      { id: "vrook-lover", name: "VROOK 러버", description: "VROOK 콘텐츠 5개 구매", earned: true, date: "2024.06.10" },
      { id: "chatting-king", name: "수다쟁이", description: "팬톡 메시지 1000개 작성", earned: false, date: null }
    ]
  }
  
  // 팬 투표/설문 데이터
  export const polls = [
    {
      id: "poll-1",
      title: "다음 VROOK 콘텐츠 컨셉 투표",
      description: "다음에 제작할 VROOK 콘텐츠의 컨셉을 투표로 결정해요!",
      type: "single", // single, multiple
      options: [
        { id: "opt-1", text: "우아한 드레스 컨셉", votes: 456, percentage: 38.2 },
        { id: "opt-2", text: "캐주얼 데일리 컨셉", votes: 321, percentage: 26.9 },
        { id: "opt-3", text: "스포티 액티브 컨셉", votes: 287, percentage: 24.0 },
        { id: "opt-4", text: "빈티지 레트로 컨셉", votes: 130, percentage: 10.9 }
      ],
      totalVotes: 1194,
      endDate: "2024.07.05",
      isActive: true,
      hasVoted: false
    },
    {
      id: "poll-2",
      title: "선호하는 콘텐츠 업로드 시간",
      description: "언제 새로운 콘텐츠가 올라오면 좋을까요?",
      type: "single",
      options: [
        { id: "opt-1", text: "오후 6시-8시", votes: 234, percentage: 42.3 },
        { id: "opt-2", text: "오후 8시-10시", votes: 198, percentage: 35.8 },
        { id: "opt-3", text: "오후 10시-12시", votes: 89, percentage: 16.1 },
        { id: "opt-4", text: "새벽 12시-2시", votes: 32, percentage: 5.8 }
      ],
      totalVotes: 553,
      endDate: "2024.06.30",
      isActive: false,
      hasVoted: true
    }
  ]
  // 기존 announcements, polls 데이터 아래에 추가
  export const posts = [
    {
      id: "post-1",
      title: "오늘 촬영 후기 ✨",
      content: "오늘 새로운 VROOK 콘텐츠 촬영했어요! ...",
      date: "2024.06.29",
      type: "general",
      author: "케인",
      likes: 892,
      comments: 45,
      isLiked: false,
      images: []
    },
    // ... 추가 게시글들
    {
    id: "post-2", 
    title: "팬분들께 감사의 말씀 💕",
    content: "안녕하세요 팬여러분! 벌써 채널 구독자가 1000명을 넘었네요 🎉\n\n정말 믿기지 않아요. 작은 채널에서 시작했는데 이렇게 많은 분들이 응원해주시다니... 진짜 감동입니다 ㅠㅠ\n\n앞으로도 더 재밌고 퀄리티 높은 콘텐츠로 보답하겠습니다! 사랑해요 💜",
    date: "2024.06.27",
    type: "general", 
    author: "케인",
    likes: 1247,
    comments: 89,
    isLiked: true,
    images: []
  },
  {
    id: "post-3",
    title: "주말에 뭐하고 계세요?",
    content: "주말 오후인데 다들 뭐하고 계신가요? 😊\n\n저는 집에서 다음 콘텐츠 기획하면서 여러분 댓글 읽고 있어요. 정말 하나하나 다 읽고 있답니다!\n\n혹시 다음에 해봤으면 하는 콘텐츠나 컨셉 있으면 댓글로 알려주세요. 여러분의 의견이 제일 소중해요 ✨",
    date: "2024.06.25",
    type: "general",
    author: "케인", 
    likes: 634,
    comments: 156,
    isLiked: false,
    images: []
  }
  ]
  
  // 팬미팅 신청 데이터
  export const fanmeetings = [
    {
      id: "fm-1",
      title: "7월 생일 기념 XR 팬미팅",
      description: "특별한 생일을 함께 축하해요! XR 가상공간에서 만나요.",
      date: "2024.07.15",
      time: "20:00-22:00",
      type: "XR", // XR, offline, online
      maxParticipants: 100,
      currentApplicants: 73,
      applicationEndDate: "2024.07.13",
      isApplicationOpen: true,
      hasApplied: false,
      requirements: ["프리미엄 멤버십 이상", "VR 헤드셋 권장"],
      prizes: ["XR 팬미팅 참여권", "특별 굿즈", "1:1 대화 기회"]
    },
    {
      id: "fm-2",
      title: "오프라인 팬사인회",
      description: "서울에서 진행되는 소규모 팬사인회입니다.",
      date: "2024.08.20",
      time: "14:00-17:00", 
      type: "offline",
      maxParticipants: 50,
      currentApplicants: 127,
      applicationEndDate: "2024.07.25",
      isApplicationOpen: true,
      hasApplied: true,
      requirements: ["서울 거주자", "골드 등급 이상"],
      prizes: ["사인 앨범", "포토타임", "굿즈 증정"]
    }
  ]
  
  // 팬 이벤트 데이터
  export const fanEvents = [
    {
      id: "event-1",
      title: "댓글 이벤트 - 응원 메시지 남기기",
      description: "가장 따뜻한 응원 메시지를 남겨주세요! 선정된 분께는 특별한 선물을 드려요.",
      type: "comment", // comment, photo, video, mission
      startDate: "2024.06.25",
      endDate: "2024.07.10",
      isActive: true,
      participants: 892,
      maxWinners: 5,
      prizes: ["사인 포토카드", "개인 메시지", "굿즈 세트"],
      howToParticipate: "이 게시글에 응원 메시지 댓글 작성",
      hasParticipated: false
    },
    {
      id: "event-2",
      title: "팬아트 콘테스트",
      description: "재능 있는 팬분들의 창작물을 기다리고 있어요!",
      type: "photo",
      startDate: "2024.07.01", 
      endDate: "2024.07.31",
      isActive: true,
      participants: 45,
      maxWinners: 3,
      prizes: ["1등: VIP 팬미팅 초대", "2등: VROOK 패키지", "3등: 굿즈 세트"],
      howToParticipate: "팬아트 이미지를 댓글로 업로드",
      hasParticipated: true
    },
    {
      id: "event-3",
      title: "출석체크 이벤트",
      description: "7일 연속 출석하면 특별한 보상을 드려요!",
      type: "mission",
      startDate: "2024.06.20",
      endDate: "2024.07.20", 
      isActive: true,
      participants: 1456,
      maxWinners: null, // 조건 달성자 모두
      prizes: ["특별 배지", "팬 레벨 경험치 +100"],
      howToParticipate: "매일 커뮤니티 탭 방문하여 출석체크",
      hasParticipated: true,
      progress: {
        current: 4,
        required: 7,
        streak: true
      }
    }
  ]