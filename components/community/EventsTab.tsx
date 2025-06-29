import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Trophy, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Gift,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  Star,
  Copy,
  Download
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'photo' | 'comment' | 'vote' | 'lottery';
  status: 'active' | 'completed' | 'draft' | 'scheduled';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants?: number;
  prize: string;
  winners?: number;
  participantGrades: ('VIP' | 'PREMIUM' | 'BASIC')[];
  thumbnail: string;
  createdAt: string;
}

interface Participant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  grade: 'VIP' | 'PREMIUM' | 'BASIC';
  joinedAt: string;
  submissionData?: any;
  isWinner?: boolean;
}

interface EventTemplate {
  id: string;
  name: string;
  type: 'quiz' | 'photo' | 'comment' | 'vote' | 'lottery';
  description: string;
  settings: any;
  usageCount: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: '6월 팬아트 콘테스트',
    description: '창의적인 팬아트를 그려서 참여해보세요!',
    type: 'photo',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    participants: 45,
    maxParticipants: 100,
    prize: '아이패드 Pro + 애플펜슬',
    winners: 3,
    participantGrades: ['VIP', 'PREMIUM', 'BASIC'],
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-05-25'
  },
  {
    id: '2',
    title: '나의 최애 영상 투표',
    description: '가장 좋아하는 영상에 투표해주세요!',
    type: 'vote',
    status: 'completed',
    startDate: '2024-05-15',
    endDate: '2024-05-31',
    participants: 234,
    prize: '스타벅스 기프티콘',
    winners: 10,
    participantGrades: ['VIP', 'PREMIUM'],
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-05-10'
  }
];

const mockParticipants: Participant[] = [
  {
    id: '1',
    name: '김팬님',
    username: '@kimfan',
    avatar: '/api/placeholder/40/40',
    grade: 'VIP',
    joinedAt: '2024-06-15 14:30',
    isWinner: true
  },
  {
    id: '2',
    name: '이후원',
    username: '@supporter2',
    avatar: '/api/placeholder/40/40',
    grade: 'PREMIUM',
    joinedAt: '2024-06-16 09:15',
    isWinner: false
  }
];

const mockTemplates: EventTemplate[] = [
  {
    id: '1',
    name: '팬아트 콘테스트',
    type: 'photo',
    description: '창의적인 팬아트 공모전 템플릿',
    settings: { maxSubmissions: 1, allowedFormats: ['jpg', 'png'] },
    usageCount: 5
  },
  {
    id: '2',
    name: '간단한 퀴즈',
    type: 'quiz',
    description: '객관식 퀴즈 이벤트 템플릿',
    settings: { questionCount: 5, timeLimit: 300 },
    usageCount: 12
  }
];

const EventsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'participants' | 'templates' | 'stats'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'active': return '진행 중';
      case 'completed': return '완료';
      case 'draft': return '임시저장';
      case 'scheduled': return '예약됨';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'photo': return <Eye className="w-4 h-4" />;
      case 'comment': return <Users className="w-4 h-4" />;
      case 'vote': return <CheckCircle className="w-4 h-4" />;
      case 'lottery': return <Gift className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'quiz': return '퀴즈';
      case 'photo': return '사진/영상';
      case 'comment': return '댓글';
      case 'vote': return '투표';
      case 'lottery': return '추첨';
      default: return type;
    }
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case 'VIP': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PREMIUM': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'BASIC': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderEventList = () => (
    <div className="space-y-6">
      {/* 상단 액션 바 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="이벤트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">진행 중</option>
            <option value="completed">완료</option>
            <option value="draft">임시저장</option>
            <option value="scheduled">예약됨</option>
          </select>
        </div>
        <button
          onClick={() => setShowEventModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          새 이벤트
        </button>
      </div>

      {/* 이벤트 목록 */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex gap-6">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-32 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                        {getStatusName(event.status)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                        {getTypeIcon(event.type)}
                        {getTypeName(event.type)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.startDate} ~ {event.endDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.participants}명 참여
                        {event.maxParticipants && ` / ${event.maxParticipants}명`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="px-3 py-1 text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                    >
                      참여자 보기
                    </button>
                    <button className="p-1 text-gray-600 hover:text-gray-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700">{event.prize}</span>
                    </div>
                    {event.winners && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-700">당첨자 {event.winners}명</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">참여 등급:</span>
                    {event.participantGrades.map((grade) => (
                      <span key={grade} className={`px-2 py-0.5 rounded text-xs font-medium border ${getGradeBadgeColor(grade)}`}>
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderParticipants = () => {
    if (!selectedEvent) {
      return (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">이벤트를 선택하여 참여자를 확인하세요.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* 이벤트 정보 헤더 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              <p className="text-gray-600">참여자 관리</p>
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              목록으로
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{selectedEvent.participants}</p>
              <p className="text-sm text-gray-600">총 참여자</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {selectedEvent.maxParticipants ? 
                  Math.round((selectedEvent.participants / selectedEvent.maxParticipants) * 100) : 
                  100}%
              </p>
              <p className="text-sm text-gray-600">참여율</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{selectedEvent.winners || 0}</p>
              <p className="text-sm text-gray-600">당첨자</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.ceil((new Date(selectedEvent.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-gray-600">남은 일수</p>
            </div>
          </div>
        </div>

        {/* 참여자 관리 액션 */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="참여자 검색..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>모든 등급</option>
              <option>VIP</option>
              <option>PREMIUM</option>
              <option>BASIC</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowWinnerModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              당첨자 선정
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              참여자 내보내기
            </button>
          </div>
        </div>

        {/* 참여자 목록 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h4 className="font-semibold">참여자 목록</h4>
          </div>
          <div className="divide-y">
            {mockParticipants.map((participant) => (
              <div key={participant.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {participant.isWinner && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold">{participant.name}</h5>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getGradeBadgeColor(participant.grade)}`}>
                        {participant.grade}
                      </span>
                      {participant.isWinner && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          당첨자
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{participant.username}</p>
                    <p className="text-gray-500 text-xs">참여일: {participant.joinedAt}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                      제출물 보기
                    </button>
                    <button className="px-3 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      메시지
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">이벤트 템플릿</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          새 템플릿
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                    {getTypeIcon(template.type)}
                    {getTypeName(template.type)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                <p className="text-xs text-gray-500">사용 횟수: {template.usageCount}회</p>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                템플릿 사용
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Copy className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">이벤트 통계</h3>
      
      {/* 전체 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">총 이벤트</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">85%</p>
            <p className="text-sm text-gray-600">평균 참여율</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">1,234</p>
            <p className="text-sm text-gray-600">총 참여자</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">45</p>
            <p className="text-sm text-gray-600">총 당첨자</p>
          </div>
        </div>
      </div>

      {/* 이벤트별 성과 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="font-semibold mb-4">이벤트별 성과</h4>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <h5 className="font-medium">{event.title}</h5>
                <p className="text-sm text-gray-600">{getTypeName(event.type)} • {event.startDate}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold">{event.participants}</p>
                  <p className="text-gray-600">참여자</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">
                    {event.maxParticipants ? 
                      Math.round((event.participants / event.maxParticipants) * 100) : 
                      100}%
                  </p>
                  <p className="text-gray-600">참여율</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{event.winners || 0}</p>
                  <p className="text-gray-600">당첨자</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 탭 네비게이션 */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'list', label: '이벤트 목록', icon: Calendar },
            { id: 'participants', label: '참여자 관리', icon: Users },
            { id: 'templates', label: '템플릿', icon: Copy },
            { id: 'stats', label: '통계', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'list' && renderEventList()}
      {activeTab === 'participants' && renderParticipants()}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'stats' && renderStats()}
    </div>
  );
};

export default EventsTab;