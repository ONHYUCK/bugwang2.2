import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Send, BarChart3, MessageSquare } from 'lucide-react';
import { conflictAPI } from '../services/api';
import { Conflict } from '../types';
import { getConflictColor, getStatusColor, getRiskLevelColor, formatDate } from '../lib/utils';
import { cn } from '../lib/utils';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ConflictDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [opinionContent, setOpinionContent] = useState('');
  const [opinionAuthor, setOpinionAuthor] = useState('');
  const [showVoteCooldownModal, setShowVoteCooldownModal] = useState(false);

  // 갈등 데이터 조회
  const { data: conflict, isLoading, error } = useQuery<Conflict>({
    queryKey: ['conflict', id],
    queryFn: () => conflictAPI.getById(id!),
    enabled: !!id,
  });

  // 의견 추가 뮤테이션
  const addOpinionMutation = useMutation({
    mutationFn: (data: { content: string; author?: string; sentiment?: string }) =>
      conflictAPI.addOpinion(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conflict', id] });
      setOpinionContent('');
      setOpinionAuthor('');
      setShowVoteCooldownModal(true);
    },
  });

  const handleSubmitOpinion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opinionContent.trim()) return;

    addOpinionMutation.mutate({
      content: opinionContent,
      author: opinionAuthor || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !conflict) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">갈등 정보를 불러올 수 없습니다.</div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 가치 충돌 차트 데이터
  const valueConflictsData = [
    { name: '환경', value: conflict.valueConflicts.environmental },
    { name: '경제', value: conflict.valueConflicts.economic },
    { name: '사회', value: conflict.valueConflicts.social },
    { name: '문화', value: conflict.valueConflicts.cultural },
    { name: '정치', value: conflict.valueConflicts.political },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>지도로 돌아가기</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: getConflictColor(conflict.type) }}
            />
            <h1 className="text-3xl font-bold text-slate-900">{conflict.title}</h1>
            <span className={cn("px-3 py-1 rounded-full text-sm", getStatusColor(conflict.status))}>
              {conflict.status}
            </span>
          </div>
          
          <p className="text-slate-600 max-w-3xl">{conflict.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">유형:</span>
                    <span className="font-medium">{conflict.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">상태:</span>
                    <span className={cn("font-medium", getStatusColor(conflict.status))}>
                      {conflict.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">갈등 강도:</span>
                    <span className="font-medium">{conflict.intensity}/10</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">지역:</span>
                    <span className="font-medium">{conflict.location.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">시작일:</span>
                    <span className="font-medium">{formatDate(conflict.startDate)}</span>
                  </div>
                  {conflict.endDate && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">종료일:</span>
                      <span className="font-medium">{formatDate(conflict.endDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 가치 충돌 분석 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>가치 충돌 분석</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 레이더 차트 */}
                <div>
                  <h3 className="text-lg font-medium mb-4">가치 충돌 강도</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={valueConflictsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      <Radar
                        name="가치 충돌 강도"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* 바 차트 */}
                <div>
                  <h3 className="text-lg font-medium mb-4">가치별 충돌 수준</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={valueConflictsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 타임라인 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">타임라인</h2>
              <div className="space-y-4">
                {conflict.timeline.map((event, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1 pb-4 border-l border-slate-200 pl-4">
                      <div className="text-sm text-slate-500 mb-1">{formatDate(event.date)}</div>
                      <div className="font-medium mb-1">{event.event}</div>
                      {event.description && (
                        <div className="text-sm text-slate-700">{event.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이해관계자 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">이해관계자</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conflict.stakeholders.map((stakeholder, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="font-medium mb-1">{stakeholder.name}</div>
                    <div className="text-sm text-slate-600 mb-2">{stakeholder.type}</div>
                    <div className="text-sm text-slate-700">{stakeholder.position}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* AI 분석 */}
            {conflict.aiAnalysis && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">AI 분석</h3>
                <div className="space-y-4">
                  {conflict.aiAnalysis.summary && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">요약</h4>
                      <p className="text-sm text-slate-700">{conflict.aiAnalysis.summary}</p>
                    </div>
                  )}
                  {conflict.aiAnalysis.keyIssues && conflict.aiAnalysis.keyIssues.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">핵심 이슈</h4>
                      <ul className="text-sm text-slate-700 space-y-1">
                        {conflict.aiAnalysis.keyIssues.map((issue, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {conflict.aiAnalysis.riskLevel && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">위험도</h4>
                      <span className={cn("px-2 py-1 rounded-full text-xs", getRiskLevelColor(conflict.aiAnalysis.riskLevel))}>
                        {conflict.aiAnalysis.riskLevel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 시민 의견 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>시민 의견</span>
              </h3>
              
              {/* 의견 작성 폼 */}
              <form onSubmit={handleSubmitOpinion} className="mb-6">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="이름 (선택사항)"
                    value={opinionAuthor}
                    onChange={(e) => setOpinionAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="의견을 작성해주세요..."
                    value={opinionContent}
                    onChange={(e) => setOpinionContent(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={addOpinionMutation.isPending}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>{addOpinionMutation.isPending ? '전송 중...' : '의견 보내기'}</span>
                  </button>
                </div>
              </form>

              {/* 의견 목록 */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {conflict.publicOpinions.map((opinion, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-600">
                        {opinion.author || '익명'} • {formatDate(opinion.date)}
                      </div>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        opinion.sentiment === '긍정' ? 'bg-green-100 text-green-800' :
                        opinion.sentiment === '부정' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-800'
                      )}>
                        {opinion.sentiment}
                      </span>
                    </div>
                    <p className="text-slate-700">{opinion.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 관련 문서 */}
            {conflict.documents && conflict.documents.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">관련 문서</h3>
                <div className="space-y-3">
                  {conflict.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{doc.title}</div>
                        <div className="text-xs text-slate-600">{doc.type}</div>
                      </div>
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                        >
                          보기
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 투표 쿨다운 모달 */}
      {showVoteCooldownModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">의견이 등록되었습니다</h3>
              <p className="text-slate-600 mb-6">
                귀하의 소중한 의견이 성공적으로 등록되었습니다.<br />
                <span className="font-medium text-blue-600">다음 투표는 1달 후에 가능합니다.</span>
              </p>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600 mb-1">다음 투표 가능일</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setShowVoteCooldownModal(false)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConflictDetailPage;




