"use client";

import { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Wind, 
  CloudRain, 
  Sun, 
  MapPin, 
  CheckCircle2, 
  Info,
  Layers,
  Zap,
  Snowflake,
  Shirt
} from 'lucide-react';
import { motion } from 'framer-motion';

export function WardrobeAdvisor() {
  const [city, setCity] = useState("Moscow");
  const [temp, setTemp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const cityCoords: { [key: string]: [number, number] } = {
    "Moscow": [55.7558, 37.6173],
    "Saint Petersburg": [59.9343, 30.3351],
    "Kazan": [55.8304, 49.0661],
    "Yekaterinburg": [56.8389, 60.6057],
    "Novosibirsk": [55.0084, 82.9357],
    "Tomsk": [56.4977, 84.9744],
    "Vladivostok": [43.1198, 131.8869],
    "Murmansk": [68.9585, 33.0827],
    "Sochi": [43.6028, 39.7233],
    "Krasnodar": [45.0355, 38.9753]
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const [lat, lon] = cityCoords[city];
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      setTemp(data.current_weather.temperature);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getAdvice = (t: number) => {
    if (t < -20) return { 
      label: "Extreme Cold", 
      icon: Snowflake, 
      color: "red", 
      items: ["Thermal inner-wear (top + bottom)", "Fleece mid-layer", "Heavy Down Parka (-30 rated)", "Woolen socks (double)", "Fur Ushanka", "Insulated gloves"] 
    };
    if (t < -10) return { 
      label: "Freezing", 
      icon: Snowflake, 
      color: "blue", 
      items: ["Thermal base layer", "Woolen sweater", "Winter coat / Puffer", "Beanie & Scarf", "Lined gloves", "Leather boots"] 
    };
    if (t < 5) return { 
      label: "Chilly", 
      icon: Wind, 
      color: "cyan", 
      items: ["Light sweater", "Trench coat or Windbreaker", "Walking shoes", "Single layer socks", "Light scarf"] 
    };
    return { 
      label: "Mild", 
      icon: Sun, 
      color: "yellow", 
      items: ["T-shirt & Jeans", "Light jacket / Hoodie", "Sneakers"] 
    };
  };

  const advice = temp !== null ? getAdvice(temp) : null;

  return (
    <div className="glass rounded-3xl border border-[#30363D] overflow-hidden shadow-2xl bg-gradient-to-br from-[#161B22] to-[#0D1117]">
      <div className="p-6 bg-[#161B22]/50 border-b border-[#30363D] flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
              <Shirt size={24} />
           </div>
           <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Winter Wardrobe Advisor</h3>
              <p className="text-[10px] text-[#8B949E] uppercase font-bold tracking-widest mt-0.5">Real-time packing checklist</p>
           </div>
        </div>
        
        <select 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          className="bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] text-xs font-bold px-3 py-2 rounded-lg outline-hidden focus:border-blue-500"
        >
          {Object.keys(cityCoords).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="p-8">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
               <div className="flex flex-col items-center justify-center p-12 bg-[#0D1117]/80 rounded-3xl border border-[#30363D] shadow-inner relative overflow-hidden group">
                  {loading ? (
                    <Loader2 size={48} className="text-blue-500 animate-spin opacity-20" />
                  ) : (
                    <>
                       <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                          <Thermometer size={120} />
                       </div>
                       <motion.div 
                         initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                         className="text-6xl font-black text-white font-mono flex items-center gap-2 mb-2"
                       >
                          {temp?.toFixed(1)} <span className="text-3xl text-blue-500">°C</span>
                       </motion.div>
                       <p className="text-sm font-bold text-[#8B949E] uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={14} className="text-red-500" /> {city}
                       </p>
                       
                       <div className="mt-8 flex gap-2">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${temp! < -10 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                             {advice?.label}
                          </span>
                       </div>
                    </>
                  )}
               </div>
               
               <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 flex gap-3">
                  <Info size={16} className="text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#8B949E] leading-relaxed italic">The &quot;feels like&quot; temperature is often <span className="text-white font-bold">5-10°C lower</span> due to the &quot;Buran&quot; winds from the North. Always pack a wind-resistant shell.</p>
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest px-1">
                  <Layers size={16} className="text-blue-500" /> Recommended Packing List
               </h4>
               
               <div className="grid grid-cols-1 gap-3">
                  {advice?.items.map((item, idx) => (
                    <motion.div 
                      key={item}
                      initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D1117]/50 border border-[#30363D] hover:bg-blue-500/5 hover:border-blue-500/50 transition-all border-l-4 border-l-blue-500/20 group"
                    >
                       <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
                          <CheckCircle2 size={16} />
                       </div>
                       <span className="text-sm text-[#E6EDF3] font-medium leading-tight">{item}</span>
                    </motion.div>
                  ))}
               </div>
               
               <a 
                 href="https://www.google.com/search?q=winter+clothing+for+russia+students" 
                 target="_blank" 
                 className="flex items-center justify-center gap-2 py-4 w-full rounded-2xl border border-dashed border-[#30363D] text-xs font-bold text-[#8B949E] hover:text-white hover:bg-white/5 transition-all mt-4"
               >
                  <Zap size={14} className="text-[#F0B429]" /> View Full Packing Guide
               </a>
            </div>
         </div>
      </div>
    </div>
  );
}

import { Loader2 } from 'lucide-react';
