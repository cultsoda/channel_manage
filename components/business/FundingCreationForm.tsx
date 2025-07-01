import React, { useState } from 'react';
import { Plus, X, Upload, Calendar, Target, Package, FileText } from 'lucide-react';
import { FundingProjectForm, FundingReward, FundingCategory } from '../../data/fundingData';

interface Props {
  onSubmit: (data: FundingProjectForm) => void;
  onCancel: () => void;
}

const FundingCreationForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FundingProjectForm>({
    title: '',
    subtitle: '',
    description: '',
    story: '',
    category: 'content',
    targetAmount: 0,
    startDate: '',
    endDate: '',
    mainImage: '',
    galleryImages: [],
    rewards: [],
    refundPolicy: '',
    shippingPolicy: '',
    cautionNote: '',
    tags: []
  });

  const categories: { value: FundingCategory; label: string }[] = [
    { value: 'tech', label: '테크/가전' },
    { value: 'fashion', label: '패션' },
    { value: 'food', label: '푸드' },
    { value: 'beauty', label: '뷰티' },
    { value: 'lifestyle', label: '라이프스타일' },
    { value: 'content', label: '콘텐츠' },
    { value: 'other', label: '기타' }
  ];

  const addReward = () => {
    const newReward: Omit<FundingReward, 'id'> = {
      title: '',
      description: '',
      type: 'product',
      price: 0,
      quantity: 0,
      remainingQuantity: 0,
      isEarlyBird: false,
      estimatedDelivery: '',
      shippingCost: 0,
      images: [],
      isUnlimited: false
    };
    setFormData(prev => ({
      ...prev,
      rewards: [...prev.rewards, newReward]
    }));
  };

  const updateReward = (index: number, field: keyof Omit<FundingReward, 'id'>, value: any) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.map((reward, i) => 
        i === index ? { ...reward, [field]: value } : reward
      )
    }));
  };

  const removeReward = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          기본 정보
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트 제목 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="펀딩 프로젝트 제목을 입력하세요"
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">부제목</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="프로젝트를 간단히 설명하는 부제목"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as FundingCategory }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">간단한 설명 *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="프로젝트에 대한 간단한 설명"
              maxLength={200}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-4 flex items-center gap-2">
          <Target className="w-4 h-4" />
          펀딩 목표
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">목표 금액 *</label>
            <input
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAmount: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              min="100000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">시작일 *</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">종료일 *</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          미디어 & 스토리
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대표 이미지 *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">이미지를 끌어다 놓거나 클릭해서 업로드</p>
              <p className="text-xs text-gray-500 mt-1">권장 크기: 1200x630px, 최대 5MB</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대표 영상 (선택)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">동영상을 끌어다 놓거나 클릭해서 업로드</p>
              <p className="text-xs text-gray-500 mt-1">최대 100MB, MP4 형식 권장</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트 스토리 *</label>
            <textarea
              value={formData.story}
              onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={10}
              placeholder="프로젝트의 상세한 스토리를 작성하세요. 왜 이 프로젝트가 필요한지, 어떤 가치를 제공하는지 설명해주세요."
            />
            <p className="text-xs text-gray-500 mt-1">HTML 태그 사용 가능</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Package className="w-5 h-5" />
            리워드 설정
          </h3>
          <button
            type="button"
            onClick={addReward}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            리워드 추가
          </button>
        </div>

        {formData.rewards.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">리워드를 추가해주세요</h4>
            <p className="text-gray-500 mb-4">서포터들이 선택할 수 있는 리워드 옵션을 만들어보세요</p>
            <button
              type="button"
              onClick={addReward}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              첫 번째 리워드 추가
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {formData.rewards.map((reward, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                <button
                  type="button"
                  onClick={() => removeReward(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">리워드 제목 *</label>
                    <input
                      type="text"
                      value={reward.title}
                      onChange={(e) => updateReward(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="리워드 제목"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">타입</label>
                    <select
                      value={reward.type}
                      onChange={(e) => updateReward(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="product">제품</option>
                      <option value="service">서비스</option>
                      <option value="experience">체험</option>
                      <option value="digital">디지털</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">리워드 설명</label>
                    <textarea
                      value={reward.description}
                      onChange={(e) => updateReward(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="리워드에 대한 상세 설명"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">가격 *</label>
                    <input
                      type="number"
                      value={reward.price}
                      onChange={(e) => updateReward(index, 'price', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={reward.quantity}
                        onChange={(e) => {
                          const quantity = Number(e.target.value);
                          updateReward(index, 'quantity', quantity);
                          updateReward(index, 'remainingQuantity', quantity);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        disabled={reward.isUnlimited}
                      />
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={reward.isUnlimited}
                          onChange={(e) => updateReward(index, 'isUnlimited', e.target.checked)}
                          className="rounded"
                        />
                        무제한
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">예상 배송일</label>
                    <input
                      type="date"
                      value={reward.estimatedDelivery}
                      onChange={(e) => updateReward(index, 'estimatedDelivery', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">배송비</label>
                    <input
                      type="number"
                      value={reward.shippingCost}
                      onChange={(e) => updateReward(index, 'shippingCost', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={reward.isEarlyBird}
                        onChange={(e) => updateReward(index, 'isEarlyBird', e.target.checked)}
                        className="rounded"
                      />
                      얼리버드 할인 적용
                    </label>
                    {reward.isEarlyBird && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">원래 가격</label>
                          <input
                            type="number"
                            value={reward.originalPrice || ''}
                            onChange={(e) => updateReward(index, 'originalPrice', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="할인 전 가격"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">얼리버드 마감일</label>
                          <input
                            type="date"
                            value={reward.earlyBirdEndDate || ''}
                            onChange={(e) => updateReward(index, 'earlyBirdEndDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">정책 설정</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">환불 정책 *</label>
            <textarea
              value={formData.refundPolicy}
              onChange={(e) => setFormData(prev => ({ ...prev, refundPolicy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="펀딩 실패 시 환불 정책을 명시하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">배송 정책</label>
            <textarea
              value={formData.shippingPolicy}
              onChange={(e) => setFormData(prev => ({ ...prev, shippingPolicy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="배송 지역, 배송 기간 등 배송 관련 정책"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">주의사항</label>
            <textarea
              value={formData.cautionNote}
              onChange={(e) => setFormData(prev => ({ ...prev, cautionNote: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="서포터가 알아야 할 주의사항이나 제한사항"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="태그를 쉼표로 구분해서 입력 (예: VR, 팬미팅, 기술)"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const stepTitles = [
    '기본 정보',
    '미디어 & 스토리',
    '리워드 설정',
    '정책 설정'
  ];

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.category && formData.targetAmount > 0 && formData.startDate && formData.endDate;
      case 2:
        return formData.story;
      case 3:
        return formData.rewards.length > 0 && formData.rewards.every(r => r.title && r.price >= 0);
      case 4:
        return formData.refundPolicy;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 진행 단계 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > index + 1 ? 'bg-green-600 text-white' :
                step === index + 1 ? 'bg-blue-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm ${step === index + 1 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                {title}
              </span>
              {index < stepTitles.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${step > index + 1 ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 단계별 컨텐츠 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                이전
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid(step)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                다음
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepValid(step)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                프로젝트 생성
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FundingCreationForm;