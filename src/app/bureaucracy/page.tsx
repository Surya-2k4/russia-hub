import { ChecklistTracker } from '@/components/bureaucracy/ChecklistTracker';
import { AdBanner } from '@/components/layout/AdBanner';
import { FileText, ShieldCheck, MapPin, Search } from 'lucide-react';

export default function BureaucracyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold text-blue-400 mb-6">
           <ShieldCheck size={14} /> Official 2024 Guidelines
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Bureaucracy Tracker</h1>
        <p className="text-[#8B949E] text-lg max-w-2xl">
          Russia is famous for its paperwork. Use this checklist to stay on top of your Pre-Arrival and Post-Arrival legal requirements.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         <div className="lg:col-span-3">
            <ChecklistTracker />
            <AdBanner slot="inline" className="mt-12" />
         </div>

          <aside className="space-y-8">
            <div className="glass p-6 rounded-2xl border border-border group hover:border-blue-500/30 transition-all">
               <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-500" /> Need Help?
               </h3>
               <p className="text-xs text-muted leading-relaxed mb-6">
                 Bureaucracy can be overwhelming. Join our community support or contact the university international office.
               </p>
               <a 
                 href="https://t.me/russia_student_support" 
                 target="_blank"
                 className="w-full py-3 bg-surface border border-border rounded-xl text-xs font-bold text-foreground hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 transition-all shadow-xl"
               >
                  Contact Community Support
               </a>
            </div>

            <div className="glass p-6 rounded-2xl border border-border group hover:border-red-500/30 transition-all">
               <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-red-500" /> OFMS Branch
               </h3>
               <p className="text-xs text-muted leading-relaxed">
                 You must visit your local OFMS (Migration Office) for Fingerprinting and Registration.
               </p>
               <div className="mt-6 flex flex-col gap-3">
                 <a 
                   href="https://www.google.com/maps/search/Migration+Center+Russia" 
                   target="_blank"
                   className="flex items-center justify-center gap-2 py-3 bg-background border border-border rounded-xl text-[10px] text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg"
                 >
                    <Search size={14} /> Search Near Me
                 </a>
                 <p className="text-[8px] text-muted text-center opacity-50 uppercase font-black tracking-tighter">Powered by Google/Yandex Maps</p>
               </div>
            </div>

            <AdBanner slot="sidebar" />
         </aside>
      </div>
    </div>
  );
}
