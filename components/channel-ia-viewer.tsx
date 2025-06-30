'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Search, List, GitBranch, Filter, ArrowUpDown, RefreshCw } from 'lucide-react';

// 데이터 타입 정의
interface IAItem {
  대분류: string;
  중분류: string;
  소분류: string;
  세부기능: string;
  "기능 설명": string;
  우선순위: 'High' | 'Medium' | 'Low';
  "현재 구현 여부": 'O' | 'X';
}

// 마인드맵 노드 타입
interface MindMapNode {
  id: string;
  name: string;
  children?: MindMapNode[];
  level: number;
  priority?: 'High' | 'Medium' | 'Low';
  implemented?: boolean;
  count?: number;
}

const ChannelIAViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [implementedFilter, setImplementedFilter] = useState<string>('all');
  const [selectedCategory1, setSelectedCategory1] = useState<string>('');
  const [selectedCategory2, setSelectedCategory2] = useState<string>('');
  const [iaData, setIaData] = useState<IAItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // GitHub에서 CSV 파일 로드
  const loadFromGitHub = async () => {
    setIsLoading(true);
    setError('');
    try {
      // GitHub raw URL (실제 사용시 올바른 URL로 변경 필요)
      const githubUrl = 'https://github.com/cultsoda/channel_manage/blob/a8c706870daafe024d18c6e1a86073b1de909e49/data/ia-data.csv';
      
      const response = await fetch(githubUrl);
      if (!response.ok) {
        throw new Error('GitHub에서 파일을 불러올 수 없습니다');
      }
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setIaData(parsedData);
    } catch (err) {
      // GitHub에서 실패하면 로컬 샘플 데이터 사용
      console.warn('GitHub 로드 실패, 샘플 데이터 사용:', err);
      setIaData(getSampleData());
    } finally {
      setIsLoading(false);
    }
  };

  // CSV 파싱
  const parseCSV = (csvText: string): IAItem[] => {
    const lines = csvText.trim().split('\n');
    const data: IAItem[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length >= 7) {
        data.push({
          대분류: values[0] || '',
          중분류: values[1] || '',
          소분류: values[2] || '',
          세부기능: values[3] || '',
          "기능 설명": values[4] || '',
          우선순위: (values[5] as 'High' | 'Medium' | 'Low') || 'Medium',
          "현재 구현 여부": (values[6] as 'O' | 'X') || 'X'
        });
      }
    }
    
    return data;
  };

  // 샘플 데이터
  const getSampleData = (): IAItem[] => [
    {
      대분류: "대시보드",
      중분류: "핵심 지표",
      소분류: "팬 현황",
      세부기능: "총 팬 수",
      "기능 설명": "현재 채널을 구독하고 있는 전체 팬 수 표시",
      우선순위: "High",
      "현재 구현 여부": "X"
    },
    {
      대분류: "대시보드",
      중분류: "핵심 지표",
      소분류: "수익 현황",
      세부기능: "이번 달 총 수익",
      "기능 설명": "당월 발생한 모든 수익의 합계",
      우선순위: "High",
      "현재 구현 여부": "O"
    },
    {
      대분류: "채널 설정",
      중분류: "기본 정보",
      소분류: "채널 정보",
      세부기능: "채널명 변경",
      "기능 설명": "채널 이름 수정 기능",
      우선순위: "High",
      "현재 구현 여부": "O"
    },
    {
      대분류: "채널 설정",
      중분류: "기본 정보",
      소분류: "비주얼 브랜딩",
      세부기능: "프로필 이미지 변경",
      "기능 설명": "채널 대표 이미지 변경",
      우선순위: "High",
      "현재 구현 여부": "O"
    },
    {
      대분류: "콘텐츠 관리",
      중분류: "콘텐츠 업로드",
      소분류: "기본 업로드",
      세부기능: "파일 업로드",
      "기능 설명": "이미지/비디오/오디오 파일 업로드",
      우선순위: "High",
      "현재 구현 여부": "O"
    },
    {
      대분류: "콘텐츠 관리",
      중분류: "콘텐츠 목록",
      소분류: "목록 보기",
      세부기능: "필터링",
      "기능 설명": "날짜/카테고리/상태별 필터 기능",
      우선순위: "High",
      "현재 구현 여부": "X"
    },
    {
      대분류: "커뮤니티",
      중분류: "회원 관리",
      소분류: "팬 목록",
      세부기능: "전체 팬 목록 조회",
      "기능 설명": "모든 팬의 목록 및 기본 정보 조회",
      우선순위: "High",
      "현재 구현 여부": "O"
    },
    {
      대분류: "분석",
      중분류: "수익 분석",
      소분류: "수익 현황",
      세부기능: "총 수익 및 트렌드",
      "기능 설명": "전체 수익과 시간별 변화 추이",
      우선순위: "High",
      "현재 구현 여부": "O"
    }
  ];

  // 컴포넌트 마운트시 데이터 로드
  useEffect(() => {
    loadFromGitHub();
  }, []);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    return iaData.filter(item => {
      const matchesSearch = 
        item.대분류.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.중분류.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.소분류.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.세부기능.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item["기능 설명"].toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || item.우선순위 === priorityFilter;
      const matchesImplemented = implementedFilter === 'all' || item["현재 구현 여부"] === implementedFilter;
      
      return matchesSearch && matchesPriority && matchesImplemented;
    });
  }, [iaData, searchTerm, priorityFilter, implementedFilter]);

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue = '';
      let bValue = '';

      switch (sortColumn) {
        case '대분류':
          aValue = a.대분류;
          bValue = b.대분류;
          break;
        case '중분류':
          aValue = a.중분류;
          bValue = b.중분류;
          break;
        case '소분류':
          aValue = a.소분류;
          bValue = b.소분류;
          break;
        case '세부기능':
          aValue = a.세부기능;
          bValue = b.세부기능;
          break;
        case '우선순위':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return sortDirection === 'asc' 
            ? priorityOrder[a.우선순위] - priorityOrder[b.우선순위]
            : priorityOrder[b.우선순위] - priorityOrder[a.우선순위];
        case '구현여부':
          aValue = a["현재 구현 여부"];
          bValue = b["현재 구현 여부"];
          break;
      }

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredData, sortColumn, sortDirection]);

  // 마인드맵 대분류 데이터
  const category1Data = useMemo(() => {
    const categories = new Map<string, { count: number; implemented: number }>();
    
    filteredData.forEach(item => {
      const existing = categories.get(item.대분류) || { count: 0, implemented: 0 };
      existing.count++;
      if (item["현재 구현 여부"] === 'O') existing.implemented++;
      categories.set(item.대분류, existing);
    });

    return Array.from(categories.entries()).map(([name, stats]) => ({
      id: name,
      name,
      level: 1,
      count: stats.count,
      implemented: stats.implemented === stats.count
    }));
  }, [filteredData]);

  // 마인드맵 중분류 데이터
  const category2Data = useMemo(() => {
    if (!selectedCategory1) return [];
    
    const categories = new Map<string, { count: number; implemented: number }>();
    
    filteredData
      .filter(item => item.대분류 === selectedCategory1)
      .forEach(item => {
        const existing = categories.get(item.중분류) || { count: 0, implemented: 0 };
        existing.count++;
        if (item["현재 구현 여부"] === 'O') existing.implemented++;
        categories.set(item.중분류, existing);
      });

    return Array.from(categories.entries()).map(([name, stats]) => ({
      id: `${selectedCategory1}-${name}`,
      name,
      level: 2,
      count: stats.count,
      implemented: stats.implemented === stats.count
    }));
  }, [filteredData, selectedCategory1]);

  // 마인드맵 소분류 데이터
  const category3Data = useMemo(() => {
    if (!selectedCategory1 || !selectedCategory2) return [];
    
    const categories = new Map<string, { count: number; implemented: number }>();
    
    filteredData
      .filter(item => 
        item.대분류 === selectedCategory1 && 
        item.중분류 === selectedCategory2
      )
      .forEach(item => {
        if (item.소분류 && item.소분류 !== '-') {
          const existing = categories.get(item.소분류) || { count: 0, implemented: 0 };
          existing.count++;
          if (item["현재 구현 여부"] === 'O') existing.implemented++;
          categories.set(item.소분류, existing);
        }
      });

    return Array.from(categories.entries()).map(([name, stats]) => ({
      id: `${selectedCategory1}-${selectedCategory2}-${name}`,
      name,
      level: 3,
      count: stats.count,
      implemented: stats.implemented === stats.count
    }));
  }, [filteredData, selectedCategory1, selectedCategory2]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMindMapCard = (node: MindMapNode, onClick?: () => void) => {
    const isSelected = 
      (node.level === 1 && selectedCategory1 === node.name) ||
      (node.level === 2 && selectedCategory2 === node.name);

    return (
      <div
        key={node.id}
        className={`
          relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 
          min-w-[200px] max-w-[250px] text-center shadow-md hover:shadow-lg
          ${isSelected 
            ? 'border-blue-500 bg-blue-50 transform scale-105' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }
        `}
        onClick={onClick}
      >
        <h3 className={`font-bold mb-2 ${
          node.level === 1 ? 'text-lg text-blue-700' :
          node.level === 2 ? 'text-base text-green-700' :
          'text-sm text-purple-700'
        }`}>
          {node.name}
        </h3>
        
        <div className="flex justify-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {node.count}개
          </Badge>
          {node.implemented !== undefined && (
            <Badge variant={node.implemented ? 'default' : 'secondary'} className="text-xs">
              {node.implemented ? '완료' : '진행중'}
            </Badge>
          )}
        </div>

        {onClick && (
          <div className="absolute bottom-2 right-2">
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  const renderBreadcrumb = () => {
    const items = [];
    if (selectedCategory1) {
      items.push(
        <button
          key="cat1"
          onClick={() => {
            setSelectedCategory1('');
            setSelectedCategory2('');
          }}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {selectedCategory1}
        </button>
      );
    }
    if (selectedCategory2) {
      items.push(
        <span key="sep1" className="mx-2 text-gray-400">{'>'}</span>,
        <button
          key="cat2"
          onClick={() => setSelectedCategory2('')}
          className="text-green-600 hover:text-green-800 underline"
        >
          {selectedCategory2}
        </button>
      );
    }

    return items.length > 0 ? (
      <div className="mb-4 text-sm">
        <button
          onClick={() => {
            setSelectedCategory1('');
            setSelectedCategory2('');
          }}
          className="text-gray-600 hover:text-gray-800 underline mr-2"
        >
          전체
        </button>
        {selectedCategory1 && <span className="mx-2 text-gray-400">{'>'}</span>}
        {items}
      </div>
    ) : null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>채널 관리 & 채널 홈 리뉴얼 IA</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadFromGitHub}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                목록
              </Button>
              <Button
                variant={viewMode === 'mindmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mindmap')}
              >
                <GitBranch className="h-4 w-4 mr-2" />
                마인드맵
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">GitHub에서 데이터를 로드하는 중...</p>
            </div>
          )}

          {!isLoading && (
            <>
              {/* 검색 및 필터 */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="기능 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">모든 우선순위</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                <select
                  value={implementedFilter}
                  onChange={(e) => setImplementedFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">모든 구현상태</option>
                  <option value="O">구현완료</option>
                  <option value="X">미구현</option>
                </select>
              </div>

              <div className="mb-4 text-sm text-gray-600">
                총 {filteredData.length}개의 기능이 있습니다.
              </div>

              {/* 컨텐츠 */}
              {viewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('대분류')}
                        >
                          <div className="flex items-center gap-1">
                            대분류
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('중분류')}
                        >
                          <div className="flex items-center gap-1">
                            중분류
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('소분류')}
                        >
                          <div className="flex items-center gap-1">
                            소분류
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('세부기능')}
                        >
                          <div className="flex items-center gap-1">
                            세부기능
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">기능 설명</th>
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('우선순위')}
                        >
                          <div className="flex items-center gap-1">
                            우선순위
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                        <th 
                          className="border border-gray-300 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('구현여부')}
                        >
                          <div className="flex items-center gap-1">
                            구현여부
                            <ArrowUpDown size={12} />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">{item.대분류}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.중분류}</td>
                          <td className="border border-gray-300 px-4 py-2">{item.소분류}</td>
                          <td className="border border-gray-300 px-4 py-2 font-medium">{item.세부기능}</td>
                          <td className="border border-gray-300 px-4 py-2 text-sm">{item["기능 설명"]}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge className={getPriorityColor(item.우선순위)}>
                              {item.우선순위}
                            </Badge>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <Badge variant={item["현재 구현 여부"] === 'O' ? 'default' : 'secondary'}>
                              {item["현재 구현 여부"] === 'O' ? '구현완료' : '미구현'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-8">
                  {renderBreadcrumb()}
                  
                  {!selectedCategory1 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-center">대분류를 선택하세요</h3>
                      <div className="flex flex-wrap gap-6 justify-center">
                        {category1Data.map(node => 
                          renderMindMapCard(node, () => setSelectedCategory1(node.name))
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCategory1 && !selectedCategory2 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-center">중분류를 선택하세요</h3>
                      <div className="flex flex-wrap gap-6 justify-center">
                        {category2Data.map(node => 
                          renderMindMapCard(node, () => setSelectedCategory2(node.name))
                        )}
                      </div>
                    </div>
                  )}

                  {selectedCategory1 && selectedCategory2 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-center">소분류</h3>
                      {category3Data.length > 0 ? (
                        <div className="flex flex-wrap gap-6 justify-center">
                          {category3Data.map(node => renderMindMapCard(node))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-600">
                          해당 중분류에 소분류가 없습니다.
                        </div>
                      )}
                      
                      {/* 세부 기능 목록 */}
                      <div className="mt-8">
                        <h4 className="text-md font-bold mb-4">세부 기능</h4>
                        <div className="grid gap-4">
                          {filteredData
                            .filter(item => 
                              item.대분류 === selectedCategory1 && 
                              item.중분류 === selectedCategory2
                            )
                            .map((item, index) => (
                              <div key={index} className="border rounded-lg p-4 bg-white">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium">{item.세부기능}</h5>
                                    <p className="text-sm text-gray-600 mt-1">{item["기능 설명"]}</p>
                                    {item.소분류 && item.소분류 !== '-' && (
                                      <p className="text-xs text-gray-500 mt-1">소분류: {item.소분류}</p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Badge className={getPriorityColor(item.우선순위)}>
                                      {item.우선순위}
                                    </Badge>
                                    <Badge variant={item["현재 구현 여부"] === 'O' ? 'default' : 'secondary'}>
                                      {item["현재 구현 여부"] === 'O' ? '구현완료' : '미구현'}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelIAViewer;