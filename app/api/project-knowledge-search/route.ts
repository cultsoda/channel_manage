import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, max_text_results = 15 } = await request.json();
    
    // 실제 project_knowledge_search 툴 호출
    const searchResults = await projectKnowledgeSearch({
      query,
      max_text_results
    });
    
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Project knowledge search error:', error);
    return NextResponse.json(
      { error: 'Failed to search project knowledge' },
      { status: 500 }
    );
  }
}

// Mock 함수 (실제 구현 필요)
async function projectKnowledgeSearch(params: {
  query: string;
  max_text_results: number;
}) {
  return {
    results: [
      {
        content: `대분류,중분류,소분류,세부기능,기능 설명,우선순위,현재 구현 여부
대시보드,핵심 지표,팬 현황,총 팬 수,현재 채널을 구독하고 있는 전체 팬 수 표시,High,X`
      }
    ]
  };
}