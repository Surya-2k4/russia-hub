import { OnlineChat } from '@/components/community/OnlineChat';
import { AdBanner } from '@/components/layout/AdBanner';
import { Users, Map as MapIcon, Globe2, MessageSquare, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 mb-6 uppercase tracking-widest leading-none">
           <Sparkles size={14} /> Live Global Chat
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Student <span className="text-blue-500">Community</span> Hub</h1>
        <p className="text-[#8B949E] text-lg max-w-2xl">
          The ultimate real-time chat platform for international students in Russia. Meet peers, share tips, and find friends in your city.
        </p>
      </header>

      <div className="space-y-12">
         <section>
            <OnlineChat />
         </section>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <div className="glass p-8 rounded-3xl border border-[#30363D]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                     <MessageSquare size={24} className="text-blue-500" />
                     Essential Telegram Channels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                        { name: "Students in Russia (Official)", link: "https://t.me/example", desc: "Main hub for university news and legal updates." },
                        { name: "Moscow expat housing", link: "https://t.me/example", desc: "For finding dorms and apartments in Moscow." },
                        { name: "SPb International Hub", link: "https://t.me/example", desc: "Saint Petersburg student social community." },
                        { name: "P2P Trades & Crypto RU", link: "https://t.me/example", desc: "Safe money exchange discussions." }
                     ].map((chat, idx) => (
                        <a 
                          key={idx} 
                          href={chat.link} 
                          target="_blank" 
                          className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] hover:border-blue-500 transition-all group"
                        >
                           <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-500 transition-colors">{chat.name}</h4>
                           <p className="text-[10px] text-[#8B949E] line-clamp-2">{chat.desc}</p>
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            <aside className="space-y-8">
               <div className="glass p-6 rounded-2xl border border-[#30363D] bg-gradient-to-br from-[#161B22] to-red-600/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <Globe2 size={18} className="text-blue-400" />
                     Global Cluster
                  </h3>
                  <p className="text-xs text-[#8B949E] leading-relaxed mb-6 italic">
                    The heatmap shows where international students are concentrating. High density in <span className="text-white font-bold">Moscow</span> and <span className="text-white font-bold">St. Petersburg</span> is expected, but check out growing hubs like <span className="text-white font-bold">Kazan</span>.
                  </p>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#8B949E]">
                        <span>Density</span>
                        <span>Region</span>
                     </div>
                     <div className="h-1.5 w-full bg-[#0D1117] rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-red-600" />
                     </div>
                     <div className="flex justify-between items-center text-[10px] text-[#E6EDF3] font-mono">
                        <span>High</span>
                        <span>Moscow Central</span>
                     </div>
                  </div>
               </div>

               <AdBanner slot="sidebar" />
            </aside>
         </div>
      </div>
    </div>
  );
}
