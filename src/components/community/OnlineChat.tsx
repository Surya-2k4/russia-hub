"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Hash, 
  Users, 
  Smile, 
  Paperclip, 
  MoreVertical, 
  Search,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = ["general", "admissions", "housing", "legal-help", "buy-sell", "travel"];
const INITIAL_MESSAGES = [
  { id: 1, user: "Alex_RU", text: "Hey! Does anyone know if the medical check center in Moscow is open today?", time: "10:30 AM", channel: "general" },
  { id: 2, user: "Priya_IN", text: "Yes, it is. I just came back. Make sure to reach before 1 PM.", time: "10:32 AM", channel: "general" },
  { id: 3, user: "Dmitry_Mod", text: "Welcome to the Hub! Please check the pinned messages for the latest visa updates.", time: "09:00 AM", channel: "general" },
];

export function OnlineChat() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel
    };

    setMessages([...messages, newMessage]);
    setInput("");
    
    // Fake reply logic
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply = {
          id: Date.now() + 1,
          user: "HubBot",
          text: `Thanks for sharing in #${activeChannel}! Our community will get back to you soon.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }, 1000);
  };

  const filteredMessages = messages.filter(m => m.channel === activeChannel);

  return (
    <div className="glass rounded-3xl border border-[#30363D] overflow-hidden flex h-[650px] shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-red-600 to-white opacity-50" />
      
      {/* Sidebar: Channels */}
      <div className="w-20 md:w-64 bg-[#0D1117] border-r border-[#30363D] flex flex-col pt-4">
        <div className="px-6 mb-8 hidden md:block">
           <h3 className="text-xs font-black text-[#8B949E] uppercase tracking-widest flex items-center gap-2">
             <Hash size={12} /> Channels
           </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-1 px-2 md:px-4">
           {CHANNELS.map(channel => (
             <button
               key={channel}
               onClick={() => setActiveChannel(channel)}
               className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl transition-all ${
                 activeChannel === channel 
                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                   : 'text-[#8B949E] hover:bg-white/5 hover:text-white'
               }`}
             >
                <Hash size={18} className={activeChannel === channel ? 'text-white' : 'text-[#30363D]'} />
                <span className="hidden md:block font-bold text-sm lowercase">{channel}</span>
             </button>
           ))}
        </div>

        <div className="p-4 border-t border-[#30363D] hidden md:block">
           <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl">
              <p className="text-[10px] font-black text-blue-400 uppercase mb-2">Pro Tip</p>
              <p className="text-[10px] text-[#8B949E] leading-relaxed">Use #housing for accommodation queries!</p>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#161B22]/20 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#30363D] bg-[#0D1117]/50">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500"><Hash size={20} /></div>
             <div>
                <h4 className="font-bold text-white text-sm">#{activeChannel}</h4>
                <p className="text-[10px] text-[#8B949E]">Discuss anything about {activeChannel}</p>
             </div>
           </div>
           <div className="flex items-center gap-4 text-[#8B949E]">
              <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
              <Users size={18} className="cursor-pointer hover:text-white transition-colors" />
              <MoreVertical size={18} className="cursor-pointer hover:text-white transition-colors" />
           </div>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#30363D] scrollbar-track-transparent"
        >
           {filteredMessages.map((msg) => (
             <motion.div 
               key={msg.id}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className={`flex gap-4 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}
             >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                  msg.user === 'You' ? 'bg-blue-600 border-blue-500 shadow-lg' : 'bg-[#0D1117] border-[#30363D]'
                }`}>
                   <UserCircle size={24} className="text-white opacity-50" />
                </div>
                <div className={`max-w-[70%] space-y-1 ${msg.user === 'You' ? 'text-right' : ''}`}>
                   <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                      <span className="text-xs font-black text-white">{msg.user}</span>
                      <span className="text-[10px] text-[#8B949E]">{msg.time}</span>
                   </div>
                   <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                     msg.user === 'You' 
                       ? 'bg-blue-600 text-white rounded-tr-none' 
                       : 'bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-tl-none'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             </motion.div>
           ))}

           {isTyping && (
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
                   <Sparkles size={18} className="text-blue-500 animate-pulse" />
                </div>
                <div className="bg-[#161B22] border border-[#30363D] px-4 py-2 rounded-2xl rounded-tl-none">
                   <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
             </div>
           )}
        </div>

        {/* Input Area */}
        <div className="p-6">
           <form 
             onSubmit={handleSendMessage}
             className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-2 flex items-center gap-2 shadow-inner focus-within:border-blue-500/50 transition-all"
           >
              <div className="flex items-center gap-2 px-2 border-r border-[#30363D]">
                 <button type="button" className="p-2 text-[#8B949E] hover:text-blue-500"><Paperclip size={20} /></button>
                 <button type="button" className="p-2 text-[#8B949E] hover:text-blue-500"><Smile size={20} /></button>
              </div>
              <input 
                type="text"
                placeholder={`Message #${activeChannel}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent flex-1 outline-hidden text-white px-4 text-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 p-3 rounded-xl text-white transition-all shadow-lg"
              >
                 <Send size={20} />
              </button>
           </form>
           <div className="flex items-center justify-between mt-3 px-2">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">1,204 Students Online</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-[#8B949E] uppercase tracking-widest">Encrypted Hub</span>
                 </div>
              </div>
              <p className="text-[10px] text-[#30363D] font-bold">Powered by NeonDB Realtime</p>
           </div>
        </div>
      </div>
    </div>
  );
}
