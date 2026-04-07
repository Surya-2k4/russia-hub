"use client";

import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ArrowRightLeft, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Zap,
  Globe2,
  DollarSign
} from 'lucide-react';

export function FinancialGuide() {
  const routes = [
    { 
      id: "p2p", 
      title: "P2P Crypto", 
      label: "Recommended", 
      description: "Buy USDT with INR via Binance or Paxful and sell for RUB into your Russian MIR card.", 
      speed: "Fast (15-30 mins)", 
      fee: "Low-Med",
      icon: Zap,
      color: "blue"
    },
    { 
      id: "remittance", 
      title: "Direct Remittance", 
      label: "Official", 
      description: "Traditional bank-to-bank transfers via SWIFT-enabled banks (limited due to sanctions).", 
      speed: "Slow (3-7 days)", 
      fee: "High", 
      icon: Send,
      color: "green"
    },
    { 
      id: "wise", 
      title: "Fintech (Wise/Deel)", 
      label: "Restricted", 
      description: "Most Western fintechs are suspended, but some work with intermediary accounts.", 
      speed: "Fast (Same day)", 
      fee: "Competitive", 
      icon: ArrowRightLeft,
      color: "red"
    }
  ];

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
             <Globe2 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Money Routes (INR → RUB)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div key={route.id} className="glass p-6 rounded-2xl border border-[#30363D] shadow-xl hover:border-blue-500/50 transition-all flex flex-col group h-full">
              <div className="flex justify-between items-start mb-6">
                 <div className={`p-4 rounded-xl bg-${route.color}-500/10 text-${route.color}-500 border border-${route.color}-500/20`}>
                    <route.icon size={32} />
                 </div>
                 <span className={`text-[10px] font-bold uppercase py-0.5 px-2 rounded-full border ${
                    route.id === 'p2p' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                    route.id === 'remittance' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                    'bg-red-500/10 border-red-500/30 text-red-400'
                 }`}>
                   {route.label}
                 </span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{route.title}</h3>
                <p className="text-sm text-[#8B949E] leading-relaxed mb-6 italic">{route.description}</p>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-[#30363D]">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8B949E]">Transfer Speed:</span>
                    <span className="text-white font-bold">{route.speed}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-[#8B949E]">Effective Fee:</span>
                    <span className={`font-bold ${route.fee === 'Low-Med' ? 'text-green-500' : 'text-red-500'}`}>{route.fee}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass p-8 rounded-3xl border border-[#30363D] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#161B22] to-[#0D1117]">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <CreditCard size={120} className="text-blue-500" />
         </div>
         
         <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <CreditCard className="text-[#F0B429]" size={28} />
               Getting your MIR Bank Card
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <ul className="space-y-4">
                  {[
                    "Visit bank with Passport & Translation",
                    "Submit Admission & Registration docs",
                    "Standard processing (3-7 days)",
                    "Activate and download Mobile App"
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D1117]/50 border border-[#30363D] group hover:border-blue-500/50 transition-all">
                       <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                          {idx + 1}
                       </span>
                       <span className="text-sm text-[#E6EDF3] font-medium">{step}</span>
                    </li>
                  ))}
               </ul>
               
               <div className="bg-blue-600/5 border border-blue-600/20 p-6 rounded-2xl">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                     <AlertTriangle size={18} className="text-[#F0B429]" />
                     Critical Tips
                  </h4>
                  <div className="space-y-4">
                     <div className="flex gap-3">
                        <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                        <p className="text-xs text-[#8B949E] leading-relaxed">Most students prefer <span className="text-white font-bold">Sberbank</span> or <span className="text-white font-bold">VTB</span> for their wide network and reliable apps.</p>
                     </div>
                     <div className="flex gap-3">
                        <CheckCircle2 size={16} className="text-green-500 mt-1 shrink-0" />
                        <p className="text-xs text-[#8B949E] leading-relaxed">Always check the <span className="text-white font-bold">exchange spread</span> if using INR-to-RUB conversion services.</p>
                     </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-blue-600/20">
                     <div className="flex items-center gap-3">
                        <DollarSign size={20} className="text-[#F0B429]" />
                        <div>
                           <p className="text-[10px] text-[#8B949E] uppercase font-bold tracking-widest">Monthly Spending</p>
                           <p className="text-lg font-bold text-white">40k - 60k <span className="text-xs">RUB / mo</span></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section>
         <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-[#F0B429]" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Financial FAQs</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#30363D] bg-[#161B22]/30">
               <h4 className="text-sm font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-4">Is SWIFT working?</h4>
               <p className="text-xs text-[#8B949E] leading-relaxed">Only with specific unsanctioned banks. Check with Gazprombank or Unicredit.</p>
            </div>
            <div className="p-4 rounded-xl border border-[#30363D] bg-[#161B22]/30">
               <h4 className="text-sm font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-4">Can I use Indian UPI?</h4>
               <p className="text-xs text-[#8B949E] leading-relaxed">No, UPI is not accepted in Russia. You can only use MIR-compliant local systems.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
