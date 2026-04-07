"use client";

import { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { 
  Languages, 
  Upload, 
  Copy, 
  Trash2, 
  Loader2, 
  FileText, 
  AlertCircle,
  Scan
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OcrTranslator() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        doOcr(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const doOcr = async (file: File) => {
    setLoading(true);
    setProgress(0);
    setText("");
    setTranslatedText("");
    try {
      const worker = await createWorker('rus+eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      const { data: { text } } = await worker.recognize(file);
      setText(text);
      await worker.terminate();
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const translateText = async () => {
    if (!text) return;
    setTranslating(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=ru|en`);
      const data = await response.json();
      if (data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      }
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setTranslating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText || text);
  };

  return (
    <div className="glass rounded-3xl border border-[#30363D] overflow-hidden shadow-2xl">
      <div className="p-6 bg-[#161B22]/50 border-b border-[#30363D] flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 border border-blue-500/20">
              <Scan size={24} />
           </div>
           <div>
              <h3 className="text-xl font-bold text-white tracking-tight">OCR Document Reader</h3>
              <p className="text-[10px] text-[#8B949E] uppercase font-bold tracking-widest mt-0.5">Supports: RU + EN Documents</p>
           </div>
        </div>
        <Languages className="text-[#8B949E]" size={20} />
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Upload Area */}
           <div 
             onClick={() => fileInputRef.current?.click()}
             className={`relative group cursor-pointer aspect-square rounded-2xl border-2 border-dashed border-[#30363D] hover:border-blue-500/50 transition-all flex flex-col items-center justify-center p-8 bg-[#0D1117] ${loading || translating ? 'pointer-events-none' : ''}`}
           >
              {image ? (
                <img src={image} className="w-full h-full object-contain rounded-xl opacity-40 group-hover:opacity-20 transition-all" alt="Upload" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                   <div className="w-16 h-16 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                      <Upload size={32} />
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white mb-1">Click to Upload Document</p>
                      <p className="text-xs text-[#8B949E]">or drag and drop JPG/PNG</p>
                   </div>
                </div>
              )}
              
              <AnimatePresence>
                {loading && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-[#0D1117]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20"
                   >
                       <div className="relative w-20 h-20">
                          <Loader2 size={80} className="text-blue-500 animate-spin opacity-20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <span className="text-lg font-bold text-white font-mono">{progress}%</span>
                          </div>
                       </div>
                       <p className="text-xs text-[#8B949E] animate-pulse">Extracting Russian Text...</p>
                   </motion.div>
                )}
              </AnimatePresence>
              
              <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
           </div>

           {/* Result Area */}
           <div className="flex flex-col h-full rounded-2xl bg-[#0D1117]/50 border border-[#30363D] p-1 shadow-inner relative">
              <div className="bg-[#161B22] p-4 rounded-xl flex-1 flex flex-col gap-4">
                 <div className="flex justify-between items-center px-1">
                    <h4 className="text-[10px] font-bold text-[#8B949E] uppercase tracking-wider flex items-center gap-2">
                       <FileText size={12} className="text-blue-400" />
                       Extracted Content
                    </h4>
                    <div className="flex gap-2">
                       <button 
                         onClick={translateText}
                         disabled={!text || translating || loading}
                         className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-md text-[10px] font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1 disabled:opacity-50"
                       >
                          {translating ? <Loader2 size={10} className="animate-spin" /> : <Languages size={10} />}
                          {translating ? 'Translating...' : 'Translate to English'}
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-4 flex-1 overflow-hidden">
                    <div className="flex flex-col gap-2 h-full">
                       <span className="text-[8px] uppercase font-black text-[#30363D] tracking-widest pl-1">Russian Original</span>
                       <div className="flex-1 min-h-[100px] overflow-y-auto text-[11px] text-[#E6EDF3] font-mono leading-relaxed bg-[#0D1117] p-3 rounded-lg border border-[#30363D]/50 border-inset whitespace-pre-wrap">
                          {text || <span className="opacity-20 italic">No text extracted yet...</span>}
                       </div>
                    </div>

                    {translatedText && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2 h-full border-t border-[#30363D] pt-4">
                         <span className="text-[8px] uppercase font-black text-blue-500/40 tracking-widest pl-1">English Translation</span>
                         <div className="flex-1 min-h-[100px] overflow-y-auto text-[11px] text-blue-100 font-mono leading-relaxed bg-blue-900/10 p-3 rounded-lg border border-blue-500/20 border-inset whitespace-pre-wrap">
                            {translatedText}
                         </div>
                      </motion.div>
                    )}
                 </div>

                 <div className="flex justify-end gap-2 px-1 border-t border-[#30363D] pt-3">
                    <button 
                      onClick={copyToClipboard} 
                      disabled={!text}
                      className="p-2 text-[#8B949E] hover:text-white transition-all hover:bg-white/5 rounded-lg"
                      title="Copy Result"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={() => {setText(""); setTranslatedText(""); setImage(null);}} 
                      disabled={!text}
                      className="p-2 text-[#8B949E] hover:text-red-500 transition-all hover:bg-red-500/5 rounded-lg"
                      title="Clear All"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
              </div>
              
              <div className="mt-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10 flex gap-3">
                 <AlertCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-[#8B949E] leading-tight">Translation uses automated engines. For legal documents, please seek a certified human translator.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
