import React, { useState } from 'react';
import { X, MapPin, Calendar, Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import { Conflict } from '../types';
import { getConflictColor, getStatusColor, getRiskLevelColor, formatDate } from '../lib/utils';
import { cn } from '../lib/utils';

interface ConflictDetailPanelProps {
  conflict: Conflict;
  onClose: () => void;
}

const ConflictDetailPanel: React.FC<ConflictDetailPanelProps> = ({ conflict, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'stakeholders' | 'documents' | 'opinions'>('overview');

  const tabs = [
    { id: 'overview', label: '개요', icon: TrendingUp },
    { id: 'timeline', label: '타임라인', icon: Calendar },
    { id: 'stakeholders', label: '이해관계자', icon: Users },
    { id: 'documents', label: '관련 문서', icon: FileText },
    { id: 'opinions', label: '시민 의견', icon: MessageSquare },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden m-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getConflictColor(conflict.type) }}
            />
            <div>
              <h2 className="text-xl font-semibold">{conflict.title}</h2>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{conflict.location.name}</span>
                <span>•</span>
                <span className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(conflict.status))}>
                  {conflict.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="border-b border-slate-200">
          <div className="flex space-x-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 설명 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">갈등 개요</h3>
                <p className="text-slate-700 leading-relaxed">{conflict.description}</p>
              </div>

              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">기본 정보</h4>
                  <div className="space-y-2 text-sm">
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
                    <div className="flex justify-between">
                      <span className="text-slate-600">시작일:</span>
                      <span className="font-medium">{formatDate(conflict.startDate)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">위치 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">지역:</span>
                      <span className="font-medium">{conflict.location.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">위도:</span>
                      <span className="font-medium">{conflict.location.coordinates.lat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">경도:</span>
                      <span className="font-medium">{conflict.location.coordinates.lng}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI 분석 */}
              {conflict.aiAnalysis && (
                <div>
                  <h4 className="font-semibold mb-3">AI 분석</h4>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {conflict.aiAnalysis.summary && (
                      <div>
                        <h5 className="font-medium text-sm mb-1">요약</h5>
                        <p className="text-sm text-slate-700">{conflict.aiAnalysis.summary}</p>
                      </div>
                    )}
                    {conflict.aiAnalysis.keyIssues && conflict.aiAnalysis.keyIssues.length > 0 && (
                      <div>
                        <h5 className="font-medium text-sm mb-1">핵심 이슈</h5>
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
                        <h5 className="font-medium text-sm mb-1">위험도</h5>
                        <span className={cn("px-2 py-1 rounded-full text-xs", getRiskLevelColor(conflict.aiAnalysis.riskLevel))}>
                          {conflict.aiAnalysis.riskLevel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 태그 */}
              {conflict.tags && conflict.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">태그</h4>
                  <div className="flex flex-wrap gap-2">
                    {conflict.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">타임라인</h3>
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
          )}

          {activeTab === 'stakeholders' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">이해관계자</h3>
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
          )}

          {activeTab === 'documents' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">관련 문서</h3>
              <div className="space-y-3">
                {conflict.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-slate-600">{doc.type}</div>
                      {doc.date && (
                        <div className="text-sm text-slate-500">{formatDate(doc.date)}</div>
                      )}
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

          {activeTab === 'opinions' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">시민 의견</h3>
              <div className="space-y-4">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ConflictDetailPanel;




