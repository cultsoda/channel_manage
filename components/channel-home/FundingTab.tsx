import React, { useState } from 'react';
import { Calendar, Target, Users, Heart, MessageCircle, Share2, Clock, Package, CheckCircle, TrendingUp } from 'lucide-react';
import { FundingProject, FundingReward, FundingSupporter } from '@/data/fundingData';

interface Props {
  project: FundingProject;
  supporters: FundingSupporter[];
  onFundingParticipate: (rewardId: string, amount: number) => void;
}

// 임시 데이터
const mockProject: FundingProject = {
  id: 'fund-1',
  creatorId: 'creator-1',
  title: 'VR 360도 팬미팅 스튜디오 구축',
  subtitle: '팬들과 더 가까이, 더 생생하게 만날 수 있는 VR 스튜디오를 만들고 싶습니다',
  description: '최첨단 VR 기술로 팬들과 새로운 만남을 선사하고자 합니다.',
  story: `
    <div class="space-y-6">
      <h3 class="text-xl font-bold">🎯 프로젝트 목표</h3>
      <p>안녕하세요! 저희는 팬분들과 더욱 특별하고 생생한 만남을 위해 VR 360도 팬미팅 스튜디오를 구축하고자 합니다.</p>
      
      <h3 class="text-xl font-bold">✨ 왜 VR 스튜디오인가요?</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>거리의 제약 없이 전 세계 팬들과 만날 수 있어요</li>
        <li>360도 몰입형 경험으로 더욱 생생한 만남이 가능해요</li>
        <li>코로나19와 같은 상황에서도 안전하게 소통할 수 있어요</li>
      </ul>
      
      <h3 class="text-xl font-bold">🛠️ 어떻게 사용될까요?</h3>
      <p>구축된 VR 스튜디오는 월 1-2회 정기 팬미팅과 특별한 이벤트를 위해 사용됩니다. 서포터분들께는 우선적으로 참여 기회가 주어집니다!</p>
    </div>
  `,
  category: 'tech',
  targetAmount: 50000000,
  currentAmount: 32500000,
  startDate: '2025-06-01',
  endDate: '2025-07-31',
  status: 'active',
  mainImage: '/images/vr-studio-main.jpg',
  galleryImages: ['/images/vr-1.jpg', '/images/vr-2.jpg'],
  rewards: [
    {
      id: 'reward-1',
      title: '얼리버드 VR 팬미팅 참여권',
      description: '첫 VR 팬미팅 참여권 + 한정판 굿즈 패키지 + 디지털 포토카드',
      type: 'experience',
      price: 50000,
      originalPrice: 70000,
      quantity: 100,
      remainingQuantity: 23,
      isEarlyBird: true,
      earlyBirdEndDate: '2025-06-15',
      estimatedDelivery: '2025-08-15',
      shippingCost: 3000,
      images: ['/images/reward-1.jpg'],
      isUnlimited: false
    },
    {
      id: 'reward-2',
      title: 'VR 팬미팅 참여권',
      description: 'VR 팬미팅 참여권 + 기본 굿즈 패키지',
      type: 'experience',
      price: 30000,
      quantity: 200,
      remainingQuantity: 156,
      isEarlyBird: false,
      estimatedDelivery: '2025-08-15',
      shippingCost: 3000,
      images: ['/images/reward-2.jpg'],
      isUnlimited: false
    },
    {
      id: 'reward-3',
      title: '응원 메시지',
      description: '프로젝트를 응원합니다! 감사 메시지를 받아보세요.',
      type: 'digital',
      price: 5000,
      quantity: 0,
      remainingQuantity: 0,
      isEarlyBird: false,
      estimatedDelivery: '2025-07-01',
      shippingCost: 0,
      images: [],
      isUnlimited: true
    }
  ],
  supporterCount: 567,
  viewCount: 12450,
  likeCount: 892,
  refundPolicy: '목표 미달성시 100% 환불',
  shippingPolicy: '국내 배송만 가능',
  cautionNote: 'VR 기기가 필요합니다',
  createdAt: '2025-05-15',
  updatedAt: '2025-06-28',
  publishedAt: '2025-06-01',
  tags: ['VR', '팬미팅', '기술']
};

