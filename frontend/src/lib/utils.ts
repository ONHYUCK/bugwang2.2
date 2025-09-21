import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getConflictColor(type: string): string {
  const colors = {
    '환경': '#ef4444',
    '경제': '#f97316',
    '주거': '#22c55e',
    '문화': '#1e40af',
    '교통': '#06b6d4'
  };
  return colors[type as keyof typeof colors] || '#6b7280';
}

export function getConflictColorClass(type: string): string {
  const colorClasses = {
    '환경': 'conflict-environment',
    '경제': 'conflict-economic',
    '주거': 'conflict-residential',
    '문화': 'conflict-cultural',
    '교통': 'conflict-traffic'
  };
  return colorClasses[type as keyof typeof colorClasses] || 'conflict-default';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getStatusColor(status: string): string {
  const colors = {
    '검토': 'bg-yellow-100 text-yellow-800',
    '협상': 'bg-blue-100 text-blue-800',
    '해결': 'bg-green-100 text-green-800',
    '지속': 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function getRiskLevelColor(riskLevel: string): string {
  const colors = {
    '낮음': 'bg-green-100 text-green-800',
    '보통': 'bg-yellow-100 text-yellow-800',
    '높음': 'bg-orange-100 text-orange-800',
    '매우높음': 'bg-red-100 text-red-800'
  };
  return colors[riskLevel as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateMapBounds(conflicts: any[]): [number, number][] {
  if (conflicts.length === 0) {
    // 인천 지역 기본 경계
    return [
      [37.2, 126.3], // 남서
      [37.8, 126.8]  // 북동
    ];
  }

  const lats = conflicts.map(c => c.location.coordinates.lat);
  const lngs = conflicts.map(c => c.location.coordinates.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // 약간의 여백 추가
  const latPadding = (maxLat - minLat) * 0.1;
  const lngPadding = (maxLng - minLng) * 0.1;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding]
  ];
}




