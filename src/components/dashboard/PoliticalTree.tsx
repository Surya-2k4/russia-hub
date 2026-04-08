"use client";

import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  UserCircle2, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Building,
  Scale,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STRUCTURE = [
  {
    role: "President of the Russian Federation",
    name: "Vladimir Putin",
    bio: "The Head of State and Supreme Commander-in-Chief. Exercises overall leadership of the country and foreign policy.",
    icon: Crown,
    color: "red",
    location: "Moscow Kremlin"
  },
  {
    role: "Prime Minister",
    name: "Mikhail Mishustin",
    bio: "Head of the Government executive branch. Focuses on economic socio-development and digital transformation.",
    icon: Building2,
    color: "blue",
    location: "Government White House"
  },
  {
    role: "Parliament (Duma) Speaker",
    name: "Vyacheslav Volodin",
    bio: "Chairman of the Lower House of Parliament. Oversees legislative processes and national security laws.",
    icon: Scale,
    color: "emerald",
    location: "Okhotny Ryad"
  },
  {
    role: "Mayor of Moscow",
    name: "Sergey Sobyanin",
    bio: "Leader of Russia's capital and primary gateway for students. Oversees transport and urban infrastructure.",
    icon: MapPin,
    color: "orange",
    location: "Tverskaya, 13"
  }
];

export function PoliticalTree() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="glass p-8 rounded-3xl border border-border bg-surface/30 relative overflow-hidden h-full">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
           <div className="p-3 bg-red-600/10 rounded-2xl text-red-500">
              <Building2 size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-foreground tracking-tight">Governance Hierarchy</h3>
              <p className="text-[10px] text-muted font-black uppercase tracking-widest">Moscow Power Structure</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           {/* Navigation List */}
           <div className="space-y-4">
              {STRUCTURE.map((person, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    selected === idx 
                      ? 'bg-red-600 border-red-500 shadow-xl scale-[1.02]' 
                      : 'bg-background border-border hover:border-red-500/30'
                  }`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${selected === idx ? 'bg-white/20 text-white' : 'bg-surface text-muted group-hover:text-red-500'}`}>
                         <person.icon size={18} />
                      </div>
                      <div>
                         <p className={`text-[8px] font-black uppercase tracking-tighter ${selected === idx ? 'text-white/70' : 'text-red-500'}`}>
                            {person.role}
                         </p>
                         <h4 className={`font-bold text-sm leading-none mt-1 ${selected === idx ? 'text-white' : 'text-foreground'}`}>
                            {person.name}
                         </h4>
                      </div>
                   </div>
                   <ChevronRight size={16} className={selected === idx ? 'text-white' : 'text-muted'} />
                </button>
              ))}
           </div>

           {/* Detail Panel */}
           <AnimatePresence mode="wait">
              <motion.div 
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass p-8 rounded-3xl border border-red-500/20 bg-red-500/5 h-full flex flex-col justify-between"
              >
                 <div>
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-[8px] font-black uppercase text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                          {STRUCTURE[selected].role}
                       </span>
                       <ShieldCheck className="text-red-500/50" size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-4">{STRUCTURE[selected].name}</h3>
                    <p className="text-xs text-muted leading-relaxed mb-6 font-medium italic">
                      "{STRUCTURE[selected].bio}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-foreground font-bold bg-background p-3 rounded-xl border border-border">
                       <MapPin size={12} className="text-red-500" />
                       HQ: {STRUCTURE[selected].location}
                    </div>
                 </div>

                 <a 
                   href={`https://en.wikipedia.org/wiki/${STRUCTURE[selected].name.replace(' ', '_')}`}
                   target="_blank"
                   className="mt-8 w-full py-4 bg-foreground text-background font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-xl"
                 >
                    Official Archive <ExternalLink size={14} />
                 </a>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>

      <Building size={200} className="absolute bottom-[-50px] right-[-50px] text-foreground/[0.03] rotate-[-15deg]" />
    </div>
  );
}
