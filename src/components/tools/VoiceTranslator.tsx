"use client";

import { useState, useEffect } from 'react';
import { 
  Languages, 
  Volume2, 
  ArrowRightLeft, 
  Copy, 
  Trash2, 
  Loader2,
  Mic,
  MicOff,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function VoiceTranslator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("ru");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTranslate = async (textToTranslate = sourceText) => {
    if (!textToTranslate.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${sourceLang}|${targetLang}`);
      const data = await response.json();
      if (data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      }
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const speak = (text: string, lang: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="glass rounded-[2rem] border border-border overflow-hidden shadow-2xl bg-surface/10">
      <div className="p-8 decoration-bg border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500 border border-blue-600/20">
              <Languages size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">Voice Translator</h3>
              <p className="text-[10px] text-muted uppercase font-black tracking-widest mt-1">Bilingual Intelligence Hub</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-[10px] font-black text-muted uppercase">
           <Sparkles size={12} className="text-blue-500" /> Multi-Modal
        </div>
      </div>

      <div className="p-8 lg:p-12 space-y-10 relative">
         <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-8 items-stretch">
            {/* Input Side */}
            <div className="space-y-4">
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                     {sourceLang === 'ru' ? 'Russian Source' : 'English Source'}
                  </span>
                  <button onClick={() => speak(sourceText, sourceLang)} className="p-2 text-muted hover:text-blue-500 transition-all">
                     <Volume2 size={16} />
                  </button>
               </div>
               <div className="relative">
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Type anything to translate..."
                    className="w-full h-56 lg:h-72 bg-background/50 border border-border rounded-3xl p-6 text-foreground font-medium focus:border-blue-500/50 outline-hidden transition-all resize-none shadow-inner text-base lg:text-lg"
                  />
                  {sourceText && (
                    <button 
                      onClick={() => setSourceText("")} 
                      className="absolute bottom-4 right-4 p-2 bg-surface border border-border rounded-xl text-muted hover:text-red-500 shadow-xl"
                    >
                       <Trash2 size={14} />
                    </button>
                  )}
               </div>
            </div>

            {/* Middle Action */}
            <div className="flex flex-row lg:flex-col items-center justify-center gap-4 py-4 lg:py-0">
               <div className="hidden lg:block h-full w-px bg-border/50" />
               <button 
                 onClick={handleSwap}
                 className="p-5 bg-blue-600 text-white rounded-full hover:rotate-180 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.4)] z-10 active:scale-90"
               >
                  <ArrowRightLeft size={24} className="rotate-90 lg:rotate-0" />
               </button>
               <div className="hidden lg:block h-full w-px bg-border/50" />
            </div>

            {/* Output Side */}
            <div className="space-y-4">
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                     {targetLang === 'ru' ? 'Russian Target' : 'English Target'}
                  </span>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => speak(translatedText, targetLang)}
                       className={`p-2 rounded-lg transition-all ${isSpeaking ? 'bg-red-500/10 text-red-500' : 'text-muted hover:text-emerald-500'}`}
                     >
                        {isSpeaking ? <VolumeX size={16} onClick={(e) => {e.stopPropagation(); stopSpeaking();}} /> : <Volume2 size={16} />}
                     </button>
                     <button onClick={() => copyToClipboard(translatedText)} className="p-2 text-muted hover:text-emerald-500 transition-all">
                        <Copy size={16} />
                     </button>
                  </div>
               </div>
               <div className="w-full h-56 lg:h-72 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 text-foreground font-semibold leading-relaxed overflow-y-auto whitespace-pre-wrap relative shadow-inner text-base lg:text-lg">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                       <Loader2 className="text-emerald-500 animate-spin" size={40} />
                    </div>
                  ) : translatedText || <span className="opacity-20 italic font-normal">Intelligence output will appear here...</span>}
               </div>
            </div>
         </div>

         <div className="flex justify-center pt-4">
            <button
              onClick={() => handleTranslate()}
              disabled={loading || !sourceText}
              className="px-12 py-4 bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl disabled:opacity-20 flex items-center gap-3"
            >
               {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
               Execute Intelligence
            </button>
         </div>

         <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex gap-3 mt-4">
            <Volume2 size={16} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-muted leading-tight font-medium uppercase tracking-tight">
               Tip: You can use the voice button to hear the correct native pronunciation in both Russian and English.
            </p>
         </div>
      </div>
    </div>
  );
}
