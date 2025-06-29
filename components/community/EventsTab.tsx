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
  Download,
  X
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
  participantGrades: ('gold' | 'silver' | 'bronze')[];
  thumbnail: string;
  createdAt: string;
}

interface Participant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  grade: 'gold' | 'silver' | 'bronze';
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
    participantGrades: ['gold', 'silver', 'bronze'],
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
    participantGrades: ['gold', 'silver'],
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
    grade: 'gold',
    joinedAt: '2024-06-15 14:30',
    isWinner: true
  },
  {
    id: '2',
    name: '이후원',
    username: '@supporter2',
    avatar: '/api/placeholder/40/40',
    grade: 'silver',
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
  const [activeTab, setActiveTab] = useState<'list' | 'templates' | 'stats'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    type: 'quiz' as 'quiz' | 'photo' | 'comment' | 'vote' | 'lottery',
    startDate: '',
    endDate: '',
    prize: '',
    maxParticipants: '',
    hasParticipantLimit: false,
    participantGrades: [] as ('gold' | 'silver' | 'bronze')[]
  });

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
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'bronze': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateEvent = () => {
    const eventData: Event = {
      id: (mockEvents.length + 1).toString(),
      title: newEvent.title,
      description: newEvent.description,
      type: newEvent.type,
      status: 'scheduled',
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      participants: 0,
      maxParticipants: newEvent.hasParticipantLimit ? parseInt(newEvent.maxParticipants) : undefined,
      prize: newEvent.prize,
      winners: 1,
      participantGrades: newEvent.participantGrades.length > 0 ? newEvent.participantGrades : ['gold', 'silver', 'bronze'],
      thumbnail: '/api/placeholder/300/200',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setShowEventModal(false);
    setNewEvent({
      title: '',
      description: '',
      type: 'quiz',
      startDate: '',
      endDate: '',
      prize: '',
      maxParticipants: '',
      hasParticipantLimit: false,
      participantGrades: []
    });
  };

  const handleShowParticipants = (event: Event) => {
    setSelectedEvent(event);
    setShowParticipantsModal(true);
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderEventList = () => (
    <div className="space-y-6">
      {/* 상단 헤더와 검색/필터 - 모바일 최적화 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">이벤트 관리</h2>
          <button
            onClick={() => setShowEventModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">새 이벤트</span>
          </button>
        </div>

        {/* 검색 및 필터 - 모바일에서는 세로 배치 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="이벤트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all">모든 상태</option>
            <option value="active">진행 중</option>
            <option value="completed">완료</option>
            <option value="draft">임시저장</option>
            <option value="scheduled">예약됨</option>
          </select>
        </div>
      </div>

      {/* 이벤트 목록 - 모바일 최적화 */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border">
            {/* 데스크톱 레이아웃 */}
            <div className="hidden md:flex gap-6 p-6">
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
                      <span className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {event.prize}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShowParticipants(event)}
                      className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      참여자 보기
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
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

            {/* 모바일 레이아웃 */}
            <div className="md:hidden p-4">
              <div className="flex gap-3 mb-3">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg leading-tight">{event.title}</h3>
                    <button className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                      {getStatusName(event.status)}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                      {getTypeIcon(event.type)}
                      {getTypeName(event.type)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{event.startDate} ~ {event.endDate}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{event.participants}명 참여{event.maxParticipants && ` / ${event.maxParticipants}명`}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{event.prize}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-3 mb-3">
                <span className="text-xs text-gray-500">참여 등급:</span>
                {event.participantGrades.map((grade) => (
                  <span key={grade} className={`px-2 py-0.5 rounded text-xs font-medium border ${getGradeBadgeColor(grade)}`}>
                    {grade}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleShowParticipants(event)}
                  className="flex-1 px-3 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  참여자 보기
                </button>
                <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1">
                  <Edit className="w-4 h-4" />
                  수정
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderParticipants = () => {
    if (!selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <div>
              <h3 className="text-lg md:text-xl font-bold">{selectedEvent.title}</h3>
              <p className="text-gray-600 text-sm">참여자 관리</p>
            </div>
            <button
              onClick={() => setShowParticipantsModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 모달 내용 */}
          <div className="p-4 md:p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 140px)'}}>
            {/* 이벤트 정보 요약 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-blue-600">{selectedEvent.participants}</p>
                <p className="text-xs md:text-sm text-gray-600">총 참여자</p>
              </div>
              <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  {selectedEvent.maxParticipants ? 
                    `${Math.round((selectedEvent.participants / selectedEvent.maxParticipants) * 100)}%` : 
                    '100%'
                  }
                </p>
                <p className="text-xs md:text-sm text-gray-600">참여율</p>
              </div>
              <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-purple-600">{selectedEvent.winners || 3}</p>
                <p className="text-xs md:text-sm text-gray-600">당첨자</p>
              </div>
              <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg">
                <p className="text-xl md:text-2xl font-bold text-orange-600">-364</p>
                <p className="text-xs md:text-sm text-gray-600">남은 일수</p>
              </div>
            </div>

            {/* 검색 및 필터 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="참여자 검색..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="all">모든 등급</option>
                <option value="gold">골드</option>
                <option value="silver">실버</option>
                <option value="bronze">브론즈</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
                당첨자 선정
              </button>
            </div>

            {/* 참여자 목록 - 모바일 최적화 */}
            <div className="space-y-3">
              {mockParticipants.map((participant) => (
                <div key={participant.id} className="border rounded-lg">
                  {/* 데스크톱 레이아웃 */}
                  <div className="hidden md:flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-500">{participant.username}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeBadgeColor(participant.grade)}`}>
                        {participant.grade}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      참여일: {participant.joinedAt}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                        제출물 보기
                      </button>
                      <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                        메시지
                      </button>
                    </div>
                  </div>

                  {/* 모바일 레이아웃 */}
                  <div className="md:hidden p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{participant.name}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeBadgeColor(participant.grade)}`}>
                            {participant.grade}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{participant.username}</p>
                        <p className="text-xs text-gray-400">참여일: {participant.joinedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm border rounded hover:bg-gray-50">
                        제출물 보기
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm border rounded hover:bg-gray-50">
                        메시지
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
        <nav className="flex space-x-8 overflow-x-auto">
          {[
            { id: 'list', label: '이벤트 목록', icon: Calendar },
            { id: 'templates', label: '템플릿', icon: Copy },
            { id: 'stats', label: '통계', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
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
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'stats' && renderStats()}

      {/* 참여자 모달 */}
      {showParticipantsModal && renderParticipants()}

      {/* 이벤트 생성 모달 */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 md:p-6 border-b">
              <h3 className="text-lg md:text-xl font-bold">새 이벤트 생성</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 140px)'}}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 제목</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
                    placeholder="이벤트 제목을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 설명</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
                    placeholder="이벤트에 대한 자세한 설명을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 유형</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent(prev => ({...prev, type: e.target.value as any}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="quiz">퀴즈</option>
                    <option value="photo">사진/영상</option>
                    <option value="comment">댓글</option>
                    <option value="vote">투표</option>
                    <option value="lottery">추첨</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                    <input
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent(prev => ({...prev, startDate: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                    <input
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent(prev => ({...prev, endDate: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상품</label>
                  <input
                    type="text"
                    value={newEvent.prize}
                    onChange={(e) => setNewEvent(prev => ({...prev, prize: e.target.value}))}
                    placeholder="이벤트 상품을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="participant-limit"
                      checked={newEvent.hasParticipantLimit}
                      onChange={(e) => setNewEvent(prev => ({...prev, hasParticipantLimit: e.target.checked}))}
                      className="rounded"
                    />
                    <label htmlFor="participant-limit" className="text-sm font-medium text-gray-700">
                      참여자 제한 설정
                    </label>
                  </div>
                  
                  {newEvent.hasParticipantLimit && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">최대 참여자 수</label>
                      <input
                        type="number"
                        value={newEvent.maxParticipants}
                        onChange={(e) => setNewEvent(prev => ({...prev, maxParticipants: e.target.value}))}
                        placeholder="최대 참여자 수를 입력하세요"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">참여 가능 등급</label>
                  <div className="flex gap-4">
                    {['gold', 'silver', 'bronze'].map((grade) => (
                      <label key={grade} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newEvent.participantGrades.includes(grade as any)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewEvent(prev => ({
                                ...prev, 
                                participantGrades: [...prev.participantGrades, grade as any]
                              }));
                            } else {
                              setNewEvent(prev => ({
                                ...prev, 
                                participantGrades: prev.participantGrades.filter(g => g !== grade)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{grade}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 p-4 md:p-6 border-t">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsTab;