// 펀딩 프로젝트 상태
export type FundingStatus = 'draft' | 'active' | 'success' | 'failed' | 'completed';

// 리워드 타입
export type RewardType = 'product' | 'service' | 'experience' | 'digital';

// 펀딩 카테고리
export type FundingCategory = 'tech' | 'fashion' | 'food' | 'beauty' | 'lifestyle' | 'content' | 'other';

// 리워드 패키지
export interface FundingReward {
  id: string;
  title: string;
  description: string;
  type: RewardType;
  price: number;
  originalPrice?: number; // 할인 표시용
  quantity: number; // 제한 수량
  remainingQuantity: number; // 남은 수량
  isEarlyBird: boolean; // 얼리버드 여부
  earlyBirdEndDate?: string; // 얼리버드 마감일
  estimatedDelivery: string; // 예상 배송일
  shippingCost: number; // 배송비
  images: string[]; // 리워드 이미지
  options?: {
    name: string; // 옵션명 (색상, 사이즈 등)
    values: string[]; // 옵션값들
  }[];
  isUnlimited: boolean; // 무제한 수량 여부
}

// 펀딩 프로젝트
export interface FundingProject {
  id: string;
  creatorId: string;
  title: string;
  subtitle: string;
  description: string; // 간단한 설명
  story: string; // 상세 스토리 (HTML)
  category: FundingCategory;
  
  // 펀딩 설정
  targetAmount: number; // 목표 금액
  currentAmount: number; // 현재 달성 금액
  startDate: string;
  endDate: string;
  status: FundingStatus;
  
  // 미디어
  mainImage: string; // 대표 이미지
  mainVideo?: string; // 대표 영상
  galleryImages: string[]; // 갤러리 이미지들
  
  // 리워드
  rewards: FundingReward[];
  
  // 통계
  supporterCount: number; // 서포터 수
  viewCount: number; // 조회수
  likeCount: number; // 좋아요 수
  
  // 정책
  refundPolicy: string; // 환불 정책
  shippingPolicy: string; // 배송 정책
  cautionNote: string; // 주의사항
  
  // 메타데이터
  createdAt: string;
  updatedAt: string;
  publishedAt?: string; // 공개일
  tags: string[];
}

// 펀딩 참여 (서포터)
export interface FundingSupporter {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rewardId: string;
  rewardTitle: string;
  amount: number;
  quantity: number;
  selectedOptions?: Record<string, string>; // 선택한 옵션들
  message: string; // 응원 메시지
  isAnonymous: boolean;
  
  // 결제 정보
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  paymentDate?: string;
  
  // 배송 정보
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    zipCode: string;
    memo?: string;
  };
  shippingStatus: 'pending' | 'preparing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  
  createdAt: string;
  updatedAt: string;
}

// 프로젝트 업데이트
export interface FundingUpdate {
  id: string;
  projectId: string;
  title: string;
  content: string; // HTML
  images?: string[];
  isPublic: boolean; // 전체 공개 or 서포터만
  createdAt: string;
}

// Q&A
export interface FundingQA {
  id: string;
  projectId: string;
  question: string;
  answer?: string;
  isPublic: boolean;
  userId: string;
  userName: string;
  createdAt: string;
  answeredAt?: string;
}

// 펀딩 통계
export interface FundingStats {
  projectId: string;
  totalAmount: number;
  totalSupporters: number;
  averageAmount: number;
  achievementRate: number; // 달성률 (%)
  remainingDays: number;
  
  // 일별 통계
  dailyStats: {
    date: string;
    amount: number;
    supporters: number;
    newSupporters: number;
  }[];
  
  // 리워드별 통계
  rewardStats: {
    rewardId: string;
    rewardTitle: string;
    totalQuantity: number;
    soldQuantity: number;
    totalAmount: number;
  }[];
  
  // 서포터 분석
  supporterAnalysis: {
    newSupporters: number;
    returningSupporters: number;
    averageAge?: number;
    genderDistribution?: {
      male: number;
      female: number;
      other: number;
    };
    regionDistribution?: Record<string, number>;
  };
}

// 펀딩 폼 데이터 (생성/수정용)
export interface FundingProjectForm {
  title: string;
  subtitle: string;
  description: string;
  story: string;
  category: FundingCategory;
  targetAmount: number;
  startDate: string;
  endDate: string;
  mainImage: File | string;
  mainVideo?: File | string;
  galleryImages: (File | string)[];
  rewards: Omit<FundingReward, 'id'>[];
  refundPolicy: string;
  shippingPolicy: string;
  cautionNote: string;
  tags: string[];
}

// API 응답 타입들
export interface FundingListResponse {
  projects: FundingProject[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FundingDetailResponse extends FundingProject {
  updates: FundingUpdate[];
  qas: FundingQA[];
  stats: FundingStats;
  recentSupporters: Omit<FundingSupporter, 'shippingInfo'>[];
}

// 펀딩 필터 옵션
export interface FundingFilter {
  category?: FundingCategory;
  status?: FundingStatus;
  sortBy?: 'newest' | 'popular' | 'ending' | 'amount';
  search?: string;
}