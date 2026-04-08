"use client";

import { useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Flag, 
  Zap, 
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

  // Simple line data points
  const points = [85, 90, 88, 92, 95, 91, 89, 100, 98, 95, 92, 94, 98, 102, 100, 95, 93, 90, 88, 85, 87, 90, 92, 95];

  return (
    <div className="glass p-8 rounded-3xl border border-border bg-[#0D1117]/50 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
           <div>
              <h3 className="text-2xl font-black text-foreground flex items-center gap-3">
                 Volatility Index
                 <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded-full uppercase font-black">Live</span>
              </h3>
              <p className="text-muted text-xs mt-1">Simple market trend analysis for students</p>
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

        {/* Simplified Line Chart */}
        <div className="space-y-6">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <Calendar size={16} className="text-blue-500" />
                 <h4 className="text-[10px] font-black uppercase text-muted tracking-widest">Market Events & Trends</h4>
              </div>
              <span className="text-[8px] text-muted font-bold">24-Hour Timeline</span>
           </div>

           <div className="relative h-40 w-full overflow-hidden flex items-center">
              <svg className="w-full h-full preserve-3d" viewBox="0 0 240 100">
                 <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0.2 }} />
                       <stop offset="100%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0 }} />
                    </linearGradient>
                 </defs>
                 {/* Area */}
                 <path 
                    d={`M 0 100 ${points.map((p, i) => `L ${i * 10} ${100 - p}`).join(' ')} L 230 100 Z`} 
                    fill="url(#grad)" 
                 />
                 {/* Line */}
                 <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                    d={`M 0 ${100 - points[0]} ${points.map((p, i) => `L ${i * 10} ${100 - p}`).join(' ')}`} 
                    fill="none" 
                    stroke="rgb(37, 99, 235)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                 />
                 
                 {/* Event Markers */}
                 {[100, 180, 220].map((x, i) => (
                    <g key={i} className="cursor-pointer" onClick={() => setActiveEvent(i)}>
                       <line x1={x} y1="0" x2={x} y2="100" stroke="rgba(239, 68, 68, 0.2)" strokeDasharray="4" />
                       <circle 
                         cx={x} 
                         cy={100 - points[x/10]} 
                         r="4" 
                         className="fill-red-500 animate-pulse"
                       />
                    </g>
                 ))}
              </svg>
           </div>

           <AnimatePresence mode="wait">
              {activeEvent !== null ? (
                <motion.div 
                  key={activeEvent}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-4 items-center"
                >
                   <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                      <Zap size={20} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <h5 className="font-bold text-foreground">{EVENTS[activeEvent].label}</h5>
                         <span className="text-[10px] font-black text-red-500 uppercase">{EVENTS[activeEvent].date}</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed mt-1">
                         Observed market impact: {EVENTS[activeEvent].impact}
                      </p>
                   </div>
                   <button onClick={() => setActiveEvent(null)} className="text-muted hover:text-foreground">
                      &times;
                   </button>
                </motion.div>
              ) : (
                <div className="p-4 flex items-center gap-3 bg-blue-600/5 rounded-2xl border border-blue-600/10 opacity-70">
                   <AlertCircle size={16} className="text-blue-500" />
                   <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Click markers on the trend-line to see event details</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full" />
    </div>
  );
}
