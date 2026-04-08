"use client";

import { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Loader2,
  Globe,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SanctionsChecker() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      // Using OpenSanctions public search API
      const response = await fetch(`https://api.opensanctions.org/search/default?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Sanctions search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-background relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-red-500 font-bold mb-4">
            <ShieldCheck size={24} />
            <h3 className="text-xl">Global Sanctions Watch</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-2xl">
            Real-time verification against global enforcement lists including <span className="text-foreground font-bold">OFAC (US), EU, and UK</span>. Specifically designed for international individuals and entities navigating the Russian financial landscape.
          </p>
          
          <form onSubmit={handleSearch} className="relative group max-w-xl">
            <input 
              type="text" 
              placeholder="Enter Company Name or Individual..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-sm text-foreground focus:border-red-500/50 outline-hidden transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-red-500" size={20} />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Verify Entity"}
            </button>
          </form>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Globe size={120} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12 gap-4"
          >
            <Loader2 size={40} className="text-red-500 animate-spin" />
            <p className="text-xs text-muted font-bold uppercase tracking-widest animate-pulse">Cross-referencing Global Databases...</p>
          </motion.div>
        ) : searched ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
               <h4 className="text-xs font-black text-muted uppercase tracking-widest">Verification Results</h4>
               <span className="text-[10px] text-muted font-mono">Source: OpenSanctions API</span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {results.map((entity, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-red-500/20 bg-red-500/5 group hover:border-red-500/40 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="p-3 bg-red-500/10 rounded-xl text-red-500 h-fit">
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <h5 className="font-bold text-foreground mb-1 group-hover:text-red-500 transition-colors">{entity.caption}</h5>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {entity.properties.country?.map((c: string) => (
                              <span key={c} className="text-[8px] font-black uppercase px-2 py-0.5 bg-red-500/10 text-red-500 rounded-md border border-red-500/10">{c}</span>
                            ))}
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-foreground/5 text-muted rounded-md border border-border">{entity.schema}</span>
                          </div>
                          <p className="text-[10px] text-muted line-clamp-2 leading-relaxed">
                            Detected in multiple sanctions datasets. Proceed with extreme caution regarding transactions.
                          </p>
                        </div>
                      </div>
                      <a 
                        href={`https://www.opensanctions.org/entities/${entity.id}`} 
                        target="_blank" 
                        className="p-2 text-muted hover:text-foreground transition-all"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass p-12 rounded-3xl border border-green-500/20 bg-green-500/5 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h5 className="font-bold text-foreground mb-2">Clear Record Found</h5>
                  <p className="text-xs text-muted max-w-sm">
                    No direct matches found for "{query}" in the primary international sanctions databases. Note that spelling variations may exist.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="p-8 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center gap-4 opacity-50">
            <div className="p-4 bg-foreground/5 rounded-full"><Info size={32} /></div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">Awaiting Input For Verification</p>
          </div>
        )}
      </AnimatePresence>

      <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4">
        <AlertTriangle size={20} className="text-blue-500 shrink-0 mt-1" />
        <p className="text-[10px] text-muted leading-relaxed">
          <span className="font-bold text-blue-500">Disclaimer:</span> This tool provides high-level indicator data. Official verification should be conducted through the <a href="https://sanctionssearch.ofac.treas.gov/" className="text-blue-500 hover:underline">OFAC Sanctions List Search</a> or official EU/UK portals for legal compliance.
        </p>
      </div>
    </div>
  );
}
