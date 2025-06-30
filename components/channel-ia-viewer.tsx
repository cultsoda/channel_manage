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

const ChannelIAViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [implementedFilter, setImplementedFilter] = useState<string>('all');
  const [iaData, setIaData] = useState<IAItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // CSV 파싱 - 개선된 버전
  const parseCSV = (csvText: string): IAItem[] => {
    // Windows 줄바꿈(\r\n)과 Unix 줄바꿈(\n) 모두 처리
    const lines = csvText.trim().split(/\r?\n/);
    const data: IAItem[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // CSV 파싱 개선 - 따옴표로 감싸진 값 처리
      const values = parseCSVLine(line);
      
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

  // CSV 라인 파싱 함수 - 따옴표 처리
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      
      if (char === '"') {
        // 따옴표 시작/끝 처리
        if (inQuotes && line[i + 1] === '"') {
          // 연속된 두 따옴표는 하나의 따옴표로 처리
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        // 따옴표 밖의 쉼표는 구분자
        result.push(current.trim());
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }
    
    // 마지막 값 추가
    result.push(current.trim());
    
    return result;
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

  // 프로젝트 내 CSV 파일 로드
  const loadFromProjectFile = async () => {
    setIsLoading(true);
    setError('');
    try {
      // 프로젝트 내 파일 경로
      const response = await fetch('/data/ia-data.csv');
      if (!response.ok) {
        throw new Error('CSV 파일을 찾을 수 없습니다');
      }
      
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setIaData(parsedData);
      console.log(`총 ${parsedData.length}개의 데이터를 로드했습니다.`);
    } catch (err) {
      console.warn('프로젝트 파일 로드 실패, 샘플 데이터 사용:', err);
      setIaData(getSampleData());
      setError('CSV 파일을 불러오지 못해 샘플 데이터를 표시합니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트시 프로젝트 파일에서 로드
  useEffect(() => {
    loadFromProjectFile();
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
                onClick={loadFromProjectFile}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                CSV 파일 새로고침
              </Button>
              <Button
                variant="default"
                size="sm"
              >
                <List className="h-4 w-4 mr-2" />
                목록
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">CSV 파일에서 데이터를 로드하는 중...</p>
            </div>
          )}

          {!isLoading && (
            <>
              {/* 에러 메시지 */}
              {error && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800">{error}</p>
                </div>
              )}

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

              {/* 테이블 뷰 */}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelIAViewer;