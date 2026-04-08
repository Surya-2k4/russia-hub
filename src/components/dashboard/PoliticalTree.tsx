"use client";

import { useState } from 'react';
import { 
  Network, 
  User, 
  ChevronRight, 
  X, 
  ExternalLink,
  Shield,
  Building,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STRUCTURE = [
  {
    role: "President of the Russian Federation",
    name: "Vladimir Putin",
    bio: "Head of state, supreme commander-in-chief and holder of the highest office in the Russian Federation.",
    region: "Federal / Kremlin",
    level: "top"
  },
  {
    role: "Prime Minister",
    name: "Mikhail Mishustin",
    bio: "Head of the Government of the Russian Federation, leading the executive branch.",
    region: "Federal / White House",
    level: "mid"
  },
  {
    role: "Minister of Foreign Affairs",
    name: "Sergei Lavrov",
    bio: "Responsible for foreign policy and international relations of the Russian Federation.",
    region: "Federal / MFA",
    level: "mid"
  },
  {
    role: "Governor of Moscow City",
    name: "Sergey Sobyanin",
    bio: "Leading the development, infrastructure, and administration of Russia's capital.",
    region: "Regional / Moscow",
    level: "local"
  }
];

export function PoliticalTree() {
  const [selected, setSelected] = useState<typeof STRUCTURE[0] | null>(null);

  return (
    <div className="glass p-8 rounded-3xl border border-border bg-[#0D1117]/30 h-full relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 rounded-xl text-red-500">
               <Network size={20} />
            </div>
            <div>
               <h3 className="font-black text-foreground tracking-tight">Interactive Political Tree</h3>
               <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Moscow • Regional • Local</p>
            </div>
         </div>
      </div>

      <div className="space-y-3">
         {STRUCTURE.map((person, idx) => (
           <motion.button
             key={idx}
             whileHover={{ x: 5 }}
             onClick={() => setSelected(person)}
             className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${
               selected?.name === person.name 
                 ? 'bg-red-600 border-red-500 text-white' 
                 : 'bg-surface border border-border hover:border-red-500/30'
             }`}
           >
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center p-0.5 border-2 ${selected?.name === person.name ? 'border-white/50' : 'border-border group-hover:border-red-500/20'}`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-muted group-hover:text-red-500 transition-colors">
                       <User size={18} />
                    </div>
                 </div>
                 <div className="text-left">
                    <p className={`text-[10px] font-black uppercase tracking-tighter ${selected?.name === person.name ? 'text-white/70' : 'text-red-500'}`}>{person.role}</p>
                    <h4 className="font-bold text-sm tracking-tight">{person.name}</h4>
                 </div>
              </div>
              <ChevronRight size={16} className={selected?.name === person.name ? 'text-white' : 'text-muted'} />
           </motion.button>
         ))}
      </div>

      <AnimatePresence>
         {selected && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md p-8 flex flex-col justify-between border border-border rounded-3xl"
            >
               <div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg">
                        <Shield size={24} />
                     </div>
                     <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/5 rounded-full text-muted hover:text-foreground">
                        <X size={20} />
                     </button>
                  </div>

                  <span className="text-[10px] font-black uppercase text-red-500 tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-4 inline-block">
                     {selected.role}
                  </span>
                  <h3 className="text-3xl font-black text-foreground mb-4">{selected.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="flex items-center gap-2 text-xs text-muted">
                        <Building size={14} className="text-red-500" /> {selected.region}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-muted">
                        <MapPin size={14} className="text-red-500" /> Russian Government
                     </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed font-medium">
                     {selected.bio}
                  </p>
               </div>

               <a 
                 href={`https://en.wikipedia.org/wiki/${selected.name.replace(' ', '_')}`}
                 target="_blank"
                 className="flex items-center justify-center gap-2 w-full py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl mt-4"
               >
                  Full Bio Archive <ExternalLink size={16} />
               </a>
            </motion.div>
         )}
      </AnimatePresence>

      <div className="absolute top-2 right-2 flex flex-col items-center opacity-10 pointer-events-none">
         <Building size={150} />
      </div>
    </div>
  );
}
