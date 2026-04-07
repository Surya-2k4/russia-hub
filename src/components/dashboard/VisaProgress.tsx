"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { CHECKLIST } from '@/lib/checklist-data';

export function VisaProgress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  
  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('visa-progress');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const visaSteps = CHECKLIST.filter(item => item.category === 'pre-arrival');
  const finishedCount = visaSteps.filter(s => completed[s.id]).length;
  const progressPercent = Math.round((finishedCount / visaSteps.length) * 100);

  const toggleStep = (id: string) => {
    const newState = { ...completed, [id]: !completed[id] };
    setCompleted(newState);
    localStorage.setItem('visa-progress', JSON.stringify(newState));
  };

  return (
    <div className="glass p-6 rounded-2xl shadow-xl border border-[#30363D] overflow-hidden">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Visa & Document Progress
            <span className="text-[#F0B429] text-sm font-medium px-2 py-0.5 bg-[#F0B429]/10 rounded-full border border-[#F0B429]/20">
              {progressPercent}%
            </span>
          </h3>
          <p className="text-[#8B949E] text-xs mt-1 italic italic">Real-time tracker for your pre-arrival journey.</p>
        </div>
        <Clock className="text-[#8B949E] mb-1" size={20} />
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3 bg-[#0D1117] rounded-full mb-8 overflow-hidden border border-[#30363D]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-white/70 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        />
      </div>

      <div className="space-y-4">
        {visaSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            suppressHydrationWarning
            className="w-full flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/5 group border border-transparent hover:border-[#30363D]"
          >
            <div className={`transition-colors ${completed[step.id] ? 'text-blue-500' : 'text-[#8B949E]'}`}>
              {completed[step.id] ? <CheckCircle2 size={24} /> : <Circle size={24} className="opacity-40 group-hover:opacity-100" />}
            </div>
            <div className="text-left flex-1">
              <p className={`text-sm font-semibold ${completed[step.id] ? 'text-[#E6EDF3]' : 'text-[#8B949E]'}`}>
                {step.label}
              </p>
              <p className="text-[10px] text-[#8B949E] line-clamp-1">{step.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
