"use client";

import { useState } from 'react';
import { OcrTranslator } from '@/components/tools/OcrTranslator';
import { WardrobeAdvisor } from '@/components/tools/WardrobeAdvisor';
import { HowToGuides } from '@/components/tools/HowToGuides';
import { ClimateTracker } from '@/components/tools/ClimateTracker';
import { JobFinder } from '@/components/tools/JobFinder';
import { RussianCalendar } from '@/components/tools/RussianCalendar';
import { SanctionsChecker } from '@/components/tools/SanctionsChecker';
import { NewsSection } from '@/components/tools/NewsSection';
import { AdBanner } from '@/components/layout/AdBanner';
import { 
  Scan, 
  Shirt, 
  BookOpen, 
  Sparkles, 
  HelpCircle,
  LayoutGrid,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Calendar,
  Briefcase,
  ShieldAlert,
  Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOOLS = [
  { 
    id: 'climate', 
    name: 'Climate Status', 
    desc: 'Real-time weather data and 3-day forecast across all major Russian cities.', 
    icon: Sparkles, 
    color: 'blue',
    component: ClimateTracker
  },
  { 
    id: 'ocr', 
    name: 'OCR Document Reader', 
    desc: 'Extract Russian text from photos of your visas and IDs.', 
    icon: Scan, 
    color: 'blue',
    component: OcrTranslator
  },
  { 
    id: 'wardrobe', 
    name: 'Wardrobe Advisor', 
    desc: 'Weather-aware clothing checklist for major Russian cities.', 
    icon: Shirt, 
    color: 'emerald',
    component: WardrobeAdvisor 
  },
  { 
    id: 'guides', 
    name: 'How-To Solutions', 
    desc: 'Step-by-step guides for licenses, dorms, and medical checks.', 
    icon: HelpCircle, 
    color: 'orange',
    component: HowToGuides
  },
  { 
    id: 'calendar', 
    name: 'Russian Calendar', 
    desc: 'National holidays, academic schedules, and bridge-day logic.', 
    icon: Calendar, 
    color: 'red',
    component: RussianCalendar
  },
  { 
    id: 'jobs', 
    name: 'Job Search Hub', 
    desc: 'Student work regulations and direct search via HH.ru integration.', 
    icon: Briefcase, 
    color: 'emerald',
    component: JobFinder
  },
  { 
    id: 'sanctions', 
    name: 'Sanctions Watch', 
    desc: 'Verify entities against global OFAC, EU, and UK sanctions lists.', 
    icon: ShieldAlert, 
    color: 'red',
    component: SanctionsChecker
  },
  { 
    id: 'news', 
    name: 'Russian News', 
    desc: 'Live updates from official Russian news agencies and global feeds.', 
    icon: Newspaper, 
    color: 'blue',
    component: NewsSection
  },
  { 
    id: 'language', 
    name: 'Russian Shortcuts', 
    desc: 'Essential phrases for survival in day-to-day interactions.', 
    icon: MessageSquare, 
    color: 'purple'
  }
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const CurrentTool = TOOLS.find(t => t.id === activeTool)?.component;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-border">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full" />
         <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 mb-6 uppercase tracking-widest">
               <Sparkles size={14} /> Ultimate Survival Kit
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">Student <span className="text-blue-500">Survival</span> Tools</h1>
            <p className="text-muted text-lg max-w-2xl leading-relaxed">
              Handy utilities to help you navigate life in Russia. From document translation to siberian wardrobe advice.
            </p>
         </div>
         
         <div className="absolute bottom-4 right-8 flex items-center gap-4 text-[#30363D]">
            <LayoutGrid size={80} />
         </div>
      </header>

      {/* Card Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-1">
        {TOOLS.map((tool, idx) => (
          <motion.button
            key={tool.id}
            onClick={() => tool.component && setActiveTool(tool.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex flex-col text-left p-6 rounded-3xl border transition-all h-full group relative overflow-hidden ${
              activeTool === tool.id 
                ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/50' 
                : 'glass bg-surface/50 border-border hover:border-blue-500/50'
            }`}
          >
             <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-muted group-hover:bg-blue-600 group-hover:text-foreground transition-all w-fit mb-6 ${activeTool === tool.id ? 'bg-blue-600 text-foreground' : ''}`}>
                <tool.icon size={24} />
             </div>
             <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                {tool.name}
                {activeTool === tool.id && <TrendingUp size={14} className="text-blue-500" />}
             </h3>
             <p className="text-xs text-muted leading-relaxed flex-1">{tool.desc}</p>
             
             {!tool.component && (
                <div className="mt-4 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Coming Soon</span>
                </div>
             )}
             
             <div className="mt-6 flex justify-end">
                <ChevronRight size={16} className={`text-blue-500/50 transition-all ${activeTool === tool.id ? 'rotate-90 translate-x-1 translate-y-1' : 'group-hover:translate-x-1'}`} />
             </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTool && CurrentTool ? (
           <motion.div
             key={activeTool}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="relative pt-8 border-t border-border/50"
           >
              <div className="absolute top-0 right-0 py-4">
                 <button 
                   onClick={() => setActiveTool(null)}
                   className="text-[10px] font-bold text-muted uppercase tracking-widest hover:text-foreground flex items-center gap-2 bg-surface px-4 py-2 border border-border rounded-full"
                 >
                    Close Tool &times;
                 </button>
              </div>
              <div className="mt-8">
                 <CurrentTool />
              </div>
           </motion.div>
        ) : (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="flex flex-col items-center justify-center py-20 text-[#30363D]"
           >
              <div className="p-8 rounded-full border-2 border-dashed border-border mb-4">
                 <LayoutGrid size={48} className="opacity-20" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-50">Select a tool above to get started</p>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20">
         <AdBanner slot="inline" />
      </div>

      {/* Must-have Mobile Apps Section */}
      <section className="mt-20">
         <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-2xl font-bold text-foreground tracking-tight">Must-have Mobile Apps</h3>
               <p className="text-sm text-muted mt-1">Essential applications for living and traveling in Russia.</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Yandex Go", desc: "The go-to app for Taxis, Food Delivery, and Groceries.", category: "Transport", icon: "🚕" },
              { name: "2GIS", desc: "Best offline maps and building entrance finder in Russia.", category: "Navigation", icon: "🗺️" },
              { name: "Yandex Maps", desc: "Live public transport tracking (Bus/Tram/Metro).", category: "Transport", icon: "🚌" },
              { name: "Tinkoff / Sber", desc: "Essential for P2P transfers and contactless payments.", category: "Finance", icon: "💳" },
              { name: "Ozon / Wildberries", desc: "The Amazon of Russia. Everything delivered in 24h.", category: "Shopping", icon: "📦" },
              { name: "Telegram", desc: "The primary communication tool for everyone in Russia.", category: "Social", icon: "💬" }
            ].map((app, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl border border-border hover:border-blue-500/30 transition-all flex items-center gap-4 group">
                 <div className="text-3xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {app.icon}
                 </div>
                 <div>
                    <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest">{app.category}</span>
                    <h4 className="text-sm font-bold text-foreground mb-1">{app.name}</h4>
                    <p className="text-xs text-muted leading-tight">{app.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Static Language Section */}
      <section className="mt-20 glass p-8 rounded-3xl border border-border bg-surface/30 relative overflow-hidden">
         <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-purple-500/5 blur-[50px] rounded-full" />
         <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
               <BookOpen size={28} className="text-blue-500" />
               Russian Language Shortcuts
            </h3>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest leading-none">Level 1 - Survival</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ru: "Здравствуйте", en: "Hello (formal)", ph: "Zdrav-stvu-yte" },
              { ru: "Спасибо", en: "Thank you", ph: "Spa-si-bo" },
              { ru: "Пожалуйста", en: "Please / Welcome", ph: "Po-zha-luy-sta" },
              { ru: "Где туалет?", en: "Where is the toilet?", ph: "Gde tu-a-let?" }
            ].map((phrase, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background/80 border border-border group hover:border-blue-500/50 transition-all border-b-4 border-b-[#30363D] hover:border-b-blue-500/50">
                 <p className="text-2xl font-bold text-foreground mb-2">{phrase.ru}</p>
                 <div className="flex flex-col gap-1">
                    <p className="text-[10px] text-blue-400 font-bold mb-2 uppercase tracking-tighter opacity-80">{phrase.ph}</p>
                    <p className="text-xs text-muted italic leading-tight group-hover:text-[#E6EDF3] transition-colors">{phrase.en}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
      
      <footer className="mt-20 py-8 border-t border-border text-center">
         <p className="text-xs text-muted italic opacity-50 font-mono">Tools are optimized for mobile-web and browser use.</p>
      </footer>
    </div>
  );
}
