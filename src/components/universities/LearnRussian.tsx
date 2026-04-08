"use client";

import { 
  Languages, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  Award,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

const ALPHABET = [
  { ru: "А", en: "A", sound: "ah" }, { ru: "Б", en: "B", sound: "beh" }, { ru: "В", en: "V", sound: "veh" },
  { ru: "Г", en: "G", sound: "geh" }, { ru: "Д", en: "D", sound: "deh" }, { ru: "Е", en: "Ye", sound: "yeh" },
  { ru: "Ё", en: "Yo", sound: "yoh" }, { ru: "Ж", en: "Zh", sound: "zheh" }, { ru: "З", en: "Z", sound: "zeh" },
  { ru: "И", en: "I", sound: "ee" }, { ru: "Й", en: "Y", sound: "iy" }, { ru: "К", en: "K", sound: "kah" },
];

const LEVELS = [
  { id: "A1", name: "Beginner", desc: "Basic survival Russian: numbers, greetings, and simple shopping phrases." },
  { id: "A2", name: "Elementary", desc: "Can discuss daily routines, family, and simple work-related tasks." },
  { id: "B1", name: "Intermediate", desc: "Entry level for many universities. Can travel and describe experiences." },
  { id: "B2", name: "Upper-Intermediate", desc: "Fluent interaction. Can understand complex texts on technical topics." },
  { id: "C1", name: "Advanced", desc: "Academic level. Can use the language flexibly for social and professional purposes." },
  { id: "C2", name: "Proficiency", desc: "Near-native mastery of all nuances and stylistic tones." }
];

export function LearnRussian() {
  return (
    <div className="space-y-12">
      {/* Alphabet Grid */}
      <section>
         <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
               <Languages size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-foreground tracking-tight">Cyrillic <span className="text-blue-500">Foundation</span></h3>
               <p className="text-[10px] text-muted uppercase font-black tracking-widest">The first 12 Essential Characters</p>
            </div>
         </div>

         <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {ALPHABET.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-4 rounded-2xl border border-border bg-surface/50 text-center flex flex-col items-center group cursor-default"
              >
                 <span className="text-3xl font-black text-foreground group-hover:text-blue-500 transition-colors mb-1">{item.ru}</span>
                 <span className="text-[10px] font-black uppercase text-blue-500 opacity-60">{item.en}</span>
                 <span className="text-[8px] text-muted font-bold mt-1">({item.sound})</span>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Level Descriptions */}
      <section>
         <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-600/10 rounded-lg text-emerald-500">
               <Award size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-foreground tracking-tight">TORFL <span className="text-emerald-500">Proficiency</span> Levels</h3>
               <p className="text-[10px] text-muted uppercase font-black tracking-widest">International CEFR Standard for Russian</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEVELS.map((level) => (
              <div key={level.id} className="glass p-6 rounded-[2.5rem] border border-border bg-surface/30 group hover:border-emerald-500/30 transition-all flex flex-col gap-4">
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-xl">
                       {level.id}
                    </div>
                    <Sparkles className="text-emerald-500/20" size={20} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-foreground mb-2 group-hover:text-emerald-500 transition-colors">{level.name}</h4>
                    <p className="text-xs text-muted leading-relaxed font-medium">{level.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* CTA Section */}
      <div className="glass p-8 rounded-[3rem] border border-blue-500/20 bg-blue-600/5 relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
               <h3 className="text-3xl font-black text-foreground mb-4">Ready to Start Your <span className="text-blue-500">Podfak</span>?</h3>
               <p className="text-sm text-muted leading-relaxed">
                  The Preparatory Faculty (Podfak) is where most international students spend their first year. You will learn Russian for 6-10 months before entering your main degree.
               </p>
            </div>
            <button className="px-8 py-4 bg-foreground text-background font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl whitespace-nowrap">
               Find a Program <ChevronRight size={16} />
            </button>
         </div>
         <GraduationCap className="absolute -bottom-10 -right-10 text-blue-500/5 rotate-[-15deg]" size={200} />
      </div>
    </div>
  );
}
