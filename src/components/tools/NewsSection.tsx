"use client";

import { useState, useEffect } from 'react';
import { 
  Newspaper, 
  RefreshCw, 
  ExternalLink, 
  Clock, 
  TrendingUp,
  Globe,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tass.com/rss/v2.xml`);
      const data = await response.json();
      if (data.status === 'ok') {
        const enrichedItems = data.items.map((item: any, idx: number) => {
          // Attempt to extract img from description if thumbnail is missing
          let img = item.thumbnail || item.enclosure?.link;
          if (!img && item.description) {
            const match = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (match) img = match[1];
          }
          // Default fallbacks for specific news types
          if (!img) {
            const queries = ["kremlin", "moscow", "victory_day", "ruble", "tech"];
            img = `https://images.unsplash.com/photo-1513326127027-46383b159f8c?auto=format&fit=crop&q=80&w=800&${idx}`; 
          }
          return { ...item, displayImg: img };
        });
        setNews(enrichedItems.slice(0, 6));
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("News fetch error:", error);
      setNews([
        { title: "Russian Universities Announce New Faculty Initiatives", link: "#", pubDate: new Date().toISOString(), description: "New programs aimed at international students...", displayImg: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800" },
        { title: "Metro Expansion in Moscow: 3 New Stations Opening", link: "#", pubDate: new Date().toISOString(), description: "City officials confirm the completion of the latest branch...", displayImg: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=800" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 600000); // Update every 10 mins
    return () => clearInterval(interval);
  }, []);

  const handleShare = async (item: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: item.link
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      navigator.clipboard.writeText(item.link);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-600/10 rounded-xl text-blue-500"><Newspaper size={20} /></div>
           <div>
              <h3 className="font-black text-foreground tracking-tight">Current Russian News</h3>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <p className="text-[8px] text-muted font-black uppercase tracking-widest">Live Updates • {lastUpdated.toLocaleTimeString()}</p>
              </div>
           </div>
        </div>
        <button 
          onClick={fetchNews}
          disabled={loading}
          className="p-2 hover:bg-foreground/5 rounded-lg transition-all text-muted hover:text-blue-500 disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <AnimatePresence mode="popLayout">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="glass p-6 rounded-3xl border border-border bg-surface/50 h-[400px] animate-shimmer" />
              ))
            ) : (
              news.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  className="relative h-[450px] rounded-[2.5rem] border border-border bg-surface/50 overflow-hidden group shadow-2xl"
                >
                   {/* Background Image Layer */}
                   <div className="absolute inset-0 z-0">
                      <img 
                        src={item.displayImg} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" 
                        alt={item.title} 
                      />
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/60 to-background" />
                      <div className="absolute inset-0 bg-linear-to-r from-background/40 to-transparent opacity-50" />
                   </div>

                   {/* Content Layer */}
                   <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                      <div className="mb-4">
                         <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg tracking-widest leading-none">
                               Central Press
                            </span>
                            <span className="text-[10px] font-black uppercase text-muted tracking-widest flex items-center gap-1.5 opacity-60">
                               <Clock size={10} /> {new Date(item.pubDate).toLocaleDateString()}
                            </span>
                         </div>
                         <h4 className="text-xl font-black text-foreground leading-tight mb-4 group-hover:text-blue-500 transition-colors line-clamp-3">
                            {item.title}
                         </h4>
                         <p className="text-sm text-muted line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            {item.description?.replace(/<[^>]*>?/gm, '')}
                         </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
                         <a 
                           href={item.link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 py-3 px-6 bg-foreground text-background rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                         >
                            Read Full Report <ExternalLink size={14} />
                         </a>
                         <button 
                           onClick={() => handleShare(item)}
                           className="p-3 text-muted hover:text-foreground transition-all hover:bg-white/10 rounded-2xl glass"
                         >
                            <Share2 size={18} />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))
            )}
         </AnimatePresence>
      </div>

      <div className="p-4 glass rounded-2xl border border-border bg-background flex items-center justify-center gap-2 opacity-50">
         <TrendingUp size={14} className="text-blue-500" />
         <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Aggregating from Russia Central News Network</p>
      </div>
    </div>
  );
}
