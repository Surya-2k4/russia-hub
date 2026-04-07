"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, RussianRuble, ArrowRightLeft, RefreshCw, TrendingUp } from 'lucide-react';

export function CurrencyConverter() {
  const [inr, setInr] = useState<number>(1000);
  const [rub, setRub] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.12); // Default fallback rate
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const updateRate = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_CURRENCY_API_KEY;
      if (!apiKey || apiKey === 'your_key_here') {
          // Mock fetch delay
          await new Promise(r => setTimeout(r, 1000));
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
          return;
      }
      const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=RUB&base_currency=INR`);
      const data = await response.json();
      if (data.data?.RUB) {
        setRate(data.data.RUB);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Failed to fetch rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRate();
  }, []);

  useEffect(() => {
    setRub(Number((inr * rate).toFixed(2)));
  }, [inr, rate]);

  return (
    <div className="glass p-6 rounded-2xl border border-[#30363D] shadow-xl relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Currency Converter
            <TrendingUp size={16} className="text-green-500" />
          </h3>
          <p className="text-[#8B949E] text-xs mt-1">Live INR to RUB exchange rates.</p>
        </div>
        <button 
          onClick={updateRate} 
          disabled={loading}
          suppressHydrationWarning
          className={`p-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-[#8B949E] hover:text-white transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="space-y-6 relative z-10">
        {/* INR Input */}
        <div className="group">
          <label className="text-[10px] uppercase font-bold text-[#8B949E] block mb-2 px-1">Amount (INR)</label>
          <div className="flex items-center gap-3 bg-[#0D1117] p-4 rounded-xl border border-[#30363D] focus-within:border-blue-500 transition-all">
            <IndianRupee className="text-blue-500" size={20} />
            <input
              type="number"
              value={inr}
              onChange={(e) => setInr(Number(e.target.value))}
              placeholder="0.00"
              suppressHydrationWarning
              className="bg-transparent text-white w-full outline-hidden font-mono text-lg"
            />
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-20">
          <div className="p-2 bg-[#F0B429] rounded-full text-black shadow-[0_0_15px_rgba(240,180,41,0.5)] border-4 border-[#0D1117]">
            <ArrowRightLeft size={16} />
          </div>
        </div>

        {/* RUB Result */}
        <div className="group">
          <label className="text-[10px] uppercase font-bold text-[#8B949E] block mb-2 px-1">Result (RUB)</label>
          <div className="flex items-center gap-3 bg-[#0D1117]/50 p-4 rounded-xl border border-[#30363D] opacity-100 transition-all">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-b from-white via-blue-700 to-red-600 flex items-center justify-center p-0.5" />
            <div className="flex-1 font-mono text-xl font-bold text-[#F0B429]">
               {rub.toLocaleString()} <span className="text-xs text-[#8B949E]">₽</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-[#8B949E]">
              Rate: <span className="text-white font-mono">1 INR = {rate.toFixed(4)} RUB</span>
            </span>
            <span className="text-[10px] text-[#8B949E] opacity-50">
              {loading ? 'Updating...' : `Updated: ${lastUpdated}`}
            </span>
        </div>
      </div>
      
      {/* Decorative Gradient Blob */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full" />
    </div>
  );
}