const mockSupporters: FundingSupporter[] = [
  {
    id: 'sup-1',
    projectId: 'fund-1',
    userId: 'user-1',
    userName: '열정팬ABC',
    userAvatar: '/avatars/user1.jpg',
    rewardId: 'reward-1',
    rewardTitle: '얼리버드 VR 팬미팅 참여권',
    amount: 50000,
    quantity: 1,
    message: '드디어 VR로 만날 수 있다니! 너무 기대돼요 💕',
    isAnonymous: false,
    paymentStatus: 'completed',
    paymentMethod: '카드',
    paymentDate: '2025-06-28',
    shippingInfo: {
      name: '김팬',
      phone: '010-1234-5678',
      address: '서울시 강남구',
      zipCode: '12345'
    },
    shippingStatus: 'pending',
    createdAt: '2025-06-28T10:30:00Z',
    updatedAt: '2025-06-28T10:30:00Z'
  },
  {
    id: 'sup-2',
    projectId: 'fund-1',
    userId: 'user-2',
    userName: '익명',
    rewardId: 'reward-2',
    rewardTitle: 'VR 팬미팅 참여권',
    amount: 30000,
    quantity: 1,
    message: '항상 응원합니다!',
    isAnonymous: true,
    paymentStatus: 'completed',
    paymentMethod: '계좌이체',
    paymentDate: '2025-06-28',
    shippingInfo: {
      name: '이팬',
      phone: '010-2345-6789',
      address: '부산시 해운대구',
      zipCode: '23456'
    },
    shippingStatus: 'pending',
    createdAt: '2025-06-28T09:15:00Z',
    updatedAt: '2025-06-28T09:15:00Z'
  }
];

