"use client";

import { 
  Car, 
  Home, 
  Settings, 
  FileCheck, 
  ShieldCheck, 
  ChevronRight,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const GUIDES = [
  {
    id: 'driving',
    title: 'Russian Driving License',
    icon: Car,
    color: 'blue',
    url: 'https://гибдд.рф/',
    steps: [
      'Get a certified translation of your foreign license.',
      'Pass the medical exam (Spravka) at a registered clinic.',
      'Register at your local GIBDD (Traffic Police) office.',
      'Either exchange your license (if treaty exists) or pass the Russian theory and practical exams.'
    ],
    difficulty: 'Medium',
    time: '2-4 weeks'
  },
  {
    id: 'dorm',
    title: 'Finding a Dorm/Apartment',
    icon: Home,
    color: 'emerald',
    url: 'https://cian.ru',
    steps: [
      'Apply to university international office for a dorm spot.',
      'If finding private housing, use apps like Cian or Avito.',
      'Always sign a legal contract (Dogovor).',
      'Register your new address within 7 working days at the MVD.'
    ],
    difficulty: 'Hard',
    time: '1-2 weeks'
  },
  {
    id: 'medical',
    title: 'Mandatory Medical Check',
    icon: ShieldCheck,
    color: 'orange',
    url: 'https://mc.mos.ru/en/personal-account',
    steps: [
      'Mandatory for all students within 90 days of arrival.',
      'Visit the designated medical center for your city.',
      'Undergo tests for HIV, Leprosy, and other infections.',
      'Submit the results to the MVD and university.'
    ],
    difficulty: 'Easy',
    time: '3 days'
  },
  {
    id: 'sim',
    title: 'Getting a SIM Card',
    icon: Settings,
    color: 'purple',
    url: 'https://moskva.mts.ru/personal',
    steps: [
      'Visit any mobile shop (MTS, Beeline, Megafon, Tele2).',
      'Present your passport and migration card.',
      'Get a prepaid plan (usually 500-800 RUB/month).',
      'Download the mobile app for easy top-ups.'
    ],
    difficulty: 'Very Easy',
    time: '30 mins'
  }
];

export function HowToGuides() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-1">
         <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Essential &quot;How-To&quot; Guides</h3>
            <p className="text-sm text-[#8B949E] mt-1">Step-by-step solutions for common student hurdles.</p>
         </div>
         <div className="hidden md:flex items-center gap-2 bg-[#161B22] border border-[#30363D] px-4 py-2 rounded-xl text-[#8B949E] text-xs">
            <Search size={14} /> Search Guides
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide, idx) => (
          <motion.div 
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-3xl border border-[#30363D] hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
               <div className={`p-4 rounded-2xl bg-${guide.color}-500/10 text-${guide.color}-500 border border-${guide.color}-500/20 group-hover:bg-${guide.color}-500 group-hover:text-white transition-all`}>
                  <guide.icon size={28} />
               </div>
               <div className="text-right">
                  <span className="text-[8px] uppercase font-black text-[#8B949E] tracking-widest block mb-1">Difficulty</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    guide.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    guide.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    'bg-green-500/10 text-green-400 border-green-500/20'
                  }`}>
                    {guide.difficulty}
                  </span>
               </div>
            </div>

            <h4 className="text-xl font-bold text-white mb-4">{guide.title}</h4>
            
            <div className="space-y-3 mb-6">
               {guide.steps.map((step, sIdx) => (
                 <div key={sIdx} className="flex gap-3 text-sm text-[#8B949E]">
                    <span className="text-blue-500 font-bold font-mono text-xs mt-0.5">{sIdx + 1}.</span>
                    <p className="leading-tight group-hover:text-[#E6EDF3] transition-colors">{step}</p>
                 </div>
               ))}
            </div>

            <div className="pt-4 border-t border-[#30363D] flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] text-[#8B949E]">
                  <span className="font-bold">Estimated Time:</span> {guide.time}
               </div>
               <a 
                 href={guide.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-white transition-colors"
               >
                  READ FULL GUIDE <ChevronRight size={12} />
               </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
