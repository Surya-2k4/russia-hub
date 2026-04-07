import { FinancialGuide } from '@/components/finance/FinancialGuide';
import { AdBanner } from '@/components/layout/AdBanner';
import { Wallet, Landmark, ShieldCheck } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-bold text-green-400 mb-6 uppercase tracking-widest">
           <ShieldCheck size={14} /> Safe Transactions
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Financial Guide</h1>
        <p className="text-[#8B949E] text-lg max-w-2xl">
          Managing money in Russia requires a strategy. Learn about P2P routes, MIR cards, and living costs in Russian rubles.
        </p>
      </header>

      <FinancialGuide />

      <AdBanner slot="top" className="mt-20" />
      
      <section className="mt-20 py-12 border-t border-[#30363D]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl font-bold text-white mb-6">Banking Basics</h2>
               <p className="text-[#8B949E] leading-relaxed mb-6">
                 Russian banks are highly digitalized. The mobile apps for Sberbank, VTB, and Tinkoff are among the best in the world. Once you get your MIR card, you&apos;ll be able to pay for everything via QR codes or NFC.
               </p>
               <div className="flex gap-4">
                  <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-2xl flex-1">
                     <p className="text-xs font-bold text-blue-500 mb-2 uppercase">Best Overall</p>
                     <p className="text-sm text-white font-bold">Sberbank</p>
                  </div>
                  <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-2xl flex-1">
                     <p className="text-xs font-bold text-red-500 mb-2 uppercase">Best App</p>
                     <p className="text-sm text-white font-bold">Tinkoff</p>
                  </div>
               </div>
            </div>
            
            <div className="glass p-8 rounded-3xl border border-[#30363D] bg-[#0D1117]">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Landmark size={20} className="text-[#F0B429]" />
                  Fee Awareness
               </h3>
               <p className="text-xs text-[#8B949E] leading-loose mb-6">
                 Always be aware of commissions when withdrawing from ATMs of other banks. Most student cards have a limit of <span className="text-white font-bold">50,000 RUB</span> for commission-free cross-bank withdrawals per month via the SBP system.
               </p>
               <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 text-[10px] font-bold">
                  Sberbank recently introduced a 1.25% fee for some P2P received transfers. Check your app for updates.
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
