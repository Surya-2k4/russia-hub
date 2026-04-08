"use client";

import { useEffect, useState } from 'react';
import { Users, TrendingUp, Map, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function PopulationStats() {
  const [pop, setPop] = useState<number>(144444359);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPop = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/name/russia?fields=population');
        const data = await response.json();
        if (data[0]?.population) setPop(data[0].population);
      } catch (err) {
        console.error("Population fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPop();
  }, []);

  return (
    <div className="glass p-6 rounded-3xl border border-border bg-gradient-to-br from-surface to-background overflow-hidden relative group">
      <div className="relative z-10 flex flex-col justify-between h-full">
         <div>
            <div className="flex items-center gap-2 text-muted mb-4">
               <Users size={16} className="text-blue-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Demographics</span>
            </div>
            <h3 className="text-3xl font-black text-foreground mb-1">
               {loading ? "..." : pop.toLocaleString()}
            </h3>
            <p className="text-[10px] text-muted font-bold flex items-center gap-2">
               Total Living Population <TrendingUp size={12} className="text-green-500" />
            </p>
         </div>

         <div className="mt-8 flex gap-3">
            <div className="flex-1 p-3 bg-background/50 rounded-2xl border border-border">
               <p className="text-[8px] font-black text-muted uppercase tracking-tighter mb-1">Urban %</p>
               <p className="text-lg font-bold text-foreground">75% <span className="text-[10px] text-muted font-normal">(Cities)</span></p>
            </div>
            <div className="flex-1 p-3 bg-background/50 rounded-2xl border border-border">
               <p className="text-[8px] font-black text-muted uppercase tracking-tighter mb-1">Density</p>
               <p className="text-lg font-bold text-foreground">8.4 <span className="text-[10px] text-muted font-normal">/km²</span></p>
            </div>
         </div>
      </div>
      
      <Globe size={120} className="absolute -bottom-10 -right-10 text-blue-500/10 group-hover:rotate-12 transition-transform duration-1000" />
    </div>
  );
}
