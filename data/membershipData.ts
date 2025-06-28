// 멤버십 전용 콘텐츠 데이터
export const membershipContents = [
    {
      id: "m1",
      title: "[GOLD 독점] 신곡 녹음 비하인드 풀버전",
      type: "일반 영상",
      membershipLevel: "gold",
      duration: "45:23",
      uploadDate: "2024.06.25",
      likes: 2847,
      views: 15234,
      comments: 234,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m2",
      title: "[SILVER] 팬미팅 준비 브이로그",
      type: "일반 영상",
      membershipLevel: "silver",
      duration: "12:45",
      uploadDate: "2024.06.24",
      likes: 1923,
      views: 8742,
      comments: 156,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m3",
      title: "[BRONZE] 일상 사진 모음집",
      type: "일반 이미지",
      membershipLevel: "bronze",
      duration: "2:30",
      uploadDate: "2024.06.23",
      likes: 3241,
      views: 12453,
      comments: 89,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m4",
      title: "[GOLD 독점] 개인 메시지 - 감사인사",
      type: "일반 영상",
      membershipLevel: "gold",
      duration: "5:12",
      uploadDate: "2024.06.22",
      likes: 4567,
      views: 8932,
      comments: 345,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m5",
      title: "[SILVER] 스튜디오 투어 VR 영상",
      type: "VR 영상",
      membershipLevel: "silver",
      duration: "8:34",
      uploadDate: "2024.06.21",
      likes: 2134,
      views: 6789,
      comments: 123,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m6",
      title: "[BRONZE] 오늘의 셀카",
      type: "일반 이미지",
      membershipLevel: "bronze",
      duration: "1:00",
      uploadDate: "2024.06.20",
      likes: 5678,
      views: 18234,
      comments: 67,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m7",
      title: "[GOLD 독점] 신곡 미리듣기 (1분 버전)",
      type: "일반 영상",
      membershipLevel: "gold",
      duration: "1:00",
      uploadDate: "2024.06.19",
      likes: 6789,
      views: 25643,
      comments: 456,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m8",
      title: "[SILVER] 연습실 라이브 세션",
      type: "일반 영상",
      membershipLevel: "silver",
      duration: "23:45",
      uploadDate: "2024.06.18",
      likes: 3456,
      views: 11234,
      comments: 234,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m9",
      title: "[BRONZE] 오늘의 감정 일기",
      type: "일반 이미지",
      membershipLevel: "bronze",
      duration: "5장",
      uploadDate: "2024.06.17",
      likes: 2345,
      views: 9876,
      comments: 123,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "m10",
      title: "[GOLD 독점] 새 앨범 컨셉 미팅",
      type: "일반 영상",
      membershipLevel: "gold",
      duration: "18:42",
      uploadDate: "2024.06.16",
      likes: 4321,
      views: 13579,
      comments: 289,
      thumbnail: "/api/placeholder/300/200"
    }
  ]
  
  export const membershipTiers = [
    {
      id: "bronze",
      name: "BRONZE",
      emoji: "🥉",
      price: "월 9,900원",
      benefits: [
        "멤버십 전용 콘텐츠",
        "우선 댓글",
        "월 1회 라이브 채팅"
      ],
      bgClass: "bg-white/20",
      borderClass: ""
    },
    {
      id: "silver", 
      name: "SILVER",
      emoji: "🥈",
      price: "월 19,900원",
      benefits: [
        "BRONZE 혜택 포함",
        "독점 비하인드 영상",
        "월 2회 화상 팬미팅",
        "굿즈 10% 할인"
      ],
      bgClass: "bg-white/30",
      borderClass: "border-2 border-white/50"
    },
    {
      id: "gold",
      name: "GOLD", 
      emoji: "🥇",
      price: "월 39,900원",
      benefits: [
        "SILVER 혜택 포함",
        "VR 독점 콘텐츠",
        "개인 메시지 응답",
        "굿즈 20% 할인",
        "한정판 굿즈 우선구매"
      ],
      bgClass: "bg-white/40",
      borderClass: "border-2 border-yellow-300"
    }
  ]