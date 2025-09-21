import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp, MapPin, Users, AlertTriangle, Globe } from 'lucide-react';
import { dashboardAPI } from '../services/api';
import { DashboardStats, HeatmapData, ValueConflictsData } from '../types';
import { getConflictColor } from '../lib/utils';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  
  // 통계 데이터 조회
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardAPI.getStats,
  });

  // 히트맵 데이터 조회
  const { data: heatmapData, isLoading: heatmapLoading } = useQuery<HeatmapData[]>({
    queryKey: ['dashboard-heatmap'],
    queryFn: dashboardAPI.getHeatmap,
  });

  // 가치 충돌 데이터 조회
  const { data: valueConflicts, isLoading: valueConflictsLoading } = useQuery<ValueConflictsData>({
    queryKey: ['dashboard-value-conflicts'],
    queryFn: dashboardAPI.getValueConflicts,
  });

  if (statsLoading || heatmapLoading || valueConflictsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 차트 데이터 준비
  const typeChartData = stats?.typeStats.map(item => ({
    name: item._id,
    value: item.count,
    color: getConflictColor(item._id),
  })) || [];

  const statusChartData = stats?.statusStats.map(item => ({
    name: item._id,
    value: item.count,
  })) || [];

  const yearChartData = stats?.yearStats.map(item => ({
    year: item._id.toString(),
    count: item.count,
    intensity: Math.round(item.avgIntensity * 10) / 10,
  })) || [];

  const valueConflictsData = valueConflicts ? [
    { name: '환경', value: valueConflicts.avgEnvironmental },
    { name: '경제', value: valueConflicts.avgEconomic },
    { name: '사회', value: valueConflicts.avgSocial },
    { name: '문화', value: valueConflicts.avgCultural },
    { name: '정치', value: valueConflicts.avgPolitical },
  ] : [];

  const COLORS = ['#ef4444', '#f97316', '#22c55e', '#1e40af', '#06b6d4'];

  // 최근 6개월간 가치판단 변화 데이터 (더미 데이터)
  const valueChangesData = [
    { month: '2024-03', environmental: 7.2, economic: 6.1, social: 8.3, cultural: 5.9, political: 6.7 },
    { month: '2024-04', environmental: 7.5, economic: 6.3, social: 8.1, cultural: 6.2, political: 6.9 },
    { month: '2024-05', environmental: 7.8, economic: 6.8, social: 7.9, cultural: 6.5, political: 7.2 },
    { month: '2024-06', environmental: 8.1, economic: 7.1, social: 7.6, cultural: 6.8, political: 7.5 },
    { month: '2024-07', environmental: 8.3, economic: 7.4, social: 7.4, cultural: 7.1, political: 7.8 },
    { month: '2024-08', environmental: 8.6, economic: 7.8, social: 7.2, cultural: 7.4, political: 8.1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('nav.dashboard')}</h1>
              <p className="text-slate-600">{t('hero.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('stats.totalConflicts')}</p>
                <p className="text-2xl font-bold text-slate-900">{stats?.totalConflicts || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average Intensity</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats?.avgIntensity ? Math.round(stats.avgIntensity * 10) / 10 : 0}/10
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('stats.activeConflicts')}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats?.statusStats.find(s => s._id === '협상')?.count || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{t('stats.participants')}</p>
                <p className="text-2xl font-bold text-slate-900">
                  {stats?.typeStats.reduce((sum, item) => sum + item.count, 0) || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 갈등 유형별 분포 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.conflictTypeDistribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={typeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 상태별 분포 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.statusDistribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 연도별 추세 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">{t('dashboard.yearlyTrend')}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={yearChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                name="갈등 수"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="intensity"
                stroke="#ef4444"
                strokeWidth={2}
                name="평균 강도"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 가치 충돌 분석 */}
        {valueConflictsData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">가치 충돌 분석</h3>
            <ResponsiveContainer width="100%" height={400}>
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
        )}

        {/* 최근 6개월간 나의 가치판단 변화 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">최근 6개월간 나의 가치판단 변화</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={valueChangesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}월`;
                }}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                labelFormatter={(value) => {
                  const date = new Date(value as string);
                  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
                }}
              />
              <Line
                type="monotone"
                dataKey="environmental"
                stroke="#22c55e"
                strokeWidth={2}
                name="환경"
              />
              <Line
                type="monotone"
                dataKey="economic"
                stroke="#3b82f6"
                strokeWidth={2}
                name="경제"
              />
              <Line
                type="monotone"
                dataKey="social"
                stroke="#f97316"
                strokeWidth={2}
                name="사회"
              />
              <Line
                type="monotone"
                dataKey="cultural"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="문화"
              />
              <Line
                type="monotone"
                dataKey="political"
                stroke="#ef4444"
                strokeWidth={2}
                name="정치"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">환경</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-600">경제</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-slate-600">사회</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-600">문화</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-slate-600">정치</span>
            </div>
          </div>
        </div>

        {/* 히트맵 데이터 */}
        {heatmapData && heatmapData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">지역별 갈등 강도</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {heatmapData.slice(0, 6).map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {item.lat.toFixed(2)}, {item.lng.toFixed(2)}
                    </span>
                    <span className="text-sm text-slate-600">
                      {item.count}개
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(item.avgIntensity / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    강도: {item.avgIntensity.toFixed(1)}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;




