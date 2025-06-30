'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, Search, List, GitBranch, Filter, Expand, Minimize, Upload } from 'lucide-react';

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
}

const ChannelIAViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [implementedFilter, setImplementedFilter] = useState<string>('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [iaData, setIaData] = useState<IAItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // 프로젝트 지식에서 데이터 로드
  const loadFromProjectKnowledge = async () => {
    setIsLoading(true);
    setError('');
    try {
      // 여기서는 프로젝트 지식 검색 결과를 시뮬레이션
      // 실제로는 project_knowledge_search API를 호출해야 함
      
      // 샘플 데이터 (실제 구현시에는 API 호출로 대체)
      const sampleData: IAItem[] = [
        {
          "대분류": "대시보드",
          "중분류": "핵심 지표", 
          "소분류": "팬 현황",
          "세부기능": "총 팬 수",
          "기능 설명": "현재 채널을 구독하고 있는 전체 팬 수 표시",
          "우선순위": "High",
          "현재 구현 여부": "X"
        },
        {
          "대분류": "채널 설정",
          "중분류": "기본 정보",
          "소분류": "채널 정보", 
          "세부기능": "채널명 변경",
          "기능 설명": "채널 이름 수정 기능",
          "우선순위": "High",
          "현재 구현 여부": "O"
        }
      ];
      
      setIaData(sampleData);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // CSV 파일 업로드 처리
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
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
      
      setIaData(data);
    } catch (err) {
      setError('파일을 읽는 중 오류가 발생했습니다.');
      console.error('Error parsing file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트시 프로젝트 지식에서 데이터 로드 시도
  useEffect(() => {
    loadFromProjectKnowledge();
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

  // 마인드맵 데이터 구조 생성
  const mindMapData = useMemo(() => {
    const tree: MindMapNode[] = [];
    const nodeMap = new Map<string, MindMapNode>();

    filteredData.forEach(item => {
      // 대분류 노드
      const category1Id = item.대분류;
      if (!nodeMap.has(category1Id)) {
        const node: MindMapNode = {
          id: category1Id,
          name: item.대분류,
          children: [],
          level: 1
        };
        nodeMap.set(category1Id, node);
        tree.push(node);
      }

      // 중분류 노드
      const category2Id = `${item.대분류}-${item.중분류}`;
      if (!nodeMap.has(category2Id)) {
        const node: MindMapNode = {
          id: category2Id,
          name: item.중분류,
          children: [],
          level: 2
        };
        nodeMap.set(category2Id, node);
        nodeMap.get(category1Id)!.children!.push(node);
      }

      // 소분류 노드 (소분류가 "-"가 아닌 경우에만)
      if (item.소분류 && item.소분류 !== '-') {
        const category3Id = `${item.대분류}-${item.중분류}-${item.소분류}`;
        if (!nodeMap.has(category3Id)) {
          const node: MindMapNode = {
            id: category3Id,
            name: item.소분류,
            children: [],
            level: 3
          };
          nodeMap.set(category3Id, node);
          nodeMap.get(category2Id)!.children!.push(node);
        }

        // 세부기능 노드
        const category4Id = `${item.대분류}-${item.중분류}-${item.소분류}-${item.세부기능}`;
        const node: MindMapNode = {
          id: category4Id,
          name: item.세부기능,
          level: 4,
          priority: item.우선순위,
          implemented: item["현재 구현 여부"] === 'O'
        };
        nodeMap.get(category3Id)!.children!.push(node);
      } else {
        // 소분류가 없는 경우 세부기능을 중분류 직하에 추가
        const category3Id = `${item.대분류}-${item.중분류}-${item.세부기능}`;
        const node: MindMapNode = {
          id: category3Id,
          name: item.세부기능,
          level: 3,
          priority: item.우선순위,
          implemented: item["현재 구현 여부"] === 'O'
        };
        nodeMap.get(category2Id)!.children!.push(node);
      }
    });

    return tree;
  }, [filteredData]);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const expandAll = () => {
    const allNodeIds = new Set<string>();
    const collectNodeIds = (nodes: MindMapNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allNodeIds.add(node.id);
          collectNodeIds(node.children);
        }
      });
    };
    collectNodeIds(mindMapData);
    setExpandedNodes(allNodeIds);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
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

  const renderMindMapNode = (node: MindMapNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const marginLeft = depth * 24;

    return (
      <div key={node.id} style={{ marginLeft: `${marginLeft}px` }} className="my-1">
        <div
          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 ${
            node.level === 4 || (node.level === 3 && !hasChildren) ? 'bg-blue-50' : ''
          }`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <span className={`font-medium ${
            node.level === 1 ? 'text-lg text-blue-700' : 
            node.level === 2 ? 'text-base text-blue-600' : 
            'text-sm'
          }`}>
            {node.name}
          </span>
          
          {node.priority && (
            <Badge className={getPriorityColor(node.priority)}>
              {node.priority}
            </Badge>
          )}
          
          {node.implemented !== undefined && (
            <Badge variant={node.implemented ? 'default' : 'secondary'}>
              {node.implemented ? '구현완료' : '미구현'}
            </Badge>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderMindMapNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>채널 관리 & 채널 홈 리뉴얼 IA</CardTitle>
            <div className="flex gap-2">
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
          {/* 파일 업로드 */}
          <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                CSV 파일을 업로드하거나 프로젝트 지식에서 자동으로 로드됩니다
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                CSV 파일 선택
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={loadFromProjectKnowledge}
                className="ml-2"
                disabled={isLoading}
              >
                프로젝트 지식에서 다시 로드
              </Button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">데이터를 로드하는 중...</p>
            </div>
          )}

          {!isLoading && iaData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">데이터가 없습니다. CSV 파일을 업로드하거나 프로젝트 지식을 확인해주세요.</p>
            </div>
          )}

          {!isLoading && iaData.length > 0 && (
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

                {viewMode === 'mindmap' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={expandAll}
                    >
                      <Expand className="h-4 w-4 mr-1" />
                      전체 펼치기
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={collapseAll}
                    >
                      <Minimize className="h-4 w-4 mr-1" />
                      전체 접기
                    </Button>
                  </div>
                )}
              </div>

              <div className="mb-4 text-sm text-gray-600">
                총 {filteredData.length}개의 기능이 있습니다.
              </div>

              {/* 컨텐츠 */}
              {viewMode === 'list' ? (
                <div className="space-y-4">
                  {filteredData.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{item.대분류}</span>
                            <ChevronRight size={12} className="text-gray-400" />
                            <span className="text-sm text-gray-500">{item.중분류}</span>
                            {item.소분류 && item.소분류 !== '-' && (
                              <>
                                <ChevronRight size={12} className="text-gray-400" />
                                <span className="text-sm text-gray-500">{item.소분류}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-medium">{item.세부기능}</h3>
                          <p className="text-sm text-gray-600">{item["기능 설명"]}</p>
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
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mindMapData.map(node => renderMindMapNode(node))}
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