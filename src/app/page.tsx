import { AdBanner } from '@/components/layout/AdBanner';
import { VisaProgress } from '@/components/dashboard/VisaProgress';
import { CurrencyConverter } from '@/components/dashboard/CurrencyConverter';
import { Plane, ArrowUpRight, GraduationCap, Map as MapIcon, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative py-12 mb-12 flex flex-col items-center text-center">
         <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
         <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full" />
         
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-blue-400 mb-6 animate-shimmer">
           <Plane size={14} className="rotate-45" /> New Session 2024-25 Opening Soon
         </div>
         
         <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight bg-gradient-to-br from-foreground via-foreground/80 to-muted bg-clip-text text-transparent">
           Your Journey to <span className="text-blue-500">Russia</span> <br />Starts Here.
         </h1>
         
         <p className="max-w-2xl text-muted text-lg md:text-xl leading-relaxed mb-10">
           The ultimate dashboard for international students. Track your visa, calculate expenses, find universities, and join the expat community.
         </p>
         
         <div className="flex flex-wrap justify-center gap-4">
            <Link href="/bureaucracy" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-foreground transition-all transform hover:scale-105 shadow-xl flex items-center gap-2">
               Get Started <ArrowUpRight size={20} />
            </Link>
            <Link href="/community" className="px-8 py-4 bg-surface text-foreground font-bold rounded-2xl border border-border hover:border-blue-500 transition-all flex items-center gap-2">
               Join Community
            </Link>
         </div>
      </section>

      <AdBanner slot="top" />

      {/* Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
         <div className="lg:col-span-2 space-y-8">
            <VisaProgress />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Secondary Cards */}
                <Link href="/universities" className="glass p-6 rounded-2xl border border-border group hover:border-blue-500 transition-all relative overflow-hidden h-full">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><GraduationCap size={24} /></div>
                      <ArrowUpRight className="text-border group-hover:text-blue-500 transition-colors" size={20} />
                   </div>
                   <h3 className="text-xl font-bold text-foreground mb-2">University Finder</h3>
                   <p className="text-sm text-muted">Browse through 30+ top-tier Russian medical and technical universities.</p>
                   <div className="absolute -bottom-6 -right-6 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
                      <GraduationCap size={120} />
                   </div>
                </Link>

                <Link href="/community" className="glass p-6 rounded-2xl border border-border group hover:border-red-500 transition-all relative overflow-hidden h-full">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-red-500/10 rounded-xl text-red-500"><MapIcon size={24} /></div>
                      <ArrowUpRight className="text-border group-hover:text-red-500 transition-colors" size={20} />
                   </div>
                   <h3 className="text-xl font-bold text-foreground mb-2">Student Map</h3>
                   <p className="text-sm text-muted">See where other international students are located across the motherland.</p>
                   <div className="absolute -bottom-6 -right-6 text-red-500/5 group-hover:text-red-500/10 transition-colors">
                      <MapIcon size={120} />
                   </div>
                </Link>
            </div>
         </div>

         <div className="space-y-8 h-full">
            <CurrencyConverter />
            
            <div className="glass p-6 rounded-2xl border border-border relative overflow-hidden">
               <div className="p-3 bg-gold/10 rounded-xl text-gold w-fit mb-4"><Wallet size={20} /></div>
               <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">Quick Finance Tips</h3>
               <ul className="space-y-3">
                  <li className="text-xs text-muted flex items-center gap-2">
                     <div className="w-1 h-1 bg-green-500 rounded-full" /> Sberbank and Tinkoff are the safest bets for apps.
                  </li>
                  <li className="text-xs text-muted flex items-center gap-2">
                     <div className="w-1 h-1 bg-green-500 rounded-full" /> Use P2P for the best conversion rates (INR ↔ USDT ↔ RUB).
                  </li>
               </ul>
               <Link href="/finance" className="mt-6 text-xs font-bold text-gold flex items-center gap-2 hover:underline">
                  Full Financial Guide <ArrowUpRight size={14} />
               </Link>
            </div>
            
            <AdBanner slot="sidebar" />
         </div>
      </div>
    </div>
  );
}
