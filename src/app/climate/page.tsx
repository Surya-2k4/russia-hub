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

export default function ClimatePage() {
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 mb-6 uppercase tracking-widest">
           <Sparkles size={14} /> Real-time Climate Grid
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Russia <span className="text-blue-500">Climate</span> Status</h1>
        <p className="text-[#8B949E] text-lg max-w-2xl">
          Real-time weather data across all major Russian regions and cities. Plan your wardrobe and travel accordingly.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Preset Cities */}
        <div className="space-y-4">
           <div className="glass p-6 rounded-3xl border border-[#30363D] bg-[#161B22]/50">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-[#8B949E]">Major Hubs</h3>
              <div className="flex flex-wrap gap-2">
                 {RUSSIAN_STATES.map(s => (
                   <button 
                     key={s}
                     onClick={() => { setCity(s); fetchWeather(s); }}
                     className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                       city === s ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[#0D1117] border-[#30363D] text-[#8B949E] hover:border-blue-500/50'
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
                placeholder="Search manual city (e.g. Sochi)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 outline-hidden transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B949E] group-focus-within:text-blue-500" size={20} />
              <button type="submit" className="hidden" />
           </form>
        </div>

        {/* Main Content: Weather Details */}
        <div className="lg:col-span-2">
           <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass h-[400px] rounded-3xl border border-[#30363D] flex flex-col items-center justify-center gap-4"
                >
                   <RefreshCw className="text-blue-500 animate-spin" size={48} />
                   <p className="text-sm font-bold text-[#8B949E] uppercase tracking-widest">Fetching Siberia Status...</p>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass h-[400px] rounded-3xl border border-red-500/20 flex flex-col items-center justify-center gap-4 text-center"
                >
                   <div className="p-6 bg-red-500/10 rounded-full text-red-500"><CloudRain size={48} /></div>
                   <p className="text-lg font-bold text-white">{error}</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                   {/* Primary Weather Card */}
                   <div className="glass p-8 rounded-3xl border border-[#30363D] bg-gradient-to-br from-[#161B22] to-[#0D1117] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                         {getWeatherIcon(current?.weatherDesc?.[0]?.value || "")}
                      </div>

                      <div className="relative z-10">
                         <div className="flex items-center gap-2 text-blue-400 font-bold mb-8">
                            <MapPin size={18} />
                            <span className="text-xl">{city}</span>
                            <span className="text-xs opacity-50 px-2 py-0.5 bg-white/5 rounded-full border border-white/10">{nearest?.region?.[0]?.value}, {nearest?.country?.[0]?.value}</span>
                         </div>

                         <div className="flex items-end gap-6 mb-12">
                            <h2 className="text-8xl font-black text-white leading-none tracking-tighter">
                               {current?.temp_C}<span className="text-4xl text-blue-500 ml-2">°C</span>
                            </h2>
                            <div className="pb-2">
                               <p className="text-2xl font-bold text-[#E6EDF3]">{current?.weatherDesc?.[0]?.value}</p>
                               <p className="text-sm text-[#8B949E]">Feels like {current?.FeelsLikeC}°C</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-2xl flex items-center gap-3">
                               <Wind className="text-blue-400" size={20} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-[#8B949E]">Wind</p>
                                  <p className="text-sm font-bold text-white">{current?.windspeedKmph} <span className="text-[10px] opacity-50">km/h</span></p>
                               </div>
                            </div>
                            <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-2xl flex items-center gap-3">
                               <Droplets className="text-blue-600" size={20} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-[#8B949E]">Humidity</p>
                                  <p className="text-sm font-bold text-white">{current?.humidity}%</p>
                               </div>
                            </div>
                            <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-2xl flex items-center gap-3">
                               <Thermometer className="text-red-500" size={20} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-[#8B949E]">Pressure</p>
                                  <p className="text-sm font-bold text-white">{current?.pressure} <span className="text-[10px] opacity-50">hPa</span></p>
                               </div>
                            </div>
                            <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-2xl flex items-center gap-3">
                               <Cloud className="text-gray-400" size={20} />
                               <div>
                                  <p className="text-[8px] uppercase font-black text-[#8B949E]">Cloud Cover</p>
                                  <p className="text-sm font-bold text-white">{current?.cloudcover}%</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Forecast Row */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {weather?.weather?.map((day: any, idx: number) => (
                        <div key={idx} className="glass p-6 rounded-2xl border border-[#30363D] bg-[#161B22]/30 flex flex-col items-center">
                           <p className="text-[10px] font-black uppercase text-[#8B949E] mb-4 tracking-widest">{idx === 0 ? 'Today' : day.date}</p>
                           <div className="p-4 bg-white/5 rounded-full mb-4">
                              {getWeatherIcon(day.hourly[4].weatherDesc[0].value)}
                           </div>
                           <div className="text-center">
                              <p className="text-lg font-black text-white">{day.avgtempC}°C</p>
                              <p className="text-[10px] text-blue-400 font-bold mb-2">{day.hourly[4].weatherDesc[0].value}</p>
                              <div className="flex justify-center gap-4 text-[10px] font-mono">
                                 <span className="text-red-400">H: {day.maxtempC}°</span>
                                 <span className="text-blue-400">L: {day.mintempC}°</span>
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
