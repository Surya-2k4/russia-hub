"use client";

import { useEffect, useState } from 'react';
import { Users, TrendingUp, Globe, MapPin, Building2, TreeDeciduous } from 'lucide-react';
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
        setPop(147182123); // 2024 Rosstat estimate fallback
      } finally {
        setLoading(false);
      }
    };
    fetchPop();
  }, []);

  const data = [
    { label: "Urban", value: 75, icon: Building2, color: "blue" },
    { label: "Country", value: 25, icon: TreeDeciduous, color: "emerald" }
  ];

  return (
    <div className="glass p-6 rounded-3xl border border-border bg-gradient-to-br from-surface to-background relative overflow-hidden h-full">
      <div className="relative z-10">
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Globe size={18} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted">Population Metrics</span>
            </div>
            <span className="text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase">2024 Index</span>
         </div>

         <div className="mb-8">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Total Resident Count</p>
            <div className="flex items-center gap-3">
               <h3 className="text-3xl font-black text-foreground">
                  {loading ? "..." : pop.toLocaleString()}
               </h3>
               <div className="flex items-center gap-1 text-[10px] text-green-500 font-black">
                  <TrendingUp size={12} /> Live
               </div>
            </div>
         </div>

         <div className="space-y-4">
            {data.map((item) => (
               <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5 px-0.5">
                     <div className="flex items-center gap-2">
                        <item.icon size={12} className={`text-${item.color}-500`} />
                        <span className="text-[10px] font-black text-foreground uppercase">{item.label} Side</span>
                     </div>
                     <span className="text-[10px] font-black text-muted">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full border border-border overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }} 
                        className={`h-full bg-${item.color}-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]`}
                     />
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-2 gap-4">
            <div>
               <p className="text-[8px] font-black text-muted uppercase mb-1">Moscow Hub</p>
               <p className="text-sm font-black text-foreground">13.1M</p>
            </div>
            <div>
               <p className="text-[8px] font-black text-muted uppercase mb-1">St. Petersburg</p>
               <p className="text-sm font-black text-foreground">5.6M</p>
            </div>
         </div>
      </div>
      
      <Users size={150} className="absolute -bottom-10 -right-10 text-foreground/[0.02] -z-0" />
    </div>
  );
}
