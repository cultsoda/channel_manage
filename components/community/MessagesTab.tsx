import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Users, 
  Clock, 
  Star, 
  Search, 
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Reply,
  Archive,
  Trash2,
  Edit,
  Copy
} from 'lucide-react';

interface Message {
  id: string;
  type: 'received' | 'sent';
  sender: {
    name: string;
    username: string;
    avatar: string;
    grade: 'VIP' | 'PREMIUM' | 'BASIC';
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  hasReply: boolean;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  usageCount: number;
}

interface AutoMessage {
  id: string;
  name: string;
  trigger: 'welcome' | 'birthday' | 'anniversary' | 'grade_up';
  content: string;
  isActive: boolean;
  sentCount: number;
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'received',
    sender: {
      name: '김팬님',
      username: '@kimfan',
      avatar: '/api/placeholder/40/40',
      grade: 'VIP'
    },
    content: '안녕하세요! 오늘 라이브 방송 정말 재미있었어요. 다음에도 기대할게요!',
    timestamp: '2024-06-29 14:30',
    isRead: false,
    isImportant: true,
    hasReply: false
  },
  {
    id: '2',
    type: 'received',
    sender: {
      name: '이후원',
      username: '@supporter2',
      avatar: '/api/placeholder/40/40',
      grade: 'PREMIUM'
    },
    content: '혹시 개인적으로 상담받을 수 있는 시간이 있을까요?',
    timestamp: '2024-06-29 13:15',
    isRead: true,
    isImportant: false,
    hasReply: true
  }
];

const mockTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: '신규 가입 환영',
    subject: '커뮤니티에 오신 것을 환영합니다!',
    content: '안녕하세요! 저의 커뮤니티에 가입해주셔서 감사합니다. 앞으로 많은 소통 부탁드려요!',
    category: '환영',
    usageCount: 45
  },
  {
    id: '2',
    name: '이벤트 안내',
    subject: '특별 이벤트 안내',
    content: '새로운 이벤트가 시작되었어요! 많은 참여 부탁드립니다.',
    category: '이벤트',
    usageCount: 23
  }
];

const mockAutoMessages: AutoMessage[] = [
  {
    id: '1',
    name: '신규 가입 환영 메시지',
    trigger: 'welcome',
    content: '커뮤니티에 오신 것을 환영합니다! 🎉',
    isActive: true,
    sentCount: 156
  },
  {
    id: '2',
    name: '생일 축하 메시지',
    trigger: 'birthday',
    content: '생일을 축하드려요! 🎂 특별한 하루 되세요!',
    isActive: true,
    sentCount: 34
  }
];

const MessagesTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'bulk' | 'templates' | 'auto' | 'stats'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case 'VIP': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PREMIUM': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'BASIC': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTriggerName = (trigger: string) => {
    switch (trigger) {
      case 'welcome': return '신규 가입';
      case 'birthday': return '생일';
      case 'anniversary': return '구독 기념일';
      case 'grade_up': return '등급 상승';
      default: return trigger;
    }
  };

  const renderInbox = () => (
    <div className="space-y-4">
      {/* 검색 및 필터 */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="메시지 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          필터
        </button>
      </div>

      {/* 메시지 목록 */}
      <div className="space-y-2">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
              !message.isRead ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selectedMessages.includes(message.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMessages([...selectedMessages, message.id]);
                  } else {
                    setSelectedMessages(selectedMessages.filter(id => id !== message.id));
                  }
                }}
                className="mt-1"
              />

              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{message.sender.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getGradeBadgeColor(message.sender.grade)}`}>
                    {message.sender.grade}
                  </span>
                  <span className="text-gray-500 text-sm">{message.sender.username}</span>
                  {message.isImportant && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-gray-800 mb-2">{message.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{message.timestamp}</span>
                  {message.hasReply && <span className="text-green-600">답장함</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Reply className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-yellow-600">
                  <Star className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 메시지 일괄 작업 */}
      {selectedMessages.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{selectedMessages.length}개 메시지 선택됨</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                읽음 표시
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                보관
              </button>
              <button className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBulkSend = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">일괄 메시지 발송</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">수신자 선택</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>전체 팬</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>VIP</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>PREMIUM</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>BASIC</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
            <input
              type="text"
              placeholder="메시지 제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
            <textarea
              rows={6}
              placeholder="메시지 내용을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              템플릿에서 선택
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                미리보기
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                발송하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">메시지 템플릿</h3>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          새 템플릿
        </button>
      </div>

      <div className="grid gap-4">
        {mockTemplates.map((template) => (
          <div key={template.id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                <p className="text-gray-800 mb-2">{template.content}</p>
                <p className="text-xs text-gray-500">사용 횟수: {template.usageCount}회</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="p-2 text-gray-600 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAutoMessages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">자동 메시지</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          새 자동 메시지
        </button>
      </div>

      <div className="grid gap-4">
        {mockAutoMessages.map((autoMsg) => (
          <div key={autoMsg.id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{autoMsg.name}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                    {getTriggerName(autoMsg.trigger)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    autoMsg.isActive 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {autoMsg.isActive ? '활성' : '비활성'}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{autoMsg.content}</p>
                <p className="text-xs text-gray-500">발송 횟수: {autoMsg.sentCount}회</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-blue-600">
                  <Edit className="w-4 h-4" />
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoMsg.isActive}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">발송 통계</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-600">총 발송</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-600">읽음률</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">23%</p>
            <p className="text-sm text-gray-600">응답률</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">156</p>
            <p className="text-sm text-gray-600">이번 주 발송</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-semibold mb-4">최근 발송 이력</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">신규 이벤트 안내</p>
              <p className="text-sm text-gray-600">VIP 회원 45명에게 발송</p>
            </div>
            <div className="text-right">
              <p className="text-sm">2024-06-29 15:30</p>
              <p className="text-sm text-green-600">읽음률 92%</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">생일 축하 메시지</p>
              <p className="text-sm text-gray-600">자동 발송 3명</p>
            </div>
            <div className="text-right">
              <p className="text-sm">2024-06-29 09:00</p>
              <p className="text-sm text-green-600">읽음률 100%</p>
            </div>
          </div>
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
            { id: 'inbox', label: '받은 메시지', icon: MessageCircle },
            { id: 'bulk', label: '일괄 발송', icon: Send },
            { id: 'templates', label: '템플릿', icon: Edit },
            { id: 'auto', label: '자동 메시지', icon: Clock },
            { id: 'stats', label: '발송 통계', icon: Eye }
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
      {activeTab === 'inbox' && renderInbox()}
      {activeTab === 'bulk' && renderBulkSend()}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'auto' && renderAutoMessages()}
      {activeTab === 'stats' && renderStats()}
    </div>
  );
};

export default MessagesTab;