"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ExternalLink, 
  Info,
  PlaneLanding,
  PlaneTakeoff,
  Award,
  AlertCircle
} from 'lucide-react';
import { CHECKLIST } from '@/lib/checklist-data';
import { ChecklistItem } from '@/types';

export function ChecklistTracker() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>("pre-arrival");

  useEffect(() => {
    const saved = localStorage.getItem('visa-progress');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const toggleStep = (id: string) => {
    const newState = { ...completed, [id]: !completed[id] };
    setCompleted(newState);
    localStorage.setItem('visa-progress', JSON.stringify(newState));
  };

  const categories = [
    { id: "pre-arrival", label: "Pre-Arrival Documents", icon: PlaneTakeoff, color: "blue" },
    { id: "post-arrival", label: "Post-Arrival Formalities", icon: PlaneLanding, color: "red" }
  ];

  const getProgress = (catId: string) => {
    const items = CHECKLIST.filter(i => i.category === catId);
    const finished = items.filter(i => completed[i.id]).length;
    return { finished, total: items.length, percent: Math.round((finished / items.length) * 100) };
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {categories.map((cat) => {
        const { finished, total, percent } = getProgress(cat.id);
        const isExpanded = expanded === cat.id;

        return (
          <div key={cat.id} className="glass rounded-2xl border border-[#30363D] overflow-hidden shadow-2xl transition-all">
            {/* Header / Accordion Trigger */}
            <button
              onClick={() => setExpanded(isExpanded ? null : cat.id)}
              className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#161B22]/50 hover:bg-[#1C2128] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${cat.color}-500/10 text-${cat.color}-500 border border-${cat.color}-500/20`}>
                  <cat.icon size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">{cat.label}</h3>
                  <p className="text-xs text-[#8B949E] flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 size={12} className="text-green-500" />
                    {finished} of {total} steps completed
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end gap-1">
                   <div className="h-1.5 w-32 bg-[#0D1117] rounded-full overflow-hidden border border-[#30363D]">
                      <motion.div 
                        animate={{ width: `${percent}%` }}
                        className={`h-full ${cat.id === 'pre-arrival' ? 'bg-blue-600' : 'bg-red-600'}`}
                      />
                   </div>
                   <span className="text-[10px] font-bold text-[#8B949E] uppercase tracking-wider">{percent}% Done</span>
                </div>
                <ChevronDown className={`text-[#8B949E] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* List Body */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-[#30363D] overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    {CHECKLIST.filter(item => item.category === cat.id).map((step) => (
                      <div
                        key={step.id}
                        className={`group relative flex items-start gap-4 p-4 rounded-xl transition-all ${
                          completed[step.id] ? 'bg-blue-500/5 sm:bg-transparent opacity-70' : 'hover:bg-white/5'
                        }`}
                      >
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`mt-1 h-6 w-6 rounded-md flex items-center justify-center border-2 transition-all shrink-0 ${
                            completed[step.id] ? 'bg-blue-600 border-blue-600 text-white' : 'border-[#30363D] text-transparent hover:border-[#8B949E]'
                          }`}
                        >
                          <CheckCircle2 size={16} />
                        </button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                             <h4 className={`text-sm font-semibold mb-1 transition-all ${completed[step.id] ? 'text-[#8B949E] line-through decoration-blue-500/50' : 'text-white'}`}>
                                {step.label}
                             </h4>
                             {step.officialLink && (
                                <a 
                                  href={step.officialLink} 
                                  target="_blank" 
                                  className="text-[10px] flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#8B949E] hover:text-white"
                                >
                                  <ExternalLink size={10} /> Link
                                </a>
                             )}
                          </div>
                          <p className="text-xs text-[#8B949E] leading-relaxed line-clamp-2 md:line-clamp-none">
                            {step.description}
                          </p>
                          
                          {!completed[step.id] && step.dueDays && (
                            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#F0B429] bg-[#F0B429]/10 px-2 py-0.5 rounded border border-[#F0B429]/20 w-fit">
                                <AlertCircle size={10} /> {step.dueDays}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {percent === 100 && (
                    <div className="m-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                       <Award className="mx-auto text-green-500 mb-2" size={32} />
                       <p className="text-sm font-bold text-green-400">All set for {cat.label}!</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
