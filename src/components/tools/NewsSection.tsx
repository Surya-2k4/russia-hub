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
      // Using RSS2JSON to fetch TASS English news feed
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://tass.com/rss/v2.xml`);
      const data = await response.json();
      if (data.status === 'ok') {
        setNews(data.items.slice(0, 6));
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("News fetch error:", error);
      // Fallback data
      setNews([
        { title: "Russian Universities Announce New Faculty Initiatives", link: "#", pubDate: new Date().toISOString(), description: "New programs aimed at international students..." },
        { title: "Metro Expansion in Moscow: 3 New Stations Opening", link: "#", pubDate: new Date().toISOString(), description: "City officials confirm the completion of the latest branch..." }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence mode="popLayout">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="glass p-6 rounded-3xl border border-border bg-surface/50 h-[240px] animate-shimmer" />
              ))
            ) : (
              news.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-3xl border border-border bg-surface/50 flex flex-col justify-between group h-full"
                >
                   <div>
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                            <Clock size={10} /> {new Date(item.pubDate).toLocaleDateString()}
                         </span>
                         <Globe size={14} className="text-muted opacity-30" />
                      </div>
                      <h4 className="font-bold text-foreground leading-snug mb-3 group-hover:text-blue-500 transition-colors line-clamp-3">
                         {item.title}
                      </h4>
                      <p className="text-[10px] text-muted line-clamp-2 leading-relaxed mb-4">
                         {item.description?.replace(/<[^>]*>?/gm, '')}
                      </p>
                   </div>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black uppercase text-blue-500 flex items-center gap-1 hover:gap-2 transition-all"
                      >
                         Read Full Story <ExternalLink size={12} />
                      </a>
                      <button className="p-2 text-muted hover:text-foreground transition-all">
                         <Share2 size={14} />
                      </button>
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
