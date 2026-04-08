"use client";

import { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  TrendingUp, 
  Clock, 
  GraduationCap,
  ShieldCheck,
  Building2,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STUDENT_JOBS = [
  { title: "English Tutor", comp: "Private/Online", pay: "1000-1500", icon: "🗣️", type: "Remote" },
  { title: "Delivery Partner", comp: "Yandex/Samokat", pay: "400-800", icon: "🚲", type: "Flexible" },
  { title: "Junior Developer", comp: "Tech Startups", pay: "800-1200", icon: "💻", type: "Part-time" },
  { title: "Translator", comp: "Agencies", pay: "500-1000", icon: "📝", type: "Freelance" },
];

export function JobFinder() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleHHSearch = () => {
    const url = `https://hh.ru/search/vacancy?text=${encodeURIComponent(searchQuery || 'student')}&schedule=partTime&experience=noExperience`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 glass p-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-background relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 text-blue-500 font-bold mb-4">
                  <Briefcase size={24} />
                  <h3 className="text-xl">Student Employment Hub</h3>
               </div>
               <p className="text-sm text-muted leading-relaxed mb-6 max-w-xl">
                  As an international student in Russia, you are legally allowed to work with your student visa (standard contracts). No special work permit is required if you are a full-time student.
               </p>
               
               <div className="relative group max-w-md">
                  <input 
                    type="text" 
                    placeholder="Search HH.ru for jobs (e.g. Developer, Tutor)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground focus:border-blue-500 outline-hidden transition-all shadow-inner"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-blue-500" size={20} />
                  <button 
                    onClick={handleHHSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all"
                  >
                     <ExternalLink size={18} />
                  </button>
               </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Building2 size={120} />
            </div>
         </div>

         <div className="glass p-6 rounded-3xl border border-border bg-surface/50 flex flex-col justify-between">
            <div>
               <h4 className="text-xs font-black text-muted uppercase tracking-widest mb-4">Quick Regulations</h4>
               <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-[10px] text-muted">
                     <ShieldCheck size={14} className="text-green-500 shrink-0" />
                     <span>No separate work permit needed since 2020 regulatory changes.</span>
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-muted">
                     <Clock size={14} className="text-blue-500 shrink-0" />
                     <span>Recommended limit: 20 hours/week to maintain academic progress.</span>
                  </li>
               </ul>
            </div>
            <button className="w-full mt-6 py-3 bg-foreground/5 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-muted hover:border-blue-500/50 transition-all">
               View Legal Guide
            </button>
         </div>
      </div>

      {/* Suggested Categories */}
      <div className="space-y-4">
         <h3 className="text-sm font-black text-muted uppercase tracking-widest ml-2">Popular Student Roles</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STUDENT_JOBS.map((job, idx) => (
              <div key={idx} className="glass p-5 rounded-2xl border border-border hover:border-blue-500/30 transition-all group">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl">{job.icon}</span>
                    <span className="text-[8px] font-black uppercase px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/10">{job.type}</span>
                 </div>
                 <h4 className="text-sm font-bold text-foreground mb-1">{job.title}</h4>
                 <p className="text-[10px] text-muted mb-4">{job.comp}</p>
                 <div className="flex items-end justify-between border-t border-border pt-3">
                    <div>
                       <p className="text-[8px] uppercase font-black text-muted leading-none mb-1">Avg Pay</p>
                       <p className="text-xs font-black text-foreground">{job.pay} <span className="text-[8px] text-blue-500">RUB/hr</span></p>
                    </div>
                    <TrendingUp size={14} className="text-green-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="p-4 glass rounded-2xl border border-border bg-orange-500/5 flex items-center gap-4">
         <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><GraduationCap size={20} /></div>
         <p className="text-[10px] text-muted">
            <span className="font-bold text-foreground">Note:</span> Working on a student visa contributes to your "Experience" in Russia, which can be beneficial if you plan to apply for RVP/VNZ (Residency) later.
         </p>
      </div>
    </div>
  );
}
