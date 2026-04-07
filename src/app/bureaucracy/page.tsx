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
            <div className="glass p-6 rounded-2xl border border-[#30363D]">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-500" /> Need Help?
               </h3>
               <p className="text-xs text-[#8B949E] leading-relaxed mb-6">
                 Bureaucracy can be overwhelming. Check your university&apos;s International Office website for specialized local forms.
               </p>
               <button className="w-full py-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-xs font-bold text-white hover:border-blue-500 transition-all">
                  Contact Support
               </button>
            </div>

            <div className="glass p-6 rounded-2xl border border-[#30363D]">
               <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-red-500" /> OFMS Branch
               </h3>
               <p className="text-xs text-[#8B949E] leading-relaxed">
                 You must visit your local OFMS (Migration Office) for Fingerprinting and Registration.
               </p>
               <div className="mt-4 flex flex-col gap-2">
                 <a href="#" className="flex items-center gap-2 text-[10px] text-blue-400 font-bold hover:underline">
                    <Search size={12} /> Find Nearest Branch
                 </a>
               </div>
            </div>

            <AdBanner slot="sidebar" />
         </aside>
      </div>
    </div>
  );
}
