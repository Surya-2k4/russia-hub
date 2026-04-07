"use client";

import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Globe2, 
  Filter, 
  ExternalLink, 
  Users,
  ChevronRight,
  TrendingDown,
  Loader2
} from 'lucide-react';
import { UNIVERSITIES } from '@/lib/universities-data';
import { motion, AnimatePresence } from 'framer-motion';

export function UniversityFinder() {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [scraping, setScraping] = useState<string | null>(null);
  const [scrapedData, setScrapedData] = useState<Record<string, any>>({});

  const cities = ["All", ...Array.from(new Set(UNIVERSITIES.map(u => u.city)))];
  const languages = ["All", "English", "Russian", "Both"];

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                           u.nameRu.toLowerCase().includes(search.toLowerCase());
      const matchesCity = cityFilter === "All" || u.city === cityFilter;
      const matchesLang = languageFilter === "All" || u.languages.includes(languageFilter as any);
      return matchesSearch && matchesCity && matchesLang;
    });
  }, [search, cityFilter, languageFilter]);

  const startScrape = async (uniId: string, uniName: string) => {
    setScraping(uniId);
    // Simulate web scraping delay
    await new Promise(r => setTimeout(r, 2000));
    
    // Mock scraped data expansion
    setScrapedData({
      ...scrapedData,
      [uniId]: {
        hostelCost: "4,000 - 8,000 RUB",
        safetyScore: "9.2/10",
        campusSize: "Large urban",
        popularMajors: ["General Medicine", "Computer Science", "Business"],
        lastScraped: new Date().toLocaleDateString()
      }
    });
    setScraping(null);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filters Bar */}
      <div className="glass p-6 rounded-2xl border border-[#30363D] shadow-xl sticky top-4 z-40">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B949E] group-focus-within:text-blue-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by name (e.g. Lomonosov, RUDN)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0D1117] border border-[#30363D] rounded-xl outline-hidden focus:border-blue-500 text-white transition-all shadow-inner"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" size={14} />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-[#0D1117] border border-[#30363D] rounded-xl outline-hidden focus:border-blue-500 text-white text-sm appearance-none cursor-pointer font-semibold"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="relative min-w-[140px]">
              <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]" size={14} />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-[#0D1117] border border-[#30363D] rounded-xl outline-hidden focus:border-blue-500 text-white text-sm appearance-none cursor-pointer font-semibold"
              >
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-[#8B949E] text-xs px-1">
           <p>Found {filteredUniversities.length} universities</p>
           <p className="flex items-center gap-1.5 font-bold"><TrendingDown size={12} className="text-blue-500" /> Sorted by Popularity</p>
        </div>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.length > 0 ? (
          filteredUniversities.map((uni) => (
            <div 
              key={uni.id} 
              className="glass p-6 rounded-2xl border border-[#30363D] shadow-xl group hover:border-blue-500/50 hover:shadow-blue-500/5 transition-all flex flex-col h-full relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-600/20 group-hover:scale-110 transition-transform">
                   <GraduationCap size={28} />
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    {uni.ranking && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-500/30">
                        RANK #{uni.ranking}
                      </span>
                    )}
                    <button 
                      onClick={() => startScrape(uni.id, uni.name)}
                      disabled={scraping === uni.id}
                      className="text-[8px] font-black uppercase tracking-tighter text-[#8B949E] hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                       {scraping === uni.id ? <Loader2 size={8} className="animate-spin" /> : <Search size={8} />}
                       {scrapedData[uni.id] ? "Refresh Scrape" : "Scrape Latest Details"}
                    </button>
                 </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors leading-tight">{uni.name}</h3>
                <p className="text-xs text-[#8B949E] italic mb-3">{uni.nameRu}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#E6EDF3]">
                    <MapPin size={14} className="text-red-500" />
                    <span>{uni.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#E6EDF3]">
                    <Globe2 size={14} className="text-blue-400" />
                    <span>{uni.languages.join(", ")} Instruction</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#E6EDF3]">
                    <BookOpen size={14} className="text-green-500" />
                    <span>{uni.levels.join(", ")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="p-3 bg-[#0D1117] rounded-xl border border-[#30363D]">
                      <p className="text-[10px] text-[#8B949E] uppercase mb-1 font-bold">Tuition (year)</p>
                      <p className="text-sm font-bold text-white font-mono">${uni.tuitionUSD.min.toLocaleString()}+</p>
                   </div>
                   <div className="p-3 bg-[#0D1117] rounded-xl border border-[#30363D]">
                      <p className="text-[10px] text-[#8B949E] uppercase mb-1 font-bold">International</p>
                      <div className="flex items-center gap-1.5">
                         <Users size={12} className="text-blue-500" />
                         <p className="text-sm font-bold text-white font-mono">{uni.internationalStudents.toLocaleString()}</p>
                      </div>
                   </div>
                </div>

                {/* Scraped Details Expansion */}
                <AnimatePresence>
                   {(scraping === uni.id || scrapedData[uni.id]) && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-3 overflow-hidden"
                      >
                         {scraping === uni.id ? (
                           <div className="flex flex-col items-center gap-2 py-4">
                              <Loader2 size={24} className="text-blue-500 animate-spin" />
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest animate-pulse">Running Bot...</span>
                           </div>
                         ) : (
                           <>
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-[8px] uppercase font-black text-[#8B949E] mb-1">Hostel/Mo</p>
                                    <p className="text-[10px] font-bold text-[#E6EDF3]">{scrapedData[uni.id].hostelCost}</p>
                                 </div>
                                 <div>
                                    <p className="text-[8px] uppercase font-black text-[#8B949E] mb-1">Safety</p>
                                    <p className="text-[10px] font-bold text-green-400">{scrapedData[uni.id].safetyScore}</p>
                                 </div>
                              </div>
                              <div>
                                 <p className="text-[8px] uppercase font-black text-[#8B949E] mb-1">Top Programs</p>
                                 <div className="flex flex-wrap gap-1">
                                    {scrapedData[uni.id].popularMajors.map((m: string) => (
                                      <span key={m} className="text-[8px] bg-[#161B22] px-1.5 py-0.5 rounded border border-[#30363D] text-[#8B949E]">{m}</span>
                                    ))}
                                 </div>
                              </div>
                              <p className="text-[8px] text-[#8B949E] opacity-50 italic">Scraped from Google/Sputnik on {scrapedData[uni.id].lastScraped}</p>
                           </>
                         )}
                      </motion.div>
                   )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto">
                 <a 
                   href={uni.website} 
                   target="_blank" 
                   className="py-3 bg-[#161B22] border border-[#30363D] rounded-xl text-[10px] font-bold text-[#E6EDF3] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                 >
                   Official <ExternalLink size={10} />
                 </a>
                 <a 
                   href={`https://www.google.com/search?q=${encodeURIComponent(uni.name + " admission for international students")}`}
                   target="_blank" 
                   className="py-3 bg-blue-600 rounded-xl text-[10px] font-bold text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
                 >
                   Web Search <Search size={10} />
                 </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center glass rounded-2xl border border-dashed border-[#30363D]">
             <Search size={48} className="mx-auto text-[#30363D] mb-4" />
             <h3 className="text-xl font-bold text-[#8B949E]">No universities found</h3>
             <p className="text-[#8B949E] text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
