"use client";

import { useState, useEffect } from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Sun, 
  Wind, 
  Droplets,
  Thermometer,
  Search,
  MapPin,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RUSSIAN_STATES = [
  "Moscow", "Saint Petersburg", "Kazan", "Novosibirsk", "Ekaterinburg", 
  "Vladivostok", "Sochi", "Murmansk", "Yakutsk", "Irkutsk", "Tomsk"
];

export function ClimateTracker() {
  const [city, setCity] = useState("Moscow");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      // Using wttr.in as a reliable free keyless climate API
      const res = await fetch(`https://wttr.in/${encodeURIComponent(cityName)}?format=j1`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Could not find climate data for this location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      fetchWeather(searchInput.trim());
    }
  };

  const getWeatherIcon = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes("snow")) return <CloudSnow className="text-blue-200" size={48} />;
    if (d.includes("rain") || d.includes("drizzle")) return <CloudRain className="text-blue-400" size={48} />;
    if (d.includes("thunder")) return <CloudLightning className="text-yellow-400" size={48} />;
    if (d.includes("cloud")) return <Cloud className="text-gray-400" size={48} />;
    return <Sun className="text-yellow-500" size={48} />;
  };

  const current = weather?.current_condition?.[0];
  const nearest = weather?.nearest_area?.[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: Preset Cities */}
        <div className="w-full md:w-80 space-y-4">
           <div className="glass p-6 rounded-3xl border border-border bg-surface/50">
              <h3 className="text-xs font-black text-muted mb-4 uppercase tracking-widest leading-none">Major Hubs</h3>
              <div className="flex flex-wrap gap-2">
                 {RUSSIAN_STATES.map(s => (
                   <button 
                     key={s}
                     onClick={() => { setCity(s); fetchWeather(s); }}
                     className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                       city === s ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-background border-border text-muted hover:border-blue-500/50'
                     }`}
                   >
                     {s}
                   </button>
                 ))}
              </div>
           </div>

           <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                placeholder="Search manual city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-background border border-border rounded-2xl py-3 pl-10 pr-4 text-sm text-foreground focus:border-blue-500 outline-hidden transition-all shadow-inner"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-blue-500" size={18} />
              <button type="submit" className="hidden" />
           </form>
        </div>

        {/* Main Content: Weather Details */}
        <div className="flex-1">
           <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass h-[400px] rounded-3xl border border-border flex flex-col items-center justify-center gap-4"
                >
                   <RefreshCw className="text-blue-500 animate-spin" size={48} />
                   <p className="text-sm font-bold text-muted uppercase tracking-widest">Fetching Siberia Status...</p>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass h-[400px] rounded-3xl border border-red-500/20 flex flex-col items-center justify-center gap-4 text-center"
                >
                   <div className="p-6 bg-red-500/10 rounded-full text-red-500"><CloudRain size={48} /></div>
                   <p className="text-lg font-bold text-foreground">{error}</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                   {/* Primary Weather Card */}
                   <div className="glass p-8 rounded-3xl border border-border bg-gradient-to-br from-surface to-background relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                         {getWeatherIcon(current?.weatherDesc?.[0]?.value || "")}
                      </div>

                      <div className="relative z-10">
                         <div className="flex items-center gap-2 text-blue-400 font-bold mb-8">
                            <MapPin size={18} />
                            <span className="text-xl">{city}</span>
                            <span className="text-[10px] opacity-50 px-2 py-0.5 bg-foreground/5 rounded-full border border-foreground/10">{nearest?.region?.[0]?.value}, {nearest?.country?.[0]?.value}</span>
                         </div>

                         <div className="flex items-end gap-6 mb-12">
                            <h2 className="text-7xl font-black text-foreground leading-none tracking-tighter">
                               {current?.temp_C}<span className="text-3xl text-blue-500 ml-2">°C</span>
                            </h2>
                            <div className="pb-2">
                               <p className="text-xl font-bold text-foreground">{current?.weatherDesc?.[0]?.value}</p>
                               <p className="text-xs text-muted">Feels like {current?.FeelsLikeC}°C</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-3 bg-background border border-border rounded-2xl flex items-center gap-3">
                               <Wind className="text-blue-400" size={18} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-muted leading-none mb-1">Wind</p>
                                  <p className="text-xs font-bold text-foreground">{current?.windspeedKmph} <span className="text-[8px] opacity-50 font-normal">km/h</span></p>
                               </div>
                            </div>
                            <div className="p-3 bg-background border border-border rounded-2xl flex items-center gap-3">
                               <Droplets className="text-blue-600" size={18} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-muted leading-none mb-1">Humidity</p>
                                  <p className="text-xs font-bold text-foreground">{current?.humidity}%</p>
                               </div>
                            </div>
                            <div className="p-3 bg-background border border-border rounded-2xl flex items-center gap-3">
                               <Thermometer className="text-red-500" size={18} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-muted leading-none mb-1">Pressure</p>
                                  <p className="text-xs font-bold text-foreground">{current?.pressure} <span className="text-[8px] opacity-50 font-normal">hPa</span></p>
                               </div>
                            </div>
                            <div className="p-3 bg-background border border-border rounded-2xl flex items-center gap-3">
                               <Cloud className="text-gray-400" size={18} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-muted leading-none mb-1">Clouds</p>
                                  <p className="text-xs font-bold text-foreground">{current?.cloudcover}%</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Forecast Row */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {weather?.weather?.map((day: any, idx: number) => (
                        <div key={idx} className="glass p-4 rounded-2xl border border-border bg-surface/30 flex flex-col items-center">
                           <p className="text-[8px] font-black uppercase text-muted mb-3 tracking-widest leading-none">{idx === 0 ? 'Today' : day.date}</p>
                           <div className="p-3 bg-foreground/5 rounded-full mb-3">
                              {getWeatherIcon(day.hourly[4].weatherDesc[0].value)}
                           </div>
                           <div className="text-center">
                              <p className="text-lg font-black text-foreground leading-none mb-1">{day.avgtempC}°C</p>
                              <p className="text-[9px] text-blue-500 font-bold mb-2 uppercase">{day.hourly[4].weatherDesc[0].value}</p>
                              <div className="flex justify-center gap-3 text-[9px] font-mono">
                                 <span className="text-red-500/80">H: {day.maxtempC}°</span>
                                 <span className="text-blue-500/80">L: {day.mintempC}°</span>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
