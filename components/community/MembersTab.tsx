import React, { useState } from 'react';
import { Users, Star, TrendingUp, Calendar, DollarSign, MessageCircle, Heart, Filter, Search, MoreVertical } from 'lucide-react';

interface Fan {
  id: string;
  name: string;
  username: string;
  avatar: string;
  membershipGrade: 'GOLD' | 'SILVER' | 'BRONZE';
  fanLevel: number; // 1-90
  joinDate: string;
  lastActive: string;
  totalSupport: number;
  chatMessages: number;
  likes: number;
  eventsJoined: number;
  isOnline: boolean;
}

const mockFans: Fan[] = [
  {
    id: '1',
    name: '김팬님',
    username: '@kimfan',
    avatar: '/api/placeholder/40/40',
    membershipGrade: 'GOLD',
    fanLevel: 78,
    joinDate: '2024-01-15',
    lastActive: '방금 전',
    totalSupport: 150000,
    chatMessages: 245,
    likes: 892,
    eventsJoined: 12,
    isOnline: true
  },
  {
    id: '2',
    name: '이후원',
    username: '@supporter2',
    avatar: '/api/placeholder/40/40',
    membershipGrade: 'SILVER',
    fanLevel: 45,
    joinDate: '2024-02-20',
    lastActive: '5분 전',
    totalSupport: 75000,
    chatMessages: 156,
    likes: 445,
    eventsJoined: 8,
    isOnline: true
  },
  {
    id: '3',
    name: '박구독',
    username: '@subscriber3',
    avatar: '/api/placeholder/40/40',
    membershipGrade: 'BRONZE',
    fanLevel: 23,
    joinDate: '2024-03-10',
    lastActive: '1시간 전',
    totalSupport: 25000,
    chatMessages: 89,
    likes: 234,
    eventsJoined: 3,
    isOnline: false
  }
];

const MembersTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembershipGrade, setSelectedMembershipGrade] = useState<string>('ALL');
  const [selectedFanLevel, setSelectedFanLevel] = useState<string>('ALL');
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const membershipStats = {
    GOLD: { count: 45, percentage: 15 },
    SILVER: { count: 120, percentage: 40 },
    BRONZE: { count: 135, percentage: 45 }
  };

  const fanLevelStats = {
    'Lv.1-10 뉴비': { count: 423, percentage: 33.9 },
    'Lv.11-20 비기너': { count: 298, percentage: 23.9 },
    'Lv.21-30 아티스트': { count: 187, percentage: 15 },
    'Lv.31-40 채릴리': { count: 145, percentage: 11.6 },
    'Lv.41-50 시니어': { count: 89, percentage: 7.1 },
    'Lv.51-60 엑스퍼트': { count: 67, percentage: 5.4 },
    'Lv.61-70 베테랑': { count: 23, percentage: 1.8 },
    'Lv.71-80 마스터': { count: 12, percentage: 1 },
    'Lv.81-90 레전드': { count: 3, percentage: 0.2 }
  };

  const totalFans = Object.values(membershipStats).reduce((sum, stat) => sum + stat.count, 0);

  const getFanLevelName = (level: number) => {
    if (level <= 10) return 'Lv.1-10 뉴비';
    if (level <= 20) return 'Lv.11-20 비기너';
    if (level <= 30) return 'Lv.21-30 아티스트';
    if (level <= 40) return 'Lv.31-40 채릴리';
    if (level <= 50) return 'Lv.41-50 시니어';
    if (level <= 60) return 'Lv.51-60 엑스퍼트';
    if (level <= 70) return 'Lv.61-70 베테랑';
    if (level <= 80) return 'Lv.71-80 마스터';
    return 'Lv.81-90 레전드';
  };

  const getFanLevelColor = (level: number) => {
    if (level <= 10) return 'text-gray-600';
    if (level <= 20) return 'text-green-600';
    if (level <= 30) return 'text-blue-600';
    if (level <= 40) return 'text-purple-600';
    if (level <= 50) return 'text-orange-600';
    if (level <= 60) return 'text-red-600';
    if (level <= 70) return 'text-pink-600';
    if (level <= 80) return 'text-violet-600';
    return 'text-yellow-600';
  };

  const getMembershipGradeColor = (grade: string) => {
    switch (grade) {
      case 'GOLD': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'SILVER': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 'BRONZE': return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-gray-500';
    }
  };

  const getMembershipGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case 'GOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'SILVER': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'BRONZE': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredFans = mockFans.filter(fan => {
    const matchesSearch = fan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fan.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembershipGrade = selectedMembershipGrade === 'ALL' || fan.membershipGrade === selectedMembershipGrade;
    const matchesFanLevel = selectedFanLevel === 'ALL' || getFanLevelName(fan.fanLevel) === selectedFanLevel;
    return matchesSearch && matchesMembershipGrade && matchesFanLevel;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  if (selectedFan) {
    return (
      <div className="space-y-6">
        {/* 뒤로가기 헤더 */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedFan(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            ← 목록으로
          </button>
          <h2 className="text-xl font-bold">팬 상세 프로필</h2>
        </div>

        {/* 팬 상세 정보 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={selectedFan.avatar}
                alt={selectedFan.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              {selectedFan.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">{selectedFan.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMembershipGradeBadgeColor(selectedFan.membershipGrade)}`}>
                  {selectedFan.membershipGrade}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFanLevelColor(selectedFan.fanLevel)}`}>
                  Lv.{selectedFan.fanLevel}
                </span>
              </div>
              <p className="text-gray-600 mb-1">{selectedFan.username}</p>
              <p className="text-sm text-gray-500">
                가입일: {new Date(selectedFan.joinDate).toLocaleDateString('ko-KR')}
              </p>
              <p className="text-sm text-gray-500">
                마지막 활동: {selectedFan.lastActive}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                메시지 보내기
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 활동 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(selectedFan.totalSupport)}</p>
                <p className="text-sm text-gray-600">총 펀딩</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{selectedFan.chatMessages.toLocaleString()}</p>
                <p className="text-sm text-gray-600">채팅 메시지</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{selectedFan.likes.toLocaleString()}</p>
                <p className="text-sm text-gray-600">좋아요</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{selectedFan.eventsJoined}</p>
                <p className="text-sm text-gray-600">참여 이벤트</p>
              </div>
            </div>
          </div>
        </div>

        {/* 활동 이력 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">최근 활동 이력</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">채팅방에서 메시지 보냄</p>
                  <p className="text-sm text-gray-600">5분 전</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">게시물에 좋아요</p>
                  <p className="text-sm text-gray-600">1시간 전</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">이벤트 참여</p>
                  <p className="text-sm text-gray-600">2일 전</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 멤버십 등급별 현황 대시보드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-gray-600" />
            <div>
              <p className="text-2xl font-bold">{totalFans.toLocaleString()}</p>
              <p className="text-sm text-gray-600">총 팬</p>
            </div>
          </div>
        </div>

        {Object.entries(membershipStats).map(([grade, stats]) => (
          <div key={grade} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded ${getMembershipGradeColor(grade)} flex items-center justify-center`}>
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.count}</p>
                <p className="text-sm text-gray-600 uppercase">{grade} ({stats.percentage}%)</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 팬 레벨 분포 차트 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">팬 레벨 분포</h3>
          <span className="text-sm text-gray-500">활동 기반</span>
        </div>
        <div className="space-y-4">
          {Object.entries(fanLevelStats).map(([level, stats]) => (
            <div key={level} className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700">{level}</span>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300" 
                    style={{width: `${Math.min(stats.percentage, 100)}%`}}
                  ></div>
                </div>
                <div className="text-right min-w-[80px]">
                  <span className="text-sm font-semibold text-gray-900">{stats.count}명</span>
                  <span className="text-xs text-gray-500 ml-1">({stats.percentage}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="팬 이름 또는 아이디로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedMembershipGrade}
              onChange={(e) => setSelectedMembershipGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">모든 멤버십</option>
              <option value="GOLD">GOLD</option>
              <option value="SILVER">SILVER</option>
              <option value="BRONZE">BRONZE</option>
            </select>

            <select
              value={selectedFanLevel}
              onChange={(e) => setSelectedFanLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">모든 레벨</option>
              {Object.keys(fanLevelStats).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              필터
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">가입일</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>최근 1주일</option>
                  <option>최근 1개월</option>
                  <option>최근 3개월</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">활동도</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>매우 활발</option>
                  <option>활발</option>
                  <option>보통</option>
                  <option>비활성</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">펀딩 금액</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>10만원 이상</option>
                  <option>5만원 이상</option>
                  <option>1만원 이상</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">멤버십 등급</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>GOLD</option>
                  <option>SILVER</option>
                  <option>BRONZE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">팬 레벨</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>Lv.1-10 뉴비</option>
                  <option>Lv.11-20 비기너</option>
                  <option>Lv.21-30 아티스트</option>
                  <option>기타 레벨...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>전체</option>
                  <option>온라인</option>
                  <option>오프라인</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 팬 목록 */}
      {/* 팬 목록 */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">팬 목록 ({filteredFans.length}명)</h3>
        </div>

        {/* 데스크톱 레이아웃 */}
        <div className="hidden md:block divide-y">
          {filteredFans.map((fan) => (
            <div
              key={fan.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedFan(fan)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={fan.avatar}
                    alt={fan.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {fan.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{fan.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMembershipGradeBadgeColor(fan.membershipGrade)}`}>
                      {fan.membershipGrade}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFanLevelColor(fan.fanLevel)}`}>
                      Lv.{fan.fanLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{fan.username}</p>
                  <p className="text-gray-500 text-xs">마지막 활동: {fan.lastActive}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{formatCurrency(fan.totalSupport)}</p>
                    <p>펀딩</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{fan.chatMessages}</p>
                    <p>채팅</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{fan.likes}</p>
                    <p>좋아요</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{fan.eventsJoined}</p>
                    <p>이벤트</p>
                  </div>
                </div>

                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  관리
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 레이아웃 */}
        <div className="md:hidden divide-y">
          {filteredFans.map((fan) => (
            <div key={fan.id} className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative">
                  <img
                    src={fan.avatar}
                    alt={fan.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {fan.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold truncate">{fan.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMembershipGradeBadgeColor(fan.membershipGrade)}`}>
                      {fan.membershipGrade}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFanLevelColor(fan.fanLevel)}`}>
                      Lv.{fan.fanLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm truncate">{fan.username}</p>
                  <p className="text-gray-500 text-xs">마지막 활동: {fan.lastActive}</p>
                </div>

                <button 
                  onClick={() => setSelectedFan(fan)}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  관리
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3 text-sm text-center">
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{formatCurrency(fan.totalSupport)}</p>
                  <p className="text-gray-600 text-xs">펀딩</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{fan.chatMessages}</p>
                  <p className="text-gray-600 text-xs">채팅</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{fan.likes}</p>
                  <p className="text-gray-600 text-xs">좋아요</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs">{fan.eventsJoined}</p>
                  <p className="text-gray-600 text-xs">이벤트</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default MembersTab;