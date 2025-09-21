import React from 'react';
import { X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onClose }) => {
  const conflictTypes = ['환경', '경제', '주거', '문화', '교통'];
  const statusTypes = ['검토', '협상', '해결', '지속'];
  const years = ['2024', '2023', '2022', '2021', '2020'];

  const handleTypeChange = (type: string) => {
    const newFilters = { ...filters };
    if (newFilters.type === type) {
      delete newFilters.type;
    } else {
      newFilters.type = type;
    }
    onFilterChange(newFilters);
  };

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters };
    if (newFilters.status === status) {
      delete newFilters.status;
    } else {
      newFilters.status = status;
    }
    onFilterChange(newFilters);
  };

  const handleYearChange = (year: string) => {
    const newFilters = { ...filters };
    if (newFilters.year === year) {
      delete newFilters.year;
    } else {
      newFilters.year = year;
    }
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">필터</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 갈등 유형 */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">갈등 유형</h4>
        <div className="flex flex-wrap gap-2">
          {conflictTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.type === type
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 상태 */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">진행 상태</h4>
        <div className="flex flex-wrap gap-2">
          {statusTypes.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.status === status
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 연도 */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">발생 연도</h4>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.year === year
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 초기화 */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-slate-200">
          <button
            onClick={clearAllFilters}
            className="w-full px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          >
            모든 필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;




