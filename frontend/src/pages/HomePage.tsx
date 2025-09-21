import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MapPin } from 'lucide-react';
import { conflictAPI } from '../services/api';
import { Conflict, FilterOptions } from '../types';
import { getConflictColor, getStatusColor, cn } from '../lib/utils';
import ConflictMap from '../components/ConflictMap';
import ConflictDetailPanel from '../components/ConflictDetailPanel';
import FilterPanel from '../components/FilterPanel';

const HomePage: React.FC = () => {
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 갈등 데이터 조회
  const { data: conflicts = [], isLoading, error } = useQuery({
    queryKey: ['conflicts', filters],
    queryFn: () => conflictAPI.getAll(filters),
  });

  // 검색 처리
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilters(prev => ({ ...prev, search: term }));
  };

  // 필터 적용
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // 갈등 선택
  const handleConflictSelect = (conflict: Conflict) => {
    setSelectedConflict(conflict);
  };

  // 패널 닫기
  const handleClosePanel = () => {
    setSelectedConflict(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">데이터를 불러오는 중 오류가 발생했습니다.</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {/* 상단 검색 및 필터 바 */}
      <div className="absolute top-4 left-4 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-4">
            {/* 검색창 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="갈등 지역이나 키워드를 검색하세요..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 필터 버튼 */}
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                isFilterPanelOpen
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              <Filter className="w-4 h-4" />
              <span>필터</span>
            </button>

            {/* 갈등 개수 표시 */}
            <div className="text-sm text-slate-600">
              총 {conflicts.length}개의 갈등
            </div>
          </div>

          {/* 필터 패널 */}
          {isFilterPanelOpen && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setIsFilterPanelOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 지도 */}
      <div className="h-full">
        <ConflictMap
          conflicts={conflicts}
          onConflictSelect={handleConflictSelect}
          isLoading={isLoading}
        />
      </div>

      {/* 갈등 목록 (모바일용) */}
      <div className="absolute bottom-4 left-4 right-4 z-30 md:hidden">
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 p-4 max-h-64 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">갈등 목록</h3>
          <div className="space-y-2">
            {conflicts.slice(0, 5).map((conflict) => (
              <div
                key={conflict._id}
                onClick={() => handleConflictSelect(conflict)}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 cursor-pointer"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getConflictColor(conflict.type) }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{conflict.title}</div>
                  <div className="text-xs text-slate-500">{conflict.location.name}</div>
                </div>
                <span className={cn("px-2 py-1 text-xs rounded-full", getStatusColor(conflict.status))}>
                  {conflict.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 갈등 상세 패널 */}
      {selectedConflict && (
        <ConflictDetailPanel
          conflict={selectedConflict}
          onClose={handleClosePanel}
        />
      )}

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <div className="mt-2 text-sm text-slate-600">데이터를 불러오는 중...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;




