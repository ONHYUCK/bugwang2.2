import axios from 'axios';
import { Conflict, DashboardStats, HeatmapData, ValueConflictsData, StakeholderStats, FilterOptions } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 갈등 관련 API
export const conflictAPI = {
  // 모든 갈등 조회
  getAll: async (filters?: FilterOptions): Promise<Conflict[]> => {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.year) params.append('year', filters.year);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/conflicts?${params.toString()}`);
    return response.data;
  },

  // 특정 갈등 조회
  getById: async (id: string): Promise<Conflict> => {
    const response = await api.get(`/conflicts/${id}`);
    return response.data;
  },

  // 갈등 생성
  create: async (conflict: Omit<Conflict, '_id' | 'createdAt' | 'updatedAt'>): Promise<Conflict> => {
    const response = await api.post('/conflicts', conflict);
    return response.data;
  },

  // 갈등 수정
  update: async (id: string, conflict: Partial<Conflict>): Promise<Conflict> => {
    const response = await api.put(`/conflicts/${id}`, conflict);
    return response.data;
  },

  // 갈등 삭제
  delete: async (id: string): Promise<void> => {
    await api.delete(`/conflicts/${id}`);
  },

  // 시민 의견 추가
  addOpinion: async (id: string, opinion: { content: string; author?: string; sentiment?: string }): Promise<any> => {
    const response = await api.post(`/conflicts/${id}/opinions`, opinion);
    return response.data;
  },

  // 지역별 갈등 조회
  getByArea: async (area: string): Promise<Conflict[]> => {
    const response = await api.get(`/conflicts/location/${area}`);
    return response.data;
  },
};

// 대시보드 관련 API
export const dashboardAPI = {
  // 통계 데이터 조회
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // 히트맵 데이터 조회
  getHeatmap: async (): Promise<HeatmapData[]> => {
    const response = await api.get('/dashboard/heatmap');
    return response.data;
  },

  // 최근 갈등 조회
  getRecent: async (): Promise<Conflict[]> => {
    const response = await api.get('/dashboard/recent');
    return response.data;
  },

  // 가치 충돌 분석
  getValueConflicts: async (): Promise<ValueConflictsData> => {
    const response = await api.get('/dashboard/value-conflicts');
    return response.data;
  },

  // 이해관계자 분석
  getStakeholders: async (): Promise<StakeholderStats[]> => {
    const response = await api.get('/dashboard/stakeholders');
    return response.data;
  },
};

// AI 분석 관련 API
export const aiAPI = {
  // 갈등 분석
  analyzeConflict: async (conflictId: string, text: string): Promise<any> => {
    const response = await api.post('/ai/analyze', { conflictId, text });
    return response.data;
  },

  // 요약 생성
  generateSummary: async (data: { title: string; description: string; stakeholders: any[]; timeline: any[] }): Promise<any> => {
    const response = await api.post('/ai/summarize', data);
    return response.data;
  },

  // 감정 분석
  analyzeSentiment: async (text: string): Promise<any> => {
    const response = await api.post('/ai/sentiment', { text });
    return response.data;
  },

  // 추천사항 생성
  generateRecommendations: async (conflictData: any): Promise<any> => {
    const response = await api.post('/ai/recommendations', { conflictData });
    return response.data;
  },
};

// 에러 핸들링
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export default api;




