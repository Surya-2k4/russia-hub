"use client";

import { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Info, 
  Flag, 
  Zap, 
  DollarSign, 
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EVENTS = [
  { date: "Feb 2024", label: "US Sanctions Expansion", impact: "Volatility Spike (+12%)" },
  { date: "Apr 2024", label: "CBR Interest Rate Hike", impact: "Ruble Stabilization" },
  { date: "Jun 2024", label: "BRICS Payment Summit", impact: "Increased CNY/RUB liquidity" }
];

const CURRENCIES = [
  { id: 'usd', pair: 'USD/RUB', rate: '92.45', change: '+0.5%', trend: 'up' },
  { id: 'cny', pair: 'CNY/RUB', rate: '12.80', change: '-0.2%', trend: 'down' },
  { id: 'eur', pair: 'EUR/RUB', rate: '100.12', change: '+0.8%', trend: 'up' }
];

export function RubleVolatility() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  return (
    <div className="glass p-8 rounded-3xl border border-border bg-[#0D1117]/50 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
           <div>
              <h3 className="text-2xl font-black text-foreground flex items-center gap-3">
                 RUB Volatility Index
                 <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full animate-pulse uppercase">High Active</span>
              </h3>
              <p className="text-muted text-xs mt-1">Measuring market sensitivity vs Global Currencies</p>
           </div>
           <BarChart3 className="text-blue-500 opacity-50" size={32} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {CURRENCIES.map((c) => (
             <div key={c.id} className="p-6 rounded-2xl bg-surface border border-border hover:border-blue-500/30 transition-all group">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-black text-muted uppercase tracking-widest">{c.pair}</span>
                   {c.trend === 'up' ? <TrendingUp size={14} className="text-red-500" /> : <TrendingDown size={14} className="text-green-500" />}
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-black text-foreground">{c.rate}</span>
                   <span className={`text-[10px] font-bold ${c.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>{c.change}</span>
                </div>
             </div>
           ))}
        </div>

        {/* Volatility Chart Mockup with Events */}
        <div className="space-y-6">
           <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-blue-500" />
              <h4 className="text-[10px] font-black uppercase text-muted tracking-widest">Geopolitical Event Overlay</h4>
           </div>

           <div className="relative h-48 w-full bg-background/50 rounded-2xl border border-border border-dashed p-4 flex items-end gap-1">
              {/* Fake Chart Bars */}
              {Array(30).fill(0).map((_, i) => {
                const isEvent = [10, 18, 25].includes(i);
                const height = isEvent ? "80%" : `${40 + Math.random() * 40}%`;
                return (
                  <div 
                    key={i} 
                    className="flex-1 group relative flex flex-col items-center gap-2"
                  >
                     <div 
                       className={`w-full rounded-t-xs transition-all ${isEvent ? 'bg-red-500 opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-600/20 group-hover:bg-blue-600/40'}`}
                       style={{ height }}
                     />
                     {isEvent && (
                       <motion.button 
                         whileHover={{ scale: 1.2 }}
                         onClick={() => setActiveEvent([10, 18, 25].indexOf(i))}
                         className="absolute -top-6 w-4 h-4 rounded-full bg-red-600 border border-white/20 flex items-center justify-center text-white"
                       >
                          <Zap size={8} />
                       </motion.button>
                     )}
                  </div>
                );
              })}
           </div>

           <AnimatePresence mode="wait">
              {activeEvent !== null ? (
                <motion.div 
                  key={activeEvent}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-4 items-center"
                >
                   <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                      <Flag size={20} />
                   </div>
                   <div>
                      <h5 className="font-bold text-foreground">{EVENTS[activeEvent].label}</h5>
                      <p className="text-xs text-muted leading-relaxed">
                         <span className="font-bold text-red-500 mr-2">{EVENTS[activeEvent].date}</span>
                         Market impact resulted in {EVENTS[activeEvent].impact.toLowerCase()}.
                      </p>
                   </div>
                </motion.div>
              ) : (
                <div className="p-6 text-center text-[10px] text-muted font-bold uppercase tracking-widest bg-background/30 rounded-2xl border border-border border-dashed">
                   Select red event markers on the timeline for analysis
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex gap-4 items-center bg-blue-600/5 p-4 rounded-2xl border border-blue-600/10">
         <AlertCircle size={18} className="text-blue-500 shrink-0" />
         <p className="text-[10px] text-muted leading-tight">
            The RUB index is highly sensitive to exports and commodity prices. Indicators are refreshed via Central Bank nodes.
         </p>
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] rounded-full" />
    </div>
  );
}
