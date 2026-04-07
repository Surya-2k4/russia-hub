"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UNIVERSITIES } from '@/lib/universities-data';
import { 
  Users, 
  MapPin, 
  Info, 
  ExternalLink, 
  Navigation, 
  Layers,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for Leaflet marker icons in Next.js
// Unused module-level icon removed to avoid SSR issues


export default function StudentMapInner() {
  const [clusters, setClusters] = useState<Record<string, number>>({});
  const [userJoined, setUserJoined] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    fetchClusters();
    // Fix for Leaflet marker icons in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
    setMapReady(true);
  }, []);

  const fetchClusters = async () => {
    try {
      const res = await fetch('/api/community');
      const data = await res.json();
      const clusterMap: Record<string, number> = {};
      data.forEach((c: { university_id: string; student_count: string }) => clusterMap[c.university_id] = Number(c.student_count));
      setClusters(clusterMap);
    } catch (e) {
      console.error(e);
    }
  };

  const joinUniversity = async (id: string) => {
    if (userJoined) return;
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ universityId: id })
      });
      if (res.ok) {
        setUserJoined(id);
        fetchClusters();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!mapReady) return null;

  return (
    <div className="h-[600px] w-full relative rounded-3xl overflow-hidden border border-[#30363D] shadow-2xl glass overscroll-none">
      <MapContainer 
        center={[61.524, 105.318]} 
        zoom={3} 
        style={{ height: '100%', width: '100%', background: '#0D1117' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {UNIVERSITIES.map((uni) => {
          const studentCount = (clusters[uni.id] || 0) + uni.internationalStudents / 100; // Simulated scale
          const isUserHere = userJoined === uni.id;
          
          return (
            <div key={uni.id}>
              <Circle 
                center={[uni.lat, uni.lng]}
                radius={Math.min(100000, 20000 + (studentCount * 50))} // Radius based on student count
                pathOptions={{ 
                  fillColor: isUserHere ? '#CC0000' : '#1A3A6B', 
                  color: isUserHere ? '#CC0000' : '#1A3A6B',
                  fillOpacity: 0.2,
                  weight: 1
                }}
              />
              <Marker position={[uni.lat, uni.lng]} icon={isUserHere ? 
                L.divIcon({ 
                  className: 'custom-icon', 
                  html: '<div class="w-4 h-4 rounded-full bg-red-600 border-2 border-white animate-ping shadow-[0_0_10px_red]"></div>',
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                }) : new L.Icon.Default()
              }>
                <Popup className="glass-popup">
                  <div className="p-3 min-w-[200px] bg-[#161B22] text-white border border-[#30363D] rounded-xl shadow-2xl">
                    <h4 className="font-bold text-sm mb-1 leading-snug">{uni.name}</h4>
                    <p className="text-[10px] text-[#8B949E] italic mb-3">{uni.nameRu}</p>
                    
                    <div className="flex gap-4 mb-4">
                       <div className="flex flex-col">
                          <span className="text-[8px] text-[#8B949E] uppercase font-bold tracking-widest">Students</span>
                          <span className="text-xs font-mono font-bold text-[#F0B429]">{(clusters[uni.id] || 0)}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[8px] text-[#8B949E] uppercase font-bold tracking-widest">Intl. Pop</span>
                          <span className="text-xs font-mono font-bold">{uni.internationalStudents.toLocaleString()}</span>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => joinUniversity(uni.id)}
                      disabled={!!userJoined}
                      className={`w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isUserHere ? 'bg-green-600 text-white' : 
                        userJoined ? 'bg-[#30363D] text-[#8B949E] opacity-50' : 
                        'bg-blue-600 hover:bg-white hover:text-blue-600 border border-blue-600'
                      }`}
                    >
                      {isUserHere ? <CheckCircle2 size={12} /> : <Heart size={12} />}
                      {isUserHere ? "You&apos;re checked in!" : userJoined ? "Limit 1 per Session" : "I study here"}
                    </button>
                    
                    <a 
                      href={uni.website} 
                      target="_blank" 
                      className="mt-2 block text-center text-[10px] text-[#8B949E] hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                      University Website <ExternalLink size={8} />
                    </a>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
      
      {/* Map HUD Components */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
         <div className="glass px-4 py-2 rounded-full border border-[#30363D] flex items-center gap-2 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">Live Heatmap</span>
         </div>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[300px] z-10">
         <div className="glass p-4 rounded-3xl border border-[#30363D] shadow-2xl flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl text-red-500">
               <Navigation size={24} />
            </div>
            <div>
               <h4 className="text-xs font-bold text-white tracking-widest uppercase">Community Cluster</h4>
               <p className="text-[10px] text-[#8B949E]">Clusters show real-time student activity across Russia.</p>
            </div>
         </div>
      </div>
      
      <style jsx global>{`
        .leaflet-container { font-family: 'Inter', sans-serif !important; border-radius: 24px !important; }
        .leaflet-popup-content-wrapper { background: transparent !important; color: white !important; padding: 0 !important; box-shadow: none !important; border-radius: 16px !important; }
        .leaflet-popup-tip { background: #161B22 !important; border: 1px solid #30363D !important; }
        .leaflet-popup-content { margin: 0 !important; }
      `}</style>
    </div>
  );
}
