"use client";

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(
  () => import('./StudentMapInner'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-[#0D1117] rounded-3xl border border-[#30363D] flex flex-col items-center justify-center gap-4 text-[#8B949E]">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-[#30363D] animate-spin" />
        <p className="text-sm font-bold uppercase tracking-widest opacity-50">Initializing Cartography...</p>
      </div>
    )
  }
);

export function StudentMap() {
  return (
    <div className="relative group">
       <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-white/5 to-red-600/20 rounded-[34px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
       <MapWithNoSSR />
    </div>
  );
}
