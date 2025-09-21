export interface Conflict {
  _id: string;
  title: string;
  description: string;
  type: '환경' | '경제' | '주거' | '문화' | '교통';
  status: '검토' | '협상' | '해결' | '지속';
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    area: string;
  };
  stakeholders: Stakeholder[];
  timeline: TimelineEvent[];
  documents: Document[];
  valueConflicts: {
    environmental: number;
    economic: number;
    social: number;
    cultural: number;
    political: number;
  };
  intensity: number;
  startDate: string;
  endDate?: string;
  tags: string[];
  images: Image[];
  publicOpinions: PublicOpinion[];
  aiAnalysis: AIAnalysis;
  createdAt: string;
  updatedAt: string;
}

export interface Stakeholder {
  name: string;
  type: '정부' | '기업' | '시민단체' | '주민' | '학계';
  position: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  description?: string;
}

export interface Document {
  title: string;
  url?: string;
  type: '보고서' | '법령' | '뉴스' | '기타';
  date?: string;
}

export interface Image {
  url: string;
  caption: string;
}

export interface PublicOpinion {
  content: string;
  author?: string;
  date: string;
  sentiment: '긍정' | '부정' | '중립';
}

export interface AIAnalysis {
  summary?: string;
  keyIssues?: string[];
  recommendations?: string[];
  riskLevel?: '낮음' | '보통' | '높음' | '매우높음';
}

export interface DashboardStats {
  totalConflicts: number;
  avgIntensity: number;
  typeStats: Array<{ _id: string; count: number }>;
  statusStats: Array<{ _id: string; count: number }>;
  yearStats: Array<{ _id: number; count: number; avgIntensity: number }>;
  areaStats: Array<{ _id: string; count: number }>;
}

export interface HeatmapData {
  lat: number;
  lng: number;
  count: number;
  avgIntensity: number;
  weight: number;
}

export interface ValueConflictsData {
  avgEnvironmental: number;
  avgEconomic: number;
  avgSocial: number;
  avgCultural: number;
  avgPolitical: number;
}

export interface StakeholderStats {
  _id: string;
  count: number;
  conflicts: string[];
}

export interface FilterOptions {
  type?: string;
  status?: string;
  year?: string;
  search?: string;
}




