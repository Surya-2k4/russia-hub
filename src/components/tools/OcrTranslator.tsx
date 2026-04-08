"use client";

import { useState, useRef, useEffect } from 'react';
import { createWorker } from 'tesseract.js';
import { 
  Languages, 
  Upload, 
  Copy, 
  Trash2, 
  Loader2, 
  FileText, 
  AlertCircle,
  Scan,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OcrTranslator() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load PDF.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      processPdf(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        doOcr(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const processPdf = async (file: File) => {
    if (!scriptLoaded) return;
    setLoading(true);
    setText("");
    setTranslatedText("");
    setImage(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      // @ts-ignore
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      const imageData = canvas.toDataURL('image/png');
      setImage(imageData);
      
      // Convert canvas to blob for Tesseract
      canvas.toBlob((blob) => {
        if (blob) doOcr(new File([blob], "page.png", { type: "image/png" }));
      });

    } catch (err) {
      console.error("PDF Process Error:", err);
      setLoading(false);
    }
  };

  const doOcr = async (file: File) => {
    setLoading(true);
    setProgress(0);
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
      if (text) await translateTextAfterOcr(text);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const translateTextAfterOcr = async (rawText: string) => {
    setTranslating(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawText.substring(0, 500).replace(/\n/g, ' '))}&langpair=ru|en`);
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

  const translateText = async () => {
    if (!text) return;
    setTranslating(true);
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500).replace(/\n/g, ' '))}&langpair=ru|en`);
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
    alert("Copied to clipboard!");
  };

  return (
    <div className="glass rounded-[2rem] border border-border overflow-hidden shadow-2xl relative">
      <div className="p-8 bg-surface/30 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500 border border-blue-600/20">
              <Scan size={28} />
           </div>
           <div>
              <h3 className="text-2xl font-black text-foreground tracking-tight">AI Doc Translator</h3>
              <p className="text-[10px] text-muted uppercase font-black tracking-widest mt-1">Universal OCR Node • RU + EN</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-[10px] font-black text-green-500 uppercase">
           <FileCheck size={12} /> Adaptive Engine
        </div>
      </div>

      <div className="p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
           <div 
             onClick={() => fileInputRef.current?.click()}
             className={`relative group cursor-pointer aspect-square md:aspect-auto md:h-80 lg:h-full lg:aspect-square rounded-3xl border-2 border-dashed border-border/50 hover:border-blue-500 transition-all flex flex-col items-center justify-center p-8 bg-background/50 overflow-hidden ${loading || translating ? 'pointer-events-none' : ''}`}
           >
              {image ? (
                <img src={image} className="w-full h-full object-contain rounded-2xl opacity-50 group-hover:opacity-30 transition-all" alt="Upload" />
              ) : (
                <div className="flex flex-col items-center gap-6 text-center group-hover:scale-105 transition-transform">
                   <div className="w-20 h-20 rounded-3xl bg-blue-600/5 border border-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xl">
                      <Upload size={36} />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-foreground mb-2">Drop your files here</h4>
                      <p className="text-xs text-muted font-medium">Supports JPG, PNG, PDF, and all document scans</p>
                   </div>
                </div>
              )}
              
              <AnimatePresence>
                {loading && (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="absolute inset-0 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 z-20"
                   >
                       <div className="relative w-24 h-24">
                          <Loader2 size={96} className="text-blue-500 animate-spin opacity-10" />
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                             <span className="text-2xl font-black text-foreground font-mono">{progress}%</span>
                             <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Scanning</span>
                          </div>
                          <motion.div 
                            className="absolute inset-x-0 h-0.5 bg-blue-500" 
                            animate={{ top: ['0%', '100%', '0%'] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                       </div>
                   </motion.div>
                )}
              </AnimatePresence>
              
              <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="*" />
           </div>

           <div className="flex flex-col h-full rounded-3xl bg-surface/20 border border-border p-8 shadow-inner relative justify-between">
              <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h4 className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                        <FileText size={14} className="text-blue-500" /> Intelligence Output
                     </h4>
                     <button 
                       onClick={translateText}
                       disabled={!text || translating || loading}
                       className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-30 shadow-xl"
                     >
                        {translating ? <Loader2 size={12} className="animate-spin" /> : <Languages size={12} />}
                        {translating ? 'Processing...' : 'Translate to English'}
                     </button>
                  </div>

                  <div className="space-y-6 overflow-hidden">
                     <div className="flex flex-col gap-3">
                        <span className="text-[8px] uppercase font-black text-muted tracking-[0.2em] pl-1">Source Text (RU/EN)</span>
                        <div className="min-h-[120px] max-h-[150px] overflow-y-auto text-sm text-foreground font-medium leading-relaxed bg-background/50 p-4 rounded-2xl border border-border whitespace-pre-wrap scroll-smooth">
                           {text || <span className="opacity-20 italic">Awaiting document upload...</span>}
                        </div>
                     </div>

                     <AnimatePresence>
                        {translatedText && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                             <span className="text-[8px] uppercase font-black text-blue-500 tracking-[0.2em] pl-1">English Intelligence</span>
                             <div className="min-h-[120px] max-h-[150px] overflow-y-auto text-sm text-blue-100 font-medium leading-relaxed bg-blue-600/5 p-4 rounded-2xl border border-blue-500/20 whitespace-pre-wrap">
                                {translatedText}
                             </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
              </div>

              <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/50">
                  <div className="flex gap-4">
                     <button 
                       onClick={copyToClipboard} 
                       disabled={!text}
                       className="p-3 bg-background border border-border rounded-xl text-muted hover:text-blue-500 transition-all shadow-sm hover:scale-110"
                     >
                       <Copy size={18} />
                     </button>
                     <button 
                       onClick={() => {setText(""); setTranslatedText(""); setImage(null);}} 
                       disabled={!text}
                       className="p-3 bg-background border border-border rounded-xl text-muted hover:text-red-500 transition-all shadow-sm hover:scale-110"
                     >
                       <Trash2 size={18} />
                     </button>
                   </div>
                   
                   <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/5 rounded-xl border border-orange-500/10">
                      <AlertCircle size={14} className="text-orange-500" />
                      <span className="text-[8px] text-muted font-bold uppercase">Verify all legal data</span>
                   </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