const FundingSection: React.FC<Props> = ({ 
  project = mockProject, 
  supporters = mockSupporters, 
  onFundingParticipate 
}) => {
  const [selectedTab, setSelectedTab] = useState<'story' | 'rewards' | 'updates' | 'qa'>('story');
  const [selectedReward, setSelectedReward] = useState<FundingReward | null>(null);

  const achievementRate = Math.min((project.currentAmount / project.targetAmount) * 100, 100);
  const remainingDays = Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const handleRewardSelect = (reward: FundingReward) => {
    setSelectedReward(reward);
    onFundingParticipate(reward.id, reward.price);
  };

  if (project.status === 'draft') {
    return null; // 임시저장 상태는 표시하지 않음
  }

  return (
    <div className="w-full">
      {/* 프로젝트 헤더 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        {/* 대표 이미지/영상 */}
        <div className="relative h-96 bg-gray-200">
          {project.mainImage && (
            <img 
              src={project.mainImage} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'active' ? 'bg-blue-100 text-blue-600' :
              project.status === 'success' ? 'bg-green-100 text-green-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              {project.status === 'active' ? '펀딩 진행중' :
               project.status === 'success' ? '펀딩 성공' : '펀딩 종료'}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* 프로젝트 기본 정보 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-4">{project.subtitle}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{formatCurrency(project.viewCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{formatCurrency(project.likeCount)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.startDate)} ~ {formatDate(project.endDate)}</span>
              </div>
            </div>
          </div>

          {/* 펀딩 현황 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* 달성률 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">달성률</span>
                <span className="text-lg font-bold text-blue-600">{achievementRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(achievementRate, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {formatCurrency(project.currentAmount)}원 / {formatCurrency(project.targetAmount)}원
              </div>
            </div>

            {/* 서포터 수 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">서포터</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(project.supporterCount)}명</div>
              <div className="text-xs text-gray-500">목표 달성을 응원하고 있어요</div>
            </div>

            {/* 남은 기간 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">남은 기간</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{remainingDays}일</div>
              <div className="text-xs text-gray-500">
                {project.status === 'active' ? '펀딩 마감까지' : '펀딩이 종료되었습니다'}
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedTab('rewards')}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
              disabled={project.status !== 'active'}
            >
              {project.status === 'active' ? '펀딩 참여하기' : '펀딩 종료'}
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { key: 'story', label: '프로젝트 스토리', icon: MessageCircle },
              { key: 'rewards', label: '리워드 선택', icon: Package },
              { key: 'updates', label: '업데이트', icon: TrendingUp },
              { key: 'qa', label: 'Q&A', icon: MessageCircle }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === tab.key
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* 프로젝트 스토리 */}
          {selectedTab === 'story' && (
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.story }} />
              
              {/* 프로젝트 정책 */}
              <div className="mt-8 space-y-6 border-t pt-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">환불 정책</h4>
                  <p className="text-gray-600">{project.refundPolicy}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">배송 정책</h4>
                  <p className="text-gray-600">{project.shippingPolicy}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">주의사항</h4>
                  <p className="text-gray-600">{project.cautionNote}</p>
                </div>
              </div>
            </div>
          )}

          {/* 리워드 선택 */}
          {selectedTab === 'rewards' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">리워드를 선택해주세요</h3>
                <p className="text-gray-600 mb-6">서포터가 되어 프로젝트를 응원하고 특별한 리워드를 받아보세요!</p>
              </div>

              <div className="space-y-4">
                {project.rewards.map(reward => (
                  <div key={reward.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{reward.title}</h4>
                          {reward.isEarlyBird && (
                            <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                              얼리버드
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{reward.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>예상 배송: {formatDate(reward.estimatedDelivery)}</span>
                          </div>
                          {!reward.isUnlimited && (
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              <span>남은 수량: {reward.remainingQuantity}개</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="flex items-center gap-2 mb-2">
                          {reward.originalPrice && (
                            <span className="text-gray-400 line-through">
                              {formatCurrency(reward.originalPrice)}원
                            </span>
                          )}
                          <span className="text-xl font-bold text-blue-600">
                            {formatCurrency(reward.price)}원
                          </span>
                        </div>
                        {reward.shippingCost > 0 && (
                          <div className="text-xs text-gray-500">
                            배송비: {formatCurrency(reward.shippingCost)}원
                          </div>
                        )}
                      </div>
                    </div>

                    {reward.isEarlyBird && reward.earlyBirdEndDate && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-orange-700">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            얼리버드 할인 마감: {formatDate(reward.earlyBirdEndDate)}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleRewardSelect(reward)}
                      disabled={project.status !== 'active' || (!reward.isUnlimited && reward.remainingQuantity === 0)}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                    >
                      {project.status !== 'active' ? '펀딩 종료' :
                       !reward.isUnlimited && reward.remainingQuantity === 0 ? '품절' :
                       '이 리워드 선택하기'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 업데이트 */}
          {selectedTab === 'updates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">프로젝트 업데이트</h3>
                <p className="text-gray-600">프로젝트 진행 상황과 소식을 확인하세요.</p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-500">2025.06.28</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">펀딩 65% 달성! 감사드립니다</h4>
                  <p className="text-gray-600">
                    많은 서포터분들의 응원 덕분에 목표의 65%를 달성했습니다. 
                    VR 스튜디오 구축을 위한 장비 구매가 확정되었으며, 
                    더욱 완성도 높은 팬미팅을 준비하겠습니다.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-500">2025.06.20</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">VR 스튜디오 설계 완료</h4>
                  <p className="text-gray-600">
                    전문 업체와의 협의를 통해 VR 스튜디오 설계가 완료되었습니다. 
                    최신 VR 기술과 고품질 음향 시스템을 도입하여 
                    최고의 팬미팅 경험을 제공할 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Q&A */}
          {selectedTab === 'qa' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Q&A</h3>
                <p className="text-gray-600">프로젝트에 대한 궁금한 점을 물어보세요.</p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">Q</span>
                      </div>
                      <span className="font-medium">VR 기기가 없어도 참여할 수 있나요?</span>
                    </div>
                    <p className="text-gray-600 ml-8">VR 기기를 따로 준비해야 하는지 궁금합니다.</p>
                  </div>

                  <div className="ml-8 pl-4 border-l-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600">A</span>
                      </div>
                      <span className="font-medium text-green-700">메이커 답변</span>
                    </div>
                    <p className="text-gray-700">
                      VR 기기가 없으셔도 걱정하지 마세요! 
                      기본 참여는 모바일이나 PC로도 가능하며, 
                      VR 기기가 있으시면 더욱 몰입감 있는 경험을 하실 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">Q</span>
                      </div>
                      <span className="font-medium">해외 거주자도 참여 가능한가요?</span>
                    </div>
                    <p className="text-gray-600 ml-8">현재 해외에 거주하고 있는데 VR 팬미팅 참여가 가능한지 알고 싶습니다.</p>
                  </div>

                  <div className="ml-8 pl-4 border-l-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-600">A</span>
                      </div>
                      <span className="font-medium text-green-700">메이커 답변</span>
                    </div>
                    <p className="text-gray-700">
                      네, 물론입니다! VR 팬미팅은 온라인으로 진행되므로 
                      전 세계 어디서든 참여하실 수 있습니다. 
                      다만 굿즈 배송의 경우 국내 배송만 가능한 점 양해 부탁드립니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 font-medium">
                  질문하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 서포터 현황 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">서포터 현황</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 최근 서포터 */}
          <div>
            <h4 className="text-lg font-semibold mb-3">최근 서포터</h4>
            <div className="space-y-3">
              {supporters.slice(0, 5).map(supporter => (
                <div key={supporter.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {supporter.userAvatar ? (
                      <img src={supporter.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-blue-600 font-medium text-sm">
                        {supporter.userName.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{supporter.userName}</span>
                      <span className="text-xs text-gray-500">
                        {formatCurrency(supporter.amount)}원
                      </span>
                    </div>
                    {supporter.message && (
                      <p className="text-xs text-gray-600 truncate mt-1">
                        "{supporter.message}"
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(supporter.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 펀딩 통계 */}
          <div>
            <h4 className="text-lg font-semibold mb-3">펀딩 통계</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">평균 펀딩 금액</span>
                <span className="font-medium">
                  {formatCurrency(Math.round(project.currentAmount / project.supporterCount))}원
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">목표까지 남은 금액</span>
                <span className="font-medium text-blue-600">
                  {formatCurrency(project.targetAmount - project.currentAmount)}원
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">예상 완료일</span>
                <span className="font-medium">
                  {achievementRate >= 100 ? '목표 달성!' : formatDate(project.endDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingSection;