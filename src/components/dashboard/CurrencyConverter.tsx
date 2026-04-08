"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, RussianRuble, ArrowRightLeft, RefreshCw, TrendingUp, ChevronDown } from 'lucide-react';

type Currency = 'INR' | 'RUB';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [from, setFrom] = useState<Currency>('INR');
  const [to, setTo] = useState<Currency>('RUB');
  const [result, setResult] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.12);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const updateRate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/INR`);
      const data = await response.json();
      if (data.rates?.RUB) {
        setRate(data.rates.RUB);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Failed to fetch rates:", error);
      setRate(1.15); 
      setLastUpdated("Offline (using estimate)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRate();
  }, []);

  useEffect(() => {
    const val = parseFloat(amount) || 0;
    if (from === 'INR') {
      setResult(Number((val * rate).toFixed(2)));
    } else {
      setResult(Number((val / rate).toFixed(2)));
    }
  }, [amount, rate, from]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleAmountChange = (val: string) => {
    // If empty or starts with 0 (but not 0.), replace 0
    if (val === "" || (val.startsWith("0") && val.length > 1 && !val.startsWith("0."))) {
      setAmount(val.replace(/^0+/, ''));
    } else {
      setAmount(val);
    }
  };

  return (
    <div className="glass p-6 rounded-3xl border border-border shadow-2xl relative overflow-hidden transition-all hover:border-blue-500/30">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            Smart Converter
            <TrendingUp size={16} className="text-green-500 animate-pulse" />
          </h3>
          <p className="text-muted text-[10px] font-bold uppercase tracking-widest mt-1">Live Exchange Hub</p>
        </div>
        <button 
          onClick={updateRate} 
          disabled={loading}
          className={`p-2 rounded-xl bg-surface border border-border text-muted hover:text-foreground transition-all ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="group">
          <label className="text-[10px] uppercase font-black text-muted block mb-2 px-1 tracking-widest">Base Amount ({from})</label>
          <div className="flex items-center gap-3 bg-background p-4 rounded-2xl border border-border focus-within:border-blue-500 transition-all shadow-inner">
            {from === 'INR' ? <IndianRupee className="text-blue-500" size={20} /> : <div className="w-5 h-3 rounded-xs bg-gradient-to-b from-white via-blue-700 to-red-600" />}
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              suppressHydrationWarning
              className="bg-transparent text-foreground w-full outline-hidden font-mono text-xl font-bold"
            />
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-20">
          <button 
            onClick={handleSwap}
            suppressHydrationWarning
            className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg hover:rotate-180"
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        <div className="group">
          <label className="text-[10px] uppercase font-black text-muted block mb-2 px-1 tracking-widest">Converted Result ({to})</label>
          <div className="flex items-center gap-3 bg-surface p-4 rounded-2xl border border-border transition-all">
            {to === 'INR' ? <IndianRupee className="text-muted opacity-50" size={20} /> : <div className="w-5 h-3 rounded-xs bg-gradient-to-b from-white via-blue-700 to-red-600 opacity-50" />}
            <div className="flex-1 font-mono text-xl font-black text-foreground">
               {result.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xs text-muted font-normal ml-2">{to}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted border-t border-border/50 pt-4">
               <span>
                  1 INR = <span className="text-blue-500">{rate.toFixed(4)}</span> RUB
               </span>
               <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">
                  {loading ? 'Fetching...' : `Live: ${lastUpdated}`}
               </span>
            </div>
        </div>
      </div>
      
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-600/5 blur-[60px] rounded-full" />
    </div>
  );
}
