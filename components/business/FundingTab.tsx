import React, { useState, useEffect } from 'react';
import { Plus, Eye, Edit, Trash2, Calendar, Target, Users, TrendingUp } from 'lucide-react';
import { FundingProject, FundingStatus, FundingStats } from '@/data/fundingData';
import FundingCreationForm from '@/components/business/FundingCreationForm';

// 임시 데이터
const mockFundingProjects: (FundingProject & { stats: FundingStats })[] = [
  {
    id: 'fund-1',
    creatorId: 'creator-1',
    title: 'VR 360도 팬미팅 스튜디오 구축',
    subtitle: '팬들과 더 가까이, 더 생생하게 만날 수 있는 VR 스튜디오를 만들고 싶습니다',
    description: '최첨단 VR 기술로 팬들과 새로운 만남을 선사하고자 합니다.',
    story: '<p>VR 스튜디오 구축을 위한 상세 계획...</p>',
    category: 'tech',
    targetAmount: 50000000,
    currentAmount: 32500000,
    startDate: '2025-06-01',
    endDate: '2025-07-31',
    status: 'active',
    mainImage: '/images/vr-studio.jpg',
    galleryImages: [],
    rewards: [
      {
        id: 'reward-1',
        title: '얼리버드 VR 팬미팅 참여권',
        description: '첫 VR 팬미팅 참여 + 한정판 굿즈',
        type: 'experience',
        price: 50000,
        originalPrice: 70000,
        quantity: 100,
        remainingQuantity: 23,
        isEarlyBird: true,
        earlyBirdEndDate: '2025-06-15',
        estimatedDelivery: '2025-08-15',
        shippingCost: 3000,
        images: [],
        isUnlimited: false
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
    tags: ['VR', '팬미팅', '기술'],
    stats: {
      projectId: 'fund-1',
      totalAmount: 32500000,
      totalSupporters: 567,
      averageAmount: 57320,
      achievementRate: 65,
      remainingDays: 33,
      dailyStats: [],
      rewardStats: [],
      supporterAnalysis: {
        newSupporters: 45,
        returningSupporters: 12
      }
    }
  }
];

const FundingManagementPage: React.FC = () => {
  const [projects, setProjects] = useState(mockFundingProjects);
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'completed'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return project.status === 'active';
    if (selectedTab === 'completed') return project.status === 'success' || project.status === 'completed';
    return true;
  });

  const handleCreateProject = (formData: any) => {
    console.log('Creating project:', formData);
    // 실제로는 API 호출
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  // 생성 폼이 활성화되면 폼 컴포넌트를 렌더링
  if (showCreateForm) {
    return (
      <FundingCreationForm 
        onSubmit={handleCreateProject}
        onCancel={handleCancelCreate}
      />
    );
  }

  const getStatusBadge = (status: FundingStatus) => {
    const statusConfig = {
      draft: { label: '임시저장', class: 'bg-gray-100 text-gray-600' },
      active: { label: '진행중', class: 'bg-blue-100 text-blue-600' },
      success: { label: '성공', class: 'bg-green-100 text-green-600' },
      failed: { label: '실패', class: 'bg-red-100 text-red-600' },
      completed: { label: '완료', class: 'bg-purple-100 text-purple-600' }
    };

    const config = statusConfig[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">펀딩 관리</h1>
          <p className="text-gray-600 mt-1">크라우드펀딩 프로젝트를 생성하고 관리하세요</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          새 프로젝트 생성
        </button>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">진행중인 프로젝트</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 펀딩 금액</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(32500000)}원</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 서포터</p>
              <p className="text-2xl font-bold text-gray-900">567명</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">평균 달성률</p>
              <p className="text-2xl font-bold text-gray-900">65%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: '전체', count: projects.length },
            { key: 'active', label: '진행중', count: projects.filter(p => p.status === 'active').length },
            { key: 'completed', label: '완료', count: projects.filter(p => p.status === 'success' || p.status === 'completed').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* 프로젝트 목록 */}
      <div className="space-y-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              {/* 프로젝트 이미지 */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                {project.mainImage && (
                  <img 
                    src={project.mainImage} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>

              {/* 프로젝트 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.subtitle}</p>
                  </div>
                  {getStatusBadge(project.status)}
                </div>

                {/* 펀딩 진행 현황 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">달성률</p>
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{project.stats.achievementRate}%</span>
                        <span className="text-gray-500">
                          {formatCurrency(project.currentAmount)} / {formatCurrency(project.targetAmount)}원
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(project.stats.achievementRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">서포터</p>
                    <p className="text-lg font-semibold">{project.supporterCount}명</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">남은 기간</p>
                    <p className="text-lg font-semibold">{project.stats.remainingDays}일</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">펀딩 기간</p>
                    <p className="text-sm">{formatDate(project.startDate)} ~ {formatDate(project.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">아직 펀딩 프로젝트가 없습니다</h3>
          <p className="text-gray-500 mb-6">첫 번째 크라우드펀딩 프로젝트를 시작해보세요!</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            새 프로젝트 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default FundingManagementPage;