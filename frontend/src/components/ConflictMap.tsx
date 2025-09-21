import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { Conflict } from '../types';
import { getConflictColor, getConflictColorClass } from '../lib/utils';

// Leaflet 아이콘 설정
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 커스텀 마커 아이콘 생성
const createCustomIcon = (type: string) => {
  const color = getConflictColor(type);
  return L.divIcon({
    className: `conflict-marker ${getConflictColorClass(type)}`,
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

interface ConflictMapProps {
  conflicts: Conflict[];
  onConflictSelect: (conflict: Conflict) => void;
  isLoading?: boolean;
}

// 지도 컨트롤 컴포넌트
const MapController: React.FC<{ conflicts: Conflict[] }> = ({ conflicts }) => {
  const map = useMap();

  useEffect(() => {
    if (conflicts.length > 0) {
      const bounds = L.latLngBounds(
        conflicts.map(conflict => [
          conflict.location.coordinates.lat,
          conflict.location.coordinates.lng
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // 인천 지역 기본 뷰
      map.setView([37.4563, 126.7052], 10);
    }
  }, [conflicts, map]);

  return null;
};

const ConflictMap: React.FC<ConflictMapProps> = ({ conflicts, onConflictSelect, isLoading }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Space 스타일의 다크 타일 레이어
  const darkTileLayer = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[37.4563, 126.7052]} // 인천 중심
        zoom={10}
        className="h-full w-full"
        zoomControl={true}
        attributionControl={true}
        ref={mapRef}
        style={{ background: '#0f172a' }}
      >
        {/* 다크 스타일 타일 레이어 */}
        <TileLayer
          url={darkTileLayer}
          attribution={attribution}
          maxZoom={19}
        />

        {/* 갈등 마커들 */}
        {conflicts.map((conflict) => (
          <Marker
            key={conflict._id}
            position={[conflict.location.coordinates.lat, conflict.location.coordinates.lng]}
            icon={createCustomIcon(conflict.type)}
            eventHandlers={{
              click: () => onConflictSelect(conflict),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={0.9}
              permanent={false}
              className="custom-tooltip"
            >
              <div className="p-2">
                <div className="font-semibold text-sm mb-1">{conflict.title}</div>
                <div className="text-xs text-slate-300 mb-1">{conflict.location.name}</div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getConflictColor(conflict.type) }}
                  />
                  <span className="text-xs">{conflict.type}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400">{conflict.status}</span>
                </div>
              </div>
            </Tooltip>
          </Marker>
        ))}

        {/* 지도 컨트롤러 */}
        <MapController conflicts={conflicts} />
      </MapContainer>

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-sm text-slate-600">지도 로딩 중...</span>
          </div>
        </div>
      )}

      {/* 범례 */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 p-4">
        <div className="text-sm font-semibold mb-2">갈등 유형</div>
        <div className="space-y-2">
          {[
            { type: '환경', color: '#ef4444' },
            { type: '경제', color: '#f97316' },
            { type: '주거', color: '#22c55e' },
            { type: '문화', color: '#1e40af' },
            { type: '교통', color: '#06b6d4' },
          ].map((item) => (
            <div key={item.type} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-600">{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConflictMap;




